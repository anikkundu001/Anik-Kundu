import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import VehicleMS from "./VehicleMS";
import SortingDashboard from "./SortingDashboard";
import HospitalMS from "./HospitalMS";
import StudentMS from "./StudentMS";
import BankMS from "./BankMS";
import AdjacencyMatrixExplorer from "./AdjacencyMatrixExplorer";
import UniversityMS from "./UniversityMS";
import CarStore from "./CarStore";
import UltimateUniversityDashboard from "./UltimateUniversityDashboard";

const projects = [
  {
    title: "Apply Now – Study in Canada",
    description: "This Adobe Illustrator flyer promotes studying in Canada with a 75% discount, an “Apply Now” button, website, phone number, and Canadian University details.",
    tech: ["React", "TypeScript", "D3.js", "Tailwind"],
    github: "https://github.com/anikkundu001",
    link: "https://raw.githubusercontent.com/anikkundu001/Adobe-Photoshop-and-Illustrator-Design/main/canada%20apply%20card.jpg",
    image: "https://picsum.photos/seed/dash/800/500",
  },
  {
    title: "Sample Certificate Design",
    description: "Achievement certificate for advanced design principles and Adobe Creative Cloud mastery, showcasing expertise in typography and layout composition.",
    tech: ["Illustrator", "Photoshop", "Certificate"],
    github: "https://github.com/anikkundu001",
    link: "https://raw.githubusercontent.com/anikkundu001/Adobe-Photoshop-and-Illustrator-Design/81a12343b47fdb0b0c47d75fbaae53b4c231e0f2/Certificate(A4%20size).jpg",
    image: "https://raw.githubusercontent.com/anikkundu001/Adobe-Photoshop-and-Illustrator-Design/81a12343b47fdb0b0c47d75fbaae53b4c231e0f2/Certificate(A4%20size).jpg",
  },
  {
    title: "Martyred Intellectuals Day Design",
    description: "A tribute to Bangladesh's martyred intellectuals, honoring their sacrifice for independence, with a note that their absence will never be filled.",
    tech: ["Photoshop", "Digital Art", "Commemoration"],
    github: "https://github.com/anikkundu001",
    link: "https://raw.githubusercontent.com/anikkundu001/Adobe-Photoshop-and-Illustrator-Design/f52ce5efe1a2ab14890e413bcdca5b1d25f02df8/14%20December%20Bangladesh.jpg",
    image: "https://raw.githubusercontent.com/anikkundu001/Adobe-Photoshop-and-Illustrator-Design/f52ce5efe1a2ab14890e413bcdca5b1d25f02df8/14%20December%20Bangladesh.jpg",
  },
  {
    title: "Custom T-Shirt Design",
    description: "Creative and modern t-shirt graphics designed using Adobe Illustrator, focused on unique typography and visual storytelling.",
    tech: ["Illustrator", "Branding", "Apparel Design"],
    github: "https://github.com/anikkundu001",
    link: "https://raw.githubusercontent.com/anikkundu001/Adobe-Photoshop-and-Illustrator-Design/0493dd9df77599b13c2675695546376f7ea9af25/T-Shirt%20Design.jpg",
    image: "https://raw.githubusercontent.com/anikkundu001/Adobe-Photoshop-and-Illustrator-Design/0493dd9df77599b13c2675695546376f7ea9af25/T-Shirt%20Design.jpg",
  },
  {
    title: "Shab-e-Barat Design",
    description: "A commemorative spiritual greeting design for Shab-e-Barat, featuring traditional motifs and serene evening lighting created in Adobe Photoshop.",
    tech: ["Photoshop", "Digital Art", "Social Media"],
    github: "https://github.com/anikkundu001",
    link: "https://raw.githubusercontent.com/anikkundu001/Adobe-Photoshop-and-Illustrator-Design/b4e57ae6be89e01325658b5a9c0c1f9f0b41bd7b/Shab%20e%20Barat.png",
    image: "https://raw.githubusercontent.com/anikkundu001/Adobe-Photoshop-and-Illustrator-Design/b4e57ae6be89e01325658b5a9c0c1f9f0b41bd7b/Shab%20e%20Barat.png",
  },
  {
    title: "1st Photoshop Project",
    description: "My inaugural digital artwork in Adobe Photoshop, representing the beginning of my design journey and exploration of creative tools.",
    tech: ["Photoshop", "Digital Art", "Beginning"],
    github: "https://github.com/anikkundu001",
    link: "https://raw.githubusercontent.com/anikkundu001/Adobe-Photoshop-and-Illustrator-Design/5578e323f63e38e1a5a347db76ef6cee95ea5348/1st%20project%20in%20Photoshop.jpg",
    image: "https://raw.githubusercontent.com/anikkundu001/Adobe-Photoshop-and-Illustrator-Design/5578e323f63e38e1a5a347db76ef6cee95ea5348/1st%20project%20in%20Photoshop.jpg",
  },
  {
    title: "Burger-Plaza Promo",
    description: "A vibrant promotional flyer designed for Burger Plaza, focusing on appetizing visuals and clear call-to-actions, created in Adobe Photoshop.",
    tech: ["Photoshop", "Graphic Design", "Social Media"],
    github: "https://github.com/anikkundu001",
    link: "https://raw.githubusercontent.com/anikkundu001/Adobe-Photoshop-and-Illustrator-Design/61cac977a09c8bc9d7a292044c86a2d80be1b615/Burger-Plaza%20Promo.jpg",
    image: "https://raw.githubusercontent.com/anikkundu001/Adobe-Photoshop-and-Illustrator-Design/61cac977a09c8bc9d7a292044c86a2d80be1b615/Burger-Plaza%20Promo.jpg",
  }
];

