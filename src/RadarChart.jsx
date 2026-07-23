import React from 'react';

const CX = 230;
const CY = 155;
const R = 98;
const LABEL_R = 118;

const pointAt = (index, count, fraction) => {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / count;
  return [CX + Math.cos(angle) * R * fraction, CY + Math.sin(angle) * R * fraction];
};

const toPolygon = (points) => points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

// Splits a label onto two lines at the space nearest its middle.
const splitLabel = (label) => {
  if (label.length <= 14 || !label.includes(' ')) return [label];
  const mid = label.length / 2;
  let best = -1;
  for (let i = 0; i < label.length; i += 1) {
    if (label[i] === ' ' && (best === -1 || Math.abs(i - mid) < Math.abs(best - mid))) best = i;
  }
  return [label.slice(0, best), label.slice(best + 1)];
};

export default function RadarChart({ data, title }) {
  const count = data.length;
  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <svg
      viewBox="0 0 460 310"
      role="img"
      aria-label={title}
      className="w-full max-w-md mx-auto animate-fade-in motion-reduce:animate-none"
    >
      <title>{title}</title>
      {gridLevels.map((level) => (
        <polygon
          key={level}
          points={toPolygon(data.map((_, i) => pointAt(i, count, level)))}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="1"
        />
      ))}
      {data.map((_, i) => {
        const [x, y] = pointAt(i, count, 1);
        return <line key={i} x1={CX} y1={CY} x2={x} y2={y} stroke="#E2E8F0" strokeWidth="1" />;
      })}

      <polygon
        points={toPolygon(data.map((d, i) => pointAt(i, count, d.value)))}
        fill="#2E7191"
        fillOpacity="0.15"
        stroke="#2E7191"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {data.map((d, i) => {
        const [x, y] = pointAt(i, count, d.value);
        return (
          <g key={d.label}>
            <circle cx={x} cy={y} r="4" fill="#2E7191" />
            <circle cx={x} cy={y} r="12" fill="transparent">
              <title>{`${d.label}: ${Math.round(d.value * 100)}%`}</title>
            </circle>
          </g>
        );
      })}

      {data.map((d, i) => {
        const angle = -Math.PI / 2 + (i * 2 * Math.PI) / count;
        const x = CX + Math.cos(angle) * LABEL_R;
        const y = CY + Math.sin(angle) * LABEL_R;
        const cos = Math.cos(angle);
        const anchor = Math.abs(cos) < 0.3 ? 'middle' : cos > 0 ? 'start' : 'end';
        const lines = splitLabel(d.label);
        const firstDy = y > CY + 10 ? 10 : lines.length > 1 ? -6 : 4;
        return (
          <text
            key={d.label}
            x={x}
            y={y}
            textAnchor={anchor}
            fontSize="11"
            fill="#475569"
            fontWeight="600"
          >
            {lines.map((line, lineIdx) => (
              <tspan key={lineIdx} x={x} dy={lineIdx === 0 ? firstDy : 12}>
                {line}
              </tspan>
            ))}
          </text>
        );
      })}
    </svg>
  );
}
