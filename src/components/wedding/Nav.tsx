import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#story", label: "История" },
  { href: "#day", label: "День свадьбы" },
  { href: "#photos", label: "Фото" },
  { href: "#video", label: "Видео" },
  { href: "#wishes", label: "Пожелания" },
  { href: "#download", label: "Скачать" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled
            ? "backdrop-blur-xl bg-background/70 border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10 md:py-6">
          <a href="#top" className="group flex items-center gap-2">
            <span className="font-display text-xl tracking-[0.25em] text-ivory md:text-2xl">
              A <span className="text-accent">&</span> D
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-[11px] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-ivory"
              >
                {l.label}
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <button
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ivory transition hover:border-accent hover:text-accent md:hidden"
            aria-label="Открыть меню"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-background/95 backdrop-blur-2xl transition-all duration-700 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <span className="font-display text-xl tracking-[0.25em] text-ivory">
            A <span className="text-accent">&</span> D
          </span>
          <button
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ivory"
            aria-label="Закрыть меню"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="mt-12 flex flex-col items-center gap-8 px-8">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-3xl text-ivory transition-colors hover:text-accent"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 700ms ${i * 70}ms var(--ease-cinema), transform 700ms ${i * 70}ms var(--ease-cinema)`,
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
