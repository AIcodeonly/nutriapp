import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Macros = { kcal: number; protein: number; fat: number; carbs: number };
type Ingredient = { name: string; amount: string };
type Recipe = {
  id: string;
  title: string;
  imageUrl: string;
  macros: Macros;
  ingredients: Ingredient[];
  steps: string[];
};

// 🔹 Мок-данные (позже заменим на Supabase)
const MOCK_RECIPES: Record<string, Recipe> = {
  "42": {
    id: "42",
    title: "Овсянка с ягодами",
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
    macros: { kcal: 380, protein: 18, fat: 9, carbs: 56 },
    ingredients: [
      { name: "Овсяные хлопья", amount: "60 г" },
      { name: "Молоко 2.5%", amount: "200 мл" },
      { name: "Греческий йогурт", amount: "80 г" },
      { name: "Ягоды (микс)", amount: "100 г" },
      { name: "Мёд", amount: "1 ч. л." },
    ],
    steps: [
      "Хлопья залить молоком и варить 3–5 минут до мягкости.",
      "Добавить йогурт и мёд, перемешать.",
      "Сверху выложить ягоды. Готово!",
    ],
  },
};

export default function RecipeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const recipe = useMemo(() => (id ? MOCK_RECIPES[id] : undefined), [id]);

  useEffect(() => {
    // Сбрасываем чекбоксы при смене рецепта
    setChecked({});
  }, [id]);

  if (!id) return <div className="p-4">Нет id рецепта</div>;
  if (!recipe) return <div className="p-4">Рецепт не найден</div>;

  const allChecked =
    recipe.ingredients.length > 0 &&
    recipe.ingredients.every((_, idx) => checked[idx]);

  const toggle = (idx: number) =>
    setChecked((prev) => ({ ...prev, [idx]: !prev[idx] }));

  const onPick = () => {
    // TODO: заменить на добавление в Дневник (Supabase) + n8n триггеры
    console.log("Добавлено в Дневник:", recipe.id);
    // Небольшая навигация обратно в Дневник (главный экран)
    navigate("/", { replace: true });
  };

  return (
    <div className="w-full max-w-[430px] mx-auto">
      <div className="p-4 pb-24">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-48 object-cover rounded-2xl"
        />

        <h1 className="text-xl font-semibold mt-3">{recipe.title}</h1>

        {/* Краткие КБЖУ */}
        <div className="flex gap-2 mt-2 text-sm">
          <Badge>Ккал: {recipe.macros.kcal}</Badge>
          <Badge>Б: {recipe.macros.protein} г</Badge>
          <Badge>Ж: {recipe.macros.fat} г</Badge>
          <Badge>У: {recipe.macros.carbs} г</Badge>
        </div>

        {/* Ингредиенты с галочками */}
        <section className="mt-4">
          <h2 className="text-base font-medium mb-2">Ингредиенты</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ing, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between rounded-xl border border-gray-200 px-3 py-2"
              >
                <label className="flex items-center gap-3 w-full">
                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    checked={!!checked[idx]}
                    onChange={() => toggle(idx)}
                  />
                  <span className="text-sm">
                    {ing.name} <span className="text-gray-500">· {ing.amount}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </section>

        {/* Шаги готовки */}
        <section className="mt-5">
          <h2 className="text-base font-medium mb-2">Шаги</h2>
          <ol className="list-decimal pl-5 space-y-2 text-sm">
            {recipe.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </section>
      </div>

      {/* Футер с кнопкой */}
      <div className="fixed bottom-4 left-0 right-0">
        <div className="mx-auto w-full max-w-[430px] px-4">
          <button
            onClick={onPick}
            disabled={!allChecked}
            className={`w-full py-3 rounded-2xl text-white text-base font-medium ${
              allChecked ? "bg-black" : "bg-gray-300"
            }`}
          >
            Выбрать
          </button>
        </div>
      </div>
    </div>
  );
}

// Маленький утиль-компонент «пилюля»
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-1 rounded-full bg-gray-100 border border-gray-200">
      {children}
    </span>
  );
}
