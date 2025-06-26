// src/App.tsx
import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const location = useLocation();

  // Hide navbar and footer on login/signup pages
  const hideLayoutRoutes = ["/login", "/signup","/cart" ,"/checkout"];
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHideLayout && <Navbar />}
      
      <main className="flex-grow">
        <AppRoutes />
      </main>
      
      {!shouldHideLayout && <Footer />}
    </div>
  );
}
