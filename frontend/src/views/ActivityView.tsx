import { motion } from 'framer-motion';
import { Terminal, Clock, Shield, Search } from 'lucide-react';
import type { Message } from '../types';

interface ActivityViewProps {
    messages: Message[];
}

export const ActivityView = ({ messages }: ActivityViewProps) => {
    return (
        <div className="flex-[1.4] flex flex-col gap-6 overflow-y-auto pr-4 scrollbar-hide">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h2 className="text-xl font-black text-white tracking-tight">Activity Stream</h2>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Real-time Agent Mesh Logs</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg text-[10px] font-bold text-blue-400">
                        LIVE DATA
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {messages.length === 0 ? (
                    <div className="glass p-12 rounded-[2rem] flex flex-col items-center justify-center text-center opacity-40">
                        <Terminal size={48} className="mb-4 text-slate-600" />
                        <p className="text-sm font-bold text-slate-500">No mesh activity detected yet.</p>
                    </div>
                ) : (
                    messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="glass p-5 rounded-2xl border-white/[0.03] flex gap-4 hover:bg-white/[0.02] transition-colors group"
                        >
                            <div className={`p-3 rounded-xl h-fit ${msg.sender === 'USER' ? 'bg-slate-800' : 'bg-blue-600/20 text-blue-400'
                                }`}>
                                {msg.sender === 'USER' ? <Clock size={20} /> : <Terminal size={20} />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${msg.sender === 'USER' ? 'text-slate-500' : 'text-blue-500'
                                        }`}>
                                        {msg.sender}
                                    </span>
                                    <span className="text-[10px] text-slate-600 font-mono">
                                        {new Date(msg.timestamp).toLocaleTimeString()}
                                    </span>
                                </div>
                                <div className="text-sm text-slate-300 leading-relaxed font-medium">
                                    {typeof msg.content === 'string' ? msg.content : (
                                        msg.content.type === 'CHART' ? `[CHART] ${msg.content.title}` : JSON.stringify(msg.content)
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};
