import App from './App';
import React, { Suspense } from 'react';
import WaterEffect from './components/Watter-Effect';
import ReactDOM from 'react-dom/client';

// Import CSS directly to ensure it loads in production
import '@/styles/globals.css';
import '@/styles/scrollEffects.css';

// Optimize React rendering for better main thread performance
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Use requestIdleCallback for better main thread scheduling
const renderApp = () => {

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
