import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/globals.css';

// Lazy load the App component
const App = lazy(() => import('./App.tsx'));

// Loading component for the entire app
const AppLoading = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-purple-500 mx-auto mb-6"></div>
      <h1 className="text-white text-2xl font-bold mb-2">Portfolio</h1>
      <p className="text-gray-300 text-lg">Cargando aplicación...</p>
    </div>
  </div>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<AppLoading />}>
      <App />
    </Suspense>
  </React.StrictMode>
);
