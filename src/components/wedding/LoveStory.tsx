import t1 from "@/assets/images/love-story/love-story1.png";
import t2 from "@/assets/images/love-story/love-story2.png";
import t3 from "@/assets/images/love-story/love-story3.png";
import t4 from "@/assets/images/love-story/love-story4.png";
import t5 from "@/assets/images/love-story/love-story5.png";
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
    <section id="story" className="relative overflow-hidden bg-background py-28 md:py-44">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-accent/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-6">
        <div ref={ref} className="reveal mb-16 text-center md:mb-24">
          <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-accent">Глава I</p>
          <h2 className="font-display text-5xl leading-tight md:text-7xl">История <span className="italic gold-text">любви</span></h2>
        </div>
        <div className="-mx-6 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max gap-5 pb-2 md:gap-8">
            {milestones.map((m, i) => (
              <MilestoneCard key={m.year} m={m} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MilestoneCard({ m, index }: { m: (typeof milestones)[number]; index: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <article ref={ref} className="reveal group relative w-[74vw] max-w-[280px] md:w-[20vw] md:min-w-[220px]" style={{ transitionDelay: `${index * 120}ms` }}>
      <div className="absolute -left-2 top-8 hidden h-px w-8 bg-accent/40 md:block" />
      <div className="relative overflow-hidden rounded-2xl shadow-card">
        <img src={m.img} alt={m.title} loading="lazy" className="aspect-[3/4] w-full object-cover object-center transition-transform duration-[1800ms] group-hover:scale-110" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/25" />
        <p className="absolute left-4 top-3 font-display text-3xl text-ivory/95 md:text-4xl">{m.year}</p>
      </div>
      <h3 className="mt-5 font-display text-2xl text-ivory transition-colors duration-500 group-hover:text-accent">{m.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
    </article>
  );
}
