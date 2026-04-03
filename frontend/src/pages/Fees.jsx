import { useEffect, useState } from "react";
import API from "../services/api";
import { CreditCard, CheckCircle, Info, Sparkles, ShieldCheck, Laptop, Utensils } from "lucide-react";

function Fees() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFees = async () => {
    try {
      const res = await API.get("/fees");
      setFees(res.data);
    } catch (error) {
      console.error("Error fetching fees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50/30 font-sans text-blue-950 pb-20">
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-blue-600 pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-black uppercase tracking-widest text-yellow-400">
            <CreditCard size={14} /> Transparent Pricing
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            Fee <span className="text-yellow-400">Structure</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl font-medium max-w-2xl mx-auto opacity-90">
            Investing in your child's education is the greatest gift you can provide. We ensure every penny translates into growth and joy.
          </p>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full leading-[0]">
          <svg className="relative block w-full h-[50px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#f8fafc"></path>
          </svg>
        </div>
      </section>

      {/* --- TABLE SECTION --- */}
      <main className="max-w-5xl mx-auto px-6 -mt-12 relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/10 overflow-hidden border-4 border-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="p-8 font-black uppercase tracking-widest text-sm">🧸 Class Name</th>
                  <th className="p-8 font-black uppercase tracking-widest text-sm">🎒 Admission Fee</th>
                  <th className="p-8 font-black uppercase tracking-widest text-sm">🌙 Monthly Fee</th>
                  <th className="p-8 font-black uppercase tracking-widest text-sm">📅 Annual Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-50">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="p-20 text-center">
                      <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                      <p className="font-bold text-blue-900/40 uppercase tracking-widest text-xs">Fetching records...</p>
                    </td>
                  </tr>
                ) : fees.map((fee, index) => (
                  <tr key={fee._id} className={`hover:bg-blue-50/50 transition-colors ${index % 2 !== 0 ? 'bg-blue-50/20' : ''}`}>
                    <td className="p-8">
                      <span className="text-xl font-black text-blue-900">{fee.className}</span>
                    </td>
                    <td className="p-8 font-bold text-blue-800">₹{fee.admissionFee.toLocaleString()}</td>
                    <td className="p-8">
                      <span className="px-4 py-2 bg-yellow-400/20 text-blue-900 rounded-xl font-black">
                        ₹{fee.monthlyFee.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-8 font-black text-blue-600 text-lg">₹{fee.annualFee.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- FOOTER NOTES --- */}
        <div className="mt-10 flex flex-col md:flex-row gap-6 items-center justify-between p-8 bg-yellow-400 rounded-[2rem] shadow-xl rotate-[-1deg]">
            <div className="flex items-center gap-4 text-blue-900">
                <div className="p-3 bg-white/30 rounded-2xl">
                    <Info size={24} />
                </div>
                <p className="font-bold text-sm md:text-base leading-tight">
                    * Note: Fee structure is subject to revision for the <br className="hidden md:block"/> 
                    upcoming 2026-27 academic session.
                </p>
            </div>
            <button className="bg-blue-900 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform">
                Download PDF
            </button>
        </div>

        {/* --- VALUE PROPS --- */}
        <section className="mt-24 grid md:grid-cols-3 gap-8">
            <ValueCard 
                icon={<ShieldCheck className="text-green-500" />} 
                title="All-Inclusive Safety" 
                desc="Includes insurance, GPS transport, and 24/7 CCTV monitoring."
            />
            <ValueCard 
                icon={<Laptop className="text-blue-500" />} 
                title="Smart Learning" 
                desc="Access to our digital portal, STEM kits, and language labs."
            />
            <ValueCard 
                icon={<Utensils className="text-orange-500" />} 
                title="Nutritious Meals" 
                desc="Morning snacks and organic lunches prepared in-house."
            />
        </section>
      </main>
    </div>
  );
}

function ValueCard({ icon, title, desc }) {
    return (
        <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-blue-50">
            <div className="mb-4">{icon}</div>
            <h4 className="font-black text-blue-950 text-lg mb-2 tracking-tight">{title}</h4>
            <p className="text-blue-800/60 font-semibold text-sm leading-relaxed">{desc}</p>
        </div>
    );
}

export default Fees;