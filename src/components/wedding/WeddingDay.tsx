import { useState } from "react";
import { Play, ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { PhotoViewer, type ViewerPhoto } from "./PhotoViewer";
import g1 from "@/assets/g1.jpg";
import g2 from "@/assets/g2.jpg";
import g3 from "@/assets/g3.jpg";
import g4 from "@/assets/g4.jpg";
import g5 from "@/assets/g5.jpg";
import g6 from "@/assets/g6.jpg";
import g7 from "@/assets/g7.jpg";
import g8 from "@/assets/g8.jpg";

const stages = [
  { id: "bride", label: "Утро невесты", time: "08:00" },
  { id: "groom", label: "Сборы жениха", time: "09:30" },
  { id: "ceremony", label: "Церемония", time: "12:00" },
  { id: "photo", label: "Фотосессия", time: "14:00" },
  { id: "banquet", label: "Банкет", time: "17:00" },
  { id: "cake", label: "Торт", time: "20:00" },
  { id: "party", label: "Вечеринка", time: "22:00" },
];

type Photo = ViewerPhoto & {
  span: string;
  ratio: string;
};

const pool = [g1, g2, g3, g4, g5, g6, g7, g8];

function buildAll(seed: number, count: number, videoIndices: number[] = []): ViewerPhoto[] {
  // Build a deterministic full-gallery list of `count` items by cycling through pool
  return Array.from({ length: count }, (_, i) => ({
    src: pool[(seed + i) % pool.length],
    alt: `Кадр ${i + 1}`,
    video: videoIndices.includes(i),
  }));
}

type Section = {
  id: string;
  title: string;
  time: string;
  count: number;
  text: string;
  photos: Photo[];
  all: ViewerPhoto[];
};

const sections: Section[] = [
  {
    id: "bride",
    title: "Сборы невесты",
    time: "08:00 – 11:00",
    count: 64,
    text: "Тихий свет утра, белый шёлк и предвкушение нового имени.",
    photos: [
      { src: g1, alt: "Сборы невесты", span: "col-span-2 row-span-2", ratio: "aspect-[3/4]" },
      { src: g6, alt: "Деталь — букет", span: "col-span-1 row-span-1", ratio: "aspect-square" },
      { src: g4, alt: "Невеста в свете", span: "col-span-1 row-span-1", ratio: "aspect-square" },
      { src: g2, alt: "Утренний портрет", span: "col-span-1 row-span-1", ratio: "aspect-square" },
      { src: g5, alt: "Платье и детали", span: "col-span-1 row-span-1", ratio: "aspect-square" },
    ],
    all: buildAll(0, 64),
  },
  {
    id: "ceremony",
    title: "Церемония",
    time: "12:00 – 13:00",
    count: 58,
    text: "Два «да», свечи, и тишина, в которой всё навсегда изменилось.",
    photos: [
      { src: g3, alt: "Церемония", span: "col-span-3 row-span-2", ratio: "aspect-[16/10]", video: true },
      { src: g2, alt: "Жених", span: "col-span-1 row-span-1", ratio: "aspect-[3/4]" },
      { src: g4, alt: "Кольца", span: "col-span-2 row-span-1", ratio: "aspect-[16/9]" },
      { src: g8, alt: "Гости", span: "col-span-2 row-span-1", ratio: "aspect-[16/9]" },
    ],
    all: buildAll(2, 58, [0, 12]),
  },
  {
    id: "banquet",
    title: "Банкет",
    time: "17:00 – 22:00",
    count: 124,
    text: "Свечи, бокалы, и голоса самых близких — вечер длиной в сердце.",
    photos: [
      { src: g5, alt: "Банкет", span: "col-span-2 row-span-2", ratio: "aspect-square" },
      { src: g7, alt: "Тост", span: "col-span-2 row-span-2", ratio: "aspect-[16/10]", video: true },
      { src: g6, alt: "Сервировка", span: "col-span-1 row-span-1", ratio: "aspect-square" },
      { src: g1, alt: "Гости", span: "col-span-1 row-span-1", ratio: "aspect-square" },
      { src: g3, alt: "Свечи и бокалы", span: "col-span-2 row-span-1", ratio: "aspect-[16/9]" },
    ],
    all: buildAll(4, 124, [1, 20, 60]),
  },
  {
    id: "party",
    title: "Первый танец & салют",
    time: "22:00 – 00:30",
    count: 86,
    text: "Музыка, искры в небе и танец, который мы запомнили навсегда.",
    photos: [
      { src: g7, alt: "Первый танец", span: "col-span-2 row-span-2", ratio: "aspect-[16/10]" },
      { src: g8, alt: "Салют", span: "col-span-2 row-span-2", ratio: "aspect-[3/4]" },
      { src: g4, alt: "В кругу света", span: "col-span-2 row-span-1", ratio: "aspect-[16/9]", video: true },
      { src: g3, alt: "Финал вечера", span: "col-span-2 row-span-1", ratio: "aspect-[16/9]" },
    ],
    all: buildAll(6, 86, [4, 30]),
  },
];

type ViewerState = {
  photos: ViewerPhoto[];
  index: number;
  title: string;
} | null;

export function WeddingDay() {
  const headRef = useReveal<HTMLDivElement>();
  const [viewer, setViewer] = useState<ViewerState>(null);

  return (
    <section id="day" className="relative bg-surface py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={headRef} className="reveal text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-accent">Глава II</p>
          <h2 className="font-display text-6xl leading-none md:text-[8rem]">
            <span className="italic">День</span> свадьбы
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            Каждая минута этого дня — как кадр из фильма.
            Войдите внутрь нашего воспоминания.
          </p>
          <div className="mx-auto mt-10 h-px w-24 bg-accent/60" />
        </div>

        {/* Timeline of the day */}
        <div className="mt-16 md:mt-24">
          <div className="-mx-6 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex min-w-max items-start gap-6 md:justify-center md:gap-12">
              {stages.map((s, i) => (
                <div
                  key={s.id}
                  className="group relative flex w-[88px] flex-shrink-0 flex-col items-center text-center md:w-[112px]"
                >
                  <span className="text-[10px] uppercase tracking-[0.3em] text-accent">
                    {s.time}
                  </span>
                  <div className="mt-3 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/60 transition-all duration-500 group-hover:border-accent group-hover:shadow-glow">
                    <span className="font-display text-lg text-ivory">{i + 1}</span>
                  </div>
                  <span className="mt-3 text-[11px] leading-tight text-ivory/80">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Photo gallery sections */}
        <div id="photos" className="mt-24 space-y-28 md:space-y-40">
          {sections.map((sec) => (
            <GallerySection
              key={sec.id}
              sec={sec}
              onOpenPhoto={(i) =>
                setViewer({
                  photos: [
                    ...sec.photos.map((p) => ({
                      src: p.src,
                      alt: p.alt,
                      video: p.video,
                    })),
                    ...sec.all.slice(sec.photos.length),
                  ],
                  index: i,
                  title: sec.title,
                })
              }
              onOpenAll={() =>
                setViewer({ photos: sec.all, index: 0, title: sec.title })
              }
            />
          ))}
        </div>
      </div>

      {viewer && (
        <PhotoViewer
          photos={viewer.photos}
          startIndex={viewer.index}
          title={viewer.title}
          onClose={() => setViewer(null)}
        />
      )}
    </section>
  );
}

function GallerySection({
  sec,
  onOpenPhoto,
  onOpenAll,
}: {
  sec: Section;
  onOpenPhoto: (i: number) => void;
  onOpenAll: () => void;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal">
      <div className="mb-8 flex flex-col gap-3 md:mb-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-accent">{sec.time}</p>
          <h3 className="mt-3 font-display text-4xl text-ivory md:text-6xl">{sec.title}</h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{sec.text}</p>
        </div>
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-px w-8 bg-accent/60" />
          {sec.count} кадров
        </div>
      </div>

      <div className="grid auto-rows-[150px] grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-4 md:gap-5">
        {sec.photos.map((p, i) => (
          <button
            key={i}
            onClick={() => onOpenPhoto(i)}
            className={`group relative overflow-hidden rounded-xl bg-background ${p.span} shadow-card`}
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className={`h-full w-full object-cover transition-all duration-[1400ms] group-hover:scale-110 ${p.ratio}`}
            />
            <div className="absolute inset-0 bg-background/0 transition-colors duration-700 group-hover:bg-background/20" />
            {p.video && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ivory/80 bg-background/30 text-ivory backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-accent group-hover:text-accent">
                  <Play size={18} />
                </span>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-center md:mt-12">
        <button
          onClick={onOpenAll}
          className="group inline-flex items-center gap-3 rounded-full border border-accent/40 px-7 py-3.5 text-[11px] uppercase tracking-[0.3em] text-ivory transition-all duration-500 hover:border-accent hover:bg-accent hover:text-accent-foreground hover:shadow-glow"
        >
          Смотреть все {sec.count} фото · {sec.title.toLowerCase()}
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
