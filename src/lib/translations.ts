export const translations = {
  es: {
    // Section 1 - Hero
    hero: {
      greeting: "Hola, soy",
      name: "Myke",
      github: "Ver GitHub",
      linkedin: "LinkedIn",
      downloadCV: "Descargar CV",
      scheduleCall: "Agendar reunión",
      backgroundText: "DEV",
      floatingTags: {
        experience: "4+ Años",
        expertise: "Experto React",
        availability: "Disponible Ya",
        remote: "Trabajo Remoto"
      }
    },
    
    // TypewriterText
    typewriter: {
      words: [
        "Desarrollador React",
        "Cazador de Bugs",
        "Obsesionado con Performance",
        "Dinámico con Tailwind CSS",
        "Amante de Framer Motion",
        "Maestro en Gestión de Estado",
        "UI Pixel Perfect",
        "Amante de Storybook",
        "Adicto a TypeScript",
        "Defensor del Código Reutilizable",
      ]
    },
    
    // Section 2 - About
    about: {
      experience: {
        title: "🌟 Experiencia",
        description: "Más de 4 años desarrollando aplicaciones escalables con tecnologías modernas como React y Next.js."
      },
      specialization: {
        title: "🚀 Especialización",
        description: "Desarrollo frontend con foco en accesibilidad, rendimiento y experiencia del usuario."
      },
      skills: {
        title: "🛠️ Habilidades",
        description: "Integración de APIs REST y GraphQL, y desarrollo de interfaces modernas con TypeScript y Tailwind CSS."
      }
    },
    
    // Section 3 - Projects
    projects: {
      viewProject: "Ver Proyecto",
      items: [
        {
          id: 1,
          title: "TouristGo - App de Acompañamiento de Viaje",
          description: "Aplicación de acompañamiento de viaje que ofrece itinerarios personalizados, recomendaciones locales y herramientas de planificación para viajeros. Diseñada para mejorar la experiencia de viaje con integración de mapas y guías interactivas.",
          tech: ["Golang", "React JS", "TypeScript", "Tailwind CSS", "Framer Motion"],
          url: "https://tourist-golang.netlify.app/"
        },
        {
          id: 2,
          title: "App Copilot Kit - Next.js",
          description: "Aplicación creada con Next.js para integrar IA fácilmente en frontend y backend. Utiliza Copilot Kit para generar acciones visuales dinámicas basadas en IA, proporcionando una experiencia interactiva y adaptable según el análisis de datos y respuestas del modelo.",
          tech: ["Next.js", "Copilot Kit", "OpenAI API", "React", "TypeScript"],
          url: "#"
        },
        {
          id: 3,
          title: "App de Venta de Stickers",
          description: "Plataforma integral para la gestión de una empresa de stickers. Digitaliza procesos clave como la creación, administración y seguimiento de pedidos, manejo de inventario, y gestión de campañas de marketing, todo en una sola plataforma.",
          tech: ["React", "Tailwind", "TypeScript"],
          url: "#"
        }
      ]
    }
  },
  
  en: {
    // Section 1 - Hero
    hero: {
      greeting: "Hi, I'm",
      name: "Myke",
      github: "View GitHub",
      linkedin: "LinkedIn",
      downloadCV: "Download CV",
      scheduleCall: "Schedule Meeting",
      backgroundText: "DEV",
      floatingTags: {
        experience: "4+ Years",
        expertise: "React Expert",
        availability: "Available Now",
        remote: "Remote Ready"
      }
    },
    
    // TypewriterText
    typewriter: {
      words: [
        "React Developer",
        "Bug Killer",
        "UI Performance Obsessed",
        "Tailwind CSS Dynamic",
        "Framer Motion Lover",
        "State Management Master",
        "Pixel Perfect UI",
        "Storybook Lover",
        "TypeScript Addict",
        "Reusable Code Advocate",
      ]
    },
    
    // Section 2 - About
    about: {
      experience: {
        title: "🌟 Experience",
        description: "Over 4 years developing scalable applications with modern technologies like React and Next.js."
      },
      specialization: {
        title: "🚀 Specialization",
        description: "Frontend development focused on accessibility, performance and user experience."
      },
      skills: {
        title: "🛠️ Skills",
        description: "REST and GraphQL API integration, and modern interface development with TypeScript and Tailwind CSS."
      }
    },
    
    // Section 3 - Projects
    projects: {
      viewProject: "View Project",
      items: [
        {
          id: 1,
          title: "TouristGo - Travel Companion App",
          description: "Travel companion application that offers personalized itineraries, local recommendations and planning tools for travelers. Designed to enhance travel experience with maps integration and interactive guides.",
          tech: ["Golang", "React JS", "TypeScript", "Tailwind CSS", "Framer Motion"],
          url: "https://tourist-golang.netlify.app/"
        },
        {
          id: 2,
          title: "Copilot Kit App - Next.js",
          description: "Application built with Next.js to easily integrate AI in frontend and backend. Uses Copilot Kit to generate dynamic visual actions based on AI, providing an interactive and adaptable experience according to data analysis and model responses.",
          tech: ["Next.js", "Copilot Kit", "OpenAI API", "React", "TypeScript"],
          url: "#"
        },
        {
          id: 3,
          title: "Sticker Seller App",
          description: "Comprehensive platform for managing a sticker business. Digitizes key processes like creation, administration and order tracking, inventory management, and marketing campaigns management, all in one platform.",
          tech: ["React", "Tailwind", "TypeScript"],
          url: "#"
        }
      ]
    }
  }
};

export type TranslationKey = keyof typeof translations.es;
export type Language = keyof typeof translations; 