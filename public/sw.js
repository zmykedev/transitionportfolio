// Service Worker for MykeDev Portfolio
// Version 2.1.0 - Optimized for main thread performance

const CACHE_NAME = 'mykedev-portfolio-v2.1';
const STATIC_CACHE_NAME = 'mykedev-static-v2.1';
const IMAGE_CACHE_NAME = 'mykedev-images-v2.1';

// Resources to cache immediately
const STATIC_RESOURCES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/Rocket.png',
  '/vite.svg',
];

// Planet Earth images to cache immediately
const PLANET_IMAGES = [
  'https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg?format=webp&quality=85',
  'https://www.solarsystemscope.com/textures/download/2k_earth_nightmap.jpg?format=webp&quality=85',
  'https://www.solarsystemscope.com/textures/download/2k_earth_clouds.jpg?format=webp&quality=85',
];

// Image patterns to cache
const IMAGE_PATTERNS = [
  /\.(png|jpg|jpeg|gif|svg|webp|avif)$/,
  /^https:\/\/skillicons\.dev\/.*/,
  /^https:\/\/www\.solarsystemscope\.com\/.*/,
];

// Resources to cache on first access
const DYNAMIC_CACHE_PATTERNS = [
  /^https:\/\/fonts\.googleapis\.com/,
  /^https:\/\/fonts\.gstatic\.com/,
  /^https:\/\/cdn\.jsdelivr\.net/,
  /\.(?:js|css|woff2?|ttf|eot)$/,
];

// Install event - cache static resources with performance optimization
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  // Use requestIdleCallback to avoid blocking main thread
  const installServiceWorker = () => {
    event.waitUntil(
      Promise.all([
        caches.open(STATIC_CACHE_NAME)
          .then((cache) => {
            console.log('[SW] Caching static resources');
            return cache.addAll(STATIC_RESOURCES);
          }),
        caches.open(IMAGE_CACHE_NAME)
          .then((cache) => {
            console.log('[SW] Caching planet Earth images');
            return cache.addAll(PLANET_IMAGES);
          })
          .then(() => {
            console.log('[SW] Image cache ready');
          })
      ])
      .then(() => {
        console.log('[SW] Service worker installed');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Installation failed:', error);
      })
    );
  };

  // Schedule installation during idle time
  if ('requestIdleCallback' in self) {
    requestIdleCallback(installServiceWorker, { timeout: 2000 });
  } else {
    installServiceWorker();
  }
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && 
                cacheName !== STATIC_CACHE_NAME && 
                cacheName !== IMAGE_CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement optimized caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // Skip Vite HMR and dev server requests
  if (url.pathname.includes('/@vite/') || 
      url.pathname.includes('/@id/') ||
      url.pathname.includes('/@fs/') ||
      url.pathname.includes('/node_modules/') ||
      url.pathname.includes('/@react-refresh') ||
      url.searchParams.has('import') ||
      url.searchParams.has('t=') ||
      request.destination === 'script' && url.pathname.includes('/src/')) {
    return;
  }
  
  // Skip if in development mode (localhost or specific dev domains)
  if (url.hostname === 'localhost' || 
      url.hostname === '127.0.0.1' || 
      url.hostname.includes('localhost')) {
    // Only cache specific resources in development
    if (!url.pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|css|woff2?|ttf|eot)$/)) {
      return;
    }
  }
  
  event.respondWith(
    handleFetch(request)
  );
});

async function handleFetch(request) {
  const url = new URL(request.url);
  
  try {
    // Check if it's an image request
    if (IMAGE_PATTERNS.some(pattern => pattern.test(request.url))) {
      return await handleImageRequest(request);
    }
    
    // Check if it's a navigation request (HTML)
    if (request.mode === 'navigate') {
      return await handleNavigationRequest(request);
    }
    
    // Check if it's a static resource
    if (DYNAMIC_CACHE_PATTERNS.some(pattern => pattern.test(request.url))) {
      return await handleStaticResource(request);
    }
    
    // For other requests, try network first
    return await fetch(request);
    
  } catch (error) {
    console.error('[SW] Fetch failed:', error);
    
    // Return offline fallback if available
    if (request.mode === 'navigate') {
      const cache = await caches.open(STATIC_CACHE_NAME);
      return cache.match('/index.html') || fetch(request);
    }
    
    throw error;
  }
}

async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Return cached version and update in background
    fetchAndCacheImage(request, cache);
    return cachedResponse;
  }
  
  // Not in cache, fetch and cache
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Failed to fetch image:', error);
    throw error;
  }
}

async function handleNavigationRequest(request) {
  try {
    // Try network first for navigation
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Fallback to cache
    const cache = await caches.open(STATIC_CACHE_NAME);
    const cachedResponse = await cache.match('/index.html');
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

async function handleStaticResource(request) {
  // Cache first strategy for static resources
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Return cached version and update in background
    fetchAndCache(request, cache);
    return cachedResponse;
  }
  
  // Not in cache, fetch and cache
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Failed to fetch static resource:', error);
    throw error;
  }
}

async function fetchAndCache(request, cache) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response);
    }
  } catch (error) {
    console.error('[SW] Background fetch failed:', error);
  }
}

async function fetchAndCacheImage(request, cache) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response);
    }
  } catch (error) {
    console.error('[SW] Background image fetch failed:', error);
  }
}

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Performance monitoring
self.addEventListener('sync', (event) => {
  if (event.tag === 'performance-sync') {
    event.waitUntil(
      // Sync performance data when network is available
    );
  }
}); 