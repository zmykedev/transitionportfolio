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
    <div className={`fixed left-1/2 bottom-0 transform -translate-x-1/2 z-40 md:hidden transition-all duration-1000 ${
      isVisible 
        ? 'translate-y-0 opacity-100 ease-out' 
        : 'translate-y-full opacity-0 ease-in'
    }`}>
      {/* Mac-style Dock Mini Sidebar */}
      <div className="bg-gray-900/95 backdrop-blur-md border-t border-l border-r border-gray-700/40 rounded-t-3xl py-4 px-4 shadow-2xl relative overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-800/10 to-transparent pointer-events-none"></div>
        <div className="flex flex-row items-center space-x-4 relative z-10">
          
          {/* Home */}
          <button className={`group relative flex items-center justify-center w-10 h-10 bg-gray-800/50 active:bg-gray-700/90 rounded-xl transition-all duration-300 active:scale-95 active:-translate-y-1 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          } delay-150`}>
            <Home className="w-5 h-5 text-gray-300 group-active:text-white transition-colors duration-200" />
            <div className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 pointer-events-none whitespace-nowrap">
              Home
            </div>
          </button>

          {/* Profile */}
          <button className={`group relative flex items-center justify-center w-10 h-10 bg-gray-800/50 active:bg-gray-700/90 rounded-xl transition-all duration-300 active:scale-95 active:-translate-y-1 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          } delay-200`}>
            <User className="w-5 h-5 text-gray-300 group-active:text-white transition-colors duration-200" />
            <div className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 pointer-events-none whitespace-nowrap">
              Profile
            </div>
          </button>

          {/* VS Code - Solo cuando está cerrado */}
          {!isVSCodeOpen && (
            <button 
              onClick={openVSCode}
              className={`group relative flex items-center justify-center w-12 h-12 bg-green-600/70 active:bg-green-500 rounded-xl transition-all duration-300 active:scale-90 active:-translate-y-2 shadow-lg transform ${
                isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
              } delay-250`}
            >
              <Code className="w-6 h-6 text-white transition-all duration-200" />
              <div className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-green-600 text-white text-xs rounded opacity-0 pointer-events-none whitespace-nowrap">
                VS Code
              </div>
            </button>
          )}

          {/* Settings */}
          <button className={`group relative flex items-center justify-center w-10 h-10 bg-gray-800/50 active:bg-gray-700/90 rounded-xl transition-all duration-300 active:scale-95 active:-translate-y-1 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          } delay-300`}>
            <Settings className="w-5 h-5 text-gray-300 group-active:text-white transition-colors duration-200" />
            <div className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 pointer-events-none whitespace-nowrap">
              Settings
            </div>
          </button>

        </div>
      </div>
    </div>
  );
};

export default StickyMiniSidebar;
