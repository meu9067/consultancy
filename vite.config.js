import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

// ---------------------------------------------------------------------------
// i18n content. `base` holds locale-independent facts (name, contact details,
// URLs). `content` holds every translated string, keyed by locale. Add a new
// locale by adding a key here and a matching set of entry HTML files (see the
// `pt/` directory for the Portuguese example) — partials pick up the right
// strings automatically based on which page is being rendered.
// ---------------------------------------------------------------------------

const base = {
  name: 'Miguel Esquirol Rios',
  yearsExperience: 15,
  email: 'miguelesquirol@gmail.com',
  linkedin: 'https://www.linkedin.com/in/miguel-esquirol-94289337/',
  github: 'https://github.com/meu9067/consultancy',

  // Unsplash's license doesn't require attribution, but it's good practice —
  // this links to the original photo page.
  backgroundPhotoCredit:
    'https://unsplash.com/photos/silhouette-of-man-looking-at-milky-way-lcT_p8kLCsc',

  // Update this to your real deployed domain — it feeds the canonical URL,
  // Open Graph/Twitter tags, and the JSON-LD structured data below.
  siteUrl: 'https://consultancy.meu9067.workers.dev'
};

const locales = ['en', 'pt'];

const content = {
  en: {
    htmlLang: 'en',
    ogLocale: 'en_US',
    languageName: 'English',
    languageSwitcherLabel: 'Language',
    localePrefix: '',

    siteTitle: 'Accessible by Design — Front-End Accessibility Consultancy',
    tagline:
      'Front-end accessibility consultant helping teams build inclusive, legally compliant digital products.',
    socialImageAlt: 'Accessible by Design — front-end accessibility consultancy',

    skipLink: 'Skip to main content',
    toggleMenuLabel: 'Toggle navigation menu',
    themeToggleDark: 'Dark mode',
    themeToggleLight: 'Light mode',

    nav: {
      about: 'About',
      laws: 'Why It Matters',
      services: 'Services',
      faq: 'FAQ',
      contact: 'Contact'
    },

    hero: {
      eyebrow: 'Front-End Accessibility Consultancy',
      titleHtml: 'Making the web usable for <span class="highlight">everyone</span>.',
      meta: '{{years}}+ years of hands-on front-end and accessibility experience.',
      ctaContact: 'Get in touch',
      ctaServices: 'See services'
    },

    about: {
      title: 'About Me',
      intro:
        "I'm {{name}}, a front-end developer specialising in web accessibility. " +
        "Over {{years}} years I've helped teams across Europe turn inaccessible " +
        'interfaces into inclusive, standards-compliant products — without ' +
        "sacrificing design or performance. I work hands-on with code, not just checklists."
    },

    laws: {
      title: 'New laws, new obligations',
      intro:
        'Accessibility is no longer optional. Across the European Union, a wave of ' +
        'regulation now makes inclusive design a legal requirement for public and ' +
        'private organisations alike.'
    },

    faq: {
      title: 'Frequently asked questions'
    },

    contact: {
      title: "Let's make your product accessible",
      body:
        "Whether you need an audit, hands-on remediation, or training for your " +
        "team, I'd love to hear about your project.",
      emailPrefix: 'Email',
      linkedinCta: 'Connect on LinkedIn',
      githubCta: 'View on GitHub',
      newTabSuffix: '(opens in a new tab)'
    },

    footer: {
      rights: 'All rights reserved.',
      noteBefore: 'Built accessible, from the ground up. Background photo via',
      noteLinkText: 'Unsplash',
      accessibilityStatement: 'Accessibility statement',
      privacyPolicy: 'Privacy policy',
      sourceOnGitHub: 'Source on GitHub'
    },

    services: {
      title: 'Services',
      intro:
        'Flexible engagements tailored to where you are in your accessibility ' +
        'journey — from a one-off audit to long-term development support.',
      items: [
        {
          title: 'Accessibility Audits',
          description:
            'Full WCAG 2.2 AA/AAA audits of your website or web app, with a prioritised, actionable report covering every issue found.',
          icon: '🔍'
        },
        {
          title: 'Remediation & Development',
          description:
            'Hands-on front-end development to fix accessibility issues directly in your codebase — HTML, CSS and JavaScript.',
          icon: '🛠️'
        },
        {
          title: 'General Front-End Development',
          description:
            'Beyond accessibility — new features, component libraries and performance work, built with clean, maintainable, semantic code from day one.',
          icon: '💻'
        },
        {
          title: 'Design Reviews',
          description:
            'Early-stage review of designs and prototypes to catch accessibility issues before a single line of code is written.',
          icon: '🎨'
        },
        {
          title: 'Automated Accessibility Testing',
          description:
            'Integrate automated checks (axe-core, Lighthouse, Pa11y) into your CI pipeline to catch regressions before they reach production.',
          icon: '🤖'
        },
        {
          title: 'Ongoing Support',
          description:
            'Retainer-based support: code reviews, pull request checks, and a direct line to an accessibility specialist.',
          icon: '🤝'
        }
      ]
    },

    lawsList: [
      {
        title: 'European Accessibility Act (EAA)',
        description:
          'Since 28 June 2025, the EAA requires many private-sector products and services sold in the EU — e-commerce, banking, e-books and more — to meet strict accessibility requirements. Non-compliance can mean fines, legal action and products being pulled from the market.'
      },
      {
        title: 'EN 301 549',
        description:
          'The European standard for ICT accessibility, referenced by the EAA and by public-sector procurement rules across the EU, built directly on WCAG success criteria.'
      },
      {
        title: 'Web & Mobile Accessibility Directive',
        description:
          'Public sector websites and apps across the EU must already meet WCAG 2.1 AA and publish an accessibility statement — enforcement is active and growing stricter.'
      },
      {
        title: 'WCAG 2.2',
        description:
          'The latest Web Content Accessibility Guidelines add new success criteria for focus visibility, target size and cognitive accessibility — the practical baseline behind all of the above regulation.'
      }
    ],

    experienceHighlights: [
      'Led accessibility remediation for public-sector and e-commerce platforms across several EU countries.',
      'Trained front-end teams on semantic HTML, ARIA and keyboard interaction patterns.',
      'Built and audited design systems with accessibility baked in from the first component.',
      'Worked directly with screen reader and assistive technology users to validate real-world usability.'
    ],

    faqs: [
      {
        question: 'What does a front-end accessibility consultant do?',
        answer:
          'A front-end accessibility consultant audits websites and apps against WCAG success criteria, fixes issues directly in HTML/CSS/JavaScript code, reviews designs before development starts, and trains teams to build accessible components by default.'
      },
      {
        question: 'Does my company need to comply with the European Accessibility Act?',
        answer:
          'If you sell products or services in the EU — e-commerce, banking, e-books, and more — the European Accessibility Act has applied since 28 June 2025. Non-compliance can mean fines, legal action, and products being pulled from the market.'
      },
      {
        question: 'What accessibility standard should I target?',
        answer:
          'WCAG 2.2 Level AA is the practical baseline referenced by the European Accessibility Act, EN 301 549, and most public-sector procurement rules across the EU.'
      },
      {
        question: 'How long does an accessibility audit take?',
        answer:
          'A typical audit of a single product takes one to two weeks, covering automated scanning, manual keyboard and screen reader testing, and a prioritised written report with concrete fixes.'
      },
      {
        question: 'Can automated tools catch all accessibility issues?',
        answer:
          'No — automated tools like axe-core and Lighthouse typically catch 30-40% of WCAG issues. The rest (keyboard operability, focus order, meaningful alt text, screen reader behaviour) require manual testing by a specialist.'
      }
    ],

    knowsAbout: ['Web Accessibility', 'WCAG', 'European Accessibility Act', 'EN 301 549'],

    privacyTitleLabel: 'Privacy Policy',
    privacyDescription:
      "Privacy policy for {{name}}'s accessibility consultancy site: what data is collected, why, and your rights.",
    accessibilityStatementTitleLabel: 'Accessibility Statement',
    accessibilityStatementDescription:
      "Accessibility statement for {{name}}'s site: conformance target, testing methods, known limitations, and how to report issues."
  },

  pt: {
    htmlLang: 'pt-PT',
    ogLocale: 'pt_PT',
    languageName: 'Português',
    languageSwitcherLabel: 'Idioma',
    localePrefix: '/pt',

    siteTitle: 'Acessível por Design — Consultoria de Acessibilidade Front-End',
    tagline:
      'Consultor de acessibilidade front-end que ajuda equipas a criar produtos digitais inclusivos e em conformidade legal.',
    socialImageAlt: 'Acessível por Design — consultoria de acessibilidade front-end',

    skipLink: 'Saltar para o conteúdo principal',
    toggleMenuLabel: 'Alternar menu de navegação',
    themeToggleDark: 'Modo escuro',
    themeToggleLight: 'Modo claro',

    nav: {
      about: 'Sobre',
      laws: 'Porque Importa',
      services: 'Serviços',
      faq: 'Perguntas Frequentes',
      contact: 'Contacto'
    },

    hero: {
      eyebrow: 'Consultoria de Acessibilidade Front-End',
      titleHtml: 'Tornar a web utilizável para <span class="highlight">todos</span>.',
      meta: '{{years}}+ anos de experiência prática em front-end e acessibilidade.',
      ctaContact: 'Entrar em contacto',
      ctaServices: 'Ver serviços'
    },

    about: {
      title: 'Sobre Mim',
      intro:
        'Sou {{name}}, um programador front-end especializado em acessibilidade ' +
        'web. Ao longo de {{years}} anos ajudei equipas por toda a Europa a ' +
        'transformar interfaces inacessíveis em produtos inclusivos e conformes ' +
        'com as normas — sem sacrificar o design ou o desempenho. Trabalho ' +
        'diretamente com código, não apenas com checklists.'
    },

    laws: {
      title: 'Novas leis, novas obrigações',
      intro:
        'A acessibilidade deixou de ser opcional. Em toda a União Europeia, uma ' +
        'vaga de regulamentação torna agora o design inclusivo uma obrigação ' +
        'legal, tanto para organizações públicas como privadas.'
    },

    services: {
      title: 'Serviços',
      intro:
        'Modelos de colaboração flexíveis, adaptados à fase em que se encontra na ' +
        'sua jornada de acessibilidade — desde uma auditoria pontual até ao apoio ' +
        'de desenvolvimento de longo prazo.',
      items: [
        {
          title: 'Auditorias de Acessibilidade',
          description:
            'Auditorias completas WCAG 2.2 AA/AAA ao seu site ou aplicação web, com um relatório priorizado e acionável que cobre todos os problemas encontrados.',
          icon: '🔍'
        },
        {
          title: 'Correção e Desenvolvimento',
          description:
            'Desenvolvimento front-end prático para corrigir problemas de acessibilidade diretamente no seu código — HTML, CSS e JavaScript.',
          icon: '🛠️'
        },
        {
          title: 'Desenvolvimento Front-End Geral',
          description:
            'Para além da acessibilidade — novas funcionalidades, bibliotecas de componentes e otimização de desempenho, construídas com código limpo, sustentável e semântico desde o primeiro dia.',
          icon: '💻'
        },
        {
          title: 'Revisões de Design',
          description:
            'Revisão em fase inicial de designs e protótipos para detetar problemas de acessibilidade antes de ser escrita uma única linha de código.',
          icon: '🎨'
        },
        {
          title: 'Testes de Acessibilidade Automatizados',
          description:
            'Integração de verificações automáticas (axe-core, Lighthouse, Pa11y) no seu pipeline de CI para detetar regressões antes de chegarem à produção.',
          icon: '🤖'
        },
        {
          title: 'Apoio Contínuo',
          description:
            'Apoio em regime de avença: revisões de código, verificação de pull requests e uma linha direta com um especialista em acessibilidade.',
          icon: '🤝'
        }
      ]
    },

    faq: {
      title: 'Perguntas frequentes'
    },

    contact: {
      title: 'Vamos tornar o seu produto acessível',
      body:
        'Quer precise de uma auditoria, de correção prática ou de formação para ' +
        'a sua equipa, terei todo o gosto em conhecer o seu projeto.',
      emailPrefix: 'Enviar email para',
      linkedinCta: 'Ligar no LinkedIn',
      githubCta: 'Ver no GitHub',
      newTabSuffix: '(abre numa nova janela)'
    },

    footer: {
      rights: 'Todos os direitos reservados.',
      noteBefore: 'Construído de forma acessível, desde a base. Fotografia de fundo via',
      noteLinkText: 'Unsplash',
      accessibilityStatement: 'Declaração de acessibilidade',
      privacyPolicy: 'Política de privacidade',
      sourceOnGitHub: 'Código-fonte no GitHub'
    },

    lawsList: [
      {
        title: 'Lei Europeia de Acessibilidade (EAA)',
        description:
          'Desde 28 de junho de 2025, a EAA exige que muitos produtos e serviços do setor privado vendidos na UE — comércio eletrónico, banca, livros eletrónicos e muito mais — cumpram requisitos rigorosos de acessibilidade. O incumprimento pode significar coimas, ações legais e a retirada de produtos do mercado.'
      },
      {
        title: 'EN 301 549',
        description:
          'A norma europeia para a acessibilidade das TIC, referenciada pela EAA e pelas regras de contratação pública em toda a UE, construída diretamente sobre os critérios de sucesso da WCAG.'
      },
      {
        title: 'Diretiva da Acessibilidade da Web e das Aplicações Móveis',
        description:
          'Os sites e aplicações do setor público em toda a UE já têm de cumprir a WCAG 2.1 AA e publicar uma declaração de acessibilidade — a fiscalização está ativa e cada vez mais rigorosa.'
      },
      {
        title: 'WCAG 2.2',
        description:
          'As mais recentes Diretrizes de Acessibilidade para o Conteúdo Web acrescentam novos critérios de sucesso para a visibilidade do foco, o tamanho do alvo e a acessibilidade cognitiva — a base prática por trás de toda a regulamentação acima.'
      }
    ],

    experienceHighlights: [
      'Liderou a correção de acessibilidade em plataformas do setor público e de comércio eletrónico em vários países da UE.',
      'Formou equipas de front-end em HTML semântico, ARIA e padrões de interação por teclado.',
      'Construiu e auditou design systems com a acessibilidade incorporada desde o primeiro componente.',
      'Trabalhou diretamente com utilizadores de leitores de ecrã e tecnologias de apoio para validar a usabilidade real.'
    ],

    faqs: [
      {
        question: 'O que faz um consultor de acessibilidade front-end?',
        answer:
          'Um consultor de acessibilidade front-end audita sites e aplicações face aos critérios de sucesso da WCAG, corrige problemas diretamente no código HTML/CSS/JavaScript, revê designs antes de o desenvolvimento começar e forma equipas para construírem componentes acessíveis por defeito.'
      },
      {
        question: 'A minha empresa precisa de cumprir a Lei Europeia de Acessibilidade?',
        answer:
          'Se vende produtos ou serviços na UE — comércio eletrónico, banca, livros eletrónicos, entre outros — a Lei Europeia de Acessibilidade aplica-se desde 28 de junho de 2025. O incumprimento pode significar coimas, ações legais e a retirada de produtos do mercado.'
      },
      {
        question: 'Que norma de acessibilidade devo seguir?',
        answer:
          'A WCAG 2.2 Nível AA é a referência prática utilizada pela Lei Europeia de Acessibilidade, pela EN 301 549 e pela maioria das regras de contratação pública na UE.'
      },
      {
        question: 'Quanto tempo demora uma auditoria de acessibilidade?',
        answer:
          'Uma auditoria típica a um único produto demora entre uma a duas semanas, cobrindo análise automatizada, testes manuais de teclado e leitor de ecrã, e um relatório escrito e priorizado com correções concretas.'
      },
      {
        question: 'As ferramentas automáticas conseguem detetar todos os problemas de acessibilidade?',
        answer:
          'Não — ferramentas automáticas como o axe-core e o Lighthouse detetam normalmente entre 30 a 40% dos problemas de WCAG. O resto (operabilidade por teclado, ordem do foco, texto alternativo significativo, comportamento com leitores de ecrã) exige testes manuais por um especialista.'
      }
    ],

    knowsAbout: [
      'Acessibilidade Web',
      'WCAG',
      'Lei Europeia de Acessibilidade',
      'EN 301 549'
    ],

    privacyTitleLabel: 'Política de Privacidade',
    privacyDescription:
      'Política de privacidade do site de consultoria de acessibilidade de {{name}}: que dados são recolhidos, porquê, e os seus direitos.',
    accessibilityStatementTitleLabel: 'Declaração de Acessibilidade',
    accessibilityStatementDescription:
      'Declaração de acessibilidade do site de {{name}}: objetivo de conformidade, métodos de teste, limitações conhecidas e como reportar problemas.'
  }
};

