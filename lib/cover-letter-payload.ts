import { json_within, limits, text } from '@/lib/validate';

type LetterRow = {
  id: string;
  title: string;
  templateId: string;
  contentJson: string;
  createdAt: Date;
  updatedAt: Date;
};

const parse_content = (json: string) => {
  try {
    const parsed = JSON.parse(json);
    return parsed && typeof parsed === 'object' ? parsed as Record<string, unknown> : {};
  } catch {
    return {};
  }
};

export const letter_payload = (row: LetterRow) => ({
  id: row.id,
  title: row.title,
  templateId: row.templateId,
  updatedAt: row.updatedAt.toISOString(),
  createdAt: row.createdAt.toISOString(),
  ...parse_content(row.contentJson),
});

// Merges request fields over the stored letter. Throws ValidationError on oversized or malformed input.
export const letter_fields = (body: Record<string, unknown>, existing?: LetterRow) => {
  const current = existing ? parse_content(existing.contentJson) : {};
  const content = {
    sender: body.sender ?? current.sender ?? {},
    recipient: body.recipient ?? current.recipient ?? {},
    letterDetails: body.letterDetails ?? current.letterDetails ?? {},
    style: body.style ?? current.style ?? {},
  };
  return {
    title: text(body.title, limits.title, existing?.title ?? 'Cover letter'),
    templateId: text(body.templateId, limits.shortField, existing?.templateId ?? 'classic_left'),
    contentJson: JSON.stringify(json_within(content)),
  };
};
