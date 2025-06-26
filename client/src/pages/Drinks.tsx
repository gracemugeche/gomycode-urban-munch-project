// src/pages/Drink.tsx
import { useState } from "react";
import ProductCard from "../components/ProductCard";

const drinks = [
  {
    id: 1,
    name: "Tropical Mango Juice",
    price: 2.99,
    image: "/drinks/mango-juice.jpg",
    description: "Refreshing mango juice with real pulp.",
  },
  {
    id: 2,
    name: "Iced Coffee",
    price: 3.25,
    image: "/drinks/iced-coffee.jpg",
    description: "Chilled coffee brew with a rich, smooth taste.",
  },
  {
    id: 3,
    name: "Sparkling Water",
    price: 1.5,
    image: "/drinks/sparkling-water.jpg",
    description: "Bubbly and pure mineral water.",
  },
  {
    id: 4,
    name: "Strawberry Smoothie",
    price: 3.75,
    image: "/drinks/strawberry-smoothie.jpg",
    description: "Creamy strawberry blend with real fruit.",
  },
  {
    id: 5,
    name: "Energy Boost Drink",
    price: 2.5,
    image: "/drinks/energy-drink.jpg",
    description: "Power-packed energy for your busy days.",
  },
  {
    id: 6,
    name: "Classic Cola",
    price: 1.8,
    image: "/drinks/cola.jpg",
    description: "Original fizzy cola for every occasion.",
  },
  {
    id: 7,
    name: "Lemon Iced Tea",
    price: 2.25,
    image: "/drinks/iced-tea.jpg",
    description: "Cool lemon tea brewed to perfection.",
  },
  {
    id: 8,
    name: "Orange Juice",
    price: 2.99,
    image: "/drinks/orange-juice.jpg",
    description: "Freshly squeezed and packed with vitamin C.",
  },
  {
    id: 9,
    name: "Chocolate Milkshake",
    price: 3.5,
    image: "/drinks/choco-milkshake.jpg",
    description: "Rich and creamy chocolate goodness.",
  },
  {
    id: 10,
    name: "Vanilla Protein Shake",
    price: 4.0,
    image: "/drinks/protein-shake.jpg",
    description: "Post-workout drink packed with protein.",
  },
  {
    id: 11,
    name: "Herbal Green Tea",
    price: 1.99,
    image: "/drinks/green-tea.jpg",
    description: "Light and calming tea infused with herbs.",
  },
  {
    id: 12,
    name: "Passion Fruit Punch",
    price: 2.75,
    image: "/drinks/passion-punch.jpg",
    description: "Tropical fruit punch with a passion kick.",
  },
];

const Drink = () => {
  const [query, setQuery] = useState("");

  const filteredDrinks = drinks.filter((drink) =>
    drink.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-[rgb(63,56,70)] text-center mb-3">
        Refreshing Drinks
      </h1>

      <p className="text-center text-gray-600 max-w-xl mx-auto mb-6">
        From cold fruit blends to energizing teas, choose from our wide
        selection of refreshing beverages delivered to your doorstep.
      </p>

      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search for a drink..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 
          focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {filteredDrinks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredDrinks.map((drink) => (
            <ProductCard key={drink.id} product={drink} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No drinks found.</p>
      )}
    </div>
  );
};

export default Drink;
