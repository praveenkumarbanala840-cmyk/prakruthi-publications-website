"use client";

import { useMemo, useState } from "react";
import type { PreviousPaper } from "@/data/papers";

/**
 * Pulls the post/subject codes segment out of a title, exactly as written —
 * no guessing. Titles look like "<EXAM> <YEAR> - <codes> - <d Mon yyyy>,
 * Shift <n>" — strip the trailing date/shift (anchored at the end, so it's
 * unambiguous regardless of how many " - " the codes themselves contain),
 * then strip everything up to and including the first remaining " - "
 * (the "<EXAM> <YEAR>" prefix, whatever that exam's name happens to be).
 */
function codesFromTitle(title: string): string {
  const withoutSuffix = title.replace(/ - \d{1,2} [A-Za-z]{3} \d{4}, Shift \d+$/, "");
  const firstDash = withoutSuffix.indexOf(" - ");
  return firstDash === -1 ? withoutSuffix : withoutSuffix.slice(firstDash + 3);
}

/** The first " - "-delimited segment of the codes, used as the filter-chip value. */
function chipFromCodes(codes: string): string {
  const idx = codes.indexOf(" - ");
  return idx === -1 ? codes : codes.slice(0, idx);
}

function formatDisplayDate(iso: string) {
  const [year, month, day] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function PapersExplorer({ papers }: { papers: PreviousPaper[] }) {
  const [query, setQuery] = useState("");
  const [activeChip, setActiveChip] = useState<string | null>(null);

  const chips = useMemo(() => {
    const set = new Set<string>();
    for (const p of papers) set.add(chipFromCodes(codesFromTitle(p.title)));
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [papers]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return papers.filter((p) => {
      if (activeChip && chipFromCodes(codesFromTitle(p.title)) !== activeChip) return false;
      if (q && !p.title.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [papers, query, activeChip]);

  const groups = useMemo(() => {
    const byDate = new Map<string, PreviousPaper[]>();
    for (const p of filtered) {
      if (!byDate.has(p.date)) byDate.set(p.date, []);
      byDate.get(p.date)!.push(p);
    }
    return [...byDate.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  }, [filtered]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by post, subject, or date…"
          aria-label="Search previous papers"
          className="w-full rounded-full border border-charcoal/15 bg-white px-4 py-2 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-teal focus:outline-none sm:max-w-xs"
        />
        <p className="text-sm text-charcoal/60">
          Showing {filtered.length} of {papers.length} papers
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveChip(null)}
          className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
            activeChip === null
              ? "border-ink bg-ink text-white"
              : "border-charcoal/15 bg-white text-charcoal hover:border-teal"
          }`}
        >
          All
        </button>
        {chips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => setActiveChip(chip === activeChip ? null : chip)}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
              chip === activeChip
                ? "border-ink bg-ink text-white"
                : "border-charcoal/15 bg-white text-charcoal hover:border-teal"
            }`}
          >
            {chip}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-8">
        {groups.length === 0 && (
          <p className="text-sm text-charcoal/60">No papers match your search.</p>
        )}
        {groups.map(([date, datePapers]) => (
          <div key={date}>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-charcoal/50">
              {formatDisplayDate(date)}
            </h3>
            <ul className="mt-3 divide-y divide-charcoal/10 rounded-xl border border-charcoal/10 bg-white">
              {datePapers.map((paper) => (
                <li
                  key={paper.path}
                  className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-charcoal">{paper.title}</p>
                    <p className="text-xs text-charcoal/50">{paper.size} MB</p>
                  </div>
                  <a
                    href={paper.path}
                    download
                    className="shrink-0 rounded-full bg-mint px-4 py-1.5 text-xs font-semibold text-black hover:bg-mint-dark"
                  >
                    Download PDF
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
