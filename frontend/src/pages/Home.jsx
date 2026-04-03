import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  GraduationCap,
  Sparkles,
  Star,
  Heart,
  Smile,
} from "lucide-react";
import home_header from "../assets/home_header.png";
import mobile_header from "../assets/mobile_home_banner.png";
import yellow_bg from "../assets/yellow_bg.png"; // Using your asset
import About from "./About";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="font-sans text-blue-900 bg-white overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[90vh] md:h-[95vh] flex items-center justify-start overflow-hidden">
        {/* Background with Zoom Effect */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] scale-110 hover:scale-100"
          style={{
            backgroundImage: `url(${isMobile ? mobile_header : home_header})`,
          }}
        ></div>

        {/* Playful Light Overlay (White/Blue mix for a fresher feel) */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent md:from-white/80"></div>

        {/* Hero Content */}
        <div className="relative z-10 w-full lg:w-2/3 px-6 md:px-16 lg:px-24 pt-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 text-blue-900 text-sm font-black mb-6 shadow-lg animate-bounce-slow">
            <Sparkles size={18} className="text-blue-700" />
            <span className="uppercase tracking-wider">
              Admissions Open 2026
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-blue-900 mb-6 leading-[1.1] tracking-tight">
            A Happy Place to <br />
            <span className="text-blue-600 relative inline-block">
              Learn & Play
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-yellow-400"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 25 0 50 5 T 100 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                />
              </svg>
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-blue-800/80 max-w-xl mb-10 leading-relaxed font-semibold">
            Nurturing young minds through creativity, discovery, and a love for
            learning that lasts a lifetime.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <Link to="/admission">
              <button className="group flex items-center justify-center gap-3 bg-blue-600 text-white px-10 py-5 rounded-2xl text-xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300">
                Enroll Your Child
                <ArrowRight
                  size={22}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </button>
            </Link>
            <Link to="/gallery">
              <button className="flex items-center justify-center gap-2 bg-white text-blue-600 border-2 border-blue-100 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-blue-50 transition-all shadow-sm">
                Our Gallery
              </button>
            </Link>
          </div>
        </div>

        {/* Wave transition to next section */}
        <div className="absolute bottom-0 left-0 w-full leading-[0]">
          <svg
            className="relative block w-full h-[60px]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
      </section>

      {/* --- STATS BAR --- */}
      <section className="relative z-20 -mt-8 max-w-6xl mx-auto px-4">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 p-10 rounded-[2.5rem] shadow-2xl border-4 border-white overflow-hidden relative"
          style={{
            backgroundImage: `url(${yellow_bg})`,
            backgroundSize: "cover",
          }}
        >
          {/* Subtle overlay to make text readable on yellow_bg */}
          <div className="absolute inset-0 bg-yellow-400/20 backdrop-blur-[2px]"></div>

          {[
            { label: "Happy Kids", val: "1,200+", icon: <Smile size={20} /> },
            { label: "Teachers", val: "80+", icon: <Heart size={20} /> },
            { label: "Activities", val: "25+", icon: <Star size={20} /> },
            { label: "Safe Campus", val: "100%", icon: <Sparkles size={20} /> },
          ].map((stat, i) => (
            <div
              key={i}
              className="relative z-10 text-center flex flex-col items-center"
            >
              <div className="text-blue-900/50 mb-1">{stat.icon}</div>
              <p className="text-3xl md:text-4xl font-black text-blue-900">
                {stat.val}
              </p>
              <p className="text-blue-800 text-xs font-bold uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <div className="py-20 relative">
        <About />
        {/* Decorative Element */}
        <div className="absolute top-0 right-0 p-10 opacity-10 hidden lg:block">
          <GraduationCap size={200} className="text-blue-900 rotate-12" />
        </div>
      </div>

      {/* --- CTA SECTION --- */}
      <section className="relative py-28 bg-blue-50/50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-yellow-400 rounded-full"></div>

        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="inline-block p-5 bg-white text-yellow-500 rounded-3xl mb-8 shadow-xl rotate-3">
            <GraduationCap size={50} />
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight text-blue-950">
            Ready to start the <br />
            <span className="text-blue-600 underline decoration-yellow-400 decoration-wavy underline-offset-8">
              Adventure?
            </span>
          </h2>
          <p className="text-xl text-blue-800/70 mb-12 leading-relaxed font-medium">
            Join our family today and watch your child flourish in a world of
            imagination and discovery.
          </p>

          <Link to="/admission">
            <button className="bg-yellow-400 text-blue-900 px-12 py-6 rounded-[2rem] font-black text-2xl shadow-2xl shadow-yellow-200 hover:bg-yellow-500 transition-all duration-300 hover:scale-105 uppercase tracking-tighter">
              Join the Fun 2026
            </button>
          </Link>

          <p className="mt-8 text-sm text-blue-400 font-bold uppercase tracking-widest">
            ✨ Limited Seats Left for our Tiny Explorers!
          </p>
        </div>
      </section>
    </div>
  );
}
