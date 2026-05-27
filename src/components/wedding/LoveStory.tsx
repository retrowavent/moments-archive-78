import t1 from "@/assets/t1.jpg";
import t2 from "@/assets/t2.jpg";
import t3 from "@/assets/t3.jpg";
import t4 from "@/assets/t4.jpg";
import t5 from "@/assets/t5.jpg";
import { useReveal } from "@/hooks/use-reveal";

const milestones = [
  { year: "2018", title: "Первая встреча", text: "Случайный вечер, который изменил всё.", img: t1 },
  { year: "2019", title: "Начало отношений", text: "Тишина, в которой мы услышали друг друга.", img: t2 },
  { year: "2020", title: "Путешествия", text: "Города, рассветы, и одно общее небо.", img: t3 },
  { year: "2022", title: "Предложение", text: "Свечи, дрожь в руках, и слово «да».", img: t4 },
  { year: "2026", title: "Наша свадьба", text: "День, который теперь живёт в нас навсегда.", img: t5 },
];

export function LoveStory() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="story" className="relative bg-background py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={ref} className="reveal mb-16 text-center md:mb-24">
          <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-accent">Глава I</p>
          <h2 className="font-display text-5xl leading-tight md:text-7xl">
            История <span className="italic gold-text">любви</span>
          </h2>
          <div className="mx-auto mt-8 h-px w-24 bg-accent/60" />
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden">
          <div className="relative space-y-12 pl-8">
            <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-accent/60 via-accent/20 to-transparent" />
            {milestones.map((m, i) => (
              <Milestone key={m.year} m={m} index={i} />
            ))}
          </div>
        </div>

        {/* Desktop: full-fit 5-column grid */}
        <div className="hidden md:block">
          <div className="grid grid-cols-5 gap-5 lg:gap-7">
            {milestones.map((m, i) => (
              <MilestoneCard key={m.year} m={m} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Milestone({ m, index }: { m: (typeof milestones)[number]; index: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal relative" style={{ transitionDelay: `${index * 80}ms` }}>
      <span className="absolute -left-8 top-3 h-2 w-2 rounded-full bg-accent shadow-glow" />
      <p className="font-display text-3xl text-accent">{m.year}</p>
      <div className="mt-3 overflow-hidden rounded-xl">
        <img
          src={m.img}
          alt={m.title}
          loading="lazy"
          className="aspect-[3/4] w-full object-cover object-center transition-transform duration-[1500ms] hover:scale-[1.04]"
        />
      </div>
      <h3 className="mt-5 font-display text-2xl text-ivory">{m.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
    </div>
  );
}

function MilestoneCard({ m, index }: { m: (typeof milestones)[number]; index: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <article
      ref={ref}
      className="reveal group flex flex-col"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-card">
        <img
          src={m.img}
          alt={m.title}
          loading="lazy"
          className="aspect-[3/4] w-full object-cover object-center transition-transform duration-[1800ms] group-hover:scale-110"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-background/30" />
        <p className="absolute left-4 top-3 font-display text-3xl text-ivory drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] lg:text-4xl">
          {m.year}
        </p>
      </div>
      <h3 className="mt-5 font-display text-xl text-ivory transition-colors group-hover:text-accent lg:text-2xl">
        {m.title}
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground lg:text-sm">
        {m.text}
      </p>
    </article>
  );
}
