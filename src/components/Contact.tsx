import { motion } from "motion/react";
import { Mail, MapPin, Send, MessageSquare, Phone, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="space-y-4 p-6 glass rounded-2xl border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <MessageCircle size={80} className="text-violet-400 rotate-12" />
              </div>
              <h3 className="text-sm font-bold tracking-widest text-zinc-500 uppercase flex items-center gap-2">
                <span className="w-8 h-[1px] bg-violet-500"></span>
                Communication
              </h3>
              <h2 className="text-5xl md:text-6xl font-black leading-tight">Let's <span className="text-gradient">Connect</span></h2>
              <p className="text-lg text-zinc-400 leading-relaxed max-w-sm">
                Open for high-impact collaborations and technical problem-solving.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {[
                { label: "Email", value: "kunduanik406@gmail.com", icon: <Mail size={20} />, activeColor: "text-[#EA4335]" },
                { label: "Phone", value: "01570272944", icon: <Phone size={20} />, activeColor: "text-[#34B7F1]" },
                { label: "WhatsApp", value: "01869749660", icon: <MessageCircle size={20} />, activeColor: "text-[#25D366]" },
                { label: "Location", value: "24/2 K M Das Lane Tikatuli, Dhaka", icon: <MapPin size={20} />, activeColor: "text-violet-400" },
                { label: "Status", value: "Available for Projects", icon: <MessageSquare size={20} />, activeColor: "text-emerald-400" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-6 group">
                  <div className={`w-12 h-12 glass rounded-xl flex items-center justify-center text-zinc-500 group-hover:${item.activeColor} group-hover:bg-white/5 transition-all duration-300 shrink-0`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className={`text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 group-hover:${item.activeColor} transition-colors`}>{item.label}</h4>
                    <p className="text-zinc-200 font-medium whitespace-nowrap">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 glass rounded-[32px] border-white/5"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-600">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-violet-500/50 transition-all text-sm text-white placeholder:text-zinc-700"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-600">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-white/5 border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-violet-500/50 transition-all text-sm text-white placeholder:text-zinc-700"
                    placeholder="name@company.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-600">Message Brief</label>
                <textarea 
                  rows={4} 
                  className="w-full bg-white/5 border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-violet-500/50 transition-all text-sm text-white placeholder:text-zinc-700 resize-none"
                  placeholder="Describe your vision..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-white text-black font-extrabold rounded-xl flex items-center justify-center gap-3 transition-all hover:bg-violet-100 shadow-[0_0_20px_rgba(127,0,255,0.1)] uppercase tracking-widest text-xs"
              >
                Initialize Request
                <Send size={16} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
