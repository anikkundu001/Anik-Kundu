import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, GraduationCap, BookOpen, UserCheck, Shield, Save } from "lucide-react";

interface Student {
  roll: string;
  name: string;
  grade: string;
  section: string;
}

interface StudentMSProps {
  onClose: () => void;
}

export default function StudentMS({ onClose }: StudentMSProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [view, setView] = useState<"login" | "menu" | "add" | "list" | "search">("login");
  const [feedback, setFeedback] = useState("");
  
  const [credentials] = useState({ user: "admin", pass: "1234" });
  const [loginForm, setLoginForm] = useState({ user: "", pass: "" });

  const [addForm, setAddForm] = useState({ roll: "", name: "", grade: "", section: "" });
  const [searchRoll, setSearchRoll] = useState("");
  const [searchResult, setSearchResult] = useState<Student | null>(null);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleLogin = () => {
    if (loginForm.user === credentials.user && loginForm.pass === credentials.pass) {
      setView("menu");
      setFeedback("");
    } else {
      setFeedback("❌ Authentication Error: Invalid Credentials");
    }
  };

  const handleAdd = () => {
    if (!addForm.roll || !addForm.name || !addForm.grade || !addForm.section) {
      setFeedback("❌ All fields must be populated.");
      return;
    }
    if (students.some(s => s.roll === addForm.roll)) {
      setFeedback("❌ Roll Number duplication detected.");
      return;
    }

    setStudents([...students, { ...addForm }]);
    setFeedback("✅ Record successfully written to dat.");
    setTimeout(() => setView("menu"), 800);
    setAddForm({ roll: "", name: "", grade: "", section: "" });
  };

  const handleSearch = () => {
    const found = students.find(s => s.roll === searchRoll);
    setSearchResult(found || null);
    if (!found) setFeedback("❌ Record not found in local index.");
  };

  const TerminalHeader = ({ title }: { title: string }) => (
    <div className="text-center mb-8">
      <div className="inline-block px-4 py-1 border-b-2 border-emerald-500/50">
        <h3 className="text-sm font-mono font-bold text-emerald-400 tracking-[0.3em] uppercase">{title}</h3>
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
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-[#0a0f0d] border border-emerald-500/30 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.1)] flex flex-col max-h-[85vh]"
      >
        <div className="bg-[#050807] px-6 py-3 flex justify-between items-center border-b border-emerald-500/20">
          <div className="flex items-center gap-3">
            <GraduationCap size={16} className="text-emerald-500" />
            <span className="text-[10px] font-mono text-emerald-500/60 uppercase tracking-widest font-black">
              SIS_V1.EXE :: STUDENT_MGMT_SYS
            </span>
          </div>
          <button onClick={onClose} className="text-zinc-600 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar font-mono text-emerald-100/80">
          <AnimatePresence mode="wait">
            {view === "login" && (
              <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xs mx-auto text-center">
                <Shield size={48} className="mx-auto text-emerald-500/40 mb-6" />
                <TerminalHeader title="System Access" />
                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="UID"
                    value={loginForm.user}
                    onChange={e => setLoginForm({...loginForm, user: e.target.value})}
                    className="w-full bg-emerald-500/5 border border-emerald-500/20 px-4 py-3 rounded-xl focus:border-emerald-500/50 outline-none text-center"
                  />
                  <input 
                    type="password" 
                    placeholder="PASSKEY"
                    value={loginForm.pass}
                    onChange={e => setLoginForm({...loginForm, pass: e.target.value})}
                    className="w-full bg-emerald-500/5 border border-emerald-500/20 px-4 py-3 rounded-xl focus:border-emerald-500/50 outline-none text-center"
                  />
                  <button onClick={handleLogin} className="w-full bg-emerald-600 hover:bg-emerald-500 text-black font-black py-3 rounded-xl transition-all">
                    RUN AUTHORIZATION
                  </button>
                  <p className="text-[9px] text-zinc-600 mt-4 tracking-widest">DEFAULT: admin / 1234</p>
                </div>
              </motion.div>
            )}

            {view === "menu" && (
              <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <TerminalHeader title="Main Console" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: "add", label: "01. Create New Record", icon: Save },
                    { id: "list", label: "02. List All Entries", icon: BookOpen },
                    { id: "search", label: "03. Data Retrieval", icon: UserCheck },
                    { id: "login", label: "04. Logout System", icon: X },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setView(item.id as any)}
                      className="flex items-center gap-4 p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all text-left"
                    >
                      <item.icon size={20} className="text-emerald-500/60" />
                      <span className="text-xs font-bold uppercase tracking-wider">{item.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {view === "add" && (
              <motion.div key="add" className="space-y-4">
                <TerminalHeader title="Data Entry" />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="ROLL NO" value={addForm.roll} onChange={e => setAddForm({...addForm, roll: e.target.value})} className="bg-emerald-500/5 border border-emerald-500/20 p-3 rounded-xl outline-none" />
                  <input placeholder="SECTION" value={addForm.section} onChange={e => setAddForm({...addForm, section: e.target.value})} className="bg-emerald-500/5 border border-emerald-500/20 p-3 rounded-xl outline-none" />
                </div>
                <input placeholder="STUDENT NAME" value={addForm.name} onChange={e => setAddForm({...addForm, name: e.target.value})} className="w-full bg-emerald-500/5 border border-emerald-500/20 p-3 rounded-xl outline-none" />
                <input placeholder="GRADE / CLASS" value={addForm.grade} onChange={e => setAddForm({...addForm, grade: e.target.value})} className="w-full bg-emerald-500/5 border border-emerald-500/20 p-3 rounded-xl outline-none" />
                <div className="flex gap-3 pt-4">
                  <button onClick={handleAdd} className="flex-1 bg-emerald-600 text-black font-bold py-3 rounded-xl">COMMIT</button>
                  <button onClick={() => setView("menu")} className="flex-1 border border-emerald-500/20 py-3 rounded-xl hover:bg-white/5 transition-colors">CANCEL</button>
                </div>
              </motion.div>
            )}

            {view === "list" && (
              <motion.div key="list" className="space-y-4">
                <TerminalHeader title="Registry List" />
                <div className="space-y-2">
                  {students.length === 0 ? (
                    <div className="text-center py-10 text-emerald-500/30 italic text-xs">No records initialized.</div>
                  ) : (
                    students.map((s, i) => (
                      <div key={i} className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex justify-between items-center text-xs">
                        <div className="flex items-center gap-4">
                          <span className="text-emerald-500 font-bold">#{s.roll}</span>
                          <span className="font-bold">{s.name}</span>
                        </div>
                        <div className="text-emerald-500/60 uppercase">Grade {s.grade} - {s.section}</div>
                      </div>
                    ))
                  )}
                </div>
                <button onClick={() => setView("menu")} className="w-full border border-emerald-500/20 py-3 rounded-xl text-xs uppercase font-bold tracking-widest mt-6">Back to Console</button>
              </motion.div>
            )}

            {view === "search" && (
              <motion.div key="search" className="space-y-6">
                <TerminalHeader title="Record Query" />
                <div className="flex gap-2">
                  <input placeholder="ENTER ROLL NO" value={searchRoll} onChange={e => setSearchRoll(e.target.value)} className="flex-1 bg-emerald-500/5 border border-emerald-500/20 p-3 rounded-xl outline-none" />
                  <button onClick={handleSearch} className="px-6 bg-emerald-600 text-black font-bold rounded-xl transition-all">QUERY</button>
                </div>
                {searchResult && (
                  <div className="p-6 bg-emerald-500/10 rounded-2xl border border-emerald-500/30">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div><span className="text-emerald-500/50 block mb-1">NAME</span> <span className="font-bold">{searchResult.name}</span></div>
                      <div><span className="text-emerald-500/50 block mb-1">SECTION</span> <span className="font-bold">{searchResult.section}</span></div>
                      <div><span className="text-emerald-500/50 block mb-1">GRADE</span> <span className="font-bold">{searchResult.grade}</span></div>
                    </div>
                  </div>
                )}
                <button onClick={() => setView("menu")} className="w-full border border-emerald-500/20 py-3 rounded-xl text-xs mt-4">BACK</button>
              </motion.div>
            )}
          </AnimatePresence>

          {feedback && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-xl bg-black border-l-4 border-emerald-500 text-[10px] text-emerald-400 font-black tracking-widest">
              {feedback}
            </motion.div>
          )}
        </div>

        <div className="bg-[#050807] p-3 text-[8px] text-emerald-900 text-center font-black uppercase tracking-[0.4em] border-t border-emerald-500/10">
          Academic Management Protocol :: Low-Level Data Handling Enabled
        </div>
      </motion.div>
    </div>
  );
}
