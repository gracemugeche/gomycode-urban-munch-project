import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-purple-100 via-purple-200 to-purple-300 
    text-gray-800 mt-20 rounded-t-3xl shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2
       md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-purple-700 mb-3">
            Urban Munch
          </h2>
          <p className="text-sm leading-relaxed">
            Fresh groceries and ready meals delivered with care. <br />
            Bringing flavor to your doorstep.
          </p>
        </div>

        {/* Explore */}
        <FooterList
          title="Explore"
          links={["About Us", "Contact", "Careers", "Blog"]}
        />

        {/* Help */}
        <FooterList
          title="Help"
          links={["FAQs", "Support", "Delivery Info", "Returns"]}
        />

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-purple-800 mb-3">
            Follow Us
          </h3>
          <div className="flex space-x-4">
            {[FaFacebook, FaTwitter, FaInstagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-purple-700 hover:scale-125 transition-transform"
              >
                <Icon size={22} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-xs text-purple-900 bg-purple-100 py-4
       border-t border-purple-200">
        &copy; {new Date().getFullYear()} Urban Munch. Crafted with 💜 by Grace.
      </div>
    </footer>
  );
};

// ✅ Reusable subcomponent
const FooterList = ({ title, links }: { title: string; links: string[] }) => (
  <div>
    <h3 className="text-lg font-semibold text-purple-800 mb-3">{title}</h3>
    <ul className="space-y-2 text-sm">
      {links.map((text, idx) => (
        <li key={idx}>
          <a
            href="#"
            className="hover:text-purple-600 transition-all duration-300"
          >
            {text}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
