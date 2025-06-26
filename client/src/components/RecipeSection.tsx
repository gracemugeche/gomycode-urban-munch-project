import { useState } from "react";

const recipes = [
  {
    title: "Spicy Chicken Wrap",
    ingredients: [
      "Tortilla wrap",
      "Grilled chicken",
      "Spices",
      "Lettuce",
      "Yogurt sauce",
    ],
    steps: [
      "Grill the chicken with spices until cooked.",
      "Warm the tortilla on a pan or microwave.",
      "Layer chicken, lettuce, and yogurt sauce.",
      "Wrap tightly and serve warm.",
    ],
  },
  {
    title: "Swahili Coconut Rice",
    ingredients: [
      "2 cups rice",
      "2 cups coconut milk",
      "1 cup water",
      "Salt",
      "Cardamom (optional)",
    ],
    steps: [
      "Rinse rice and set aside.",
      "Boil coconut milk and water in a pot.",
      "Add rice and salt, then stir.",
      "Simmer on low heat until rice is fluffy.",
    ],
  },
  {
    title: "Beef Burger Deluxe",
    ingredients: [
      "Beef patty",
      "Burger bun",
      "Cheese slice",
      "Lettuce",
      "Tomato",
      "Burger sauce",
    ],
    steps: [
      "Grill the beef patty until well done.",
      "Toast the burger bun lightly.",
      "Layer the bun with lettuce, tomato, patty, and cheese.",
      "Top with sauce and serve with fries.",
    ],
  },
  {
    title: "Chapati & Beans",
    ingredients: [
      "Wheat flour",
      "Water",
      "Salt",
      "Oil",
      "Boiled beans",
      "Onion",
      "Tomatoes",
      "Spices",
    ],
    steps: [
      "Make chapati dough and roll into rounds.",
      "Fry on a hot pan until golden brown.",
      "For beans: fry onions, tomatoes, and spices.",
      "Add beans and simmer for 10 minutes.",
    ],
  },
  {
    title: "Vegetable Stir Fry",
    ingredients: [
      "Bell peppers",
      "Carrots",
      "Onions",
      "Broccoli",
      "Soy sauce",
      "Garlic",
      "Oil",
    ],
    steps: [
      "Chop all vegetables into strips.",
      "Heat oil in a pan and sauté garlic.",
      "Add vegetables and stir fry for 5–7 minutes.",
      "Add soy sauce and cook 2 more minutes.",
    ],
  },
];

const RecipeSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-16 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-[rgb(63,56,70)] mb-6 text-center">
        🍽️ Try Our Simple Recipes
      </h2>

      <div className="space-y-4">
        {recipes.map((recipe, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-sm overflow-hidden bg-white"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left px-5 py-4 font-semibold  hover:bg-purple-200
               text-purple-900 transition flex justify-between items-center">
              {recipe.title}
              <span>{openIndex === index ? "▲" : "▼"}</span>
            </button>

            {openIndex === index && (
              <div className="px-5 py-4 bg-white">
                <p className="font-medium mb-1">🧂 Ingredients:</p>
                <ul className="list-disc pl-6 text-sm text-gray-700 mb-4">
                  {recipe.ingredients.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

                <p className="font-medium mb-1">👩‍🍳 Steps:</p>
                <ol className="list-decimal pl-6 text-sm text-gray-700 space-y-1">
                  {recipe.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeSection;
