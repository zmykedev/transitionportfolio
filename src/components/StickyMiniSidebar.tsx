import { Code, Home, User, Settings } from 'lucide-react';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { vsCodeOpenAtom } from '../lib/atoms';

const StickyMiniSidebar = () => {
  const [isVSCodeOpen, setIsVSCodeOpen] = useAtom(vsCodeOpenAtom);
  const [isVisible, setIsVisible] = useState(false);

  // Animación de entrada después del mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // Delay para que aparezca después de todas las animaciones del hero

    return () => clearTimeout(timer);
  }, []);

  const openVSCode = () => {
    setIsVSCodeOpen(true);
  };

  return (
    <div
      className={`fixed bottom-0 left-1/2 z-40 -translate-x-1/2 transform transition-all duration-1000 md:hidden ${
        isVisible
          ? 'translate-y-0 opacity-100 ease-out'
          : 'translate-y-full opacity-0 ease-in'
      }`}
    >
      {/* Mac-style Dock Mini Sidebar */}
      <div className="relative overflow-hidden rounded-t-3xl border-l border-r border-t border-gray-700/40 bg-gray-900/95 px-4 py-4 shadow-2xl backdrop-blur-md">
        {/* Subtle gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800/10 to-transparent"></div>
        <div className="relative z-10 flex flex-row items-center space-x-4">
          {/* Home */}
          <button
            className={`group relative flex h-10 w-10 transform items-center justify-center rounded-xl bg-gray-800/50 transition-all duration-300 active:-translate-y-1 active:scale-95 active:bg-gray-700/90 ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            } delay-150`}
          >
            <Home className="h-5 w-5 text-gray-300 transition-colors duration-200 group-active:text-white" />
            <div className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 transform whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0">
              Home
            </div>
          </button>

          {/* Profile */}
          <button
            className={`group relative flex h-10 w-10 transform items-center justify-center rounded-xl bg-gray-800/50 transition-all duration-300 active:-translate-y-1 active:scale-95 active:bg-gray-700/90 ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            } delay-200`}
          >
            <User className="h-5 w-5 text-gray-300 transition-colors duration-200 group-active:text-white" />
            <div className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 transform whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0">
              Profile
            </div>
          </button>

          {/* VS Code - Solo cuando está cerrado */}
          {!isVSCodeOpen && (
            <button
              onClick={openVSCode}
              className={`group relative flex h-12 w-12 transform items-center justify-center rounded-xl bg-green-600/70 shadow-lg transition-all duration-300 active:-translate-y-2 active:scale-90 active:bg-green-500 ${
                isVisible
                  ? 'translate-y-0 scale-100 opacity-100'
                  : 'translate-y-8 scale-95 opacity-0'
              } delay-250`}
            >
              <Code className="h-6 w-6 text-white transition-all duration-200" />
              <div className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 transform whitespace-nowrap rounded bg-green-600 px-2 py-1 text-xs text-white opacity-0">
                VS Code
              </div>
            </button>
          )}

          {/* Settings */}
          <button
            className={`group relative flex h-10 w-10 transform items-center justify-center rounded-xl bg-gray-800/50 transition-all duration-300 active:-translate-y-1 active:scale-95 active:bg-gray-700/90 ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            } delay-300`}
          >
            <Settings className="h-5 w-5 text-gray-300 transition-colors duration-200 group-active:text-white" />
            <div className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 transform whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0">
              Settings
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyMiniSidebar;
