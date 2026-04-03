import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { 
  CreditCard, 
  Plus, 
  PencilLine, 
  Trash2, 
  IndianRupee, 
  X, 
  Save, 
  GraduationCap,
  CalendarDays,
  Wallet
} from "lucide-react";

function FeesAdmin() {
  const { user } = useContext(AuthContext);
  const [fees, setFees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    className: "",
    admissionFee: "",
    monthlyFee: "",
    annualFee: "",
  });

  const [editingId, setEditingId] = useState(null);

  const fetchFees = async () => {
    try {
      const res = await API.get("/fees");
      setFees(res.data);
    } catch (err) {
      console.error("Failed to fetch fees", err);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingId) {
        await API.put(`/fees/${editingId}`, form, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      } else {
        await API.post("/fees", form, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      }
      resetForm();
      fetchFees();
    } catch (err) {
      console.error("Submission error", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({ className: "", admissionFee: "", monthlyFee: "", annualFee: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const editFee = (fee) => {
    setForm(fee);
    setEditingId(fee._id);
    setShowForm(true);
  };

  const deleteFee = async (id) => {
    if (!window.confirm("Delete this fee structure? This cannot be undone.")) return;
    try {
      await API.delete(`/fees/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchFees();
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              Fee <span className="text-blue-600">Structures</span>
            </h1>
            <p className="text-slate-500 font-medium">Define and update the pricing for each grade.</p>
          </div>
          
          {!showForm && (
            <button 
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black transition-all shadow-lg shadow-blue-600/20 active:scale-95"
            >
              <Plus size={20} /> Add New Class
            </button>
          )}
        </header>

        {/* --- DYNAMIC FORM CARD --- */}
        {showForm && (
          <div className="bg-white rounded-[2.5rem] p-8 mb-10 border-4 border-blue-100 shadow-2xl shadow-blue-900/5 animate-in slide-in-from-top duration-300">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                {editingId ? <PencilLine className="text-blue-500" /> : <Plus className="text-blue-500" />}
                {editingId ? "Update Fee Structure" : "New Fee Structure"}
              </h2>
              <button onClick={resetForm} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Grade/Class</label>
                <input
                  className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-blue-400 focus:bg-white outline-none transition-all font-bold text-slate-900"
                  type="text"
                  name="className"
                  placeholder="e.g. Nursery"
                  value={form.className}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 font-sans">Admission Fee</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                  <input
                    className="w-full pl-10 pr-5 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-blue-400 focus:bg-white outline-none transition-all font-bold text-slate-900"
                    type="number"
                    name="admissionFee"
                    placeholder="0.00"
                    value={form.admissionFee}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Monthly Fee</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                  <input
                    className="w-full pl-10 pr-5 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-blue-400 focus:bg-white outline-none transition-all font-bold text-slate-900"
                    type="number"
                    name="monthlyFee"
                    placeholder="0.00"
                    value={form.monthlyFee}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2 lg:col-span-1">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Annual Fee</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                  <input
                    className="w-full pl-10 pr-5 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-blue-400 focus:bg-white outline-none transition-all font-bold text-slate-900"
                    type="number"
                    name="annualFee"
                    placeholder="0.00"
                    value={form.annualFee}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="md:col-span-2 lg:col-span-4 pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white py-4 rounded-xl font-black transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  <Save size={20} />
                  {editingId ? "Save Changes" : "Create Fee Entry"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* --- FEES TABLE --- */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Class Name</th>
                  <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2"><Wallet size={14}/> Admission</div>
                  </th>
                  <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2"><CalendarDays size={14}/> Monthly</div>
                  </th>
                  <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2"><CreditCard size={14}/> Annual</div>
                  </th>
                  <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Actions</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-slate-100 font-sans">
                {fees.length > 0 ? (
                  fees.map((fee) => (
                    <tr key={fee._id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black italic">
                            {fee.className.charAt(0)}
                          </div>
                          <span className="font-black text-slate-900">{fee.className}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 font-bold text-slate-600 font-mono">₹{Number(fee.admissionFee).toLocaleString()}</td>
                      <td className="px-8 py-6 font-bold text-slate-600 font-mono text-blue-600">₹{Number(fee.monthlyFee).toLocaleString()}</td>
                      <td className="px-8 py-6 font-bold text-slate-600 font-mono">₹{Number(fee.annualFee).toLocaleString()}</td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => editFee(fee)}
                            className="p-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all"
                            title="Edit"
                          >
                            <PencilLine size={18} />
                          </button>
                          <button 
                            onClick={() => deleteFee(fee._id)}
                            className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
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
                      <div className="flex flex-col items-center opacity-20">
                        <IndianRupee size={48} className="mb-2" />
                        <p className="font-black uppercase tracking-widest text-sm">No fee records found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-8 text-center text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">
          * All currency values are displayed in Indian Rupee (INR)
        </p>

      </div>
    </div>
  );
}

export default FeesAdmin;