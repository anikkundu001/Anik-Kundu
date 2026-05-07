import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface Vehicle {
  id: string;
  vehicle_name: string;
  manu_name: string;
  date: {
    dd: number;
    mm: number;
    yyyy: number;
  };
}

interface VehicleMSProps {
  onClose: () => void;
}

export default function VehicleMS({ onClose }: VehicleMSProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [credentials, setCredentials] = useState({ user: "admin", pass: "admin" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState<"login" | "menu" | "add" | "search" | "viewAll" | "delete" | "updatePass">("login");
  const [feedback, setFeedback] = useState("");

  const [loginUser, setLoginUser] = useState("admin");
  const [loginPass, setLoginPass] = useState("admin");

  const [addForm, setAddForm] = useState({ id: "", name: "", manu: "", dd: "", mm: "", yy: "" });
  const [searchName, setSearchName] = useState("");
  const [searchResults, setSearchResults] = useState<Vehicle[]>([]);
  const [delId, setDelId] = useState("");
  const [updUser, setUpdUser] = useState("");
  const [updPass, setUpdPass] = useState("");

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const isIdValid = (id: string, excludeIndex = -1) => {
    if (!/^\d+$/.test(id)) return false;
    return !vehicles.some((v, idx) => idx !== excludeIndex && v.id === id);
  };

  const isNameValid = (str: string) => {
    if (str.length === 0 || str.length > 30) return false;
    return /^[a-zA-Z0-9 _-]+$/.test(str);
  };

  const isValidDate = (d: number, m: number, y: number) => {
    if (y < 1900 || y > 2022) return false;
    if (m < 1 || m > 12) return false;
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (m === 2) {
      const isLeap = (y % 400 === 0) || (y % 4 === 0 && y % 100 !== 0);
      if (isLeap) daysInMonth[1] = 29;
    }
    return d >= 1 && d <= daysInMonth[m - 1];
  };

  const handleLogin = () => {
    if (loginUser === credentials.user && loginPass === credentials.pass) {
      setIsLoggedIn(true);
      setView("menu");
      setFeedback("");
    } else {
      setFeedback("❌ Login Failed! Invalid username or password.");
    }
  };

  const handleAddVehicle = () => {
    const { id, name, manu, dd, mm, yy } = addForm;
    const day = parseInt(dd);
    const month = parseInt(mm);
    const year = parseInt(yy);

    if (!isIdValid(id)) {
      setFeedback("❌ Invalid ID! Must be numeric and unique.");
      return;
    }
    if (!isNameValid(name)) {
      setFeedback("❌ Invalid Vehicle Name! (Letters, digits, space, _, -) max 30.");
      return;
    }
    if (!isNameValid(manu)) {
      setFeedback("❌ Invalid Manufacturer Name!");
      return;
    }
    if (isNaN(day) || isNaN(month) || isNaN(year) || !isValidDate(day, month, year)) {
      setFeedback("❌ Invalid Date! (1900-2022)");
      return;
    }

    setVehicles([...vehicles, {
      id,
      vehicle_name: name,
      manu_name: manu,
      date: { dd: day, mm: month, yyyy: year }
    }]);
    setFeedback("✅ Vehicle added successfully!");
    setTimeout(() => setView("menu"), 1000);
  };

  const handleSearch = () => {
    const results = vehicles.filter(v => v.vehicle_name === searchName);
    setSearchResults(results);
    if (results.length === 0) setFeedback("❌ Not Found! No vehicle with that name.");
    else setFeedback(`✅ Found ${results.length} vehicle(s).`);
  };

  const handleDelete = () => {
    const index = vehicles.findIndex(v => v.id === delId);
    if (index === -1) {
      setFeedback("❌ Not found. Vehicle ID doesn't exist.");
      return;
    }
    const newVehicles = [...vehicles];
    newVehicles.splice(index, 1);
    setVehicles(newVehicles);
    setFeedback("✅ Record deleted successfully!");
    setTimeout(() => setView("menu"), 1000);
  };

  const handleUpdatePass = () => {
    if (updUser.length < 4 || updUser.length > 16) {
      setFeedback("❌ USERNAME length must be 4-16 characters.");
      return;
    }
    if (!/^[a-zA-Z]/.test(updUser)) {
      setFeedback("❌ USERNAME must start with an alphabet.");
      return;
    }
    if (!/^[a-zA-Z0-9]+$/.test(updUser)) {
      setFeedback("❌ USERNAME can only contain alphanumeric characters.");
      return;
    }
    if (updPass.length < 4 || updPass.length > 25) {
      setFeedback("❌ PASSWORD length must be 4-25 characters.");
      return;
    }
    if (!/^[a-zA-Z]/.test(updPass)) {
      setFeedback("❌ PASSWORD must start with an alphabet.");
      return;
    }
    if (!/^[a-zA-Z0-9!@#$%^&*_]+$/.test(updPass)) {
      setFeedback("❌ PASSWORD contains invalid chars. Allowed: !@#$%^&*_");
      return;
    }
    if (updPass.endsWith("_")) {
      setFeedback("❌ PASSWORD last character cannot be '_'.");
      return;
    }

    setCredentials({ user: updUser, pass: updPass });
    setFeedback("✅ Credentials updated! Please login again.");
    setTimeout(() => {
      setIsLoggedIn(false);
      setView("login");
    }, 1500);
  };

  const HeaderMessage = ({ title }: { title: string }) => (
    <div className="text-center my-4">
      <span className="bg-black/40 px-4 py-1.5 rounded-full font-mono font-bold text-violet-300 border border-violet-500/20 shadow-inner">
        🔹 {title} 🔹
      </span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl bg-[#0f1a1f] border border-yellow-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header ASCII */}
        <div className="bg-[#021016] border-b-2 border-orange-500 text-center py-4 relative">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-zinc-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          <div className="text-[10px] text-yellow-500 font-mono tracking-tighter opacity-50 overflow-hidden whitespace-nowrap mb-2">
            {"<~>".repeat(40)}
          </div>
          <div className="bg-black/40 px-6 py-2 rounded-full inline-block font-mono font-bold text-orange-200 border border-orange-500/20">
            🚘 VEHICLE MANAGEMENT SYSTEM 🚔
          </div>
          <div className="text-[10px] text-yellow-500 font-mono tracking-tighter opacity-50 overflow-hidden whitespace-nowrap mt-2">
            {"<~>".repeat(40)}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#111d23] text-zinc-300 font-mono">
          <AnimatePresence mode="wait">
            {view === "login" && (
              <motion.div 
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <HeaderMessage title="LOGIN PORTAL" />
                <div className="bg-zinc-800/20 p-8 rounded-2xl border-l-4 border-orange-500 space-y-4 max-w-sm mx-auto">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Username</label>
                    <input 
                      type="text" 
                      value={loginUser}
                      onChange={(e) => setLoginUser(e.target.value)}
                      className="w-full bg-[#fef9e6] text-[#021016] px-4 py-2 rounded-full font-bold focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Password</label>
                    <input 
                      type="password" 
                      value={loginPass}
                      onChange={(e) => setLoginPass(e.target.value)}
                      className="w-full bg-[#fef9e6] text-[#021016] px-4 py-2 rounded-full font-bold focus:outline-none"
                    />
                  </div>
                  <button 
                    onClick={handleLogin}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-[#021016] font-bold py-2 rounded-full transition-all active:scale-95"
                  >
                    ⏎ SIGN IN
                  </button>
                  <div className="bg-black/60 p-3 rounded-xl text-[10px] text-zinc-400">
                    🔐 Default: admin / admin
                  </div>
                </div>
              </motion.div>
            )}

            {view === "menu" && (
              <motion.div 
                key="menu"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <HeaderMessage title="MAIN MENU" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: "add", label: "➕ 1. ADD VEHICLE" },
                    { id: "search", label: "🔍 2. SEARCH VEHICLES" },
                    { id: "viewAll", label: "📋 3. VIEW VEHICLES" },
                    { id: "delete", label: "🗑️ 4. DELETE VEHICLE", danger: true },
                    { id: "updatePass", label: "🔐 5. UPDATE PASSWORD" },
                    { id: "exit", label: "🚪 6. EXIT / CLOSE APP" },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => btn.id === "exit" ? onClose() : setView(btn.id as any)}
                      className={`py-3 px-6 rounded-full font-bold text-sm transition-all active:scale-95 shadow-lg border border-black/20 text-center ${
                        btn.danger 
                          ? "bg-red-900/40 hover:bg-red-800/60 text-red-200" 
                          : "bg-zinc-800/40 hover:bg-orange-500 hover:text-[#021016] text-orange-200"
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
                <div className="bg-black/40 p-4 rounded-2xl border-l-8 border-orange-500 text-xs flex justify-between items-center">
                  <span>✔️ System ready</span>
                  <span className="text-zinc-500">Total vehicles: {vehicles.length}</span>
                </div>
              </motion.div>
            )}

            {view === "add" && (
              <motion.div key="add" className="space-y-6">
                <HeaderMessage title="ADD NEW VEHICLE" />
                <div className="bg-zinc-800/20 p-8 rounded-2xl border-l-4 border-orange-500 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Vehicle ID</label>
                      <input 
                        type="text" 
                        placeholder="e.g., 101"
                        value={addForm.id}
                        onChange={(e) => setAddForm({ ...addForm, id: e.target.value })}
                        className="w-full bg-[#fef9e6] text-[#021016] px-4 py-2 rounded-full font-bold text-sm focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Vehicle Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Tesla Model 3"
                        value={addForm.name}
                        onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                        className="w-full bg-[#fef9e6] text-[#021016] px-4 py-2 rounded-full font-bold text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Manufacturer</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Tesla"
                      value={addForm.manu}
                      onChange={(e) => setAddForm({ ...addForm, manu: e.target.value })}
                      className="w-full bg-[#fef9e6] text-[#021016] px-4 py-2 rounded-full font-bold text-sm focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Issue Date (DD/MM/YYYY)</label>
                    <div className="grid grid-cols-3 gap-2">
                      <input type="text" placeholder="DD" value={addForm.dd} onChange={e => setAddForm({ ...addForm, dd: e.target.value })} className="w-full bg-[#fef9e6] text-[#021016] px-4 py-2 rounded-full font-bold text-sm text-center focus:outline-none" />
                      <input type="text" placeholder="MM" value={addForm.mm} onChange={e => setAddForm({ ...addForm, mm: e.target.value })} className="w-full bg-[#fef9e6] text-[#021016] px-4 py-2 rounded-full font-bold text-sm text-center focus:outline-none" />
                      <input type="text" placeholder="YYYY" value={addForm.yy} onChange={e => setAddForm({ ...addForm, yy: e.target.value })} className="w-full bg-[#fef9e6] text-[#021016] px-4 py-2 rounded-full font-bold text-sm text-center focus:outline-none" />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button onClick={handleAddVehicle} className="flex-1 bg-orange-500 hover:bg-orange-600 text-[#021016] font-bold py-2 rounded-full transition-all">✔️ SAVE</button>
                    <button onClick={() => setView("menu")} className="flex-1 bg-zinc-700 hover:bg-zinc-600 font-bold py-2 rounded-full transition-all border border-white/10">🔙 BACK</button>
                  </div>
                </div>
              </motion.div>
            )}

            {view === "search" && (
              <motion.div key="search" className="space-y-6">
                <HeaderMessage title="SEARCH VEHICLE" />
                <div className="bg-zinc-800/20 p-8 rounded-2xl border-l-4 border-orange-500 space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Vehicle Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Corolla"
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                      className="w-full bg-[#fef9e6] text-[#021016] px-4 py-2 rounded-full font-bold text-sm focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={handleSearch} className="flex-1 bg-orange-500 hover:bg-orange-600 text-[#021016] font-bold py-2 rounded-full transition-all">🔍 SEARCH</button>
                    <button onClick={() => setView("menu")} className="flex-1 bg-zinc-700 hover:bg-zinc-600 font-bold py-2 rounded-full transition-all border border-white/10">🔙 BACK</button>
                  </div>
                  {searchResults.length > 0 && (
                    <div className="bg-black/60 p-4 rounded-xl space-y-2 text-xs border border-orange-500/20 mt-4 overflow-y-auto max-h-40">
                      {searchResults.map((v, i) => (
                        <div key={i} className="pb-2 border-b border-white/5 last:border-0 last:pb-0">
                          <span className="text-orange-300 font-bold">ID: {v.id}</span> | {v.vehicle_name} ({v.manu_name}) | <span className="text-zinc-500">{v.date.dd}/{v.date.mm}/{v.date.yyyy}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {view === "viewAll" && (
              <motion.div key="viewAll" className="space-y-6">
                <HeaderMessage title="VEHICLE REGISTRY" />
                <div className="bg-zinc-800/20 rounded-2xl border border-white/5 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-black/40 text-orange-200 uppercase font-black tracking-widest border-b border-orange-500/20">
                        <tr>
                          <th className="p-4">#</th>
                          <th className="p-4">ID</th>
                          <th className="p-4">Name</th>
                          <th className="p-4">Manufacturer</th>
                          <th className="p-4">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {vehicles.length === 0 ? (
                          <tr><td colSpan={5} className="p-8 text-center text-zinc-500 italic">No records found. Add vehicles first.</td></tr>
                        ) : (
                          vehicles.map((v, i) => (
                            <tr key={i} className="hover:bg-white/5 transition-colors">
                              <td className="p-4 text-zinc-500">{i + 1}</td>
                              <td className="p-4 font-bold text-orange-300">{v.id}</td>
                              <td className="p-4">{v.vehicle_name}</td>
                              <td className="p-4">{v.manu_name}</td>
                              <td className="p-4 text-zinc-500">{v.date.dd}/{v.date.mm}/{v.date.yyyy}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <button onClick={() => setView("menu")} className="w-full bg-zinc-700 hover:bg-zinc-600 font-bold py-2 rounded-full transition-all border border-white/10">🔙 BACK TO MENU</button>
              </motion.div>
            )}

            {view === "delete" && (
              <motion.div key="delete" className="space-y-6">
                <HeaderMessage title="DELETE RECORD" />
                <div className="bg-zinc-800/20 p-8 rounded-2xl border-l-4 border-red-500 space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Vehicle ID</label>
                    <input 
                      type="text" 
                      placeholder="Enter ID to delete"
                      value={delId}
                      onChange={(e) => setDelId(e.target.value)}
                      className="w-full bg-[#fef9e6] text-[#021016] px-4 py-2 rounded-full font-bold text-sm focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={handleDelete} className="flex-1 bg-red-800 hover:bg-red-700 text-red-100 font-bold py-2 rounded-full transition-all">🗑️ DELETE</button>
                    <button onClick={() => setView("menu")} className="flex-1 bg-zinc-700 hover:bg-zinc-600 font-bold py-2 rounded-full transition-all border border-white/10">🔙 CANCEL</button>
                  </div>
                </div>
              </motion.div>
            )}

            {view === "updatePass" && (
              <motion.div key="updatePass" className="space-y-6">
                <HeaderMessage title="UPDATE CREDENTIALS" />
                <div className="bg-zinc-800/20 p-8 rounded-2xl border-l-4 border-orange-500 space-y-4">
                  <div className="bg-black/40 p-4 rounded-xl text-[10px] text-orange-200/60 leading-relaxed border border-orange-500/10">
                    📌 USERNAME: 4-16 chars, starts with alphabet, alphanumeric.<br />
                    📌 PASSWORD: 4-25 chars, starts with alphabet, allowed: !@#$%^&*_, no trailing underscore.
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">New Username</label>
                      <input 
                        type="text" 
                        value={updUser}
                        onChange={(e) => setUpdUser(e.target.value)}
                        className="w-full bg-[#fef9e6] text-[#021016] px-4 py-2 rounded-full font-bold text-sm focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">New Password</label>
                      <input 
                        type="password" 
                        value={updPass}
                        onChange={(e) => setUpdPass(e.target.value)}
                        className="w-full bg-[#fef9e6] text-[#021016] px-4 py-2 rounded-full font-bold text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button onClick={handleUpdatePass} className="flex-1 bg-orange-500 hover:bg-orange-600 text-[#021016] font-bold py-2 rounded-full transition-all">🔄 UPDATE</button>
                    <button onClick={() => setView("menu")} className="flex-1 bg-zinc-700 hover:bg-zinc-600 font-bold py-2 rounded-full transition-all border border-white/10">🔙 BACK</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {feedback && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-2xl bg-black/60 border-l-8 border-orange-400 text-xs text-orange-100 font-mono"
            >
              {feedback}
            </motion.div>
          )}
        </div>

        <div className="bg-[#021016] border-t border-white/5 p-4 text-[10px] text-zinc-600 text-center uppercase tracking-widest font-black">
          🔧 Secure Management System · Refined Portfolio Engine
        </div>
      </motion.div>
    </div>
  );
}
