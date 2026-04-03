import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp, FaFacebookF, FaTwitter } from "react-icons/fa";
import logo from "../assets/logo.png"; // Importing your logo

function Footer() {
  return (
    <footer className="relative bg-blue-900 text-blue-100 pt-20 pb-8 px-6 md:px-16 overflow-hidden">
      
      {/* Playful Top Wave Decor */}
      <div className="absolute top-0 left-0 w-full overflow-hidden rotate-180 line-height-0">
        <svg className="relative block w-full h-[40px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 relative z-10">

        {/* LOGO / ABOUT */}
        <div className="space-y-6">
          <Link to="/" className="inline-block">
            <img src={logo} alt="School Logo" className="h-16 w-auto brightness-0 invert" />
          </Link>
          <p className="text-blue-200/80 leading-relaxed text-sm font-medium">
            Creating a joyful learning environment where every child's curiosity is nurtured and celebrated.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-yellow-400 rounded-full"></span>
            Explore
          </h3>
          <ul className="space-y-4">
            {["Home", "About Us", "Admission", "Blogs", "Gallery", "Fees", "Contact"].map((item) => (
              <li key={item}>
                <Link 
                  to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`} 
                  className="hover:text-yellow-400 transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-all text-yellow-400">●</span>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-yellow-400 rounded-full"></span>
            Get in Touch
          </h3>
          <div className="space-y-5 text-sm">
            <div className="flex items-start gap-4 group">
              <div className="bg-blue-800 p-2.5 rounded-lg group-hover:bg-yellow-400 group-hover:text-blue-900 transition-colors">
                <span className="text-lg">📍</span>
              </div>
              <p className="text-blue-100">Daulatabad, Haryana,<br />India - 122006</p>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="bg-blue-800 p-2.5 rounded-lg group-hover:bg-yellow-400 group-hover:text-blue-900 transition-colors">
                <span className="text-lg">📞</span>
              </div>
              <p className="text-blue-100">+91 98765 43210</p>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="bg-blue-800 p-2.5 rounded-lg group-hover:bg-yellow-400 group-hover:text-blue-900 transition-colors">
                <span className="text-lg">✉️</span>
              </div>
              <p className="text-blue-100">hello@playway.com</p>
            </div>
          </div>
        </div>

        {/* SOCIAL MEDIA */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-yellow-400 rounded-full"></span>
            Join Our Community
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: <FaInstagram />, color: "hover:bg-pink-500", link: "https://instagram.com" },
              { icon: <FaWhatsapp />, color: "hover:bg-green-500", link: "https://wa.me/919876543210" },
              { icon: <FaFacebookF />, color: "hover:bg-blue-600", link: "https://facebook.com" },
              { icon: <FaTwitter />, color: "hover:bg-sky-400", link: "https://twitter.com" },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                className={`bg-white/10 p-4 rounded-2xl ${social.color} hover:text-white hover:-translate-y-2 transition-all duration-300 backdrop-blur-sm border border-white/5 shadow-xl text-xl`}
              >
                {social.icon}
              </a>
            ))}
          </div>
          <div className="mt-8 bg-yellow-400/10 border border-yellow-400/20 p-4 rounded-2xl">
              <p className="text-xs text-yellow-200 font-semibold uppercase tracking-widest mb-1">Office Hours</p>
              <p className="text-sm text-white font-bold">Mon - Sat: 8:00 AM - 2:00 PM</p>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="max-w-7xl mx-auto border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p className="text-sm text-blue-200/50 font-medium italic">
          Designed with ❤️ for our little learners.
        </p>
        <p className="text-sm text-blue-200/50 font-medium">
          © {new Date().getFullYear()} Play Way School. All rights reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;