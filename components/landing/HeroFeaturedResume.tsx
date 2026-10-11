'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Globe, CheckCircle2 } from 'lucide-react';

export function HeroFeaturedResume() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.56);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateScale = () => {
      if (containerRef.current) {
        const cw = containerRef.current.clientWidth;
        if (cw > 0) {
          setScale(cw / 794);
        }
      }
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full relative z-10 flex flex-col items-center">
      {/* Floating Trust Micro-Badge */}
      <div className="absolute -top-3.5 -left-3 sm:-left-6 z-20 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg rounded-full px-3.5 py-1.5 flex items-center gap-1.5 text-[11px] font-bold text-slate-800">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
        <span>98.4% ATS Pass Rate</span>
      </div>

      {/* Static Fixed A4 Aspect Ratio Container (No hover effects, no template chooser) */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[380px] sm:max-w-[430px] lg:max-w-[470px] aspect-[794/1123] rounded-2xl overflow-hidden shadow-2xl border border-slate-200/90 bg-white block text-left select-none pointer-events-none"
        style={{ aspectRatio: '794 / 1123' }}
      >
        {/* Fixed Standard A4 Canvas (794px x 1123px) perfectly scaled */}
        <div
          style={{
            width: '794px',
            height: '1123px',
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
          className="relative flex bg-white text-slate-800 font-sans select-none overflow-hidden"
        >
          {/* Left Foliage Accent Strip */}
          <div className="w-[72px] shrink-0 overflow-hidden relative bg-[#1E3A2F]">
            <img
              src="/images/templates/leaves-strip.png"
              alt="Botanical Accent"
              className="w-full h-full object-cover object-center block"
            />
          </div>

          {/* Right Main Resume Body (722px wide) */}
          <div className="flex-1 p-9 flex flex-col justify-between leading-normal text-slate-800">
            {/* 1. Header */}
            <div>
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <h1 className="text-[32px] font-black tracking-tight text-slate-950 font-serif leading-none">
                    Catherine Bale
                  </h1>
                  <p className="text-[16px] text-slate-700 italic font-semibold mt-1">
                    Senior Marketing Manager & Growth Specialist
                  </p>

                  {/* Contact Row */}
                  <div className="mt-3.5 flex flex-col gap-1.5 text-[13px] text-slate-600 font-medium">
                    <div className="flex items-center gap-5 flex-wrap">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        c.bale@bale.com
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        +1 541 754 3010
                      </span>
                    </div>
                    <div className="flex items-center gap-5 flex-wrap">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        22611 Pacific Coast Hwy, Malibu CA 9022
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        linkedin.com/in/cbale
                      </span>
                    </div>
                  </div>
                </div>

                {/* Headshot */}
                <div className="shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-slate-200/90 shadow-xs">
                  <img
                    src="/images/templates/catherine-avatar.png"
                    alt="Catherine Bale"
                    className="w-full h-full object-cover block"
                  />
                </div>
              </div>
            </div>

            {/* 2. Profile Section */}
            <div>
              <div className="border-b-2 border-slate-900 pb-1 mb-2">
                <h2 className="text-[14px] font-extrabold uppercase tracking-wider text-slate-900">
                  Profile
                </h2>
              </div>
              <p className="text-[13px] text-slate-700 leading-relaxed font-normal">
                Results-driven Senior Marketing Specialist with 6+ years spearheading multi-channel customer acquisition and product-led growth initiatives. Proven record driving 38% organic revenue growth, optimizing conversion funnels, and managing cross-functional teams to scale ARR from $2.4M to $8.1M across 14 product releases.
              </p>
            </div>

            {/* 3. Professional Experience */}
            <div>
              <div className="border-b-2 border-slate-900 pb-1 mb-2">
                <h2 className="text-[14px] font-extrabold uppercase tracking-wider text-slate-900">
                  Professional Experience
                </h2>
              </div>

              <div className="flex flex-col gap-3.5">
                {/* Role 1 */}
                <div>
                  <div className="flex items-baseline justify-between text-[13.5px] font-bold text-slate-900">
                    <span>Acme Corporation, <span className="italic font-semibold text-slate-700">Senior Marketing Manager</span></span>
                    <span className="text-[12.5px] font-medium text-slate-500 shrink-0">2021 – Present • Milwaukee, WI</span>
                  </div>
                  <ul className="mt-1 list-disc list-outside ml-4 space-y-1 text-[12.5px] text-slate-700 leading-relaxed">
                    <li>Led integrated GTM campaigns across digital acquisition channels, delivering a 38% lift in marketing pipeline and $2.4M incremental revenue.</li>
                    <li>Architected automated lifecycle email journeys and customer onboarding funnels, increasing active user retention from 52% to 74%.</li>
                    <li>Managed a cross-functional marketing and design team of 5, reducing campaign cycle turnaround by 2 weeks.</li>
                  </ul>
                </div>

                {/* Role 2 */}
                <div>
                  <div className="flex items-baseline justify-between text-[13.5px] font-bold text-slate-900">
                    <span>Global Industries, <span className="italic font-semibold text-slate-700">Growth Marketing Coordinator</span></span>
                    <span className="text-[12.5px] font-medium text-slate-500 shrink-0">2018 – 2021 • Grand Island, NE</span>
                  </div>
                  <ul className="mt-1 list-disc list-outside ml-4 space-y-1 text-[12.5px] text-slate-700 leading-relaxed">
                    <li>Coordinated end-to-end execution of 20+ inbound campaigns, boosting qualified leads by 42% through targeted content syndication.</li>
                    <li>Conducted weekly multivariate A/B testing on high-intent landing pages, achieving a 28% increase in visitor-to-signup conversion.</li>
                  </ul>
                </div>

                {/* Role 3 */}
                <div>
                  <div className="flex items-baseline justify-between text-[13.5px] font-bold text-slate-900">
                    <span>Apex Brand Media, <span className="italic font-semibold text-slate-700">Marketing Associate</span></span>
                    <span className="text-[12.5px] font-medium text-slate-500 shrink-0">2016 – 2018 • Chicago, IL</span>
                  </div>
                  <ul className="mt-1 list-disc list-outside ml-4 space-y-1 text-[12.5px] text-slate-700 leading-relaxed">
                    <li>Managed paid advertising budgets ($450K annual spend) across Google Search & Meta, reducing customer acquisition costs by 22%.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 4. Education */}
            <div>
              <div className="border-b-2 border-slate-900 pb-1 mb-2">
                <h2 className="text-[14px] font-extrabold uppercase tracking-wider text-slate-900">
                  Education
                </h2>
              </div>
              <div className="flex items-baseline justify-between text-[13.5px] font-bold text-slate-900">
                <span>University of Wisconsin, <span className="italic font-semibold text-slate-700">B.S. in Business Marketing</span></span>
                <span className="text-[12.5px] font-medium text-slate-500 shrink-0">2012 – 2016 • Milwaukee, WI</span>
              </div>
              <p className="text-[12.5px] text-slate-600 mt-0.5">
                Magna Cum Laude • Dean's Honor Roll (All Semesters) • President of Student Marketing Association
              </p>
            </div>

            {/* 5. Certificates & Languages */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="border-b-2 border-slate-900 pb-1 mb-2">
                  <h2 className="text-[14px] font-extrabold uppercase tracking-wider text-slate-900">
                    Certificates
                  </h2>
                </div>
                <p className="text-[12.5px] text-slate-700 leading-snug">
                  • Google Analytics 4 (GA4) Certified<br />
                  • HubSpot Inbound Marketing Certified<br />
                  • Reforge Growth Series (2023)
                </p>
              </div>

              <div>
                <div className="border-b-2 border-slate-900 pb-1 mb-2">
                  <h2 className="text-[14px] font-extrabold uppercase tracking-wider text-slate-900">
                    Languages
                  </h2>
                </div>
                <p className="text-[12.5px] text-slate-700 leading-snug">
                  • English (Native C2)<br />
                  • Spanish (Bilingual C2)<br />
                  • French (Conversational B1)
                </p>
              </div>
            </div>

            {/* 6. Skills & Core Competencies (Fills Bottom to Footer Margin) */}
            <div>
              <div className="border-b-2 border-slate-900 pb-1 mb-2">
                <h2 className="text-[14px] font-extrabold uppercase tracking-wider text-slate-900">
                  Skills & Core Competencies
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[12px] text-slate-700 leading-snug">
                <div>
                  <strong className="text-slate-950 font-bold block">Market Research & Strategy</strong>
                  Competitive benchmarking, persona mapping, quantitative surveys, TAM analysis.
                </div>
                <div>
                  <strong className="text-slate-950 font-bold block">Analytical Thinking & CRO</strong>
                  Funnel drop-off optimization, A/B split testing, cohort retention, multi-touch attribution.
                </div>
                <div>
                  <strong className="text-slate-950 font-bold block">Campaign & Project Management</strong>
                  Cross-functional leadership, product launches, agile sprints, budget allocation ($500K+).
                </div>
                <div>
                  <strong className="text-slate-950 font-bold block">Tools & Tech Stack</strong>
                  HubSpot CRM, Google Analytics 4, Meta Ads Manager, Looker, Webflow, Figma.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
