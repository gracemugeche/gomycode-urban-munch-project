import { useState } from "react";
import ProductCard from "../components/ProductCard";

const groceries = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    price: 1.99,
    image: "/groceries/tomatoes.jpg",
    description: "Ripe and juicy tomatoes perfect for salads and cooking.",
  },
  {
    id: 2,
    name: "Brown Eggs (Tray of 30)",
    price: 3.75,
    image: "/groceries/eggs.jpg",
    description: "Farm-fresh brown eggs rich in protein.",
  },
  {
    id: 3,
    name: "Whole Milk 1L",
    price: 1.20,
    image: "/groceries/milk.jpg",
    description: "Creamy whole milk ideal for breakfast or baking.",
  },
  {
    id: 4,
    name: "White Bread Loaf",
    price: 1.10,
    image: "/groceries/bread.jpg",
    description: "Soft and fluffy white bread for your daily toast or sandwich.",
  },
  {
    id: 5,
    name: "Sugar 2kg",
    price: 2.60,
    image: "/groceries/sugar.jpg",
    description: "High-quality granulated sugar for baking and sweetening.",
  },
  {
    id: 6,
    name: "All Purpose Flour 2kg",
    price: 2.80,
    image: "/groceries/flour.jpg",
    description: "Premium wheat flour for all your cooking needs.",
  },
  {
    id: 7,
    name: "Cooking Oil 1L",
    price: 2.99,
    image: "/groceries/oil.jpg",
    description: "Refined vegetable oil suitable for frying and sautéing.",
  },
  {
    id: 8,
    name: "Fresh Bananas (1kg)",
    price: 1.50,
    image: "/groceries/bananas.jpg",
    description: "Naturally sweet bananas packed with energy.",
  },
  {
    id: 9,
    name: "Carrots (1kg)",
    price: 1.30,
    image: "/groceries/carrot.jpg",
    description: "Crunchy carrots, great for snacks and cooking.",
  },
  {
    id: 10,
    name: "Red Onions (1kg)",
    price: 1.20,
    image: "/groceries/onions.jpg",
    description: "Sharp and flavorful red onions to spice up your meals.",
  },
  {
    id: 11,
    name: "Fresh Spinach Bunch",
    price: 0.99,
    image: "/groceries/spinach.jpg",
    description: "Green and leafy spinach full of nutrients.",
  },
  {
    id: 12,
    name: "Maize Flour 2kg",
    price: 2.40,
    image: "/groceries/maize-flour.jpg",
    description: "Finely milled maize flour perfect for Ugali or porridge.",
  },
];

const Groceries = () => {
  const [search, setSearch] = useState("");

  const filteredGroceries = groceries.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* 🛒 Title and Intro */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[rgb(63,56,70)]">Grocery Essentials</h1>
        <p className="text-gray-600 mt-2">
          Everything you need for your kitchen — fresh, local, and delivered fast.
        </p>
      </div>

      {/* 🔍 Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search groceries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-purple-600"
        />
      </div>

      {/* 🧺 Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredGroceries.length > 0 ? (
          filteredGroceries.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No groceries found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default Groceries;
