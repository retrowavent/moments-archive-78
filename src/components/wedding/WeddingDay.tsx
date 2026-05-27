import { useState } from "react";
import { Play, ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { PhotoViewer, type ViewerPhoto } from "./PhotoViewer";
import b1 from "@/assets/images/bridal-prep/bridal-prep1.png";
import b2 from "@/assets/images/bridal-prep/bridal-prep2.png";
import b3 from "@/assets/images/bridal-prep/bridal-prep3.png";
import b4 from "@/assets/images/bridal-prep/bridal-prep4.png";
import c1 from "@/assets/images/ceremony/ceremony1.png";
import c2 from "@/assets/images/ceremony/ceremony2.png";
import c3 from "@/assets/images/ceremony/ceremony3.png";
import c4 from "@/assets/images/ceremony/ceremony4.png";
import c5 from "@/assets/images/ceremony/ceremony5.png";
import c6 from "@/assets/images/ceremony/ceremony6.png";
import r1 from "@/assets/images/reception/reception1.png";
import r2 from "@/assets/images/reception/reception2.png";
import r3 from "@/assets/images/reception/reception3.png";
import r4 from "@/assets/images/reception/reception4.png";
import r5 from "@/assets/images/reception/reception5.png";
import f1 from "@/assets/images/first-dance/first-dance1.png";
import f2 from "@/assets/images/first-dance/first-dance2.png";
import f3 from "@/assets/images/first-dance/first-dance3.png";
import f4 from "@/assets/images/first-dance/first-dance4.png";
import f5 from "@/assets/images/first-dance/first-dance5.png";

const sections = [
  { id: "bridal", title: "Утро невесты", time: "08:00 – 11:00", text: "Тихий свет утра, нежность и ожидание.", photos: [b1, b2, b3, b4] },
  { id: "ceremony", title: "Церемония", time: "12:00 – 13:00", text: "Слова клятвы и взгляды, в которых остановилось время.", photos: [c1, c2, c3, c4, c5, c6] },
  { id: "reception", title: "Банкет", time: "17:00 – 22:00", text: "Свечи, смех и тепло семьи в каждом кадре.", photos: [r1, r2, r3, r4, r5] },
  { id: "dance", title: "Первый танец и салют", time: "22:00 – 00:30", text: "Финальный аккорд вечера: танец и огни в ночном небе.", photos: [f1, f2, f3, f4, f5] },
] as const;

export function WeddingDay() {
  const headRef = useReveal<HTMLDivElement>();
  const [viewer, setViewer] = useState<{ photos: ViewerPhoto[]; index: number; title: string } | null>(null);

  return (
    <section id="day" className="relative overflow-hidden bg-surface py-28 md:py-44">
      <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-accent/8 to-transparent" />
      <div className="mx-auto max-w-7xl px-6">
        <div ref={headRef} className="reveal text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-accent">Глава II</p>
          <h2 className="font-display text-5xl md:text-8xl"><span className="italic">День</span> свадьбы</h2>
        </div>

        <div className="mt-20 space-y-24 md:space-y-36">
          {sections.map((sec, idx) => (
            <GallerySection
              key={sec.id}
              sec={sec}
              idx={idx}
              onOpenPhoto={(i) => setViewer({ photos: sec.photos.map((src, j) => ({ src, alt: `${sec.title} ${j + 1}`, video: sec.id === "dance" && j === 1 })), index: i, title: sec.title })}
              onOpenAll={() => setViewer({ photos: sec.photos.map((src, j) => ({ src, alt: `${sec.title} ${j + 1}`, video: sec.id === "dance" && j === 1 })), index: 0, title: sec.title })}
            />
          ))}
        </div>
      </div>
      {viewer && <PhotoViewer photos={viewer.photos} startIndex={viewer.index} title={viewer.title} onClose={() => setViewer(null)} />}
    </section>
  );
}

function GallerySection({ sec, idx, onOpenPhoto, onOpenAll }: { sec: (typeof sections)[number]; idx: number; onOpenPhoto: (i: number) => void; onOpenAll: () => void }) {
  const ref = useReveal<HTMLDivElement>();
  const layout = [
    "grid-cols-2 md:grid-cols-4 md:auto-rows-[180px]",
    "grid-cols-2 md:grid-cols-6 md:auto-rows-[170px]",
    "grid-cols-2 md:grid-cols-5 md:auto-rows-[190px]",
    "grid-cols-2 md:grid-cols-4 md:auto-rows-[220px]",
  ][idx];

  return (
    <article ref={ref} className="reveal">
      <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-accent">{sec.time}</p>
          <h3 className="mt-3 font-display text-4xl text-ivory md:text-6xl">{sec.title}</h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{sec.text}</p>
        </div>
      </div>

      <div className={`grid auto-rows-[140px] gap-3 md:gap-5 ${layout}`}>
        {sec.photos.map((photo, i) => (
          <button key={i} onClick={() => onOpenPhoto(i)} className={`group relative overflow-hidden rounded-xl bg-background shadow-card ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
            <img src={photo} alt={`${sec.title} ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1600ms] group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20 opacity-70" />
            {sec.id === "dance" && i === 1 && <div className="absolute inset-0 flex items-center justify-center"><span className="flex h-14 w-14 items-center justify-center rounded-full border border-ivory/80 bg-black/40 text-ivory backdrop-blur-md"><Play size={18} /></span></div>}
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-center md:mt-10">
        <button onClick={onOpenAll} className="group inline-flex items-center gap-3 rounded-full border border-accent/40 px-7 py-3 text-[11px] uppercase tracking-[0.3em] text-ivory transition-all duration-500 hover:border-accent hover:bg-accent hover:text-accent-foreground hover:shadow-glow">
          Смотреть все фото <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </article>
  );
}
