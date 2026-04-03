import { useEffect, useState } from "react";
import API from "../services/api";
import { X, Maximize2, Camera, Sparkles } from "lucide-react";

function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchGallery = async () => {
    try {
      const res = await API.get("/gallery");
      setImages(res.data);
    } catch (error) {
      console.error("Gallery fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50/30 pb-20 font-sans text-blue-900">
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-blue-600 pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-black uppercase tracking-widest text-yellow-400">
            <Sparkles size={14} /> Capturing Every Smile
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            School <span className="text-yellow-400">Memories</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl font-medium max-w-2xl mx-auto opacity-90">
            A window into the daily life, celebrations, and creative journeys of our little explorers.
          </p>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full leading-[0]">
          <svg className="relative block w-full h-[50px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#f8fafc"></path>
          </svg>
        </div>
      </section>

      {/* --- GRID SECTION --- */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="mt-4 font-black text-blue-900/40 uppercase tracking-widest text-sm">Developing Photos...</p>
          </div>
        ) : images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {images.map((item, idx) => (
              <div 
                key={item._id}
                onClick={() => setSelectedImg(item)}
                className="group relative bg-white p-4 pb-8 rounded-[2rem] shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer border border-blue-50"
                style={{ transform: `rotate(${idx % 2 === 0 ? '1deg' : '-1deg'})` }}
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
                  <img
                    src={`http://localhost:5000/uploads/${item.image}`}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white p-3 rounded-full text-blue-900 shadow-xl scale-50 group-hover:scale-100 transition-transform">
                      <Maximize2 size={24} />
                    </div>
                  </div>
                </div>

                {/* Caption */}
                <div className="mt-6 text-center">
                  <h3 className="font-black text-blue-950 text-lg tracking-tight truncate">
                    {item.title || "Happy Moment"}
                  </h3>
                  <div className="flex justify-center mt-2">
                    <div className="w-8 h-1 bg-yellow-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[4rem] border-4 border-dashed border-blue-100">
            <Camera size={64} className="mx-auto text-blue-100 mb-4" />
            <h3 className="text-2xl font-black text-blue-950">No photos shared yet!</h3>
            <p className="text-blue-800/50 font-bold">We're busy making memories. Check back soon!</p>
          </div>
        )}
      </main>

      {/* --- LIGHTBOX MODAL --- */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-fade-in"
          onClick={() => setSelectedImg(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-blue-950/90 backdrop-blur-md"></div>

          {/* Modal Content */}
          <div 
            className="relative z-10 max-w-5xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedImg(null)}
              className="absolute -top-12 right-0 md:-right-12 p-3 text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={32} />
            </button>

            <div className="bg-white p-3 rounded-[2.5rem] shadow-2xl animate-scale-up">
              <img
                src={`http://localhost:5000/uploads/${selectedImg.image}`}
                alt="Full view"
                className="max-h-[70vh] md:max-h-[75vh] w-auto rounded-[1.8rem] object-contain shadow-inner"
              />
              <div className="py-6 px-4 text-center">
                <h2 className="text-2xl md:text-3xl font-black text-blue-950 tracking-tight">
                  {selectedImg.title}
                </h2>
                {selectedImg.description && (
                   <p className="mt-2 text-blue-800/60 font-semibold">{selectedImg.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;