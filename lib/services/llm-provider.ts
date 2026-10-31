/**
 * ============================================================================
 * 🧠 UNIFIED MULTI-PROVIDER LLM ENGINE (GROQ LPU + NVIDIA NIM + OPENROUTER)
 * ============================================================================
 * High-throughput, resilient AI execution with automated fallback & latency optimization.
 */

export interface LLMRequestOptions {
  systemPrompt?: string;
  userPrompt: string;
  temperature?: number;
  maxTokens?: number;
  jsonMode?: boolean;
}

export interface LLMResponse {
  content: string;
  json?: any;
  provider: 'groq' | 'nvidia' | 'openrouter' | 'openai' | 'anthropic';
  latencyMs: number;
}

// Each call tries at most this many configured providers, so one request bills at most twice.
const MAX_PROVIDER_ATTEMPTS = 2;

interface ProviderConfig {
  name: LLMResponse['provider'];
  key: string | undefined;
  timeoutMs: number;
  url: string;
  headers: (key: string) => Record<string, string>;
  body: (opts: Required<LLMRequestOptions>) => Record<string, unknown>;
  extract: (jsonRes: ProviderJson) => string;
}

interface ProviderJson {
  choices?: { message?: { content?: string } }[];
  content?: { text?: string }[];
}

const openAiStyleBody = (model: string, supportsJsonMode: boolean) => (opts: Required<LLMRequestOptions>) => {
  const body: Record<string, unknown> = {
    model,
    temperature: opts.temperature,
    max_tokens: opts.maxTokens,
    messages: [
      { role: 'system', content: opts.systemPrompt },
      { role: 'user', content: opts.userPrompt },
    ],
  };
  if (supportsJsonMode && opts.jsonMode) {
    body.response_format = { type: 'json_object' };
  }
  return body;
};

const bearer = (key: string) => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${key}` });
const openAiStyleContent = (jsonRes: ProviderJson) => jsonRes.choices?.[0]?.message?.content || '';

function configuredProviders(): ProviderConfig[] {
  const nvidiaKey = process.env.NVIDIA_API_KEY;
  const providers: ProviderConfig[] = [
    {
      // 1. Primary: Ultra-Fast Groq LPU (Sub-second latency)
      name: 'groq',
      key: process.env.GROQ_API_KEY,
      timeoutMs: 5000,
      url: 'https://api.groq.com/openai/v1/chat/completions',
      headers: bearer,
      body: openAiStyleBody('llama-3.3-70b-versatile', true),
      extract: openAiStyleContent,
    },
    {
      // 2. Secondary: NVIDIA NIM
      name: 'nvidia',
      key: nvidiaKey && nvidiaKey.length > 20 ? nvidiaKey : undefined,
      timeoutMs: 6000,
      url: 'https://integrate.api.nvidia.com/v1/chat/completions',
      headers: bearer,
      body: openAiStyleBody('meta/llama-3.3-70b-instruct', false),
      extract: openAiStyleContent,
    },
    {
      // 3. Tertiary: OpenRouter
      name: 'openrouter',
      key: process.env.OPENROUTER_API_KEY,
      timeoutMs: 6000,
      url: 'https://openrouter.ai/api/v1/chat/completions',
      headers: bearer,
      body: openAiStyleBody('meta-llama/llama-3.3-70b-instruct', false),
      extract: openAiStyleContent,
    },
    {
      // 4. OpenAI fallback
      name: 'openai',
      key: process.env.OPENAI_API_KEY,
      timeoutMs: 6000,
      url: 'https://api.openai.com/v1/chat/completions',
      headers: bearer,
      body: openAiStyleBody('gpt-4o-mini', true),
      extract: openAiStyleContent,
    },
    {
      // 5. Anthropic fallback
      name: 'anthropic',
      key: process.env.ANTHROPIC_API_KEY,
      timeoutMs: 6000,
      url: 'https://api.anthropic.com/v1/messages',
      headers: (key) => ({
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      }),
      body: (opts) => ({
        model: 'claude-3-haiku-20240307',
        max_tokens: opts.maxTokens,
        system: opts.systemPrompt,
        messages: [{ role: 'user', content: opts.userPrompt }],
      }),
      extract: (jsonRes) => jsonRes.content?.[0]?.text || '',
    },
  ];
  return providers.filter((p) => Boolean(p.key));
}

function parseJsonContent(rawContent: string): Pick<LLMResponse, 'content' | 'json'> {
  let content = rawContent;
  if (content.includes('```')) {
    content = content.replace(/```(?:json)?([\s\S]*?)```/g, '$1').trim();
  }
  const match = content.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
  let json = null;
  if (match) {
    try {
      json = JSON.parse(match[0]);
    } catch {}
  }
  return { content, json };
}

export async function executeMultiProviderLLM(options: LLMRequestOptions): Promise<LLMResponse> {
  const opts: Required<LLMRequestOptions> = {
    systemPrompt:
      options.systemPrompt ?? 'You are an elite AI Career & ATS Optimization Engine. Return accurate, professional responses.',
    userPrompt: options.userPrompt,
    temperature: options.temperature ?? 0.2,
    maxTokens: options.maxTokens ?? 3000,
    jsonMode: options.jsonMode ?? true,
  };

  const start = Date.now();
  const providers = configuredProviders().slice(0, MAX_PROVIDER_ATTEMPTS);

  for (const provider of providers) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), provider.timeoutMs);

    try {
      const res = await fetch(provider.url, {
        method: 'POST',
        headers: provider.headers(provider.key as string),
        signal: controller.signal,
        body: JSON.stringify(provider.body(opts)),
      });

      if (!res.ok) {
        // Status only: response bodies can echo prompt content, and headers carry the key.
        console.warn(`LLM provider ${provider.name} returned HTTP ${res.status}, cascading`);
        continue;
      }

      // The abort timer stays armed through body parsing so a stalled stream cannot hang the request.
      const jsonRes = (await res.json()) as ProviderJson;
      const rawContent = provider.extract(jsonRes);
      const { content, json } = opts.jsonMode ? parseJsonContent(rawContent) : { content: rawContent, json: null };

      return {
        content,
        json,
        provider: provider.name,
        latencyMs: Date.now() - start,
      };
    } catch (err) {
      const reason = err instanceof Error ? err.name : 'unknown error';
      console.warn(`LLM provider ${provider.name} attempt failed (${reason}), cascading`);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  throw new Error('All configured LLM providers were unavailable');
}
