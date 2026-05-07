import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, GraduationCap, BookOpen, Users, UserPlus, Search, Trash2, Edit3, CheckCircle2, Layout, Info } from "lucide-react";

interface Student {
  id: number;
  name: string;
  cgpa: number;
  courses: string[];
}

interface Course {
  cid: string;
  title: string;
  credit: number;
  facultyId: number | null;
  students: number[];
}

interface Faculty {
  fid: number;
  name: string;
  position: string;
}

interface UniversityMSProps {
  onClose: () => void;
}

export default function UniversityMS({ onClose }: UniversityMSProps) {
  const [students, setStudents] = useState<Student[]>([
    { id: 101, name: "Alice Roy", cgpa: 3.8, courses: [] },
    { id: 102, name: "Bob Martin", cgpa: 3.4, courses: [] }
  ]);
  const [courses, setCourses] = useState<Course[]>([
    { cid: "CS101", title: "Data Structures", credit: 3, facultyId: null, students: [] },
    { cid: "MATH202", title: "Linear Algebra", credit: 3, facultyId: null, students: [] }
  ]);
  const [faculties, setFaculties] = useState<Faculty[]>([
    { fid: 201, name: "Dr. Emily Chen", position: "Professor" },
    { fid: 202, name: "Dr. James Wright", position: "Associate Professor" }
  ]);

  const [activeTab, setActiveTab] = useState<"students" | "courses" | "faculties" | "enroll" | "search">("students");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  // Forms State
  const [stuForm, setStuForm] = useState({ id: "", name: "", cgpa: "" });
  const [courseForm, setCourseForm] = useState({ id: "", title: "", credit: "" });
  const [facForm, setFacForm] = useState({ id: "", name: "", position: "" });
  const [enrollForm, setEnrollForm] = useState({ stuId: "", courseId: "" });
  const [assignForm, setAssignForm] = useState({ facId: "", courseId: "" });

  const handleAddStudent = () => {
    const id = parseInt(stuForm.id);
    const cgpa = parseFloat(stuForm.cgpa);
    if (!id || !stuForm.name || isNaN(cgpa)) {
      setFeedback("❌ Invalid input data.");
      return;
    }
    if (students.some(s => s.id === id)) {
      setFeedback("❌ Duplicate student ID.");
      return;
    }
    setStudents([...students, { id, name: stuForm.name, cgpa, courses: [] }]);
    setFeedback("✅ Student instance created.");
    setStuForm({ id: "", name: "", cgpa: "" });
  };

  const handleAddCourse = () => {
    const credit = parseFloat(courseForm.credit);
    if (!courseForm.id || !courseForm.title || isNaN(credit)) {
      setFeedback("❌ Invalid course data.");
      return;
    }
    if (courses.some(c => c.cid === courseForm.id)) {
      setFeedback("❌ Duplicate course ID.");
      return;
    }
    setCourses([...courses, { cid: courseForm.id, title: courseForm.title, credit, facultyId: null, students: [] }]);
    setFeedback("✅ Course memory allocated.");
    setCourseForm({ id: "", title: "", credit: "" });
  };

  const handleAddFaculty = () => {
    const id = parseInt(facForm.id);
    if (!id || !facForm.name || !facForm.position) {
      setFeedback("❌ All fields required.");
      return;
    }
    if (faculties.some(f => f.fid === id)) {
      setFeedback("❌ Duplicate faculty ID.");
      return;
    }
    setFaculties([...faculties, { fid: id, name: facForm.name, position: facForm.position }]);
    setFeedback("✅ Faculty object added.");
    setFacForm({ id: "", name: "", position: "" });
  };

  const handleEnroll = () => {
    const sid = parseInt(enrollForm.stuId);
    const cid = enrollForm.courseId;
    const stu = students.find(s => s.id === sid);
    const course = courses.find(c => c.cid === cid);

    if (!stu || !course) {
      setFeedback("❌ Entity not found.");
      return;
    }

    if (stu.courses.includes(cid)) {
      setFeedback("❌ Already enrolled.");
      return;
    }

    setStudents(students.map(s => s.id === sid ? { ...s, courses: [...s.courses, cid] } : s));
    setCourses(courses.map(c => c.cid === cid ? { ...c, students: [...c.students, sid] } : c));
    setFeedback("✅ Dynamic linkage success.");
  };

  const handleAssign = () => {
    const fid = parseInt(assignForm.facId);
    const cid = assignForm.courseId;
    const fac = faculties.find(f => f.fid === fid);
    const course = courses.find(c => c.cid === cid);

    if (!fac || !course) {
      setFeedback("❌ Entity not found.");
      return;
    }

    setCourses(courses.map(c => c.cid === cid ? { ...c, facultyId: fid } : c));
    setFeedback("✅ Faculty assigned to course.");
  };

  const SectionHeader = ({ title, icon: Icon }: { title: string, icon: any }) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 bg-blue-500/10 border border-blue-500/20 p-4 sm:p-6 rounded-2xl sm:rounded-[2rem]">
      <div className="p-3 bg-blue-500/20 rounded-2xl">
        <Icon size={24} className="text-blue-400" />
      </div>
      <div>
        <h3 className="text-lg sm:text-xl font-black text-blue-100 tracking-tight uppercase italic">{title}</h3>
        <p className="text-[10px] text-blue-500/50 font-black tracking-widest">BUILD 2.4.0 // UniversityManagementSuite.java</p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/95 backdrop-blur-xl"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        className="relative w-full max-w-6xl bg-[#0a0d0c] border border-blue-500/30 rounded-2xl sm:rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(37,99,235,0.15)] flex flex-col max-h-[90vh] mx-2 sm:mx-4"
      >
        {/* Header */}
        <div className="bg-[#060807] px-4 sm:px-10 py-4 sm:py-6 flex justify-between items-center border-b border-blue-500/10">
          <div className="flex items-center gap-2 sm:gap-4">
            <GraduationCap size={18} className="text-blue-500 sm:w-6 sm:h-6" />
            <span className="text-[8px] sm:text-[12px] font-mono text-zinc-500 uppercase tracking-[0.2em] sm:tracking-[0.4em] font-black underline decoration-blue-500/30 truncate max-w-[200px] sm:max-w-none">
              ORACLE_JDK_SUITE // GLOBAL_ADMIN
            </span>
          </div>
          <button onClick={onClose} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-red-500/20 transition-all shrink-0">
            <X size={16} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex px-4 sm:px-10 pt-4 sm:pt-8 gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {[
            { id: "students", label: "Students", icon: Users },
            { id: "courses", label: "Courses", icon: BookOpen },
            { id: "faculties", label: "Faculties", icon: GraduationCap },
            { id: "enroll", label: "Linkage", icon: UserPlus },
            { id: "search", label: "Lookup", icon: Search },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab.id 
                ? "bg-blue-600 text-black shadow-[0_10px_20px_rgba(37,99,235,0.3)]" 
                : "bg-white/5 text-zinc-500 hover:bg-white/10"
              }`}
            >
              <tab.icon size={14} className="sm:w-[16px] sm:h-[16px]" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-10 custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === "students" && (
              <motion.div key="students" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <SectionHeader title="Student Registry" icon={Users} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                  <div className="lg:col-span-1 space-y-4 sm:space-y-6">
                    <div className="bg-white/5 border border-white/5 p-6 sm:p-8 rounded-2xl sm:rounded-[2.5rem]">
                      <h4 className="text-[10px] sm:text-xs font-black text-blue-400 uppercase tracking-widest mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
                        <PlusCircle size={14}/> Instantiate Object
                      </h4>
                      <div className="space-y-3 sm:space-y-4">
                        <input placeholder="ID (integer)" value={stuForm.id} onChange={e => setStuForm({...stuForm, id: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 sm:p-5 rounded-xl sm:rounded-2xl text-white text-xs sm:text-sm outline-none focus:border-blue-500/50" />
                        <input placeholder="Full Name" value={stuForm.name} onChange={e => setStuForm({...stuForm, name: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 sm:p-5 rounded-xl sm:rounded-2xl text-white text-xs sm:text-sm outline-none focus:border-blue-500/50" />
                        <input placeholder="CGPA (float)" type="number" step="0.01" value={stuForm.cgpa} onChange={e => setStuForm({...stuForm, cgpa: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 sm:p-5 rounded-xl sm:rounded-2xl text-white text-xs sm:text-sm outline-none focus:border-blue-500/50" />
                        <button onClick={handleAddStudent} className="w-full bg-blue-600 text-black font-black py-4 sm:py-5 rounded-xl sm:rounded-2xl mt-2 sm:mt-4 uppercase text-[9px] sm:text-[10px] tracking-widest shadow-xl">Push to Heap</button>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="bg-white/5 border border-white/5 rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden">
                      <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left min-w-[500px]">
                          <thead>
                            <tr className="bg-blue-500/5 border-b border-white/5">
                              <th className="px-8 py-5 text-[10px] font-black text-blue-500 uppercase tracking-widest">ID</th>
                              <th className="px-8 py-5 text-[10px] font-black text-blue-500 uppercase tracking-widest">Name</th>
                              <th className="px-8 py-5 text-[10px] font-black text-blue-500 uppercase tracking-widest">CGPA</th>
                              <th className="px-8 py-5 text-[10px] font-black text-blue-500 uppercase tracking-widest">Courses</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                          {students.map(s => (
                            <tr key={s.id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-8 py-6 font-mono text-blue-400/60 text-xs">#{s.id}</td>
                                <td className="px-8 py-6 text-white font-bold text-xs uppercase">{s.name}</td>
                                <td className="px-8 py-6 text-blue-400 font-black text-xs font-mono">{s.cgpa.toFixed(2)}</td>
                                <td className="px-8 py-6 text-zinc-500 text-[10px] uppercase font-black">{s.courses.join(", ") || "No courses"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            )}

            {activeTab === "courses" && (
              <motion.div key="courses" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <SectionHeader title="Curriculum Index" icon={BookOpen} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                   <div className="lg:col-span-1 space-y-4 sm:space-y-6">
                    <div className="bg-white/5 border border-white/5 p-6 sm:p-8 rounded-2xl sm:rounded-[2.5rem]">
                      <h4 className="text-[10px] sm:text-xs font-black text-blue-400 uppercase tracking-widest mb-6 sm:mb-8">New Course Method</h4>
                      <div className="space-y-3 sm:space-y-4">
                        <input placeholder="Course Code (e.g. CS101)" value={courseForm.id} onChange={e => setCourseForm({...courseForm, id: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 sm:p-5 rounded-xl sm:rounded-2xl text-white text-xs sm:text-sm outline-none focus:border-blue-500/50" />
                        <input placeholder="Course Title" value={courseForm.title} onChange={e => setCourseForm({...courseForm, title: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 sm:p-5 rounded-xl sm:rounded-2xl text-white text-xs sm:text-sm outline-none focus:border-blue-500/50" />
                        <input placeholder="Credits (float)" type="number" step="0.5" value={courseForm.credit} onChange={e => setCourseForm({...courseForm, credit: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 sm:p-5 rounded-xl sm:rounded-2xl text-white text-xs sm:text-sm outline-none focus:border-blue-500/50" />
                        <button onClick={handleAddCourse} className="w-full bg-blue-600 text-black font-black py-4 sm:py-5 rounded-xl sm:rounded-2xl mt-2 sm:mt-4 uppercase text-[9px] sm:text-[10px] tracking-widest shadow-xl">Allocate</button>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="bg-white/5 border border-white/5 rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden">
                      <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left min-w-[500px]">
                          <thead>
                            <tr className="bg-blue-500/5 border-b border-white/5">
                              <th className="px-8 py-5 text-[10px] font-black text-blue-500 uppercase tracking-widest">CID</th>
                              <th className="px-8 py-5 text-[10px] font-black text-blue-500 uppercase tracking-widest">Title</th>
                              <th className="px-8 py-5 text-[10px] font-black text-blue-500 uppercase tracking-widest">Credits</th>
                              <th className="px-8 py-5 text-[10px] font-black text-blue-500 uppercase tracking-widest">Faculty</th>
                            </tr>
                          </thead>
                        <tbody className="divide-y divide-white/5">
                          {courses.map(c => (
                            <tr key={c.cid} className="hover:bg-white/5 transition-colors">
                                <td className="px-8 py-6 font-mono text-blue-400 text-xs">{c.cid}</td>
                                <td className="px-8 py-6 text-white font-bold text-xs uppercase">{c.title}</td>
                                <td className="px-8 py-6 text-blue-400 font-black text-xs font-mono">{c.credit}</td>
                                <td className="px-8 py-6 text-zinc-500 text-[10px] uppercase font-black">{faculties.find(f => f.fid === c.facultyId)?.name || "Unassigned"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            )}

            {activeTab === "faculties" && (
              <motion.div key="faculties" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <SectionHeader title="Academic Staff" icon={GraduationCap} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                   <div className="lg:col-span-1 space-y-4 sm:space-y-6">
                    <div className="bg-white/5 border border-white/5 p-6 sm:p-8 rounded-2xl sm:rounded-[2.5rem]">
                      <h4 className="text-[10px] sm:text-xs font-black text-blue-400 uppercase tracking-widest mb-6 sm:mb-8">Faculty Node Insert</h4>
                      <div className="space-y-3 sm:space-y-4">
                        <input placeholder="Faculty ID" value={facForm.id} onChange={e => setFacForm({...facForm, id: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 sm:p-5 rounded-xl sm:rounded-2xl text-white text-xs sm:text-sm outline-none focus:border-blue-500/50" />
                        <input placeholder="Full Name" value={facForm.name} onChange={e => setFacForm({...facForm, name: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 sm:p-5 rounded-xl sm:rounded-2xl text-white text-xs sm:text-sm outline-none focus:border-blue-500/50" />
                        <input placeholder="Position" value={facForm.position} onChange={e => setFacForm({...facForm, position: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 sm:p-5 rounded-xl sm:rounded-2xl text-white text-xs sm:text-sm outline-none focus:border-blue-500/50" />
                        <button onClick={handleAddFaculty} className="w-full bg-blue-600 text-black font-black py-4 sm:py-5 rounded-xl sm:rounded-2xl mt-2 sm:mt-4 uppercase text-[9px] sm:text-[10px] tracking-widest shadow-xl">Commit</button>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="bg-white/5 border border-white/5 rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden">
                      <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left min-w-[400px]">
                        <thead>
                          <tr className="bg-blue-500/5 border-b border-white/5">
                            <th className="px-8 py-5 text-[10px] font-black text-blue-500 uppercase tracking-widest">FID</th>
                            <th className="px-8 py-5 text-[10px] font-black text-blue-500 uppercase tracking-widest">Name</th>
                            <th className="px-8 py-5 text-[10px] font-black text-blue-500 uppercase tracking-widest">Position</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {faculties.map(f => (
                            <tr key={f.fid} className="hover:bg-white/5 transition-colors">
                                <td className="px-8 py-6 font-mono text-blue-400/40 text-xs">#{f.fid}</td>
                                <td className="px-8 py-6 text-white font-bold text-xs uppercase">{f.name}</td>
                                <td className="px-8 py-6 text-zinc-500 text-[10px] font-black uppercase tracking-widest">{f.position}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            )}

            {activeTab === "enroll" && (
              <motion.div key="enroll" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <SectionHeader title="Functional Linkage" icon={UserPlus} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white/5 border border-white/5 p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[3rem] space-y-4 sm:space-y-6">
                    <h4 className="text-[10px] sm:text-xs font-black text-blue-400 uppercase tracking-widest flex items-center gap-2 sm:gap-3">
                      <GraduationCap size={16}/> Student-Course Matrix
                    </h4>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">Map a student ID to a valid course reference in the current context.</p>
                    <div className="space-y-3 sm:space-y-4 pt-4">
                      <input placeholder="STUDENT_ID" value={enrollForm.stuId} onChange={e => setEnrollForm({...enrollForm, stuId: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 sm:p-5 rounded-xl sm:rounded-2xl text-white text-xs sm:text-sm outline-none focus:border-blue-500/50" />
                      <input placeholder="COURSE_ID" value={enrollForm.courseId} onChange={e => setEnrollForm({...enrollForm, courseId: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 sm:p-5 rounded-xl sm:rounded-2xl text-white text-xs sm:text-sm outline-none focus:border-blue-500/50" />
                      <button onClick={handleEnroll} className="w-full bg-blue-600 text-black font-black py-4 sm:py-5 rounded-xl sm:rounded-2xl uppercase tracking-widest text-[9px] sm:text-[10px]">Enrollment::init()</button>
                    </div>
                  </div>

                   <div className="bg-white/5 border border-white/5 p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[3rem] space-y-4 sm:space-y-6">
                    <h4 className="text-[10px] sm:text-xs font-black text-blue-400 uppercase tracking-widest flex items-center gap-2 sm:gap-3">
                      <BookOpen size={16}/> Faculty Assignment
                    </h4>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">Set the pointer of a faculty member as the primary lead for a course entity.</p>
                    <div className="space-y-3 sm:space-y-4 pt-4">
                      <input placeholder="FACULTY_ID" value={assignForm.facId} onChange={e => setAssignForm({...assignForm, facId: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 sm:p-5 rounded-xl sm:rounded-2xl text-white text-xs sm:text-sm outline-none focus:border-blue-500/50" />
                      <input placeholder="COURSE_ID" value={assignForm.courseId} onChange={e => setAssignForm({...assignForm, courseId: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 sm:p-5 rounded-xl sm:rounded-2xl text-white text-xs sm:text-sm outline-none focus:border-blue-500/50" />
                      <button onClick={handleAssign} className="w-full bg-white/10 text-white font-black py-4 sm:py-5 rounded-xl sm:rounded-2xl uppercase tracking-widest text-[9px] sm:text-[10px] hover:bg-white/20 transition-all border border-blue-500/20">Assignment::commit()</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "search" && (
              <motion.div key="search" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <SectionHeader title="Query & Reporting" icon={Search} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white/5 border border-white/5 p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[3rem] flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/20">
                      <Layout size={32} className="text-blue-400" />
                    </div>
                    <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">View All Linkages</h4>
                    <p className="text-[10px] text-zinc-600 uppercase mb-8 tracking-widest leading-relaxed">Show full mapping of students per course in current session heap.</p>
                    <button className="w-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-black py-5 rounded-2xl uppercase tracking-widest text-[10px] hover:bg-blue-500/20 transition-all">Generate Report</button>
                  </div>
                   <div className="bg-white/5 border border-white/5 p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[3rem] flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-zinc-500/10 rounded-2xl flex items-center justify-center mb-8 border border-zinc-500/20">
                      <CheckCircle2 size={32} className="text-zinc-500" />
                    </div>
                    <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">System Verification</h4>
                    <p className="text-[10px] text-zinc-600 uppercase mb-8 tracking-widest leading-relaxed">Run a full recursive scan for orphaned student or faculty nodes.</p>
                    <button className="w-full bg-zinc-900 border border-zinc-800 text-zinc-700 font-black py-5 rounded-2xl uppercase tracking-widest text-[10px] cursor-not-allowed">Diagnostic Active</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {feedback && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-12 p-6 rounded-[2rem] bg-blue-950/20 border-l-4 border-blue-500 text-[10px] text-blue-200/80 font-black tracking-[0.3em] flex items-center gap-4">
              <Info size={16} className="text-blue-500" />
              {feedback}
            </motion.div>
          )}
        </div>

        <div className="bg-[#060807] p-6 sm:p-8 text-[8px] sm:text-[9px] text-zinc-800 text-center font-black uppercase tracking-[0.3em] sm:tracking-[0.6em] border-t border-blue-500/5">
          Virtual Machine Managed Context // Global Persistent Storage OFF
        </div>
      </motion.div>
    </div>
  );
}

const PlusCircle = ({ size, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);
