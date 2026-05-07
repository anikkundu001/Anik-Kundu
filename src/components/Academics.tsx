import { motion } from "motion/react";

const milestones = [
  {
    year: "2019 - 2020",
    title: "Secondary School Certificate",
    description: "Successfully completed with GPA 5.00 in Science Group at Narinda Government High School.",
  },
  {
    year: "2021 - 2022",
    title: "Higher Secondary School Certificate",
    description: "Successfully completed with GPA 5.00 in Science Group at St Gregory High School and College.",
  },
  {
    year: "2023 - PRESENT",
    title: "B.Sc in Computer Science and Engineering",
    description: "Currently pursuing a Bachelor’s degree in Computer Science and Engineering (CSE) at East West University, specializing in Data Science.",
  },
];

export default function Academics() {
  return (
    <section id="academics" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 relative z-10">
        <div className="md:w-1/3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 sticky top-32"
          >
            <h3 className="text-sm font-bold tracking-widest text-zinc-500 uppercase">Education</h3>
            <h2 className="text-4xl md:text-5xl font-black">Academic <span className="text-gradient">Timeline</span></h2>
            <p className="text-zinc-500 max-w-xs leading-relaxed">
              A chronological perspective on academic milestones and educational foundation.
            </p>
          </motion.div>
        </div>

        <div className="md:w-2/3">
          <div className="space-y-12 relative border-l border-white/5 ml-4 pl-10">
            {milestones.map((milestone, i) => (
              <motion.div
                key={milestone.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative group"
              >
                <div className={`absolute -left-[51px] top-1 w-3 h-3 rounded-full transition-all duration-500 ${
                  i === milestones.length - 1 ? "bg-violet-500 shadow-[0_0_15px_rgba(124,58,237,0.5)]" : 
                  i === 1 ? "bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.5)]" :
                  "bg-zinc-700"
                } group-hover:scale-150`} />
                
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400 mb-2 block">
                  {milestone.year}
                </span>
                <h4 className="text-xl font-bold mb-2 text-zinc-200 group-hover:text-white transition-colors">{milestone.title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-xl">
                  {milestone.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
