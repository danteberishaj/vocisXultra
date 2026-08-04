/**
 * The brand gesture: vocis ✕ ultra — the X set apart in accent Garamond italic,
 * voices crossing into the beyond.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display ${className}`}>
      vocis
      <span className="font-serif italic font-normal text-accent">X</span>
      ultra
    </span>
  );
}
