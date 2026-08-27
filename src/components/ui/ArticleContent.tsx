import { ReactNode } from "react";

export function ArticleH2({ children }: { children: ReactNode }) {
  return <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">{children}</h2>;
}

export function ArticleH3({ children }: { children: ReactNode }) {
  return <h3 className="font-display text-base font-bold text-navy">{children}</h3>;
}

export function ArticleP({ children }: { children: ReactNode }) {
  return <p className="text-sm leading-relaxed text-charcoal/80 sm:text-base">{children}</p>;
}

export function ArticleList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2 text-sm leading-relaxed text-charcoal/80 sm:text-base">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-0.5 text-gold">&bull;</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ArticleCallout({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-gold/30 bg-gold/5 p-4 text-sm leading-relaxed text-navy">
      {children}
    </div>
  );
}

export function ArticlePlaceholder({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-navy/20 bg-white/60 p-6 text-center text-sm text-navy/60">
      {children}
    </div>
  );
}

interface TableColumn {
  key: string;
  label: string;
}

export function ArticleTable({
  columns,
  rows,
}: {
  columns: TableColumn[];
  rows: Record<string, ReactNode>[];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-navy/10">
      <table className="w-full min-w-[480px] border-collapse text-sm">
        <thead>
          <tr className="bg-navy text-left text-white">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-semibold">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-cream"}>
              {columns.map((col) => (
                <td key={col.key} className="border-t border-navy/10 px-4 py-3 text-charcoal/80">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
