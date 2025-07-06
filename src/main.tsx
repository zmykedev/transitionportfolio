import App from './App';
import React, { Suspense } from 'react';
import WaterEffect from './components/Watter-Effect';
import ReactDOM from 'react-dom/client';
import '@/styles/globals.css';
import '@/styles/scrollEffects.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<WaterEffect />}>
      <App />
    </Suspense>
  </React.StrictMode>
);
