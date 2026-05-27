import { useReveal } from "@/hooks/use-reveal";

export function ThankYou() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative overflow-hidden bg-background pt-28 pb-12 md:pt-40 md:pb-16">
      <div className="pointer-events-none absolute inset-0 bg-vignette" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div ref={ref} className="reveal">
          <p className="mb-6 text-[10px] uppercase tracking-[0.5em] text-accent">Финал</p>
          <h2 className="font-display text-[12vw] leading-[0.95] text-ivory md:text-[7rem]">
            Спасибо,
            <br />
            <span className="italic gold-text">что были с нами</span>
          </h2>
          <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
            Этот день навсегда останется в нашем сердце.
          </p>
          <div className="mx-auto mt-10 h-px w-24 bg-accent/60" />
          <p className="mt-10 font-display text-3xl tracking-[0.25em] text-ivory">
            A <span className="text-accent">&</span> D
          </p>
        </div>

        <p className="mt-10 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          Сделано с <span className="text-accent">любовью</span> · 2024
        </p>
      </div>
    </section>
  );
}

