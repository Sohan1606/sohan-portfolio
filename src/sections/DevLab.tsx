// DevLab.tsx — SOHAN // DEV LAB STRIP
// Reference-style brand strip, translated into Sohan's coder world:
// the tools his systems actually run through — no borrowed wordmarks.
import React from "react";

interface Brand {
  word: string;
  tone: "fog" | "dim" | "signal" | "box";
  offset: boolean;
}

const BRANDS: Brand[] = [
  { word: "vscode",      tone: "fog",    offset: false },
  { word: "github",      tone: "dim",    offset: true  },
  { word: "vercel",      tone: "fog",    offset: false },
  { word: "docker",      tone: "dim",    offset: true  },
  { word: "original code", tone: "fog",  offset: false },
  { word: "sohan",       tone: "signal", offset: true  },
  { word: "Dev Lab",     tone: "box",    offset: false },
];

const BrandItem: React.FC<{ brand: Brand; index: number }> = ({ brand, index }) => (
  <li className="flex items-center shrink-0 snap-start">
    <a
      href="#work"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
      className={`group flex items-center ${brand.offset ? "mt-3 md:mt-5" : ""} focus-visible:outline-signal`}
      data-cursor="button"
      aria-label={`${brand.word} — go to Best Work`}
    >
      {brand.tone === "box" ? (
        <span className="inline-flex items-center border-2 border-signal px-3 md:px-5 py-1.5 md:py-2.5
                         font-sans font-black uppercase tracking-[-0.04em]
                         text-[clamp(1.4rem,3.2vw,3.4rem)] leading-none text-signal
                         transition-all duration-200
                         group-hover:bg-signal group-hover:text-white
                         motion-safe:group-hover:-translate-y-1">
          {brand.word}
        </span>
      ) : (
        <span className={[
          "font-sans font-black uppercase tracking-[-0.045em] leading-none select-none",
          "text-[clamp(2.2rem,5.4vw,5.6rem)]",
          "transition-all duration-200 motion-safe:group-hover:-translate-y-1",
          brand.tone === "signal"
            ? "text-signal"
            : brand.tone === "dim"
              ? "text-fog/22 group-hover:text-signal/80"
              : "text-fog/78 group-hover:text-signal",
        ].join(" ")}
        >
          {brand.word}
        </span>
      )}
    </a>
    {index < BRANDS.length - 1 && (
      <span className="w-1.5 h-1.5 bg-signal/60 rotate-45 shrink-0 mx-4 md:mx-7 self-center"
        aria-hidden="true" />
    )}
  </li>
);

const DevLab: React.FC = () => (
  <section aria-label="Dev Lab — tools and brands" className="relative bg-void border-b border-border/25 overflow-hidden">
    {/* faint red wash from below */}
    <div className="absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(circle_at_50%_100%,rgba(220,38,38,0.09),transparent_70%)]"
      aria-hidden="true" />

    <div className="editorial py-10 md:py-14 relative">
      {/* annotation row */}
      <div className="flex items-center gap-3 mb-8 md:mb-10">
        <span className="font-mono text-[0.52rem] tracking-[0.22em] uppercase text-signal">
          // Dev Lab
        </span>
        <span className="h-px flex-1 bg-border/25" aria-hidden="true" />
        <span className="hidden sm:block font-mono text-[0.48rem] tracking-[0.22em] uppercase text-dim/60">
          original code · no templates
        </span>
      </div>

      {/* brand row — snap-scrolls horizontally on small screens */}
      <ul
        className="flex items-start gap-0 overflow-x-auto pb-2 md:overflow-visible snap-x
                   [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Brands and tools behind the builds"
      >
        {BRANDS.map((brand, index) => (
          <BrandItem key={brand.word} brand={brand} index={index} />
        ))}
      </ul>

      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-void to-transparent"
        aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-void to-transparent"
        aria-hidden="true" />
    </div>
  </section>
);

export default DevLab;
