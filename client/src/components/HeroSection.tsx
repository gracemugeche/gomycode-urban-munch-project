import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/bg image.jpg"
          alt="Urban Munch Background"
          className="w-full h-full object-cover object-center"
        />
        {/* Optional: Dark overlay for readability */}
        <div className="absolute bg-black opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center 
      text-center h-full px-4">
        <motion.div
          className="bg-white/80 p-8 rounded-xl max-w-2xl shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[rgb(72,51,90)] mb-4">
            Welcome to Urban Munch
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Your favorite destination for fast meals and fresh groceries.
          </p>
          <Link to="/groceries">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3
             rounded-full transition duration-300">
              Shop Now
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
