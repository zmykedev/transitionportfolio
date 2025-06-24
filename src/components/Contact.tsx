import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Mail,
  Phone,
  MapPin,
  Download,
  Send,
  Github,
  Linkedin,
  MessageCircle,
  Zap
} from "lucide-react";

export function Contact() {
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Efecto de holograma para el título
      const createHologramEffect = () => {
        const title = document.querySelector('.contact-title');
        if (!title) return;

        // Crear efecto de holograma
        const hologram = document.createElement('div');
        hologram.className = 'hologram-effect';
        hologram.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, transparent 30%, rgba(139, 92, 246, 0.3) 50%, transparent 70%);
          transform: translateX(-100%);
          pointer-events: none;
        `;
        title.appendChild(hologram);

        gsap.to(hologram, {
          x: '100%',
          duration: 2,
          repeat: -1,
          ease: "power2.inOut"
        });
      };

      // Animación del título con efecto de holograma
      gsap.fromTo(".contact-title",
        { 
          opacity: 0, 
          y: 50,
          scale: 0,
          rotation: 360,
          skewX: 20
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          skewX: 0,
          duration: 2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".contact-title",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          onComplete: createHologramEffect
        }
      );

      // Efecto de ondas de sonido para los contact items
      const createSoundWaves = () => {
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach((item, index) => {
          // Crear ondas de sonido
          for (let i = 0; i < 3; i++) {
            const wave = document.createElement('div');
            wave.className = 'sound-wave';
            wave.style.cssText = `
              position: absolute;
              top: 50%;
              left: 50%;
              width: 0;
              height: 0;
              border: 1px solid rgba(6, 182, 212, 0.3);
              border-radius: 50%;
              transform: translate(-50%, -50%);
              pointer-events: none;
            `;
            item.appendChild(wave);

            gsap.to(wave, {
              width: 100 + i * 30,
              height: 100 + i * 30,
              opacity: 0,
              duration: 1.5,
              delay: i * 0.2,
              repeat: -1,
              ease: "power2.out"
            });
          }
        });
      };

      // Animación de los contact items con efecto de ondas
      gsap.fromTo(".contact-item",
        { 
          opacity: 0, 
          y: 50, 
          scale: 0.8,
          rotationX: 90,
          rotationY: 45
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".contact-items",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          onComplete: createSoundWaves
        }
      );

      // Efecto de energía para el formulario
      const createFormEnergy = () => {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        // Crear líneas de energía alrededor del formulario
        for (let i = 0; i < 8; i++) {
          const energyLine = document.createElement('div');
          energyLine.className = 'form-energy-line';
          energyLine.style.cssText = `
            position: absolute;
            width: 2px;
            height: 0;
            background: linear-gradient(to bottom, transparent, #f59e0b, transparent);
            top: 0;
            left: ${12.5 * i}%;
            pointer-events: none;
            opacity: 0;
          `;
          form.appendChild(energyLine);

          gsap.to(energyLine, {
            height: '100%',
            opacity: 1,
            duration: 1,
            delay: i * 0.1,
            ease: "power2.out"
          });
        }

        // Crear partículas de energía en las esquinas
        const corners = [
          { top: '0', left: '0' },
          { top: '0', right: '0' },
          { bottom: '0', left: '0' },
          { bottom: '0', right: '0' }
        ];

        corners.forEach((corner, cornerIndex) => {
          for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'corner-particle';
            particle.style.cssText = `
              position: absolute;
              width: 3px;
              height: 3px;
              background: #f59e0b;
              border-radius: 50%;
              ${Object.entries(corner).map(([key, value]) => `${key}: ${value}`).join('; ')};
              pointer-events: none;
              opacity: 0;
            `;
            form.appendChild(particle);

            gsap.set(particle, { opacity: 0, scale: 0 });
            gsap.to(particle, {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              delay: cornerIndex * 0.2 + i * 0.1
            });
            gsap.to(particle, {
              x: (Math.random() - 0.5) * 50,
              y: (Math.random() - 0.5) * 50,
              opacity: 0,
              scale: 0,
              duration: 1,
              delay: 0.5 + cornerIndex * 0.2 + i * 0.1,
              ease: "power2.out"
            });
          }
        });
      };

      // Animación del formulario con efecto de energía
      gsap.fromTo(".contact-form",
        { 
          opacity: 0, 
          y: 100, 
          scale: 0.9,
          rotationX: 45,
          z: -100
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          z: 0,
          duration: 1.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          onComplete: createFormEnergy
        }
      );

      // Efecto de hover para los inputs
      const inputs = document.querySelectorAll('.contact-input');
      inputs.forEach(input => {
        input.addEventListener('focus', () => {
          gsap.to(input, {
            duration: 0.3,
            scale: 1.02,
            borderColor: '#8b5cf6',
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
            ease: "power2.out"
          });

          // Crear efecto de chispas
          for (let i = 0; i < 5; i++) {
            const spark = document.createElement('div');
            spark.className = 'input-spark';
            spark.style.cssText = `
              position: absolute;
              width: 2px;
              height: 2px;
              background: #8b5cf6;
              border-radius: 50%;
              top: 50%;
              left: 50%;
              pointer-events: none;
            `;
            input.appendChild(spark);

            gsap.fromTo(spark, 
              { opacity: 1, scale: 0 },
              {
                opacity: 0,
                scale: 1,
                x: (Math.random() - 0.5) * 30,
                y: (Math.random() - 0.5) * 30,
                duration: 0.6,
                ease: "power2.out"
              }
            );
          }
        });

        input.addEventListener('blur', () => {
          gsap.to(input, {
            duration: 0.3,
            scale: 1,
            borderColor: '#374151',
            boxShadow: 'none',
            ease: "power2.out"
          });
        });
      });

      // Efecto de hover para el botón de envío
      const submitButton = document.querySelector('.submit-button');
      if (submitButton) {
        submitButton.addEventListener('mouseenter', () => {
          gsap.to(submitButton, {
            duration: 0.3,
            scale: 1.05,
            rotation: 5,
            ease: "power2.out"
          });

          // Crear efecto de energía
          for (let i = 0; i < 10; i++) {
            const energyParticle = document.createElement('div');
            energyParticle.className = 'button-energy';
            energyParticle.style.cssText = `
              position: absolute;
              width: 3px;
              height: 3px;
              background: #f59e0b;
              border-radius: 50%;
              top: 50%;
              left: 50%;
              pointer-events: none;
            `;
            submitButton.appendChild(energyParticle);

            gsap.set(energyParticle, { opacity: 0, scale: 0 });
            gsap.to(energyParticle, {
              opacity: 1,
              scale: 1,
              duration: 0.3,
              delay: i * 0.05
            });
            gsap.to(energyParticle, {
              x: (Math.random() - 0.5) * 100,
              y: (Math.random() - 0.5) * 100,
              opacity: 0,
              scale: 0,
              duration: 1,
              delay: 0.3 + i * 0.05,
              ease: "power2.out"
            });
          }
        });

        submitButton.addEventListener('mouseleave', () => {
          gsap.to(submitButton, {
            duration: 0.3,
            scale: 1,
            rotation: 0,
            ease: "power2.out"
          });
        });
      }

      // Efecto de ondas de energía en el fondo
      const createEnergyWaves = () => {
        const container = contactRef.current;
        if (!container) return;

        for (let i = 0; i < 4; i++) {
          const wave = document.createElement('div');
          wave.className = 'energy-wave';
          wave.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border: 2px solid rgba(245, 158, 11, 0.2);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
          `;
          container.appendChild(wave);

          gsap.to(wave, {
            width: 600 + i * 150,
            height: 600 + i * 150,
            opacity: 0,
            duration: 4,
            delay: i * 0.5,
            repeat: -1,
            ease: "power2.out"
          });
        }
      };

      createEnergyWaves();

    }, contactRef);

    return () => ctx.revert();
  }, []);

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "zmaikol399@gmail.com",
      href: "mailto:zmaikol399@gmail.com",
      color: "purple"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+57 300 123 4567",
      href: "tel:+573001234567",
      color: "cyan"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Colombia",
      href: "#",
      color: "orange"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/zmykedev",
      label: "GitHub",
      color: "gray"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/mzapatadvlpr/",
      label: "LinkedIn",
      color: "blue"
    }
  ];

  return (
    <section 
      ref={contactRef}
      className="min-h-screen flex flex-col justify-center items-center relative py-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/20 via-slate-900 to-black"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="contact-title text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-orange-400 via-yellow-400 to-cyan-400 bg-clip-text text-transparent relative">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's collaborate and create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="contact-items space-y-8">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-orange-400" />
              Let's Connect
            </h3>
            
            {contactInfo.map((info, index) => (
              <div
                key={info.label}
                className="contact-item group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 hover:border-orange-500/50 transition-all duration-500 cursor-pointer transform-gpu"
                style={{ perspective: "1000px" }}
              >
                <a
                  href={info.href}
                  className="flex items-center gap-4 group-hover:scale-105 transition-transform duration-300"
                >
                  <div className={`relative p-3 bg-gradient-to-br from-${info.color}-600/20 to-${info.color}-800/20 rounded-xl border border-${info.color}-500/30 group-hover:border-${info.color}-400/50 transition-colors duration-300`}>
                    <info.icon className={`w-6 h-6 text-${info.color}-400 group-hover:text-${info.color}-300 transition-colors duration-300`} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-medium">{info.label}</p>
                    <p className="text-white font-semibold group-hover:text-orange-300 transition-colors duration-300">
                      {info.value}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="contact-form relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 transform-gpu">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <Zap className="w-6 h-6 text-orange-400" />
              Send Message
            </h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="contact-input w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="contact-input w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="contact-input w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300"
                  placeholder="Project inquiry"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="contact-input w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="submit-button w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-500 transform hover:scale-105 flex items-center justify-center gap-3 group"
              >
                <Send className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
} 