function interpolate(str, vars) {
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => (key in vars ? vars[key] : `{{${key}}}`));
}

function buildSiteData(locale) {
  const c = content[locale];
  const vars = { name: base.name, years: base.yearsExperience };

  const siteData = {
    ...base,
    ...c,
    hero: {
      ...c.hero,
      titleHtml: c.hero.titleHtml,
      meta: interpolate(c.hero.meta, vars)
    },
    about: {
      ...c.about,
      intro: interpolate(c.about.intro, vars)
    },
    privacyTitle: `${c.privacyTitleLabel} — ${base.name}`,
    privacyDescription: interpolate(c.privacyDescription, vars),
    accessibilityStatementTitle: `${c.accessibilityStatementTitleLabel} — ${base.name}`,
    accessibilityStatementDescription: interpolate(c.accessibilityStatementDescription, vars)
  };

  // Structured data (JSON-LD) so search engines AND AI answer engines
  // (ChatGPT, Perplexity, Google AI Overviews, etc.) can parse facts about
  // who you are, what you offer, and the FAQ content directly.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteData.siteUrl}${siteData.localePrefix}/#website`,
        url: `${siteData.siteUrl}${siteData.localePrefix}/`,
        name: siteData.siteTitle,
        description: siteData.tagline,
        inLanguage: siteData.htmlLang
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${siteData.siteUrl}${siteData.localePrefix}/#service`,
        name: siteData.name,
        description: siteData.tagline,
        url: `${siteData.siteUrl}${siteData.localePrefix}/`,
        email: siteData.email,
        image: `${siteData.siteUrl}/og-image.jpg`,
        areaServed: 'European Union',
        knowsAbout: siteData.knowsAbout,
        sameAs: [siteData.linkedin, siteData.github],
        founder: {
          '@type': 'Person',
          name: siteData.name,
          jobTitle: 'Front-End Accessibility Consultant',
          email: siteData.email,
          sameAs: [siteData.linkedin, siteData.github]
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Accessibility consultancy services',
          itemListElement: siteData.services.items.map((service) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.title,
              description: service.description
            }
          }))
        }
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteData.siteUrl}${siteData.localePrefix}/#faq`,
        mainEntity: siteData.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }
    ]
  };

  siteData.jsonLd = JSON.stringify(jsonLd);

  return siteData;
}

const siteDataByLocale = Object.fromEntries(locales.map((locale) => [locale, buildSiteData(locale)]));

function localeForPagePath(pagePath) {
  return pagePath === '/pt' || pagePath.startsWith('/pt/') ? 'pt' : 'en';
}

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      context(pagePath) {
        return siteDataByLocale[localeForPagePath(pagePath)];
      }
    })
  ],
  css: {
    // Avoid lilconfig searching upward through parent directories
    // (sandboxed environments may not permit reading outside the project).
    postcss: {}
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 4096,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        accessibilityStatement: resolve(__dirname, 'accessibility-statement.html'),
        ptMain: resolve(__dirname, 'pt/index.html'),
        ptPrivacy: resolve(__dirname, 'pt/privacy.html'),
        ptAccessibilityStatement: resolve(__dirname, 'pt/accessibility-statement.html')
      }
    }
  },
  server: {
    port: 5173
  }
});
