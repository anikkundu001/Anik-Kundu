import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Activity, User, Calendar, Database, Shield } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: number;
  disease: string;
  room: string;
}

interface HospitalMSProps {
  onClose: () => void;
}

export default function HospitalMS({ onClose }: HospitalMSProps) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState<"login" | "menu" | "add" | "view" | "search">("login");
  const [credentials, setCredentials] = useState({ user: "admin", pass: "admin" });
  const [feedback, setFeedback] = useState("");

  const [loginUser, setLoginUser] = useState("admin");
  const [loginPass, setLoginPass] = useState("admin");

  const [addForm, setAddForm] = useState({ id: "", name: "", age: "", disease: "", room: "" });
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState<Patient | null>(null);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleLogin = () => {
    if (loginUser === credentials.user && loginPass === credentials.pass) {
      setIsLoggedIn(true);
      setView("menu");
      setFeedback("");
    } else {
      setFeedback("❌ Access Denied: Invalid System Credentials");
    }
  };

  const handleAddPatient = () => {
    if (!addForm.id || !addForm.name || !addForm.age || !addForm.disease || !addForm.room) {
      setFeedback("❌ Error: All fields are required for database entry.");
      return;
    }
    if (patients.some(p => p.id === addForm.id)) {
      setFeedback("❌ Error: Patient ID already exists in central database.");
      return;
    }

    setPatients([...patients, {
      id: addForm.id,
      name: addForm.name,
      age: parseInt(addForm.age),
      disease: addForm.disease,
      room: addForm.room
    }]);
    setFeedback("✅ Success: Patient record encrypted and stored.");
    setTimeout(() => setView("menu"), 1000);
  };

  const handleSearch = () => {
    const found = patients.find(p => p.id === searchId);
    setSearchResult(found || null);
    if (!found) setFeedback("❌ Notice: No record found for the specified ID.");
  };

  const Header = ({ title, icon: Icon }: { title: string, icon: any }) => (
    <div className="flex items-center gap-3 mb-8 bg-blue-500/5 p-4 rounded-2xl border border-blue-500/10">
      <div className="p-2 bg-blue-500/20 rounded-lg">
        <Icon size={20} className="text-blue-400" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
        <p className="text-[10px] text-blue-400/60 uppercase font-black tracking-widest">C++ Native Core Integration</p>
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
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        className="relative w-full max-w-3xl bg-[#080c10] border border-blue-500/30 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.15)] flex flex-col max-h-[90vh]"
      >
        {/* Terminal Header */}
        <div className="bg-[#0c141d] px-6 py-4 flex justify-between items-center border-b border-blue-500/20">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
            </div>
            <span className="text-[10px] font-mono text-blue-400/40 uppercase tracking-widest font-black">
              System.cpp :: Hospital_Management_v2.0
            </span>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar font-mono">
          <AnimatePresence mode="wait">
            {view === "login" && (
              <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-sm mx-auto pt-10">
                <div className="text-center mb-10">
                  <div className="inline-block p-4 bg-blue-500/10 rounded-3xl border border-blue-500/20 mb-4">
                    <Shield size={40} className="text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Secure Access</h2>
                  <p className="text-xs text-zinc-500 tracking-wide">Enter administrative credentials to proceed</p>
                </div>
                
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="USERNAME"
                    value={loginUser}
                    onChange={(e) => setLoginUser(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white focus:border-blue-500/50 outline-none transition-all"
                  />
                  <input 
                    type="password" 
                    placeholder="PASSWORD"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white focus:border-blue-500/50 outline-none transition-all"
                  />
                  <button 
                    onClick={handleLogin}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all shadow-[0_10px_20px_rgba(37,99,235,0.2)]"
                  >
                    AUTHORIZE ACCESS
                  </button>
                </div>
              </motion.div>
            )}

            {view === "menu" && (
              <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <Header title="DATABASE CONTROL" icon={Database} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: "add", label: "Add New Patient" },
                    { id: "view", label: "View All Records" },
                    { id: "search", label: "Search Database" },
                    { id: "logout", label: "Terminate Session" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => item.id === "logout" ? setView("login") : setView(item.id as any)}
                      className="group p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 text-left transition-all hover:bg-white/[0.07]"
                    >
                      <h4 className="text-sm font-bold text-zinc-400 group-hover:text-blue-400 transition-colors uppercase tracking-widest">{item.label}</h4>
                      <p className="text-[10px] text-zinc-600 mt-1">Status: System Operational</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {view === "add" && (
              <motion.div key="add" className="space-y-6">
                <Header title="NEW ENTRY" icon={User} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input placeholder="PATIENT ID" value={addForm.id} onChange={e => setAddForm({...addForm, id: e.target.value})} className="bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none" />
                  <input placeholder="FULL NAME" value={addForm.name} onChange={e => setAddForm({...addForm, name: e.target.value})} className="bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none" />
                  <input placeholder="AGE" type="number" value={addForm.age} onChange={e => setAddForm({...addForm, age: e.target.value})} className="bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none" />
                  <input placeholder="ROOM / WARD" value={addForm.room} onChange={e => setAddForm({...addForm, room: e.target.value})} className="bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none" />
                </div>
                <input placeholder="DIAGNOSIS / DISEASE" value={addForm.disease} onChange={e => setAddForm({...addForm, disease: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none" />
                <div className="flex gap-4 pt-4">
                  <button onClick={handleAddPatient} className="flex-1 bg-blue-600 py-4 rounded-2xl font-bold">COMMIT RECORD</button>
                  <button onClick={() => setView("menu")} className="flex-1 bg-white/5 py-4 rounded-2xl font-bold border border-white/10">CANCEL</button>
                </div>
              </motion.div>
            )}

            {view === "view" && (
              <motion.div key="view" className="space-y-6">
                <Header title="CENTRAL REGISTRY" icon={Activity} />
                <div className="space-y-3">
                  {patients.length === 0 ? (
                    <div className="text-center py-20 text-zinc-600 border-2 border-dashed border-white/5 rounded-3xl italic">No records currently stored.</div>
                  ) : (
                    patients.map((p, i) => (
                      <div key={i} className="p-5 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center group hover:border-blue-500/20 transition-all">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded uppercase font-black tracking-widest">{p.id}</span>
                            <h4 className="font-bold text-white">{p.name}</h4>
                          </div>
                          <p className="text-[10px] text-zinc-500">{p.age} Yrs | Room: {p.room} | Diagnosis: {p.disease}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <button onClick={() => setView("menu")} className="w-full bg-white/5 py-4 rounded-2xl font-bold border border-white/10 mt-6">RETURN TO MENU</button>
              </motion.div>
            )}

            {view === "search" && (
              <motion.div key="search" className="space-y-6">
                <Header title="ID LOOKUP" icon={Database} />
                <div className="flex gap-4">
                  <input placeholder="ENTER PATIENT ID" value={searchId} onChange={e => setSearchId(e.target.value)} className="flex-1 bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none" />
                  <button onClick={handleSearch} className="px-8 bg-blue-600 rounded-2xl font-bold">QUERY</button>
                </div>
                {searchResult && (
                  <div className="mt-8 p-8 bg-blue-500/5 rounded-3xl border border-blue-500/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h4 className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-4">Patient Found</h4>
                    <div className="grid grid-cols-2 gap-y-4">
                      <div><label className="text-[10px] text-zinc-600 block">NAME</label> <span className="text-white font-bold">{searchResult.name}</span></div>
                      <div><label className="text-[10px] text-zinc-600 block">AGE</label> <span className="text-white font-bold">{searchResult.age}</span></div>
                      <div><label className="text-[10px] text-zinc-600 block">ROOM</label> <span className="text-white font-bold">{searchResult.room}</span></div>
                      <div><label className="text-[10px] text-zinc-600 block">DIAGNOSIS</label> <span className="text-white font-bold">{searchResult.disease}</span></div>
                    </div>
                  </div>
                )}
                <button onClick={() => setView("menu")} className="w-full bg-white/5 py-4 rounded-2xl font-bold border border-white/10 mt-4">BACK</button>
              </motion.div>
            )}
          </AnimatePresence>

          {feedback && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-2xl bg-black border-l-4 border-blue-500 text-[10px] text-blue-300 font-black tracking-wider">
              {feedback}
            </motion.div>
          )}
        </div>

        <div className="bg-[#0c141d] p-4 text-[9px] text-zinc-700 text-center font-black uppercase tracking-[0.2em] border-t border-white/5">
          Secure Medical Infrastructure :: Encrypted Data Access Only
        </div>
      </motion.div>
    </div>
  );
}
