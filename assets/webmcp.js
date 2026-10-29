/* Scopico WebMCP demo — read-only tools for agentic browsers.
 *
 * Progressive enhancement: if the browser has no WebMCP support
 * (document.modelContext), this file does nothing and the site works
 * exactly as before. In a WebMCP-capable browser (Chrome WebMCP origin
 * trial, or the testing flag), an agent visiting any Scopico page can
 * call these tools instead of scraping the DOM.
 *
 * All four tools are read-only and return only content that is already
 * public on scopico.co. Nothing here sends email, writes data, or
 * books anything — those actions need a server and cannot run on
 * static hosting.
 */
(function () {
  'use strict';

  var SERVICES = [
    {
      name: 'Fractional CTO',
      description: 'Part-time, senior technology leadership: strategy and roadmapping, architecture oversight, build-vs-buy and vendor decisions, hiring and team structure, technical credibility for fundraising.'
    },
    {
      name: 'Technology advisory',
      description: 'Ongoing counsel on architecture decisions, scaling, team structure, and delivery risk.'
    },
    {
      name: 'Solution architecture & audits',
      description: 'Architecture reviews, codebase audits, and rescue for troubled projects. Deep background in .NET, Azure, and distributed systems at scale.'
    },
    {
      name: 'AI-assisted development adoption',
      description: 'Help engineering teams adopt AI-assisted workflows: standards, context engineering, and guardrails. Scopico leads teams that USE AI to build software; it does not build AI/ML systems.'
    },
    {
      name: 'Development management & SDLC improvement',
      description: 'Diagnostics and hands-on improvement of development lifecycle processes.'
    },
    {
      name: 'Dedicated development teams',
      description: 'Vetted developers assembled and led by Timotej Jakimovski, with architecture oversight included.'
    },
    {
      name: 'Custom software development',
      description: 'End-to-end design and delivery of business software on the Microsoft stack. Lump sum against fixed, agreed requirements, or time-and-materials only within an established dedicated development team.'
    }
  ];

  var RATES =
    'Advisory starts at $120/hour (US) or \u20ac110/hour (EU/UK), with day rates available. ' +
    'Fixed-price architecture reviews from $3,500. Monthly retainers from $2,000. ' +
    'Dedicated development teams and full-time engagements are scoped individually. ' +
    'Retainers are billed monthly in advance; fixed-scope work starts with a deposit. ' +
    'Every engagement begins with a paid pilot before any retainer.';

  var AVAILABILITY =
    'Advisory availability is Monday\u2013Friday 17:30\u201320:00 CET, plus Saturdays by arrangement. ' +
    'Full-time offshore engagements are considered separately. ' +
    'Every engagement begins with a paid pilot before any retainer.';

  var CONTACT = {
    email: 'admin@scopico.co',
    address: 'Trifun Buzev 3 3/11, 1000 Skopje, North Macedonia',
    regions: ['United States', 'United Kingdom', 'European Union'],
    linkedinCompany: 'https://www.linkedin.com/company/scopico',
    linkedinFounder: 'https://www.linkedin.com/in/timmys00',
    principles: [
      'Senior-only: the person you meet is the person who does the work.',
      'One client per industry at a time: no conflicts of interest.',
      'Selective by design: every engagement is vetted before committing.',
      'Greenfield .NET/Azure only; no WordPress work.'
    ]
  };

  var EMPTY_SCHEMA = { type: 'object', properties: {} };

  async function register() {
    var mc = document.modelContext;
    if (!mc || typeof mc.registerTool !== 'function') return;

    var tools = [
      {
        name: 'get_services',
        description: 'List the consulting services Scopico offers, with a one-line description of each.',
        inputSchema: EMPTY_SCHEMA,
        annotations: { readOnlyHint: true },
        execute: async function () { return { services: SERVICES }; }
      },
      {
        name: 'get_rates',
        description: 'Return Scopico’s public engagement rates and payment terms.',
        inputSchema: EMPTY_SCHEMA,
        annotations: { readOnlyHint: true },
        execute: async function () { return { rates: RATES }; }
      },
      {
        name: 'get_availability',
        description: 'Return Scopico’s advisory availability hours and how engagements start.',
        inputSchema: EMPTY_SCHEMA,
        annotations: { readOnlyHint: true },
        execute: async function () { return { availability: AVAILABILITY }; }
      },
      {
        name: 'get_contact',
        description: 'Return Scopico’s public contact details, regions served, and working principles.',
        inputSchema: EMPTY_SCHEMA,
        annotations: { readOnlyHint: true },
        execute: async function () { return CONTACT; }
      }
    ];

    for (var i = 0; i < tools.length; i++) {
      try {
        await mc.registerTool(tools[i]);
      } catch (e) {
        /* Duplicate name or unsupported schema: skip, keep the rest. */
      }
    }
  }

  try {
    var result = register();
    if (result && typeof result.catch === 'function') {
      result.catch(function () { /* WebMCP unavailable: stay silent. */ });
    }
  } catch (e) {
    /* No WebMCP support: the site works exactly as before. */
  }
})();
