import React from 'react';
import { clsx } from 'clsx';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  CheckCircle2,
  ExternalLink,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Wrench,
  Terminal,
  Award,
  Sparkles,
  Cpu,
  Layers,
  Shield,
  Zap,
  TrendingUp,
  Check,
  Star,
  Code2,
} from 'lucide-react';

export type TemplateId =
  // 31 Unique Core Templates (Matching Welcome & Builder Galleries)
  | 'split_duo'
  | 'prestige_gold'
  | 'ai_ml_lead'
  | 'graphite_compact'
  | 'cpa_audit_lead'
  | 'global_director_ops'
  | 'backend_distributed_arch'
  | 'vp_product_strategy'
  | 'strategic_sourcing_ops'
  | 'growth_marketing_dir'
  | 'data_science_ml_lead'
  | 'enterprise_bizdev'
  | 'staff_ml_systems'
  | 'startup_founder_pitch'
  | 'cloud_infra_sre'
  | 'biotech_pharma_lead'
  | 'cybersecurity_soc2'
  | 'head_of_ux_design'
  | 'quant_research_fund'
  | 'corporate_counsel_lead'
  | 'swiss_bauhaus_grid'
  | 'oxford_academic_fellow'
  | 'tokyo_zen_minimal'
  | 'scandinavian_frost'
  | 'neo_brutalist_tech'
  | 'coral_sunset_product'
  | 'deep_teal_biotech'
  | 'classic_ats'
  | 'modern_executive'
  | 'navy_sidebar'
  | 'navy_header'
  // FlowCV Scraped Signature Templates
  | 'flowcv_atlantic_blue'
  | 'flowcv_mercury_flow'
  | 'flowcv_steady_form'
  | 'flowcv_classic_serif'
  | 'flowcv_leaves'
  | 'flowcv_editorial_rule'
  | 'flowcv_precision_line'
  | 'flowcv_silver_banner'
  // TealHQ Scraped Signature Templates
  | 'teal_modern'
  | 'teal_clean_ats'
  | 'teal_executive'
  // Backward compatibility aliases
  | 'minimalist_tech'
  | 'soft_green_pill'
  | 'right_sidebar'
  | 'yellow_creative'
  | 'fortune500_single'
  | 'boardroom_serif'
  | 'yc_founder_pitch'
  | 'stealth_scale'
  | 'fintech_lead'
  | 'crypto_web3'
  | 'saas_operator'
  | 'mckinsey_consulting'
  | 'swiss_grid'
  | 'oxford_academic'
  | 'tokyo_minimal'
  | 'nordic_clean'
  | 'neo_brutalist'
  | 'coral_modern'
  | 'teal_innovator'
  | 'cloud_architect'
  | 'rust_systems'
  | 'ai_researcher'
  | 'quantum_research'
  | 'growth_lead'
  | 'design_portfolio';

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    website?: string;
    summary: string;
  };
  experiences: {
    id: string;
    role: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    bullets: string[];
  }[];
  education: {
    id: string;
    degree: string;
    institution: string;
    location?: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }[];
  projects: {
    id: string;
    title: string;
    techStack?: string;
    link?: string;
    bullets: string[];
  }[];
  skills: string[];
  certifications?: string[];
}

interface ResumeTemplateProps {
  templateId: TemplateId;
  data: ResumeData;
  zoomLevel?: number;
  isMicroPreview?: boolean;
}

// Universal High-Caliber Mock Persona for Demo Preview
export const MOCK_PERSONA = {
  personalInfo: {
    fullName: 'Alex Morgan',
    headline: 'Staff Software Engineer & Systems Architect',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexmorgan-eng',
    github: 'github.com/alexmorgan-dev',
    website: 'alexmorgan.ai',
    summary:
      'Staff Software Engineer and Systems Architect with 6+ years of experience engineering high-throughput distributed infrastructure, low-latency LLM inference pipelines, and enterprise-grade full-stack platforms. Founder of SynthBase (YC W24, acquired) and core contributor to open-source agent frameworks. Proven track record scaling microservices to 10M+ daily active requests with 99.99% uptime, cutting p99 query latencies by 60%, and orchestrating multi-region cloud deployments on AWS and GCP. Passionate about autonomous agents, vector indexing, and developer tooling.',
  },
  fullName: 'Alex Morgan',
  title: 'Staff Software Engineer & Systems Architect',
  email: 'alex.morgan@example.com',
  phone: '+1 (555) 234-5678',
  location: 'San Francisco, CA',
  linkedin: 'linkedin.com/in/alexmorgan-eng',
  github: 'github.com/alexmorgan-dev',
  website: 'alexmorgan.ai',
  summary:
    'Staff Software Engineer and Systems Architect with 6+ years of experience engineering high-throughput distributed infrastructure, low-latency LLM inference pipelines, and enterprise-grade full-stack platforms. Founder of SynthBase (YC W24, acquired) and core contributor to open-source agent frameworks. Proven track record scaling microservices to 10M+ daily active requests with 99.99% uptime, cutting p99 query latencies by 60%, and orchestrating multi-region cloud deployments on AWS and GCP. Passionate about autonomous agents, vector indexing, and developer tooling.',
  experiences: [
    {
      id: 'exp-1',
      role: 'Founding Staff AI Engineer',
      company: 'NeuralFlow Systems (AI Agents & RAG Infra)',
      location: 'San Francisco, CA',
      startDate: 'Jun 2024',
      endDate: 'Present',
      bullets: [
        'Architected asynchronous distributed task-queue engine handling 120k peak req/sec at sub-45ms p95 latency.',
        'Engineered custom semantic cache & hybrid vector retrieval pipeline, reducing LLM API token spend by 48%.',
        'Designed multi-tenant access control and end-to-end telemetry streaming across Kubernetes clusters.',
        'Led technical strategy and mentored an engineering team of 8 full-stack and ML infrastructure developers.',
      ],
    },
    {
      id: 'exp-2',
      role: 'Senior Full-Stack Engineer',
      company: 'Stripe (Core Billing & Payment Routing)',
      location: 'San Francisco, CA',
      startDate: 'Jan 2022',
      endDate: 'May 2024',
      bullets: [
        'Led frontend and backend architecture for next-gen adaptive payment flow using React, TypeScript, and Go.',
        'Optimized PostgreSQL shard indexing strategies, cutting complex ledger reconciliation runtimes from 8.4s to 320ms.',
        'Instituted automated canary deployment workflows and integration testing suites, achieving zero-downtime releases.',
      ],
    },
    {
      id: 'exp-3',
      role: 'Staff Infrastructure & Platform Engineer',
      company: 'Vercel (Developer Experience & Edge)',
      location: 'San Francisco, CA',
      startDate: 'May 2020',
      endDate: 'Dec 2021',
      bullets: [
        'Built Next.js edge runtime middleware extensions and telemetry analytics dashboard for enterprise team tiers.',
        'Implemented incremental static regeneration (ISR) stress testing harnesses and automated regression monitors.',
        'Collaborated directly with framework core team to optimize global cold start latency by 35% across 18 edge POPs.',
      ],
    },
    {
      id: 'exp-4',
      role: 'Distributed Systems Software Engineer',
      company: 'Datadog (Distributed Tracing & APM)',
      location: 'San Francisco, CA',
      startDate: 'Jun 2018',
      endDate: 'Apr 2020',
      bullets: [
        'Engineered distributed tracing collector pipelines ingesting 45B+ span events/day across multi-cloud environments.',
        'Optimized in-memory ring buffers and zero-copy serialization, slashing CPU usage by 28% under peak load.',
        'Authored open-source eBPF network probe integration adopted across Fortune 500 infrastructure teams.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'M.S. in Computer Science (AI & Systems)',
      institution: 'Stanford University',
      location: 'Stanford, CA',
      startDate: '2020',
      endDate: '2022',
      gpa: '3.92 / 4.0',
    },
    {
      id: 'edu-2',
      degree: 'B.S. in Electrical Engineering & Computer Science (EECS)',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '2016',
      endDate: '2020',
      gpa: '3.88 / 4.0',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'SynthBase — Multi-Agent Developer Infrastructure',
      name: 'SynthBase — Multi-Agent Infrastructure',
      techStack: 'Next.js 15, TypeScript, Python, PgVector, Claude 3.5 Sonnet',
      tech: 'Next.js 15, TypeScript, Python, PgVector',
      description: 'Architected distributed workflow runner supporting 10,000+ concurrently running autonomous agents with sub-millisecond dispatch.',
      bullets: [
        'Architected distributed workflow runner supporting 10,000+ concurrently running autonomous agents.',
        'Open-sourced SDK with 4,200+ GitHub stars; acquired by Enterprise AI Platform in 2025.',
      ],
    },
    {
      id: 'proj-2',
      title: 'PulseTrace — Distributed Real-Time Telemetry Engine',
      name: 'PulseTrace — Telemetry Engine',
      techStack: 'Go, eBPF, Redis, ClickHouse, Docker',
      tech: 'Go, eBPF, Redis, ClickHouse, Docker',
      description: 'Sub-millisecond packet capture and latency tracer deployed across 500+ Kubernetes nodes, cutting MTTR by 64%.',
      bullets: [
        'Sub-millisecond packet capture and latency tracer deployed across 500+ Kubernetes nodes.',
        'Reduced network troubleshooting mean-time-to-resolution (MTTR) by 64% for SRE teams.',
      ],
    },
  ],
  skills: [
    'TypeScript',
    'Python',
    'Go',
    'Rust',
    'C++',
    'SQL',
    'React',
    'Next.js',
    'Node.js',
    'PostgreSQL',
    'PgVector',
    'Redis',
    'AWS',
    'GCP',
    'Docker',
    'Kubernetes',
    'Terraform',
    'CI/CD',
    'Git',
    'LLM Swarms',
    'RAG Pipelines',
    'LangChain',
    'Prompt Engineering',
  ],
  certifications: [
    '1st Place Grand Prize Winner at Global AI Autonomous Agent Hackathon (1,200+ teams).',
    'AWS Certified Solutions Architect – Professional & CKA Kubernetes Administrator.',
    'Y Combinator W24 Founder Batch Alumni (SynthBase — acquired 2025).',
    'GitHub Open Source Creator with 8,500+ stars across developer tooling repositories.',
    'Maintained 99.999% SLA uptime across distributed payment & inference clusters.',
  ],
  languages: ['English (Native)', 'German (Professional)', 'Spanish (Working)'],
};

// FlowCV Specific Showcase Personas matching exact FlowCV.com gallery references
export const FLOWCV_PERSONAS: Record<string, any> = {
  flowcv_atlantic_blue: {
    fullName: 'Brian T. Wayne',
    title: 'Business Development Consultant',
    avatar: '/images/templates/brian-avatar.jpg',
    email: 'brian@wayne.com',
    phone: '+1 541 754 3010',
    location: '22611 Pacific Coast Hwy, Malibu, California, 9022, USA',
    linkedin: 'linkedin.com/wayne-2345',
    website: 'wayne.com',
    summary:
      "I'm Brian Thomas Wayne, a business development consultant with a passion for helping companies achieve their growth potential. With my MBA degree and extensive experience in strategy and relationship building, I strive to provide innovative solutions that drive success for my clients.",
    experiences: [
      {
        id: 'ab-1',
        role: 'Business Development Consultant',
        company: 'Applied Tech Inc.',
        location: 'New York',
        startDate: '2012',
        endDate: 'Present',
        bullets: [
          'Developed and implemented strategic plans resulting in a 36% increase in new business opportunities.',
          'Collaborated with cross-functional teams to drive business growth and expansion.',
          'Established and maintained relationships with key partners resulting in a 25% increase in sales revenue.',
          'Conducted market research and analysis to identify new market opportunities resulting in the successful launch of a new product line.',
        ],
      },
      {
        id: 'ab-2',
        role: 'Business Development',
        company: 'Axxus',
        location: 'Los Angeles, USA',
        startDate: '2005',
        endDate: '2012',
        bullets: [
          'Worked closely with tech and software companies to provide expert sales outsourcing services.',
          'Built and managed dedicated sales teams in Europe, the Americas, and Asia Pacific.',
          'Contributed to Axxus Sales Outsourcing\'s proven track record of success in acting as an extension to the sales force of over 500+ vendors of new and innovative software and tech products, services, and solutions since the year 2000.',
        ],
      },
    ],
    education: [
      {
        id: 'ab-edu-1',
        degree: 'Master of Business Administration',
        institution: 'Harvard Business School',
        location: 'Boston',
        startDate: '2016',
        endDate: '2018',
      },
      {
        id: 'ab-edu-2',
        degree: 'Bachelor of Business Administration',
        institution: 'Harvard Business School',
        location: 'Boston',
        startDate: '2012',
        endDate: '2015',
      },
    ],
    skills: [
      'Strategic thinking and problem solving',
      'Relationship building and networking',
      'Effective communication and negotiation',
      'Sales and business development strategy',
      'Team management and leadership',
      'Creative and innovative thinking',
    ],
    languages: [
      { language: 'English', dots: 5 },
      { language: 'Spanish', dots: 4 },
    ],
    awards: [
      { title: 'Outstanding Business Student Award', org: 'University of Southern California, 2014' },
      { title: "Dean's List", org: 'University of California, Los Angeles, 2015-2016' },
    ],
  },
  flowcv_mercury_flow: {
    fullName: 'Camila Rivera',
    title: 'Sales Manager',
    avatar: '/images/templates/female-avatar.jpg',
    email: 'camila.rivera@email.com',
    phone: '+1 305 555 0184',
    location: 'Miami, United States',
    linkedin: 'linkedin.com/in/camila-rivera',
    summary:
      'Results-driven sales professional with 6+ years of experience in account growth, client relationship management, and pipeline development across B2B environments. Strong track record of improving conversion rates, supporting revenue targets, and building trust with diverse customer groups in English- and Spanish-speaking markets. Brings a practical, people-focused approach to sales planning, team coordination, and long-term customer retention.',
    experiences: [
      {
        id: 'mf-1',
        role: 'Sales Manager',
        company: 'BrightPath Business Solutions',
        location: 'Miami, United States',
        startDate: '01/2023',
        endDate: 'Present',
        bullets: [
          'Manage a portfolio of mid-market clients across retail and service sectors.',
          'Lead quarterly sales planning and improved team conversion rates by 14%.',
          'Build strong client relationships that increased renewals and upsell.',
        ],
      },
      {
        id: 'mf-2',
        role: 'Account Manager',
        company: 'Horizon Office Supply',
        location: 'Orlando, United States',
        startDate: '03/2020',
        endDate: '12/2022',
        bullets: [
          'Owned inbound and outbound sales activity for regional business accounts.',
          'Delivered tailored product proposals and consistently exceeded revenue goals.',
          'Coordinated with operations teams to improve customer satisfaction.',
        ],
      },
      {
        id: 'mf-3',
        role: 'Sales Coordinator',
        company: 'SunPeak Telecom',
        location: 'Miami, United States',
        startDate: '05/2018',
        endDate: '02/2020',
        bullets: [
          'Supported account execs with lead tracking, reporting, and proposal preparation.',
          'Contributed to pipeline organization and improved follow-up consistency.',
        ],
      },
    ],
    education: [
      {
        id: 'mf-edu-1',
        degree: 'Bachelor of Business Administration',
        institution: 'Florida International University',
        location: 'Miami, United States',
        startDate: '2014',
        endDate: '2018',
      },
      {
        id: 'mf-edu-2',
        degree: 'Associate Degree in Marketing',
        institution: 'Miami Dade College',
        location: 'Miami, United States',
        startDate: '2012',
        endDate: '2014',
      },
    ],
    skills: [
      'Account Management',
      'CRM Management',
      'Sales Forecasting',
      'Negotiation',
      'Client Retention',
      'Pipeline Development',
    ],
    languages: [
      { language: 'English', dots: 5 },
      { language: 'Spanish', dots: 4 },
    ],
  },
  flowcv_steady_form: {
    fullName: 'Rohan K. Patel',
    title: 'Project Engineer',
    avatar: '/images/templates/rohan-avatar.jpg',
    email: 'rohan.patel@email.com',
    phone: '+91 98765 43210',
    location: 'Ahmedabad, India',
    linkedin: 'linkedin.com/in/rohan-patel',
    nationality: 'Indian',
    dob: '15.07.2002',
    summary:
      'Project Engineer with 6+ years of experience supporting industrial and infrastructure projects in fast-paced engineering environments. Strong background in project coordination, vendor management, technical documentation, and site execution, with a consistent focus on quality, safety, and on-time delivery. Brings practical approach to cross-functional collaboration and process improvement across design, procurement, and installation.',
    experiences: [
      {
        id: 'sf-1',
        role: 'Project Engineer',
        company: 'Adani Infrastructure',
        location: 'Ahmedabad, India',
        startDate: '01/2022',
        endDate: 'Present',
        bullets: [
          'Lead project coordination across teams for utility infrastructure upgrades.',
          'Improved project tracking accuracy by standardizing reporting formats and reviews.',
          'Managed vendor communication, material schedules, and technical documentation.',
        ],
      },
      {
        id: 'sf-2',
        role: 'Mechanical Engineer',
        company: 'Larsen & Toubro',
        location: 'Vadodara, India',
        startDate: '07/2019',
        endDate: '12/2021',
        bullets: [
          'Delivered equipment installation support for manufacturing projects while maintaining compliance with safety standards.',
          'Coordinated inspections and contractor activities to reduce commissioning delays.',
          'Owned reporting and supported issue resolution between engineering and site teams.',
        ],
      },
      {
        id: 'sf-3',
        role: 'Graduate Engineer Trainee',
        company: 'Tata Projects',
        location: 'Surat, India',
        startDate: '06/2017',
        endDate: '06/2019',
        bullets: [
          'Assisted engineers with BOQ preparation, site measurements, and progress updates.',
          'Contributed to control and material planning for civil and mechanical work packages.',
        ],
      },
    ],
    education: [
      {
        id: 'sf-edu-1',
        degree: 'Bachelor of Engineering in Mechanical Engineering',
        institution: 'Gujarat Technological University',
        location: 'Ahmedabad, India',
        startDate: '2013',
        endDate: '2017',
      },
      {
        id: 'sf-edu-2',
        degree: 'Diploma in Mechanical Engineering',
        institution: 'Government Polytechnic Ahmedabad',
        location: 'Ahmedabad, India',
        startDate: '2010',
        endDate: '2013',
      },
    ],
    skills: [
      'Project Coordination',
      'Mechanical Systems',
      'Technical Documentation',
      'Vendor Management',
      'Quality Assurance',
      'Site Execution',
    ],
    languages: [
      { language: 'English' },
      { language: 'Hindi' },
      { language: 'Gujarati' },
    ],
    certificates: [
      'AutoCAD Professional Certificate',
      'Primavera P6 Fundamentals',
      'Occupational Health and Safety',
    ],
  },
  flowcv_classic_serif: {
    fullName: "Andrew O'Sullivan",
    title: 'Product Manager',
    email: 'andrew.osullivan@email.com',
    phone: '+353 87 411 6849',
    location: 'Dublin, Ireland',
    linkedin: 'linkedin.com/in/andrew-osullivan',
    summary:
      'Product Manager with experience leading digital product initiatives across customer-facing and internal business platforms. Strong background in roadmap planning, stakeholder alignment, and translating user needs into clear product requirements that support measurable outcomes. Brings a practical, collaborative approach to cross-functional delivery and continuous product improvement in fast-paced environments.',
    experiences: [
      {
        id: 'cs-1',
        role: 'Product Manager',
        company: 'BrightLane Technologies',
        location: 'Dublin, Ireland',
        startDate: '2021/03',
        endDate: 'Present',
        bullets: [
          'Own product roadmap for onboarding and account management features.',
          'Partner with design and engineering to deliver quarterly releases on schedule.',
          'Analyze user feedback and usage trends to prioritize high-impact improvements.',
        ],
      },
      {
        id: 'cs-2',
        role: 'Associate Product Manager',
        company: 'Northridge Digital',
        location: 'Cork, Ireland',
        startDate: '2019/07',
        endDate: '2021/01',
        bullets: [
          'Coordinated backlog refinement and sprint planning across product teams.',
          'Supported launch of self-service tools that reduced support requests significantly.',
          'Worked with stakeholders to define requirements, success metrics, and priorities.',
        ],
      },
      {
        id: 'cs-3',
        role: 'Product Analyst',
        company: 'CloudWave Solutions',
        location: 'Galway, Ireland',
        startDate: '2017/09',
        endDate: '2019/06',
        bullets: [
          'Conducted competitor research to inform feature recommendations.',
          'Built performance reports to track adoption, retention, and product engagement.',
        ],
      },
    ],
    education: [
      {
        id: 'cs-edu-1',
        degree: 'MSc in Digital Innovation',
        institution: 'University College Dublin',
        location: 'Dublin, Ireland',
        startDate: '2016',
        endDate: '2017',
      },
      {
        id: 'cs-edu-2',
        degree: 'BA in Business and Management',
        institution: 'University of Galway',
        location: 'Galway, Ireland',
        startDate: '2012',
        endDate: '2016',
      },
    ],
    skills: [
      'Product Roadmapping',
      'User Research',
      'Agile Delivery',
      'Backlog Prioritization',
      'Data Analysis',
      'Go-to-Market Planning',
      'Project Management',
      'Cross-Functional Collaboration',
    ],
    languages: [
      { language: 'English', dots: 5 },
      { language: 'Irish', dots: 5 },
      { language: 'French', dots: 3 },
      { language: 'Spanish', dots: 2 },
    ],
    certificates: [
      'Professional Scrum Product Owner I (PSPO I)',
      'Certified ScrumMaster (CSM)',
      'Google Analytics Certification',
    ],
  },
  flowcv_leaves: {
    fullName: 'Catherine Bale',
    title: 'Marketing Assistant',
    avatar: '/images/templates/catherine-avatar.png',
    email: 'c.bale@bale.com',
    phone: '+15 417 543 010',
    location: '22611 Pacific Coast Hwy, Malibu California 9022 USA',
    website: 'bale2345',
    summary:
      'To obtain a challenging marketing position with a reputable company where I can utilize my marketing skills and experience to drive business growth.',
    experiences: [
      {
        id: 'cl-1',
        role: 'Marketing Manager',
        company: 'Acme Corporation',
        location: 'Milwaukee',
        startDate: '2019',
        endDate: 'Present',
        bullets: [
          'Developed and executed marketing strategies to increase brand awareness and drive sales.',
          'Supervised omnichannel campaign rollouts across digital and print media.',
        ],
      },
      {
        id: 'cl-2',
        role: 'Marketing Coordinator',
        company: 'Global Industries',
        location: 'Grand Island',
        startDate: '2017',
        endDate: '2019',
        bullets: [
          'Assisted in the development and execution of marketing campaigns to promote products and services.',
          'Conducted market research and competitor benchmarking to optimize campaign spend.',
        ],
      },
    ],
    education: [
      {
        id: 'cl-edu-1',
        degree: 'Business Marketing',
        institution: 'University of Wisconsin',
        location: 'Milwaukee',
        startDate: '2014',
        endDate: '2017',
      },
    ],
    certificates: [
      'Google Analytics Certified',
      'HubSpot Inbound Marketing Certified',
    ],
    languages: [
      { language: 'English', proficiency: 'C2' },
      { language: 'Spanish', proficiency: 'C2' },
    ],
    skillsCategories: [
      {
        name: 'Market research',
        desc: 'Strong marketing skills with experience in developing marketing strategies, conducting market research and executing campaigns.',
      },
      {
        name: 'Analytical thinking',
        desc: 'Analytical thinking with experience in analyzing data and market trends to identify opportunities and make informed decisions.',
      },
      {
        name: 'Project management',
        desc: 'Experience in managing multiple projects and prioritizing tasks effectively.',
      },
      {
        name: 'Tools',
        desc: 'Proficiency in software tools such as Microsoft Office, Google Analytics, and social media platforms.',
      },
    ],
  },
  modern_executive: {
    fullName: "Andrew O'Sullivan",
    title: 'Product Manager',
    avatar: '/images/templates/andrew-avatar.jpg',
    location: 'Obere Lände 23, 12345 Berlin',
    email: 'andrew@sullivan.com',
    phone: '+01 11111155',
    linkedin: 'andrewsullivan',
    summary:
      'Experienced Product Manager with a proven track record in the development and management of products throughout their lifecycle. Passionate, creative, and results-oriented.',
    experiences: [
      {
        id: 'me-1',
        role: 'Product Manager',
        company: 'TechGen GmbH',
        location: 'Berlin, Germany',
        startDate: '2018/08',
        endDate: '2023/07',
        bullets: [
          'Led a cross-functional team of 10 people in the development of a new product line, resulting in a 20% increase in revenue.',
          'Conducted market analysis and competitive studies to identify new product opportunities and expand the product portfolio.',
          'Successfully launched two new products in the market, leading to a 15% increase in market share.',
        ],
      },
      {
        id: 'me-2',
        role: 'Product Specialist',
        company: 'Solutions Inc',
        location: 'Munich, Germany',
        startDate: '2015/04',
        endDate: '2018/07',
        bullets: [
          'Developed and implemented a product strategy for the European market, resulting in a 25% revenue growth.',
          'Conducted training sessions and presentations for customers and sales teams to enhance product knowledge.',
        ],
      },
    ],
    education: [
      {
        id: 'me-edu-1',
        degree: 'Master of Business Administration (MBA)',
        institution: 'Tech University Munich',
        location: 'Munich, Germany',
        startDate: '2013/08',
        endDate: '2015/07',
      },
      {
        id: 'me-edu-2',
        degree: 'Bachelor of Engineering in Information Technology',
        institution: 'Technical University Vienna',
        location: 'Vienna, Austria',
        startDate: '2009/09',
        endDate: '2013/07',
      },
    ],
    skills: [
      { name: 'Product development and strategy', dots: 5 },
      { name: 'Project management and team leadership', dots: 5 },
      { name: 'Customer needs analysis and market research', dots: 4 },
      { name: 'Agile methods and Scrum', dots: 4 },
      { name: 'Data analysis', dots: 4 },
      { name: 'Presentation and communication', dots: 4 },
    ],
    languages: ['German', 'English', 'Spanish'],
    awards: ['Product Manager of the Year, Delta Solutions'],
    quote: {
      text: 'The best product is the one that solves a problem for the customer.',
      author: 'Eric Ries',
    },
  },
  flowcv_editorial_rule: {
    fullName: 'Lena Hoffmann',
    title: 'Operations Manager',
    email: 'lena.hoffmann@email.com',
    phone: '+49 151 4827 6391',
    location: 'Berlin, Germany',
    linkedin: 'linkedin.com/in/lena-hoffmann',
    summary:
      'Operations professional with 7+ years of experience supporting logistics, process improvement, and cross-functional coordination in fast-paced business environments. Strong track record of improving workflows, managing vendors, and delivering reliable service levels across daily operations. Combines analytical thinking with hands-on leadership to help growing organizations scale efficiently.',
    experiences: [
      {
        id: 'er-1',
        role: 'Operations Manager',
        company: 'Nova Retail Group',
        location: 'Berlin, Germany',
        startDate: '2022',
        endDate: 'Present',
        bullets: [
          'Lead daily operations across warehousing, procurement, and support teams.',
          'Improved order accuracy by redesigning internal handoff procedures.',
          'Managed vendor contracts and reduced annual service costs.',
          'Built KPI dashboards for capacity, service, and productivity tracking.',
        ],
      },
      {
        id: 'er-2',
        role: 'Operations Coordinator',
        company: 'Urban Freight Solutions',
        location: 'Hamburg, Germany',
        startDate: '2019',
        endDate: '2022',
        bullets: [
          'Coordinated transport schedules and resolved delivery escalations promptly.',
          'Standardized reporting processes for weekly management reviews.',
          'Supported onboarding and training for new team members.',
        ],
      },
      {
        id: 'er-3',
        role: 'Operations Analyst',
        company: 'GreenLine Services',
        location: 'Berlin, Germany',
        startDate: '2017',
        endDate: '2019',
        bullets: [
          'Analyzed process data to identify delays and waste.',
          'Implemented automated inventory reporting across regional depots.',
        ],
      },
    ],
    education: [
      {
        id: 'er-edu-1',
        degree: 'M.Sc. Management',
        institution: 'Humboldt University of Berlin',
        location: 'Berlin, Germany',
        startDate: '2015',
        endDate: '2017',
      },
      {
        id: 'er-edu-2',
        degree: 'B.A. Business Administration',
        institution: 'University of Cologne',
        location: 'Cologne, Germany',
        startDate: '2011',
        endDate: '2015',
      },
    ],
    skills: [
      'Process Improvement',
      'Supply Chain Coordination',
      'Vendor Management',
      'KPI Reporting',
      'Budget Tracking',
      'ERP Systems',
      'Inventory Planning',
      'SAP',
      'Excel & Google Sheets',
      'Team Leadership',
      'Continuous Improvement',
      'Stakeholder Management',
    ],
    languages: ['German (Native)', 'English (Fluent)', 'French (Conversational)'],
    certificates: [
      'Lean Six Sigma Green Belt',
      'APICS Certified in Logistics, Transportation and Distribution',
      'PRINCE2 Foundation Certificate',
      'SAP Certified Application Associate',
    ],
  },
  flowcv_precision_line: {
    fullName: 'Daniel Mercer',
    title: 'Vice President of Sales',
    email: 'daniel.mercer@email.com',
    phone: '+1 312 555 0187',
    location: 'Chicago, IL',
    linkedin: 'linkedin.com/in/daniel-mercer',
    summary:
      'Sales professional with 8+ years of experience supporting revenue growth in B2B technology and business services environments. Skilled in account management, pipeline development, team coordination, and client relationship building. Brings a practical, performance-focused approach to sales execution and is well aligned with mid-level commercial leadership roles.',
    experiences: [
      {
        id: 'pl-1',
        role: 'Sales Manager',
        company: 'Nevero Solutions',
        location: 'Chicago, Illinois',
        startDate: '2022',
        endDate: 'Present',
        bullets: [
          'Manage a team of account executives across mid-market accounts.',
          'Improve pipeline tracking and weekly forecast reporting accuracy.',
          'Lead client negotiations and support renewal growth opportunities.',
        ],
      },
      {
        id: 'pl-2',
        role: 'Senior Sales Specialist',
        company: 'BrightPath Systems',
        location: 'Chicago, Illinois',
        startDate: '2019',
        endDate: '2022',
        bullets: [
          'Delivered quarterly targets through consultative selling and account expansion.',
          'Built strong relationships with regional clients in healthcare and finance.',
          'Coordinated with marketing to improve lead follow-up and conversion rates.',
        ],
      },
      {
        id: 'pl-3',
        role: 'Sales Coordinator',
        company: 'Horizon Logic',
        location: 'Milwaukee, Wisconsin',
        startDate: '2016',
        endDate: '2019',
        bullets: [
          'Supported outbound campaigns and maintained CRM data quality.',
          'Assisted with proposal preparation, reporting, and sales meeting coordination.',
        ],
      },
    ],
    education: [
      {
        id: 'pl-edu-1',
        degree: 'Professional Certificate in Sales Management',
        institution: 'DePaul University',
        location: 'Chicago, Illinois',
        startDate: '2018',
        endDate: '2018',
      },
      {
        id: 'pl-edu-2',
        degree: 'Bachelor of Science in Marketing',
        institution: 'Indiana University Bloomington',
        location: 'Bloomington, Indiana',
        startDate: '2012',
        endDate: '2016',
      },
    ],
    skills: [
      'Sales Strategy',
      'Revenue Growth',
      'Enterprise Account Management',
      'Team Leadership',
      'Pipeline Management',
      'Forecasting and Reporting',
      'Negotiation',
      'Cross-Functional Collaboration',
    ],
    languages: ['English (Native)', 'Spanish (Proficient)', 'French (Conversational)'],
    certificates: [
      'Certified Sales Leadership Professional',
      'HubSpot Sales Software Certification',
      'Salesforce Certified Sales Representative',
      'Strategic Account Management Certification',
    ],
  },
  classic_ats: {
    fullName: 'Emily Carter',
    title: 'Project Manager',
    email: 'emily.carter@email.com',
    phone: '+1 416 555 2847',
    location: 'Toronto, Canada',
    linkedin: 'linkedin.com/in/emily-carter',
    summary:
      'Project Manager with six years of experience coordinating cross-functional initiatives in technology and business operations. Skilled in stakeholder communication, project planning, risk tracking, and delivery governance across complex environments. Known for building practical workflows, improving team alignment, and keeping priorities moving under tight deadlines.',
    experiences: [
      {
        id: 'ca-1',
        role: 'Project Manager',
        company: 'NorthBridge Digital',
        location: 'Toronto, Canada',
        startDate: '2022/03',
        endDate: 'Present',
        bullets: [
          'Managed release plans across product, engineering, and operations teams.',
          'Coordinated stakeholder updates, risk reviews, and milestone reporting.',
          'Improved delivery tracking, reducing gaps across concurrent workstreams.',
        ],
      },
      {
        id: 'ca-2',
        role: 'Project Coordinator',
        company: 'MapleWorks Solutions',
        location: 'Toronto, Canada',
        startDate: '2019/07',
        endDate: '2022/01',
        bullets: [
          'Supported schedules, budgets, and documentation for transformation initiatives.',
          'Facilitated team meetings and maintained cross-department action logs.',
          'Escalated risks before blockers affected delivery timelines.',
        ],
      },
      {
        id: 'ca-3',
        role: 'Operations Analyst',
        company: 'BrightPath Services',
        location: 'Ottawa, Canada',
        startDate: '2017/09',
        endDate: '2019/06',
        bullets: [
          'Analyzed workflow data to identify service delivery delays.',
          'Prepared reports supporting resource planning and prioritization.',
          'Documented process improvements for managers and project teams.',
        ],
      },
      {
        id: 'ca-4',
        role: 'Project Management Student Assistant',
        company: 'University of Toronto',
        location: 'Toronto, Canada',
        startDate: '2016/09',
        endDate: '2017/06',
        bullets: [
          'Supported project timelines, meeting notes, and team follow-ups.',
          'Updated task boards and tracked deadlines for student initiatives.',
        ],
      },
    ],
    education: [
      {
        id: 'ca-edu-1',
        degree: 'Bachelor of Commerce in Management',
        institution: 'Toronto Metropolitan University',
        location: 'Toronto, Canada',
        startDate: '2013',
        endDate: '2017',
      },
      {
        id: 'ca-edu-2',
        degree: 'Diploma in Business Administration',
        institution: 'Algonquin College',
        location: 'Ottawa, Canada',
        startDate: '2011',
        endDate: '2013',
      },
    ],
    skills: [
      'Project Planning',
      'Stakeholder Management',
      'Risk Management',
      'Agile Delivery',
      'Budget Tracking',
      'Process Improvement',
      'Jira',
      'Microsoft Project',
    ],
    certificates: [
      'Project Management Professional (PMP)',
      'Certified ScrumMaster (CSM)',
      'Google Project Management Certificate',
    ],
    languages: ['English', 'French'],
  },
};

// Helper to render FlowCV rating dots
const renderRatingDots = (
  rating: number,
  max = 5,
  activeClass = 'bg-slate-900',
  inactiveClass = 'bg-slate-200'
) => {
  return (
    <div className="flex items-center gap-1 shrink-0">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`w-2 h-2 rounded-full inline-block ${
            i < rating ? activeClass : inactiveClass
          }`}
        />
      ))}
    </div>
  );
};

