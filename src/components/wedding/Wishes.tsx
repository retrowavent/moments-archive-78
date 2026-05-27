import { useReveal } from "@/hooks/use-reveal";

const wishes = [
  {
    name: "Мария & Артём",
    initials: "МА",
    date: "20 авг 2024",
    text: "Вы — пример того, как любовь делает людей светлее. Пусть ваш дом всегда будет полон тёплого света.",
  },
  {
    name: "Екатерина С.",
    initials: "ЕС",
    date: "20 авг 2024",
    text: "Смотрела на вас и плакала от счастья. Будьте друг для друга самым уютным местом на земле.",
  },
  {
    name: "Дмитрий Л.",
    initials: "ДЛ",
    date: "21 авг 2024",
    text: "Спасибо за этот вечер — он останется одним из самых красивых в моей памяти. Любви вам на десятилетия вперёд.",
  },
  {
    name: "Анна & Игорь",
    initials: "АИ",
    date: "21 авг 2024",
    text: "Вы созданы друг для друга. Пусть каждое утро начинается с улыбки, а каждый вечер — с объятий.",
  },
];

export function Wishes() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="wishes" className="relative bg-surface py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={ref} className="reveal text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-accent">Глава IV</p>
          <h2 className="font-display text-5xl leading-tight md:text-7xl">
            <span className="italic">Пожелания</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            Слова, которые мы будем перечитывать ещё много лет.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:mt-24 md:grid-cols-2 md:gap-7">
          {wishes.map((w, i) => (
            <WishCard key={i} w={w} index={i} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <button className="inline-flex items-center gap-3 rounded-full border border-accent/60 px-7 py-3.5 text-[11px] uppercase tracking-[0.3em] text-ivory transition-all duration-500 hover:border-accent hover:bg-accent hover:text-accent-foreground hover:shadow-glow">
            Оставить пожелание
          </button>
        </div>
      </div>
    </section>
  );
}

function WishCard({ w, index }: { w: (typeof wishes)[number]; index: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <article
      ref={ref}
      className="reveal group relative overflow-hidden rounded-2xl border border-border bg-background/40 p-7 backdrop-blur-md transition-all duration-700 hover:border-accent/40 hover:shadow-card md:p-10"
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold font-display text-base text-accent-foreground">
          {w.initials}
        </div>
        <div>
          <p className="font-display text-xl text-ivory">{w.name}</p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {w.date}
          </p>
        </div>
      </div>
      <p className="mt-6 text-[15px] leading-relaxed text-ivory/85 md:text-base">
        “{w.text}”
      </p>
      <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
    </article>
  );
}
