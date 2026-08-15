/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── BLACK SYSTEM — 8 distinct near-black surfaces ──
        void:      "#020202",   // absolute black
        abyss:     "#050505",   // near-void
        base:      "#0A0A0A",   // primary background
        deep:      "#0F0F0F",   // slightly lifted
        surface:   "#131313",   // card/panel surface
        raised:    "#181818",   // elevated surface
        lift:      "#1E1E1E",   // hover surface
        border:    "#242424",   // structural border
        // ── GREY SYSTEM — 6 grey/charcoal values ──
        dim:       "#444444",   // secondary label
        muted:     "#666666",   // tertiary text
        subtle:    "#888888",   // quaternary
        ghost:     "#AAAAAA",   // very subtle
        // ── WHITE SYSTEM — 5 white values ──
        fog:       "#E8E8E8",   // primary text (slightly warm)
        pale:      "#F0F0F0",   // brighter text
        pure:      "#FAFAFA",   // near-white
        white:     "#FFFFFF",   // absolute white
        // ── RED SYSTEM — 7 red values ──
        ember:     "#3D0000",   // background tint
        crimson:   "#7F1D1D",   // deep red
        blood:     "#991B1B",   // dark red
        signal:    "#DC2626",   // primary accent / active
        bright:    "#EF4444",   // bright signal
        glow:      "#FCA5A5",   // very light red for text
      },
      fontFamily: {
        sans:  ["Inter", "system-ui", "sans-serif"],
        mono:  ["JetBrains Mono", "Courier New", "monospace"],
      },
      fontSize: {
        "display-3xl": ["clamp(5rem,14vw,16rem)",  { lineHeight: "0.88", letterSpacing: "-0.045em" }],
        "display-2xl": ["clamp(4rem,11vw,13rem)",  { lineHeight: "0.9",  letterSpacing: "-0.04em"  }],
        "display-xl":  ["clamp(2.5rem,6vw,7.5rem)",{ lineHeight: "0.93", letterSpacing: "-0.03em"  }],
        "display-lg":  ["clamp(1.8rem,3.5vw,4.5rem)",{ lineHeight: "1",  letterSpacing: "-0.02em"  }],
        "display-md":  ["clamp(1.2rem,2.2vw,2.8rem)",{ lineHeight: "1.05",letterSpacing: "-0.015em"}],
        "label-xs":    ["0.55rem", { lineHeight: "1", letterSpacing: "0.18em" }],
        "label-sm":    ["0.65rem", { lineHeight: "1", letterSpacing: "0.14em" }],
        "label-md":    ["0.75rem", { lineHeight: "1", letterSpacing: "0.10em" }],
      },
      spacing: {
        "section": "clamp(5rem, 10vw, 12rem)",
      },
      maxWidth: {
        "editorial": "1440px",
      },
      animation: {
        "blink":    "blink 1.2s step-end infinite",
        "fade-up":  "fadeUp 0.6s ease forwards",
        "fade-in":  "fadeIn 0.4s ease forwards",
        "pulse-red":"pulseRed 2s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseRed: {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0.4" },
        },
      },
    },
  },
  plugins: [],
}
