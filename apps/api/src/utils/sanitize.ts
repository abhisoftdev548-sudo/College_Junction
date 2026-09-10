import DOMPurify from 'isomorphic-dompurify';

const ENTITIES: Record<string, string> = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ' };

/**
 * Strip all HTML — descriptions/comments are stored as plain text (spec §1.10).
 * DOMPurify entity-encodes the text nodes it keeps, so decode back to plain text
 * (the frontend renders as text, never dangerouslySetInnerHTML; it re-sanitizes anyway).
 */
export function sanitizeText(input: string): string {
  const stripped = DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [], KEEP_CONTENT: true });
  return stripped.replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (m) => ENTITIES[m] ?? m).trim();
}

export function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
