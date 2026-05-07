import { motion } from "motion/react";
import { GraduationCap, Code2, Target } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center"
          >
            <div className="space-y-4">
              <h3 className="text-sm font-bold tracking-widest text-zinc-500 uppercase">Profile</h3>
              <h2 className="text-5xl md:text-6xl font-black leading-tight">
                Engineering <span className="text-gradient">Experience</span> through Design.
              </h2>
            </div>
            
            <p className="text-lg text-zinc-400 leading-relaxed">
              I am a final-year Computer Science student with an insatiable curiosity for how technology can improve human lives. My journey in tech started with a simple "Hello World" and evolved into building complex systems that solve real-world problems.
            </p>
            
            <div className="flex justify-center pt-4">
              <div className="space-y-3 max-w-sm">
                <div className="flex items-center justify-center gap-3 text-blue-400">
                  <Target size={20} />
                  <span className="text-xs font-bold uppercase tracking-widest">Vision</span>
                </div>
                <h4 className="font-bold text-zinc-200">Data Science</h4>
                <p className="text-sm text-zinc-500">Transforming complex data into actionable intelligence and predictive insights.</p>
              </div>
            </div>
          </motion.div>
        </div>
    </section>
  );
}
