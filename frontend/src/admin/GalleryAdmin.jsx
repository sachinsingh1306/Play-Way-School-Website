import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { 
  Upload, 
  Trash2, 
  Image as ImageIcon, 
  X, 
  Plus, 
  Loader2, 
  Camera,
  CheckCircle2
} from "lucide-react";

function GalleryAdmin() {
  const { user } = useContext(AuthContext);
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const fetchImages = async () => {
    try {
      const res = await API.get("/gallery");
      setImages(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Create a local preview URL
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);

    try {
      await API.post("/gallery", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setFile(null);
      setPreview(null);
      setTitle("");
      fetchImages();
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const deleteImage = async (id) => {
    if (!window.confirm("Remove this image from the gallery?")) return;
    try {
      await API.delete(`/gallery/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchImages();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <header className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Photo <span className="text-blue-600">Gallery</span>
          </h1>
          <p className="text-slate-500 font-medium">Update the school's visual journey and event photos.</p>
        </header>

        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* --- LEFT: UPLOAD PANEL --- */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200 border border-slate-100 sticky top-10">
              <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                <Plus className="text-blue-600" /> New Upload
              </h2>

              <form onSubmit={handleUpload} className="space-y-6">
                {/* Custom File Input */}
                <div className="relative group">
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={handleFileChange}
                    accept="image/*"
                    required={!preview}
                  />
                  <div className={`aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all ${preview ? 'border-blue-400 bg-blue-50' : 'border-slate-200 bg-slate-50 group-hover:bg-slate-100'}`}>
                    {preview ? (
                      <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
                    ) : (
                      <>
                        <Upload className="text-slate-400 mb-2 group-hover:scale-110 transition-transform" size={32} />
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Select Photo</span>
                      </>
                    )}
                  </div>
                  {preview && (
                    <button 
                      onClick={() => {setPreview(null); setFile(null);}}
                      className="absolute -top-2 -right-2 bg-white text-red-500 p-1.5 rounded-full shadow-lg border border-red-50 z-20 hover:scale-110 transition-transform"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Caption / Title</label>
                  <input
                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-blue-400 focus:bg-white outline-none transition-all font-bold text-slate-900"
                    type="text"
                    placeholder="e.g. Annual Sports Day"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isUploading || !file}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-black shadow-lg shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isUploading ? (
                    <Loader2 className="animate-spin" size={22} />
                  ) : (
                    <>
                      <Camera size={20} />
                      Post to Gallery
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* --- RIGHT: PHOTO GRID --- */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                <ImageIcon size={20} className="text-slate-400" /> Current Collection
              </h2>
              <span className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                {images.length} Photos
              </span>
            </div>

            {images.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {images.map((img) => (
                  <div 
                    key={img._id} 
                    className="group relative bg-white p-3 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden"
                  >
                    <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-100">
                      <img
                        src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/uploads/${img.image}`}
                        alt={img.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    <div className="px-2 pb-2">
                      <p className="text-sm font-black text-slate-900 truncate">{img.title || "Untitled Image"}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-1">
                        <CheckCircle2 size={10} className="text-green-500" /> Live on site
                      </p>
                    </div>

                    {/* Delete Overlay */}
                    <button 
                      onClick={() => deleteImage(img._id)}
                      className="absolute top-5 right-5 p-2.5 bg-red-500 text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                <ImageIcon className="text-slate-200 mb-4" size={64} />
                <p className="text-slate-400 font-black uppercase tracking-widest text-sm text-center px-6">
                  Your gallery is empty.<br />Time to add some memories!
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default GalleryAdmin;