import { motion } from "motion/react";
import { ArrowRight, Download } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-32 overflow-hidden px-6">
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6 text-center md:text-left items-center md:items-start order-2 md:order-1"
        >
          <h2 className="text-xs md:text-sm font-bold tracking-[0.2em] text-violet-400 uppercase">
            Computer Science Student
          </h2>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter">
            Architecting<br/>
            <span className="text-gradient">The Digital Future.</span>
          </h1>
          
          <p className="max-w-lg text-zinc-400 text-base md:text-xl leading-relaxed mt-2">
            I'm a Software Engineering student focused on building performant distributed systems and elegant user experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 md:px-10 py-4 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 group transition-all hover:bg-violet-100 shadow-[0_0_20px_rgba(127,0,255,0.2)] w-full sm:w-auto"
            >
              View Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            
            <motion.a
              href="/resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 md:px-10 py-4 glass text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-white/10 w-full sm:w-auto"
            >
              Download CV
              <Download size={18} />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative order-1 md:order-2"
        >
          <div className="relative aspect-square w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] mx-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-blue-600 rounded-full blur-2xl opacity-20 animate-pulse" />
            <div className="relative z-10 w-full h-full rounded-full border border-white/10 overflow-hidden glass p-4">
              <img 
                src="https://raw.githubusercontent.com/anikkundu001/My-Photo/54397dfd9bc99db6ee882cd47685fcf9a9907ade/My%20image.jpeg" 
                alt="Your Name"
                className="w-full h-full object-cover rounded-full transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-violet-500/20 rounded-full blur-xl animate-bounce" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000" />
          </div>
        </motion.div>
      </div>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem]" />
    </section>
  );
}
