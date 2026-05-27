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
  { year: "2024", title: "Наша свадьба", text: "День, который теперь живёт в нас навсегда.", img: t5 },
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

        {/* Mobile: vertical timeline. Desktop: horizontal scroll */}
        <div className="md:hidden">
          <div className="relative space-y-12 pl-8">
            <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-accent/60 via-accent/20 to-transparent" />
            {milestones.map((m, i) => (
              <Milestone key={m.year} m={m} index={i} />
            ))}
          </div>
        </div>

        <div className="hidden md:block">
          <div className="-mx-6 overflow-x-auto px-6 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-8">
              {milestones.map((m, i) => (
                <MilestoneCard key={m.year} m={m} index={i} />
              ))}
            </div>
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
          className="aspect-[4/5] w-full object-cover transition-transform duration-[1500ms] hover:scale-[1.04]"
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
      className="reveal group w-[340px] flex-shrink-0"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-card">
        <img
          src={m.img}
          alt={m.title}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover transition-transform duration-[1800ms] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <p className="absolute top-5 left-6 font-display text-4xl text-ivory">{m.year}</p>
      </div>
      <h3 className="mt-6 font-display text-3xl text-ivory transition-colors group-hover:text-accent">
        {m.title}
      </h3>
      <p className="mt-2 max-w-[28ch] text-sm leading-relaxed text-muted-foreground">{m.text}</p>
    </article>
  );
}
