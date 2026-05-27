import { Play } from "lucide-react";
import filmImg from "@/assets/film.jpg";
import { useReveal } from "@/hooks/use-reveal";

export function VideoSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="video" className="relative overflow-hidden bg-background py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-accent">Глава III</p>
        <h2 className="font-display text-5xl leading-tight md:text-7xl">
          Наш свадебный <span className="italic gold-text">фильм</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
          Семь минут, в которых уместился самый длинный день нашей жизни.
        </p>

        <div ref={ref} className="reveal group relative mx-auto mt-14 max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl shadow-soft">
            <img
              src={filmImg}
              alt="Наш свадебный фильм"
              loading="lazy"
              className="aspect-video w-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-background/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
              <button className="relative flex h-20 w-20 items-center justify-center rounded-full border border-accent/70 bg-background/30 text-ivory backdrop-blur-md transition-all duration-500 hover:scale-110 hover:shadow-glow md:h-24 md:w-24">
                <span className="absolute inset-0 rounded-full border border-accent/50 animate-ping" />
                <Play className="ml-1" size={26} />
              </button>
              <span className="text-[10px] uppercase tracking-[0.5em] text-ivory/80">
                07:42 — Wedding film
              </span>
            </div>
          </div>
          <div className="pointer-events-none absolute -inset-10 -z-10 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 blur-3xl" />
        </div>

        <button className="mt-12 inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-accent-foreground transition-all duration-500 hover:shadow-glow">
          <Play size={14} />
          Смотреть фильм
        </button>
      </div>
    </section>
  );
}
