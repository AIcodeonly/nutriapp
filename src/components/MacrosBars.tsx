type Macros = { protein: number; fat: number; carbs: number }; // граммы

export default function MacrosBars({ values }: { values: Macros }) {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Bar label="Белки" grams={values.protein} color="var(--accent)" />
      <Bar label="Жиры" grams={values.fat} color="#FFC107" />
      <Bar label="Углеводы" grams={values.carbs} color="#2196F3" />
    </div>
  );
}

function Bar({
  label,
  grams,
  color,
}: {
  label: string;
  grams: number;
  color: string;
}) {
  // пока просто рисуем половину шкалы (50%) — позже подставим реальный прогресс
  const widthPercent = 50;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 4,
        }}
      >
        <span>{label}</span>
        <span style={{ color: 'var(--muted)' }}>{grams} г</span>
      </div>
      <div
        style={{
          background: 'var(--border)',
          height: 8,
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${widthPercent}%`,
            background: color,
            height: 8,
            borderRadius: 8,
          }}
        />
      </div>
    </div>
  );
}
