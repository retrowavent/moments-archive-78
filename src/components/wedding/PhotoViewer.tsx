import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export type ViewerPhoto = {
  src: string;
  alt: string;
  video?: boolean;
  videoSrc?: string;
};

type Props = {
  photos: ViewerPhoto[];
  startIndex?: number;
  title?: string;
  onClose: () => void;
};

export function PhotoViewer({ photos, startIndex = 0, title, onClose }: Props) {
  const [index, setIndex] = useState(startIndex);
  const reduced = useReducedMotion();
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const total = photos.length;

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + total) % total);
    },
    [total],
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null || touchStartY.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      go(dx < 0 ? 1 : -1);
    } else if (dy > 80 && Math.abs(dy) > Math.abs(dx)) {
      onClose();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const current = photos[index];
  const transition = reduced ? "none" : "opacity 350ms var(--ease-cinema)";

  return (
    <div
      className="fixed inset-0 z-[90] flex flex-col bg-background/98 backdrop-blur-2xl"
      role="dialog"
      aria-modal="true"
      aria-label={title || "Галерея"}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ animation: reduced ? "none" : "fade-in 0.3s ease-out" }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-8 md:py-6">
        <div className="min-w-0">
          {title && (
            <p className="truncate font-display text-lg text-ivory md:text-2xl">{title}</p>
          )}
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {index + 1} / {total}
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-border text-ivory transition hover:border-accent hover:text-accent"
        >
          <X size={18} />
        </button>
      </div>

      {/* Media area */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-2 pb-4 md:px-12">
        {/* Prev / Next (desktop) */}
        <button
          onClick={() => go(-1)}
          aria-label="Предыдущее"
          className="absolute left-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/40 text-ivory backdrop-blur-md transition hover:border-accent hover:text-accent md:flex md:left-6"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Следующее"
          className="absolute right-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/40 text-ivory backdrop-blur-md transition hover:border-accent hover:text-accent md:flex md:right-6"
        >
          <ChevronRight size={20} />
        </button>

        <div
          key={index}
          className="flex h-full w-full max-w-6xl items-center justify-center"
          style={{ transition, opacity: 1 }}
        >
          {current.video ? (
            <VideoPlayer src={current.videoSrc} poster={current.src} alt={current.alt} />
          ) : (
            <img
              src={current.src}
              alt={current.alt}
              draggable={false}
              className="max-h-full max-w-full select-none rounded-lg object-contain shadow-soft"
            />
          )}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="border-t border-border/60 bg-background/60">
        <div className="-mx-2 flex gap-2 overflow-x-auto px-4 py-3 md:gap-3 md:px-8 md:py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {photos.map((p, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Кадр ${i + 1}`}
              className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-md transition md:h-16 md:w-24 ${
                i === index
                  ? "ring-2 ring-accent ring-offset-2 ring-offset-background"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <img src={p.src} alt="" className="h-full w-full object-cover" />
              {p.video && (
                <span className="absolute inset-0 flex items-center justify-center bg-background/40 text-ivory">
                  ▶
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function VideoPlayer({ src, poster, alt }: { src?: string; poster: string; alt: string }) {
  if (!src) {
    return (
      <div className="relative w-full max-w-4xl">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-soft">
          <img src={poster} alt={alt} className="h-full w-full object-cover" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/70 backdrop-blur-sm">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/60 bg-background/40 text-accent">
              ▶
            </span>
            <p className="px-6 text-center text-sm text-ivory/90">
              Видео-плёнка будет добавлена в течение нескольких дней.
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <video
      src={src}
      poster={poster}
      controls
      playsInline
      preload="metadata"
      className="max-h-full max-w-full rounded-lg shadow-soft"
    />
  );
}
