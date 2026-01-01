import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Activity, MoreVertical } from 'lucide-react';
import { AgentCard } from '../components/AgentCard';
import type { Agent, Message } from '../types';

interface DashboardViewProps {
    agents: Agent[];
    messages: Message[];
}

export const DashboardView = ({ agents, messages }: DashboardViewProps) => {
    const flowRef = useRef<HTMLDivElement>(null);

    const scrollToFlow = () => {
        flowRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="flex-[1.4] flex flex-col gap-8 overflow-y-auto pr-4 scrollbar-hide">
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6">
                <StatCard label="Live Orchestration" value={agents.filter(a => a.status === 'BUSY').length.toString()} sub="active agents" color="blue" />
                <StatCard label="Mesh Traffic" value={messages.length.toString()} sub="msgs/session" color="purple" />
                <StatCard label="Pipeline Health" value="100%" sub="no bottlenecks" color="emerald" />
            </div>

            {/* Agent Mesh Grid Container */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Agent Mesh Fleet</h2>
                        <div className="px-1.5 py-0.5 bg-slate-800 rounded text-[9px] font-bold text-slate-500">v1.2.4</div>
                    </div>
                    <button className="text-slate-500 hover:text-white transition-colors">
                        <MoreVertical size={16} />
                    </button>
                </div>

                {/* Agents Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {agents.map((agent, index) => (
                        <motion.div
                            key={agent.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <AgentCard agent={agent} />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Topology Visualization */}
            <div ref={flowRef} className="glass rounded-[2rem] p-8 min-h-[400px] flex flex-col border-white/[0.03] relative overflow-hidden group">
                <div className="flex justify-between items-start mb-6 relative z-10">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-1">Agent Mesh Interaction Flow</h3>
                        <p className="text-xs text-slate-500">Hierarchical task delegation from Orchestrator to specialized nodes.</p>
                    </div>
                    <button
                        onClick={scrollToFlow}
                        className="bg-blue-500/10 text-blue-400 text-[10px] font-black px-2 py-1 rounded-full border border-blue-500/20 uppercase tracking-tighter hover:bg-blue-500/20 transition-colors cursor-pointer"
                    >
                        Hierarchical View
                    </button>
                </div>

                <div className="flex-1 relative flex items-center justify-center pt-8">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

                    <svg className="w-full h-full max-w-2xl relative z-10 overflow-visible">
                        <defs>
                            <filter id="glow-node">
                                <feGaussianBlur stdDeviation="3" result="px" />
                                <feComposite in="SourceGraphic" in2="px" operator="over" />
                            </filter>
                            <linearGradient id="link-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.2" />
                            </linearGradient>
                        </defs>

                        <g>
                            {[60, 140, 220, 300, 380].map((x, i) => (
                                <motion.path
                                    key={i}
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{
                                        pathLength: 1,
                                        opacity: agents.some(a => a.type !== 'ORCHESTRATOR' && a.status === 'BUSY') ? 1 : 0.3
                                    }}
                                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                                    d={`M220 50 C 220 100, ${x} 100, ${x} 150`}
                                    stroke="url(#link-grad)"
                                    strokeWidth="2"
                                    fill="none"
                                />
                            ))}
                        </g>

                        <g filter="url(#glow-node)" transform="translate(170, 20)">
                            <rect width="100" height="40" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                            <text x="50" y="25" textAnchor="middle" fill="white" fontSize="10" fontWeight="900" style={{ textTransform: 'uppercase' }}>Orchestrator</text>
                            {agents.find(a => a.type === 'ORCHESTRATOR')?.status === 'BUSY' && (
                                <circle cx="10" cy="10" r="3" fill="#3b82f6" className="pulse" />
                            )}
                        </g>

                        {['INSTALLER', 'CONNECTOR', 'REPORTER', 'TESTER', 'MONITOR'].map((type, i) => {
                            const x = 50 + i * 80;
                            const agent = agents.find(a => a.type === type);
                            const isBusy = agent?.status === 'BUSY';

                            return (
                                <g key={type} filter="url(#glow-node)" transform={`translate(${x - 35}, 150)`}>
                                    <rect
                                        width="70"
                                        height="30"
                                        rx="6"
                                        fill="#0f172a"
                                        stroke={isBusy ? "#3b82f6" : "#334155"}
                                        strokeWidth="1.5"
                                        className="transition-colors duration-500"
                                    />
                                    <text x="35" y="19" textAnchor="middle" fill={isBusy ? "white" : "#64748b"} fontSize="8" fontWeight="700">{type}</text>
                                    {isBusy && (
                                        <motion.circle
                                            initial={{ r: 0 }}
                                            animate={{ r: [2, 4, 2] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                            cx="5" cy="5" r="2" fill="#3b82f6"
                                        />
                                    )}
                                </g>
                            );
                        })}
                    </svg>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-40">
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            <span className="text-[9px] uppercase font-bold tracking-widest">Delegation</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                            <span className="text-[9px] uppercase font-bold tracking-widest">Mesh Link</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ label, value, sub, color }: { label: string, value: string, sub: string, color: 'blue' | 'purple' | 'emerald' }) => {
    const colors = {
        blue: 'from-blue-600/20 to-transparent border-blue-500/20 text-blue-400',
        purple: 'from-purple-600/20 to-transparent border-purple-500/20 text-purple-400',
        emerald: 'from-emerald-600/20 to-transparent border-emerald-500/20 text-emerald-400',
    };

    return (
        <div className={`glass p-6 rounded-[1.5rem] border-white/[0.03] bg-gradient-to-br ${colors[color]} relative overflow-hidden group`}>
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                <Activity size={40} />
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black mb-3">{label}</p>
            <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white tracking-tighter">{value}</span>
                <span className="text-xs text-slate-500 font-bold">{sub}</span>
            </div>
        </div>
    );
};
