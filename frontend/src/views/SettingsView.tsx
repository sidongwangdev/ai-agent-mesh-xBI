import { Shield, Cpu, Save } from 'lucide-react';

export const SettingsView = () => {
    return (
        <div className="flex-[1.4] flex flex-col gap-8 overflow-y-auto pr-4 scrollbar-hide">
            <div>
                <h2 className="text-xl font-black text-white tracking-tight">System Settings</h2>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Configure BI Agent Mesh Parameters</p>
            </div>

            <div className="glass p-8 rounded-[2rem] border-white/[0.03] space-y-8">
                {/* Agent Orchestration Section */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <Cpu size={20} className="text-blue-500" />
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-200">Mesh Core</h3>
                    </div>
                    <div className="space-y-6">
                        <ToggleSetting
                            title="Parallel Execution"
                            description="Allow multiple sub-agents to run tasks simultaneously."
                            enabled={true}
                        />
                        <ToggleSetting
                            title="Auto-Scaling"
                            description="Dynamically launch new instances for heavy BI workloads."
                            enabled={false}
                        />
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Max Agent Mesh Density</label>
                            <input type="range" className="w-full accent-blue-600 bg-slate-800 rounded-lg h-1.5" min="1" max="10" defaultValue="6" />
                            <div className="flex justify-between text-[9px] text-slate-600 font-bold uppercase">
                                <span>1 Node</span>
                                <span>10 Nodes</span>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="h-px bg-white/[0.03]" />

                {/* Security & Access */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <Shield size={20} className="text-emerald-500" />
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-200">Security & Integrity</h3>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.01] border border-white/[0.03]">
                            <div>
                                <h4 className="text-xs font-bold text-slate-200">System API Key</h4>
                                <p className="text-[10px] text-slate-500">Last updated 14 days ago</p>
                            </div>
                            <button className="px-3 py-1.5 bg-slate-800 text-[10px] font-black text-slate-300 rounded-lg hover:text-white transition-colors uppercase tracking-widest">Rotate Key</button>
                        </div>
                        <ToggleSetting
                            title="Encrypted Communication"
                            description="All inter-agent messages are signed with RSA-2048."
                            enabled={true}
                        />
                    </div>
                </section>

                {/* Action Bar */}
                <div className="pt-4 flex items-center justify-end gap-4">
                    <button className="text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest">Discard Changes</button>
                    <button className="px-6 py-2.5 bg-blue-600 text-white text-xs font-black rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-500 transition-all flex items-center gap-2 uppercase tracking-widest">
                        <Save size={16} /> Save Configuration
                    </button>
                </div>
            </div>
        </div>
    );
};

const ToggleSetting = ({ title, description, enabled }: { title: string, description: string, enabled: boolean }) => (
    <div className="flex items-center justify-between group">
        <div className="flex flex-col gap-1">
            <h4 className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">{title}</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed font-medium max-w-[300px]">{description}</p>
        </div>
        <div className={`w-10 h-5 rounded-full p-1 transition-colors cursor-pointer ${enabled ? 'bg-blue-600' : 'bg-slate-800'}`}>
            <div className={`w-3 h-3 rounded-full bg-white transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
        </div>
    </div>
);
