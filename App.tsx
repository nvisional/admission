
import React, { useState, useEffect } from 'react';
import { 
  Ticket, 
  Sparkles,
  Building2,
  Briefcase,
  CheckCircle2,
  Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [viewState, setViewState] = useState<'ticket' | 'letter'>('ticket');
  const [isFlashing, setIsFlashing] = useState(false);
  const [candidateName, setCandidateName] = useState<string>("");

  useEffect(() => {
    // Get candidate name from URL parameters (e.g., ?name=张三)
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    if (name) {
      setCandidateName(decodeURIComponent(name));
    }
  }, []);

  const handleOpenTicket = () => {
    // 1. Trigger Flash
    setIsFlashing(true);
    
    // 2. Swap Content while screen is white/gold (300ms delay)
    setTimeout(() => {
      setViewState('letter');
    }, 400);

    // 3. Remove Flash (1000ms total)
    setTimeout(() => {
      setIsFlashing(false);
    }, 1000);
  };

  return (
    <main className="bg-slate-950 min-h-screen text-slate-200 selection:bg-amber-500/30 font-sans flex flex-col items-center justify-center relative overflow-hidden p-6">
      
      {/* --- The Flash Effect Overlay --- */}
      <AnimatePresence>
        {isFlashing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
             <div className="absolute inset-0 bg-white mix-blend-overlay"></div>
             <div className="absolute inset-0 bg-gradient-to-tr from-amber-200 via-yellow-100 to-white opacity-90"></div>
             <div className="absolute inset-0 bg-white blur-3xl opacity-80"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* --- Header Text (Changes based on state) --- */}
        <div className="text-center mb-10 h-20 z-20">
          <AnimatePresence mode="wait">
            {viewState === 'ticket' ? (
              <motion.div 
                key="header-ticket"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h2 className="text-xs font-bold text-amber-500 uppercase tracking-[0.3em] mb-2">The Outcome</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">数字化录用通知</h3>
              </motion.div>
            ) : (
              <motion.div 
                key="header-letter"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-[0.3em] mb-2">Access Granted</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">下一阶段：Final Assessment</h3>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- Main Content Area --- */}
        <div className="relative w-full flex justify-center items-center min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {/* VIEW 1: THE TICKET */}
            {viewState === 'ticket' && (
              <motion.div
                key="ticket"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.1, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="group cursor-pointer perspective-1000 w-full flex justify-center px-4"
                onClick={handleOpenTicket}
                whileHover={{ scale: 1.02, rotateX: 2 }}
              >
                 {/* Clean Shadow/Glow - No Noise */}
                 <div className="absolute inset-4 bg-amber-500/20 rounded-[2rem] blur-2xl group-hover:bg-amber-500/30 transition duration-500"></div>

                 {/* Ticket Container - INCREASED SIZE */}
                 <div className="relative w-full max-w-[90vw] md:w-[750px] lg:w-[850px] h-[220px] md:h-[300px] bg-gradient-to-br from-slate-900 to-black rounded-2xl border border-amber-500/50 flex shadow-2xl overflow-hidden z-10">
                    
                    {/* Stub (Left Side) */}
                    <div className="w-16 md:w-32 border-r-2 border-dashed border-amber-500/30 flex flex-col items-center justify-center bg-slate-950/50 relative shrink-0">
                        <span className="-rotate-90 text-amber-500/60 font-mono text-[10px] md:text-sm tracking-[0.3em] whitespace-nowrap absolute">ADMIT ONE</span>
                    </div>
                    
                    {/* Body (Right Side) */}
                    <div className="flex-1 p-6 md:p-10 flex flex-col justify-between relative">
                       <div className="absolute top-0 right-0 p-6 opacity-30">
                          <Ticket className="text-amber-500" size={48} />
                       </div>
                       
                       <div>
                          <div className="text-[10px] md:text-xs text-amber-300 uppercase tracking-widest font-semibold">Youth Innovation Leadership Project</div>
                          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-500 mt-3 md:mt-4 tracking-tight drop-shadow-sm">
                             Golden Ticket
                          </h2>
                          <div className="mt-4 flex items-center gap-3">
                             {/* CHANGED: Generic VIP ACCESS instead of specific number */}
                             <span className="px-3 py-1 rounded border border-amber-500/40 text-[10px] md:text-xs text-amber-300 bg-amber-900/20 font-mono">
                                VIP ACCESS
                             </span>
                             <span className="text-[10px] md:text-xs text-amber-500/70 uppercase tracking-wider animate-pulse">
                                Tap to Reveal
                             </span>
                          </div>
                       </div>

                       <div className="flex justify-between items-end border-t border-amber-500/20 pt-4 mt-2">
                          <div className="flex flex-col">
                             <span className="text-[9px] md:text-[10px] text-slate-500 uppercase tracking-wider">Date</span>
                             <span className="text-xs md:text-sm text-amber-100 font-mono">DEC 2025</span>
                          </div>
                          <div className="flex flex-col text-right">
                             <span className="text-[9px] md:text-[10px] text-slate-500 uppercase tracking-wider">Valid For</span>
                             <span className="text-xs md:text-sm text-amber-100 font-mono flex items-center gap-1.5 justify-end">
                                FINAL STAGE <Sparkles size={12} />
                             </span>
                          </div>
                       </div>
                    </div>
                 </div>
              </motion.div>
            )}

            {/* VIEW 2: THE LETTER (PwC) */}
            {viewState === 'letter' && (
              <motion.div
                key="letter"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="w-full max-w-lg bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-amber-500/30 p-1 shadow-2xl relative z-10"
              >
                 {/* Decorative top strip */}
                 <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 rounded-t-2xl"></div>

                 <div className="p-8 md:p-10 space-y-8">
                    
                    {/* Congratulatory Header */}
                    <div className="text-center space-y-3 border-b border-white/5 pb-8">
                       <div className="mx-auto w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
                          <Trophy size={24} className="text-emerald-400" />
                       </div>
                       <h2 className="text-2xl font-bold text-white">
                         {candidateName ? `恭喜 ${candidateName} 通过本轮面试` : "恭喜通过本轮面试"}
                       </h2>
                       <p className="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
                          基于简历画像与面试表现，你的创新潜质与实干精神给我们留下了深刻印象。
                       </p>
                    </div>

                    {/* The Agenda Card */}
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-amber-500/20 p-6 relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition">
                          <Building2 size={100} className="text-amber-500" />
                       </div>

                       <div className="relative z-10">
                          <h4 className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                             Final Interview
                          </h4>
                          
                          <div className="flex items-start gap-5">
                             <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 mt-1">
                                <Briefcase size={22} className="text-amber-400" />
                             </div>
                             <div className="space-y-2">
                                <h3 className="text-xl font-bold text-slate-100">普华永道 (PwC) 面试</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                   你将直接参与由 PwC 组织的终极考核。请保持你优异的表现，我们期待在顶峰相见。
                                </p>
                             </div>
                          </div>
                       </div>
                    </div>

                    {/* Footer / Signed */}
                    <div className="flex justify-between items-center pt-2 text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                       <span className="flex items-center gap-1.5">
                          <CheckCircle2 size={12} className="text-emerald-500" />
                          Verified Candidate
                       </span>
                       <span>DEC 2025</span>
                    </div>

                 </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
