import { useEffect, useState } from "react";
import API from "../services/api";
import { Sparkles, Calendar, ArrowRight, Camera, ImageIcon } from "lucide-react";

const KID_QUOTES = [
  { text: "Play is the highest form of research.", author: "Albert Einstein" },
  { text: "Children need the freedom and time to play. Play is not a luxury. Play is a necessity.", author: "Kay Redfield Jamison" },
  { text: "Every child is an artist. The problem is how to remain an artist once he grows up.", author: "Pablo Picasso" },
  { text: "Playing is our favorite way of learning.", author: "Diane Ackerman" }
];

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState(KID_QUOTES[0]);

  useEffect(() => {
    setQuote(KID_QUOTES[Math.floor(Math.random() * KID_QUOTES.length)]);
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blogs");
      setBlogs(res.data);
    } catch (error) {
      console.error("Error fetching school blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50/30 font-sans text-blue-950 pb-20">
      
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden bg-blue-600 pt-32 pb-24 px-6">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-[-10%] left-[-5%] w-72 h-72 bg-yellow-400 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-pink-400 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative mx-auto max-w-5xl text-center z-10">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-yellow-400 text-blue-900 text-xs font-black tracking-widest uppercase mb-6 shadow-xl shadow-yellow-400/20">
            <Camera size={14} /> Our Daily Adventures
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
            Little Steps, <br />
            <span className="text-yellow-400 relative inline-block">
                Big Discoveries!
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-white/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
            </span>
          </h1>
          
          <div className="mt-10 mx-auto max-w-3xl bg-white/10 backdrop-blur-lg p-8 rounded-[2.5rem] border-2 border-white/20 shadow-2xl rotate-1">
            <p className="text-xl md:text-3xl leading-snug text-blue-50 font-bold italic">
              "{quote.text}"
            </p>
            <p className="mt-4 text-yellow-400 font-black text-sm uppercase tracking-widest">— {quote.author}</p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full leading-[0]">
          <svg className="relative block w-full h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#f8fafc"></path>
          </svg>
        </div>
      </section>

      {/* --- BLOG FEED --- */}
      <main className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-blue-950 mb-4 tracking-tight">The Joy of Learning</h2>
          <p className="text-lg text-blue-800/60 font-bold uppercase tracking-widest text-sm text-[12px]">Capturing memories one day at a time</p>
          <div className="mt-6 flex justify-center gap-3">
            <div className="w-12 h-2 bg-pink-400 rounded-full"></div>
            <div className="w-12 h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-12 h-2 bg-blue-400 rounded-full"></div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-64">
            <div className="animate-spin rounded-2xl h-14 w-14 border-4 border-blue-600 border-t-yellow-400 shadow-xl"></div>
            <p className="mt-6 font-black text-blue-900/40 uppercase tracking-widest text-xs">Opening the scrapbook...</p>
          </div>
        ) : (
          /* Grid Change: Set to 1 column to allow horizontal cards to span full width */
          <div className="grid gap-8 grid-cols-1">
            {blogs.map((blog, index) => (
              <article
                key={blog._id}
                /* Horizontal on Medium (md) screens, vertical on small */
                className="group flex flex-col md:flex-row bg-white rounded-[3rem] shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden border-2 border-transparent hover:border-blue-100 items-stretch"
              >
                {/* Image Section: Fixed width on desktop, full width on mobile */}
                <div className="relative w-full md:w-[40%] h-64 md:h-auto overflow-hidden m-4 rounded-[2rem] bg-slate-100 shrink-0">
                  {blog.image ? (
                    <img
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={blog.image}
                      alt={blog.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/600x400?text=Adventure+Coming+Soon";
                      }}
                    />
                  ) : (
                    <div className="h-full w-full bg-blue-50 flex flex-col items-center justify-center gap-2">
                      <ImageIcon size={40} className="text-blue-200" />
                      <span className="text-xs font-black text-blue-200 uppercase tracking-widest">Memory Card</span>
                    </div>
                  )}
                  
                  <div className="absolute top-4 left-4">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] shadow-lg backdrop-blur-md ${
                        index % 2 === 0 ? 'bg-pink-500/90 text-white' : 'bg-yellow-400/90 text-blue-900'
                    }`}>
                      {index % 2 === 0 ? 'Creative Arts' : 'Outdoor Play'}
                    </span>
                  </div>
                </div>

                {/* Text Content: Takes remaining space on desktop */}
                <div className="p-8 md:py-10 md:pr-12 flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-blue-400 mb-3">
                    <Calendar size={14} />
                    <span className="text-xs font-bold uppercase tracking-widest">
                        {new Date(blog.createdAt || Date.now()).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-black leading-tight text-blue-950 group-hover:text-blue-600 transition-colors mb-4">
                    {blog.title}
                  </h3>
                  
                  <p className="text-blue-800/60 leading-relaxed line-clamp-3 md:line-clamp-4 font-semibold text-sm mb-6">
                    {blog.content}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-blue-50">
                    <button className="flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                        Read Story <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Blogs;