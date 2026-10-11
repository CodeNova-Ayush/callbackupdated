import { NextResponse } from 'next/server';
import { executeMultiProviderLLM } from '@/lib/services/llm-provider';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      role = 'Senior Professional',
      company = 'Target Company',
      candidateName = 'Alex Taylor',
      experience = '',
      tone = 'professional',
    } = body;

    const prompt = `You are an elite executive career coach and cover letter specialist.
Generate a tailored, persuasive, modern cover letter for:
Candidate Name: ${candidateName}
Target Role: ${role}
Target Company: ${company}
Key Experience / Background: ${experience || 'Extensive leadership, strategic execution, cross-functional collaboration, and measurable business impact.'}
Tone: ${tone}

Requirements:
1. Write 3-4 cohesive paragraphs.
2. Paragraph 1: Express strong interest in the ${role} position at ${company}, hook the reader, and introduce core value proposition.
3. Paragraph 2: Showcase 2-3 specific accomplishments with quantifiable metrics or structured problem-solving approach.
4. Paragraph 3: Explain why ${company}'s mission, products, or culture resonates with the candidate.
5. Paragraph 4: Confident, gracious closing inviting an interview discussion.

Return ONLY a valid JSON object matching this schema:
{
  "subject": "Application for ${role}",
  "salutation": "Dear Hiring Team,",
  "paragraphs": [
    "Paragraph 1 text...",
    "Paragraph 2 text...",
    "Paragraph 3 text...",
    "Paragraph 4 text..."
  ],
  "signOff": "Sincerely,"
}`;

    try {
      const llmRes = await executeMultiProviderLLM({
        systemPrompt: 'You are an elite cover letter writer. Return pure JSON only with no extra commentary.',
        userPrompt: prompt,
        jsonMode: true,
        maxTokens: 1000,
        temperature: 0.3,
      });

      const parsed = llmRes.json;
      if (parsed && Array.isArray(parsed.paragraphs) && parsed.paragraphs.length > 0) {
        return NextResponse.json(parsed);
      }
    } catch (llmError) {
      console.warn('[CoverLetterAI] LLM failed, using intelligent algorithmic template fallback:', llmError);
    }

    // Intelligent Fallback if LLM times out or is offline
    return NextResponse.json({
      subject: `Application for ${role}`,
      salutation: 'Dear Hiring Team,',
      paragraphs: [
        `I am writing to express my enthusiastic interest in the ${role} position at ${company}. With my background in strategic execution, high-impact problem solving, and driving cross-functional initiatives, I am eager to contribute directly to ${company}'s continued growth and innovation.`,
        `In my recent professional experience, I have spearheaded core projects that delivered measurable business results. By adopting a structured, data-informed methodology and focusing on scalable processes, I consistently streamlined workflows, elevated team performance, and exceeded key performance benchmarks.`,
        `What particularly attracts me to ${company} is your commitment to pushing industry standards forward. The prospect of applying my skills within your collaborative and forward-thinking environment is exceptionally motivating.`,
        `I would welcome the opportunity to discuss how my qualifications align with your strategic objectives for the ${role} position. Thank you for your time and consideration.`,
      ],
      signOff: 'Sincerely,',
    });
  } catch (error) {
    console.error('Cover letter AI route error:', error);
    return NextResponse.json({ error: 'Failed to generate cover letter' }, { status: 500 });
  }
}
