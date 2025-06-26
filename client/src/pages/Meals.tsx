import ProductCard from "../components/ProductCard";
import RecipeSection from "../components/RecipeSection";

const meals = [
  {
    id: 1,
    name: "Spicy Chicken Wrap",
    price: 5.49,
    image: "/meals/chicken-wrap.jpg",
    description: "Grilled chicken, spicy sauce, and fresh veggies in a warm wrap.",
  },
  {
    id: 2,
    name: "Beef Burger Deluxe",
    price: 6.99,
    image: "/meals/beef-burger.jpg",
    description: "Juicy beef patty with cheese, lettuce, and house sauce.",
  },
  {
    id: 3,
    name: "Veggie Delight Bowl",
    price: 4.75,
    image: "/meals/veggie-bowl.jpg",
    description: "Healthy bowl with seasoned veggies and grains.",
  },
  {
    id: 4,
    name: "Grilled Fish Tacos",
    price: 7.25,
    image: "/meals/fish-tacos.jpg",
    description: "Tacos filled with grilled fish, slaw, and citrus sauce.",
  },
  {
    id: 5,
    name: "Chicken Alfredo Pasta",
    price: 8.99,
    image: "/meals/alfredo.jpg",
    description: "Creamy Alfredo pasta topped with grilled chicken.",
  },
  {
    id: 6,
    name: "BBQ Rib ",
    price: 6.45,
    image: "/meals/bbq-rib.jpg",
    description: "Soft bun loaded with BBQ ribs and tangy slaw.",
  },
  {
    id: 7,
    name: "Vegan Falafel Wrap",
    price: 5.25,
    image: "/meals/falafel.jpg",
    description: "Crispy falafel with hummus and pickles in pita.",
  },
  {
    id: 8,
    name: "Beef steak",
    price: 9.50,
    image: "/meals/steak.jpg",
    description: "juicy well done beef steak, seaweed salad, and soy sauce.",
  },
{
  id: 9,
  name: "BBQ Pulled Pork Sandwich",
  price: 6.75,
  image: "/meals/bbq-pork.jpg",
  description: "Slow-cooked pulled pork in tangy BBQ sauce on a toasted bun.",
},
{
  id: 10,
  name: "Thai Green Curry",
  price: 7.80,
  image: "/meals/thai-curry.jpg",
  description: "Creamy coconut curry with chicken, basil, and fresh green veggies.",
},
{
  id: 11,
  name: "Loaded Nachos Supreme",
  price: 5.95,
  image: "/meals/nachos.jpg",
  description: "Crispy tortilla chips topped with cheese, beef, beans, and salsa.",
},
{
  id: 12,
  name: "Chicken Biryani",
  price: 7.25,
  image: "/meals/biryani.jpg",
  description: "Aromatic basmati rice cooked with spicy chicken and herbs.",
}
]

const Meal = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-[rgb(63,56,70)] mb-8 text-center">Our Meals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {meals.map((meal) => (
          <ProductCard key={meal.id} product={meal} />
        ))}
      </div>
      <RecipeSection/>
    </div>
  );
};

export default Meal;
