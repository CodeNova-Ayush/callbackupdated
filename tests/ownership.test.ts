import assert from 'node:assert/strict';
import { owned_resume_where } from '../lib/services/resume-service';
import { build_agent_prompt } from '../backend/services/rag-agent-service';

const where = owned_resume_where('user-a', 'resume-b');
assert.equal(where.userId, 'user-a');
assert.equal(where.id, 'resume-b');
assert.equal(owned_resume_where('user-a', 'resume-b').userId === 'user-c', false);

const prompt = build_agent_prompt('What did you ship?', 'Name: Ada\nExperience: Compiler');
assert.equal(prompt.question, 'What did you ship?');
assert.equal('personalInfo' in prompt, false);
assert.match(prompt.context_summary, /Ada/);

console.log('ownership and agent prompt checks passed');
