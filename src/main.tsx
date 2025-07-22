import App from './App';
import React, { Suspense } from 'react';
import WaterEffect from './components/Watter-Effect';
import ReactDOM from 'react-dom/client';

// Debug: Check if main.tsx loads
console.log('main.tsx loaded');

// Import CSS directly to ensure it loads in production
import '@/styles/globals.css';
import '@/styles/scrollEffects.css';

console.log('CSS imported');

// Optimize React rendering for better main thread performance
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

console.log('Root created:', root);

// Use requestIdleCallback for better main thread scheduling
const renderApp = () => {
  console.log('Rendering app...');

  root.render(
    <React.StrictMode>
      <Suspense fallback={<WaterEffect />}>
        <App />
      </Suspense>
    </React.StrictMode>
  );
  
  console.log('App rendered');
};

// Schedule rendering during idle time to avoid blocking main thread
if ('requestIdleCallback' in window) {
  console.log('Using requestIdleCallback');
  requestIdleCallback(renderApp, { timeout: 1000 });
} else {
  console.log('Using setTimeout fallback');
  // Fallback for browsers that don't support requestIdleCallback
  setTimeout(renderApp, 0);
}
