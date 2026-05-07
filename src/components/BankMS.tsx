import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Landmark, Wallet, History, Shield, TrendingUp } from "lucide-react";

interface Account {
  accountNo: string;
  name: string;
  balance: number;
  type: "Savings" | "Current";
}

interface BankMSProps {
  onClose: () => void;
}

export default function BankMS({ onClose }: BankMSProps) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [view, setView] = useState<"login" | "menu" | "create" | "deposit" | "withdraw" | "balance">("login");
  const [feedback, setFeedback] = useState("");
  
  const [credentials] = useState({ user: "admin", pass: "admin" });
  const [loginForm, setLoginForm] = useState({ user: "", pass: "" });

  const [addForm, setAddForm] = useState({ accountNo: "", name: "", initialDeposit: "", type: "Savings" as any });
  const [transaction, setTransaction] = useState({ accountNo: "", amount: "" });

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleLogin = () => {
    if (loginForm.user === credentials.user && loginForm.pass === credentials.pass) {
      setView("menu");
      setFeedback("");
    } else {
      setFeedback("❌ Authentication Failure: System override required.");
    }
  };

  const handleCreate = () => {
    const deposit = parseFloat(addForm.initialDeposit);
    if (!addForm.accountNo || !addForm.name || isNaN(deposit)) {
      setFeedback("❌ All data fields must be populated.");
      return;
    }
    if (accounts.some(a => a.accountNo === addForm.accountNo)) {
      setFeedback("❌ Conflict: Account Number already registered.");
      return;
    }

    setAccounts([...accounts, {
      accountNo: addForm.accountNo,
      name: addForm.name,
      balance: deposit,
      type: addForm.type
    }]);
    setFeedback("✅ Success: Vault entry created and verified.");
    setTimeout(() => setView("menu"), 1000);
    setAddForm({ accountNo: "", name: "", initialDeposit: "", type: "Savings" });
  };

  const handleTransaction = (isDeposit: boolean) => {
    const amount = parseFloat(transaction.amount);
    const index = accounts.findIndex(a => a.accountNo === transaction.accountNo);

    if (index === -1) {
      setFeedback("❌ Error: Account not found in ledger.");
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      setFeedback("❌ Invalid amount specified.");
      return;
    }

    const newAccounts = [...accounts];
    if (isDeposit) {
      newAccounts[index].balance += amount;
      setFeedback(`✅ Credited: +$${amount.toFixed(2)} to ${transaction.accountNo}`);
    } else {
      if (newAccounts[index].balance < amount) {
        setFeedback("❌ Rejected: Insufficient liquidity.");
        return;
      }
      newAccounts[index].balance -= amount;
      setFeedback(`✅ Debited: -$${amount.toFixed(2)} from ${transaction.accountNo}`);
    }

    setAccounts(newAccounts);
    setTransaction({ accountNo: "", amount: "" });
    setTimeout(() => setView("menu"), 1500);
  };

  const TerminalHeader = ({ title, icon: Icon }: { title: string, icon: any }) => (
    <div className="flex items-center gap-4 mb-8 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl shadow-inner group">
      <div className="p-3 bg-zinc-800 rounded-xl group-hover:scale-110 transition-transform">
        <Icon size={24} className="text-zinc-400 group-hover:text-white transition-colors" />
      </div>
      <div>
        <h3 className="text-lg font-mono font-bold text-zinc-100 tracking-tight">{title}</h3>
        <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Bank_v4.5 :: STL Native Integration</p>
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
        className="absolute inset-0 bg-black/95 backdrop-blur-md"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl bg-[#050505] border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.02)] flex flex-col max-h-[90vh]"
      >
        <div className="bg-[#0a0a0a] px-8 py-5 flex justify-between items-center border-b border-zinc-900">
          <div className="flex items-center gap-3">
            <Landmark size={20} className="text-zinc-500" />
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em] font-black">
              CORE_LEDGER.EXE // STABLE_REBUILD
            </span>
          </div>
          <button onClick={onClose} className="text-zinc-700 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar font-mono">
          <AnimatePresence mode="wait">
            {view === "login" && (
              <motion.div key="login" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="max-w-xs mx-auto text-center pt-8">
                <Shield size={56} className="mx-auto text-zinc-800 mb-8" />
                <h2 className="text-xl font-bold text-zinc-100 mb-2">Vault Authorization</h2>
                <div className="space-y-3 mt-8">
                  <input 
                    placeholder="ADMIN_ID"
                    value={loginForm.user}
                    onChange={e => setLoginForm({...loginForm, user: e.target.value})}
                    className="w-full bg-zinc-900 border border-zinc-800 px-6 py-4 rounded-2xl text-zinc-100 placeholder:text-zinc-700 focus:border-zinc-500 outline-none uppercase text-xs tracking-widest text-center"
                  />
                  <input 
                    type="password" 
                    placeholder="PASS_TOKEN"
                    value={loginForm.pass}
                    onChange={e => setLoginForm({...loginForm, pass: e.target.value})}
                    className="w-full bg-zinc-900 border border-zinc-800 px-6 py-4 rounded-2xl text-zinc-100 placeholder:text-zinc-700 focus:border-zinc-500 outline-none text-center"
                  />
                  <button onClick={handleLogin} className="w-full bg-zinc-100 hover:bg-white text-black font-black py-4 rounded-2xl transition-all uppercase tracking-widest text-xs mt-4">
                    Initialize Protocol
                  </button>
                </div>
              </motion.div>
            )}

            {view === "menu" && (
              <motion.div key="menu" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                <TerminalHeader title="LEDGER OPERATIONS" icon={Wallet} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: "create", label: "01. Open New Vault", sub: "Register Identity" },
                    { id: "deposit", label: "02. Credit Entry", sub: "Add Liquidity" },
                    { id: "withdraw", label: "03. Debit Entry", sub: "External Transfer" },
                    { id: "balance", label: "04. Balance Check", sub: "View Statements" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setView(item.id as any)}
                      className="group p-6 rounded-3xl bg-zinc-900/40 border border-zinc-900 hover:border-zinc-700 transition-all text-left"
                    >
                      <h4 className="text-xs font-bold text-zinc-400 group-hover:text-zinc-100 transition-colors uppercase tracking-[0.2em]">{item.label}</h4>
                      <p className="text-[9px] text-zinc-700 mt-2 font-black uppercase tracking-widest">{item.sub}</p>
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setView("login")}
                  className="w-full mt-8 p-4 text-[10px] text-zinc-600 hover:text-zinc-400 uppercase tracking-[0.4em] font-black border border-dashed border-zinc-900 rounded-2xl transition-colors"
                >
                  Terminate Active Session
                </button>
              </motion.div>
            )}

            {view === "create" && (
              <motion.div key="create" className="space-y-6">
                <TerminalHeader title="NEW IDENTIFIER" icon={Landmark} />
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="ACCOUNT_REF" value={addForm.accountNo} onChange={e => setAddForm({...addForm, accountNo: e.target.value})} className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-zinc-100 focus:border-zinc-500 outline-none text-center" />
                    <select value={addForm.type} onChange={e => setAddForm({...addForm, type: e.target.value as any})} className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-zinc-100 focus:border-zinc-500 outline-none text-center appearance-none">
                      <option value="Savings">Savings</option>
                      <option value="Current">Current</option>
                    </select>
                  </div>
                  <input placeholder="HOLDER_NAME" value={addForm.name} onChange={e => setAddForm({...addForm, name: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-zinc-100 focus:border-zinc-500 outline-none uppercase" />
                  <input placeholder="INITIAL_DEPOSIT ($)" type="number" value={addForm.initialDeposit} onChange={e => setAddForm({...addForm, initialDeposit: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-zinc-100 focus:border-zinc-500 outline-none" />
                </div>
                <div className="flex gap-4 pt-4">
                  <button onClick={handleCreate} className="flex-1 bg-zinc-100 hover:bg-white text-black font-bold py-4 rounded-2xl transition-all">COMMIT ENTRY</button>
                  <button onClick={() => setView("menu")} className="flex-1 bg-zinc-900 border border-zinc-800 py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all text-zinc-400">CANCEL</button>
                </div>
              </motion.div>
            )}

            {view === "deposit" || view === "withdraw" ? (
              <motion.div key="transaction" className="space-y-6">
                <TerminalHeader title={view === "deposit" ? "CREDIT PROTOCOL" : "DEBIT PROTOCOL"} icon={TrendingUp} />
                <div className="space-y-4">
                  <input placeholder="TARGET_ACCOUNT_REF" value={transaction.accountNo} onChange={e => setTransaction({...transaction, accountNo: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-zinc-100 focus:border-zinc-500 outline-none text-center" />
                  <input placeholder="TRANSFER_AMOUNT ($)" type="number" value={transaction.amount} onChange={e => setTransaction({...transaction, amount: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-zinc-100 focus:border-zinc-500 outline-none text-center" />
                </div>
                <div className="flex gap-4 pt-4">
                  <button onClick={() => handleTransaction(view === "deposit")} className="flex-1 bg-zinc-100 hover:bg-white text-black font-bold py-4 rounded-2xl transition-all uppercase tracking-widest text-xs">
                    Authorize {view === "deposit" ? "Credit" : "Debit"}
                  </button>
                  <button onClick={() => setView("menu")} className="flex-1 bg-zinc-900 border border-zinc-800 py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all text-zinc-400">CANCEL</button>
                </div>
              </motion.div>
            ) : null}

            {view === "balance" && (
              <motion.div key="balance" className="space-y-6">
                <TerminalHeader title="VAULT STATEMENTS" icon={History} />
                <div className="space-y-3">
                  {accounts.length === 0 ? (
                    <div className="text-center py-20 text-zinc-700 border border-dashed border-zinc-900 rounded-3xl italic text-xs">No ledger records initialized.</div>
                  ) : (
                    accounts.map((a, i) => (
                      <div key={i} className="p-6 bg-zinc-900/20 border border-zinc-800 rounded-2xl flex justify-between items-center group hover:bg-zinc-900/40 transition-colors">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-[9px] bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded font-black tracking-widest">{a.accountNo}</span>
                            <h4 className="font-bold text-zinc-100 uppercase text-sm tracking-tight">{a.name}</h4>
                          </div>
                          <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest">{a.type}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-zinc-100 font-bold font-mono tracking-tighter">${a.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                          <div className="text-[8px] text-zinc-700 uppercase tracking-widest mt-1">Net Balance</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <button onClick={() => setView("menu")} className="w-full bg-zinc-900 border border-zinc-800 py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all text-zinc-400 mt-6">RETURN TO CONSOLE</button>
              </motion.div>
            )}
          </AnimatePresence>

          {feedback && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-5 rounded-2xl bg-zinc-900 border-l-4 border-zinc-100 text-[10px] text-zinc-300 font-black tracking-[0.2em] leading-relaxed">
              {feedback}
            </motion.div>
          )}
        </div>

        <div className="bg-[#0a0a0a] p-5 text-[8px] text-zinc-800 text-center font-black uppercase tracking-[0.5em] border-t border-zinc-900">
          SYSTEM_VERSION: BANK_STL_CORE_5.0 // ENCRYPTION_ACTIVE
        </div>
      </motion.div>
    </div>
  );
}
