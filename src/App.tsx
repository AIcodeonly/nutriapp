import { Routes, Route, NavLink, useLocation, Link } from 'react-router-dom';
import Ring from './components/Ring';
import MacrosBars from './components/MacrosBars';
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import MealCards from './components/MealCards';
import ActionButtons from './components/ActionButtons';
import './App.css';

function App() {
  const location = useLocation();
  const title =
    location.pathname === '/pantry' ? 'Мой холодильник' :
    location.pathname === '/recipes' ? 'Рецепты' :
    location.pathname === '/settings' ? 'Настройки' :
    'Дневник';

  return (
    <div className="app">
      <header className="header">{title}</header>

      <main className="content">
        <Routes>
          <Route path="/" element={<DiaryScreen />} />
          <Route path="/pantry" element={<FridgeScreen />} />
          <Route path="/recipes" element={<RecipesScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
        </Routes>
      </main>

      <nav className="tabbar">
        <NavLink to="/" end className={({ isActive }) => `tab ${isActive ? 'tab--active' : ''}`}>
          <div className="tab__icon">🏠</div>
          <div className="tab__label">Прогресс</div>
        </NavLink>
        <NavLink to="/pantry" className={({ isActive }) => `tab ${isActive ? 'tab--active' : ''}`}>
          <div className="tab__icon">🧊</div>
          <div className="tab__label">Холодильник</div>
        </NavLink>
        <NavLink to="/recipes" className={({ isActive }) => `tab ${isActive ? 'tab--active' : ''}`}>
          <div className="tab__icon">🍽️</div>
          <div className="tab__label">Рецепты</div>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `tab ${isActive ? 'tab--active' : ''}`}>
          <div className="tab__icon">⚙️</div>
          <div className="tab__label">Настройки</div>
        </NavLink>
      </nav>
    </div>
  );
}

/** --- ЭКРАНЫ --- */

function DiaryScreen() {
  return (
    <>
      <Ring caloriesLeft={1200} percent={0.35} />

      <div style={{ marginTop: 16, marginBottom: 16, color: 'var(--muted)' }}>
        Б / Ж / У на сегодня
      </div>

      <MacrosBars values={{ protein: 80, fat: 50, carbs: 150 }} />

      <MealCards
        meals={[
          { title: 'Завтрак', calories: 350 },
          { title: 'Обед', calories: 600 },
          { title: 'Ужин', calories: 250 },
        ]}
      />

      <ActionButtons />
    </>
  );
}

function FridgeScreen() {
  return <div>Экран «Мой холодильник» (пока заглушка)</div>;
}

function RecipesScreen() {
  console.log('RecipesScreen render'); // временно, чтобы увидеть в Console

  const list = [
    { id: 1, title: 'Овощной суп с чечевицей', kcal: 280 },
    { id: 2, title: 'Курица с киноа и авокадо', kcal: 420 },
  ];

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ color: 'var(--muted)' }}>Список рецептов (тест)</div>
      {list.map(item => (
        <Link
          key={item.id}
          to={`/recipes/${item.id}`}
          style={{
            display: 'block',
            padding: '12px 16px',
            border: '1px solid var(--border)',
            borderRadius: 12,
            textDecoration: 'none',
            color: 'inherit',
            background: '#fff',
          }}
        >
          <div style={{ fontWeight: 600 }}>{item.title}</div>
          <div style={{ color: 'var(--muted)' }}>{item.kcal} ккал / порция</div>
        </Link>
      ))}
    </div>
  );
}

function SettingsScreen() {
  return <div>Экран «Настройки» (пока заглушка)</div>;
}

export default App;
