import { useState } from "react";
import { CloudDownload, Loader2, CheckCircle2 } from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useReveal } from "@/hooks/use-reveal";
import hero from "@/assets/images/hero/hero.png";
import g1 from "@/assets/images/bridal-prep/bridal-prep1.png";
import g2 from "@/assets/images/bridal-prep/bridal-prep2.png";
import g3 from "@/assets/images/ceremony/ceremony1.png";
import g4 from "@/assets/images/ceremony/ceremony2.png";
import g5 from "@/assets/images/reception/reception1.png";
import g6 from "@/assets/images/reception/reception2.png";
import g7 from "@/assets/images/first-dance/first-dance1.png";
import g8 from "@/assets/images/first-dance/first-dance2.png";
import t1 from "@/assets/images/love-story/love-story1.png";
import t2 from "@/assets/images/love-story/love-story2.png";
import t3 from "@/assets/images/love-story/love-story3.png";
import t4 from "@/assets/images/love-story/love-story4.png";
import t5 from "@/assets/images/love-story/love-story5.png";

const archive: { url: string; name: string }[] = [
  { url: hero, name: "01-hero.png" },
  { url: t1, name: "story-2018.png" },
  { url: t2, name: "story-2019.png" },
  { url: t3, name: "story-2020.png" },
  { url: t4, name: "story-2022.png" },
  { url: t5, name: "story-2026.png" },
  { url: g1, name: "day-01.png" },
  { url: g2, name: "day-02.png" },
  { url: g3, name: "day-03.png" },
  { url: g4, name: "day-04.png" },
  { url: g5, name: "day-05.png" },
  { url: g6, name: "day-06.png" },
  { url: g7, name: "day-07.png" },
  { url: g8, name: "day-08.png" },
];

type State = "idle" | "loading" | "done" | "error";

export function Download() {
  const ref = useReveal<HTMLDivElement>();
  const [state, setState] = useState<State>("idle");
  const [progress, setProgress] = useState(0);

  const handleDownload = async () => {
    if (state === "loading") return;
    setState("loading");
    setProgress(0);
    try {
      const zip = new JSZip();
      const folder = zip.folder("A-and-D-wedding");
      if (!folder) throw new Error("zip folder");

      for (let i = 0; i < archive.length; i++) {
        const item = archive[i];
        const res = await fetch(item.url);
        const blob = await res.blob();
        folder.file(item.name, blob);
        setProgress(Math.round(((i + 1) / archive.length) * 100));
      }

      const out = await zip.generateAsync({ type: "blob" });
      saveAs(out, "A-and-D-wedding.zip");
      setState("done");
      window.setTimeout(() => setState("idle"), 3500);
    } catch (e) {
      console.error(e);
      setState("error");
      window.setTimeout(() => setState("idle"), 3500);
    }
  };

  const label =
    state === "loading"
      ? `Подготовка архива · ${progress}%`
      : state === "done"
        ? "Готово · архив скачан"
        : state === "error"
          ? "Ошибка · попробуйте снова"
          : `Скачать архив · ${archive.length} фото`;

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
          <button
            onClick={handleDownload}
            disabled={state === "loading"}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-gold px-7 py-3.5 text-[11px] uppercase tracking-[0.3em] text-accent-foreground transition-all duration-500 hover:shadow-glow disabled:cursor-wait disabled:opacity-80"
          >
            {state === "loading" && <Loader2 size={14} className="animate-spin" />}
            {state === "done" && <CheckCircle2 size={14} />}
            {label}
          </button>

          {state === "loading" && (
            <div className="mx-auto mt-6 h-px w-full max-w-xs overflow-hidden bg-border">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Доступно 30 дней
          </p>
          <span className="pointer-events-none absolute inset-x-10 -bottom-24 h-40 bg-accent/15 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
