import React from 'react';

/* 4px track, accent fill, 5 × 12 thumb. The filled portion is driven by a
   --fill custom property, set here rather than by a stylesheet, because it
   is a live value. Always pair it with a Field so the number is visible. */
export function Slider({ min = 0, max = 100, step = 1, value, onChange, className = '', style, ...rest }) {
  const pct = Math.max(0, Math.min(100, ((Number(value) - min) / (max - min)) * 100));
  return (
    <input type="range" className={('dcs-slider ' + className).trim()}
      min={min} max={max} step={step} value={value} onChange={onChange}
      style={{ '--fill': pct + '%', ...style }} {...rest} />
  );
}
