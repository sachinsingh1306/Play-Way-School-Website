import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  UserPlus, 
  Image as ImageIcon, 
  CreditCard, 
  LogOut, 
  User as UserIcon,
  ChevronRight
} from "lucide-react";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const menuItems = [
    { 
      title: "Blogs", 
      desc: "Manage news and school articles", 
      path: "/admin/blogs", 
      icon: <FileText className="text-blue-500" />, 
      color: "hover:border-blue-400" 
    },
    { 
      title: "Inquiries", 
      desc: "View messages from the Contact page", 
      path: "/admin/inquiries", 
      icon: <MessageSquare className="text-green-500" />, 
      color: "hover:border-green-400" 
    },
    { 
      title: "Admissions", 
      desc: "Review new student applications", 
      path: "/admin/admissions", 
      icon: <UserPlus className="text-pink-500" />, 
      color: "hover:border-pink-400" 
    },
    { 
      title: "Gallery", 
      desc: "Upload and edit school photos", 
      path: "/admin/gallery", 
      icon: <ImageIcon className="text-purple-500" />, 
      color: "hover:border-purple-400" 
    },
    { 
      title: "Fees", 
      desc: "Update class fee structures", 
      path: "/admin/fees", 
      icon: <CreditCard className="text-yellow-500" />, 
      color: "hover:border-yellow-400" 
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* --- TOP NAVIGATION BAR --- */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl">
              <LayoutDashboard className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-black tracking-tight text-slate-800 hidden md:block">
              School Admin <span className="text-blue-600">Portal</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-slate-900">{user?.name || "Admin User"}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Super Admin</p>
            </div>
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              <UserIcon size={20} className="text-slate-400" />
            </div>
            <button 
              onClick={logout}
              className="ml-2 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              title="Logout"
            >
              <LogOut size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Welcome back, <span className="text-blue-600">{user?.name?.split(' ')[0]}!</span> 👋
          </h2>
          <p className="text-slate-500 font-semibold mt-2">What would you like to manage today?</p>
        </div>

        {/* --- GRID MENU --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div 
              key={item.title}
              onClick={() => navigate(item.path)}
              className={`group bg-white p-8 rounded-[2rem] border-2 border-transparent shadow-sm shadow-slate-200 ${item.color} cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 active:scale-95 flex flex-col h-full`}
            >
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                {item.icon}
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2 flex items-center justify-between">
                {item.title}
                <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
              </h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="max-w-7xl mx-auto px-6 pt-12 pb-8 text-center">
        <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em]">
          Version 2.0.4 • 2026 Admin Dashboard
        </p>
      </footer>
    </div>
  );
}

export default Dashboard;