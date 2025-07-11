// Service Worker for MykeDev Portfolio
// Version 1.0.0

const CACHE_NAME = 'mykedev-portfolio-v1';
const STATIC_CACHE_NAME = 'mykedev-static-v1';

// Resources to cache immediately
const STATIC_RESOURCES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/Rocket.png',
  '/vite.svg',
];

// Resources to cache on first access
const DYNAMIC_CACHE_PATTERNS = [
  /^https:\/\/fonts\.googleapis\.com/,
  /^https:\/\/fonts\.gstatic\.com/,
  /^https:\/\/cdn\.jsdelivr\.net/,
  /\.(?:js|css|png|jpg|jpeg|svg|gif|webp|woff2?|ttf|eot)$/,
];

// Install event - cache static resources
self.addEventListener('install', (event) => {
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_RESOURCES);
      })
      .then(() => {
        return self.skipWaiting();
      })
   
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategy
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
    
    // Return offline fallback if available
    if (request.mode === 'navigate') {
      const cache = await caches.open(STATIC_CACHE_NAME);
      return cache.match('/index.html') || fetch(request);
    }
    
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
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
  } catch (error) {
    // Silently fail background updates
    console.warn('[SW] Background fetch failed:', error);
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