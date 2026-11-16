import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

// Single source of truth for all copy on the page.
// Edit these values to update your name, years of experience, services, etc.
const siteData = {
  siteTitle: 'Accessible by Design — Front-End Accessibility Consultancy',
  name: 'Miguel Esquirol Rios',
  tagline: 'Front-end accessibility consultant helping teams build inclusive, legally compliant digital products.',
  yearsExperience: 15,
  email: 'miguelesquirol@gmail.com',
  linkedin: 'https://www.linkedin.com/in/miguel-esquirol-94289337/',
  github: 'https://github.com/meu9067/consultancy',

  // Unsplash's license doesn't require attribution, but it's good practice —
  // this links to the original photo page. If you know the photographer's
  // name, consider updating the footer link text in footer.hbs to
  // "Photo by <Name> on Unsplash" (Unsplash's own recommended format).
  backgroundPhotoCredit:
    'https://unsplash.com/photos/silhouette-of-man-looking-at-milky-way-lcT_p8kLCsc',

  // Update this to your real deployed domain — it feeds the canonical URL,
  // Open Graph/Twitter tags, and the JSON-LD structured data below.
  siteUrl: 'https://consultancy.meu9067.workers.dev',
  socialImageAlt: 'Accessible by Design — front-end accessibility consultancy',
  locale: 'en_US',

  services: [
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
  ],

  laws: [
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

  // Plain, direct question/answer content. This is deliberately written the
  // way an AI answer engine (or a search snippet) would want to quote it —
  // short, self-contained answers — and is also marked up as FAQPage
  // structured data (see index.html) for the same reason.
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
  ]
};

// Structured data (JSON-LD) so search engines AND AI answer engines (ChatGPT,
// Perplexity, Google AI Overviews, etc.) can parse facts about who you are,
// what you offer, and the FAQ content directly — rather than having to infer
// it from prose.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteData.siteUrl}/#website`,
      url: siteData.siteUrl,
      name: siteData.siteTitle,
      description: siteData.tagline,
      inLanguage: 'en'
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${siteData.siteUrl}/#service`,
      name: siteData.name,
      description: siteData.tagline,
      url: siteData.siteUrl,
      email: siteData.email,
      image: `${siteData.siteUrl}/og-image.jpg`,
      areaServed: 'European Union',
      knowsAbout: ['Web Accessibility', 'WCAG', 'European Accessibility Act', 'EN 301 549'],
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
        itemListElement: siteData.services.map((service) => ({
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
      '@id': `${siteData.siteUrl}/#faq`,
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

// Per-page <title>/meta description for the secondary (legal) pages —
// computed here (not duplicated as literal strings) so privacy.html and
// accessibility-statement.html can both use the shared
// src/partials/head.hbs partial.
siteData.privacyTitle = `Privacy Policy — ${siteData.name}`;
siteData.privacyDescription = `Privacy policy for ${siteData.name}'s accessibility consultancy site: what data is collected, why, and your rights.`;
siteData.accessibilityStatementTitle = `Accessibility Statement — ${siteData.name}`;
siteData.accessibilityStatementDescription = `Accessibility statement for ${siteData.name}'s site: conformance target, testing methods, known limitations, and how to report issues.`;

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      context: siteData
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
        accessibilityStatement: resolve(__dirname, 'accessibility-statement.html')
      }
    }
  },
  server: {
    port: 5173
  }
});
