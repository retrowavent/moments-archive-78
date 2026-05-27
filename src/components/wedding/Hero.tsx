import { Play, ChevronDown } from "lucide-react";
import heroOne from "@/assets/images/hero/hero.png";

export function Hero() {
  return (
    <section id="top" className="relative grain h-[100svh] min-h-[680px] w-full overflow-hidden">
      <div className="absolute inset-0 scale-[1.02]">
        <img
          src={heroOne}
          alt="A & D — наш свадебный день"
          className="ken-burns h-full w-full object-cover object-center"
          width={1920}
          height={1280}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="absolute inset-0 bg-vignette" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(212,163,115,0.22),transparent_55%)]" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end">
        <div className="mx-auto w-full max-w-6xl px-6 pb-24 text-center md:pb-32">
          <p className="mb-6 text-[10px] uppercase tracking-[0.5em] text-accent animate-fade-in">⸻ Наш вечный архив ⸻</p>
          <h1 className="font-display text-[15vw] leading-[0.88] text-ivory md:text-[8.5rem] animate-fade-in">
            Это наш день.
            <br />
            <span className="gold-text italic">Это наша память.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-ivory/85 md:text-lg">
            Любовь, свет, дрожащие руки и счастье в каждом взгляде.
            Этот архив — чтобы снова прожить всё вместе с вами.
          </p>

          <div className="mt-10 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.38em] text-ivory/75">
            <span className="h-px w-10 bg-accent/70" />20 августа 2026<span className="h-px w-10 bg-accent/70" />
          </div>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#video"
              className="group inline-flex items-center gap-3 rounded-full border border-accent/70 bg-background/40 px-7 py-3.5 text-[11px] uppercase tracking-[0.3em] text-ivory backdrop-blur-md transition-all duration-700 hover:border-accent hover:bg-accent hover:text-accent-foreground hover:shadow-glow"
            >
              <Play size={14} className="transition-transform duration-500 group-hover:scale-110" />Смотреть фильм
            </a>
            <a
              href="#story"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-ivory/80 transition-colors duration-500 hover:text-accent"
            >
              Смотреть историю
            </a>
          </div>
        </div>

        <a
          href="#story"
          className="group absolute bottom-8 left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-accent/45 text-ivory/80 transition-all duration-500 hover:border-accent hover:text-accent hover:shadow-glow"
          aria-label="Прокрутить вниз"
        >
          <ChevronDown className="animate-float-slow transition-transform group-hover:translate-y-0.5" size={16} />
        </a>
      </div>
    </section>
  );
}
