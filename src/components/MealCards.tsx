type Meal = {
  title: string;
  calories: number;
};

export default function MealCards({ meals }: { meals: Meal[] }) {
  return (
    <div style={{ display: 'grid', gap: 12, marginTop: 24 }}>
      {meals.map((m) => (
        <div
          key={m.title}
          style={{
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: '12px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#fff',
          }}
        >
          <span style={{ fontWeight: 500 }}>{m.title}</span>
          <span style={{ color: 'var(--muted)' }}>{m.calories} ккал</span>
        </div>
      ))}
    </div>
  );
}
