import { useState } from "react";
import API from "../services/api";
import { Phone, MapPin, Clock, Send, Mail, MessageSquare, ExternalLink, Sparkles } from "lucide-react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
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
      await API.post("/contact", form);
      setSuccess("Yay! Your message is on its way! 🎈");
      setForm({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSuccess(""), 5000);
    } catch (error) {
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50/30 font-sans text-blue-950 pb-20">
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-blue-600 pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-black uppercase tracking-widest text-yellow-400">
            <Sparkles size={14} /> We're here for you
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            Let's <span className="text-yellow-400">Connect</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl font-medium max-w-2xl mx-auto opacity-90">
            Have questions about admissions, curriculum, or just want to say hi? Our team is ready to help!
          </p>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-6xl mx-auto px-6 -mt-12 relative z-20">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          
          {/* LEFT: Contact Info (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            <ContactCard 
              icon={<Phone className="text-pink-500" />} 
              title="Call Us" 
              detail="+91 98765 43210" 
              sub="Mon-Fri, 8am to 4pm"
            />
            <ContactCard 
              icon={<MapPin className="text-blue-500" />} 
              title="Visit Us" 
              detail="123 Sunshine Avenue" 
              sub="Kidz City, Sector 45"
            />
            <ContactCard 
              icon={<Clock className="text-yellow-500" />} 
              title="School Hours" 
              detail="08:00 AM - 02:00 PM" 
              sub="Weekend Closed"
            />

            <a
              href="https://goo.gl/maps/xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full p-6 bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 border-2 border-blue-100 text-blue-600 font-black hover:bg-blue-600 hover:text-white hover:border-transparent transition-all group"
            >
              <ExternalLink size={20} className="group-hover:rotate-12 transition-transform" />
              Open in Google Maps
            </a>
          </div>

          {/* RIGHT: Contact Form (3 Cols) */}
          <div className="lg:col-span-3 bg-white rounded-[3rem] shadow-2xl shadow-blue-900/10 p-8 md:p-12 border-4 border-white relative">
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-3xl shadow-xl border-4 border-white rotate-12">
              🎨
            </div>

            {success && (
              <div className="mb-8 p-5 bg-green-50 border-2 border-green-100 text-green-700 rounded-2xl font-bold flex items-center gap-3 animate-bounce-short">
                <Sparkles size={20} /> {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-blue-900/40 ml-2">Your Full Name</label>
                <input
                  className="w-full px-6 py-4 rounded-2xl bg-blue-50/50 border-2 border-transparent focus:border-blue-400 focus:bg-white outline-none transition-all font-bold text-blue-950"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-blue-900/40 ml-2">Email Address</label>
                  <input
                    className="w-full px-6 py-4 rounded-2xl bg-blue-50/50 border-2 border-transparent focus:border-blue-400 focus:bg-white outline-none transition-all font-bold text-blue-950"
                    type="email"
                    name="email"
                    placeholder="email@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-blue-900/40 ml-2">Phone Number</label>
                  <input
                    className="w-full px-6 py-4 rounded-2xl bg-blue-50/50 border-2 border-transparent focus:border-blue-400 focus:bg-white outline-none transition-all font-bold text-blue-950"
                    type="tel"
                    name="phone"
                    placeholder="+91 00000 00000"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-blue-900/40 ml-2">Your Message</label>
                <textarea
                  className="w-full px-6 py-4 rounded-2xl bg-blue-50/50 border-2 border-transparent focus:border-blue-400 focus:bg-white outline-none transition-all font-bold text-blue-950 min-h-[150px] resize-none"
                  name="message"
                  placeholder="Ask us anything..."
                  value={form.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-[2rem] text-xl font-black shadow-xl shadow-blue-600/20 hover:-translate-y-1 active:translate-y-1 transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Magic Message"} 
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

function ContactCard({ icon, title, detail, sub }) {
  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-blue-900/5 flex items-center gap-5 border border-blue-50 hover:border-blue-200 transition-colors">
      <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-xs font-black uppercase tracking-widest text-blue-900/40 mb-1">{title}</h4>
        <p className="text-lg font-black text-blue-950 leading-none mb-1">{detail}</p>
        <p className="text-sm font-semibold text-blue-800/50">{sub}</p>
      </div>
    </div>
  );
}

export default Contact;