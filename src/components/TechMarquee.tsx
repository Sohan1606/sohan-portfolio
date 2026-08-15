// TechMarquee.tsx — SOHAN // SYSTEM 5.0
// The reference site's moving technology strip — rebuilt in system language.
// Verified stack names only (flattened from the stack source of truth).
// Seamless -50% loop. Pauses on hover. Static under reduced motion.
import React from "react";
import { stack } from "../data/stack";

// Every name below exists in at least one shipped repository.
const ITEMS: string[] = stack.flatMap((group) => group.items.map((i) => i.name));

// The track renders the full list twice so translateX(-50%) loops seamlessly.
const LOOP: string[] = [...ITEMS, ...ITEMS];

const MarqueeItem: React.FC<{ name: string }> = ({ name }) => (
  <li className="flex items-center shrink-0 mr-8 md:mr-12">
    <span className="font-sans font-semibold text-sm md:text-base tracking-tight
                     text-fog/35 whitespace-nowrap select-none">
      {name}
    </span>
    <span className="w-1 h-1 bg-signal/50 rotate-45 shrink-0 ml-6 md:ml-8"
      aria-hidden="true" />
  </li>
);

const TechMarquee: React.FC = () => (
  <section aria-label="Technologies used across shipped projects"
    className="marquee relative bg-base border-t border-b border-border/30
               overflow-hidden">

    {/* Static, complete list for screen readers — the animation is decoration */}
    <p className="sr-only">
      Technologies: {ITEMS.join(", ")}.
    </p>

    <div className="py-4 md:py-5" aria-hidden="true">
      <ul className="marquee__track flex items-center w-max">
        {LOOP.map((name, i) => (
          <MarqueeItem key={`${name}-${i}`} name={name} />
        ))}
      </ul>
    </div>

    {/* Edge fades into the black */}
    <div className="pointer-events-none absolute inset-y-0 left-0 w-14 md:w-24
                    bg-gradient-to-r from-base to-transparent" aria-hidden="true" />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-14 md:w-24
                    bg-gradient-to-l from-base to-transparent" aria-hidden="true" />
  </section>
);

export default TechMarquee;
