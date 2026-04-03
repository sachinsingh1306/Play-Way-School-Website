import { useState } from "react";
import API from "../services/api";
import { Send, GraduationCap, Phone, Mail, User, BookOpen, CheckCircle2, Star, Paperclip } from "lucide-react";

function Admission() {
  const [form, setForm] = useState({
    studentName: "",
    parentName: "",
    phone: "",
    email: "",
    classApplied: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await API.post("/admission", form);
      setSuccess("Hooray! 🎊 Your application has been received. We'll be in touch soon!");
      setForm({ studentName: "", parentName: "", phone: "", email: "", classApplied: "", message: "" });
      setTimeout(() => setSuccess(""), 6000);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50/30 font-sans text-blue-950 pb-20">
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-blue-600 pt-32 pb-24 px-6 overflow-hidden">
        {/* Floating Background Icons */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
            <Star className="absolute top-10 left-10 text-yellow-400 rotate-12" size={48} />
            <Paperclip className="absolute bottom-20 right-10 text-white -rotate-12" size={40} />
            <GraduationCap className="absolute top-20 right-1/4 text-pink-400" size={60} />
        </div>

        <div className="relative max-w-4xl mx-auto text-center z-10">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-yellow-400 text-blue-900 text-xs font-black tracking-widest uppercase mb-6 shadow-xl">
            <GraduationCap size={16} /> Admissions Open 2026-27
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            Start the <span className="text-yellow-400">Journey</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl font-medium max-w-2xl mx-auto opacity-90">
            Join our vibrant community of little learners. Fill out the form below to schedule your school tour!
          </p>
        </div>
      </section>

      {/* --- FORM SECTION --- */}
      <main className="max-w-4xl mx-auto px-6 -mt-16 relative z-20">
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/10 p-8 md:p-12 border-4 border-white">
          
          {success && (
            <div className="mb-10 flex items-center gap-4 p-6 bg-green-50 border-2 border-green-100 text-green-700 rounded-3xl animate-bounce-short">
              <CheckCircle2 size={24} className="flex-shrink-0" />
              <p className="font-bold">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Row 1: Names */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-black text-blue-900/60 uppercase tracking-widest ml-1">
                  <User size={14} /> Child's Name
                </label>
                <input
                  className="w-full px-6 py-4 rounded-2xl bg-blue-50/50 border-2 border-transparent focus:border-blue-400 focus:bg-white outline-none transition-all font-bold text-blue-950 placeholder:text-blue-200"
                  type="text"
                  name="studentName"
                  placeholder="Ayaan Sharma"
                  value={form.studentName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-black text-blue-900/60 uppercase tracking-widest ml-1">
                   Parent Name
                </label>
                <input
                  className="w-full px-6 py-4 rounded-2xl bg-blue-50/50 border-2 border-transparent focus:border-blue-400 focus:bg-white outline-none transition-all font-bold text-blue-950 placeholder:text-blue-200"
                  type="text"
                  name="parentName"
                  placeholder="Enter parent's name"
                  value={form.parentName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Row 2: Contact */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-black text-blue-900/60 uppercase tracking-widest ml-1">
                  <Phone size={14} /> Contact Phone
                </label>
                <input
                  className="w-full px-6 py-4 rounded-2xl bg-blue-50/50 border-2 border-transparent focus:border-blue-400 focus:bg-white outline-none transition-all font-bold text-blue-950 placeholder:text-blue-200"
                  type="tel"
                  name="phone"
                  placeholder="+91 00000 00000"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-black text-blue-900/60 uppercase tracking-widest ml-1">
                  <Mail size={14} /> Email Address
                </label>
                <input
                  className="w-full px-6 py-4 rounded-2xl bg-blue-50/50 border-2 border-transparent focus:border-blue-400 focus:bg-white outline-none transition-all font-bold text-blue-950 placeholder:text-blue-200"
                  type="email"
                  name="email"
                  placeholder="hello@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Row 3: Selection */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-black text-blue-900/60 uppercase tracking-widest ml-1">
                <BookOpen size={14} /> Class Applied For
              </label>
              <select
                className="w-full px-6 py-4 rounded-2xl bg-blue-50/50 border-2 border-transparent focus:border-blue-400 focus:bg-white outline-none transition-all font-bold text-blue-950"
                name="classApplied"
                value={form.classApplied}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Grade --</option>
                <option value="Playgroup">Playgroup (1.5 - 2.5 yrs)</option>
                <option value="Nursery">Nursery (2.5 - 3.5 yrs)</option>
                <option value="LKG">LKG (3.5 - 4.5 yrs)</option>
                <option value="UKG">UKG (4.5 - 5.5 yrs)</option>
              </select>
            </div>

            {/* Row 4: Message */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-black text-blue-900/60 uppercase tracking-widest ml-1">
                Tell us about your child
              </label>
              <textarea
                className="w-full px-6 py-4 rounded-2xl bg-blue-50/50 border-2 border-transparent focus:border-blue-400 focus:bg-white outline-none transition-all font-bold text-blue-950 placeholder:text-blue-200 min-h-[120px]"
                name="message"
                placeholder="Interests, hobbies, or special requirements..."
                value={form.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 bg-pink-500 hover:bg-pink-600 text-white py-6 rounded-[2rem] text-xl font-black shadow-xl shadow-pink-500/20 hover:-translate-y-1 active:translate-y-1 transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Submit Application"} <Send size={20} />
            </button>
          </form>
        </div>

        {/* --- ADMISSION PROCESS --- */}
        <section className="mt-20">
            <h2 className="text-center text-3xl font-black text-blue-950 mb-12">How it works</h2>
            <div className="grid md:grid-cols-3 gap-8">
                <Step number="1" title="Submit Form" desc="Tell us a bit about your little explorer." color="bg-blue-500" />
                <Step number="2" title="School Tour" desc="Visit our campus and meet our wonderful staff." color="bg-yellow-400" />
                <Step number="3" title="Enrollment" desc="Complete the paperwork and join the family!" color="bg-pink-500" />
            </div>
        </section>
      </main>

      <footer className="text-center mt-20 px-6">
        <p className="text-blue-900/40 font-bold text-xs uppercase tracking-[0.2em]">
            * Submission does not guarantee admission. School tours are by appointment only.
        </p>
      </footer>
    </div>
  );
}

function Step({ number, title, desc, color }) {
    return (
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 relative overflow-hidden border border-blue-50">
            <div className={`absolute -top-4 -right-4 w-20 h-20 ${color} opacity-10 rounded-full`}></div>
            <div className={`w-12 h-12 ${color} text-white rounded-2xl flex items-center justify-center font-black text-xl mb-6 shadow-lg`}>
                {number}
            </div>
            <h4 className="text-xl font-black text-blue-950 mb-2">{title}</h4>
            <p className="text-blue-800/60 font-semibold text-sm leading-relaxed">{desc}</p>
        </div>
    );
}

export default Admission;