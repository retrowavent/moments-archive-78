import heroImg from "@/assets/hero.jpg";
import { Play, ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative grain h-[100svh] min-h-[640px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="A & D — наш свадебный день"
          className="ken-burns h-full w-full object-cover object-center"
          width={1280}
          height={1920}
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="absolute inset-0 bg-vignette" />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex-1" />

        <div className="mx-auto w-full max-w-5xl px-6 pb-24 text-center md:pb-32">
          <p className="mb-6 text-[10px] uppercase tracking-[0.5em] text-accent animate-fade-in">
            ⸻ Наш вечный архив ⸻
          </p>
          <h1 className="font-display text-[14vw] leading-[0.95] text-ivory md:text-[7rem] animate-fade-in">
            Наш день.
            <br />
            <span className="italic text-balance">Наша история.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            Спасибо, что были с нами в этот незабываемый день
            и разделили наше счастье.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.4em] text-ivory/70">
            <span className="h-px w-8 bg-accent/60" />
            20 августа 2026
            <span className="h-px w-8 bg-accent/60" />
          </div>

          <div className="mt-12 flex flex-col items-center gap-4">
            <a
              href="#video"
              className="group inline-flex items-center gap-3 rounded-full border border-accent/60 bg-background/30 px-7 py-3.5 text-[11px] uppercase tracking-[0.3em] text-ivory backdrop-blur-md transition-all duration-500 hover:border-accent hover:bg-accent hover:text-accent-foreground hover:shadow-glow"
            >
              <Play size={14} className="transition-transform group-hover:scale-110" />
              Смотреть тизер
            </a>
          </div>
        </div>

        <a
          href="#story"
          className="group absolute bottom-8 left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-accent/40 text-ivory/80 transition-all duration-500 hover:border-accent hover:text-accent hover:shadow-glow"
          aria-label="Прокрутить вниз"
        >
          <ChevronDown className="animate-float-slow transition-transform group-hover:translate-y-0.5" size={16} />
        </a>
      </div>
    </section>
  );
}
