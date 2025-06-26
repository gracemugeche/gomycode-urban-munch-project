import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const categories = [
  {
    name: "Groceries",
    image: "/groceries/groceries.jpg",
    link: "/groceries",
    description: "Stock up on essentials delivered straight to your door.",
  },
  {
    name: "Meals",
    image: "/meals/meals.jpg",
    link: "/meals",
    description: "Enjoy ready-made meals that taste like home.",
  },
  {
    name: "Drinks",
    image: "/drinks/drinks.jpg",
    link: "/drinks",
    description: "refreshing drinks,made with pure love.",
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[rgb(63,56,70)]">
            Explore Categories
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Discover fresh meals, groceries, and fruits curated just for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <Link to={category.link}>
                <div className="h-56 w-full overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover object-center rounded-t-xl"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-[rgb(63,56,70)] mb-1">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center text-purple-600 font-medium hover:underline">
                    Browse <FaArrowRight className="ml-2" size={14} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
