import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ShieldCheck, ShieldAlert, Cpu, Heart, Activity } from 'lucide-react';
import type { Agent } from '../types';

interface AlertsViewProps {
    agents: Agent[];
}

export const AlertsView = ({ agents }: AlertsViewProps) => {
    const healthyCount = agents.filter(a => a.status === 'IDLE' || a.status === 'BUSY').length;

    return (
        <div className="flex-[1.4] flex flex-col gap-8 overflow-y-auto pr-4 scrollbar-hide">
            <div>
                <h2 className="text-xl font-black text-white tracking-tight">System Health & Alerts</h2>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Real-time Mesh Monitoring</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="glass p-8 rounded-[2rem] border-emerald-500/10 bg-emerald-500/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 text-emerald-500/10 opacity-40 group-hover:opacity-100 transition-opacity">
                        <Heart size={64} />
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                        <ShieldCheck size={24} className="text-emerald-500" />
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500">Stability</span>
                    </div>
                    <h3 className="text-4xl font-black text-white tracking-tighter mb-1">100%</h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Mesh Network Operational</p>
                </div>

                <div className="glass p-8 rounded-[2rem] border-blue-500/10 bg-blue-500/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 text-blue-500/10 opacity-40 group-hover:opacity-100 transition-opacity">
                        <Cpu size={64} />
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                        <Activity size={24} className="text-blue-500" />
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-500">Nodes Online</span>
                    </div>
                    <h3 className="text-4xl font-black text-white tracking-tighter mb-1">{agents.length} / 6</h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Fleet Capacity</p>
                </div>
            </div>

            <div className="glass rounded-[2rem] border-white/[0.03] overflow-hidden">
                <div className="p-6 border-b border-white/[0.04] bg-white/[0.01] flex items-center justify-between">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#3b82f6]">Recent Notifications</h3>
                    <span className="text-[10px] font-bold text-slate-600 uppercase">Live Feed</span>
                </div>
                <div className="p-4">
                    {[
                        { title: 'New Agent Connected', msg: 'REPORTER node successfully joined the mesh.', time: '2m ago', type: 'info' },
                        { title: 'Workflow Executing', msg: 'BI_ORCHESTRATOR initiated a Sales Report pipeline.', time: '5m ago', type: 'info' },
                        { title: 'Link Latency Optimal', msg: 'Socket connection stable at < 15ms.', time: '12m ago', type: 'success' }
                    ].map((alert, i) => (
                        <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-white/[0.02] transition-colors group">
                            <div className={`w-2 h-2 rounded-full mt-1.5 ${alert.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                                }`} />
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="text-sm font-bold text-slate-200">{alert.title}</h4>
                                    <span className="text-[10px] text-slate-600 font-mono italic">{alert.time}</span>
                                </div>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed">{alert.msg}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
