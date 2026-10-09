import ClickToLoadVideo from "@/components/ui/ClickToLoadVideo";
import type { CourseVideo } from "@/data/types";

export default function ShortsRow({ shorts }: { shorts: CourseVideo[] }) {
  if (shorts.length === 0) return null;

  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold text-charcoal sm:text-3xl">
          Short Clips
        </h2>
        <div className="mt-8 flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {shorts.map((short) => (
            <div key={short.youtubeId} className="w-40 shrink-0 sm:w-48">
              <ClickToLoadVideo youtubeId={short.youtubeId} title={short.title} aspect="short" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
