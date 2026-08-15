// Grain.tsx — SOHAN // SYSTEM 5.0
// Static film-grain overlay for atmospheric depth.
// Pure CSS background (inline SVG turbulence), no runtime cost.
// pointer-events none; fully inert for screen readers.
const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`;

const Grain: React.FC = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 z-[80] opacity-[0.035] mix-blend-overlay"
    style={{ backgroundImage: GRAIN_SVG }}
  />
);

export default Grain;