export const ResumeTemplateRenderer: React.FC<ResumeTemplateProps> = ({
  templateId,
  data,
  zoomLevel = 100,
  isMicroPreview = false,
}) => {
  const safeData = data || (MOCK_PERSONA as any);
  const pInfo = safeData?.personalInfo || (safeData as any) || MOCK_PERSONA.personalInfo;

  // Check if we should use persona defaults (during micro preview or default mock data)
  const isDefaultPersona = !data || pInfo?.fullName === 'Alex Morgan' || !pInfo?.fullName;
  const flowcvPersona = (FLOWCV_PERSONAS as any)[templateId];
  const useFlowPersona = flowcvPersona && (isMicroPreview || isDefaultPersona);

  // Candidate basic attributes
  const fullName = useFlowPersona
    ? flowcvPersona.fullName
    : pInfo?.fullName || (safeData as any)?.fullName || MOCK_PERSONA.fullName;
  const email = useFlowPersona
    ? flowcvPersona.email
    : pInfo?.email || (safeData as any)?.email || MOCK_PERSONA.email;
  const phone = useFlowPersona
    ? flowcvPersona.phone
    : pInfo?.phone || (safeData as any)?.phone || MOCK_PERSONA.phone;
  const location = useFlowPersona
    ? flowcvPersona.location
    : pInfo?.location || (safeData as any)?.location || MOCK_PERSONA.location;
  const linkedin = useFlowPersona
    ? flowcvPersona.linkedin
    : pInfo?.linkedin || (safeData as any)?.linkedin || MOCK_PERSONA.linkedin;
  const github = pInfo?.github || (safeData as any)?.github || MOCK_PERSONA.github;
  const website = useFlowPersona
    ? flowcvPersona.website || MOCK_PERSONA.website
    : pInfo?.website || (safeData as any)?.website || MOCK_PERSONA.website;
  const summary = useFlowPersona
    ? flowcvPersona.summary
    : pInfo?.summary || (safeData as any)?.summary || MOCK_PERSONA.summary;

  const rawExp = useFlowPersona ? flowcvPersona.experiences : safeData?.experiences;
  const rawEdu = useFlowPersona ? flowcvPersona.education : safeData?.education;
  const rawProj = safeData?.projects;
  const rawSkills = useFlowPersona ? flowcvPersona.skills : safeData?.skills;
  const rawCerts = useFlowPersona ? flowcvPersona.certificates : safeData?.certifications;

  interface ResumeExpItem {
    id?: string;
    role: string;
    company: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    bullets?: string[];
  }
  interface ResumeEduItem {
    id?: string;
    degree: string;
    institution: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    gpa?: string;
  }
  interface ResumeProjItem {
    id?: string;
    title?: string;
    name?: string;
    techStack?: string;
    tech?: string;
    description?: string;
    bullets?: string[];
  }

  const expList: ResumeExpItem[] = (Array.isArray(rawExp) && rawExp.length > 0 ? rawExp : MOCK_PERSONA.experiences) as ResumeExpItem[];
  const eduList: ResumeEduItem[] = (Array.isArray(rawEdu) && rawEdu.length > 0 ? rawEdu : MOCK_PERSONA.education) as ResumeEduItem[];
  const projList: ResumeProjItem[] = (Array.isArray(rawProj) && rawProj.length > 0 ? rawProj : MOCK_PERSONA.projects) as ResumeProjItem[];
  const skillList: string[] = (Array.isArray(rawSkills) && rawSkills.length > 0 ? rawSkills : MOCK_PERSONA.skills) as string[];
  const certList: string[] = (
    Array.isArray(rawCerts) && rawCerts.length > 0
      ? rawCerts
      : MOCK_PERSONA.certifications
  ) as string[];

  const candidateRole = useFlowPersona
    ? flowcvPersona.title
    : expList.length > 0
    ? expList[0].role
    : MOCK_PERSONA.title;

  const isFullBleed = [
    'flowcv_atlantic_blue',
    'flowcv_leaves',
    'flowcv_silver_banner',
    'navy_sidebar',
    'navy_header',
    'teal_executive',
  ].includes(templateId);

  return (
    <div
      id={isMicroPreview ? undefined : "resume-print-sheet"}
      contentEditable={!isMicroPreview}
      suppressContentEditableWarning
      className={`bg-white text-[#1E293B] ${
        isMicroPreview ? 'shadow-none' : 'shadow-2xl rounded-xs print:shadow-none'
      } transition-transform origin-top select-text box-border font-sans focus:outline-none focus:ring-1 focus:ring-emerald-500/20`}
      style={{
        width: '794px',
        minHeight: '1123px',
        height: isMicroPreview ? '1123px' : undefined,
        maxWidth: '794px',
        padding: isFullBleed ? 0 : (isMicroPreview ? '30px 36px' : '40px 44px'),
        transform: isMicroPreview ? undefined : `scale(${zoomLevel / 100})`,
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* =========================================================================
          1. SPLIT DUO (Cobalt Blue Balanced 2-Column Grid)
          ========================================================================= */}
      {templateId === 'split_duo' && (
        <div className="min-h-[1055px] flex flex-col justify-between font-sans">
          <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="border-b-2 border-blue-600 pb-3 flex justify-between items-start">
              <div>
                <h1 className="text-[26px] font-black uppercase text-slate-900 tracking-tight leading-none">
                  {fullName || 'YOUR NAME'}
                </h1>
                <p className="text-[12.5px] font-bold text-blue-600 mt-1.5">{candidateRole}</p>
              </div>
              <div className="text-[10.5px] text-slate-600 flex flex-col items-end gap-1 leading-tight">
                {email && <span>{email}</span>}
                {phone && <span>{phone} • {location}</span>}
                {linkedin && <span className="text-blue-600">{linkedin}</span>}
              </div>
            </div>

            {/* 2-Column Balanced Body */}
            <div className="grid grid-cols-12 gap-5">
              {/* Left Column: Work Experience & Projects */}
              <div className="col-span-7 flex flex-col gap-3.5">
                {expList.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <h2 className="text-[12px] font-black uppercase text-blue-700 tracking-wider flex items-center gap-1.5 border-b border-blue-200 pb-1">
                      <Briefcase className="w-3.5 h-3.5 text-blue-600" /> Work Experience
                    </h2>
                    <div className="flex flex-col gap-3">
                      {expList.map((exp) => (
                        <div key={exp.id} className="flex flex-col gap-0.5">
                          <div className="flex justify-between items-baseline text-[12px]">
                            <span className="font-extrabold text-slate-900">{exp.role}</span>
                            <span className="text-[10px] text-slate-500 shrink-0 font-medium">{exp.startDate} – {exp.endDate}</span>
                          </div>
                          <span className="text-[11px] font-bold text-blue-700">{exp.company}</span>
                          {exp.bullets && (
                            <ul className="list-disc list-outside ml-4 text-[11px] text-slate-700 flex flex-col gap-1 mt-0.5 leading-relaxed">
                              {exp.bullets.map((b, idx) => (
                                <li key={idx}>{b}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {projList.length > 0 && (
                  <div className="flex flex-col gap-2 mt-1">
                    <h2 className="text-[12px] font-black uppercase text-blue-700 tracking-wider flex items-center gap-1.5 border-b border-blue-200 pb-1">
                      <FolderGit2 className="w-3.5 h-3.5 text-blue-600" /> Featured Projects
                    </h2>
                    <div className="flex flex-col gap-2.5">
                      {projList.map((p) => (
                        <div key={p.id} className="flex flex-col gap-0.5 text-[11px]">
                          <div className="flex justify-between items-baseline">
                            <span className="font-bold text-slate-900 text-[11.5px]">{p.title}</span>
                            {p.techStack && <span className="text-[10px] text-blue-600 font-mono font-medium">{p.techStack}</span>}
                          </div>
                          {p.bullets?.map((b, idx) => (
                            <p key={idx} className="text-slate-600 leading-relaxed">• {b}</p>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Summary, Skills, Education, Milestones */}
              <div className="col-span-5 flex flex-col justify-between gap-3.5">
                {summary && (
                  <div className="bg-blue-50/70 border-l-3 border-blue-600 p-3 rounded-r">
                    <span className="text-[10.5px] font-black uppercase text-blue-800 block mb-1 tracking-wider">
                      Executive Profile
                    </span>
                    <p className="text-[11px] text-slate-800 leading-relaxed">{summary}</p>
                  </div>
                )}

                {skillList.length > 0 && (
                  <div className="flex flex-col gap-1.5">
                    <h2 className="text-[12px] font-black uppercase text-blue-700 tracking-wider flex items-center gap-1.5 border-b border-blue-200 pb-1">
                      <Wrench className="w-3.5 h-3.5 text-blue-600" /> Technical Arsenal
                    </h2>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {skillList.map((sk, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-900 border border-blue-200 rounded text-[10px] font-semibold">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {eduList.length > 0 && (
                  <div className="flex flex-col gap-1.5">
                    <h2 className="text-[12px] font-black uppercase text-blue-700 tracking-wider flex items-center gap-1.5 border-b border-blue-200 pb-1">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-600" /> Education
                    </h2>
                    <div className="flex flex-col gap-2.5 mt-0.5">
                      {eduList.map((edu) => (
                        <div key={edu.id} className="flex flex-col text-[11px]">
                          <span className="font-bold text-slate-900">{edu.institution}</span>
                          <span className="text-slate-700 font-medium">{edu.degree}</span>
                          <span className="text-[10px] text-slate-500">{edu.startDate} – {edu.endDate} {edu.gpa && `| GPA ${edu.gpa}`}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {certList.length > 0 && (
                  <div className="flex flex-col gap-1.5">
                    <h2 className="text-[12px] font-black uppercase text-blue-700 tracking-wider flex items-center gap-1.5 border-b border-blue-200 pb-1">
                      <Award className="w-3.5 h-3.5 text-blue-600" /> Key Milestones & Honors
                    </h2>
                    <div className="flex flex-col gap-1.5 mt-0.5">
                      {certList.slice(0, 4).map((c, idx) => (
                        <div key={idx} className="text-[10.5px] text-slate-700 flex items-start gap-1.5 leading-snug">
                          <span className="text-blue-600 font-bold shrink-0 mt-0.5">✓</span>
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          2. PRESTIGE GOLD (Obsidian Banner + Metallic Warm Gold Accents)
         ========================================================================= */}
      {(templateId === 'prestige_gold' || templateId === 'boardroom_serif') && (
        <div className="min-h-[1055px] flex flex-col justify-between -mx-[14mm] -mt-[12mm] pb-4 font-serif">
          {/* Obsidian & Gold Banner */}
          <div className="bg-[#0B132B] text-white px-8 py-5 flex flex-col gap-2 relative">
            <div className="flex justify-between items-start">
              <div>
                <span className="inline-block px-2.5 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-full text-[10px] font-black tracking-widest uppercase mb-1">
                  ★ C-SUITE / BOARD EXECUTIVE
                </span>
                <h1 className="text-[28px] font-black tracking-tight text-white leading-none">
                  {fullName || 'YOUR NAME'}
                </h1>
                <p className="text-[13px] font-bold text-amber-400 mt-1 tracking-wide">{candidateRole}</p>
              </div>
              <div className="text-[10.5px] text-slate-300 font-sans flex flex-col items-end gap-0.5">
                {email && <span>{email}</span>}
                {phone && <span>{phone} • {location}</span>}
                {linkedin && <span className="text-amber-300">{linkedin}</span>}
              </div>
            </div>
            {/* Gold separator hairline */}
            <div className="h-0.5 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600 w-full mt-2" />
          </div>

          {/* Body Content */}
          <div className="px-8 flex-1 flex flex-col justify-between gap-3 text-slate-800 pt-3">
            {summary && (
              <div className="border-l-3 border-amber-600 pl-3.5 py-1">
                <span className="text-[10.5px] font-black uppercase text-amber-700 tracking-wider block mb-0.5">
                  Executive Mandate & Leadership Vision
                </span>
                <p className="text-[11px] text-slate-800 leading-relaxed font-sans">{summary}</p>
              </div>
            )}

            <div className="grid grid-cols-12 gap-5 mt-1">
              {/* Left Column (65%) */}
              <div className="col-span-8 flex flex-col gap-3.5">
                {expList.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <h2 className="text-[12.5px] font-serif font-black uppercase tracking-wider text-slate-900 border-b-2 border-amber-500/60 pb-1">
                      Executive Trajectory & Key Results
                    </h2>
                    <div className="flex flex-col gap-3">
                      {expList.map((exp) => (
                        <div key={exp.id} className="flex flex-col gap-0.5">
                          <div className="flex justify-between items-baseline text-[12px]">
                            <span className="font-extrabold text-slate-950 font-serif">{exp.role}</span>
                            <span className="text-[10px] text-slate-500 font-sans">{exp.startDate} – {exp.endDate}</span>
                          </div>
                          <span className="text-[11px] font-bold text-amber-700 font-sans">{exp.company}</span>
                          {exp.bullets && (
                            <ul className="list-disc list-outside ml-4 text-[11px] text-slate-700 flex flex-col gap-1 mt-0.5 leading-relaxed font-sans">
                              {exp.bullets.map((b, idx) => (
                                <li key={idx}>{b}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {projList.length > 0 && (
                  <div className="flex flex-col gap-2 mt-1">
                    <h2 className="text-[12px] font-serif font-black uppercase tracking-wider text-slate-900 border-b-2 border-amber-500/60 pb-1">
                      Major Engagements & Board Governance
                    </h2>
                    <div className="flex flex-col gap-2.5">
                      {projList.map((p) => (
                        <div key={p.id} className="flex flex-col gap-0.5 text-[11px] font-sans">
                          <div className="flex justify-between items-baseline font-bold text-[11.5px]">
                            <span className="text-slate-900">{p.title}</span>
                            {p.techStack && <span className="text-amber-700 text-[10px] font-normal">{p.techStack}</span>}
                          </div>
                          {p.bullets?.map((b, idx) => (
                            <p key={idx} className="text-slate-600 leading-relaxed">• {b}</p>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column (35%) */}
              <div className="col-span-4 flex flex-col justify-between gap-3.5">
                <div className="bg-amber-50/50 border border-amber-200 p-3 rounded-lg flex flex-col gap-1.5 font-sans">
                  <h3 className="text-[11.5px] font-black uppercase tracking-wider text-amber-900 border-b border-amber-200 pb-1">
                    Core Competencies
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {skillList.map((sk, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-white text-slate-800 border border-amber-300 rounded text-[10px] font-bold">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {eduList.length > 0 && (
                  <div className="flex flex-col gap-1 font-sans">
                    <h3 className="text-[11.5px] font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 font-serif">
                      Academic Pedigree
                    </h3>
                    <div className="flex flex-col gap-2 mt-1">
                      {eduList.map((edu) => (
                        <div key={edu.id} className="text-[10.5px] flex flex-col">
                          <span className="font-bold text-slate-900">{edu.institution}</span>
                          <span className="text-slate-700">{edu.degree}</span>
                          <span className="text-[9.5px] text-slate-500">{edu.startDate} – {edu.endDate}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {certList.length > 0 && (
                  <div className="flex flex-col gap-1 font-sans">
                    <h3 className="text-[11.5px] font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 font-serif">
                      Distinctions & Honors
                    </h3>
                    <div className="flex flex-col gap-1.5 mt-1">
                      {certList.slice(0, 4).map((c, idx) => (
                        <div key={idx} className="text-[10.5px] text-slate-700 leading-snug">
                          ◆ {c}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          3. AI / ML LEAD (High-Density Telemetry & Swarm Metrics)
         ========================================================================= */}
      {(templateId === 'ai_ml_lead' || templateId === 'ai_researcher' || templateId === 'quantum_research') && (
        <div className="min-h-[1055px] flex flex-col justify-between font-sans">
          <div className="flex flex-col gap-3.5">
            {/* Top AI Telemetry Banner */}
            <div className="border-b-2 border-indigo-600 pb-2.5">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-[26px] font-black tracking-tight text-slate-900">{fullName || 'YOUR NAME'}</h1>
                    <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 font-mono text-[10px] font-bold rounded">
                      [ AI // LLM ARCHITECT ]
                    </span>
                  </div>
                  <p className="text-[12.5px] font-mono text-indigo-700 mt-1 font-bold">{candidateRole}</p>
                </div>
                <div className="text-[10.5px] font-mono text-slate-600 flex flex-col items-end leading-tight">
                  <span>{email}</span>
                  <span>{phone} • {location}</span>
                  {github && <span className="text-indigo-600">{github}</span>}
                </div>
              </div>

              {/* 4 Telemetry Metrics Cards */}
              <div className="grid grid-cols-4 gap-2.5 mt-2.5 font-mono text-center">
                <div className="bg-indigo-50/70 border border-indigo-200 p-1.5 rounded">
                  <span className="block text-[8.5px] text-slate-500 uppercase">Throughput</span>
                  <span className="text-[11.5px] font-black text-indigo-900">120k Req/s</span>
                </div>
                <div className="bg-indigo-50/70 border border-indigo-200 p-1.5 rounded">
                  <span className="block text-[8.5px] text-slate-500 uppercase">p95 Latency</span>
                  <span className="text-[11.5px] font-black text-indigo-900">&lt;45ms SLA</span>
                </div>
                <div className="bg-indigo-50/70 border border-indigo-200 p-1.5 rounded">
                  <span className="block text-[8.5px] text-slate-500 uppercase">Token Cost</span>
                  <span className="text-[11.5px] font-black text-indigo-900">-48% Spend</span>
                </div>
                <div className="bg-indigo-50/70 border border-indigo-200 p-1.5 rounded">
                  <span className="block text-[8.5px] text-slate-500 uppercase">Availability</span>
                  <span className="text-[11.5px] font-black text-indigo-900">99.999% SLA</span>
                </div>
              </div>
            </div>

            {/* Body */}
            {summary && (
              <div className="text-[11px] text-slate-800 leading-relaxed font-mono bg-slate-50 border-l-3 border-indigo-600 p-2.5 rounded-r">
                &gt; {summary}
              </div>
            )}

            {expList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-[12.5px] font-black font-mono uppercase tracking-wider text-indigo-900 border-b-2 border-indigo-200 pb-1">
                  01 // DISTRIBUTED SYSTEMS & MODEL EXECUTION
                </h2>
                <div className="flex flex-col gap-3">
                  {expList.map((exp) => (
                    <div key={exp.id} className="flex flex-col gap-0.5">
                      <div className="flex justify-between items-baseline text-[12px]">
                        <span className="font-extrabold text-slate-900">{exp.role}</span>
                        <span className="text-[10px] font-mono text-indigo-700">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      <span className="text-[11px] font-bold text-slate-700 font-mono">{exp.company}</span>
                      {exp.bullets && (
                        <ul className="list-disc list-outside ml-4 text-[11px] text-slate-700 flex flex-col gap-1 mt-0.5 leading-relaxed font-sans">
                          {exp.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projList.length > 0 && (
              <div className="flex flex-col gap-2 mt-1">
                <h2 className="text-[12px] font-black font-mono uppercase tracking-wider text-indigo-900 border-b-2 border-indigo-200 pb-1">
                  02 // AUTONOMOUS AGENTS & PRODUCTION SYSTEMS
                </h2>
                <div className="flex flex-col gap-2.5">
                  {projList.map((p) => (
                    <div key={p.id} className="flex flex-col gap-0.5 text-[11px]">
                      <div className="flex justify-between items-baseline font-bold text-[11.5px]">
                        <span className="text-slate-900">{p.title}</span>
                        {p.techStack && <span className="text-indigo-600 font-mono text-[10px] font-normal">{p.techStack}</span>}
                      </div>
                      {p.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-600 flex flex-col gap-0.5 leading-relaxed font-sans">
                          {p.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-indigo-100 mt-2">
            {skillList.length > 0 && (
              <div>
                <h2 className="text-[12px] font-black font-mono uppercase tracking-wider text-indigo-900 border-b border-indigo-200 pb-0.5">
                  03 // AI / ML STACK
                </h2>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {skillList.map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-indigo-50 text-indigo-900 border border-indigo-200 font-mono text-[10px] rounded font-semibold">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {eduList.length > 0 && (
              <div>
                <h2 className="text-[12px] font-black font-mono uppercase tracking-wider text-indigo-900 border-b border-indigo-200 pb-0.5">
                  04 // RESEARCH & CREDENTIALS
                </h2>
                <div className="flex flex-col gap-2 mt-1.5 text-[11px]">
                  {eduList.map((edu) => (
                    <div key={edu.id}>
                      <span className="font-bold text-slate-900 block">{edu.institution}</span>
                      <span className="text-slate-600">{edu.degree} ({edu.startDate} – {edu.endDate})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          4. GRAPHITE COMPACT (Ultra-Dense 1-Page Leading)
         ========================================================================= */}
      {templateId === 'graphite_compact' && (
        <div className="min-h-[1055px] flex flex-col justify-between font-sans text-slate-900">
          <div className="flex flex-col gap-3.5">
            {/* Header */}
            <div className="border-b-2 border-slate-900 pb-2.5 flex justify-between items-baseline">
              <div>
                <h1 className="text-[26px] font-black uppercase tracking-tight text-slate-950 leading-none">
                  {fullName || 'YOUR NAME'}
                </h1>
                <p className="text-[12.5px] font-bold text-slate-700 mt-1">{candidateRole}</p>
              </div>
              <div className="text-[10.5px] text-slate-600 flex flex-wrap gap-2.5">
                {email && <span>{email}</span>}
                {phone && <span>• {phone}</span>}
                {location && <span>• {location}</span>}
                {linkedin && <span>• {linkedin}</span>}
              </div>
            </div>

            {summary && (
              <p className="text-[11px] text-slate-800 leading-relaxed border-l-3 border-slate-800 pl-3">
                {summary}
              </p>
            )}

            {/* Experience */}
            {expList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-[12.5px] font-black uppercase tracking-widest text-slate-950 border-b-2 border-slate-300 pb-1">
                  PROFESSIONAL EXPERIENCE
                </h2>
                <div className="flex flex-col gap-3">
                  {expList.map((exp) => (
                    <div key={exp.id} className="flex flex-col gap-0.5 text-[11px]">
                      <div className="flex justify-between items-baseline font-bold text-[12px] text-slate-950">
                        <span>{exp.role} — <span className="font-semibold text-slate-700">{exp.company}</span></span>
                        <span className="text-[10px] text-slate-500 font-normal">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      {exp.bullets && (
                        <ul className="list-disc list-outside ml-4 text-[11px] text-slate-700 flex flex-col gap-1 mt-0.5 leading-relaxed">
                          {exp.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projList.length > 0 && (
              <div className="flex flex-col gap-2 mt-1">
                <h2 className="text-[12px] font-black uppercase tracking-widest text-slate-950 border-b-2 border-slate-300 pb-1">
                  KEY PROJECTS & INITIATIVES
                </h2>
                <div className="flex flex-col gap-2.5">
                  {projList.map((p) => (
                    <div key={p.id} className="flex flex-col gap-0.5 text-[11px]">
                      <div className="flex justify-between items-baseline font-bold text-[11.5px]">
                        <span className="text-slate-950">{p.title}</span>
                        {p.techStack && <span className="text-slate-600 text-[10px] font-normal font-mono">{p.techStack}</span>}
                      </div>
                      {p.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-700 flex flex-col gap-0.5 leading-relaxed">
                          {p.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-300 mt-2">
            {skillList.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <h2 className="text-[12px] font-black uppercase tracking-widest text-slate-950 border-b border-slate-300 pb-0.5">
                  CORE COMPETENCIES
                </h2>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {skillList.map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-850 rounded text-[10px] font-semibold border border-slate-200">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {eduList.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <h2 className="text-[12px] font-black uppercase tracking-widest text-slate-950 border-b border-slate-300 pb-0.5">
                  EDUCATION & CREDENTIALS
                </h2>
                <div className="flex flex-col gap-2 mt-1 text-[11px]">
                  {eduList.map((edu) => (
                    <div key={edu.id}>
                      <span className="font-bold block text-slate-950">{edu.institution}</span>
                      <span className="text-slate-600">{edu.degree}</span>
                      <span className="text-[10px] text-slate-500 block">{edu.startDate} – {edu.endDate}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          5. CPA & AUDIT LEAD / CORPORATE COUNSEL (Classic Centered Double Hairline)
         ========================================================================= */}
      {(templateId === 'cpa_audit_lead' || templateId === 'corporate_counsel_lead' || templateId === 'fortune500_single') && (
        <div className="min-h-[1055px] flex flex-col justify-between font-serif text-slate-950">
          <div className="flex flex-col gap-3.5">
            {/* Centered Serif Header */}
            <div className="text-center flex flex-col items-center">
              <h1 className="text-[26px] font-bold uppercase tracking-widest text-slate-950">
                {fullName || 'YOUR NAME'}
              </h1>
              <p className="text-[12.5px] font-semibold text-slate-700 tracking-wide mt-0.5">
                {templateId === 'corporate_counsel_lead' ? 'CORPORATE COUNSEL & STRATEGIC ADVISORY' : 'CERTIFIED PUBLIC ACCOUNTANT (CPA) & AUDIT LEAD'}
              </p>
              <div className="text-[10.5px] text-slate-600 flex justify-center flex-wrap gap-2.5 mt-1 font-sans">
                {email && <span>{email}</span>}
                {phone && <span>• {phone}</span>}
                {location && <span>• {location}</span>}
                {linkedin && <span>• {linkedin}</span>}
              </div>
            </div>

            {/* Double Hairline Rule */}
            <div className="border-y-2 border-double border-slate-700 py-1.5 my-0.5">
              <p className="text-[11px] text-slate-800 text-center italic leading-relaxed px-4">
                {summary}
              </p>
            </div>

            {/* Experience */}
            {expList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-[12.5px] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 text-center">
                  PROFESSIONAL EXPERIENCE & AUDIT RECORD
                </h2>
                <div className="flex flex-col gap-3">
                  {expList.map((exp) => (
                    <div key={exp.id} className="flex flex-col gap-0.5">
                      <div className="flex justify-between items-baseline text-[12px]">
                        <span className="font-bold text-slate-950">{exp.role}</span>
                        <span className="text-[10px] text-slate-600 italic">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      <span className="text-[11px] text-slate-700 italic">{exp.company} — {exp.location}</span>
                      {exp.bullets && (
                        <ul className="list-disc list-outside ml-4 text-[11px] text-slate-800 flex flex-col gap-0.5 mt-0.5 leading-relaxed font-sans">
                          {exp.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Engagements / Projects */}
            {projList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-[12px] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 text-center">
                  SELECTED ADVISORY ENGAGEMENTS & SPECIAL PROJECTS
                </h2>
                <div className="flex flex-col gap-2.5">
                  {projList.map((p) => (
                    <div key={p.id} className="flex flex-col gap-0.5 text-[11px]">
                      <div className="flex justify-between items-baseline text-[11.5px]">
                        <span className="font-bold text-slate-950">{p.title}</span>
                        {p.techStack && <span className="text-slate-600 text-[10px] font-sans italic">{p.techStack}</span>}
                      </div>
                      {p.bullets && (
                        <ul className="list-disc list-outside ml-4 text-[11px] text-slate-800 flex flex-col gap-0.5 leading-relaxed font-sans">
                          {p.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Credentials Grid */}
          <div className="grid grid-cols-2 gap-5 pt-3 border-t border-slate-300 mt-2">
            {eduList.length > 0 && (
              <div>
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5">
                  EDUCATION & LICENSURES
                </h2>
                <div className="flex flex-col gap-1.5 mt-1.5 text-[10.5px]">
                  {eduList.map((edu) => (
                    <div key={edu.id}>
                      <span className="font-bold block text-slate-950">{edu.institution}</span>
                      <span className="text-slate-700">{edu.degree}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {skillList.length > 0 && (
              <div>
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5">
                  CORE AUDIT & GOVERNANCE
                </h2>
                <div className="flex flex-wrap gap-1 mt-1.5 font-sans">
                  {skillList.map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-800 border border-slate-300 rounded text-[9.5px]">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          6. BACKEND & DISTRIBUTED ARCHITECTURE (Terminal Code Styling)
         ========================================================================= */}
      {(templateId === 'backend_distributed_arch' || templateId === 'minimalist_tech' || templateId === 'rust_systems') && (
        <div className="min-h-[1055px] flex flex-col justify-between font-mono text-slate-900">
          <div className="flex flex-col gap-3.5">
            <div className="border-b-2 border-slate-900 pb-2.5">
              <div className="text-[10px] text-emerald-600 font-bold mb-0.5">
                usr@distributed-arch:~$ cat profile.json
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-[26px] font-black uppercase text-slate-950 tracking-tight">
                    {fullName || 'YOUR NAME'}
                  </h1>
                  <p className="text-[12.5px] font-bold text-emerald-700 mt-1">&gt; {candidateRole}</p>
                </div>
                <div className="text-[10.5px] text-slate-600 flex flex-col items-end leading-tight">
                  <span>{email}</span>
                  <span>{phone} • {location}</span>
                  {github && <span className="text-emerald-700">{github}</span>}
                </div>
              </div>
            </div>

            {summary && (
              <div className="p-3 bg-slate-100 rounded text-[11px] text-slate-800 border-l-3 border-emerald-600 leading-relaxed font-mono">
                // {summary}
              </div>
            )}

            {expList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-[12.5px] font-black uppercase tracking-wider text-slate-950 border-b-2 border-slate-300 pb-1">
                  $ /usr/bin/experience --verbose
                </h2>
                <div className="flex flex-col gap-3">
                  {expList.map((exp) => (
                    <div key={exp.id} className="flex flex-col gap-0.5 text-[11px]">
                      <div className="flex justify-between font-bold text-slate-950 text-[12px]">
                        <span>&gt; {exp.role} @ {exp.company}</span>
                        <span className="text-slate-500 text-[10px] font-normal">{exp.startDate} .. {exp.endDate}</span>
                      </div>
                      {exp.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-700 flex flex-col gap-1 mt-0.5 font-sans leading-relaxed">
                          {exp.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projList.length > 0 && (
              <div className="flex flex-col gap-2 mt-1">
                <h2 className="text-[12px] font-black uppercase tracking-wider text-slate-950 border-b-2 border-slate-300 pb-1">
                  $ /usr/bin/list-projects --prod
                </h2>
                <div className="flex flex-col gap-2.5">
                  {projList.map((p) => (
                    <div key={p.id} className="flex flex-col gap-0.5 text-[11px]">
                      <div className="flex justify-between items-baseline font-bold text-[11.5px]">
                        <span className="text-slate-950">{p.title}</span>
                        {p.techStack && <span className="text-emerald-700 text-[10px] font-normal">{p.techStack}</span>}
                      </div>
                      {p.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-600 flex flex-col gap-0.5 leading-relaxed font-sans">
                          {p.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-300 mt-2">
            {skillList.length > 0 && (
              <div>
                <h2 className="text-[12px] font-black uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5">
                  $ env | grep SKILLS
                </h2>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {skillList.map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-900 border border-slate-300 rounded text-[10px]">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {eduList.length > 0 && (
              <div>
                <h2 className="text-[12px] font-black uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5">
                  $ ./verify_education.sh
                </h2>
                <div className="flex flex-col gap-2 mt-1.5 text-[11px]">
                  {eduList.map((edu) => (
                    <div key={edu.id}>
                      <span className="font-bold block">{edu.institution}</span>
                      <span className="text-slate-600">{edu.degree}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          7. VP PRODUCT STRATEGY / NORDIC EMERALD
         ========================================================================= */}
      {(templateId === 'vp_product_strategy' || templateId === 'growth_lead') && (
        <div className="min-h-[1055px] flex flex-col justify-between font-sans">
          <div className="flex flex-col gap-3.5">
            <div className="border-b-2 border-emerald-700 pb-2.5 flex justify-between items-start">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  PRODUCT LEADERSHIP & GTM
                </span>
                <h1 className="text-[26px] font-black tracking-tight text-slate-900 mt-1">{fullName || 'YOUR NAME'}</h1>
                <p className="text-[12.5px] font-bold text-emerald-800 mt-0.5">{candidateRole}</p>
              </div>
              <div className="text-[10.5px] text-slate-600 flex flex-col items-end leading-tight">
                <span>{email}</span>
                <span>{phone} • {location}</span>
                {linkedin && <span className="text-emerald-700">{linkedin}</span>}
              </div>
            </div>

            {summary && (
              <div className="bg-emerald-50/60 border-l-3 border-emerald-600 p-3 rounded-r text-[11px] text-slate-800 leading-relaxed">
                {summary}
              </div>
            )}

            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-8 flex flex-col gap-3.5">
                {expList.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <h2 className="text-[12.5px] font-black uppercase tracking-wider text-emerald-900 border-b-2 border-emerald-200 pb-1">
                      Product Impact & Deliverables
                    </h2>
                    <div className="flex flex-col gap-3">
                      {expList.map((exp) => (
                        <div key={exp.id} className="flex flex-col gap-0.5 text-[11px]">
                          <div className="flex justify-between items-baseline font-bold text-[12px] text-slate-900">
                            <span>{exp.role}</span>
                            <span className="text-slate-500 text-[10px] font-normal">{exp.startDate} – {exp.endDate}</span>
                          </div>
                          <span className="font-bold text-emerald-800 text-[11px]">{exp.company}</span>
                          {exp.bullets && (
                            <ul className="list-disc list-outside ml-4 text-slate-700 flex flex-col gap-1 mt-0.5 leading-relaxed">
                              {exp.bullets.map((b, idx) => (
                                <li key={idx}>{b}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {projList.length > 0 && (
                  <div className="flex flex-col gap-2 mt-1">
                    <h2 className="text-[12px] font-black uppercase tracking-wider text-emerald-900 border-b-2 border-emerald-200 pb-1">
                      Strategic Product Initiatives
                    </h2>
                    <div className="flex flex-col gap-2.5">
                      {projList.map((p) => (
                        <div key={p.id} className="flex flex-col gap-0.5 text-[11px]">
                          <div className="flex justify-between items-baseline font-bold text-[11.5px]">
                            <span className="text-slate-900">{p.title}</span>
                            {p.techStack && <span className="text-emerald-700 text-[10px] font-normal">{p.techStack}</span>}
                          </div>
                          {p.bullets?.map((b, idx) => (
                            <p key={idx} className="text-slate-600 leading-relaxed">• {b}</p>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="col-span-4 flex flex-col justify-between gap-3.5">
                {skillList.length > 0 && (
                  <div>
                    <h3 className="text-[11.5px] font-black uppercase tracking-wider text-emerald-900 border-b border-emerald-200 pb-1">
                      Domain Competencies
                    </h3>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {skillList.map((sk, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded text-[10px] font-semibold">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {eduList.length > 0 && (
                  <div>
                    <h3 className="text-[11.5px] font-black uppercase tracking-wider text-emerald-900 border-b border-emerald-200 pb-1">
                      Education
                    </h3>
                    <div className="flex flex-col gap-2 mt-1.5 text-[11px]">
                      {eduList.map((edu) => (
                        <div key={edu.id}>
                          <span className="font-bold block text-slate-900">{edu.institution}</span>
                          <span className="text-slate-600">{edu.degree}</span>
                          <span className="text-[10px] text-slate-500 block">{edu.startDate} – {edu.endDate}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {certList.length > 0 && (
                  <div>
                    <h3 className="text-[11.5px] font-black uppercase tracking-wider text-emerald-900 border-b border-emerald-200 pb-1">
                      Key Honors & Certifications
                    </h3>
                    <div className="flex flex-col gap-1.5 mt-1.5">
                      {certList.slice(0, 4).map((c, idx) => (
                        <div key={idx} className="text-[10.5px] text-slate-700 leading-snug">
                          • {c}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          8. SWISS BAUHAUS GRID (Stark Black & Swiss Red Geometric)
         ========================================================================= */}
      {(templateId === 'swiss_bauhaus_grid' || templateId === 'swiss_grid') && (
        <div className="min-h-[1055px] flex flex-col justify-between font-sans">
          {/* Bauhaus Red Block Header */}
          <div className="flex items-stretch gap-3.5 border-b-4 border-black pb-3.5">
            <div className="w-4 bg-red-600 shrink-0" />
            <div className="flex-1">
              <h1 className="text-[28px] font-black uppercase tracking-tight text-black leading-none">
                {fullName || 'YOUR NAME'}
              </h1>
              <p className="text-[12.5px] font-extrabold uppercase tracking-widest text-red-600 mt-1">
                {candidateRole}
              </p>
              <div className="text-[10.5px] font-bold text-gray-700 flex flex-wrap gap-3 mt-1.5 uppercase">
                {email && <span>{email}</span>}
                {phone && <span>• {phone}</span>}
                {location && <span>• {location}</span>}
                {linkedin && <span>• {linkedin}</span>}
              </div>
            </div>
          </div>

          {/* Grid Body */}
          <div className="grid grid-cols-12 gap-5 mt-2 flex-1">
            <div className="col-span-8 flex flex-col gap-3.5">
              {expList.length > 0 && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 border-b-2 border-black pb-1">
                    <span className="px-1.5 py-0.5 bg-red-600 text-white font-black text-[10px]">01</span>
                    <h2 className="text-[12.5px] font-black uppercase tracking-wider text-black">
                      EXPERIENCE
                    </h2>
                  </div>
                  <div className="flex flex-col gap-3">
                    {expList.map((exp) => (
                      <div key={exp.id} className="flex flex-col gap-1 text-[11px]">
                        <div className="flex justify-between items-baseline font-black text-black text-[12px]">
                          <span>{exp.role}</span>
                          <span className="text-red-600 text-[10px] font-mono">{exp.startDate} / {exp.endDate}</span>
                        </div>
                        <span className="font-bold text-gray-800 uppercase text-[10.5px]">{exp.company}</span>
                        {exp.bullets && (
                          <ul className="list-square list-outside ml-4 text-gray-800 flex flex-col gap-1 mt-0.5 leading-relaxed font-normal">
                            {exp.bullets.map((b, idx) => (
                              <li key={idx}>{b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {projList.length > 0 && (
                <div className="flex flex-col gap-2 mt-1">
                  <div className="flex items-center gap-2 border-b-2 border-black pb-1">
                    <span className="px-1.5 py-0.5 bg-red-600 text-white font-black text-[10px]">02</span>
                    <h2 className="text-[12px] font-black uppercase tracking-wider text-black">
                      FEATURED SYSTEMS & ARCHITECTURE
                    </h2>
                  </div>
                  <div className="flex flex-col gap-2">
                    {projList.map((p) => (
                      <div key={p.id} className="flex flex-col gap-0.5 text-[11px]">
                        <div className="flex justify-between items-baseline font-black text-black text-[11.5px]">
                          <span>{p.title}</span>
                          {p.techStack && <span className="text-red-600 text-[10px] font-mono font-bold">{p.techStack}</span>}
                        </div>
                        {p.bullets && (
                          <ul className="list-square list-outside ml-4 text-gray-800 flex flex-col gap-0.5 leading-relaxed">
                            {p.bullets.map((b, idx) => (
                              <li key={idx}>{b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="col-span-4 flex flex-col justify-between gap-3">
              {summary && (
                <div>
                  <div className="flex items-center gap-1.5 border-b-2 border-black pb-1 mb-1.5">
                    <span className="px-1.5 py-0.5 bg-black text-white font-black text-[10px]">03</span>
                    <h3 className="text-[11px] font-black uppercase tracking-wider">STATEMENT</h3>
                  </div>
                  <p className="text-[11px] text-gray-800 leading-relaxed font-medium">{summary}</p>
                </div>
              )}

              {skillList.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 border-b-2 border-black pb-1 mb-1.5">
                    <span className="px-1.5 py-0.5 bg-black text-white font-black text-[10px]">04</span>
                    <h3 className="text-[11px] font-black uppercase tracking-wider">SKILLS</h3>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {skillList.map((sk, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-gray-100 text-black border border-black text-[9.5px] font-bold uppercase">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {eduList.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 border-b-2 border-black pb-1 mb-1.5">
                    <span className="px-1.5 py-0.5 bg-black text-white font-black text-[10px]">05</span>
                    <h3 className="text-[11px] font-black uppercase tracking-wider">EDUCATION</h3>
                  </div>
                  {eduList.map((edu) => (
                    <div key={edu.id} className="text-[10.5px] mt-1.5 font-bold">
                      <span className="block text-black">{edu.institution}</span>
                      <span className="text-gray-600 font-normal">{edu.degree}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          9. NEO-BRUTALIST TECH (Bold Borders & High-Contrast Yellow Badges)
         ========================================================================= */}
      {(templateId === 'neo_brutalist_tech' || templateId === 'neo_brutalist' || templateId === 'yellow_creative') && (
        <div className="min-h-[1055px] flex flex-col justify-between font-sans">
          <div className="flex flex-col gap-3.5">
            <div className="border-3 border-black bg-yellow-300 p-3.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex justify-between items-center">
              <div>
                <h1 className="text-[26px] font-black uppercase text-black tracking-tight leading-none">
                  {fullName || 'YOUR NAME'}
                </h1>
                <p className="text-[12px] font-black uppercase text-black mt-1 bg-white inline-block px-2 py-0.5 border-2 border-black">
                  {candidateRole}
                </p>
              </div>
              <div className="text-[10.5px] font-bold text-black flex flex-col items-end leading-tight">
                <span>{email}</span>
                <span>{phone} • {location}</span>
                {github && <span className="underline">{github}</span>}
              </div>
            </div>

            {summary && (
              <div className="border-2 border-black p-3 bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-[11px] text-black font-medium leading-relaxed">
                {summary}
              </div>
            )}

            {expList.length > 0 && (
              <div className="flex flex-col gap-2">
                <div className="bg-black text-white px-2.5 py-1 inline-block self-start font-black text-[11.5px] uppercase tracking-wider">
                  // WORK EXPERIENCE
                </div>
                <div className="flex flex-col gap-3">
                  {expList.map((exp) => (
                    <div key={exp.id} className="border-2 border-black p-3 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-0.5 text-[11px]">
                      <div className="flex justify-between items-baseline font-black text-black text-[12px]">
                        <span>{exp.role} @ {exp.company}</span>
                        <span className="text-[10px] bg-yellow-200 px-1.5 py-0.5 border border-black font-bold">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      {exp.bullets && (
                        <ul className="list-disc list-outside ml-4 text-black flex flex-col gap-1 mt-0.5 leading-relaxed">
                          {exp.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projList.length > 0 && (
              <div className="flex flex-col gap-2 mt-1">
                <div className="bg-black text-white px-2.5 py-1 inline-block self-start font-black text-[11.5px] uppercase tracking-wider">
                  // SYSTEMS BUILT & SHIPPED
                </div>
                <div className="flex flex-col gap-2.5">
                  {projList.map((p) => (
                    <div key={p.id} className="border-2 border-black p-2.5 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-0.5 text-[11px]">
                      <div className="flex justify-between items-baseline font-black text-black text-[11.5px]">
                        <span>{p.title}</span>
                        {p.techStack && <span className="text-[10px] bg-yellow-100 px-1 border border-black font-bold">{p.techStack}</span>}
                      </div>
                      {p.bullets && (
                        <ul className="list-disc list-outside ml-4 text-black flex flex-col gap-0.5 leading-relaxed">
                          {p.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t-2 border-black mt-2">
            {skillList.length > 0 && (
              <div className="border-2 border-black p-3 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="font-black text-[11px] uppercase border-b-2 border-black pb-1 mb-1.5">
                  SKILLS & ARSENAL
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skillList.map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-yellow-100 text-black border border-black text-[10px] font-black">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {eduList.length > 0 && (
              <div className="border-2 border-black p-3 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="font-black text-[11px] uppercase border-b-2 border-black pb-1 mb-1.5">
                  EDUCATION
                </div>
                <div className="flex flex-col gap-2">
                  {eduList.map((edu) => (
                    <div key={edu.id} className="text-[11px] font-bold">
                      <span className="block text-black">{edu.institution}</span>
                      <span className="text-gray-700 font-normal">{edu.degree} ({edu.startDate} – {edu.endDate})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          10. STARTUP FOUNDER PITCH (Punchy Orange Accents & Traction Badges)
         ========================================================================= */}
      {(templateId === 'startup_founder_pitch' || templateId === 'yc_founder_pitch' || templateId === 'stealth_scale' || templateId === 'crypto_web3') && (
        <div className="min-h-[1055px] flex flex-col justify-between font-sans">
          <div className="flex flex-col gap-3.5">
            <div className="border-b-2 border-orange-500 pb-2.5 flex justify-between items-start">
              <div>
                <span className="inline-block px-2.5 py-0.5 bg-orange-100 text-orange-800 text-[10px] font-black rounded-full mb-1 border border-orange-300">
                  ⚡ VENTURE-BACKED FOUNDER // YC ALUM
                </span>
                <h1 className="text-[26px] font-black tracking-tight text-slate-950 leading-none">
                  {fullName || 'YOUR NAME'}
                </h1>
                <p className="text-[12.5px] font-bold text-orange-600 mt-1">{candidateRole}</p>
              </div>
              <div className="text-[10.5px] text-slate-600 flex flex-col items-end leading-tight">
                <span>{email}</span>
                <span>{phone} • {location}</span>
                {linkedin && <span className="text-orange-600">{linkedin}</span>}
              </div>
            </div>

            <div className="bg-orange-50/70 border border-orange-200 p-2.5 rounded-lg flex justify-between items-center text-[10px]">
              <div><span className="font-black text-orange-900">MILESTONES:</span> <span className="text-slate-700">$3.2M Seed Raised • $1.8M ARR Scaled • Product Hunt #1 of Day</span></div>
            </div>

            {summary && (
              <p className="text-[11px] text-slate-800 leading-relaxed border-l-3 border-orange-500 pl-3">
                {summary}
              </p>
            )}

            {expList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-[12.5px] font-black uppercase tracking-wider text-orange-800 border-b-2 border-orange-200 pb-1">
                  EXECUTION & VENTURE TRAJECTORY
                </h2>
                <div className="flex flex-col gap-3">
                  {expList.map((exp) => (
                    <div key={exp.id} className="flex flex-col gap-1 text-[11px]">
                      <div className="flex justify-between items-baseline font-bold text-[12px] text-slate-900">
                        <span>{exp.role}</span>
                        <span className="text-[10px] text-slate-500 font-normal">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      <span className="font-bold text-orange-600 text-[10.5px]">{exp.company}</span>
                      {exp.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-700 flex flex-col gap-1 mt-0.5 leading-relaxed">
                          {exp.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-[12px] font-black uppercase tracking-wider text-orange-800 border-b-2 border-orange-200 pb-1">
                  PRODUCTS BUILT & SCALED
                </h2>
                <div className="flex flex-col gap-2.5">
                  {projList.map((p) => (
                    <div key={p.id} className="flex flex-col gap-0.5 text-[11px]">
                      <div className="flex justify-between items-baseline font-bold text-[11.5px]">
                        <span className="text-slate-950">{p.title}</span>
                        {p.techStack && <span className="text-orange-600 text-[10px] font-normal">{p.techStack}</span>}
                      </div>
                      {p.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-600 flex flex-col gap-0.5 leading-relaxed">
                          {p.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-orange-100 mt-2">
            {skillList.length > 0 && (
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-wider text-orange-800 border-b border-orange-200 pb-0.5">
                  CORE ARSENAL
                </h3>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {skillList.map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-orange-50 text-orange-950 border border-orange-200 rounded text-[9.5px] font-bold">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {eduList.length > 0 && (
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-wider text-orange-800 border-b border-orange-200 pb-0.5">
                  EDUCATION & VENTURE CREDENTIALS
                </h3>
                {eduList.map((edu) => (
                  <div key={edu.id} className="text-[10.5px] mt-1.5">
                    <span className="font-bold text-slate-900 block">{edu.institution}</span>
                    <span className="text-slate-600">{edu.degree}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          11. CLOUD INFRA & SRE (AWS / GCP Cyan Blueprint)
         ========================================================================= */}
      {(templateId === 'cloud_infra_sre' || templateId === 'cloud_architect') && (
        <div className="min-h-[1055px] flex flex-col justify-between font-sans text-slate-900">
          <div className="flex flex-col gap-3.5">
            <div className="border-b-2 border-sky-600 pb-2.5 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-[26px] font-black tracking-tight">{fullName || 'YOUR NAME'}</h1>
                  <span className="px-2 py-0.5 bg-sky-100 text-sky-800 text-[9.5px] font-mono font-bold rounded">
                    [ 99.999% SLA ]
                  </span>
                </div>
                <p className="text-[12.5px] font-bold text-sky-700 mt-0.5">{candidateRole}</p>
              </div>
              <div className="text-[10.5px] text-slate-600 flex flex-col items-end leading-tight">
                <span>{email}</span>
                <span>{phone} • {location}</span>
                {linkedin && <span className="text-sky-700">{linkedin}</span>}
              </div>
            </div>

            {summary && (
              <div className="bg-sky-50/70 border-l-3 border-sky-600 p-3 rounded-r text-[11px] text-slate-800 leading-relaxed">
                {summary}
              </div>
            )}

            {expList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-[12.5px] font-black uppercase tracking-wider text-sky-900 border-b-2 border-sky-200 pb-1">
                  CLOUD ARCHITECTURE & SRE RELIABILITY
                </h2>
                <div className="flex flex-col gap-3">
                  {expList.map((exp) => (
                    <div key={exp.id} className="flex flex-col gap-1 text-[11px]">
                      <div className="flex justify-between items-baseline font-bold text-[12px]">
                        <span>{exp.role}</span>
                        <span className="text-slate-500 text-[10px] font-normal">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      <span className="font-bold text-sky-700 text-[10.5px]">{exp.company}</span>
                      {exp.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-700 flex flex-col gap-1 mt-0.5 leading-relaxed">
                          {exp.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-[12px] font-black uppercase tracking-wider text-sky-900 border-b-2 border-sky-200 pb-1">
                  DISTRIBUTED SYSTEMS & INFRASTRUCTURE AUTOMATION
                </h2>
                <div className="flex flex-col gap-2.5">
                  {projList.map((p) => (
                    <div key={p.id} className="flex flex-col gap-0.5 text-[11px]">
                      <div className="flex justify-between items-baseline font-bold text-[11.5px]">
                        <span className="text-slate-950">{p.title}</span>
                        {p.techStack && <span className="text-sky-700 font-mono text-[10px] font-normal">{p.techStack}</span>}
                      </div>
                      {p.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-600 flex flex-col gap-0.5 leading-relaxed">
                          {p.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-sky-100 mt-2">
            {skillList.length > 0 && (
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-wider text-sky-900 border-b border-sky-200 pb-0.5">
                  INFRASTRUCTURE & DEVOPS
                </h3>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {skillList.map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-sky-50 text-sky-900 border border-sky-200 rounded text-[9.5px] font-semibold">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {eduList.length > 0 && (
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-wider text-sky-900 border-b border-sky-200 pb-0.5">
                  EDUCATION & CLOUD CERTIFICATIONS
                </h3>
                {eduList.map((edu) => (
                  <div key={edu.id} className="text-[10.5px] mt-1.5">
                    <span className="font-bold block text-slate-900">{edu.institution}</span>
                    <span className="text-slate-600">{edu.degree}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          12. CORAL SUNSET PRODUCT DESIGNER (Warm Rose Coral Aesthetics)
         ========================================================================= */}
      {(templateId === 'coral_sunset_product' || templateId === 'coral_modern' || templateId === 'head_of_ux_design' || templateId === 'design_portfolio') && (
        <div className="min-h-[1055px] flex flex-col justify-between font-sans">
          <div className="flex flex-col gap-3.5">
            <div className="border-b-2 border-rose-500 pb-2.5 flex justify-between items-start">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                  EXPERIENCE ARCHITECT
                </span>
                <h1 className="text-[26px] font-black tracking-tight text-slate-900 mt-1">{fullName || 'YOUR NAME'}</h1>
                <p className="text-[12.5px] font-bold text-rose-600 mt-0.5">{candidateRole}</p>
              </div>
              <div className="text-[10.5px] text-slate-600 flex flex-col items-end leading-tight">
                <span>{email}</span>
                <span>{phone} • {location}</span>
                {linkedin && <span className="text-rose-600">{linkedin}</span>}
              </div>
            </div>

            {summary && (
              <div className="bg-rose-50/50 border-l-3 border-rose-500 p-3 rounded-r text-[11px] text-slate-800 leading-relaxed">
                {summary}
              </div>
            )}

            {expList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-[12.5px] font-black uppercase tracking-wider text-rose-900 border-b-2 border-rose-200 pb-1">
                  DESIGN SYSTEMS & PRODUCT CRAFT
                </h2>
                <div className="flex flex-col gap-3">
                  {expList.map((exp) => (
                    <div key={exp.id} className="flex flex-col gap-1 text-[11px]">
                      <div className="flex justify-between items-baseline font-bold text-[12px] text-slate-900">
                        <span>{exp.role}</span>
                        <span className="text-slate-500 text-[10px] font-normal">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      <span className="font-bold text-rose-600 text-[10.5px]">{exp.company}</span>
                      {exp.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-700 flex flex-col gap-1 mt-0.5 leading-relaxed">
                          {exp.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-[12px] font-black uppercase tracking-wider text-rose-900 border-b-2 border-rose-200 pb-1">
                  SELECTED CASE STUDIES & DESIGN SYSTEMS
                </h2>
                <div className="flex flex-col gap-2.5">
                  {projList.map((p) => (
                    <div key={p.id} className="flex flex-col gap-0.5 text-[11px]">
                      <div className="flex justify-between items-baseline font-bold text-[11.5px]">
                        <span className="text-slate-900">{p.title}</span>
                        {p.techStack && <span className="text-rose-600 text-[10px] font-normal">{p.techStack}</span>}
                      </div>
                      {p.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-600 flex flex-col gap-0.5 leading-relaxed">
                          {p.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-rose-100 mt-2">
            {skillList.length > 0 && (
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-wider text-rose-900 border-b border-rose-200 pb-0.5">
                  DESIGN & UX ARSENAL
                </h3>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {skillList.map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-rose-50 text-rose-950 border border-rose-200 rounded-full text-[9.5px] font-semibold">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {eduList.length > 0 && (
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-wider text-rose-900 border-b border-rose-200 pb-0.5">
                  EDUCATION
                </h3>
                {eduList.map((edu) => (
                  <div key={edu.id} className="text-[10.5px] mt-1.5">
                    <span className="font-bold text-slate-900 block">{edu.institution}</span>
                    <span className="text-slate-600">{edu.degree}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          13. QUANT RESEARCH / BURGUNDY HEDGE FUND
         ========================================================================= */}
      {(templateId === 'quant_research_fund' || templateId === 'fintech_lead') && (
        <div className="min-h-[1055px] flex flex-col justify-between font-serif text-slate-900">
          <div className="flex flex-col gap-3.5">
            <div className="border-b-2 border-rose-950 pb-2.5 flex justify-between items-start">
              <div>
                <span className="text-[10px] font-sans font-black uppercase tracking-wider text-rose-900 bg-rose-100/60 px-2.5 py-0.5 rounded border border-rose-300">
                  QUANTITATIVE STRATEGY & ALPHA GENERATION
                </span>
                <h1 className="text-[26px] font-black tracking-tight text-slate-950 mt-1">{fullName || 'YOUR NAME'}</h1>
                <p className="text-[12.5px] font-bold text-rose-900 mt-0.5 font-sans">{candidateRole}</p>
              </div>
              <div className="text-[10.5px] text-slate-600 font-sans flex flex-col items-end leading-tight">
                <span>{email}</span>
                <span>{phone} • {location}</span>
                {linkedin && <span className="text-rose-900">{linkedin}</span>}
              </div>
            </div>

            <div className="bg-rose-50/60 border border-rose-200 p-2.5 rounded text-[10px] font-sans flex justify-between">
              <span><strong className="text-rose-950 font-bold">Sharpe Ratio:</strong> 2.85</span>
              <span><strong className="text-rose-950 font-bold">Latency:</strong> &lt;2μs C++</span>
              <span><strong className="text-rose-950 font-bold">Pedigree:</strong> Stanford & Berkeley</span>
            </div>

            {summary && (
              <p className="text-[11px] text-slate-800 leading-relaxed italic border-l-2 border-rose-900 pl-3">
                {summary}
              </p>
            )}

            {expList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-[12.5px] font-black uppercase tracking-wider text-rose-950 border-b-2 border-rose-300 pb-1 font-sans">
                  QUANTITATIVE RESEARCH & TRADING SYSTEMS
                </h2>
                <div className="flex flex-col gap-3">
                  {expList.map((exp) => (
                    <div key={exp.id} className="flex flex-col gap-1 text-[11px]">
                      <div className="flex justify-between items-baseline font-bold text-[12px] text-slate-950 font-sans">
                        <span>{exp.role}</span>
                        <span className="text-slate-500 text-[10px] font-normal">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      <span className="font-bold text-rose-900 text-[10.5px] font-sans">{exp.company}</span>
                      {exp.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-800 flex flex-col gap-1 mt-0.5 font-sans leading-relaxed">
                          {exp.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-[12px] font-black uppercase tracking-wider text-rose-950 border-b-2 border-rose-300 pb-1 font-sans">
                  ALGORITHMIC PLATFORMS & SYSTEM DEPLOYMENTS
                </h2>
                <div className="flex flex-col gap-2.5">
                  {projList.map((p) => (
                    <div key={p.id} className="flex flex-col gap-0.5 text-[11px]">
                      <div className="flex justify-between items-baseline font-bold text-[11.5px] font-sans">
                        <span className="text-slate-950">{p.title}</span>
                        {p.techStack && <span className="text-rose-900 text-[10px] font-normal">{p.techStack}</span>}
                      </div>
                      {p.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-700 flex flex-col gap-0.5 font-sans leading-relaxed">
                          {p.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 font-sans border-t border-rose-100 mt-2">
            {skillList.length > 0 && (
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-wider text-rose-950 border-b border-rose-300 pb-0.5">
                  MATHEMATICAL & DEV TOOLKIT
                </h3>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {skillList.map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-rose-50 text-rose-950 border border-rose-200 rounded text-[9.5px] font-bold">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {eduList.length > 0 && (
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-wider text-rose-950 border-b border-rose-300 pb-0.5">
                  EDUCATION & CREDENTIALS
                </h3>
                {eduList.map((edu) => (
                  <div key={edu.id} className="text-[10.5px] mt-1.5 font-serif">
                    <span className="font-bold text-slate-900 block">{edu.institution}</span>
                    <span className="text-slate-600">{edu.degree}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          14. TOKYO ZEN MINIMAL (Whisper-Thin Dividers & Generous Whitespace)
         ========================================================================= */}
      {(templateId === 'tokyo_zen_minimal' || templateId === 'tokyo_minimal') && (
        <div className="min-h-[1055px] flex flex-col justify-between font-sans text-slate-800">
          <div className="flex flex-col gap-3.5">
            <div className="border-b border-slate-200 pb-2.5 flex justify-between items-end">
              <div>
                <h1 className="text-[26px] font-light tracking-wide text-slate-900">{fullName || 'YOUR NAME'}</h1>
                <p className="text-[12px] text-slate-500 tracking-wider uppercase mt-1">{candidateRole}</p>
              </div>
              <div className="text-[10.5px] text-slate-400 flex flex-col items-end leading-tight">
                <span>{email}</span>
                <span>{phone} • {location}</span>
                {linkedin && <span className="text-slate-600">{linkedin}</span>}
              </div>
            </div>

            {summary && (
              <p className="text-[11px] text-slate-600 leading-relaxed font-light py-1 border-l-2 border-slate-300 pl-3.5">
                {summary}
              </p>
            )}

            {expList.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-[11.5px] font-medium tracking-widest text-slate-400 uppercase border-b border-slate-200 pb-0.5">
                  EXPERIENCE
                </span>
                <div className="flex flex-col gap-3">
                  {expList.map((exp) => (
                    <div key={exp.id} className="flex flex-col gap-0.5 text-[11px]">
                      <div className="flex justify-between text-slate-900">
                        <span className="font-medium text-[12px]">{exp.role} — <span className="text-slate-600 font-normal">{exp.company}</span></span>
                        <span className="text-slate-400 text-[10px]">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      {exp.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-600 flex flex-col gap-1 mt-0.5 leading-relaxed font-light">
                          {exp.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projList.length > 0 && (
              <div className="flex flex-col gap-2 mt-1">
                <span className="text-[11.5px] font-medium tracking-widest text-slate-400 uppercase border-b border-slate-200 pb-0.5">
                  SELECTED INITIATIVES
                </span>
                <div className="flex flex-col gap-2.5">
                  {projList.map((p) => (
                    <div key={p.id} className="flex flex-col gap-0.5 text-[11px]">
                      <div className="flex justify-between items-baseline">
                        <span className="font-medium text-slate-900 text-[11.5px]">{p.title}</span>
                        {p.techStack && <span className="text-slate-500 text-[10px] font-light">{p.techStack}</span>}
                      </div>
                      {p.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-600 flex flex-col gap-0.5 leading-relaxed font-light">
                          {p.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-200 mt-2">
            {skillList.length > 0 && (
              <div>
                <span className="text-[11.5px] font-medium tracking-widest text-slate-400 uppercase block mb-1.5">
                  DISCIPLINES & TOOLING
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {skillList.map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-slate-50 text-slate-700 text-[10px] rounded border border-slate-200">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {eduList.length > 0 && (
              <div>
                <span className="text-[11.5px] font-medium tracking-widest text-slate-400 uppercase block mb-1.5">
                  EDUCATION & CREDENTIALS
                </span>
                <div className="flex flex-col gap-2 text-[11px]">
                  {eduList.map((edu) => (
                    <div key={edu.id}>
                      <span className="text-slate-800 block font-medium">{edu.institution}</span>
                      <span className="text-slate-500">{edu.degree} ({edu.startDate} – {edu.endDate})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          15. SCANDINAVIAN FROST CLEAN (Frost Blue Rounded Cards)
         ========================================================================= */}
      {(templateId === 'scandinavian_frost' || templateId === 'nordic_clean') && (
        <div className="min-h-[1055px] flex flex-col justify-between font-sans">
          <div className="flex flex-col gap-3.5">
            <div className="bg-sky-50/80 border border-sky-200/80 p-3.5 rounded-xl flex justify-between items-center">
              <div>
                <h1 className="text-[26px] font-black tracking-tight text-slate-900">{fullName || 'YOUR NAME'}</h1>
                <p className="text-[12.5px] font-bold text-sky-700 mt-0.5">{candidateRole}</p>
              </div>
              <div className="text-[10.5px] text-slate-600 flex flex-col items-end leading-tight">
                <span>{email}</span>
                <span>{phone} • {location}</span>
                {linkedin && <span className="text-sky-700">{linkedin}</span>}
              </div>
            </div>

            {summary && (
              <p className="text-[11px] text-slate-700 leading-relaxed px-1">
                {summary}
              </p>
            )}

            {expList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-[12.5px] font-black uppercase tracking-wider text-sky-900 border-b border-sky-100 pb-1">
                  PROFESSIONAL EXPERIENCE
                </h2>
                <div className="flex flex-col gap-2.5">
                  {expList.map((exp) => (
                    <div key={exp.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 flex flex-col gap-1 text-[11px]">
                      <div className="flex justify-between items-baseline font-bold text-[12px] text-slate-900">
                        <span>{exp.role} • <span className="text-sky-700">{exp.company}</span></span>
                        <span className="text-slate-500 text-[10px] font-normal">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      {exp.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-600 flex flex-col gap-1 mt-0.5 leading-relaxed">
                          {exp.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-[12px] font-black uppercase tracking-wider text-sky-900 border-b border-sky-100 pb-1">
                  FEATURED INITIATIVES & ARCHITECTURE
                </h2>
                <div className="flex flex-col gap-2">
                  {projList.map((p) => (
                    <div key={p.id} className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/30 flex flex-col gap-0.5 text-[11px]">
                      <div className="flex justify-between items-baseline font-bold text-[11.5px] text-slate-900">
                        <span>{p.title}</span>
                        {p.techStack && <span className="text-sky-700 text-[10px] font-normal">{p.techStack}</span>}
                      </div>
                      {p.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-600 flex flex-col gap-0.5 leading-relaxed">
                          {p.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-sky-100 mt-2">
            {skillList.length > 0 && (
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-wider text-sky-900 border-b border-sky-100 pb-0.5">
                  CORE SKILLS
                </h3>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {skillList.map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-sky-50 text-sky-900 border border-sky-200 rounded-full text-[9.5px] font-semibold">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {eduList.length > 0 && (
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-wider text-sky-900 border-b border-sky-100 pb-0.5">
                  EDUCATION
                </h3>
                {eduList.map((edu) => (
                  <div key={edu.id} className="text-[10.5px] mt-1.5">
                    <span className="font-bold text-slate-900 block">{edu.institution}</span>
                    <span className="text-slate-600">{edu.degree}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          16. DEEP TEAL BIOTECH & HARDWARE
         ========================================================================= */}
      {(templateId === 'deep_teal_biotech' || templateId === 'teal_innovator' || templateId === 'soft_green_pill' || templateId === 'biotech_pharma_lead') && (
        <div className="min-h-[1055px] flex flex-col justify-between font-sans">
          <div className="flex flex-col gap-3.5">
            <div className="border-b-2 border-teal-700 pb-2.5 flex justify-between items-start">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                  BIO-ENGINEERING & HARDWARE
                </span>
                <h1 className="text-[26px] font-black tracking-tight text-slate-950 mt-1">{fullName || 'YOUR NAME'}</h1>
                <p className="text-[12.5px] font-bold text-teal-800 mt-0.5">{candidateRole}</p>
              </div>
              <div className="text-[10.5px] text-slate-600 flex flex-col items-end leading-tight">
                <span>{email}</span>
                <span>{phone} • {location}</span>
                {linkedin && <span className="text-teal-800">{linkedin}</span>}
              </div>
            </div>

            {summary && (
              <div className="bg-teal-50/60 border-l-3 border-teal-700 p-3 rounded-r text-[11px] text-slate-800 leading-relaxed">
                {summary}
              </div>
            )}

            {expList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-[12.5px] font-black uppercase tracking-wider text-teal-950 border-b-2 border-teal-200 pb-1">
                  RESEARCH & SYSTEMS ENGINEERING
                </h2>
                <div className="flex flex-col gap-3">
                  {expList.map((exp) => (
                    <div key={exp.id} className="flex flex-col gap-1 text-[11px]">
                      <div className="flex justify-between items-baseline font-bold text-[12px] text-slate-900">
                        <span>{exp.role}</span>
                        <span className="text-slate-500 text-[10px] font-normal">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      <span className="font-bold text-teal-800 text-[10.5px]">{exp.company}</span>
                      {exp.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-700 flex flex-col gap-1 mt-0.5 leading-relaxed">
                          {exp.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-[12px] font-black uppercase tracking-wider text-teal-950 border-b-2 border-teal-200 pb-1">
                  TRANSLATIONAL PLATFORMS & PATENTED INITIATIVES
                </h2>
                <div className="flex flex-col gap-2.5">
                  {projList.map((p) => (
                    <div key={p.id} className="flex flex-col gap-0.5 text-[11px]">
                      <div className="flex justify-between items-baseline font-bold text-[11.5px]">
                        <span className="text-slate-900">{p.title}</span>
                        {p.techStack && <span className="text-teal-800 text-[10px] font-normal">{p.techStack}</span>}
                      </div>
                      {p.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-600 flex flex-col gap-0.5 leading-relaxed">
                          {p.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-teal-100 mt-2">
            {skillList.length > 0 && (
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-wider text-teal-950 border-b border-teal-200 pb-0.5">
                  CORE TECHNICAL EXPERTISE
                </h3>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {skillList.map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-teal-50 text-teal-900 border border-teal-200 rounded text-[9.5px] font-bold">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {eduList.length > 0 && (
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-wider text-teal-950 border-b border-teal-200 pb-0.5">
                  EDUCATION & CREDENTIALS
                </h3>
                {eduList.map((edu) => (
                  <div key={edu.id} className="text-[10.5px] mt-1.5">
                    <span className="font-bold text-slate-900 block">{edu.institution}</span>
                    <span className="text-slate-600">{edu.degree}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          17. CYBERSECURITY & SOC-2 AUDIT (Electric Indigo Security Borders)
         ========================================================================= */}
      {templateId === 'cybersecurity_soc2' && (
        <div className="min-h-[1055px] flex flex-col justify-between font-sans text-slate-900">
          <div className="flex flex-col gap-3.5">
            <div className="border-b-2 border-indigo-700 pb-2.5 flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-800 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
                  🔒 ZERO-TRUST ARCHITECTURE // SOC-2 COMPLIANCE
                </span>
                <h1 className="text-[26px] font-black tracking-tight text-slate-950 mt-1">{fullName || 'YOUR NAME'}</h1>
                <p className="text-[12.5px] font-bold text-indigo-700 mt-0.5">{candidateRole}</p>
              </div>
              <div className="text-[10.5px] text-slate-600 font-mono flex flex-col items-end leading-tight">
                <span>{email}</span>
                <span>{phone} • {location}</span>
                {linkedin && <span className="text-indigo-600">{linkedin}</span>}
              </div>
            </div>

            {summary && (
              <div className="bg-slate-50 border-l-3 border-indigo-700 p-3 rounded-r text-[11px] text-slate-800 leading-relaxed font-mono">
                [SECURITY_PROFILE] {summary}
              </div>
            )}

            {expList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-[12.5px] font-mono font-black uppercase tracking-wider text-indigo-950 border-b-2 border-indigo-200 pb-1">
                  SECURITY INFRASTRUCTURE & THREAT HUNTING
                </h2>
                <div className="flex flex-col gap-3">
                  {expList.map((exp) => (
                    <div key={exp.id} className="flex flex-col gap-1 text-[11px]">
                      <div className="flex justify-between items-baseline font-bold text-[12px]">
                        <span className="text-slate-950">{exp.role}</span>
                        <span className="text-slate-500 font-mono text-[10px] font-normal">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      <span className="font-bold text-indigo-700 font-mono text-[10.5px]">{exp.company}</span>
                      {exp.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-800 flex flex-col gap-1 mt-0.5 leading-relaxed">
                          {exp.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-[12px] font-mono font-black uppercase tracking-wider text-indigo-950 border-b-2 border-indigo-200 pb-1">
                  SECURITY DEPLOYMENTS & DISTRIBUTED SYSTEMS
                </h2>
                <div className="flex flex-col gap-2.5">
                  {projList.map((p) => (
                    <div key={p.id} className="flex flex-col gap-0.5 text-[11px]">
                      <div className="flex justify-between items-baseline font-bold text-[11.5px]">
                        <span className="text-slate-950">{p.title}</span>
                        {p.techStack && <span className="text-indigo-600 font-mono text-[10px] font-normal">{p.techStack}</span>}
                      </div>
                      {p.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-700 flex flex-col gap-0.5 leading-relaxed">
                          {p.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 font-mono border-t border-indigo-100 mt-2">
            {skillList.length > 0 && (
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-wider text-indigo-950 border-b border-indigo-200 pb-0.5">
                  SECURITY PROTOCOLS & TOOLING
                </h3>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {skillList.map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded text-[9.5px] font-bold">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {eduList.length > 0 && (
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-wider text-indigo-950 border-b border-indigo-200 pb-0.5">
                  EDUCATION & CERTIFICATIONS
                </h3>
                {eduList.map((edu) => (
                  <div key={edu.id} className="text-[10.5px] mt-1.5">
                    <span className="font-bold text-slate-900 block">{edu.institution}</span>
                    <span className="text-slate-600">{edu.degree}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          18. OXFORD ACADEMIC FELLOW (Timeless Scholarly CV Typography)
         ========================================================================= */}
      {(templateId === 'oxford_academic_fellow' || templateId === 'oxford_academic') && (
        <div className="min-h-[1055px] flex flex-col justify-between font-serif text-slate-950">
          <div className="flex flex-col gap-3.5">
            <div className="text-center border-b-2 border-blue-900 pb-2.5">
              <h1 className="text-[26px] font-normal tracking-wide text-blue-950 uppercase">{fullName || 'YOUR NAME'}</h1>
              <p className="text-[12.5px] italic text-slate-700 mt-0.5">{candidateRole}</p>
              <div className="text-[10.5px] font-sans text-slate-600 flex justify-center flex-wrap gap-3 mt-1.5">
                <span>{email}</span>
                <span>• {phone}</span>
                <span>• {location}</span>
                {linkedin && <span>• {linkedin}</span>}
              </div>
            </div>

            {summary && (
              <p className="text-[11px] text-slate-800 leading-relaxed text-justify px-3 italic border-y border-slate-200 py-1.5">
                {summary}
              </p>
            )}

            {expList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-[12.5px] font-bold uppercase tracking-widest text-blue-950 border-b-2 border-blue-200 pb-1">
                  ACADEMIC & RESEARCH APPOINTMENTS
                </h2>
                <div className="flex flex-col gap-3">
                  {expList.map((exp) => (
                    <div key={exp.id} className="flex flex-col gap-1 text-[11px]">
                      <div className="flex justify-between items-baseline font-bold text-blue-950 text-[12px]">
                        <span>{exp.role}</span>
                        <span className="text-slate-500 italic text-[10px] font-normal">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      <span className="text-slate-800 italic text-[10.5px]">{exp.company}</span>
                      {exp.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-800 flex flex-col gap-1 mt-0.5 leading-relaxed font-sans">
                          {exp.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-[12px] font-bold uppercase tracking-widest text-blue-950 border-b-2 border-blue-200 pb-1">
                  RESEARCH INITIATIVES & SELECT PUBLICATIONS
                </h2>
                <div className="flex flex-col gap-2.5">
                  {projList.map((p) => (
                    <div key={p.id} className="flex flex-col gap-0.5 text-[11px]">
                      <div className="flex justify-between items-baseline font-bold text-[11.5px] text-blue-950">
                        <span>{p.title}</span>
                        {p.techStack && <span className="text-slate-600 font-sans text-[10px] font-normal">{p.techStack}</span>}
                      </div>
                      {p.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-700 flex flex-col gap-0.5 leading-relaxed font-sans">
                          {p.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-blue-100 mt-2">
            {eduList.length > 0 && (
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-blue-950 border-b border-blue-200 pb-0.5">
                  DEGREES & FELLOWSHIPS
                </h3>
                {eduList.map((edu) => (
                  <div key={edu.id} className="text-[10.5px] mt-1.5">
                    <span className="font-bold text-blue-950 block">{edu.institution}</span>
                    <span className="text-slate-700">{edu.degree}</span>
                  </div>
                ))}
              </div>
            )}

            {skillList.length > 0 && (
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-blue-950 border-b border-blue-200 pb-0.5">
                  AREAS OF SPECIALIZATION
                </h3>
                <div className="flex flex-wrap gap-1 mt-1.5 font-sans">
                  {skillList.map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-950 border border-blue-200 rounded text-[9.5px]">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          19. GROWTH MARKETING / GTM DIRECT (Sky Blue Geometry)
         ========================================================================= */}
      {templateId === 'growth_marketing_dir' && (
        <div className="min-h-[1055px] flex flex-col justify-between font-sans">
          <div className="flex flex-col gap-3.5">
            <div className="border-b-2 border-sky-600 pb-2.5 flex justify-between items-start">
              <div>
                <span className="text-[10px] font-black uppercase text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                  GTM & GROWTH ARCHITECT
                </span>
                <h1 className="text-[26px] font-black tracking-tight text-slate-900 mt-1">{fullName || 'YOUR NAME'}</h1>
                <p className="text-[12.5px] font-bold text-sky-700 mt-0.5">{candidateRole}</p>
              </div>
              <div className="text-[10.5px] text-slate-600 flex flex-col items-end leading-tight">
                <span>{email}</span>
                <span>{phone} • {location}</span>
                {linkedin && <span className="text-sky-700">{linkedin}</span>}
              </div>
            </div>

            {summary && (
              <div className="bg-sky-50/70 border-l-3 border-sky-600 p-3 rounded-r text-[11px] text-slate-800 leading-relaxed">
                {summary}
              </div>
            )}

            {expList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-[12.5px] font-black uppercase tracking-wider text-sky-900 border-b-2 border-sky-200 pb-1">
                  REVENUE & USER ACQUISITION IMPACT
                </h2>
                <div className="flex flex-col gap-3">
                  {expList.map((exp) => (
                    <div key={exp.id} className="flex flex-col gap-1 text-[11px]">
                      <div className="flex justify-between items-baseline font-bold text-[12px] text-slate-900">
                        <span>{exp.role}</span>
                        <span className="text-slate-500 text-[10px] font-normal">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      <span className="font-bold text-sky-700 text-[10.5px]">{exp.company}</span>
                      {exp.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-700 flex flex-col gap-1 mt-0.5 leading-relaxed">
                          {exp.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-[12px] font-black uppercase tracking-wider text-sky-900 border-b-2 border-sky-200 pb-1">
                  GROWTH INITIATIVES & EXPERIMENTATION
                </h2>
                <div className="flex flex-col gap-2.5">
                  {projList.map((p) => (
                    <div key={p.id} className="flex flex-col gap-0.5 text-[11px]">
                      <div className="flex justify-between items-baseline font-bold text-[11.5px]">
                        <span className="text-slate-900">{p.title}</span>
                        {p.techStack && <span className="text-sky-700 text-[10px] font-normal">{p.techStack}</span>}
                      </div>
                      {p.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-600 flex flex-col gap-0.5 leading-relaxed">
                          {p.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-sky-100 mt-2">
            {skillList.length > 0 && (
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-wider text-sky-900 border-b border-sky-200 pb-0.5">
                  GROWTH & ANALYTICS TOOLING
                </h3>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {skillList.map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-sky-50 text-sky-900 border border-sky-200 rounded text-[9.5px] font-semibold">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {eduList.length > 0 && (
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-wider text-sky-900 border-b border-sky-200 pb-0.5">
                  EDUCATION
                </h3>
                {eduList.map((edu) => (
                  <div key={edu.id} className="text-[10.5px] mt-1.5">
                    <span className="font-bold text-slate-900 block">{edu.institution}</span>
                    <span className="text-slate-600">{edu.degree}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}



      {/* =========================================================================
          20. DATA SCIENCE & ML LEAD (Copper Amber Borders)
         ========================================================================= */}
      {templateId === 'data_science_ml_lead' && (
        <div className="min-h-[1055px] flex flex-col justify-between font-sans text-slate-900">
          <div className="flex flex-col gap-3.5">
            <div className="border-b-2 border-orange-700 pb-2.5 flex justify-between items-start">
              <div>
                <span className="text-[10px] font-black uppercase text-orange-900 bg-orange-100 px-2.5 py-0.5 rounded border border-orange-300">
                  STATISTICAL INFERENCE & PREDICTIVE MODELING
                </span>
                <h1 className="text-[26px] font-black tracking-tight text-slate-950 mt-1">{fullName || 'YOUR NAME'}</h1>
                <p className="text-[12.5px] font-bold text-orange-700 mt-0.5">{candidateRole}</p>
              </div>
              <div className="text-[10.5px] text-slate-600 flex flex-col items-end leading-tight">
                <span>{email}</span>
                <span>{phone} • {location}</span>
                {linkedin && <span className="text-orange-700">{linkedin}</span>}
              </div>
            </div>

            {summary && (
              <div className="bg-orange-50/70 border-l-3 border-orange-700 p-3 rounded-r text-[11px] text-slate-800 leading-relaxed">
                {summary}
              </div>
            )}

            {expList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-[12.5px] font-black uppercase tracking-wider text-orange-950 border-b-2 border-orange-300 pb-1">
                  MODEL DEPLOYMENT & ALGORITHMIC RESEARCH
                </h2>
                <div className="flex flex-col gap-3">
                  {expList.map((exp) => (
                    <div key={exp.id} className="flex flex-col gap-1 text-[11px]">
                      <div className="flex justify-between items-baseline font-bold text-[12px] text-slate-900">
                        <span>{exp.role}</span>
                        <span className="text-slate-500 text-[10px] font-normal">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      <span className="font-bold text-orange-800 text-[10.5px]">{exp.company}</span>
                      {exp.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-700 flex flex-col gap-1 mt-0.5 leading-relaxed">
                          {exp.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-[12px] font-black uppercase tracking-wider text-orange-950 border-b-2 border-orange-300 pb-1">
                  RESEARCH INITIATIVES & DATA PLATFORMS
                </h2>
                <div className="flex flex-col gap-2.5">
                  {projList.map((p) => (
                    <div key={p.id} className="flex flex-col gap-0.5 text-[11px]">
                      <div className="flex justify-between items-baseline font-bold text-[11.5px]">
                        <span className="text-slate-900">{p.title}</span>
                        {p.techStack && <span className="text-orange-700 text-[10px] font-normal">{p.techStack}</span>}
                      </div>
                      {p.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-700 flex flex-col gap-0.5 leading-relaxed">
                          {p.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-orange-100 mt-2">
            {skillList.length > 0 && (
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-wider text-orange-950 border-b border-orange-300 pb-0.5">
                  DATA SCIENCE TOOLKIT
                </h3>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {skillList.map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-orange-50 text-orange-950 border border-orange-200 rounded text-[9.5px] font-bold">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {eduList.length > 0 && (
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-wider text-orange-950 border-b border-orange-300 pb-0.5">
                  EDUCATION
                </h3>
                {eduList.map((edu) => (
                  <div key={edu.id} className="text-[10.5px] mt-1.5">
                    <span className="font-bold text-slate-900 block">{edu.institution}</span>
                    <span className="text-slate-600">{edu.degree}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          21. STRATEGIC SOURCING / GLOBAL OPS CONSOLE
         ========================================================================= */}
      {(templateId === 'strategic_sourcing_ops' || templateId === 'global_director_ops' || templateId === 'enterprise_bizdev' || templateId === 'staff_ml_systems' || templateId === 'saas_operator' || templateId === 'mckinsey_consulting') && (
        <div className="min-h-[1055px] flex flex-col justify-between font-sans text-slate-900">
          <div className="flex flex-col gap-3.5">
            <div className="border-b-2 border-slate-900 pb-2.5 flex justify-between items-start">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-300">
                  GLOBAL OPERATIONS & ENTERPRISE STRATEGY
                </span>
                <h1 className="text-[26px] font-black tracking-tight text-slate-950 mt-1">{fullName || 'YOUR NAME'}</h1>
                <p className="text-[12.5px] font-bold text-slate-700 mt-0.5">{candidateRole}</p>
              </div>
              <div className="text-[10.5px] text-slate-600 flex flex-col items-end leading-tight">
                <span>{email}</span>
                <span>{phone} • {location}</span>
                {linkedin && <span className="text-slate-900">{linkedin}</span>}
              </div>
            </div>

            {summary && (
              <div className="bg-slate-50 border-l-3 border-slate-800 p-3 rounded-r text-[11px] text-slate-800 leading-relaxed">
                {summary}
              </div>
            )}

            {expList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-[12.5px] font-black uppercase tracking-wider text-slate-950 border-b-2 border-slate-300 pb-1">
                  OPERATIONAL LEADERSHIP & GLOBAL IMPACT
                </h2>
                <div className="flex flex-col gap-3">
                  {expList.map((exp) => (
                    <div key={exp.id} className="flex flex-col gap-1 text-[11px]">
                      <div className="flex justify-between items-baseline font-bold text-[12px]">
                        <span>{exp.role}</span>
                        <span className="text-slate-500 text-[10px] font-normal">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      <span className="font-bold text-slate-700 text-[10.5px]">{exp.company}</span>
                      {exp.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-700 flex flex-col gap-1 mt-0.5 leading-relaxed">
                          {exp.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-[12px] font-black uppercase tracking-wider text-slate-950 border-b-2 border-slate-300 pb-1">
                  STRATEGIC INITIATIVES & HIGH-IMPACT DELIVERABLES
                </h2>
                <div className="flex flex-col gap-2.5">
                  {projList.map((p) => (
                    <div key={p.id} className="flex flex-col gap-0.5 text-[11px]">
                      <div className="flex justify-between items-baseline font-bold text-[11.5px]">
                        <span className="text-slate-950">{p.title}</span>
                        {p.techStack && <span className="text-slate-600 text-[10px] font-normal">{p.techStack}</span>}
                      </div>
                      {p.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-600 flex flex-col gap-0.5 leading-relaxed">
                          {p.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-200 mt-2">
            {skillList.length > 0 && (
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5">
                  CORE DISCIPLINES
                </h3>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {skillList.map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-900 border border-slate-300 rounded text-[9.5px] font-semibold">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {eduList.length > 0 && (
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5">
                  EDUCATION & CREDENTIALS
                </h3>
                {eduList.map((edu) => (
                  <div key={edu.id} className="text-[10.5px] mt-1.5">
                    <span className="font-bold text-slate-900 block">{edu.institution}</span>
                    <span className="text-slate-600">{edu.degree}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          22. CLASSIC ATS 2-COLUMN (Item 28 in Gallery)
         ========================================================================= */}
      {templateId === 'classic_ats' && (
        <div className="min-h-[1055px] flex flex-col justify-between font-sans text-slate-900">
          <div className="flex flex-col gap-3.5">
            <div className="flex flex-col">
              <h1 className="text-[26px] font-black uppercase text-[#0B132B] tracking-tight leading-none">
                {fullName || 'YOUR NAME'}
              </h1>
              <p className="text-[12.5px] font-semibold text-[#334155] mt-1.5 leading-snug">{candidateRole}</p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10.5px] text-[#475569] mt-2 border-b-2 border-[#0B132B] pb-2.5">
                {email && <span>{email}</span>}
                {phone && <span>• {phone}</span>}
                {location && <span>• {location}</span>}
                {linkedin && <span>• {linkedin}</span>}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-7 flex flex-col gap-3.5">
                {summary && (
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[12px] font-black uppercase text-[#0B132B] border-b-2 border-[#0B132B] pb-0.5 tracking-wider">
                      EXECUTIVE SUMMARY
                    </h2>
                    <p className="text-[11px] text-[#334155] leading-relaxed mt-0.5">{summary}</p>
                  </div>
                )}

                {expList.length > 0 && (
                  <div className="flex flex-col gap-1.5">
                    <h2 className="text-[12px] font-black uppercase text-[#0B132B] border-b-2 border-[#0B132B] pb-0.5 tracking-wider">
                      PROFESSIONAL EXPERIENCE
                    </h2>
                    <div className="flex flex-col gap-3 mt-0.5">
                      {expList.map((exp) => (
                        <div key={exp.id} className="flex flex-col">
                          <div className="flex justify-between items-baseline text-[12px]">
                            <span className="font-extrabold text-[#0B132B] leading-tight">{exp.role}</span>
                            <span className="text-[10px] font-medium text-[#64748B] shrink-0">{exp.startDate} – {exp.endDate}</span>
                          </div>
                          <span className="text-[11px] font-bold text-[#1E293B]">{exp.company}</span>
                          {exp.bullets && (
                            <ul className="list-disc list-outside ml-4 text-[11px] text-[#1E293B] flex flex-col gap-1 mt-0.5 leading-relaxed">
                              {exp.bullets.map((b, idx) => (
                                <li key={idx}>{b}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {projList.length > 0 && (
                  <div className="flex flex-col gap-1.5 mt-1">
                    <h2 className="text-[12px] font-black uppercase text-[#0B132B] border-b-2 border-[#0B132B] pb-0.5 tracking-wider">
                      FEATURED PROJECTS & INITIATIVES
                    </h2>
                    <div className="flex flex-col gap-2.5 mt-0.5">
                      {projList.map((p) => (
                        <div key={p.id} className="flex flex-col gap-0.5 text-[11px]">
                          <div className="flex justify-between items-baseline">
                            <span className="font-bold text-slate-900 text-[11.5px]">{p.title}</span>
                            {p.techStack && <span className="text-slate-600 text-[10px]">{p.techStack}</span>}
                          </div>
                          {p.bullets?.map((b, idx) => (
                            <p key={idx} className="text-[#334155] leading-relaxed">• {b}</p>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="col-span-5 flex flex-col justify-between gap-3.5">
                {eduList.length > 0 && (
                  <div className="flex flex-col gap-1.5">
                    <h2 className="text-[12px] font-black uppercase text-[#0B132B] border-b-2 border-[#0B132B] pb-0.5 tracking-wider">
                      EDUCATION
                    </h2>
                    <div className="flex flex-col gap-2.5 mt-0.5">
                      {eduList.map((edu) => (
                        <div key={edu.id} className="flex flex-col text-[11px]">
                          <span className="font-extrabold text-[#0B132B] leading-tight">{edu.institution}</span>
                          <span className="text-[#334155] leading-snug">{edu.degree}</span>
                          <span className="text-[10px] text-slate-500">{edu.startDate} – {edu.endDate}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {skillList.length > 0 && (
                  <div className="flex flex-col gap-1.5">
                    <h2 className="text-[12px] font-black uppercase text-[#0B132B] border-b-2 border-[#0B132B] pb-0.5 tracking-wider">
                      SKILLS & TECH STACK
                    </h2>
                    <div className="flex flex-wrap gap-1.5 mt-0.5">
                      {skillList.map((sk, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-gray-100 rounded text-gray-800 text-[10px] font-medium border border-gray-200">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {certList.length > 0 && (
                  <div className="flex flex-col gap-1.5">
                    <h2 className="text-[12px] font-black uppercase text-[#0B132B] border-b-2 border-[#0B132B] pb-0.5 tracking-wider">
                      VERIFIED ACHIEVEMENTS & HONORS
                    </h2>
                    <div className="flex flex-col gap-1.5 mt-0.5">
                      {certList.slice(0, 4).map((c, idx) => (
                        <div key={idx} className="text-[10.5px] text-[#334155] leading-snug">
                          • {c}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          23. MODERN EXECUTIVE (FlowCV Executive Reference - Top-Right Avatar & Rating Dots)
         ========================================================================= */}
      {templateId === 'modern_executive' && (
        <div className="h-full min-h-[1055px] flex flex-col justify-between font-serif text-slate-800">
          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-slate-900 pb-3.5">
            <div>
              <div className="flex items-baseline gap-3">
                <h1 className="text-[28px] font-bold text-slate-950 tracking-tight">
                  {useFlowPersona ? flowcvPersona.fullName : fullName}
                </h1>
                <span className="text-[14px] italic text-slate-600 font-sans">
                  {useFlowPersona ? flowcvPersona.title : candidateRole}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[11px] text-slate-600 font-sans mt-2.5">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  {useFlowPersona ? flowcvPersona.location : location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  {useFlowPersona ? flowcvPersona.email : email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  {useFlowPersona ? flowcvPersona.phone : phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  {useFlowPersona ? flowcvPersona.linkedin : linkedin}
                </span>
              </div>
            </div>
            <img
              src="/images/templates/andrew-avatar.jpg"
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover shadow-sm border border-slate-200 shrink-0"
            />
          </div>

          {/* Profile */}
          <div className="flex flex-col gap-1">
            <h2 className="text-[12.5px] font-bold uppercase tracking-wider text-slate-950 font-sans border-b border-slate-300 pb-0.5">
              Profile
            </h2>
            <p className="text-[11px] text-slate-700 font-sans leading-relaxed">
              {useFlowPersona ? flowcvPersona.summary : summary}
            </p>
          </div>

          {/* Professional Experience */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[12.5px] font-bold uppercase tracking-wider text-slate-950 font-sans border-b border-slate-300 pb-0.5">
              Professional Experience
            </h2>
            <div className="flex flex-col gap-3.5 font-sans">
              {(useFlowPersona ? flowcvPersona.experiences : expList).slice(0, 3).map((exp: any, idx: number) => (
                <div key={exp.id || idx} className="grid grid-cols-12 gap-4 text-[11px]">
                  <div className="col-span-3 text-slate-500 font-medium">
                    <span>{exp.startDate} – {exp.endDate}</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">{exp.location || 'Berlin, Germany'}</span>
                  </div>
                  <div className="col-span-9 flex flex-col gap-1">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900 text-[12px]">{exp.company}</span>
                      <span className="text-slate-600 font-serif italic text-[11.5px]">{exp.role}</span>
                    </div>
                    <ul className="list-disc list-outside ml-4 text-slate-700 flex flex-col gap-1 leading-relaxed">
                      {exp.bullets?.map((b: string, bIdx: number) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[12.5px] font-bold uppercase tracking-wider text-slate-950 font-sans border-b border-slate-300 pb-0.5">
              Education
            </h2>
            <div className="flex flex-col gap-2.5 font-sans">
              {(useFlowPersona ? flowcvPersona.education : eduList).slice(0, 2).map((edu: any, idx: number) => (
                <div key={edu.id || idx} className="grid grid-cols-12 gap-4 text-[11px]">
                  <div className="col-span-3 text-slate-500 font-medium">
                    <span>{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <div className="col-span-9">
                    <span className="font-bold text-slate-900 text-[11.5px] block">{edu.degree}</span>
                    <span className="text-slate-600">{edu.institution}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills with Rating Dots */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[12.5px] font-bold uppercase tracking-wider text-slate-950 font-sans border-b border-slate-300 pb-0.5">
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 font-sans text-[11px] text-slate-700">
              <div className="flex justify-between items-center">
                <span>Product development and strategy</span>
                {renderRatingDots(5)}
              </div>
              <div className="flex justify-between items-center">
                <span>Project management and team leadership</span>
                {renderRatingDots(5)}
              </div>
              <div className="flex justify-between items-center">
                <span>Customer needs analysis and market research</span>
                {renderRatingDots(4)}
              </div>
              <div className="flex justify-between items-center">
                <span>Agile methods and Scrum</span>
                {renderRatingDots(4)}
              </div>
              <div className="flex justify-between items-center">
                <span>Data analysis</span>
                {renderRatingDots(4)}
              </div>
              <div className="flex justify-between items-center">
                <span>Presentation and communication</span>
                {renderRatingDots(4)}
              </div>
            </div>
          </div>

          {/* Languages, Awards & Quote */}
          <div className="grid grid-cols-12 gap-4 pt-2.5 border-t border-slate-300 font-sans text-[11px]">
            <div className="col-span-4 flex flex-col gap-1">
              <span className="font-bold text-slate-900 uppercase text-[10.5px] tracking-wider">Languages</span>
              <span className="text-slate-700">German • English • Spanish</span>
            </div>
            <div className="col-span-4 flex flex-col gap-1">
              <span className="font-bold text-slate-900 uppercase text-[10.5px] tracking-wider">Awards</span>
              <span className="text-slate-700">Product Manager of the Year</span>
              <span className="text-slate-500 text-[10px]">Delta Solutions</span>
            </div>
            <div className="col-span-4 flex flex-col gap-1 border-l border-slate-200 pl-3">
              <span className="font-bold text-slate-900 uppercase text-[10.5px] tracking-wider">Favorite Quote</span>
              <span className="text-slate-600 italic text-[10.5px] leading-tight">
                "The best product is the one that solves a problem for the customer."
              </span>
              <span className="text-slate-500 text-[9.5px]">— Eric Ries</span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          24. NAVY SIDEBAR (Item 30 in Gallery - Left 4-Col Navy Banner)
         ========================================================================= */}
      {(templateId === 'navy_sidebar' || templateId === 'right_sidebar') && (
        <div className="grid grid-cols-12 h-full min-h-[1123px] w-full text-slate-800">
          <div className="col-span-4 bg-[#0B1E36] text-white p-7 flex flex-col justify-between text-xs">
            <div className="flex flex-col gap-5">
              <div>
                <h1 className="text-[24px] font-black text-white leading-tight">{fullName || 'YOUR NAME'}</h1>
                <span className="text-sky-300 font-semibold text-[12px] block mt-1">{candidateRole}</span>
                <span className="text-sky-300 text-[11px] block mt-0.5">{location}</span>
              </div>
              <div className="flex flex-col gap-2 border-t border-sky-800/80 pt-3 text-[11px]">
                <span className="font-bold uppercase text-[10.5px] text-sky-400 tracking-wider">Contact</span>
                <span className="text-gray-200 break-all">{email}</span>
                <span className="text-gray-200">{phone}</span>
                {linkedin && <span className="text-sky-300 break-all text-[10px]">{linkedin}</span>}
              </div>
              {eduList.length > 0 && (
                <div className="flex flex-col gap-2.5 border-t border-sky-800/80 pt-3">
                  <span className="font-bold uppercase text-[10.5px] text-sky-400 tracking-wider">Education</span>
                  {eduList.slice(0, 2).map((edu) => (
                    <div key={edu.id} className="flex flex-col text-[11px]">
                      <span className="font-bold text-white">{edu.institution}</span>
                      <span className="text-gray-200 text-[10.5px]">{edu.degree}</span>
                      <span className="text-sky-300 text-[10px]">{edu.startDate} – {edu.endDate}</span>
                    </div>
                  ))}
                </div>
              )}
              {skillList.length > 0 && (
                <div className="flex flex-col gap-2 border-t border-sky-800/80 pt-3">
                  <span className="font-bold uppercase text-[10.5px] text-sky-400 tracking-wider">Skills</span>
                  <div className="flex flex-wrap gap-1.5">
                    {skillList.slice(0, 14).map((sk, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-sky-950 text-sky-200 border border-sky-800 rounded text-[9.5px] font-medium">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {certList.length > 0 && (
              <div className="flex flex-col gap-1.5 border-t border-sky-800/80 pt-3 text-[10.5px] text-slate-300">
                <span className="font-bold uppercase text-[10.5px] text-sky-400 tracking-wider">Certifications</span>
                {certList.slice(0, 3).map((c, idx) => (
                  <div key={idx} className="leading-snug text-slate-200">• {c}</div>
                ))}
              </div>
            )}
          </div>

          <div className="col-span-8 p-8 pl-6 flex flex-col justify-between text-xs text-slate-900 bg-white">
            {summary && (
              <div className="flex flex-col gap-1">
                <h3 className="font-black text-[#0B1E36] uppercase text-[12px] tracking-wider border-b-2 border-slate-200 pb-0.5">
                  Professional Summary
                </h3>
                <p className="text-gray-800 leading-relaxed text-[11px] mt-1">{summary}</p>
              </div>
            )}
            {expList.length > 0 && (
              <div className="flex flex-col gap-3">
                <h3 className="font-black text-[#0B1E36] uppercase text-[12px] tracking-wider border-b-2 border-slate-200 pb-0.5">
                  Experience & Leadership
                </h3>
                <div className="flex flex-col gap-3.5">
                  {expList.slice(0, 3).map((exp) => (
                    <div key={exp.id} className="flex flex-col gap-1">
                      <div className="flex justify-between items-baseline font-bold text-gray-900 text-[12px]">
                        <span>{exp.role} — <span className="text-[#0B1E36]">{exp.company}</span></span>
                        <span className="text-gray-500 font-normal text-[10.5px]">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      <ul className="list-disc list-outside ml-4 text-gray-700 text-[11px] flex flex-col gap-1 leading-relaxed">
                        {exp.bullets?.map((b, idx) => (
                          <li key={idx}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {projList.length > 0 && (
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-200">
                <h3 className="font-black text-[#0B1E36] uppercase text-[12px] tracking-wider border-b border-slate-200 pb-0.5">
                  Key Technical Projects
                </h3>
                <div className="flex flex-col gap-2.5">
                  {projList.slice(0, 2).map((proj, idx) => (
                    <div key={idx} className="flex flex-col gap-0.5 text-[11px]">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-slate-900">{proj.name}</span>
                        {proj.tech && <span className="text-sky-800 font-semibold text-[10px]">{proj.tech}</span>}
                      </div>
                      <p className="text-slate-700 leading-relaxed">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          25. NAVY HEADER (Item 31 in Gallery - Full Top Navy Banner)
         ========================================================================= */}
      {templateId === 'navy_header' && (
        <div className="flex flex-col justify-between h-full min-h-[1123px] w-full font-sans">
          <div className="bg-[#0B1E36] text-white p-8 pb-6">
            <h1 className="text-[28px] font-black tracking-tight leading-none">{fullName || 'YOUR NAME'}</h1>
            <p className="text-[13px] text-sky-300 font-bold mt-1.5">{candidateRole}</p>
            <div className="text-[11px] text-gray-300 flex flex-wrap gap-4 mt-2.5">
              {email && <span>{email}</span>}
              {phone && <span>• {phone}</span>}
              {location && <span>• {location}</span>}
              {linkedin && <span>• {linkedin}</span>}
            </div>
          </div>

          <div className="p-8 pt-5 flex-1 flex flex-col justify-between text-[#1E293B]">
            {summary && (
              <div className="flex flex-col gap-1 border-b border-sky-100 pb-3">
                <h3 className="font-black text-[#0B1E36] uppercase text-[12px] tracking-wider border-b-2 border-sky-900 pb-0.5">
                  Executive Summary
                </h3>
                <p className="leading-relaxed mt-1 text-gray-800 text-[11.5px]">{summary}</p>
              </div>
            )}

            {expList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h3 className="font-black text-[#0B1E36] uppercase text-[12px] tracking-wider border-b-2 border-sky-900 pb-0.5">
                  Professional Experience
                </h3>
                <div className="flex flex-col gap-3.5 mt-1">
                  {expList.slice(0, 3).map((exp) => (
                    <div key={exp.id} className="flex flex-col gap-1">
                      <div className="flex justify-between items-baseline font-bold text-gray-900 text-[12px]">
                        <span>{exp.role} @ <span className="text-[#0B1E36]">{exp.company}</span></span>
                        <span className="text-gray-500 font-normal text-[10.5px]">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      <ul className="list-disc list-outside ml-4 text-gray-700 text-[11px] flex flex-col gap-1 leading-relaxed">
                        {exp.bullets?.map((b, idx) => (
                          <li key={idx}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projList.length > 0 && (
              <div className="flex flex-col gap-2 border-t border-slate-200 pt-2">
                <h3 className="font-black text-[#0B1E36] uppercase text-[12px] tracking-wider border-b-2 border-sky-900 pb-0.5">
                  Key Projects & System Architecture
                </h3>
                <div className="flex flex-col gap-2">
                  {projList.slice(0, 2).map((proj, idx) => (
                    <div key={idx} className="flex flex-col gap-0.5 text-[11px]">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-slate-900">{proj.name}</span>
                        {proj.tech && <span className="text-sky-800 font-semibold text-[10px]">{proj.tech}</span>}
                      </div>
                      <p className="text-slate-700 leading-relaxed">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-12 gap-6 pt-3 border-t border-sky-100">
              <div className="col-span-6 flex flex-col gap-1.5">
                <h3 className="font-black text-[#0B1E36] uppercase text-[11.5px] border-b border-sky-900 pb-0.5 tracking-wider">
                  Education & Credentials
                </h3>
                {eduList.slice(0, 2).map((edu) => (
                  <div key={edu.id} className="flex flex-col text-[11px]">
                    <span className="font-bold text-gray-900">{edu.institution}</span>
                    <span className="text-gray-700 text-[10.5px]">{edu.degree}</span>
                    <span className="text-gray-500 text-[10px]">{edu.startDate} – {edu.endDate}</span>
                  </div>
                ))}
              </div>

              <div className="col-span-6 flex flex-col gap-1.5">
                <h3 className="font-black text-[#0B1E36] uppercase text-[11.5px] border-b border-sky-900 pb-0.5 tracking-wider">
                  Core Technologies
                </h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {skillList.slice(0, 12).map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-sky-50 text-sky-950 font-semibold rounded text-[10px] border border-sky-200">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          26. FLOWCV ATLANTIC BLUE (Multi-Column Left Navy Sidebar - Brian T. Wayne Reference)
         ========================================================================= */}
      {templateId === 'flowcv_atlantic_blue' && (
        <div className="grid grid-cols-12 h-full min-h-[1123px] w-full text-slate-800">
          {/* Left Navy Column */}
          <div className="col-span-4 bg-[#0F2841] text-white p-7 flex flex-col justify-between text-xs">
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-[22px] font-black text-white leading-tight">
                  {useFlowPersona ? flowcvPersona.fullName : fullName}
                </h1>
                <span className="text-sky-300 font-semibold text-[12px] block mt-1">
                  {useFlowPersona ? flowcvPersona.title : candidateRole}
                </span>
              </div>

              {/* Avatar Photo */}
              <div className="py-1">
                <img
                  src="/images/templates/brian-avatar.jpg"
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-white/20 mx-auto shadow-md"
                />
              </div>

              {/* Contact with Icons */}
              <div className="flex flex-col gap-2 pt-2 border-t border-sky-800/60 text-[10.5px]">
                <div className="flex items-center gap-2 text-slate-200">
                  <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="break-all">{useFlowPersona ? flowcvPersona.email : email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>{useFlowPersona ? flowcvPersona.phone : phone}</span>
                </div>
                <div className="flex items-start gap-2 text-slate-200">
                  <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{useFlowPersona ? flowcvPersona.location : location}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <Globe className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>{useFlowPersona ? flowcvPersona.linkedin : linkedin}</span>
                </div>
              </div>

              {/* Profile */}
              <div className="flex flex-col gap-1.5 pt-2 border-t border-sky-800/60">
                <div className="flex items-center gap-1.5 text-sky-300 font-bold uppercase tracking-wider text-[11px]">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Profile</span>
                </div>
                <p className="text-[10.5px] text-slate-200 leading-relaxed">
                  {useFlowPersona ? flowcvPersona.summary : summary}
                </p>
              </div>

              {/* Languages */}
              <div className="flex flex-col gap-2 pt-2 border-t border-sky-800/60">
                <div className="flex items-center gap-1.5 text-sky-300 font-bold uppercase tracking-wider text-[11px]">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Languages</span>
                </div>
                <div className="flex flex-col gap-2 text-[10.5px]">
                  <div className="flex justify-between items-center text-slate-200">
                    <span>English</span>
                    {renderRatingDots(5, 5, 'bg-white', 'bg-white/20')}
                  </div>
                  <div className="flex justify-between items-center text-slate-200">
                    <span>Spanish</span>
                    {renderRatingDots(4, 5, 'bg-white', 'bg-white/20')}
                  </div>
                </div>
              </div>
            </div>

            {/* Awards at bottom */}
            <div className="flex flex-col gap-2 pt-3 border-t border-sky-800/60">
              <div className="flex items-center gap-1.5 text-sky-300 font-bold uppercase tracking-wider text-[11px]">
                <Award className="w-3.5 h-3.5" />
                <span>Awards</span>
              </div>
              <div className="flex flex-col gap-1.5 text-[10px] text-slate-200">
                <div>
                  <span className="font-bold block text-white">Outstanding Business Student Award</span>
                  <span className="text-slate-300 text-[9.5px]">University of Southern California, 2014</span>
                </div>
                <div>
                  <span className="font-bold block text-white">Dean's List</span>
                  <span className="text-slate-300 text-[9.5px]">University of California, Los Angeles, 2015-2016</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right White Column */}
          <div className="col-span-8 bg-white p-8 pl-6 flex flex-col justify-between text-slate-800">
            {/* Work Experience */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2 border-b-2 border-slate-900 pb-1">
                <Briefcase className="w-4 h-4 text-slate-900" />
                <h2 className="text-[13px] font-black uppercase tracking-wider text-slate-900">
                  Work Experience
                </h2>
              </div>
              <div className="flex flex-col gap-4">
                {(useFlowPersona ? flowcvPersona.experiences : expList).slice(0, 2).map((exp: any, idx: number) => (
                  <div key={exp.id || idx} className="flex flex-col gap-1">
                    <div className="flex justify-between items-baseline">
                      <span className="font-extrabold text-[12px] text-slate-900">{exp.company}</span>
                      <span className="text-[10px] font-medium text-slate-500">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <span className="text-[11px] font-bold text-sky-800">{exp.role}</span>
                    <ul className="list-disc list-outside ml-4 text-[10.5px] text-slate-700 flex flex-col gap-1 mt-1 leading-relaxed">
                      {exp.bullets?.map((b: string, bIdx: number) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex items-center gap-2 border-b-2 border-slate-900 pb-1">
                <GraduationCap className="w-4 h-4 text-slate-900" />
                <h2 className="text-[13px] font-black uppercase tracking-wider text-slate-900">
                  Education
                </h2>
              </div>
              <div className="flex flex-col gap-3">
                {(useFlowPersona ? flowcvPersona.education : eduList).slice(0, 2).map((edu: any, idx: number) => (
                  <div key={edu.id || idx} className="flex flex-col text-[11px]">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900">{edu.degree}</span>
                      <span className="text-[10px] text-slate-500">{edu.startDate} – {edu.endDate} | {edu.location || 'Boston'}</span>
                    </div>
                    <span className="text-slate-600 text-[10.5px]">{edu.institution}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex items-center gap-2 border-b-2 border-slate-900 pb-1">
                <Wrench className="w-4 h-4 text-slate-900" />
                <h2 className="text-[13px] font-black uppercase tracking-wider text-slate-900">
                  Skills
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[10.5px] text-slate-700">
                {(useFlowPersona ? flowcvPersona.skills : skillList.slice(0, 8)).map((sk: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0" />
                    <span>{sk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          27. FLOWCV MERCURY FLOW (Fluid 1-Column Minimalist - Camila Rivera Reference)
         ========================================================================= */}
      {/* =========================================================================
          27. FLOWCV MERCURY FLOW (Fluid 1-Column Minimalist - Camila Rivera Reference)
         ========================================================================= */}
      {templateId === 'flowcv_mercury_flow' && (
        <div className="h-full min-h-[1055px] flex flex-col justify-between font-sans text-slate-800">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <img
              src="/images/templates/female-avatar.jpg"
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover shadow-sm border border-slate-200"
            />
            <h1 className="text-[28px] font-bold text-slate-900 tracking-tight mt-2 leading-none">
              {useFlowPersona ? flowcvPersona.fullName : fullName}
            </h1>
            <p className="text-[13px] font-semibold text-slate-600 mt-1">
              {useFlowPersona ? flowcvPersona.title : candidateRole}
            </p>
            <div className="flex items-center justify-center flex-wrap gap-4 text-[11px] text-slate-600 mt-2">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {useFlowPersona ? flowcvPersona.email : email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                {useFlowPersona ? flowcvPersona.phone : phone}
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                {useFlowPersona ? flowcvPersona.linkedin : linkedin}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {useFlowPersona ? flowcvPersona.location : location}
              </span>
            </div>
          </div>

          {/* Summary */}
          <div className="flex flex-col gap-1">
            <h2 className="text-[12.5px] font-black uppercase text-slate-900 tracking-wider text-center border-b border-slate-200 pb-1">
              Summary
            </h2>
            <p className="text-[11px] text-slate-700 leading-relaxed text-center px-4">
              {useFlowPersona ? flowcvPersona.summary : summary}
            </p>
          </div>

          {/* Professional Experience */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[12.5px] font-black uppercase text-slate-900 tracking-wider text-center border-b border-slate-200 pb-1">
              Professional Experience
            </h2>
            <div className="flex flex-col gap-3.5">
              {(useFlowPersona ? flowcvPersona.experiences : expList).slice(0, 3).map((exp: any, idx: number) => (
                <div key={exp.id || idx} className="grid grid-cols-12 gap-4 text-[11px]">
                  <div className="col-span-3 text-right text-slate-500 font-medium leading-tight">
                    <span>{exp.startDate} – {exp.endDate}</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">{exp.location || 'Miami, United States'}</span>
                  </div>
                  <div className="col-span-9 flex flex-col gap-1">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900 text-[12px]">{exp.company}</span>
                      <span className="text-slate-600 font-medium text-[11px] italic">{exp.role}</span>
                    </div>
                    <ul className="list-disc list-outside ml-4 text-slate-700 flex flex-col gap-1 leading-relaxed">
                      {exp.bullets?.map((b: string, bIdx: number) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Projects */}
          {projList.length > 0 && (
            <div className="flex flex-col gap-2">
              <h2 className="text-[12.5px] font-black uppercase text-slate-900 tracking-wider text-center border-b border-slate-200 pb-1">
                Featured Projects
              </h2>
              <div className="grid grid-cols-2 gap-4 text-[11px]">
                {projList.slice(0, 2).map((proj, idx) => (
                  <div key={idx} className="flex flex-col gap-0.5 bg-slate-50/80 p-2.5 rounded border border-slate-200/60">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900">{proj.name}</span>
                      {proj.tech && <span className="text-slate-500 text-[9.5px]">{proj.tech}</span>}
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[10.5px]">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[12.5px] font-black uppercase text-slate-900 tracking-wider text-center border-b border-slate-200 pb-1">
              Education
            </h2>
            <div className="flex flex-col gap-2">
              {(useFlowPersona ? flowcvPersona.education : eduList).slice(0, 2).map((edu: any, idx: number) => (
                <div key={edu.id || idx} className="grid grid-cols-12 gap-4 text-[11px]">
                  <div className="col-span-3 text-right text-slate-500 font-medium leading-tight">
                    <span>{edu.startDate} – {edu.endDate}</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">{edu.location || 'Miami, United States'}</span>
                  </div>
                  <div className="col-span-9">
                    <span className="font-bold text-slate-900 text-[11.5px] block">{edu.degree}</span>
                    <span className="text-slate-600">{edu.institution}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[12.5px] font-black uppercase text-slate-900 tracking-wider text-center border-b border-slate-200 pb-1">
              Skills
            </h2>
            <div className="grid grid-cols-3 gap-x-4 gap-y-1.5 text-center text-[11px] text-slate-700">
              {(useFlowPersona ? flowcvPersona.skills : skillList.slice(0, 6)).map((sk: string, idx: number) => (
                <div key={idx} className="flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0" />
                  <span>{sk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="flex flex-col gap-2 border-t border-slate-200 pt-2.5">
            <h2 className="text-[12px] font-black uppercase text-slate-900 tracking-wider text-center">
              Languages
            </h2>
            <div className="flex justify-center items-center gap-12 text-[11px] text-slate-700">
              <div className="flex items-center gap-3">
                <span className="font-medium">English</span>
                {renderRatingDots(5, 5, 'bg-slate-900', 'bg-slate-200')}
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium">Spanish</span>
                {renderRatingDots(4, 5, 'bg-slate-900', 'bg-slate-200')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          28. FLOWCV LEAVES (Botanical Leaf Strip Margin - Catherine Bale Reference)
         ========================================================================= */}
      {templateId === 'flowcv_leaves' && (
        <div className="flex h-full min-h-[1123px] w-full text-slate-800">
          {/* Left Botanical Strip */}
          <div className="w-[34px] shrink-0 bg-emerald-950 overflow-hidden">
            <img
              src="/images/templates/leaves-strip.png"
              alt="Leaves Accent"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-8 pl-6 flex flex-col justify-between">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-[28px] font-bold text-slate-900 tracking-tight leading-tight">
                  {useFlowPersona ? flowcvPersona.fullName : fullName}
                </h1>
                <p className="text-[13px] font-semibold text-slate-600 mt-1">
                  {useFlowPersona ? flowcvPersona.title : candidateRole}
                </p>
                <div className="flex flex-col gap-1 text-[11px] text-slate-600 mt-2.5">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {useFlowPersona ? flowcvPersona.email : email}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {useFlowPersona ? flowcvPersona.phone : phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {useFlowPersona ? flowcvPersona.location : location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-slate-400" />
                      {useFlowPersona ? flowcvPersona.website : website}
                    </span>
                  </div>
                </div>
              </div>
              <img
                src="/images/templates/catherine-avatar.png"
                alt="Avatar"
                className="w-20 h-20 rounded-md object-cover shadow-xs border border-slate-200 shrink-0"
              />
            </div>

            {/* Profile */}
            <div className="flex flex-col gap-1">
              <h2 className="text-[12.5px] font-bold text-slate-900 border-b border-slate-900 pb-0.5 uppercase tracking-wider">
                Profile
              </h2>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                {useFlowPersona ? flowcvPersona.summary : summary}
              </p>
            </div>

            {/* Professional Experience */}
            <div className="flex flex-col gap-2">
              <h2 className="text-[12.5px] font-bold text-slate-900 border-b border-slate-900 pb-0.5 uppercase tracking-wider">
                Professional Experience
              </h2>
              <div className="flex flex-col gap-3.5">
                {(useFlowPersona ? flowcvPersona.experiences : expList).slice(0, 3).map((exp: any, idx: number) => (
                  <div key={exp.id || idx} className="flex flex-col gap-1 text-[11px]">
                    <div className="flex justify-between items-baseline font-bold text-slate-900">
                      <span>{exp.company}, {exp.role}</span>
                      <span className="text-slate-500 font-normal text-[10.5px]">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <span className="text-slate-500 text-[10px]">{exp.location || 'Milwaukee'}</span>
                    <ul className="list-disc list-outside ml-4 text-slate-700 flex flex-col gap-1 mt-0.5 leading-relaxed">
                      {exp.bullets?.map((b: string, bIdx: number) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Projects */}
            {projList.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <h2 className="text-[12.5px] font-bold text-slate-900 border-b border-slate-900 pb-0.5 uppercase tracking-wider">
                  Featured Projects
                </h2>
                <div className="grid grid-cols-2 gap-4 text-[11px]">
                  {projList.slice(0, 2).map((proj, idx) => (
                    <div key={idx} className="flex flex-col gap-0.5">
                      <span className="font-bold text-slate-900">{proj.name}</span>
                      <p className="text-slate-600 leading-relaxed text-[10.5px]">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            <div className="flex flex-col gap-2">
              <h2 className="text-[12.5px] font-bold text-slate-900 border-b border-slate-900 pb-0.5 uppercase tracking-wider">
                Education
              </h2>
              {(useFlowPersona ? flowcvPersona.education : eduList).slice(0, 2).map((edu: any, idx: number) => (
                <div key={edu.id || idx} className="flex justify-between items-baseline text-[11px]">
                  <div>
                    <span className="font-bold text-slate-900 block">{edu.institution}</span>
                    <span className="text-slate-600">{edu.degree}</span>
                  </div>
                  <span className="text-slate-500 text-[10.5px]">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>

            {/* Certificates & Languages */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <h2 className="text-[12px] font-bold text-slate-900 border-b border-slate-900 pb-0.5 uppercase tracking-wider">
                  Certificates
                </h2>
                <div className="text-[10.5px] text-slate-700 flex flex-col gap-0.5">
                  <span>Google Analytics Certified</span>
                  <span>HubSpot Inbound Marketing Certified</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-[12px] font-bold text-slate-900 border-b border-slate-900 pb-0.5 uppercase tracking-wider">
                  Languages
                </h2>
                <div className="text-[10.5px] text-slate-700 flex items-center gap-4">
                  <span>English (C2)</span>
                  <span>Spanish (C2)</span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-col gap-1.5">
              <h2 className="text-[12px] font-bold text-slate-900 border-b border-slate-900 pb-0.5 uppercase tracking-wider">
                Skills
              </h2>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[10.5px] text-slate-700">
                <div>
                  <span className="font-bold block text-slate-900">Market research</span>
                  <span className="text-slate-600 leading-snug">
                    Strong marketing skills with experience in developing marketing strategies and customer research.
                  </span>
                </div>
                <div>
                  <span className="font-bold block text-slate-900">Analytical thinking</span>
                  <span className="text-slate-600 leading-snug">
                    Analytical thinking with experience analyzing data and market trends to identify opportunities.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          29. TEALHQ MODERN & ATS VERIFIED (Teal Accent Layout)
         ========================================================================= */}
      {(templateId === 'teal_modern' || templateId === 'teal_clean_ats') && (
        <div className="h-full min-h-[1055px] flex flex-col justify-between font-sans text-slate-800">
          <div className="border-b-2 border-[#0D9488] pb-3.5 flex justify-between items-start">
            <div>
              <span className="text-[9.5px] font-black uppercase text-[#0D9488] bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                TEALHQ ATS OPTIMIZED
              </span>
              <h1 className="text-[28px] font-black uppercase text-slate-950 tracking-tight leading-none mt-1.5">
                {fullName || 'YOUR NAME'}
              </h1>
              <p className="text-[13px] font-bold text-[#0D9488] mt-1">{candidateRole}</p>
            </div>
            <div className="text-[10.5px] text-slate-600 flex flex-col items-end gap-1">
              {email && <span>{email}</span>}
              {phone && <span>{phone} • {location}</span>}
              {linkedin && <span className="text-[#0D9488] font-medium">{linkedin}</span>}
            </div>
          </div>

          {summary && (
            <div className="bg-teal-50/60 border-l-4 border-[#0D9488] p-3 rounded-r">
              <p className="text-[11px] text-slate-800 leading-relaxed">{summary}</p>
            </div>
          )}

          {expList.length > 0 && (
            <div className="flex flex-col gap-2">
              <h2 className="text-[12.5px] font-black uppercase text-[#0D9488] tracking-wider border-b border-teal-100 pb-0.5">
                Professional Experience
              </h2>
              <div className="flex flex-col gap-3.5">
                {expList.slice(0, 3).map((exp) => (
                  <div key={exp.id} className="flex flex-col gap-1 text-[11px]">
                    <div className="flex justify-between items-baseline font-bold text-slate-900">
                      <span>{exp.role} @ <span className="text-[#0D9488]">{exp.company}</span></span>
                      <span className="text-slate-500 text-[10.5px] font-normal">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    {exp.bullets && (
                      <ul className="list-disc list-outside ml-4 text-slate-700 flex flex-col gap-1 leading-relaxed">
                        {exp.bullets.map((b, idx) => (
                          <li key={idx}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {projList.length > 0 && (
            <div className="flex flex-col gap-2">
              <h2 className="text-[12.5px] font-black uppercase text-[#0D9488] tracking-wider border-b border-teal-100 pb-0.5">
                Featured Projects
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {projList.slice(0, 2).map((proj, idx) => (
                  <div key={idx} className="flex flex-col gap-0.5 text-[11px] bg-teal-50/30 p-2.5 rounded border border-teal-100">
                    <span className="font-bold text-slate-900">{proj.name}</span>
                    <p className="text-slate-700 text-[10.5px] leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-6 pt-2 border-t border-teal-100">
            {skillList.length > 0 && (
              <div>
                <h3 className="text-[12px] font-black uppercase text-[#0D9488] tracking-wider mb-2">
                  Key Skills & Competencies
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {skillList.slice(0, 12).map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-teal-50 text-teal-900 border border-teal-200 rounded text-[10px] font-bold">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {eduList.length > 0 && (
              <div>
                <h3 className="text-[12px] font-black uppercase text-[#0D9488] tracking-wider mb-2">
                  Education & Credentials
                </h3>
                {eduList.slice(0, 2).map((edu) => (
                  <div key={edu.id} className="text-[11px] mb-2">
                    <span className="font-bold text-slate-900 block">{edu.institution}</span>
                    <span className="text-slate-600">{edu.degree}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          30. FLOWCV STEADY FORM (Balanced 60/40 Split - Rohan K. Patel Reference)
         ========================================================================= */}
      {templateId === 'flowcv_steady_form' && (
        <div className="h-full min-h-[1055px] flex flex-col justify-between font-sans text-slate-800">
          {/* Header */}
          <div className="flex justify-between items-start pb-3.5 border-b-2 border-slate-900">
            <div>
              <div className="flex items-baseline gap-3">
                <h1 className="text-[28px] font-black text-slate-950 tracking-tight">
                  {useFlowPersona ? flowcvPersona.fullName : fullName}
                </h1>
                <span className="text-[14px] text-slate-600 font-medium">
                  {useFlowPersona ? flowcvPersona.title : candidateRole}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[10.5px] text-slate-600 mt-2">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  {useFlowPersona ? flowcvPersona.email : email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  {useFlowPersona ? flowcvPersona.phone : phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  {useFlowPersona ? flowcvPersona.linkedin : linkedin}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  {useFlowPersona ? flowcvPersona.location : location}
                </span>
              </div>
            </div>
            <img
              src="/images/templates/rohan-avatar.jpg"
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover shadow-sm border border-slate-200 shrink-0"
            />
          </div>

          {/* Summary */}
          <div className="flex flex-col gap-1">
            <h2 className="text-[12.5px] font-black uppercase text-slate-900 tracking-wider text-center bg-slate-100 py-1 rounded">
              Summary
            </h2>
            <p className="text-[11px] text-slate-700 leading-relaxed text-center px-4">
              {useFlowPersona ? flowcvPersona.summary : summary}
            </p>
          </div>

          {/* Professional Experience */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[12.5px] font-black uppercase text-slate-900 tracking-wider text-center bg-slate-100 py-1 rounded">
              Professional Experience
            </h2>
            <div className="flex flex-col gap-3.5">
              {(useFlowPersona ? flowcvPersona.experiences : expList).slice(0, 3).map((exp: any, idx: number) => (
                <div key={exp.id || idx} className="grid grid-cols-12 gap-4 text-[11px]">
                  <div className="col-span-3 text-right text-slate-500 font-medium">
                    <span>{exp.startDate} – {exp.endDate}</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">{exp.location || 'Ahmedabad, India'}</span>
                  </div>
                  <div className="col-span-9 flex flex-col gap-0.5">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900 text-[12px]">{exp.company}</span>
                      <span className="text-slate-600 italic text-[11px]">{exp.role}</span>
                    </div>
                    <ul className="list-disc list-outside ml-4 text-slate-700 flex flex-col gap-1 mt-0.5 leading-relaxed">
                      {exp.bullets?.map((b: string, bIdx: number) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Projects */}
          {projList.length > 0 && (
            <div className="flex flex-col gap-2">
              <h2 className="text-[12.5px] font-black uppercase text-slate-900 tracking-wider text-center bg-slate-100 py-1 rounded">
                Key Projects
              </h2>
              <div className="grid grid-cols-2 gap-4 text-[11px]">
                {projList.slice(0, 2).map((proj, idx) => (
                  <div key={idx} className="flex flex-col gap-0.5 bg-slate-50 p-2 rounded border border-slate-200">
                    <span className="font-bold text-slate-900">{proj.name}</span>
                    <p className="text-slate-600 leading-relaxed text-[10.5px]">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[12.5px] font-black uppercase text-slate-900 tracking-wider text-center bg-slate-100 py-1 rounded">
              Education
            </h2>
            <div className="flex flex-col gap-2">
              {(useFlowPersona ? flowcvPersona.education : eduList).slice(0, 2).map((edu: any, idx: number) => (
                <div key={edu.id || idx} className="grid grid-cols-12 gap-4 text-[11px]">
                  <div className="col-span-3 text-right text-slate-500 font-medium">
                    <span>{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <div className="col-span-9">
                    <span className="font-bold text-slate-900 text-[11.5px] block">{edu.degree}</span>
                    <span className="text-slate-600">{edu.institution}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[12.5px] font-black uppercase text-slate-900 tracking-wider text-center bg-slate-100 py-1 rounded">
              Skills
            </h2>
            <div className="grid grid-cols-3 gap-x-4 gap-y-1.5 text-center text-[11px] text-slate-700">
              {(useFlowPersona ? flowcvPersona.skills : skillList.slice(0, 6)).map((sk: string, idx: number) => (
                <div key={idx} className="flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0" />
                  <span>{sk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Languages & Certificates */}
          <div className="grid grid-cols-2 gap-6 pt-2 border-t border-slate-200 text-[11px]">
            <div className="flex flex-col items-center">
              <span className="font-black uppercase text-slate-900 text-[11.5px] tracking-wider mb-1">Languages</span>
              <span className="text-slate-700">English • Hindi • Gujarati</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-black uppercase text-slate-900 text-[11.5px] tracking-wider mb-1">Certificates</span>
              <span className="text-slate-700 text-center leading-snug">AutoCAD Professional • Primavera P6 • Safety</span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          31. FLOWCV CLASSIC SERIF (Formal Publication - Andrew O'Sullivan Reference)
         ========================================================================= */}
      {templateId === 'flowcv_classic_serif' && (
        <div className="h-full min-h-[1055px] flex flex-col justify-between font-serif text-slate-900">
          {/* Header */}
          <div className="text-center border-b-2 border-slate-900 pb-3.5">
            <h1 className="text-[28px] font-bold tracking-wider uppercase text-slate-950">
              {useFlowPersona ? flowcvPersona.fullName : fullName}
            </h1>
            <p className="text-[13px] italic text-slate-700 mt-0.5">
              {useFlowPersona ? flowcvPersona.title : candidateRole}
            </p>
            <div className="text-[11px] text-slate-600 flex justify-center flex-wrap gap-4 mt-2 font-sans">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-500" />
                {useFlowPersona ? flowcvPersona.location : location}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-500" />
                {useFlowPersona ? flowcvPersona.email : email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-500" />
                {useFlowPersona ? flowcvPersona.phone : phone}
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-slate-500" />
                {useFlowPersona ? flowcvPersona.linkedin : linkedin}
              </span>
            </div>
          </div>

          {/* Summary */}
          <div className="flex flex-col gap-1">
            <h2 className="text-[12.5px] font-bold uppercase tracking-widest text-slate-900 border-b border-slate-900 pb-0.5 text-center">
              Summary
            </h2>
            <p className="text-[11px] text-slate-700 leading-relaxed text-center px-4 font-sans">
              {useFlowPersona ? flowcvPersona.summary : summary}
            </p>
          </div>

          {/* Professional Experience */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[12.5px] font-bold uppercase tracking-widest text-slate-900 border-b border-slate-900 pb-0.5 text-center">
              Professional Experience
            </h2>
            <div className="flex flex-col gap-3.5 font-sans">
              {(useFlowPersona ? flowcvPersona.experiences : expList).slice(0, 3).map((exp: any, idx: number) => (
                <div key={exp.id || idx} className="flex flex-col gap-1 text-[11px]">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-[12px] font-serif">{exp.role}</span>
                    <span className="text-slate-500 text-[10.5px]">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <div className="flex justify-between items-baseline text-slate-600 italic">
                    <span>{exp.company}</span>
                    <span className="text-[10px] not-italic">{exp.location || 'Dublin, Ireland'}</span>
                  </div>
                  <ul className="list-disc list-outside ml-4 text-slate-700 flex flex-col gap-1 mt-0.5 leading-relaxed">
                    {exp.bullets?.map((b: string, bIdx: number) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Key Projects */}
          {projList.length > 0 && (
            <div className="flex flex-col gap-1.5 font-sans">
              <h2 className="text-[12.5px] font-bold uppercase tracking-widest text-slate-900 border-b border-slate-900 pb-0.5 text-center font-serif">
                Featured Projects
              </h2>
              <div className="grid grid-cols-2 gap-4 text-[11px]">
                {projList.slice(0, 2).map((proj, idx) => (
                  <div key={idx} className="flex flex-col gap-0.5">
                    <span className="font-bold text-slate-900">{proj.name}</span>
                    <p className="text-slate-600 leading-relaxed text-[10.5px]">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[12.5px] font-bold uppercase tracking-widest text-slate-900 border-b border-slate-900 pb-0.5 text-center">
              Education
            </h2>
            <div className="flex flex-col gap-2 font-sans">
              {(useFlowPersona ? flowcvPersona.education : eduList).slice(0, 2).map((edu: any, idx: number) => (
                <div key={edu.id || idx} className="flex justify-between items-baseline text-[11px]">
                  <div>
                    <span className="font-bold text-slate-900 font-serif block">{edu.degree}</span>
                    <span className="text-slate-600">{edu.institution}</span>
                  </div>
                  <span className="text-slate-500 text-[10.5px]">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[12.5px] font-bold uppercase tracking-widest text-slate-900 border-b border-slate-900 pb-0.5 text-center">
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 text-[11px] text-slate-700 font-sans">
              {(useFlowPersona ? flowcvPersona.skills : skillList.slice(0, 8)).map((sk: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0" />
                  <span>{sk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Languages & Certificates */}
          <div className="grid grid-cols-2 gap-8 pt-2.5 border-t border-slate-900 font-sans text-[11px]">
            <div>
              <span className="font-bold text-slate-900 block uppercase text-[11px] tracking-wider mb-2">Languages</span>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex justify-between items-center pr-2">
                  <span>English</span>
                  {renderRatingDots(5)}
                </div>
                <div className="flex justify-between items-center pr-2">
                  <span>Irish</span>
                  {renderRatingDots(5)}
                </div>
              </div>
            </div>
            <div>
              <span className="font-bold text-slate-900 block uppercase text-[11px] tracking-wider mb-2">Certificates</span>
              <div className="flex flex-col gap-1 text-[10.5px] text-slate-700">
                <span>• Professional Scrum Product Owner I (PSPO I)</span>
                <span>• Certified ScrumMaster (CSM)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          32. FLOWCV EDITORIAL RULE (Clean Horizontal Hairlines - Lena Hoffmann Reference)
         ========================================================================= */}
      {templateId === 'flowcv_editorial_rule' && (
        <div className="h-full min-h-[1055px] flex flex-col justify-between font-sans text-slate-900">
          {/* Header */}
          <div className="text-center border-b-2 border-slate-900 pb-3.5">
            <h1 className="text-[28px] font-bold uppercase tracking-tight text-slate-950">
              {useFlowPersona ? flowcvPersona.fullName : fullName}
            </h1>
            <p className="text-[13px] font-medium text-slate-600 mt-0.5">
              {useFlowPersona ? flowcvPersona.title : candidateRole}
            </p>
            <div className="text-[11px] text-slate-600 flex justify-center flex-wrap gap-4 mt-2">
              <span>{useFlowPersona ? flowcvPersona.location : location}</span>
              <span>•</span>
              <span>{useFlowPersona ? flowcvPersona.email : email}</span>
              <span>•</span>
              <span>{useFlowPersona ? flowcvPersona.phone : phone}</span>
              <span>•</span>
              <span>{useFlowPersona ? flowcvPersona.linkedin : linkedin}</span>
            </div>
          </div>

          {/* Summary */}
          <div className="flex flex-col gap-1 border-b border-slate-300 pb-3">
            <span className="text-[11.5px] font-bold uppercase tracking-wider text-slate-500">Summary</span>
            <p className="text-[11px] text-slate-800 leading-relaxed">
              {useFlowPersona ? flowcvPersona.summary : summary}
            </p>
          </div>

          {/* Professional Experience */}
          <div className="flex flex-col gap-2.5 border-b border-slate-300 pb-3">
            <span className="text-[11.5px] font-bold uppercase tracking-wider text-slate-500">Professional Experience</span>
            <div className="flex flex-col gap-3.5">
              {(useFlowPersona ? flowcvPersona.experiences : expList).slice(0, 3).map((exp: any, idx: number) => (
                <div key={exp.id || idx} className="flex flex-col gap-1 text-[11px]">
                  <div className="flex justify-between items-baseline font-bold text-slate-950">
                    <span>{exp.company}, <span className="font-medium text-slate-700 italic">{exp.role}</span></span>
                    <span className="text-slate-500 text-[10.5px] font-normal">{exp.startDate} – {exp.endDate} | {exp.location || 'Berlin'}</span>
                  </div>
                  <ul className="list-disc list-outside ml-4 text-slate-700 flex flex-col gap-1 leading-relaxed">
                    {exp.bullets?.map((b: string, bIdx: number) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Key Projects */}
          {projList.length > 0 && (
            <div className="flex flex-col gap-2 border-b border-slate-300 pb-3">
              <span className="text-[11.5px] font-bold uppercase tracking-wider text-slate-500">Key Projects</span>
              <div className="grid grid-cols-2 gap-4 text-[11px]">
                {projList.slice(0, 2).map((proj, idx) => (
                  <div key={idx} className="flex flex-col gap-0.5">
                    <span className="font-bold text-slate-900">{proj.name}</span>
                    <p className="text-slate-600 leading-relaxed text-[10.5px]">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          <div className="flex flex-col gap-2 border-b border-slate-300 pb-3">
            <span className="text-[11.5px] font-bold uppercase tracking-wider text-slate-500">Education</span>
            {(useFlowPersona ? flowcvPersona.education : eduList).slice(0, 2).map((edu: any, idx: number) => (
              <div key={edu.id || idx} className="flex justify-between items-baseline text-[11px]">
                <div>
                  <span className="font-bold text-slate-900">{edu.institution}</span>
                  <span className="text-slate-600 ml-2">— {edu.degree}</span>
                </div>
                <span className="text-slate-500 text-[10.5px]">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="flex flex-col gap-1.5 border-b border-slate-300 pb-3">
            <span className="text-[11.5px] font-bold uppercase tracking-wider text-slate-500">Skills</span>
            <p className="text-[10.5px] text-slate-800 leading-relaxed font-medium">
              {(useFlowPersona ? flowcvPersona.skills : skillList.slice(0, 14)).join(' | ')}
            </p>
          </div>

          {/* Languages & Certificates */}
          <div className="grid grid-cols-2 gap-4 text-[11px]">
            <div>
              <span className="text-[11.5px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Languages</span>
              <span className="text-slate-800">German (Native) | English (Fluent) | French (Conversational)</span>
            </div>
            <div>
              <span className="text-[11.5px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Certificates</span>
              <span className="text-slate-800 text-[10.5px]">Lean Six Sigma Green Belt | APICS | PRINCE2 | SAP Certified</span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          33. FLOWCV PRECISION LINE / TRUE BLUE (Daniel Mercer Reference)
         ========================================================================= */}
      {templateId === 'flowcv_precision_line' && (
        <div className="h-full min-h-[1055px] flex flex-col justify-between font-sans text-slate-800">
          {/* Header */}
          <div className="border-b-2 border-blue-700 pb-3.5">
            <h1 className="text-[28px] font-bold text-blue-700 tracking-tight leading-none">
              {useFlowPersona ? flowcvPersona.fullName : fullName}
            </h1>
            <p className="text-[13px] font-semibold text-slate-700 mt-1">
              {useFlowPersona ? flowcvPersona.title : candidateRole}
            </p>
            <div className="flex items-center flex-wrap gap-4 text-[11px] text-slate-600 mt-2">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                {useFlowPersona ? flowcvPersona.email : email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                {useFlowPersona ? flowcvPersona.phone : phone}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                {useFlowPersona ? flowcvPersona.location : location}
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                {useFlowPersona ? flowcvPersona.linkedin : linkedin}
              </span>
            </div>
          </div>

          {/* Summary */}
          <div className="flex flex-col gap-1">
            <h2 className="text-[12.5px] font-bold text-blue-700 uppercase tracking-wider border-b border-slate-200 pb-0.5">
              Summary
            </h2>
            <p className="text-[11px] text-slate-700 leading-relaxed">
              {useFlowPersona ? flowcvPersona.summary : summary}
            </p>
          </div>

          {/* Professional Experience */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[12.5px] font-bold text-blue-700 uppercase tracking-wider border-b border-slate-200 pb-0.5">
              Professional Experience
            </h2>
            <div className="flex flex-col gap-3.5">
              {(useFlowPersona ? flowcvPersona.experiences : expList).slice(0, 3).map((exp: any, idx: number) => (
                <div key={exp.id || idx} className="flex flex-col gap-1 text-[11px]">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{exp.role}, <span className="text-blue-800">{exp.company}</span></span>
                    <span className="text-slate-500 font-normal text-[10.5px]">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <ul className="list-disc list-outside ml-4 text-slate-700 flex flex-col gap-1 leading-relaxed">
                    {exp.bullets?.map((b: string, bIdx: number) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Key Projects */}
          {projList.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <h2 className="text-[12.5px] font-bold text-blue-700 uppercase tracking-wider border-b border-slate-200 pb-0.5">
                Featured Projects
              </h2>
              <div className="grid grid-cols-2 gap-4 text-[11px]">
                {projList.slice(0, 2).map((proj, idx) => (
                  <div key={idx} className="flex flex-col gap-0.5">
                    <span className="font-bold text-slate-900">{proj.name}</span>
                    <p className="text-slate-600 leading-relaxed text-[10.5px]">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[12.5px] font-bold text-blue-700 uppercase tracking-wider border-b border-slate-200 pb-0.5">
              Education
            </h2>
            <div className="flex flex-col gap-1.5">
              {(useFlowPersona ? flowcvPersona.education : eduList).slice(0, 2).map((edu: any, idx: number) => (
                <div key={edu.id || idx} className="flex justify-between items-baseline text-[11px]">
                  <div>
                    <span className="font-bold text-slate-900">{edu.degree}</span>
                    <span className="text-slate-600 ml-2">, {edu.institution}</span>
                  </div>
                  <span className="text-slate-500 text-[10.5px]">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[12.5px] font-bold text-blue-700 uppercase tracking-wider border-b border-slate-200 pb-0.5">
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[11px] text-slate-700">
              {(useFlowPersona ? flowcvPersona.skills : skillList.slice(0, 8)).map((sk: string, idx: number) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-700 shrink-0" />
                  <span>{sk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Languages & Certificates */}
          <div className="grid grid-cols-2 gap-6 pt-2 border-t border-slate-200 text-[11px]">
            <div>
              <span className="font-bold text-blue-700 uppercase text-[11.5px] block mb-1">Languages</span>
              <div className="flex flex-col gap-0.5 text-slate-700">
                <span>English (Native)</span>
                <span>Spanish (Proficient)</span>
              </div>
            </div>
            <div>
              <span className="font-bold text-blue-700 uppercase text-[11.5px] block mb-1">Certificates</span>
              <div className="flex flex-col gap-0.5 text-slate-700 text-[10.5px]">
                <span>Certified Sales Leadership Professional</span>
                <span>HubSpot Sales Software Certification</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          34. FLOWCV SILVER BANNER (Sleek Slate Corporate Header)
         ========================================================================= */}
      {templateId === 'flowcv_silver_banner' && (
        <div className="flex flex-col h-full min-h-[1123px] w-full text-slate-800">
          <div className="bg-[#334155] text-white p-8 pb-6">
            <h1 className="text-[28px] font-black tracking-tight uppercase leading-none">
              {fullName || 'YOUR NAME'}
            </h1>
            <p className="text-[13px] font-bold text-slate-200 mt-1.5">{candidateRole}</p>
            <div className="text-[11px] text-slate-300 flex flex-wrap gap-4 mt-2.5 font-medium">
              {email && <span>{email}</span>}
              {phone && <span>• {phone}</span>}
              {location && <span>• {location}</span>}
              {linkedin && <span>• {linkedin}</span>}
            </div>
          </div>

          <div className="p-8 pt-5 flex-1 flex flex-col justify-between">
            {summary && (
              <div className="flex flex-col gap-1 border-b border-slate-200 pb-3">
                <span className="text-[12px] font-black uppercase text-[#334155] tracking-wider">Executive Overview</span>
                <p className="text-[11px] text-slate-700 leading-relaxed">{summary}</p>
              </div>
            )}

            {expList.length > 0 && (
              <div className="flex flex-col gap-2 border-b border-slate-200 pb-3">
                <h2 className="text-[12.5px] font-black uppercase text-[#334155] tracking-wider">
                  Experience & Leadership
                </h2>
                <div className="flex flex-col gap-3.5">
                  {expList.slice(0, 3).map((exp) => (
                    <div key={exp.id} className="flex flex-col gap-1 text-[11px]">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{exp.role} — <span className="text-[#334155]">{exp.company}</span></span>
                        <span className="text-slate-500 font-normal text-[10.5px]">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      {exp.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-700 flex flex-col gap-1 mt-0.5 leading-relaxed">
                          {exp.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projList.length > 0 && (
              <div className="flex flex-col gap-2 border-b border-slate-200 pb-3">
                <h3 className="text-[12px] font-black uppercase text-[#334155] tracking-wider">
                  Featured Projects
                </h3>
                <div className="grid grid-cols-2 gap-4 text-[11px]">
                  {projList.slice(0, 2).map((proj, idx) => (
                    <div key={idx} className="flex flex-col gap-0.5">
                      <span className="font-bold text-slate-900">{proj.name}</span>
                      <p className="text-slate-600 text-[10.5px] leading-relaxed">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-6 pt-2">
              {skillList.length > 0 && (
                <div>
                  <h3 className="text-[12px] font-black uppercase text-[#334155] tracking-wider mb-2">
                    Skills & Core Competencies
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skillList.slice(0, 12).map((sk, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded text-[10px] font-bold border border-slate-200">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {eduList.length > 0 && (
                <div>
                  <h3 className="text-[12px] font-black uppercase text-[#334155] tracking-wider mb-2">
                    Academic Background
                  </h3>
                  {eduList.slice(0, 2).map((edu) => (
                    <div key={edu.id} className="text-[11px] mb-2">
                      <span className="font-bold text-slate-900 block">{edu.institution}</span>
                      <span className="text-slate-600">{edu.degree}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          35. TEALHQ EXECUTIVE LEADERSHIP (Dark Teal #115E59)
         ========================================================================= */}
      {templateId === 'teal_executive' && (
        <div className="flex flex-col h-full min-h-[1123px] w-full text-slate-800">
          <div className="bg-[#115E59] text-white p-8 pb-6">
            <span className="text-[9.5px] font-black tracking-widest uppercase text-teal-200 bg-teal-800/80 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
              TEALHQ EXECUTIVE C-SUITE
            </span>
            <h1 className="text-[28px] font-black tracking-tight uppercase leading-none text-white">
              {fullName || 'YOUR NAME'}
            </h1>
            <p className="text-[13px] font-bold text-teal-100 mt-1.5">{candidateRole}</p>
            <div className="text-[11px] text-teal-200 flex flex-wrap gap-4 mt-2.5 font-medium">
              {email && <span>{email}</span>}
              {phone && <span>• {phone}</span>}
              {location && <span>• {location}</span>}
              {linkedin && <span>• {linkedin}</span>}
            </div>
          </div>

          <div className="p-8 pt-5 flex-1 flex flex-col justify-between">
            {summary && (
              <div className="bg-teal-50/70 border-l-4 border-[#115E59] p-3 rounded-r">
                <p className="text-[11px] text-slate-800 leading-relaxed font-medium">{summary}</p>
              </div>
            )}

            {expList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-[12.5px] font-black uppercase text-[#115E59] tracking-wider border-b-2 border-teal-200 pb-0.5">
                  Executive Career History
                </h2>
                <div className="flex flex-col gap-3.5">
                  {expList.slice(0, 3).map((exp) => (
                    <div key={exp.id} className="flex flex-col gap-1 text-[11px]">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{exp.role} — <span className="text-[#115E59]">{exp.company}</span></span>
                        <span className="text-slate-500 font-normal text-[10.5px]">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      {exp.bullets && (
                        <ul className="list-disc list-outside ml-4 text-slate-700 flex flex-col gap-1 mt-0.5 leading-relaxed">
                          {exp.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projList.length > 0 && (
              <div className="flex flex-col gap-2 border-t border-teal-100 pt-2">
                <h3 className="text-[12px] font-black uppercase text-[#115E59] tracking-wider">
                  High-Impact Initiatives
                </h3>
                <div className="grid grid-cols-2 gap-4 text-[11px]">
                  {projList.slice(0, 2).map((proj, idx) => (
                    <div key={idx} className="flex flex-col gap-0.5 bg-teal-50/40 p-2.5 rounded border border-teal-100">
                      <span className="font-bold text-slate-900">{proj.name}</span>
                      <p className="text-slate-700 text-[10.5px] leading-relaxed">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-6 pt-2 border-t border-teal-100">
              {skillList.length > 0 && (
                <div>
                  <h3 className="text-[12px] font-black uppercase text-[#115E59] tracking-wider mb-2">
                    Core Competencies
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skillList.slice(0, 12).map((sk, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-teal-50 text-teal-900 border border-teal-200 rounded text-[10px] font-bold">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {eduList.length > 0 && (
                <div>
                  <h3 className="text-[12px] font-black uppercase text-[#115E59] tracking-wider mb-2">
                    Education & Credentials
                  </h3>
                  {eduList.slice(0, 2).map((edu) => (
                    <div key={edu.id} className="text-[11px] mb-2">
                      <span className="font-bold text-slate-900 block">{edu.institution}</span>
                      <span className="text-slate-600">{edu.degree}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

