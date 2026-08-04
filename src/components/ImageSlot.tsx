import { IconImage } from "@/components/icons";

/**
 * A reserved space for photography that doesn't exist yet.
 *
 * Every slot states the aspect ratio it expects and the pixel size to supply,
 * so filling one is a drop-in rather than a design decision. Slots carry
 * `data-image-slot` — `grep -rn "data-image-slot" src` lists every remaining
 * one, which is the pre-launch checklist.
 *
 * To fill a slot, replace the whole <ImageSlot /> with:
 *
 *   <div className="relative aspect-video w-full overflow-hidden bg-panel">
 *     <Image src="/images/…" alt="…" fill sizes="…" className="object-cover" />
 *   </div>
 *
 * `aria-hidden`: an empty slot carries nothing for a screen reader to announce.
 * The real <Image> that replaces it needs descriptive alt text.
 */
export function ImageSlot({
  ratio = "aspect-video",
  label,
  hint,
  className = "",
}: {
  /** Tailwind aspect utility, e.g. "aspect-video", "aspect-3/4", "aspect-4/5". */
  ratio?: string;
  /** What belongs here — written for whoever supplies the photo. */
  label: string;
  /** Recommended export size, e.g. "2560 × 1440". */
  hint: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      data-image-slot
      className={`relative flex w-full items-center justify-center overflow-hidden border border-dashed border-accent-deep/50 bg-panel ${ratio} ${className}`}
    >
      <div className="px-5 text-center">
        <IconImage className="mx-auto text-accent-deep" />
        <p className="mt-3 font-sans text-[0.8rem] font-medium tracking-[0.02em] text-ink/70">
          {label}
        </p>
        <p className="mt-1 font-sans text-[0.7rem] tracking-[0.12em] text-faint uppercase">
          {hint}
        </p>
      </div>
    </div>
  );
}
