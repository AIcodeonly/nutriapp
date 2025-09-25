import React from 'react';

type Props = {
  caloriesLeft: number; // сколько ккал осталось на сегодня
  percent: number;      // прогресс съеденного: 0..1 (например, 0.35 = 35%)
};

function clamp01(n: number) { return Math.min(1, Math.max(0, n)); }

export default function Ring({ caloriesLeft, percent }: Props) {
  const pct = clamp01(percent);
  const angle = Math.round(pct * 360);

  // внешний круг — conic-gradient рисует зелёную дугу
  const circleStyle: React.CSSProperties = {
    width: 180,
    height: 180,
    borderRadius: '50%',
    background: `conic-gradient(var(--accent) 0 ${angle}deg, var(--border) ${angle}deg 360deg)`,
    display: 'grid',
    placeItems: 'center',
    margin: '0 auto 16px',
  };

  // внутренний белый круг — делает «пончик»
  const innerStyle: React.CSSProperties = {
    width: 140,
    height: 140,
    borderRadius: '50%',
    background: '#fff',
    display: 'grid',
    placeItems: 'center',
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={circleStyle}>
        <div style={innerStyle}>
          <div style={{ fontSize: 22, fontWeight: 700 }}>{caloriesLeft} ккал</div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>осталось</div>
        </div>
      </div>
    </div>
  );
}
