import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Download, 
  Trash2, 
  Users, 
  BookOpen, 
  GraduationCap, 
  Search, 
  BarChart3, 
  Trophy,
  Plus,
  Edit2,
  AlertCircle
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Student {
  id: string;
  name: string;
  cgpa: number;
}

interface Course {
  id: string;
  title: string;
}

interface Faculty {
  id: string;
  name: string;
}

export default function UltimateUniversityDashboard({ onClose }: { onClose: () => void }) {
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('ultra_students');
    return saved ? JSON.parse(saved) : [
      { id: '101', name: 'Alice', cgpa: 3.95 },
      { id: '102', name: 'Bob', cgpa: 3.5 },
      { id: '103', name: 'Charlie', cgpa: 3.75 }
    ];
  });
  
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('ultra_courses');
    return saved ? JSON.parse(saved) : [{ id: 'CS101', title: 'Programming' }];
  });

  const [faculties, setFaculties] = useState<Faculty[]>(() => {
    const saved = localStorage.getItem('ultra_faculties');
    return saved ? JSON.parse(saved) : [{ id: '1', name: 'Dr. Smith' }];
  });

  const [stuForm, setStuForm] = useState({ id: '', name: '', cgpa: '' });
  const [courseForm, setCourseForm] = useState({ id: '', title: '' });
  const [facForm, setFacForm] = useState({ id: '', name: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('ultra_students', JSON.stringify(students));
    localStorage.setItem('ultra_courses', JSON.stringify(courses));
    localStorage.setItem('ultra_faculties', JSON.stringify(faculties));
  }, [students, courses, faculties]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const addStudent = () => {
    if (!stuForm.id || !stuForm.name || isNaN(parseFloat(stuForm.cgpa))) {
      showToast('Enter valid student info');
      return;
    }
    setStudents([...students, { id: stuForm.id, name: stuForm.name, cgpa: parseFloat(stuForm.cgpa) }]);
    setStuForm({ id: '', name: '', cgpa: '' });
    showToast('Student Added');
  };

  const addCourse = () => {
    if (!courseForm.id || !courseForm.title) {
      showToast('Course info missing');
      return;
    }
    setCourses([...courses, { id: courseForm.id, title: courseForm.title }]);
    setCourseForm({ id: '', title: '' });
    showToast('Course Added');
  };

  const addFaculty = () => {
    if (!facForm.id || !facForm.name) {
      showToast('Faculty info missing');
      return;
    }
    setFaculties([...faculties, { id: facForm.id, name: facForm.name }]);
    setFacForm({ id: '', name: '' });
    showToast('Faculty Added');
  };

  const deleteStudent = (index: number) => {
    if (confirm('Delete student?')) {
      setStudents(students.filter((_, i) => i !== index));
      showToast('Student Deleted');
    }
  };

  const editStudent = (index: number) => {
    const student = students[index];
    const newName = prompt('New Name', student.name);
    const newCgpa = prompt('New CGPA', student.cgpa.toString());
    if (newName && newCgpa) {
      const updated = [...students];
      updated[index] = { ...student, name: newName, cgpa: parseFloat(newCgpa) };
      setStudents(updated);
      showToast('Student Updated');
    }
  };

  const clearAll = () => {
    if (confirm('Clear all data?')) {
      setStudents([]);
      setCourses([]);
      setFaculties([]);
      showToast('All Data Cleared');
    }
  };

  const exportData = () => {
    const data = { students, courses, faculties };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'university_backup.json';
    a.click();
    showToast('Backup Downloaded');
  };

  const filteredStudents = students.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const avgCgpa = students.length > 0 ? (students.reduce((a, b) => a + b.cgpa, 0) / students.length).toFixed(2) : '0.00';
  const topStudents = [...students].sort((a, b) => b.cgpa - a.cgpa).slice(0, 5);

  const chartData = {
    labels: students.map(s => s.name),
    datasets: [
      {
        label: 'CGPA Score',
        data: students.map(s => s.cgpa),
        backgroundColor: 'rgba(96, 165, 250, 0.5)',
        borderColor: '#60a5fa',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e293b',
        titleFont: { size: 14, weight: 'bold' as const },
        padding: 12,
        cornerRadius: 12,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 4,
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#94a3b8' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8' }
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#020617] text-white overflow-y-auto custom-scrollbar pt-6 pb-20 px-4 sm:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent italic tracking-tight">
              GRADUATE_COMMAND_CENTER
            </h1>
            <p className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.4em] mt-2">Live System Environment // OS_KERNEL_2.5.1</p>
          </div>
          <div className="flex gap-3">
            <button onClick={exportData} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
              <Download size={14} /> Export
            </button>
            <button onClick={clearAll} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs font-black uppercase tracking-widest text-red-400 hover:bg-red-500/20 transition-all">
              <Trash2 size={14} /> Reset
            </button>
            <button onClick={onClose} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-all">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {[
            { label: 'Total Students', val: students.length, icon: Users, color: 'text-blue-400' },
            { label: 'Total Courses', val: courses.length, icon: BookOpen, color: 'text-purple-400' },
            { label: 'Total Faculties', val: faculties.length, icon: GraduationCap, color: 'text-blue-400' },
            { label: 'Average CGPA', val: avgCgpa, icon: BarChart3, color: 'text-green-400' }
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/5 p-6 sm:p-8 rounded-[2rem] backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <stat.icon size={16} className={stat.color} />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{stat.label}</span>
              </div>
              <div className="text-3xl sm:text-5xl font-black italic">{stat.val}</div>
            </div>
          ))}
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {/* Student Form */}
          <div className="bg-white/5 border border-white/5 p-8 rounded-[3rem] space-y-6">
            <h3 className="text-xs font-black text-blue-400 uppercase tracking-widest flex items-center gap-3">
              <Plus size={16}/> Student Registry
            </h3>
            <div className="space-y-4">
              <input 
                placeholder="Student ID" 
                value={stuForm.id} 
                onChange={e => setStuForm({...stuForm, id: e.target.value})}
                className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-blue-500/50 text-sm" 
              />
              <input 
                placeholder="Full Name" 
                value={stuForm.name} 
                onChange={e => setStuForm({...stuForm, name: e.target.value})}
                className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-blue-500/50 text-sm" 
              />
              <input 
                placeholder="CGPA (0.00)" 
                type="number" 
                step="0.01"
                value={stuForm.cgpa} 
                onChange={e => setStuForm({...stuForm, cgpa: e.target.value})}
                className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-blue-500/50 text-sm" 
              />
              <button onClick={addStudent} className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl uppercase tracking-widest text-[10px] shadow-xl hover:bg-blue-500 transition-all">Add Student</button>
            </div>
          </div>

          {/* Course Form */}
          <div className="bg-white/5 border border-white/5 p-8 rounded-[3rem] space-y-6">
            <h3 className="text-xs font-black text-purple-400 uppercase tracking-widest flex items-center gap-3">
              <Plus size={16}/> Course Matrix
            </h3>
            <div className="space-y-4">
              <input 
                placeholder="Course ID" 
                value={courseForm.id} 
                onChange={e => setCourseForm({...courseForm, id: e.target.value})}
                className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-purple-500/50 text-sm" 
              />
              <input 
                placeholder="Course Title" 
                value={courseForm.title} 
                onChange={e => setCourseForm({...courseForm, title: e.target.value})}
                className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-purple-500/50 text-sm" 
              />
              <button onClick={addCourse} className="w-full bg-purple-600 text-white font-black py-5 rounded-2xl uppercase tracking-widest text-[10px] shadow-xl hover:bg-purple-500 transition-all">Add Course</button>
            </div>
          </div>

          {/* Search/Filter */}
          <div className="bg-white/5 border border-white/5 p-8 rounded-[3rem] space-y-6">
            <h3 className="text-xs font-black text-green-400 uppercase tracking-widest flex items-center gap-3">
              <Search size={16}/> Live Context Filter
            </h3>
            <div className="space-y-4">
              <input 
                placeholder="Search Student Name..." 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-green-500/50 text-sm" 
              />
              <div className="bg-black/20 p-6 rounded-2xl border border-white/5 h-[160px] overflow-y-auto custom-scrollbar space-y-4">
                {filteredStudents.length > 0 ? filteredStudents.map(s => (
                  <div key={s.id} className="text-xs border-b border-white/5 pb-2">
                    <div className="font-bold text-blue-400">{s.name}</div>
                    <div className="text-[10px] text-zinc-500">ID: {s.id} // CGPA: {s.cgpa}</div>
                  </div>
                )) : <div className="text-[10px] text-zinc-600 text-center uppercase tracking-widest mt-8 italic">No results derived from buffer</div>}
              </div>
            </div>
          </div>
        </div>

        {/* Student Table */}
        <div className="bg-white/5 border border-white/5 rounded-[3rem] overflow-hidden mb-12">
          <div className="bg-blue-500/10 p-8 flex justify-between items-center">
            <h3 className="text-xs font-black text-blue-400 uppercase tracking-widest italic">Global Student Linked-List</h3>
            <span className="text-[10px] font-mono text-zinc-500">Memory Heap: {students.length} objects</span>
          </div>
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left min-w-[700px]">
              <thead>
                <tr className="bg-white/5 border-b border-white/5">
                  <th className="px-10 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">ID</th>
                  <th className="px-10 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Descriptor</th>
                  <th className="px-10 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">CGPA Value</th>
                  <th className="px-10 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Operation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {students.map((s, index) => (
                  <tr key={s.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-10 py-6 font-mono text-blue-400/60 text-xs">#{s.id}</td>
                    <td className="px-10 py-6 font-black uppercase italic tracking-tight">{s.name}</td>
                    <td className="px-10 py-6">
                      <span className="text-xl font-black text-blue-400">{s.cgpa}</span>
                      <span className="text-[10px] text-zinc-600 ml-2">/ 4.00</span>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex gap-2">
                        <button onClick={() => editStudent(index)} className="p-3 bg-white/5 rounded-xl border border-white/5 text-zinc-400 hover:text-blue-400 hover:bg-blue-400/10 hover:border-blue-400/20 transition-all">
                          <Edit2 size={14}/>
                        </button>
                        <button onClick={() => deleteStudent(index)} className="p-3 bg-white/5 rounded-xl border border-white/5 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 hover:border-red-400/20 transition-all">
                          <Trash2 size={14}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Analytics & Top Students */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/5 border border-white/5 p-8 sm:p-12 rounded-[3rem]">
            <h3 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-10 flex items-center gap-3 italic">
              <BarChart3 size={16}/> Grade Analytics Engine
            </h3>
            {students.length > 0 ? (
              <Bar data={chartData} options={chartOptions} />
            ) : (
              <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-white/5 rounded-[2rem]">
                <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em]">Empty dataset: No graph generated</p>
              </div>
            )}
          </div>

          <div className="bg-white/5 border border-white/5 p-8 sm:p-12 rounded-[3rem]">
            <h3 className="text-xs font-black text-yellow-500 uppercase tracking-widest mb-10 flex items-center gap-3 italic">
              <Trophy size={16}/> Elite Performers Array
            </h3>
            <div className="space-y-4">
              {topStudents.length > 0 ? topStudents.map((s, i) => (
                <div key={s.id} className="bg-black/20 border border-white/5 p-6 rounded-2xl flex justify-between items-center group hover:bg-yellow-500/5 hover:border-yellow-500/20 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="text-xl font-black text-yellow-500 italic">#{i+1}</div>
                    <div>
                      <div className="font-black uppercase tracking-tight group-hover:text-yellow-500 transition-colors">{s.name}</div>
                      <div className="text-[10px] font-mono text-zinc-600">ID: {s.id}</div>
                    </div>
                  </div>
                  <div className="text-2xl font-black text-blue-400 italic">{s.cgpa}</div>
                </div>
              )) : <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em] text-center mt-20 italic">No records to verify elite status</p>}
            </div>
          </div>
        </div>

        <div className="text-center bg-[#060807] p-8 rounded-3xl border border-white/5 text-[10px] text-zinc-800 font-black uppercase tracking-[0.8em]">
          Persistent Session Terminal // Context Stabilized // Designed By Anik
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-10 right-10 z-[300] bg-blue-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-blue-400/30"
          >
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <AlertCircle size={18} />
            </div>
            <span className="text-xs font-black uppercase tracking-widest">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59,130,246,0.4); }
      `}</style>
    </motion.div>
  );
}
