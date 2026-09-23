export type Lang = 'es' | 'en'

type ExperienceItem = {
  period: string
  title: string
  institution: string
  description: string
}

type InfoItem = { label: string; value: string; href?: string }

type Dict = {
  nav: {
    inicio: string
    sobreMi: string
    trabajo: string
    experiencia: string
    symmetricalCode: string
    contacto: string
    menuOpen: string
    menuClose: string
  }
  brand: {
    title: string
    subtitle: string
  }
  hero: {
    availability: string
    positioning: { prefix: string; highlight: string; suffix: string }
    scrollHint: string
    stamp: string
    ctaContact: string
    ctaContactAriaLabel: string
    ctaCv: string
    ctaCvAriaLabel: string
  }
  sobreMi: {
    title: string
    stamp: string
    para1: string
    philosophyQuote: string
    philosophyAuthor: string
    stackLabel: string
  }
  proyectos: {
    title: string
    stamp: string
    intro: string
    viewProject: string
    visitSite: string
    viewAll: string
    demoLabel: string
    codeLabel: string
    guias: { title: string; href: string }[]
  }
  experiencia: {
    title: string
    stamp: string
    intro: string
    placeholderImage: string
    items: ExperienceItem[]
    certificacionesTitle: string
    viewCert: string
    certificaciones: { period: string; name: string; institution: string }[]
  }
  symmetricalCode: {
    title: string
    stamp: string
    tagline: string
    intro: string
    services: { title: string; description: string }[]
    ctaVisit: string
    ctaContact: string
  }
  galeria: {
    /** Page title, e.g. "Todos los proyectos" / "All projects". */
    title: string
    stamp: string
    intro: string
    backHome: string
    /** Mono word before the project count, e.g. "Archivo" / "Archive". */
    archiveLabel: string
    /** Section header for each year group on the gallery page. */
    yearLabel: string
  }
  contacto: {
    title: string
    stamp: string
    intro: string[]
    heading: string
    copy: string
    copied: string
    backToTop: string
    info: {
      email: InfoItem
      location: InfoItem
      linkedin: InfoItem
      github: InfoItem
    }
    form: {
      nameLabel: string
      namePlaceholder: string
      emailLabel: string
      emailPlaceholder: string
      subjectLabel: string
      subjectPlaceholder: string
      messageLabel: string
      messagePlaceholder: string
      submit: string
      sending: string
      success: string
      error: string
    }
  }
}

