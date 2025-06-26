
const WaterEffect = () => {
  return (
    <div className="water-effect-container">
      <style>
        {`
          .water-effect-container {
            overflow: hidden;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 50;
            -moz-animation-name: bgTransition;
            -webkit-animation-name: bgTransition;
            animation-name: bgTransition;
            -moz-animation-delay: 1s;
            -webkit-animation-delay: 1s;
            animation-delay: 1s;
            -moz-animation-duration: 1s;
            -webkit-animation-duration: 1s;
            animation-duration: 1s;
            -moz-animation-timing-function: ease-in-out;
            -webkit-animation-timing-function: ease-in-out;
            animation-timing-function: ease-in-out;
            -moz-animation-fill-mode: forwards;
            -webkit-animation-fill-mode: forwards;
            animation-fill-mode: forwards;
          }

          .water-effect-container > div {
            margin: 175px auto;
          }

          .drop {
            position: relative;
            width: 20px;
            height: 20px;
            top: -30px;
            opacity: 0;
            margin: 0 auto;
            background: #FFF;
            -moz-border-radius: 20px;
            -webkit-border-radius: 20px;
            border-radius: 20px;
            -moz-animation-name: drip;
            -webkit-animation-name: drip;
            animation-name: drip;
            -moz-animation-timing-function: cubic-bezier(1,0,.91,.19);
            -webkit-animation-timing-function: cubic-bezier(1,0,.91,.19);
            animation-timing-function: cubic-bezier(1,0,.91,.19);
            -moz-animation-duration: 1s;
            -webkit-animation-duration: 1s;
            animation-duration: 1s;
            -moz-animation-iteration-count: 1;
            -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
          }

          .drop:before {
            content: "";
            position: absolute;
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 30px solid rgba(255,255,255,1);
            top: -22px;
          }

          .wave {
            position: relative;
            opacity: 0;
            top: 0;
            width: 2px;
            height: 1px;
            border: #FFF 7px solid;
            -moz-border-radius: 300px / 150px;
            -webkit-border-radius: 300px / 150px;
            border-radius: 300px / 150px;
            -moz-animation-name: ripple;
            -webkit-animation-name: ripple;
            animation-name: ripple;
            -moz-animation-delay: 1s;
            -webkit-animation-delay: 1s;
            -moz-animation-duration: 1s;
            -webkit-animation-duration: 1s;
            animation-duration: 1s;
            -moz-animation-iteration-count: 1;
            -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
          }

          .wave:after {
            content: "";
            position: absolute;
            opacity: 0;
            top: -5px;
            left: -5px;
            width: 2px;
            height: 1px;
            border: #FFF 5px solid;
            -moz-border-radius: 300px / 150px;
            -webkit-border-radius: 300px / 150px;
            border-radius: 300px / 150px;
            -moz-animation-name: ripple-2;
            -webkit-animation-name: ripple-2;
            animation-name: ripple-2;
            -moz-animation-duration: 1s;
            -webkit-animation-duration: 1s;
            animation-duration: 1s;
            -moz-animation-iteration-count: 1;
            -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
          }

       

          @keyframes ripple {
            from {
              opacity: 1;
            }
            to {
              width: 600px;
              height: 300px;
              border-width: 1px;
              top: -100px;
              opacity: 0;
            }
          }

          @keyframes ripple-2 {
            0% {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
            100% {
              width: 200px;
              height: 100px;
              border-width: 1px;
              top: 100px;
              left: 200px;
            }
          }

          @keyframes drip {
            0% {
              opacity: 1;
            }
              
            100% {
            top: 190px;
            opacity: 0;
            }
          }
        `}
      </style>
      
      <div className="drop"></div>
      <div className="wave"></div>
    </div>
  );
};

export default WaterEffect;