const cProjects = [
  {
    id: "vms",
    title: "Vehicle Management System",
    description: "A comprehensive console-based application designed for efficient vehicle record management, featuring encrypted authentication and robust data handling.",
    tech: ["C", "Security", "Data Management"],
    github: "https://github.com/anikkundu001",
    link: "https://github.com/anikkundu001",
  },
  {
    id: "sorting",
    title: "Sorting Performance Dashboard",
    description: "An interactive HTTP server in C that benchmarks multiple sorting algorithms (Bubble, Merge, Quick, etc.) and visualizes real-world execution times.",
    tech: ["C", "Networking", "Algorithms"],
    github: "https://github.com/anikkundu001",
    link: "https://github.com/anikkundu001",
  },
  {
    id: "graph",
    title: "Adjacency Matrix Explorer",
    description: "An interactive tool for exploring directed graphs via adjacency matrices, with real-time degree calculation and visualization.",
    tech: ["C", "Graph Theory", "Visualization"],
    github: "https://github.com/anikkundu001",
    link: "https://github.com/anikkundu001",
  }
];

const cppProjects = [
  {
    id: "hospital",
    title: "Hospital Management System",
    description: "An OOP solution in C++ for tracking patient records, ward availability, and encrypted administrative access for hospital staff.",
    tech: ["C++", "OOP", "Database Management"],
    github: "https://github.com/anikkundu001",
    link: "https://github.com/anikkundu001",
  },
  {
    id: "student",
    title: "Student Management System",
    description: "A C++ based system focused on academic records, featuring file handling for data persistence and secure administrative controls.",
    tech: ["C++", "File Handling", "Data Structures"],
    github: "https://github.com/anikkundu001",
    link: "https://github.com/anikkundu001",
  },
  {
    id: "bank",
    title: "Bank Management System",
    description: "A robust financial system in C++ utilizing Standard Template Library (STL) for secure transactions and high-reliability data persistence.",
    tech: ["C++", "STL", "Security"],
    github: "https://github.com/anikkundu001",
    link: "https://github.com/anikkundu001",
  }
];

const javaProjects = [
  {
    id: "carstore",
    title: "Thumbs Up Car Store",
    description: "A premium car dealership mockup featuring advanced search, dealer panel, and a dynamic order management system with a modern glassmorphic interface.",
    tech: ["Java", "OOP", "Swing", "Collections"],
    github: "https://github.com/anikkundu001",
    link: "https://github.com/anikkundu001",
  },
  {
    id: "university",
    title: "University Management Suite",
    description: "An advanced Java application for academic administration, managing students, faculty, and modular course enrollment with a colorful enterprise UI.",
    tech: ["Java", "OOP", "Swing", "Collections"],
    github: "https://github.com/anikkundu001",
    link: "https://github.com/anikkundu001",
  },
  {
    id: "ultrauniversity",
    title: "Ultimate University Dashboard",
    description: "A high-performance academic control center with live analytics, data visualization, and secure system management protocols.",
    tech: ["Java", "JDK 17", "Chart.js", "Collections"],
    github: "https://github.com/anikkundu001",
    link: "https://github.com/anikkundu001",
  }
];

