export type Lang = 'es' | 'en'

type Word = { text: string; size: 'xs' | 'sm' | 'lg' | 'xl' }

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
    proyectos: string
    herramientas: string
    experiencia: string
    contacto: string
  }
  brand: {
    title: string
    subtitle: string
  }
  hero: {
    words: Word[]
    stamp: string
  }
  sobreMi: {
    title: string
    stamp: string
    para1: string
    philosophyQuote: string
    philosophyAuthor: string
  }
  proyectos: {
    title: string
    stamp: string
    intro: string
    viewProject: string
    visitSite: string
    viewAll: string
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
  herramientas: {
    title: string
    stamp: string
    intro: string
  }
  galeria: {
    title: string
    stamp: string
    intro: string
    backHome: string
    /** Section header for each year group on the gallery page. */
    yearLabel: string
  }
  contacto: {
    title: string
    stamp: string
    intro: string[]
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
      proyectos:   'Proyectos',
      herramientas: 'Herramientas',
      experiencia: 'Experiencia',
      contacto:    'Contacto',
    },
    brand: {
      title:    'PORTAFOLIO',
      subtitle: 'patodev · Ingeniero de Software',
    },
    hero: {
      words: [
        { text: 'Soy',       size: 'sm' },
        { text: 'Ingeniero', size: 'xl' },
        { text: 'de',        size: 'xs' },
        { text: 'Software',  size: 'xl' },
      ],
      stamp: '私',
    },
    sobreMi: {
      title: 'Sobre mí',
      stamp: '紹介',
      para1:
        'Hola, soy Patricio García — mis amigos me dicen Pato. Soy ingeniero en sistemas computacionales y hoy en día estoy enfocado en el desarrollo de software. Me apasiona construir herramientas, entender cómo funcionan por dentro y simplificar flujos de trabajo complejos. Últimamente, la inteligencia artificial se ha convertido en un gran compañero de desarrollo: la veo como una herramienta extraordinaria que potencia enormemente lo que podemos crear en este ámbito.',
      philosophyQuote: '«Tengo que dar un paso a la vez, solo uno a la vez.»',
      philosophyAuthor: '— Garou',
    },
    proyectos: {
      title: 'Proyectos',
      stamp: '開発者',
      intro:
        'Una selección de proyectos en los que he trabajado, aplicando mis conocimientos para crear soluciones eficientes, escalables y centradas en las necesidades de los usuarios.',
      viewProject: 'Ver proyecto',
      visitSite:   'Visitar sitio',
      viewAll:     'Ver todos los proyectos',
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
      certificacionesTitle: 'Certificaciones',
      viewCert: 'Ver certificado',
      certificaciones: [
        { period: '2026', name: 'Desarrollo con IA', institution: 'Certificación Profesional' },
      ],
    },
    herramientas: {
      title: 'Herramientas',
      stamp: '工具',
      intro:
        'Mi mesa de trabajo digital. Estas son las herramientas que uso día a día para transformar ideas en software real — desde interfaces con personalidad hasta agentes de IA que aceleran cada línea de código.',
    },
    galeria: {
      title: 'Galería',
      stamp: '作品',
      intro:
        'Todos los proyectos en los que he trabajado este año, desde experimentos rápidos hasta plataformas full-stack en producción. Cada tarjeta muestra el stack real que usé.',
      backHome: 'Volver al inicio',
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
      proyectos:   'Projects',
      herramientas: 'Tools',
      experiencia: 'Experience',
      contacto:    'Contact',
    },
    brand: {
      title:    'PORTFOLIO',
      subtitle: 'patodev · Software Engineer',
    },
    hero: {
      words: [
        { text: 'I am',     size: 'sm' },
        { text: 'a',        size: 'xs' },
        { text: 'Software', size: 'xl' },
        { text: 'Engineer', size: 'xl' },
      ],
      stamp: '私',
    },
    sobreMi: {
      title: 'About me',
      stamp: '紹介',
      para1:
        "Hi, I'm Patricio García — friends call me Pato. I'm a Computer Systems Engineer currently focused on software development. I'm passionate about building tools, understanding how things work under the hood, and simplifying complex workflows. Lately, artificial intelligence has become a great development companion: I see it as an extraordinary tool that tremendously amplifies what we can create in this field.",
      philosophyQuote: '"I have to take one step at a time, just one at a time."',
      philosophyAuthor: '— Garou',
    },
    proyectos: {
      title: 'Projects',
      stamp: '開発者',
      intro:
        'A selection of projects I have worked on, applying my knowledge to build efficient, scalable solutions centered around user needs.',
      viewProject: 'View project',
      visitSite:   'Visit site',
      viewAll:     'View all projects',
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
      certificacionesTitle: 'Certifications',
      viewCert: 'View certificate',
      certificaciones: [
        { period: '2026', name: 'AI-Assisted Development', institution: 'Professional Certification' },
      ],
    },
    herramientas: {
      title: 'Tools',
      stamp: '工具',
      intro:
        'My digital workbench. These are the tools I use every day to turn ideas into real software — from characterful interfaces to AI agents that accelerate every line of code.',
    },
    galeria: {
      title: 'Gallery',
      stamp: '作品',
      intro:
        'Every project I have worked on this year — from quick experiments to full-stack platforms in production. Each card shows the actual stack I used.',
      backHome: 'Back to home',
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
