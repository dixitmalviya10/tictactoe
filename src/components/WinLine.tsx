import type { Line } from "../game/types";

/** Strike-through drawn across the three winning cells. */
export function WinLine({ line }: { line: Line }) {
  const [start, , end] = line;
  const center = (i: number) => [(i % 3) + 0.5, Math.floor(i / 3) + 0.5];
  const [x1, y1] = center(start);
  const [x2, y2] = center(end);

  return (
    <svg
      viewBox="0 0 3 3"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full">
      <defs>
        {/* userSpaceOnUse: a horizontal/vertical line has a zero-area bounding
            box, and an objectBoundingBox gradient on one is never painted. */}
        <linearGradient
          id="win-stroke"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="3"
          y2="3">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#f0abfc" />
        </linearGradient>
      </defs>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="url(#win-stroke)"
        strokeWidth="0.07"
        strokeLinecap="round"
        pathLength={1}
        style={{ strokeDasharray: 1 }}
        className="animate-draw-line drop-shadow-[0_0_10px_rgba(232,121,249,0.9)]"
      />
    </svg>
  );
}
