import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Grid3X3, BarChart3, Info, Hash, RefreshCcw } from "lucide-react";
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

interface AdjacencyMatrixExplorerProps {
  onClose: () => void;
}

export default function AdjacencyMatrixExplorer({ onClose }: AdjacencyMatrixExplorerProps) {
  const [vertexCount, setVertexCount] = useState(6);
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [view, setView] = useState<"grid" | "plain">("grid");
  const [timeMs, setTimeMs] = useState(0);

  const generateMatrix = (n: number) => {
    const start = performance.now();
    const newMatrix = Array(n).fill(null).map(() => 
      Array(n).fill(null).map(() => Math.floor(Math.random() * 2))
    );
    const end = performance.now();
    setMatrix(newMatrix);
    setTimeMs(end - start);
  };

  useEffect(() => {
    generateMatrix(vertexCount);
  }, []);

  const { indegrees, outdegrees, totalIn, totalOut } = useMemo(() => {
    const n = matrix.length;
    const inArr = Array(n).fill(0);
    const outArr = Array(n).fill(0);
    let tIn = 0;
    let tOut = 0;

    matrix.forEach((row, i) => {
      row.forEach((val, j) => {
        if (val === 1) {
          outArr[i]++;
          inArr[j]++;
          tIn++;
          tOut++;
        }
      });
    });

    return { indegrees: inArr, outdegrees: outArr, totalIn: tIn, totalOut: tOut };
  }, [matrix]);

  const chartData = {
    labels: Array.from({ length: matrix.length }, (_, i) => `V${i}`),
    datasets: [
      {
        label: 'Indegree',
        data: indegrees,
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
        borderRadius: 6,
      },
      {
        label: 'Outdegree',
        data: outdegrees,
        backgroundColor: 'rgba(249, 115, 22, 0.6)',
        borderColor: 'rgb(249, 115, 22)',
        borderWidth: 1,
        borderRadius: 6,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: '#94a3b8', font: { family: 'monospace' } }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#64748b', stepSize: 1 }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#64748b' }
      }
    }
  };

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
        className="relative w-full max-w-5xl bg-[#0a0a0c] border border-blue-500/20 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Terminal Header */}
        <div className="bg-[#111114] px-8 py-5 flex justify-between items-center border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
            </div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">
              GraphAnalyzer.c // Adjacency_Matrix_v1.0
            </span>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 lg:p-12 custom-scrollbar font-sans">
          {/* Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
            <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-[2rem] p-6 flex flex-wrap items-center gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Vertices (n)</label>
                <input 
                  type="number" 
                  min="1" 
                  max="20" 
                  value={vertexCount}
                  onChange={(e) => setVertexCount(Math.min(20, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white font-mono w-24 outline-none focus:border-blue-500/50"
                />
              </div>
              <button 
                onClick={() => generateMatrix(vertexCount)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-2xl transition-all flex items-center gap-2 shadow-[0_10px_20_rgba(37,99,235,0.2)]"
              >
                <RefreshCcw size={18} />
                Generate Random Graph
              </button>
            </div>
            
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-[2rem] p-6 flex flex-col justify-center items-center text-center">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Compute Time</span>
              <div className="text-xl font-mono font-bold text-white uppercase">{timeMs.toFixed(3)}ms</div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              { label: "Sum In-Degree", value: totalIn, color: "text-blue-400" },
              { label: "Sum Out-Degree", value: totalOut, color: "text-orange-400" },
              { label: "Equal?", value: totalIn === totalOut ? "YES" : "NO", color: totalIn === totalOut ? "text-green-400" : "text-red-400" },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">{stat.label}</span>
                <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            {/* Chart */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <BarChart3 size={18} className="text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Degree Distribution</h3>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 h-[350px]">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>

            {/* Matrix */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Grid3X3 size={18} className="text-purple-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Adjacency Matrix</h3>
                </div>
                <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
                  <button 
                    onClick={() => setView("grid")}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black tracking-widest transition-all ${view === "grid" ? "bg-white/10 text-white" : "text-zinc-500 hover:text-white"}`}
                  >
                    GRID
                  </button>
                  <button 
                    onClick={() => setView("plain")}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black tracking-widest transition-all ${view === "plain" ? "bg-white/10 text-white" : "text-zinc-500 hover:text-white"}`}
                  >
                    PLAIN
                  </button>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 min-h-[350px] flex items-center justify-center overflow-auto">
                <AnimatePresence mode="wait">
                  {view === "grid" ? (
                    <motion.div 
                      key="grid"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="grid gap-2"
                      style={{ gridTemplateColumns: `repeat(${matrix.length}, minmax(0, 1fr))` }}
                    >
                      {matrix.flat().map((val, i) => (
                        <div 
                          key={i}
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                            val === 1 
                              ? "bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)] text-white" 
                              : "bg-white/5 border border-white/10 text-zinc-600"
                          }`}
                        >
                          {val}
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.pre 
                      key="plain"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-mono text-xs text-blue-400 bg-black/40 p-6 rounded-2xl border border-white/5 w-full leading-relaxed"
                    >
                      {matrix.map(row => row.join(" ")).join("\n")}
                    </motion.pre>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-zinc-900/50 rounded-3xl border border-white/5 flex items-start gap-4">
            <Info className="text-zinc-500 shrink-0 mt-0.5" size={16} />
            <p className="text-sm text-zinc-500 leading-relaxed italic">
              Implementation exactly follows C-style adjacency matrix generation where <code className="text-blue-400 font-mono">rand() % 2</code> is simulated. 
              The sum of in-degrees must equal the sum of out-degrees (equal to the total number of edges).
            </p>
          </div>
        </div>

        <div className="bg-[#111114] p-5 text-[8px] text-zinc-700 text-center font-black uppercase tracking-[0.5em] border-t border-white/5">
          Computational Theory :: Discrete Mathematics Analyzer
        </div>
      </motion.div>
    </div>
  );
}
