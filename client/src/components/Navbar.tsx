import { Link } from "react-router-dom";
import { useState } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = false; // Replace with auth logic

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Groceries", path: "/groceries" },
    { name: "Meals", path: "/meals" },
    { name: "Drinks", path: "/drinks" },
  ];

  const renderLinks = (isMobile = false) => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.name}
          to={link.path}
          className={`${
            isMobile ? "block" : ""
          } hover:text-purple-600 transition`}>
          {link.name}
        </Link>
      ))}
      <Link
        to="/cart"
        className={`${
          isMobile ? "block" : ""
        } text-purple-900 hover:text-purple-600 transition text-lg`}
      >
        <FaShoppingCart />
      </Link>
      {isLoggedIn ? (
        <>
          <Link
            to="/profile"
            className={`${isMobile ? "block" : ""} hover:text-purple-600`}>
            Profile
          </Link>
          <button
            className={`${isMobile ? "block" : ""} hover:text-purple-600`}>
            Logout
          </button>
        </>
      ) : (
        <Link
          to="/login"
          className={`${isMobile ? "block" : ""} hover:text-purple-600 text-lg`}>
          <FaUserCircle />
        </Link>
      )}
    </>
  );

  return (
    <nav className="bg-gradient-to-r from-purple-200 via-purple-100 to-purple-50 shadow-md 
    text-purple-800 font-[Poppins]">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold tracking-wide text-purple-900
           transition-all duration-300">
          <IoFastFood className="text-purple-800" size={26} />
          Urban Munch
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center text-sm text-black font-medium">
          {renderLinks()}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-purple-700"
          onClick={() => setMenuOpen(!menuOpen)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}/>
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-2 text-sm font-medium">
          {renderLinks(true)}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
