import { motion } from "motion/react";

const skills = [
  {
    category: "Languages",
    items: [
      { name: "C", level: 85 },
      { name: "C++", level: 90 },
      { name: "Python", level: 80 },
      { name: "Java", level: 75 },
    ],
  },
  {
    category: "Web Frontend",
    items: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "HTML/CSS", level: 98 },
    ],
  },
  {
    category: "Tools & Others",
    items: [
      { name: "Git & GitHub", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "Node.js", level: 80 },
      { name: "Figma", level: 70 },
    ],
  },
];

export default function Skills() {
  const skillGroups = [
    {
      category: "C",
      skills: "C Programming",
      link: "https://github.com/anikkundu001/C-",
    },
    {
      category: "CPP",
      skills: "C++",
    },
    {
      category: "JAVA",
      skills: "JAVA",
      link: "https://github.com/anikkundu001/JAVA-",
    },
    {
      category: "PYTHON",
      skills: "PYTHON",
    },
    {
      category: "SQL",
      skills: "SQL",
      link: "https://github.com/anikkundu001/SQL",
    },
  ];

  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto bg-white/[0.03] border border-white/10 rounded-[32px] p-8 md:p-12 flex flex-col gap-10 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <h3 className="text-sm font-bold tracking-widest text-zinc-500 uppercase">Stack & Tools</h3>
            <h2 className="text-3xl md:text-4xl font-black">Technical Proficiency</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {skillGroups.map((group, i) => {
            const Content = (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 hover:from-violet-500/10 hover:to-fuchsia-500/10 p-6 rounded-2xl border border-white/5 hover:border-violet-500/20 transition-all duration-300 group text-center flex items-center justify-center min-h-[100px] h-full ${group.link ? 'cursor-pointer' : ''}`}
              >
                <p className="text-sm font-medium text-zinc-300 leading-relaxed group-hover:text-white transition-colors">
                  {group.skills}
                </p>
              </motion.div>
            );

            return group.link ? (
              <a 
                key={group.category} 
                href={group.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                {Content}
              </a>
            ) : (
              <div key={group.category}>
                {Content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
