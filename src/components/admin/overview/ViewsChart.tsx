"use client";

import * as React from "react";

export function AdminLineChart({ points }: { points: number[] }) {
  const w = 900;
  const h = 220;
  const pad = 20;

  const max = Math.max(...points, 1);
  const min = Math.min(...points, 0);
  const span = Math.max(1, max - min);

  const toX = (i: number) =>
    pad + (i / Math.max(1, points.length - 1)) * (w - pad * 2);
  const toY = (v: number) => pad + ((max - v) / span) * (h - pad * 2);

  const d = points
    .map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i).toFixed(2)} ${toY(v).toFixed(2)}`)
    .join(" ");

  const area = `${d} L ${toX(points.length - 1).toFixed(2)} ${(h - pad).toFixed(
    2,
  )} L ${toX(0).toFixed(2)} ${(h - pad).toFixed(2)} Z`;

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border/60 bg-background/60 p-3">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-[220px] w-full"
        role="img"
        aria-label="Views over time"
      >
        <defs>
          <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#0EA5E9" stopOpacity="0.95" />
            <stop offset="1" stopColor="#22C55E" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0EA5E9" stopOpacity="0.18" />
            <stop offset="1" stopColor="#22C55E" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* grid */}
        {Array.from({ length: 5 }).map((_, i) => {
          const y = pad + (i / 4) * (h - pad * 2);
          return (
            <line
              key={i}
              x1={pad}
              x2={w - pad}
              y1={y}
              y2={y}
              stroke="currentColor"
              opacity="0.08"
            />
          );
        })}

        <path d={area} fill="url(#fill)" />
        <path d={d} fill="none" stroke="url(#line)" strokeWidth="3" />

        {points.map((v, i) => (
          <circle
            key={i}
            cx={toX(i)}
            cy={toY(v)}
            r={4}
            fill="hsl(var(--background))"
            stroke="url(#line)"
            strokeWidth="2"
          />
        ))}
      </svg>
      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>{points.length} points</span>
        <span>
          range: {min.toLocaleString()}–{max.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

