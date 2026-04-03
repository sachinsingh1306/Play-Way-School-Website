import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Type, 
  AlignLeft, 
  Eye, 
  Loader2, 
  FileText 
} from "lucide-react";

function BlogsAdmin() {
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: "",
  });

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await API.post("/blogs", form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setForm({ title: "", content: "", image: "" });
      fetchBlogs();
    } catch (err) {
      console.error("Error creating blog", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await API.delete(`/blogs/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchBlogs();
    } catch (err) {
      console.error("Error deleting blog", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Blog <span className="text-blue-600">Management</span>
          </h1>
          <p className="text-slate-500 font-medium">Create and manage your school's latest updates.</p>
        </header>

        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* --- LEFT: NEW BLOG FORM --- */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200 border border-slate-100 sticky top-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                  <Plus size={20} />
                </div>
                <h2 className="text-xl font-black text-slate-800 tracking-tight">New Article</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Article Title</label>
                  <div className="relative">
                    <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input
                      className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-400 focus:bg-white outline-none transition-all font-bold text-slate-900"
                      type="text"
                      name="title"
                      placeholder="e.g. Summer Camp 2026"
                      value={form.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Content</label>
                  <div className="relative">
                    <AlignLeft className="absolute left-4 top-5 text-slate-300" size={18} />
                    <textarea
                      className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-400 focus:bg-white outline-none transition-all font-bold text-slate-900 min-h-[180px] resize-none"
                      name="content"
                      placeholder="Write your story here..."
                      value={form.content}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Cover Image URL</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input
                      className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-400 focus:bg-white outline-none transition-all font-bold text-slate-900"
                      type="text"
                      name="image"
                      placeholder="https://..."
                      value={form.image}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl text-lg font-black shadow-lg shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <FileText size={20} />}
                  Publish Post
                </button>
              </form>
            </div>
          </div>

          {/* --- RIGHT: BLOG LIST --- */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                <Eye size={20} className="text-slate-400" /> Existing Posts
              </h2>
              <span className="bg-slate-200 text-slate-600 px-3 py-1 rounded-full text-xs font-black uppercase">
                {blogs.length} Total
              </span>
            </div>

            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div 
                  key={blog._id} 
                  className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col md:flex-row gap-6 items-center"
                >
                  {/* Thumbnail */}
                  <div className="w-full md:w-32 h-32 bg-slate-100 rounded-2xl overflow-hidden flex-shrink-0 relative">
                    {blog.image ? (
                      <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <ImageIcon size={32} />
                      </div>
                    )}
                  </div>

                  {/* Content Preview */}
                  <div className="flex-grow">
                    <h3 className="text-lg font-black text-slate-900 mb-2 leading-tight">
                      {blog.title}
                    </h3>
                    <p className="text-slate-500 font-semibold text-sm line-clamp-2 italic">
                      {blog.content}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex-shrink-0">
                    <button 
                      onClick={() => deleteBlog(blog._id)}
                      className="p-4 bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-slate-100/50 rounded-[3rem] border-2 border-dashed border-slate-200">
                <FileText className="mx-auto text-slate-300 mb-4" size={48} />
                <p className="font-black text-slate-400 uppercase tracking-widest text-sm">No articles published yet.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default BlogsAdmin;