export const translations: Record<Lang, Dict> = {
  es: {
    nav: {
      inicio:      'Inicio',
      sobreMi:     'Sobre mí',
      trabajo:     'Trabajo',
      experiencia: 'Experiencia',
      symmetricalCode: 'Estudio',
      contacto:    'Contacto',
      menuOpen:    'Menú',
      menuClose:   'Cerrar menú',
    },
    brand: {
      title:    'PORTAFOLIO',
      subtitle: 'patodev · Ingeniero de Software',
    },
    hero: {
      availability: 'Disponible para nuevos proyectos · Guanajuato, MX',
      positioning: {
        prefix: 'Construyo software ',
        highlight: 'full-stack',
        suffix: ' con React y TypeScript.',
      },
      scrollHint: 'Desliza',
      stamp: '私',
      ctaContact: 'Contactar',
      ctaContactAriaLabel: 'Contactar — ir a la sección de contacto',
      ctaCv: 'Descargar CV',
      ctaCvAriaLabel: 'Descargar CV — PDF, se abre en una pestaña nueva',
    },
    sobreMi: {
      title: 'Sobre mí',
      stamp: '紹介',
      para1:
        'Hola, soy Patricio García — mis amigos me dicen Pato. Soy ingeniero en sistemas computacionales y hoy en día estoy enfocado en el desarrollo de software. Me apasiona construir herramientas, entender cómo funcionan por dentro y simplificar flujos de trabajo complejos. Últimamente, la inteligencia artificial se ha convertido en un gran compañero de desarrollo: la veo como una herramienta extraordinaria que potencia enormemente lo que podemos crear en este ámbito.',
      philosophyQuote: '«Tengo que dar un paso a la vez, solo uno a la vez.»',
      philosophyAuthor: '— Garou',
      stackLabel: 'Stack',
    },
    proyectos: {
      title: 'Proyectos',
      stamp: '開発者',
      intro:
        'Una selección de proyectos en los que he trabajado, aplicando mis conocimientos para crear soluciones eficientes, escalables y centradas en las necesidades de los usuarios.',
      viewProject: 'Ver proyecto',
      visitSite:   'Visitar sitio',
      viewAll:     'Ver todos los proyectos',
      demoLabel:   'Demo',
      codeLabel:   'Código',
      guias: [
        { title: 'Guía Dual Boot Ubuntu - Windows 11', href: 'https://guia-dual-boot-ubuntu-windows11.patodev.com/' },
        { title: 'Guía Dual Boot Fedora 43 - Windows 11', href: 'https://guia-dual-boot-fedora43-windows11.patodev.com/' },
        { title: 'Guía Gentle AI Kimi Code Win11', href: 'https://guia-gentle-ai-kimi-code-win11.patodev.com/' },
        { title: 'Guía OpenClaw Windows 11', href: 'https://guia-openclaw-windows11.patodev.com/' },
        { title: 'Guía Gentle AI Claude Code Win11', href: 'https://guia-gentle-ai-claude-code-win11.patodev.com/' },
      ],
    },
    experiencia: {
      title: 'Experiencia',
      stamp: '経験',
      intro:
        'Este es mi gran inicio. Mi carrera universitaria y mis prácticas profesionales fueron años de esfuerzo dedicado que me enseñaron el valor del compromiso y el aprendizaje constante. Hoy doy este primer paso con confianza, sabiendo que esto es solo el comienzo de un camino lleno de crecimiento y proyectos por construir.',
      placeholderImage: 'Imagen pendiente',
      items: [
        {
          period: '2021 — 2025',
          title: 'Graduación Universitaria',
          institution: 'Universidad de Guanajuato',
          description:
            'Formación en ingeniería en sistemas computacionales con énfasis en desarrollo web, algoritmos, estructuras de datos y arquitectura de sistemas. Participación en proyectos académicos de machine learning y visión por computadora.',
        },
        {
          period: '2025 — 2026',
          title: 'Prácticas Profesionales',
          institution: 'Mazda Motor Manufacturing',
          description:
            'Desarrollo de un sistema de gestión de documentos para el área de IT que agilizó significativamente los procesos internos. Colaboración en equipo multidisciplinario y aplicación de metodologías ágiles en un entorno industrial.',
        },
      ],
      certificacionesTitle: 'Formación',
      viewCert: 'Ver certificado',
      certificaciones: [
        { period: '2026', name: 'Desarrollo con IA', institution: 'Certificación Profesional' },
        { period: '23/07/2026', name: 'Formación en Inteligencia Artificial', institution: 'TecNM / SEP / CPFIA' },
        { period: '27/06/2026', name: 'Desarrollo con IA: Programa con Agentes', institution: 'mouredev & BIG school' },
      ],
    },
    symmetricalCode: {
      title: 'Symmetrical Code',
      stamp: '設計',
      tagline: 'Ingeniería real para problemas reales.',
      intro:
        'Además de mis proyectos personales, dirijo Symmetrical Code, un estudio de desarrollo de software en etapa inicial. Convertimos ideas claras en productos digitales simples y rápidos, listos para crecer desde el primer lanzamiento.',
      services: [
        {
          title: 'Sitios y apps que venden',
          description: 'Sitios web y aplicaciones con diseño profesional y carga rápida, pensados para convertir visitantes en clientes.',
        },
        {
          title: 'Automatización y sistemas',
          description: 'Conectamos tus herramientas y automatizamos procesos para que tu operación funcione sola.',
        },
        {
          title: 'Tu negocio siempre en línea',
          description: 'Infraestructura en la nube de alta disponibilidad, para que tu sitio nunca se caiga.',
        },
        {
          title: 'Ciberseguridad',
          description: 'Protegemos tus datos y los de tus clientes con seguridad de nivel bancario.',
        },
      ],
      ctaVisit: 'Visitar Symmetrical Code',
      ctaContact: 'Hablemos',
    },
    galeria: {
      title: 'Todos los proyectos',
      stamp: '作品',
      intro:
        'Todos los proyectos en los que he trabajado este año, desde experimentos rápidos hasta plataformas full-stack en producción. Cada tarjeta muestra el stack real que usé.',
      backHome: 'Volver al inicio',
      archiveLabel: 'Archivo',
      yearLabel: 'Año',
    },
    contacto: {
      title: 'Contacto',
      stamp: '問合せ',
      intro: [
        '¿Tienes alguna idea o proyecto en mente?',
        'Estoy siempre abierto a nuevas oportunidades,',
        'colaboraciones o simplemente a charlar.',
        '¡Hablemos!',
      ],
      heading: '¿Construimos algo?',
      copy: 'Copiar',
      copied: '¡Copiado!',
      backToTop: 'Volver arriba',
      info: {
        email:    { label: 'EMAIL',     value: 'pa.garciaperezvela@ugto.mx',     href: 'mailto:pa.garciaperezvela@ugto.mx' },
        location: { label: 'UBICACIÓN', value: 'Guanajuato, México' },
        linkedin: { label: 'LINKEDIN',  value: 'linkedin.com/in/patricioagpv',   href: 'https://www.linkedin.com/in/patricioagpv/' },
        github:   { label: 'GITHUB',    value: 'github.com/p5Patricio',          href: 'https://github.com/p5Patricio' },
      },
      form: {
        nameLabel:          'NOMBRE',
        namePlaceholder:    'Tu nombre',
        emailLabel:         'EMAIL',
        emailPlaceholder:   'tu@email.com',
        subjectLabel:       'ASUNTO',
        subjectPlaceholder: 'Asunto del mensaje',
        messageLabel:       'MENSAJE',
        messagePlaceholder: 'Escribe tu mensaje aquí...',
        submit:             'Enviar mensaje',
        sending:            'Enviando...',
        success:            '¡Mensaje enviado! Te responderé pronto.',
        error:              'No se pudo enviar. Intenta de nuevo más tarde.',
      },
    },
  },
  en: {
    nav: {
      inicio:      'Home',
      sobreMi:     'About',
      trabajo:     'Work',
      experiencia: 'Experience',
      symmetricalCode: 'Studio',
      contacto:    'Contact',
      menuOpen:    'Menu',
      menuClose:   'Close menu',
    },
    brand: {
      title:    'PORTFOLIO',
      subtitle: 'patodev · Software Engineer',
    },
    hero: {
      availability: 'Available for new projects · Guanajuato, MX',
      positioning: {
        prefix: 'I build ',
        highlight: 'full-stack software',
        suffix: ' with React and TypeScript.',
      },
      scrollHint: 'Scroll',
      stamp: '私',
      ctaContact: 'Contact me',
      ctaContactAriaLabel: 'Contact me — go to the contact section',
      ctaCv: 'Download CV',
      ctaCvAriaLabel: 'Download CV — PDF, opens in a new tab',
    },
    sobreMi: {
      title: 'About me',
      stamp: '紹介',
      para1:
        "Hi, I'm Patricio García — friends call me Pato. I'm a Computer Systems Engineer currently focused on software development. I'm passionate about building tools, understanding how things work under the hood, and simplifying complex workflows. Lately, artificial intelligence has become a great development companion: I see it as an extraordinary tool that tremendously amplifies what we can create in this field.",
      philosophyQuote: '"I have to take one step at a time, just one at a time."',
      philosophyAuthor: '— Garou',
      stackLabel: 'Stack',
    },
    proyectos: {
      title: 'Projects',
      stamp: '開発者',
      intro:
        'A selection of projects I have worked on, applying my knowledge to build efficient, scalable solutions centered around user needs.',
      viewProject: 'View project',
      visitSite:   'Visit site',
      viewAll:     'View all projects',
      demoLabel:   'Demo',
      codeLabel:   'Code',
      guias: [
        { title: 'Dual Boot Guide: Ubuntu - Windows 11', href: 'https://guia-dual-boot-ubuntu-windows11.patodev.com/' },
        { title: 'Dual Boot Guide: Fedora 43 - Windows 11', href: 'https://guia-dual-boot-fedora43-windows11.patodev.com/' },
        { title: 'Gentle AI Kimi Code Win11 Guide', href: 'https://guia-gentle-ai-kimi-code-win11.patodev.com/' },
        { title: 'OpenClaw Windows 11 Guide', href: 'https://guia-openclaw-windows11.patodev.com/' },
        { title: 'Gentle AI Claude Code Win11 Guide', href: 'https://guia-gentle-ai-claude-code-win11.patodev.com/' },
      ],
    },
    experiencia: {
      title: 'Experience',
      stamp: '経験',
      intro:
        'This is my great beginning. My university studies and professional internship were years of dedicated effort that taught me the value of commitment and continuous learning. Today I take this first step with confidence, knowing this is only the beginning of a path full of growth and projects yet to build.',
      placeholderImage: 'Image pending',
      items: [
        {
          period: '2021 — 2025',
          title: 'University Graduation',
          institution: 'Universidad de Guanajuato',
          description:
            'Computer Systems Engineering education with emphasis on web development, algorithms, data structures, and systems architecture. Participation in academic projects involving machine learning and computer vision.',
        },
        {
          period: '2025 — 2026',
          title: 'Internship',
          institution: 'Mazda Motor Manufacturing',
          description:
            'Development of a document management system for the IT department that significantly streamlined internal processes. Collaboration within a multidisciplinary team and application of agile methodologies in an industrial environment.',
        },
      ],
      certificacionesTitle: 'Training',
      viewCert: 'View certificate',
      certificaciones: [
        { period: '2026', name: 'AI-Assisted Development', institution: 'Professional Certification' },
        { period: '07/23/2026', name: 'Artificial Intelligence Training Program', institution: 'TecNM / SEP / CPFIA' },
        { period: '06/27/2026', name: 'AI Development: Agentic Programming', institution: 'mouredev & BIG school' },
      ],
    },
    symmetricalCode: {
      title: 'Symmetrical Code',
      stamp: '設計',
      tagline: 'Real engineering for real problems.',
      intro:
        "Alongside my personal projects, I run Symmetrical Code, an early-stage software development studio. We turn clear ideas into simple, fast digital products, ready to grow from the first launch.",
      services: [
        {
          title: 'Pages & apps that sell',
          description: 'Professionally designed, fast-loading websites and apps built to turn visitors into customers.',
        },
        {
          title: 'Automation & systems',
          description: 'We connect your tools and automate processes so your operation runs itself.',
        },
        {
          title: 'Your business, always online',
          description: 'High-availability cloud infrastructure, so your site never goes down.',
        },
        {
          title: 'Cybersecurity',
          description: "We protect your data and your customers' with bank-level security.",
        },
      ],
      ctaVisit: 'Visit Symmetrical Code',
      ctaContact: "Let's talk",
    },
    galeria: {
      title: 'All projects',
      stamp: '作品',
      intro:
        'Every project I have worked on this year — from quick experiments to full-stack platforms in production. Each card shows the actual stack I used.',
      backHome: 'Back to home',
      archiveLabel: 'Archive',
      yearLabel: 'Year',
    },
    contacto: {
      title: 'Contact',
      stamp: '問合せ',
      intro: [
        'Do you have an idea or project in mind?',
        'I am always open to new opportunities,',
        'collaborations or simply a good conversation.',
        'Let’s talk!',
      ],
      heading: 'Shall we build something?',
      copy: 'Copy',
      copied: 'Copied!',
      backToTop: 'Back to top',
      info: {
        email:    { label: 'EMAIL',    value: 'pa.garciaperezvela@ugto.mx',     href: 'mailto:pa.garciaperezvela@ugto.mx' },
        location: { label: 'LOCATION', value: 'Guanajuato, Mexico' },
        linkedin: { label: 'LINKEDIN', value: 'linkedin.com/in/patricioagpv',   href: 'https://www.linkedin.com/in/patricioagpv/' },
        github:   { label: 'GITHUB',   value: 'github.com/p5Patricio',          href: 'https://github.com/p5Patricio' },
      },
      form: {
        nameLabel:          'NAME',
        namePlaceholder:    'Your name',
        emailLabel:         'EMAIL',
        emailPlaceholder:   'you@email.com',
        subjectLabel:       'SUBJECT',
        subjectPlaceholder: 'Message subject',
        messageLabel:       'MESSAGE',
        messagePlaceholder: 'Write your message here...',
        submit:             'Send message',
        sending:            'Sending...',
        success:            'Message sent! I will reply soon.',
        error:              'Could not send. Please try again later.',
      },
    },
  },
}
