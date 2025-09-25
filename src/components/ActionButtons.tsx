export default function ActionButtons() {
  const baseStyle: React.CSSProperties = {
    padding: '14px 16px',
    borderRadius: 12,
    border: 'none',
    cursor: 'pointer',
    fontSize: 16,
    fontWeight: 500,
    color: '#fff',
    background: 'var(--accent)',
  };

  return (
    <div style={{ display: 'grid', gap: 12, marginTop: 24 }}>
      <button style={baseStyle}>Рецепты</button>
      <button style={baseStyle}>Мой холодильник</button>
    </div>
  );
}
