import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { 
  UserCircle, 
  Phone, 
  Mail, 
  GraduationCap, 
  MessageSquare, 
  Trash2, 
  ExternalLink,
  Search,
  Filter
} from "lucide-react";

function Admissions() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      const res = await API.get("/admission", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setData(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this application?")) return;
    try {
      await API.delete(`/admission/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setData(data.filter(item => item._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Student <span className="text-blue-600">Admissions</span>
            </h1>
            <p className="text-slate-500 font-medium">Manage and review new enrollment requests.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <input 
                type="text" 
                placeholder="Search student..." 
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all w-full md:w-64"
               />
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* --- DATA TABLE --- */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Student & Parent</th>
                  <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Contact Info</th>
                  <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Applied Class</th>
                  <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Message</th>
                  <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Actions</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="py-20 text-center">
                      <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
                    </td>
                  </tr>
                ) : data.length > 0 ? (
                  data.map((item) => (
                    <tr key={item._id} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                            <UserCircle size={24} />
                          </div>
                          <div>
                            <p className="font-black text-slate-900">{item.studentName}</p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">P: {item.parentName}</p>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-5">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                            <Phone size={14} className="text-slate-400" /> {item.phone}
                          </div>
                          <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                            <Mail size={14} className="text-slate-400" /> {item.email || "No Email"}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-50 text-pink-600 rounded-lg text-xs font-black uppercase tracking-tight border border-pink-100">
                          <GraduationCap size={14} /> {item.classApplied}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="max-w-[200px]">
                          <p className="text-sm text-slate-500 line-clamp-2 italic font-medium">
                            {item.message ? `"${item.message}"` : "No special notes."}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-2">
                          <a 
                            href={`tel:${item.phone}`}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="Call Parent"
                          >
                            <Phone size={18} />
                          </a>
                          <button 
                            onClick={() => handleDelete(item._id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-20 text-center">
                      <div className="flex flex-col items-center opacity-30">
                        <MessageSquare size={48} className="mb-2" />
                        <p className="font-black uppercase tracking-widest text-sm">No applications found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- FOOTER STATS --- */}
        <div className="mt-6 flex justify-between items-center px-4">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            Total Applications: {data.length}
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-colors">
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Admissions;