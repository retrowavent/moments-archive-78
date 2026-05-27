import { useReveal } from "@/hooks/use-reveal";

const wishes = [
  { name: "Мария & Артём", initials: "МА", date: "20 авг 2026", text: "Вы — пример того, как любовь делает людей светлее. Пусть ваш дом всегда будет полон тёплого света." },
  { name: "Екатерина С.", initials: "ЕС", date: "20 авг 2026", text: "Смотрела на вас и плакала от счастья. Будьте друг для друга самым уютным местом на земле." },
  { name: "Дмитрий Л.", initials: "ДЛ", date: "21 авг 2026", text: "Спасибо за этот вечер — он останется одним из самых красивых в моей памяти." },
  { name: "Анна & Игорь", initials: "АИ", date: "21 авг 2026", text: "Пусть каждое утро начинается с улыбки, а каждый вечер — с объятий." },
  { name: "София К.", initials: "СК", date: "20 авг 2026", text: "Ваша свадьба — самая красивая история, в которой мне посчастливилось оказаться гостем." },
];

export function Wishes() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="wishes" className="relative overflow-hidden bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={ref} className="reveal text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-accent">Глава IV</p>
          <h2 className="font-display text-5xl leading-tight md:text-7xl"><span className="italic">Пожелания</span></h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">Слова, которые мы будем перечитывать ещё много лет.</p>
        </div>

        <div className="mt-12 overflow-x-auto pb-2 [scrollbar-width:thin]" dir="rtl">
          <div className="wishes-track">
            <div className="wishes-group flex w-max gap-5 pr-2">
            {[...wishes, ...wishes].map((w, i) => (
              <article key={`${w.initials}-${i}`} className="w-[300px] flex-shrink-0 overflow-hidden rounded-2xl border border-border bg-background/40 p-7 backdrop-blur-md md:w-[360px] md:p-9">
                <div className="flex items-center gap-4" dir="ltr">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold font-display text-base text-accent-foreground">{w.initials}</div>
                  <div>
                    <p className="font-display text-xl text-ivory">{w.name}</p>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{w.date}</p>
                  </div>
                </div>
                <p className="mt-6 text-[15px] leading-relaxed text-ivory/85 md:text-base">“{w.text}”</p>
              </article>
            ))}
            </div>
            <div className="wishes-group flex w-max gap-5 pr-2" aria-hidden="true">
              {[...wishes, ...wishes].map((w, i) => (
                <article key={`clone-${w.initials}-${i}`} className="w-[300px] flex-shrink-0 overflow-hidden rounded-2xl border border-border bg-background/40 p-7 backdrop-blur-md md:w-[360px] md:p-9">
                  <div className="flex items-center gap-4" dir="ltr">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold font-display text-base text-accent-foreground">{w.initials}</div>
                    <div>
                      <p className="font-display text-xl text-ivory">{w.name}</p>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{w.date}</p>
                    </div>
                  </div>
                  <p className="mt-6 text-[15px] leading-relaxed text-ivory/85 md:text-base">“{w.text}”</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
