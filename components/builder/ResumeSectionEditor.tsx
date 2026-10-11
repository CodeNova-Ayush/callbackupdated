'use client';

import React from 'react';
import { Plus, Trash2, Sparkles, RefreshCw, ChevronLeft, ChevronRight, Eye, Volume2, Mic, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { VoiceDictationButton, VoiceReadbackButton } from '@/components/builder/VoiceControls';
import { ResumeData } from '@/components/builder/ResumeTemplates';

interface ResumeSectionEditorProps {
  activeSection: string;
  personalInfo: ResumeData['personalInfo'];
  setPersonalInfo: React.Dispatch<React.SetStateAction<ResumeData['personalInfo']>>;
  experiences: ResumeData['experiences'];
  setExperiences: React.Dispatch<React.SetStateAction<ResumeData['experiences']>>;
  projects: ResumeData['projects'];
  setProjects: React.Dispatch<React.SetStateAction<ResumeData['projects']>>;
  education: ResumeData['education'];
  setEducation: React.Dispatch<React.SetStateAction<ResumeData['education']>>;
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
  newSkillInput: string;
  setNewSkillInput: (val: string) => void;
  handleAddSkill: () => void;
  handleRemoveSkill: (skill: string) => void;
  handleEnhanceBullet: (sectionType: 'experience' | 'projects', itemIdx: number, bulletIdx: number, originalText: string) => void;
  isEnhancing: string | null;
  isMobileView?: boolean;
  handlePrevSection?: () => void;
  handleNextSection?: () => void;
  onPreviewClick?: () => void;
  sectionTitle?: string;
  onFinishResume?: () => void;
}

export function ResumeSectionEditor({
  activeSection,
  personalInfo,
  setPersonalInfo,
  experiences,
  setExperiences,
  projects,
  setProjects,
  education,
  setEducation,
  skills,
  setSkills,
  newSkillInput,
  setNewSkillInput,
  handleAddSkill,
  handleRemoveSkill,
  handleEnhanceBullet,
  isEnhancing,
  isMobileView = false,
  handlePrevSection,
  handleNextSection,
  onPreviewClick,
  sectionTitle,
  onFinishResume,
}: ResumeSectionEditorProps) {
  // Compute text to read back for the active section
  const getSectionAudioSummary = () => {
    switch (activeSection) {
      case 'personal_info':
        return personalInfo.summary || `${personalInfo.fullName || 'Candidate'}. ${personalInfo.location || ''}`;
      case 'experience':
        return experiences
          .map((e) => `${e.role || 'Role'} at ${e.company || 'Company'}. ${e.bullets.filter(Boolean).join('. ')}`)
          .join('. ');
      case 'projects':
        return projects
          .map((p) => `${p.title || 'Project'}. Tech stack: ${p.techStack || 'none'}. ${p.bullets.filter(Boolean).join('. ')}`)
          .join('. ');
      case 'education':
        return education
          .map((ed) => `${ed.degree || 'Degree'} from ${ed.institution || 'University'}.`)
          .join('. ');
      case 'skills':
        return `Technical competencies and skills: ${skills.join(', ')}`;
      default:
        return '';
    }
  };

  const sectionOrder = ['personal_info', 'experience', 'projects', 'education', 'skills'];
  const currentIdx = sectionOrder.indexOf(activeSection);
  const stepNum = currentIdx >= 0 ? currentIdx + 1 : 1;
  const totalSteps = sectionOrder.length;
  const displayTitle = sectionTitle || activeSection.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className={`flex flex-col ${isMobileView ? 'gap-4 pb-12' : 'gap-5'}`}>
      {/* Sleek Minimal Audio Utility Strip */}
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-50/80 border border-slate-200/70 rounded-xl text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-semibold text-slate-700">Voice Dictation Ready</span>
          <span className="text-[10px] text-slate-400 hidden sm:inline">• tap 🎙️ in any field</span>
        </div>
        <VoiceReadbackButton
          textToSpeak={getSectionAudioSummary()}
          size="xs"
          label="Listen"
          title="Listen to full audio readback of this section"
        />
      </div>

      {/* Section Header with Stepper & Dynamic Primary Action */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
        <div className="flex flex-col">
          <span className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-400">
            Step {stepNum} of {totalSteps}
          </span>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            {displayTitle}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {activeSection === 'experience' && (
            <button
              type="button"
              onClick={() =>
                setExperiences([
                  ...experiences,
                  {
                    id: `exp-${Date.now()}`,
                    role: '',
                    company: '',
                    location: '',
                    startDate: '',
                    endDate: 'Present',
                    bullets: [''],
                  },
                ])
              }
              className="h-8.5 px-3 text-xs font-bold bg-[#10B981] hover:bg-[#059669] text-white rounded-xl shadow-2xs flex items-center gap-1 cursor-pointer transition-colors shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Role</span>
            </button>
          )}

          {activeSection === 'projects' && (
            <button
              type="button"
              onClick={() =>
                setProjects([
                  ...projects,
                  {
                    id: `proj-${Date.now()}`,
                    title: '',
                    techStack: '',
                    link: '',
                    bullets: [''],
                  },
                ])
              }
              className="h-8.5 px-3 text-xs font-bold bg-[#10B981] hover:bg-[#059669] text-white rounded-xl shadow-2xs flex items-center gap-1 cursor-pointer transition-colors shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Project</span>
            </button>
          )}

          {activeSection === 'education' && (
            <button
              type="button"
              onClick={() =>
                setEducation([
                  ...education,
                  {
                    id: `edu-${Date.now()}`,
                    institution: '',
                    degree: '',
                    location: '',
                    startDate: '',
                    endDate: '',
                    gpa: '',
                  },
                ])
              }
              className="h-8.5 px-3 text-xs font-bold bg-[#10B981] hover:bg-[#059669] text-white rounded-xl shadow-2xs flex items-center gap-1 cursor-pointer transition-colors shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Degree</span>
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          1. PERSONAL INFORMATION
         ========================================================================= */}
      {activeSection === 'personal_info' && (
        <div className="flex flex-col gap-4">
          <div className={`grid ${isMobileView ? 'grid-cols-1 sm:grid-cols-2 gap-3' : 'grid-cols-2 gap-4'}`}>
            <Input
              placeholder="e.g. Jane Doe"
              label="Full Name"
              value={personalInfo.fullName}
              onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
              rightAction={
                <VoiceDictationButton
                  onTranscript={(text) => setPersonalInfo({ ...personalInfo, fullName: text })}
                  currentValue={personalInfo.fullName}
                  mode="replace"
                  size="xs"
                  title="Speak full name"
                />
              }
            />
            <Input
              placeholder="e.g. jane@example.com"
              label="Email Address"
              value={personalInfo.email}
              onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
            />
            <Input
              placeholder="e.g. +1 (555) 012-3456"
              label="Phone Number"
              value={personalInfo.phone}
              onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
              rightAction={
                <VoiceDictationButton
                  onTranscript={(text) => setPersonalInfo({ ...personalInfo, phone: text })}
                  currentValue={personalInfo.phone}
                  mode="replace"
                  size="xs"
                  title="Speak phone number"
                />
              }
            />
            <Input
              placeholder="e.g. San Francisco, CA"
              label="Location"
              value={personalInfo.location}
              onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
              rightAction={
                <VoiceDictationButton
                  onTranscript={(text) => setPersonalInfo({ ...personalInfo, location: text })}
                  currentValue={personalInfo.location}
                  mode="replace"
                  size="xs"
                  title="Speak location"
                />
              }
            />
            <Input
              placeholder="linkedin.com/in/username"
              label="LinkedIn URL"
              value={personalInfo.linkedin}
              onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
            />
            <Input
              placeholder="github.com/username"
              label="GitHub URL"
              value={personalInfo.github}
              onChange={(e) => setPersonalInfo({ ...personalInfo, github: e.target.value })}
            />
          </div>

          <Textarea
            placeholder="Briefly describe your career background and key achievements..."
            label="Professional Summary"
            rows={isMobileView ? 4 : 5}
            value={personalInfo.summary}
            onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
            rightAction={
              <div className="flex items-center gap-1.5">
                <VoiceDictationButton
                  onTranscript={(text) => setPersonalInfo({ ...personalInfo, summary: text })}
                  currentValue={personalInfo.summary}
                  mode="append"
                  label="Dictate"
                  size="xs"
                  title="Speak to dictate summary"
                />
                <VoiceReadbackButton
                  textToSpeak={personalInfo.summary}
                  size="xs"
                  label="Listen"
                  title="Listen to summary audio readback"
                />
              </div>
            }
          />
        </div>
      )}

      {/* =========================================================================
          2. WORK EXPERIENCE
         ========================================================================= */}
      {activeSection === 'experience' && (
        <div className="flex flex-col gap-4">

          {experiences.map((exp, expIdx) => (
            <div
              key={exp.id || expIdx}
              className="p-3.5 sm:p-4 bg-slate-50/80 rounded-2xl border border-slate-200/90 flex flex-col gap-3 shadow-2xs"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-slate-800">Role #{expIdx + 1}</span>
                <button
                  type="button"
                  onClick={() => setExperiences(experiences.filter((_, i) => i !== expIdx))}
                  className="text-xs text-rose-500 hover:text-rose-700 font-bold cursor-pointer"
                >
                  Delete
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Job Title / Role"
                  placeholder="Senior Software Engineer"
                  value={exp.role}
                  onChange={(e) => {
                    const updated = [...experiences];
                    updated[expIdx].role = e.target.value;
                    setExperiences(updated);
                  }}
                  rightAction={
                    <VoiceDictationButton
                      onTranscript={(text) => {
                        const updated = [...experiences];
                        updated[expIdx].role = text;
                        setExperiences(updated);
                      }}
                      currentValue={exp.role}
                      mode="replace"
                      size="xs"
                      title="Speak job title"
                    />
                  }
                />
                <Input
                  label="Company Name"
                  placeholder="Acme Corp"
                  value={exp.company}
                  onChange={(e) => {
                    const updated = [...experiences];
                    updated[expIdx].company = e.target.value;
                    setExperiences(updated);
                  }}
                  rightAction={
                    <VoiceDictationButton
                      onTranscript={(text) => {
                        const updated = [...experiences];
                        updated[expIdx].company = text;
                        setExperiences(updated);
                      }}
                      currentValue={exp.company}
                      mode="replace"
                      size="xs"
                      title="Speak company name"
                    />
                  }
                />
                <Input
                  label="Location"
                  placeholder="San Francisco, CA"
                  value={exp.location || ''}
                  onChange={(e) => {
                    const updated = [...experiences];
                    updated[expIdx].location = e.target.value;
                    setExperiences(updated);
                  }}
                  rightAction={
                    <VoiceDictationButton
                      onTranscript={(text) => {
                        const updated = [...experiences];
                        updated[expIdx].location = text;
                        setExperiences(updated);
                      }}
                      currentValue={exp.location}
                      mode="replace"
                      size="xs"
                      title="Speak location"
                    />
                  }
                />
                <Input
                  label="Dates"
                  placeholder="Jan 2022 - Present"
                  value={exp.endDate ? `${exp.startDate} - ${exp.endDate}` : exp.startDate}
                  onChange={(e) => {
                    const updated = [...experiences];
                    updated[expIdx].endDate = e.target.value;
                    setExperiences(updated);
                  }}
                />
              </div>

              {/* Accomplishment Bullets with Voice Dictation & Readback */}
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                    Accomplishment Bullets
                  </span>
                  <span className="text-[10px] text-teal-700 font-bold">
                    🎙️ Voice dictation ready
                  </span>
                </div>

                {exp.bullets.map((b, bIdx) => (
                  <div key={bIdx} className="flex gap-1.5 sm:gap-2 items-start">
                    <textarea
                      rows={2}
                      value={b}
                      onChange={(e) => {
                        const updated = [...experiences];
                        updated[expIdx].bullets[bIdx] = e.target.value;
                        setExperiences(updated);
                      }}
                      placeholder="Architected distributed backend pipelines delivering 40% latency reduction..."
                      className="flex-1 text-xs p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#1C152E] leading-relaxed resize-y"
                    />
                    <VoiceDictationButton
                      onTranscript={(spoken) => {
                        const updated = [...experiences];
                        const prev = updated[expIdx].bullets[bIdx] || '';
                        updated[expIdx].bullets[bIdx] = prev ? `${prev} ${spoken}` : spoken;
                        setExperiences(updated);
                      }}
                      currentValue={b}
                      mode="append"
                      size="sm"
                      title="Speak to dictate into this bullet point"
                    />
                    <VoiceReadbackButton
                      textToSpeak={b}
                      size="sm"
                      title="Listen to audio preview of this bullet point"
                    />
                    <button
                      type="button"
                      title="Enhance with AI"
                      onClick={() => handleEnhanceBullet('experience', expIdx, bIdx, b)}
                      disabled={isEnhancing === `experience-${expIdx}-${bIdx}`}
                      className="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl border border-indigo-200/80 transition-colors cursor-pointer shrink-0"
                    >
                      {isEnhancing === `experience-${expIdx}-${bIdx}` ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Sparkles className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...experiences];
                        updated[expIdx].bullets = updated[expIdx].bullets.filter((_, i) => i !== bIdx);
                        setExperiences(updated);
                      }}
                      className="p-2 text-slate-400 hover:text-rose-500 rounded-xl cursor-pointer shrink-0"
                      title="Delete bullet point"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    const updated = [...experiences];
                    updated[expIdx].bullets.push('');
                    setExperiences(updated);
                  }}
                  className="text-xs font-bold text-[#10B981] hover:text-[#059669] self-start flex items-center gap-1 cursor-pointer mt-1"
                >
                  <Plus className="w-3 h-3" /> Add Bullet Point
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              setExperiences([
                ...experiences,
                {
                  id: `exp-${Date.now()}`,
                  role: '',
                  company: '',
                  location: '',
                  startDate: '',
                  endDate: 'Present',
                  bullets: [''],
                },
              ])
            }
            className="w-full py-2.5 border-2 border-dashed border-slate-200 hover:border-[#10B981] hover:bg-[#10B981]/5 text-slate-600 hover:text-[#059669] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Another Role
          </button>
        </div>
      )}

      {/* =========================================================================
          3. PROJECTS & WORK
         ========================================================================= */}
      {activeSection === 'projects' && (
        <div className="flex flex-col gap-4">

          {projects.map((proj, projIdx) => (
            <div
              key={proj.id || projIdx}
              className="p-3.5 sm:p-4 bg-slate-50/80 rounded-2xl border border-slate-200/90 flex flex-col gap-3 shadow-2xs"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-slate-800">Project #{projIdx + 1}</span>
                <button
                  type="button"
                  onClick={() => setProjects(projects.filter((_, i) => i !== projIdx))}
                  className="text-xs text-rose-500 hover:text-rose-700 font-bold cursor-pointer"
                >
                  Delete
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Project Name"
                  placeholder="Autonomous Agent Orchestrator"
                  value={proj.title}
                  onChange={(e) => {
                    const updated = [...projects];
                    updated[projIdx].title = e.target.value;
                    setProjects(updated);
                  }}
                  rightAction={
                    <VoiceDictationButton
                      onTranscript={(text) => {
                        const updated = [...projects];
                        updated[projIdx].title = text;
                        setProjects(updated);
                      }}
                      currentValue={proj.title}
                      mode="replace"
                      size="xs"
                      title="Speak project name"
                    />
                  }
                />
                <Input
                  label="Technologies Used"
                  placeholder="Next.js 16, TypeScript, pgvector"
                  value={proj.techStack || ''}
                  onChange={(e) => {
                    const updated = [...projects];
                    updated[projIdx].techStack = e.target.value;
                    setProjects(updated);
                  }}
                  rightAction={
                    <VoiceDictationButton
                      onTranscript={(text) => {
                        const updated = [...projects];
                        updated[projIdx].techStack = text;
                        setProjects(updated);
                      }}
                      currentValue={proj.techStack}
                      mode="replace"
                      size="xs"
                      title="Speak tech stack"
                    />
                  }
                />
              </div>

              <Input
                label="Project Link / GitHub"
                placeholder="github.com/org/repo"
                value={proj.link || ''}
                onChange={(e) => {
                  const updated = [...projects];
                  updated[projIdx].link = e.target.value;
                  setProjects(updated);
                }}
              />

              {/* Accomplishment Bullets */}
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                    Accomplishment Bullets
                  </span>
                  <span className="text-[10px] text-teal-700 font-bold">
                    🎙️ Voice dictation ready
                  </span>
                </div>

                {proj.bullets.map((b, bIdx) => (
                  <div key={bIdx} className="flex gap-1.5 sm:gap-2 items-start">
                    <textarea
                      rows={2}
                      value={b}
                      onChange={(e) => {
                        const updated = [...projects];
                        updated[projIdx].bullets[bIdx] = e.target.value;
                        setProjects(updated);
                      }}
                      placeholder="Designed real-time state synchronization across distributed worker nodes..."
                      className="flex-1 text-xs p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#1C152E] leading-relaxed resize-y"
                    />
                    <VoiceDictationButton
                      onTranscript={(spoken) => {
                        const updated = [...projects];
                        const prev = updated[projIdx].bullets[bIdx] || '';
                        updated[projIdx].bullets[bIdx] = prev ? `${prev} ${spoken}` : spoken;
                        setProjects(updated);
                      }}
                      currentValue={b}
                      mode="append"
                      size="sm"
                      title="Speak to dictate bullet"
                    />
                    <VoiceReadbackButton
                      textToSpeak={b}
                      size="sm"
                      title="Listen to audio preview of this bullet"
                    />
                    <button
                      type="button"
                      title="Enhance with AI"
                      onClick={() => handleEnhanceBullet('projects', projIdx, bIdx, b)}
                      disabled={isEnhancing === `projects-${projIdx}-${bIdx}`}
                      className="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl border border-indigo-200/80 transition-colors cursor-pointer shrink-0"
                    >
                      {isEnhancing === `projects-${projIdx}-${bIdx}` ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Sparkles className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...projects];
                        updated[projIdx].bullets = updated[projIdx].bullets.filter((_, i) => i !== bIdx);
                        setProjects(updated);
                      }}
                      className="p-2 text-slate-400 hover:text-rose-500 rounded-xl cursor-pointer shrink-0"
                      title="Delete bullet"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    const updated = [...projects];
                    updated[projIdx].bullets.push('');
                    setProjects(updated);
                  }}
                  className="text-xs font-bold text-[#10B981] hover:text-[#059669] self-start flex items-center gap-1 cursor-pointer mt-1"
                >
                  <Plus className="w-3 h-3" /> Add Bullet Point
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              setProjects([
                ...projects,
                {
                  id: `proj-${Date.now()}`,
                  title: '',
                  techStack: '',
                  link: '',
                  bullets: [''],
                },
              ])
            }
            className="w-full py-2.5 border-2 border-dashed border-slate-200 hover:border-[#10B981] hover:bg-[#10B981]/5 text-slate-600 hover:text-[#059669] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Another Project
          </button>
        </div>
      )}

      {/* =========================================================================
          4. EDUCATION
         ========================================================================= */}
      {activeSection === 'education' && (
        <div className="flex flex-col gap-4">

          {education.map((edu, eduIdx) => (
            <div
              key={edu.id || eduIdx}
              className="p-3.5 sm:p-4 bg-slate-50/80 rounded-2xl border border-slate-200/90 flex flex-col gap-3 shadow-2xs"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-slate-800">Degree #{eduIdx + 1}</span>
                <button
                  type="button"
                  onClick={() => setEducation(education.filter((_, i) => i !== eduIdx))}
                  className="text-xs text-rose-500 hover:text-rose-700 font-bold cursor-pointer"
                >
                  Delete
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="University / Institution"
                  placeholder="Stanford University"
                  value={edu.institution}
                  onChange={(e) => {
                    const updated = [...education];
                    updated[eduIdx].institution = e.target.value;
                    setEducation(updated);
                  }}
                  rightAction={
                    <VoiceDictationButton
                      onTranscript={(text) => {
                        const updated = [...education];
                        updated[eduIdx].institution = text;
                        setEducation(updated);
                      }}
                      currentValue={edu.institution}
                      mode="replace"
                      size="xs"
                      title="Speak university name"
                    />
                  }
                />
                <Input
                  label="Degree / Major"
                  placeholder="M.S. in Computer Science"
                  value={edu.degree}
                  onChange={(e) => {
                    const updated = [...education];
                    updated[eduIdx].degree = e.target.value;
                    setEducation(updated);
                  }}
                  rightAction={
                    <VoiceDictationButton
                      onTranscript={(text) => {
                        const updated = [...education];
                        updated[eduIdx].degree = text;
                        setEducation(updated);
                      }}
                      currentValue={edu.degree}
                      mode="replace"
                      size="xs"
                      title="Speak degree"
                    />
                  }
                />
                <Input
                  label="Location"
                  placeholder="Stanford, CA"
                  value={edu.location || ''}
                  onChange={(e) => {
                    const updated = [...education];
                    updated[eduIdx].location = e.target.value;
                    setEducation(updated);
                  }}
                  rightAction={
                    <VoiceDictationButton
                      onTranscript={(text) => {
                        const updated = [...education];
                        updated[eduIdx].location = text;
                        setEducation(updated);
                      }}
                      currentValue={edu.location}
                      mode="replace"
                      size="xs"
                      title="Speak location"
                    />
                  }
                />
                <Input
                  label="Dates"
                  placeholder="2020 - 2022"
                  value={edu.endDate || edu.startDate}
                  onChange={(e) => {
                    const updated = [...education];
                    updated[eduIdx].endDate = e.target.value;
                    setEducation(updated);
                  }}
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              setEducation([
                ...education,
                {
                  id: `edu-${Date.now()}`,
                  institution: '',
                  degree: '',
                  location: '',
                  startDate: '',
                  endDate: '',
                  gpa: '',
                },
              ])
            }
            className="w-full py-2.5 border-2 border-dashed border-slate-200 hover:border-[#10B981] hover:bg-[#10B981]/5 text-slate-600 hover:text-[#059669] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Another Degree
          </button>
        </div>
      )}

      {/* =========================================================================
          5. SKILLS & TECH STACK
         ========================================================================= */}
      {activeSection === 'skills' && (
        <div className="flex flex-col gap-4">

          <div className="flex gap-2">
            <Input
              placeholder="e.g. Next.js, Python, TypeScript"
              value={newSkillInput}
              onChange={(e) => setNewSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              rightAction={
                <VoiceDictationButton
                  onTranscript={(text) => {
                    const parsed = text
                      .split(/,| and /i)
                      .map((s) => s.trim())
                      .filter(Boolean);
                    if (parsed.length > 0) {
                      setSkills((prev) => Array.from(new Set([...prev, ...parsed])));
                      setNewSkillInput('');
                    }
                  }}
                  size="xs"
                  title="Speak skills separated by commas or 'and'"
                />
              }
              className="flex-1"
            />
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddSkill}
              className="h-[42px] px-5 rounded-xl font-bold bg-[#10B981] hover:bg-[#059669] text-white shrink-0"
            >
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {skills.map((sk) => (
              <span
                key={sk}
                className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs"
              >
                {sk}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(sk)}
                  className="text-emerald-500 hover:text-emerald-800 cursor-pointer text-sm leading-none"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Unified MNC Bottom Wizard Toolbar (Fluid, Zero Clipping, Pixel-Perfect) */}
      <div className="flex items-center gap-3 pt-5 border-t border-slate-200/90 mt-4">
        {currentIdx > 0 && handlePrevSection ? (
          <button
            type="button"
            onClick={handlePrevSection}
            className="h-11 px-4 bg-white hover:bg-slate-50 active:scale-95 text-slate-700 text-xs font-bold rounded-xl border border-slate-200/90 shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer transition-all shrink-0"
          >
            <ChevronLeft className="w-4 h-4 text-slate-500" />
            <span>Back</span>
          </button>
        ) : null}

        {activeSection !== 'skills' && handleNextSection ? (
          <button
            type="button"
            onClick={handleNextSection}
            className="flex-1 h-11 px-5 bg-[#10B981] hover:bg-[#059669] active:scale-98 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm shadow-[#10B981]/25"
          >
            <span>Next Section</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : onFinishResume ? (
          <button
            type="button"
            onClick={onFinishResume}
            className="flex-1 h-11 px-4 bg-[#10B981] hover:bg-[#059669] active:scale-98 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm shadow-[#10B981]/25 min-w-0"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span className="truncate">Complete & Save Resume</span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
