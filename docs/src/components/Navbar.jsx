import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, GraduationCap, ChevronRight } from "lucide-react";
import logo from "../assets/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      // REMOVED: if (window.scrollY > 50) setIsOpen(false); 
      // This was closing your menu while the user was interacting with it.
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open to prevent the "glitchy" background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Blogs", path: "/blogs" },
    { name: "Gallery", path: "/gallery" },
    { name: "Fees", path: "/fees" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled || isOpen
          ? "bg-white shadow-md py-2" // Switch to solid white if scrolled OR menu is open
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 relative z-[110]">
        
        {/* LOGO */}
        <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center hover:scale-105 transition-transform">
          <img
            src={logo}
            alt="School Logo"
            className={`transition-all duration-500 ${
              scrolled ? "h-12 md:h-14" : "h-16 md:h-20"
            } w-auto object-contain`}
          />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-1 bg-white/20 p-1 rounded-full border border-white/30 backdrop-blur-md">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                location.pathname === link.path
                  ? "bg-yellow-400 text-blue-900"
                  : scrolled 
                    ? "text-blue-900 hover:bg-yellow-50" 
                    : "text-white hover:bg-white/20"
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <Link to="/admission" className="ml-4">
            <button className="bg-blue-600 text-white px-7 py-2.5 rounded-full font-bold text-sm hover:bg-blue-700 transition-all">
              APPLY NOW
            </button>
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className={`lg:hidden p-2 rounded-xl transition-colors ${
            isOpen || scrolled ? "text-blue-900 bg-blue-50" : "text-white bg-white/10"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU DRAWER */}
      <div
        className={`fixed inset-0 bg-white z-[100] lg:hidden transition-all duration-500 ease-in-out transform ${
          isOpen 
            ? "translate-y-0 opacity-100" 
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col pt-32 p-6 space-y-2 h-full overflow-y-auto">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between p-5 rounded-2xl text-xl font-extrabold transition-all ${
                location.pathname === link.path 
                  ? "bg-yellow-100 text-yellow-700 border-l-4 border-yellow-400" 
                  : "text-blue-900 border-b border-gray-50 active:bg-gray-100"
              }`}
            >
              {link.name}
              <ChevronRight size={20} className="text-gray-300" />
            </Link>
          ))}
          
          <div className="mt-8">
            <Link to="/admission" onClick={() => setIsOpen(false)}>
              <button className="w-full bg-blue-600 text-white p-5 rounded-2xl font-black text-xl shadow-lg flex items-center justify-center gap-3">
                <GraduationCap size={24} />
                Admission 2026
              </button>
            </Link>
            <div className="mt-10 p-6 bg-yellow-50 rounded-3xl border-2 border-dashed border-yellow-200 text-center">
                <p className="text-yellow-700 font-bold italic">"Where learning meets play!"</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;