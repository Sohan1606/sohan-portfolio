/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // BLACK SYSTEM
        void:    "#050505",
        base:    "#0A0A0A",
        surface: "#111111",
        raised:  "#1A1A1A",
        border:  "#222222",
        // WHITE SYSTEM
        fog:     "#F5F5F5",
        ghost:   "#FAFAFA",
        pure:    "#FFFFFF",
        muted:   "#888888",
        dim:     "#555555",
        // RED SYSTEM
        signal:  "#DC2626",
        deep:    "#B91C1C",
        ember:   "#7F1D1D",
      },
      fontFamily: {
        sans:  ["Inter", "system-ui", "sans-serif"],
        mono:  ["JetBrains Mono", "Courier New", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(4rem, 12vw, 14rem)", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
        "display-xl":  ["clamp(2.5rem, 7vw, 8rem)",  { lineHeight: "0.92", letterSpacing: "-0.03em" }],
        "display-lg":  ["clamp(1.8rem, 4vw, 5rem)",   { lineHeight: "1", letterSpacing: "-0.02em" }],
        "display-md":  ["clamp(1.2rem, 2.5vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "label-sm":    ["0.65rem", { lineHeight: "1", letterSpacing: "0.15em" }],
        "label-md":    ["0.75rem", { lineHeight: "1", letterSpacing: "0.12em" }],
      },
      spacing: {
        "section": "clamp(6rem, 12vw, 14rem)",
      },
      maxWidth: {
        "editorial": "1400px",
      },
      animation: {
        "blink": "blink 1.2s step-end infinite",
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
}

