import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Package, Plus, Search, List, Trash2, Shield, Settings, Info } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

interface InventoryMSProps {
  onClose: () => void;
}

export default function InventoryMS({ onClose }: InventoryMSProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [view, setView] = useState<"login" | "dashboard" | "add" | "view" | "search">("login");
  const [feedback, setFeedback] = useState("");
  
  const [credentials] = useState({ user: "admin", pass: "java123" });
  const [loginForm, setLoginForm] = useState({ user: "", pass: "" });

  const [addForm, setAddForm] = useState({ id: "", name: "", category: "Hardware", price: "", stock: "" });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleLogin = () => {
    if (loginForm.user === credentials.user && loginForm.pass === credentials.pass) {
      setView("dashboard");
      setFeedback("");
    } else {
      setFeedback("❌ Invalid credentials. Check console for error log.");
    }
  };

  const handleAddProduct = () => {
    const price = parseFloat(addForm.price);
    const stock = parseInt(addForm.stock);

    if (!addForm.id || !addForm.name || isNaN(price) || isNaN(stock)) {
      setFeedback("❌ Input Error: All fields must be valid.");
      return;
    }

    if (products.some(p => p.id === addForm.id)) {
      setFeedback("❌ Constraint Violation: Duplicate Product ID.");
      return;
    }

    setProducts([...products, { ...addForm, price, stock }]);
    setFeedback("✅ Success: Product instance created in heap.");
    setAddForm({ id: "", name: "", category: "Hardware", price: "", stock: "" });
    setTimeout(() => setView("dashboard"), 1000);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    setFeedback("✅ Garbage Collection: Entry removed.");
  };

  const WindowHeader = ({ title, icon: Icon }: { title: string, icon: any }) => (
    <div className="flex items-center gap-4 mb-8 bg-indigo-500/10 border border-indigo-500/20 p-5 rounded-3xl">
      <div className="p-3 bg-indigo-500/20 rounded-2xl">
        <Icon size={24} className="text-indigo-400" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-indigo-100 tracking-tight uppercase">{title}</h3>
        <p className="text-[10px] text-indigo-400/50 font-black tracking-widest">JRE 17.0 // InventorySystem.jar</p>
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
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        className="relative w-full max-w-4xl bg-[#08080a] border border-indigo-500/20 rounded-2xl sm:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh] mx-2 sm:mx-4"
      >
        {/* Title Bar */}
        <div className="bg-[#101014] px-4 sm:px-8 py-3 sm:py-5 flex justify-between items-center border-b border-indigo-500/10">
          <div className="flex items-center gap-2 sm:gap-3">
            <Package size={16} className="text-indigo-500 sm:w-[18px] sm:h-[18px]" />
            <span className="text-[8px] sm:text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black truncate max-w-[150px] sm:max-w-none">
              Java_Runtime // Inventory_System.class
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button className="text-zinc-700 hover:text-white"><Settings size={14} className="sm:w-[16px] sm:h-[16px]" /></button>
            <button onClick={onClose} className="text-zinc-700 hover:text-white"><X size={16} className="sm:w-[20px] sm:h-[20px]" /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-12 custom-scrollbar">
          <AnimatePresence mode="wait">
            {view === "login" && (
              <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xs mx-auto text-center pt-8">
                <div className="w-20 h-20 bg-indigo-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-indigo-500/20">
                  <Shield size={32} className="text-indigo-400" />
                </div>
                <h2 className="text-xl font-bold text-zinc-100 mb-8 uppercase tracking-widest">Auth Interface</h2>
                <div className="space-y-4">
                  <input 
                    placeholder="USERNAME" 
                    value={loginForm.user}
                    onChange={e => setLoginForm({...loginForm, user: e.target.value})}
                    className="w-full bg-zinc-900 border border-zinc-800 px-6 py-4 rounded-2xl text-zinc-100 placeholder:text-zinc-700 outline-none focus:border-indigo-500/50 text-center uppercase text-xs"
                  />
                  <input 
                    type="password"
                    placeholder="PASSWORD"
                    value={loginForm.pass}
                    onChange={e => setLoginForm({...loginForm, pass: e.target.value})}
                    className="w-full bg-zinc-900 border border-zinc-800 px-6 py-4 rounded-2xl text-zinc-100 placeholder:text-zinc-700 outline-none focus:border-indigo-500/50 text-center text-xs"
                  />
                  <button onClick={handleLogin} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl transition-all uppercase tracking-widest text-xs mt-4">
                    JVM Initialize
                  </button>
                  <p className="text-[8px] text-zinc-800 mt-6 tracking-widest">HINT: admin / java123</p>
                </div>
              </motion.div>
            )}

            {view === "dashboard" && (
              <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <WindowHeader title="System Dashboard" icon={Layout} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: "add", label: "Object Instantiation", sub: "Add New Product", icon: Plus },
                    { id: "view", label: "Memory Dump", sub: "View Inventory List", icon: List },
                    { id: "search", label: "Key Retrieval", sub: "Search Database", icon: Search },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setView(item.id as any)}
                      className="group p-8 rounded-[2rem] bg-zinc-900/40 border border-zinc-800 hover:border-indigo-500/40 transition-all text-left"
                    >
                      <item.icon className="text-zinc-700 group-hover:text-indigo-400 mb-4 transition-colors" size={24} />
                      <h4 className="text-xs font-black text-zinc-400 group-hover:text-zinc-100 transition-colors uppercase tracking-widest">{item.label}</h4>
                      <p className="text-[9px] text-zinc-700 mt-2 font-black uppercase tracking-widest">{item.sub}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {view === "add" && (
              <motion.div key="add" className="space-y-6">
                <WindowHeader title="Product Data Entry" icon={Plus} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-zinc-600 uppercase ml-2 tracking-widest">Product ID</label>
                    <input placeholder="P-001" value={addForm.id} onChange={e => setAddForm({...addForm, id: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-zinc-100 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-zinc-600 uppercase ml-2 tracking-widest">Category</label>
                    <div className="relative">
                      <select value={addForm.category} onChange={e => setAddForm({...addForm, category: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-zinc-100 outline-none appearance-none">
                        <option>Hardware</option>
                        <option>Software</option>
                        <option>Peripherals</option>
                        <option>Networking</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                        <Settings size={12} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-zinc-600 uppercase ml-2 tracking-widest">Display name</label>
                  <input placeholder="Mechanical Keyboard" value={addForm.name} onChange={e => setAddForm({...addForm, name: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-zinc-100 outline-none" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-zinc-600 uppercase ml-2 tracking-widest">Price ($)</label>
                    <input type="number" placeholder="129.99" value={addForm.price} onChange={e => setAddForm({...addForm, price: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-zinc-100 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-zinc-600 uppercase ml-2 tracking-widest">Stock Level</label>
                    <input type="number" placeholder="50" value={addForm.stock} onChange={e => setAddForm({...addForm, stock: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-zinc-100 outline-none" />
                  </div>
                </div>
                <div className="flex gap-4 pt-6">
                  <button onClick={handleAddProduct} className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-black py-5 rounded-2xl transition-all uppercase tracking-widest text-[10px]">Commit Product</button>
                  <button onClick={() => setView("dashboard")} className="flex-1 bg-zinc-900 border border-zinc-800 py-5 rounded-2xl font-bold hover:bg-zinc-800 transition-all text-zinc-500 text-[10px]">Discard</button>
                </div>
              </motion.div>
            )}

            {view === "view" && (
              <motion.div key="view" className="space-y-6">
                <WindowHeader title="Inventory Ledger" icon={List} />
                <div className="space-y-3">
                  {products.length === 0 ? (
                    <div className="text-center py-24 text-zinc-800 border border-dashed border-zinc-800 rounded-[2.5rem] italic text-xs tracking-widest">HEAP_IS_EMPTY</div>
                  ) : (
                    products.map((p, i) => (
                      <div key={i} className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-3xl flex justify-between items-center group hover:bg-zinc-900/50 transition-all">
                        <div className="flex items-center gap-6">
                          <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 font-black text-[10px]">
                            {p.id}
                          </div>
                          <div>
                            <h4 className="font-black text-zinc-100 uppercase text-xs tracking-tight">{p.name}</h4>
                            <p className="text-[9px] text-zinc-700 mt-1 uppercase tracking-widest font-black">{p.category} // Stock: {p.stock}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-8">
                          <div className="text-right">
                            <div className="text-indigo-400 font-black text-sm tracking-tighter">${p.price.toLocaleString()}</div>
                            <div className="text-[8px] text-zinc-800 uppercase tracking-widest mt-1 font-black underline decoration-indigo-500/20">Unit Cost</div>
                          </div>
                          <button onClick={() => handleDelete(p.id)} className="p-3 text-zinc-800 hover:text-red-500 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <button onClick={() => setView("dashboard")} className="w-full bg-zinc-900 border border-zinc-800 py-5 rounded-3xl font-black hover:bg-zinc-800 transition-all text-zinc-600 mt-8 uppercase tracking-widest text-[10px]">Back to Console</button>
              </motion.div>
            )}

            {view === "search" && (
              <motion.div key="search" className="space-y-6">
                <WindowHeader title="Query Engine" icon={Search} />
                <div className="flex gap-4">
                  <input 
                    placeholder="ENTER PRODUCT NAME OR ID..." 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="flex-1 bg-zinc-900 border border-zinc-800 p-5 rounded-3xl text-zinc-100 outline-none text-center font-black uppercase text-xs tracking-widest"
                  />
                </div>
                <div className="mt-8 space-y-3">
                  {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase())).map((p, i) => (
                    <div key={i} className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-3xl flex justify-between items-center">
                      <div>
                        <h4 className="font-black text-zinc-100 uppercase text-xs">{p.name}</h4>
                        <p className="text-[9px] text-zinc-700 mt-1 uppercase font-black tracking-widest">{p.id} | {p.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-indigo-400 font-bold text-sm">${p.price}</div>
                        <div className="text-[8px] text-zinc-800 uppercase font-black uppercase">Result Identified</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => setView("dashboard")} className="w-full bg-zinc-900 border border-zinc-800 py-5 rounded-3xl font-black hover:bg-zinc-800 transition-all text-zinc-600 mt-8 uppercase tracking-widest text-[10px]">Terminate Query</button>
              </motion.div>
            )}
          </AnimatePresence>

          {feedback && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-12 p-6 rounded-[2rem] bg-zinc-950 border-l-4 border-indigo-500 text-[10px] text-zinc-400 font-black tracking-[0.2em] flex items-center gap-4">
              <Info size={16} className="text-indigo-500" />
              {feedback}
            </motion.div>
          )}
        </div>

        <div className="bg-[#101014] p-4 sm:p-6 text-[7px] sm:text-[8px] text-zinc-900 text-center font-black uppercase tracking-[0.3em] sm:tracking-[0.6em] border-t border-white/5">
          Oracle JDK 17 Reference Implementation // Multi-Threaded I/O
        </div>
      </motion.div>
    </div>
  );
}

const Layout = ({ size, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);
