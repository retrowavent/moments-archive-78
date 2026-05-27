import { CloudDownload } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

export function Download() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="download" className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div
          ref={ref}
          className="reveal relative overflow-hidden rounded-2xl border border-border bg-surface/60 p-10 text-center backdrop-blur-md md:p-14"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 text-accent">
            <CloudDownload size={22} />
          </div>
          <h3 className="mt-6 font-display text-3xl text-ivory md:text-4xl">
            Скачать все фото
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            В высоком качестве, одним архивом — для вашего семейного альбома.
          </p>
          <button className="mt-8 inline-flex items-center gap-3 rounded-full bg-gold px-7 py-3.5 text-[11px] uppercase tracking-[0.3em] text-accent-foreground transition-all duration-500 hover:shadow-glow">
            Скачать архив · 4.2 GB
          </button>
          <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Доступно 30 дней
          </p>
          <span className="pointer-events-none absolute inset-x-10 -bottom-24 h-40 bg-accent/15 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
