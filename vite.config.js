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
  ]
};

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
    assetsInlineLimit: 4096
  },
  server: {
    port: 5173
  }
});
