import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const pool = [
  {
    name: "Мария & Артём",
    initials: "МА",
    date: "20 авг 2026",
    text: "Вы — пример того, как любовь делает людей светлее. Пусть ваш дом всегда будет полон тёплого света.",
  },
  {
    name: "Екатерина С.",
    initials: "ЕС",
    date: "20 авг 2026",
    text: "Смотрела на вас и плакала от счастья. Будьте друг для друга самым уютным местом на земле.",
  },
  {
    name: "Дмитрий Л.",
    initials: "ДЛ",
    date: "21 авг 2026",
    text: "Спасибо за этот вечер — он останется одним из самых красивых в моей памяти. Любви вам на десятилетия вперёд.",
  },
  {
    name: "Анна & Игорь",
    initials: "АИ",
    date: "21 авг 2026",
    text: "Вы созданы друг для друга. Пусть каждое утро начинается с улыбки, а каждый вечер — с объятий.",
  },
  {
    name: "София К.",
    initials: "СК",
    date: "20 авг 2026",
    text: "Ваша свадьба — самая красивая история, в которой мне посчастливилось оказаться гостем. Любите друг друга так же сильно, как сегодня.",
  },
  {
    name: "Павел & Ольга",
    initials: "ПО",
    date: "20 авг 2026",
    text: "Пусть ваша жизнь будет похожа на этот вечер: тёплая, светлая и наполненная музыкой.",
  },
  {
    name: "Никита В.",
    initials: "НВ",
    date: "21 авг 2026",
    text: "Вы оба светитесь изнутри. Желаю, чтобы этот свет никогда не угасал — ни в радости, ни в буднях.",
  },
  {
    name: "Елена & Михаил",
    initials: "ЕМ",
    date: "22 авг 2026",
    text: "Берегите друг друга в мелочах. Именно из них и сшита настоящая любовь.",
  },
  {
    name: "Виктория Р.",
    initials: "ВР",
    date: "20 авг 2026",
    text: "Спасибо за самый красивый день этого лета. Пусть впереди будут только такие же — наполненные нежностью.",
  },
  {
    name: "Тимур & Алина",
    initials: "ТА",
    date: "21 авг 2026",
    text: "Вы напомнили нам, какой может быть любовь. Спасибо за этот пример — и за этот вечер.",
  },
];

const VISIBLE = 4;

function pickInitial(): number[] {
  const idx = Array.from({ length: pool.length }, (_, i) => i);
  // shuffle
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx.slice(0, VISIBLE);
}

export function Wishes() {
  const ref = useReveal<HTMLDivElement>();
  const [visible, setVisible] = useState<number[]>(() => pickInitial());
  const [fadingSlot, setFadingSlot] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const slot = Math.floor(Math.random() * VISIBLE);
      setFadingSlot(slot);
      window.setTimeout(() => {
        setVisible((prev) => {
          const available = pool
            .map((_, i) => i)
            .filter((i) => !prev.includes(i));
          if (available.length === 0) return prev;
          const next = available[Math.floor(Math.random() * available.length)];
          const copy = [...prev];
          copy[slot] = next;
          return copy;
        });
        setFadingSlot(null);
      }, 700);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

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
          {visible.map((idx, slot) => (
            <WishCard
              key={`${slot}-${idx}`}
              w={pool[idx]}
              index={slot}
              fading={fadingSlot === slot}
            />
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

function WishCard({
  w,
  index,
  fading,
}: {
  w: (typeof pool)[number];
  index: number;
  fading: boolean;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <article
      ref={ref}
      className="reveal group relative overflow-hidden rounded-2xl border border-border bg-background/40 p-7 backdrop-blur-md transition-all duration-700 hover:border-accent/40 hover:shadow-card md:p-10"
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div
        className="transition-all duration-700 ease-out"
        style={{
          opacity: fading ? 0 : 1,
          transform: fading ? "translateY(-8px)" : "translateY(0)",
        }}
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
      </div>
      <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
    </article>
  );
}
