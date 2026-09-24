/**
 * Renders text where a {braced} word is set in the italic serif accent.
 * "Building at the intersection of AI, product & {people}."
 */
export function AccentText({ text, accentClassName = "" }: { text: string; accentClassName?: string }) {
  const parts = text.split(/(\{[^}]+\})/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("{") ? (
          <span key={i} className={`serif-accent ${accentClassName}`}>
            {part.slice(1, -1)}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
