import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/wedding/Nav";
import { Hero } from "@/components/wedding/Hero";
import { LoveStory } from "@/components/wedding/LoveStory";
import { WeddingDay } from "@/components/wedding/WeddingDay";
import { VideoSection } from "@/components/wedding/VideoSection";
import { Wishes } from "@/components/wedding/Wishes";
import { Download } from "@/components/wedding/Download";
import { ThankYou } from "@/components/wedding/ThankYou";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A & D — Наш день. Наша история." },
      {
        name: "description",
        content:
          "Кинематографический архив свадьбы A & D — фото, видео и воспоминания о 20 августа 2024.",
      },
      { property: "og:title", content: "A & D — Наш день. Наша история." },
      {
        property: "og:description",
        content: "Премиум-архив свадебного дня: история, фото, фильм и пожелания.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative bg-background text-foreground">
      <Nav />
      <Hero />
      <LoveStory />
      <WeddingDay />
      <VideoSection />
      <Wishes />
      <Download />
      <ThankYou />
    </main>
  );
}
