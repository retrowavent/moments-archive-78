import { Play } from "lucide-react";
import filmImg from "@/assets/images/film/film.png";
import { useReveal } from "@/hooks/use-reveal";

export function VideoSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="video" className="relative overflow-hidden bg-background py-28 md:py-40">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-accent/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-accent">Глава III</p>
        <h2 className="font-display text-5xl leading-tight md:text-7xl">Наш свадебный <span className="italic gold-text">фильм</span></h2>

        <div ref={ref} className="reveal group relative mx-auto mt-14 max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl shadow-soft">
            <img src={filmImg} alt="Наш свадебный фильм" loading="lazy" className="aspect-video w-full object-cover transition-transform duration-[2200ms] group-hover:scale-[1.06]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/35" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
              <button className="relative flex h-20 w-20 items-center justify-center rounded-full border border-accent/70 bg-black/35 text-ivory backdrop-blur-md transition-all duration-700 hover:scale-110 hover:shadow-glow md:h-24 md:w-24">
                <span className="absolute inset-0 rounded-full border border-accent/60 animate-ping" />
                <Play className="ml-1" size={26} />
              </button>
              <span className="text-[10px] uppercase tracking-[0.5em] text-ivory/85">07:42 · Wedding film</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
