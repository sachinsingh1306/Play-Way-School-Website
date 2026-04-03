import React from 'react';
import { 
  ShieldCheck, Lightbulb, Users, BookOpen, Bus, Activity, 
  Heart, Award, CheckCircle2, Clock, MapPin, Utensils, Sparkles
} from 'lucide-react';
import yellow_bg from "../assets/yellow_bg.png"; // Using your asset

function About() {
  return (
    <div className="bg-white text-blue-900 font-sans selection:bg-yellow-100 overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-blue-600 pt-44 pb-32 px-6 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-500 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 mb-10 text-xs font-black tracking-[0.2em] text-blue-900 uppercase bg-yellow-400 rounded-full shadow-xl shadow-yellow-400/20">
            <Sparkles size={16} /> Est. 2010 • Excellence in Early Education
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[1.05]">
            Our Story & <br />
            <span className="text-yellow-400 underline decoration-white/20 underline-offset-8">Philosophy.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl md:text-2xl text-blue-50 leading-relaxed font-semibold opacity-90">
            We don't just teach; we inspire. Discover how our child-centric approach creates the leaders of tomorrow.
          </p>
        </div>

        {/* Bottom Wave Transition */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg className="relative block w-full h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
          </svg>
        </div>
      </section>

      {/* --- OUR CORE PHILOSOPHY --- */}
      <section className="max-w-7xl mx-auto py-24 md:py-32 px-6">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="relative">
            {/* Playful Image Frame - Extra Rounded */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-yellow-400 rounded-[3rem] -z-10 rotate-12"></div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-100 rounded-full -z-10"></div>
            
            <img
              className="rounded-[4rem] shadow-2xl w-full object-cover aspect-[4/5] border-[16px] border-white shadow-blue-100/50"
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80"
              alt="Children learning"
            />
            
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] bg-blue-900 p-8 rounded-3xl shadow-2xl text-center rotate-[-2deg]">
              <p className="text-white font-bold italic text-lg leading-snug">
                "The goal of education is to activate the natural desire to learn."
              </p>
            </div>
          </div>
          
          <div className="space-y-12">
            <div>
              <h2 className="text-5xl md:text-6xl font-black text-blue-950 mb-8 leading-tight tracking-tight">
                Beyond the <br/><span className="text-blue-600">Classroom</span>
              </h2>
              <p className="text-xl text-blue-800/70 leading-relaxed font-semibold">
                Founded on the principles of <strong className="text-blue-900 border-b-4 border-yellow-400/40">Montessori</strong> and <strong className="text-blue-900 border-b-4 border-yellow-400/40">Reggio Emilia</strong>, our school provides a "prepared environment" where children are free to explore.
              </p>
            </div>

            <div className="grid gap-6">
              {[
                { title: "Inquiry-Based Learning", desc: "We encourage questions over rote memorization.", color: "bg-yellow-400", text: "text-blue-900" },
                { title: "Emotional Intelligence", desc: "Focusing on empathy, sharing, and self-regulation.", color: "bg-blue-600", text: "text-white" },
                { title: "Global Citizenship", desc: "Instilling respect for diverse cultures.", color: "bg-green-500", text: "text-white" }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 p-6 rounded-[2.5rem] bg-white border border-blue-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${item.color} ${item.text} group-hover:rotate-12 transition-transform shadow-lg`}>
                    <CheckCircle2 size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-blue-950 text-xl mb-1">{item.title}</h4>
                    <p className="text-blue-800/60 font-bold text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- INFRASTRUCTURE & SAFETY --- */}
      <section className="relative bg-blue-50/50 py-32 px-6 overflow-hidden rounded-[4rem] md:rounded-[8rem] mx-4">
        {/* Using your yellow_bg.png as a subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" 
          style={{ backgroundImage: `url(${yellow_bg})`, backgroundSize: '400px' }}
        ></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-blue-950 mb-6 tracking-tighter">World-Class Facilities</h2>
            <p className="text-xl text-blue-800/60 max-w-2xl mx-auto font-bold uppercase tracking-widest text-sm">Safe • Stimulating • Hygienic</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            <FacilityCard icon={<ShieldCheck />} title="360° Safety" color="text-green-600" bg="bg-green-100/50" details={["24/7 CCTV surveillance", "Biometric entry & exit", "Police-verified staff"]} />
            <FacilityCard icon={<Utensils />} title="Nutrition First" color="text-orange-600" bg="bg-orange-100/50" details={["In-house nutritionist", "Organic, junk-free meals", "Filter-water stations"]} />
            <FacilityCard icon={<Activity />} title="Wellness Hub" color="text-blue-600" bg="bg-blue-100/50" details={["On-call pediatrician", "Daily health screenings", "First-aid certified"]} />
            <FacilityCard icon={<Bus />} title="Smart Transport" color="text-yellow-600" bg="bg-yellow-100/50" details={["GPS tracking for parents", "Female bus attendants", "Speed-governed vehicles"]} />
            <FacilityCard icon={<BookOpen />} title="Modern Labs" color="text-purple-600" bg="bg-purple-100/50" details={["STEM & Robotics corner", "Digital storytelling", "Sensory play zones"]} />
            <FacilityCard icon={<MapPin />} title="Outdoor Spaces" color="text-red-600" bg="bg-red-100/50" details={["Anti-skid play areas", "Kitchen garden", "Splash pool & sand pit"]} />
          </div>
        </div>
      </section>

      {/* --- MISSION & VISION --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="group p-12 md:p-16 bg-blue-900 text-white rounded-[4rem] shadow-2xl relative overflow-hidden transition-all hover:scale-[1.02]">
            <div className="absolute -top-10 -right-10 p-8 text-white/5 group-hover:rotate-12 transition-transform"><Lightbulb size={240} /></div>
            <h3 className="text-4xl font-black mb-8 relative z-10 flex items-center gap-4">
               Our Mission
            </h3>
            <p className="text-blue-100/80 text-xl leading-relaxed font-semibold relative z-10">
              To ignite a lifelong passion for learning by providing a nurturing, tech-forward, and inclusive environment that empowers students.
            </p>
          </div>

          <div className="group p-12 md:p-16 bg-yellow-400 text-blue-900 rounded-[4rem] shadow-2xl relative overflow-hidden transition-all hover:scale-[1.02]">
            <div className="absolute -top-10 -right-10 p-8 text-blue-900/5 group-hover:rotate-12 transition-transform"><Award size={240} /></div>
            <h3 className="text-4xl font-black mb-8 relative z-10 flex items-center gap-4">
               Our Vision
            </h3>
            <p className="text-blue-900/80 text-xl leading-relaxed font-bold relative z-10">
              To be a global leader in early childhood education, recognized for creating empathetic, innovative, and resilient leaders.
            </p>
          </div>
        </div>
      </section>

      {/* --- PARTNERSHIP --- */}
      <section className="bg-white py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block p-6 bg-blue-50 rounded-full mb-8 shadow-inner">
             <Users className="text-blue-600" size={48} />
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-blue-950 mb-8 tracking-tighter">A Partnership with Parents</h2>
          <p className="text-xl text-blue-800/60 mb-14 leading-relaxed font-bold">
            Education is a tripartite agreement between the school, student, and parent. Stay connected through our <span className="text-blue-600 underline">Mobile App</span>.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {["Weekly Feedback", "Parent Workshops", "Real-time App Updates"].map((text, i) => (
              <div key={i} className="bg-blue-50 px-8 py-5 rounded-2xl font-black text-blue-900 border-2 border-blue-100 flex items-center gap-3 hover:bg-yellow-400 transition-colors cursor-default">
                <CheckCircle2 className="text-blue-500" size={24} />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function FacilityCard({ icon, title, details, color, bg }) {
  return (
    <div className="bg-white p-10 rounded-[3rem] border-2 border-transparent hover:border-yellow-400 shadow-xl shadow-blue-900/5 hover:shadow-2xl transition-all group relative overflow-hidden">
      <div className={`w-20 h-20 rounded-[1.5rem] ${bg} ${color} flex items-center justify-center mb-10 group-hover:rotate-[15deg] transition-transform duration-500 shadow-inner`}>
        {React.cloneElement(icon, { size: 38, strokeWidth: 2.5 })}
      </div>
      <h3 className="text-2xl font-black mb-6 text-blue-950 tracking-tight">{title}</h3>
      <ul className="space-y-4">
        {details.map((detail, idx) => (
          <li key={idx} className="text-blue-800/50 font-bold text-sm flex items-center gap-4">
            <span className={`w-2.5 h-2.5 rounded-full ${color.replace('text', 'bg')}`} />
            {detail}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default About;