export default function Projects() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <section id="projects" className="py-24 px-6 relative overflow-hidden">
      <AnimatePresence>
        {activeModal === "vms" && (
          <VehicleMS onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "sorting" && (
          <SortingDashboard onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "hospital" && (
          <HospitalMS onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "student" && (
          <StudentMS onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "bank" && (
          <BankMS onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "graph" && (
          <AdjacencyMatrixExplorer onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "university" && (
          <UniversityMS onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "carstore" && (
          <CarStore onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "ultrauniversity" && (
          <UltimateUniversityDashboard onClose={() => setActiveModal(null)} />
        )}
      </AnimatePresence>
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto mb-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h3 className="text-sm font-bold tracking-widest text-zinc-500 uppercase">Coding</h3>
          <h2 className="text-4xl md:text-5xl font-black">Project with <span className="text-gradient">C</span></h2>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {cProjects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group rounded-3xl flex flex-col items-center text-center justify-center min-h-[320px] transition-all duration-500 border border-white/10 hover:border-violet-500/50 bg-gradient-to-br from-violet-900/40 to-black relative overflow-hidden"
          >
            <div 
              onClick={() => setActiveModal(project.id)}
              className="w-full h-full p-8 flex flex-col items-center justify-center cursor-pointer relative z-10"
            >
              <h3 className="text-2xl font-bold mb-3 group-hover:text-violet-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed line-clamp-6">
                {project.description}
              </p>
              <div className="mt-6 px-6 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-[10px] text-violet-400 font-bold uppercase tracking-widest group-hover:bg-violet-500/20 group-hover:border-violet-500/40 transition-all">
                Launch Output
              </div>
            </div>
            
            {/* Background Hint */}
            <div className="absolute inset-0 bg-gradient-to-t from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mb-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h3 className="text-sm font-bold tracking-widest text-zinc-500 uppercase">Object Oriented</h3>
          <h2 className="text-4xl md:text-5xl font-black">Project with <span className="text-gradient">C++</span></h2>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {cppProjects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group rounded-3xl flex flex-col items-center text-center justify-center min-h-[320px] transition-all duration-500 border border-white/10 hover:border-violet-500/50 bg-gradient-to-br from-blue-900/40 to-black relative overflow-hidden"
          >
            <div 
              onClick={() => setActiveModal(project.id)}
              className="w-full h-full p-8 flex flex-col items-center justify-center cursor-pointer relative z-10"
            >
              <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed line-clamp-6">
                {project.description}
              </p>
              <div className="mt-6 px-6 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] text-blue-400 font-bold uppercase tracking-widest group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-all">
                Launch Output
              </div>
            </div>
            
            {/* Background Hint */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mb-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h3 className="text-sm font-bold tracking-widest text-zinc-500 uppercase">Enterprise</h3>
          <h2 className="text-4xl md:text-5xl font-black">Project with <span className="text-gradient">JAVA</span></h2>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {javaProjects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group rounded-3xl flex flex-col items-center text-center justify-center min-h-[320px] transition-all duration-500 border border-white/10 hover:border-blue-500/50 bg-gradient-to-br from-blue-900/40 to-black relative overflow-hidden"
          >
            <div 
              onClick={() => setActiveModal(project.id)}
              className="w-full h-full p-8 flex flex-col items-center justify-center cursor-pointer relative z-10"
            >
              <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed line-clamp-6">
                {project.description}
              </p>
              <div className="mt-6 px-6 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] text-blue-400 font-bold uppercase tracking-widest group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-all">
                Launch Output
              </div>
            </div>
            
            {/* Background Hint */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mb-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h3 className="text-sm font-bold tracking-widest text-zinc-500 uppercase">Selected Works</h3>
          <h2 className="text-4xl md:text-5xl font-black">Graphics <span className="text-gradient">Design</span></h2>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group rounded-3xl flex flex-col items-center text-center justify-center min-h-[320px] transition-all duration-500 border border-white/10 hover:border-violet-500/50 bg-gradient-to-br from-violet-900/40 to-black"
          >
            {project.link ? (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full h-full p-8 flex flex-col items-center justify-center cursor-pointer"
              >
                <h3 className="text-2xl font-bold mb-3 group-hover:text-violet-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-6">
                  {project.description}
                </p>
              </a>
            ) : (
              <div className="p-8 flex flex-col items-center justify-center">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-violet-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-6">
                  {project.description}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
    </section>
  );
}
