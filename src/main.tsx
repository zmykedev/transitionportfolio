import React, { Suspense, lazy } from 'react';
import WaterEffect from './components/WaterEffect.tsx';
import ReactDOM from 'react-dom/client';
import '@/styles/globals.css';

// Lazy load the App component
const App = lazy(() => import('./App.tsx'));



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<WaterEffect />}>
      <App />
    </Suspense>
  </React.StrictMode>
);
