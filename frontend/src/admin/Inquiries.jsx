import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { 
  Mail, 
  Phone, 
  User, 
  MessageSquare, 
  Trash2, 
  Calendar,
  ExternalLink,
  Search,
  MessageCircle // For WhatsApp-style action
} from "lucide-react";

function Inquiries() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      const res = await API.get("/contact", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setData(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteInquiry = async (id) => {
    if (!window.confirm("Remove this inquiry from the list?")) return;
    try {
      await API.delete(`/contact/${id}`, {
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
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              Visitor <span className="text-blue-600">Inquiries</span>
            </h1>
            <p className="text-slate-500 font-medium">Messages received from the website contact form.</p>
          </div>
          
          <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-sm">
            <Search className="text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter inquiries..." 
              className="bg-transparent border-none outline-none text-sm font-bold text-slate-700 w-40 md:w-64"
            />
          </div>
        </header>

        {/* --- INBOX FEED --- */}
        <div className="space-y-6">
          {loading ? (
            <div className="py-20 text-center">
              <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
            </div>
          ) : data.length > 0 ? (
            data.map((item) => (
              <div 
                key={item._id} 
                className="group bg-white rounded-[2.5rem] p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col md:flex-row gap-8"
              >
                {/* Contact Info Sidebar */}
                <div className="md:w-1/4 space-y-4 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">
                      <User size={24} />
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 leading-tight">{item.name}</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Lead</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <a href={`mailto:${item.email}`} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">
                      <Mail size={16} className="text-slate-300" /> {item.email}
                    </a>
                    <a href={`tel:${item.phone}`} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-green-600 transition-colors">
                      <Phone size={16} className="text-slate-300" /> {item.phone}
                    </a>
                  </div>
                </div>

                {/* Message Content */}
                <div className="flex-grow relative">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare size={16} className="text-blue-500" />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">Message</span>
                  </div>
                  <p className="text-slate-700 font-semibold leading-relaxed text-lg italic">
                    "{item.message}"
                  </p>
                  
                  {/* Meta Data */}
                  <div className="mt-6 flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-[11px] font-black text-slate-400 uppercase tracking-tighter">
                      <Calendar size={14} /> Received: Just now
                    </div>
                  </div>
                </div>

                {/* Action Column */}
                <div className="flex md:flex-col justify-end gap-3 md:pl-4">
                  <button 
                    onClick={() => deleteInquiry(item._id)}
                    className="p-4 bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all"
                    title="Delete Inquiry"
                  >
                    <Trash2 size={20} />
                  </button>
                  <a 
                    href={`https://wa.me/${item.phone.replace(/\D/g,'')}`} 
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 bg-slate-50 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-2xl transition-all"
                    title="WhatsApp Message"
                  >
                    <MessageCircle size={20} />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
              <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="text-slate-200" size={40} />
              </div>
              <p className="text-slate-400 font-black uppercase tracking-widest text-sm">No messages in your inbox.</p>
            </div>
          )}
        </div>

        <footer className="mt-12 text-center">
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em]">
            End of Inquiries • Secure Admin Channel
          </p>
        </footer>

      </div>
    </div>
  );
}

export default Inquiries;