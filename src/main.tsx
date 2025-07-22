import App from './App';
import React, { Suspense } from 'react';
import WaterEffect from './components/Watter-Effect';
import ReactDOM from 'react-dom/client';

// Load CSS asynchronously to reduce critical request chain
const loadCSS = () => {
  const link1 = document.createElement('link');
  link1.rel = 'stylesheet';
  link1.href = '/src/styles/globals.css';
  document.head.appendChild(link1);

  const link2 = document.createElement('link');
  link2.rel = 'stylesheet';
  link2.href = '/src/styles/scrollEffects.css';
  document.head.appendChild(link2);
};

// Optimize React rendering for better main thread performance
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Use requestIdleCallback for better main thread scheduling
const renderApp = () => {
  // Load CSS after initial render to reduce critical path
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadCSS, { timeout: 2000 });
  } else {
    setTimeout(loadCSS, 100);
  }

  root.render(
    <React.StrictMode>
      <Suspense fallback={<WaterEffect />}>
        <App />
      </Suspense>
    </React.StrictMode>
  );
};

// Schedule rendering during idle time to avoid blocking main thread
if ('requestIdleCallback' in window) {
  requestIdleCallback(renderApp, { timeout: 1000 });
} else {
  // Fallback for browsers that don't support requestIdleCallback
  setTimeout(renderApp, 0);
}
