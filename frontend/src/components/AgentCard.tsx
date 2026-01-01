import { motion } from 'framer-motion';
import { Bot, AlertCircle, Loader2, Database, BarChart3, ShieldCheck, Monitor, Download } from 'lucide-react';
import type { AgentState } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const iconMap: Record<string, any> = {
    ORCHESTRATOR: Bot,
    INSTALLER: Download,
    CONNECTOR: Database,
    REPORTER: BarChart3,
    TESTER: ShieldCheck,
    MONITOR: Monitor,
};

export const AgentCard = ({ agent }: { agent: AgentState }) => {
    const Icon = iconMap[agent.type] || Bot;

    return (
        <motion.div
            layout
            whileHover={{ y: -5, scale: 1.02 }}
            className={cn(
                "glass relative flex flex-col gap-5 p-6 rounded-3xl border-white/[0.04] transition-all duration-500 overflow-hidden group",
                agent.status === 'BUSY' && "border-blue-500/30 bg-blue-500/[0.03] shadow-[0_10px_30px_rgba(37,99,235,0.1)]",
                agent.status === 'ERROR' && "border-red-500/30 bg-red-500/[0.03]"
            )}
        >
            {/* Decorative gradient blur */}
            <div className={cn(
                "absolute -top-10 -right-10 w-24 h-24 rounded-full blur-[40px] opacity-10 transition-colors duration-1000",
                agent.status === 'BUSY' ? "bg-blue-500" : agent.status === 'IDLE' ? "bg-emerald-500" : "bg-red-500"
            )} />

            <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                    <div className={cn(
                        "p-3 rounded-2xl bg-slate-900/80 border border-white/[0.05] shadow-inner",
                        agent.status === 'BUSY' && "text-blue-400 border-blue-500/20",
                        agent.status === 'IDLE' && "text-slate-400"
                    )}>
                        <Icon size={24} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-xs text-white uppercase tracking-tighter">{agent.id}</span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{agent.type}</span>
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    {agent.status === 'BUSY' ? (
                        <Loader2 size={18} className="animate-spin text-blue-400" />
                    ) : agent.status === 'IDLE' ? (
                        <div className="w-2 h-2 rounded-full bg-emerald-500/40 border border-emerald-500/60" />
                    ) : (
                        <AlertCircle size={18} className="text-red-400" />
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-2 relative z-10">
                <div className="flex items-center gap-2">
                    <span className={cn(
                        "text-[10px] font-black uppercase tracking-[0.1em] px-2 py-0.5 rounded-md",
                        agent.status === 'BUSY' ? "bg-blue-500/10 text-blue-400" : "bg-white/5 text-slate-500"
                    )}>
                        {agent.status}
                    </span>
                </div>
                <p className="text-sm text-slate-400 font-medium line-clamp-2 h-10 leading-snug">
                    {agent.currentTask || "Idle and listening to mesh events..."}
                </p>
            </div>

            {agent.status === 'BUSY' && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-900 overflow-hidden">
                    <motion.div
                        initial={{ left: '-100%' }}
                        animate={{ left: '100%' }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                    />
                </div>
            )}
        </motion.div>
    );
};
