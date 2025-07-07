import React, { useEffect } from 'react';

const spinnerKeyframes = `
@keyframes spinning82341 {
  to {
    transform: rotate(360deg);
  }
}
`;

const AuroraSpinner: React.FC = () => {
  // Inyecta el keyframe solo una vez
  useEffect(() => {
    if (!document.getElementById('aurora-spinner-keyframes')) {
      const style = document.createElement('style');
      style.id = 'aurora-spinner-keyframes';
      style.innerHTML = spinnerKeyframes;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div
        className="spinner relative flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(rgb(186, 66, 255) 35%, rgb(0, 225, 255))',
          width: 100,
          height: 100,
          borderRadius: 50,
          filter: 'blur(1px)',
          boxShadow:
            '0px -5px 20px 0px rgb(186, 66, 255), 0px 5px 20px 0px rgb(0, 225, 255)',
          animation: 'spinning82341 1.7s linear infinite',
          textAlign: 'center',
        }}
      >
        <div
          className="spinner1 absolute"
          style={{
            backgroundColor: 'rgb(36, 36, 36)',
            width: 100,
            height: 100,
            borderRadius: 50,
            filter: 'blur(10px)',
            left: 0,
            top: 0,
          }}
        />
      </div>
    </div>
  );
};

export default AuroraSpinner;
