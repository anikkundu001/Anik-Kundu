import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Search, 
  ShoppingBag, 
  Settings, 
  Package, 
  Truck, 
  ShieldCheck, 
  Car, 
  ChevronRight,
  User,
  LogOut,
  Plus,
  Trash2,
  DollarSign
} from 'lucide-react';

interface CarItem {
  id: number;
  brand: string;
  model: string;
  color: string;
  year: number;
  type: string;
  price: number;
  available: boolean;
  image: string;
}

const INITIAL_CARS: CarItem[] = [
  {
    id: 1,
    brand: 'Ferrari',
    model: 'X',
    color: 'Red',
    year: 2024,
    type: 'Sports',
    price: 10000,
    available: true,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 2,
    brand: 'Tesla',
    model: 'Y',
    color: 'Black',
    year: 2025,
    type: 'Electric',
    price: 9500,
    available: true,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 3,
    brand: 'BMW',
    model: 'Z',
    color: 'White',
    year: 2023,
    type: 'Luxury',
    price: 8000,
    available: true,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1200&auto=format&fit=crop'
  }
];

export default function CarStore({ onClose }: { onClose: () => void }) {
  const [cars, setCars] = useState<CarItem[]>(() => {
    const saved = localStorage.getItem('carStore_cars');
    return saved ? JSON.parse(saved) : INITIAL_CARS;
  });
  const [orders, setOrders] = useState<CarItem[]>(() => {
    const saved = localStorage.getItem('carStore_orders');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState<'home' | 'cars' | 'features' | 'contact' | 'admin'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [addForm, setAddForm] = useState({
    brand: '',
    model: '',
    color: '',
    year: '',
    type: '',
    price: ''
  });

  useEffect(() => {
    localStorage.setItem('carStore_cars', JSON.stringify(cars));
    localStorage.setItem('carStore_orders', JSON.stringify(orders));
  }, [cars, orders]);

  const handleBuy = (car: CarItem) => {
    if (!car.available) return;
    setOrders([...orders, car]);
    setCars(cars.map(c => c.id === car.id ? { ...c, available: false } : c));
    alert(`${car.brand} ${car.model} added to your order list!`);
  };

  const handleRemoveOrder = (index: number) => {
    const carToRemove = orders[index];
    setOrders(orders.filter((_, i) => i !== index));
    setCars(cars.map(c => c.id === carToRemove.id ? { ...c, available: true } : c));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === 'admin') {
      setIsLoggedIn(true);
      setShowLogin(false);
      setActiveTab('admin');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleAddCar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.brand || !addForm.model || !addForm.price) return;
    
    const newCar: CarItem = {
      id: Date.now(),
      brand: addForm.brand,
      model: addForm.model,
      color: addForm.color || 'Dynamic',
      year: parseInt(addForm.year) || new Date().getFullYear(),
      type: addForm.type || 'Custom',
      price: parseFloat(addForm.price),
      available: true,
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop'
    };
    
    setCars([...cars, newCar]);
    setAddForm({ brand: '', model: '', color: '', year: '', type: '', price: '' });
    alert('Car added successfully!');
  };

  const totalPayment = orders.reduce((sum, car) => sum + car.price, 0);

  const filteredCars = cars.filter(car => 
    car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#0f172a] text-white flex flex-col overflow-hidden"
    >
      {/* Navbar */}
      <nav className="w-full px-4 sm:px-8 py-4 sm:py-6 flex justify-between items-center fixed top-0 left-0 z-[110] bg-[#0f172a]/85 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <Car className="text-blue-400 w-6 h-6 sm:w-8 sm:h-8" />
          <span className="text-lg sm:text-2xl font-bold tracking-tight">ThumbsUp</span>
        </div>

        <div className="hidden md:flex gap-8">
          {['home', 'cars', 'features', 'contact'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`text-sm font-medium capitalize transition-colors ${activeTab === tab ? 'text-blue-400' : 'text-zinc-400 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
          {isLoggedIn && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`text-sm font-medium transition-colors ${activeTab === 'admin' ? 'text-blue-400' : 'text-zinc-400 hover:text-white'}`}
            >
              Admin
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <button 
              onClick={() => setShowLogin(true)}
              className="px-4 sm:px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-sm font-bold shadow-lg hover:scale-105 transition-all"
            >
              Login
            </button>
          ) : (
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="p-2 rounded-full bg-white/5 text-zinc-400 hover:text-white"
            >
              <LogOut size={18} />
            </button>
          )}
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 text-zinc-400 hover:text-red-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto pt-24 sm:pt-32 no-scrollbar scroll-smooth">
        {/* Hero Section */}
        {activeTab === 'home' && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 sm:px-[8%] py-12 sm:py-20 flex flex-col lg:flex-row items-center justify-between min-h-[70vh] gap-12"
          >
            <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-center lg:text-left">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-tight">
                Find Your <span className="text-blue-400">Dream Car</span> Today
              </h1>
              <p className="text-zinc-400 text-sm sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                Premium luxury cars with modern design, best performance, advanced technology, and unbeatable prices. Experience the future of car shopping.
              </p>
              <button 
                onClick={() => setActiveTab('cars')}
                className="px-8 py-4 rounded-full bg-blue-600 text-white font-bold text-lg shadow-2xl hover:bg-blue-500 transition-all hover:scale-105"
              >
                Browse Cars
              </button>
            </div>
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full group-hover:bg-blue-500/30 transition-all" />
              <img 
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop" 
                alt="Hero Car" 
                className="w-full relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-float"
              />
            </div>
          </motion.section>
        )}

        {/* Cars Section */}
        {(activeTab === 'home' || activeTab === 'cars') && (
          <section id="cars" className="px-4 sm:px-[8%] py-20 bg-slate-900/50">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-5xl font-black mb-4">Popular Cars</h2>
              <p className="text-zinc-400">Explore our premium collection</p>
              
              <div className="mt-8 max-w-2xl mx-auto flex gap-3 px-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search by brand or model..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl text-white outline-none focus:border-blue-500/50 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredCars.map(car => (
                <motion.div 
                  key={car.id}
                  layout
                  className={`group bg-white/5 border border-white/5 rounded-3xl overflow-hidden transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] ${!car.available ? 'opacity-60 grayscale' : ''}`}
                >
                  <div className="h-48 sm:h-56 overflow-hidden">
                    <img src={car.image} alt={car.brand} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl font-bold">{car.brand} {car.model}</h3>
                      <span className="text-[10px] px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full font-black uppercase tracking-widest">{car.available ? 'Available' : 'Sold Out'}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400 text-xs">
                      <span>{car.year}</span>
                      <span>{car.color}</span>
                      <span>{car.type}</span>
                    </div>
                    <div className="text-3xl font-black text-blue-400">
                      ${car.price.toLocaleString()}
                    </div>
                    <button 
                      onClick={() => handleBuy(car)}
                      disabled={!car.available}
                      className={`w-full py-4 rounded-xl font-bold transition-all ${car.available ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg' : 'bg-white/10 text-zinc-500 cursor-not-allowed'}`}
                    >
                      {car.available ? 'Buy Now' : 'Sold Out'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Features Section */}
        {(activeTab === 'home' || activeTab === 'features') && (
          <section className="px-4 sm:px-[8%] py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-5xl font-black mb-4">Why Choose Us</h2>
              <p className="text-zinc-400">Premium service with trusted support</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { icon: Truck, title: 'Fast Delivery', desc: 'Get your dream car delivered quickly with our premium delivery service.' },
                { icon: ShieldCheck, title: 'Secure Payment', desc: 'Safe and secure payment system with full customer protection.' },
                { icon: ShoppingBag, title: 'Luxury Cars', desc: 'Explore high-quality luxury vehicles from top international brands.' }
              ].map((f, i) => (
                <div key={i} className="bg-white/5 border border-white/5 p-8 rounded-[2rem] hover:bg-blue-600 group transition-all duration-500 transform hover:-translate-y-2">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-all">
                    <f.icon className="text-blue-400 group-hover:text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-blue-100">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Orders Section (Inline for Home/Cars view) */}
        {(orders.length > 0) && (
          <section className="px-4 sm:px-[8%] py-20 bg-black/30 border-y border-white/5">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-5xl font-black mb-4">Your Orders</h2>
              <p className="text-zinc-400">Recently purchased vehicles</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map((car, idx) => (
                <motion.div 
                  key={`order-${idx}`}
                  layout
                  className="bg-white/5 border border-white/10 p-6 rounded-3xl flex gap-6 items-center"
                >
                  <img src={car.image} className="w-24 h-24 object-cover rounded-xl" alt={car.brand} />
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">{car.brand} {car.model}</h4>
                    <p className="text-blue-400 font-bold">${car.price.toLocaleString()}</p>
                    <button 
                      onClick={() => handleRemoveOrder(idx)}
                      className="mt-2 text-[10px] uppercase font-black text-red-400/60 hover:text-red-400 transition-colors flex items-center gap-2"
                    >
                      <Trash2 size={12} /> Cancel Order
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-12 text-center bg-white/5 border border-white/10 p-10 rounded-[3rem] max-w-2xl mx-auto">
              <h3 className="text-xl text-zinc-400 mb-2">Total Payment</h3>
              <div className="text-5xl font-black text-blue-400 mb-8">${totalPayment.toLocaleString()}</div>
              <button className="px-12 py-5 bg-blue-600 rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl">
                Complete Checkout
              </button>
            </div>
          </section>
        )}

        {/* Contact Section */}
        {(activeTab === 'home' || activeTab === 'contact') && (
          <section id="contact" className="px-4 sm:px-[8%] py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6 text-center lg:text-left">
                <h2 className="text-4xl sm:text-6xl font-black leading-tight">Let's Talk About <span className="text-blue-400">Cars</span> 🚗</h2>
                <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">Whether you want to buy a luxury car, become a dealer, or learn more about our services, our team is always ready to help you.</p>
              </div>
              <div className="bg-white/5 border border-white/5 p-8 sm:p-12 rounded-[3rem] space-y-4">
                <input placeholder="Your Name" className="w-full bg-slate-900 border border-white/10 p-5 rounded-2xl outline-none focus:border-blue-500/50" />
                <input placeholder="Your Email" className="w-full bg-slate-900 border border-white/10 p-5 rounded-2xl outline-none focus:border-blue-500/50" />
                <textarea placeholder="Your Message" className="w-full h-32 bg-slate-900 border border-white/10 p-5 rounded-2xl outline-none focus:border-blue-500/50 resize-none" />
                <button className="w-full bg-blue-600 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all">Send Message</button>
              </div>
            </div>
          </section>
        )}

        {/* Admin Section */}
        {activeTab === 'admin' && isLoggedIn && (
          <section className="px-4 sm:px-[8%] py-20 space-y-12">
            <div className="text-center">
              <h2 className="text-3xl sm:text-5xl font-black mb-4">Admin Dashboard</h2>
              <p className="text-zinc-400">Manage your inventory and dealerships</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white/5 border border-white/5 p-8 rounded-[2rem] space-y-6">
                  <h3 className="text-xs font-black text-blue-400 uppercase tracking-widest flex items-center gap-3">
                    <Plus size={16} /> Add New Listing
                  </h3>
                  <form onSubmit={handleAddCar} className="space-y-4">
                    <input placeholder="Brand" value={addForm.brand} onChange={e => setAddForm({...addForm, brand: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-blue-500/50 text-sm" />
                    <input placeholder="Model" value={addForm.model} onChange={e => setAddForm({...addForm, model: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-blue-500/50 text-sm" />
                    <div className="grid grid-cols-2 gap-4">
                      <input placeholder="Year" type="number" value={addForm.year} onChange={e => setAddForm({...addForm, year: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-blue-500/50 text-sm" />
                      <input placeholder="Price" type="number" value={addForm.price} onChange={e => setAddForm({...addForm, price: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-blue-500/50 text-sm" />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white font-black py-4 rounded-xl uppercase text-[10px] tracking-widest shadow-lg">Push to Storage</button>
                  </form>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white/5 border border-white/5 rounded-[2rem] overflow-hidden">
                  <div className="bg-blue-500/10 p-6 flex justify-between items-center">
                    <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Inventory List</h3>
                    <span className="text-[10px] font-mono text-zinc-500">Heap Size: {cars.length}</span>
                  </div>
                  <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left min-w-[600px]">
                      <thead>
                        <tr className="bg-white/5 border-b border-white/5">
                          <th className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase">ID</th>
                          <th className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase">Car Entity</th>
                          <th className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase">Price</th>
                          <th className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase">Status</th>
                          <th className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {cars.map(car => (
                          <tr key={car.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-8 py-5 text-xs font-mono text-blue-400/50">#{car.id.toString().slice(-4)}</td>
                            <td className="px-8 py-5 text-sm font-bold">{car.brand} {car.model}</td>
                            <td className="px-8 py-5 text-sm font-black text-blue-400">${car.price.toLocaleString()}</td>
                            <td className="px-8 py-5">
                              <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${car.available ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                {car.available ? 'Ready' : 'Sold'}
                              </span>
                            </td>
                            <td className="px-8 py-5">
                              <button 
                                onClick={() => setCars(cars.filter(c => c.id !== car.id))}
                                className="p-2 hover:bg-red-500/20 rounded-lg text-zinc-500 hover:text-red-400 transition-all"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <footer className="bg-black/30 p-8 text-center text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] border-t border-white/5">
          © 2026 Thumbs Up Car Store | Designed By Anik
        </footer>
      </div>

      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#1e293b] w-full max-w-md p-8 sm:p-12 rounded-[3rem] border border-white/10 relative shadow-[0_0_100px_rgba(37,99,235,0.2)]"
            >
              <button 
                onClick={() => setShowLogin(false)}
                className="absolute top-6 right-6 text-zinc-500 hover:text-white"
              >
                <X size={24} />
              </button>
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20">
                  <User size={32} className="text-blue-400" />
                </div>
                <h2 className="text-3xl font-black mb-2">Login</h2>
                <p className="text-zinc-500 text-xs uppercase tracking-widest">Admin Access Portal</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-4 text-center">
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={loginForm.username}
                  onChange={e => setLoginForm({...loginForm, username: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl outline-none focus:border-blue-500/50" 
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={loginForm.password}
                  onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl outline-none focus:border-blue-500/50" 
                />
                <button type="submit" className="w-full bg-blue-600 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] mt-4 hover:bg-blue-500 transition-all shadow-xl">
                  Identify Context
                </button>
                <p className="mt-8 text-[10px] text-zinc-600 uppercase tracking-widest">Default: admin / admin</p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(37,99,235,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(37,99,235,0.4); }
      `}</style>
    </motion.div>
  );
}
