"use client";

import { useEffect, useState } from "react";
import type { CourseOffer, CoursePrice } from "@/data/types";

export default function PriceOfferSection({
  price,
  offer,
}: {
  price?: CoursePrice;
  offer?: CourseOffer;
}) {
  // Checked client-side (not at build time) so an expired offer disappears
  // for visitors immediately, even on a statically-generated page.
  const [offerValid, setOfferValid] = useState(false);

  useEffect(() => {
    if (!offer) return;
    // Reads the visitor's real clock so the offer disappears on its
    // validUntil date without needing a rebuild/redeploy.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOfferValid(new Date(offer.validUntil + "T23:59:59") >= new Date());
  }, [offer]);

  // Hidden entirely until a real price exists (never a "see in the app"
  // placeholder).
  if (!price) return null;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold text-charcoal sm:text-3xl">
          Price
        </h2>
        <p className="mt-4 font-display text-3xl font-extrabold text-charcoal">
          {price.amount}
        </p>
        {offer && offerValid && (
          <p className="mt-4 rounded-xl border border-teal/30 bg-teal/5 p-4 text-sm text-charcoal">
            {offer.description}
          </p>
        )}
      </div>
    </section>
  );
}
