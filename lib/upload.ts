import { extractTextFromDocx, extractTextFromPdf } from '@/lib/services/document-parser';

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

// Multipart overhead on top of the file itself. Checked before request.formData() buffers the body.
const MAX_REQUEST_BYTES = MAX_UPLOAD_BYTES + 1024 * 1024;

export type UploadKind = 'pdf' | 'docx' | 'text';

const file_too_large = () => new Error('FILE_TOO_LARGE');

export const assert_request_size = (request: Request) => {
  const length = Number(request.headers.get('content-length') || 0);
  if (length > MAX_REQUEST_BYTES) throw file_too_large();
};

// Sniffs the bytes rather than trusting the file name. DOCX is a zip, so it starts with PK\x03\x04.
export const detect_upload_kind = (buffer: Buffer): UploadKind | null => {
  if (buffer.subarray(0, 5).toString('latin1') === '%PDF-') return 'pdf';
  if (buffer[0] === 0x50 && buffer[1] === 0x4b && buffer[2] === 0x03 && buffer[3] === 0x04) return 'docx';
  const sample = buffer.subarray(0, 4096);
  if (sample.includes(0)) return null;
  try {
    new TextDecoder('utf-8', { fatal: true }).decode(sample);
    return 'text';
  } catch {
    return null;
  }
};

export const read_upload = async (file: File) => {
  if (file.size > MAX_UPLOAD_BYTES) throw file_too_large();
  const buffer = Buffer.from(await file.arrayBuffer());
  const kind = detect_upload_kind(buffer);
  if (!kind) throw new Error('UNSUPPORTED_FILE');
  return { buffer, kind };
};

export const text_from_upload = async (file: File) => {
  const { buffer, kind } = await read_upload(file);
  if (kind === 'pdf') return extractTextFromPdf(buffer);
  if (kind === 'docx') return extractTextFromDocx(buffer);
  return buffer.toString('utf-8');
};

export const upload_error_response = (error: unknown) => {
  if (!(error instanceof Error)) return null;
  if (error.message === 'FILE_TOO_LARGE') return { error: 'File is larger than 5 MB.', status: 413 };
  if (error.message === 'UNSUPPORTED_FILE') return { error: 'Upload a PDF, DOCX or plain text file.', status: 415 };
  return null;
};
