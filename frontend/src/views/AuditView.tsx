import { motion } from 'framer-motion';
import { Search, Database, FileText, Filter, ChevronRight } from 'lucide-react';

export const AuditView = () => {
    return (
        <div className="flex-[1.4] flex flex-col gap-8 overflow-y-auto pr-4 scrollbar-hide">
            <div>
                <h2 className="text-xl font-black text-white tracking-tight">System Audit</h2>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Advanced Historical Data Retrieval</p>
            </div>

            <div className="glass p-8 rounded-[2rem] border-white/[0.03]">
                <div className="relative group mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-blue-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search BI archives, agent reports, or connectivity logs..."
                        className="w-full bg-[#0f172a] border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none text-white placeholder:text-slate-600 shadow-inner group-hover:bg-[#121c33] transition-all"
                    />
                </div>

                <div className="flex gap-3 mb-8">
                    {['All Archives', 'Reports', 'Logs', 'Artifacts'].map((f) => (
                        <button key={f} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter border transition-all ${f === 'All Archives'
                                ? 'bg-blue-600 border-blue-500 text-white shadow-lg'
                                : 'bg-white/[0.02] border-white/5 text-slate-500 hover:text-white hover:bg-white/5'
                            }`}>
                            {f}
                        </button>
                    ))}
                    <button className="ml-auto p-2 text-slate-500 hover:text-white transition-colors">
                        <Filter size={18} />
                    </button>
                </div>

                <div className="space-y-4">
                    {[
                        { title: 'Sales Trend Q4 2024', type: 'Report', date: '2024-12-15', agent: 'REPORTER' },
                        { title: 'Infrastructure Audit Log', type: 'System', date: '2024-12-28', agent: 'MONITOR' },
                        { title: 'Lead Generation Sync', type: 'Flow', date: '2025-01-01', agent: 'CONNECTOR' }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.01] border border-white/[0.03] hover:bg-white/[0.03] hover:border-blue-500/20 transition-all cursor-pointer group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-blue-500">
                                {item.type === 'Report' ? <FileText size={18} /> : <Database size={18} />}
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{item.title}</h4>
                                <div className="flex items-center gap-4 mt-1">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-[#3b82f6]">{item.type}</span>
                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{item.date}</span>
                                    <span className="text-[9px] font-bold text-slate-600">{item.agent}</span>
                                </div>
                            </div>
                            <ChevronRight size={16} className="text-slate-700 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
