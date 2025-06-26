import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import toast from "react-hot-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({ ...product, quantity: 1 });
    toast.success(`${product.name} added to cart ✅`);
  };

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold text-[rgb(63,56,70)]">{product.name}</h3>
      <p className="text-gray-600">${product.price.toFixed(2)}</p>
      <p className="text-sm text-gray-500 mb-3">{product.description}</p>

      <div className="flex justify-between mt-auto">
        <Link
          to={`/product/${product.id}`}
          className="text-sm text-purple-600 hover:underline"
        >
          View Details
        </Link>
        <button
          onClick={handleAdd}
          className="bg-purple-700 text-white text-sm px-3 py-1 rounded-md hover:bg-purple-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
