import { useState } from 'react';
import { useAgentMesh } from './hooks/useAgentMesh';
import { ChatPanel } from './components/ChatPanel';
import { DashboardView } from './views/DashboardView';
import { ActivityView } from './views/ActivityView';
import { AuditView } from './views/AuditView';
import { AlertsView } from './views/AlertsView';
import { SettingsView } from './views/SettingsView';
import { LayoutDashboard, Activity, Search, Bell, Settings, Globe, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ViewType = 'dashboard' | 'activity' | 'search' | 'alerts' | 'settings';

function App() {
  const { agents, messages, isConnected, sendMessage } = useAgentMesh();
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [showWorkflowMenu, setShowWorkflowMenu] = useState(false);

  const handleTemplateSelect = (template: string) => {
    const event = new CustomEvent('set-chat-input', { detail: template });
    window.dispatchEvent(event);
    setShowWorkflowMenu(false);
  };

  return (
    <div className="flex h-screen w-full bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-blue-500/30">
      {/* Sidebar */}
      <aside className="w-20 flex flex-col items-center py-8 border-r border-slate-900 bg-[#020617] z-20">
        <div
          onClick={() => setCurrentView('dashboard')}
          className="p-3 bg-blue-600 rounded-2xl mb-12 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-110 transition-transform cursor-pointer relative group"
        >
          <Globe size={28} className="text-white" />
          <div className="absolute left-full ml-4 px-2 py-1 bg-slate-900 border border-slate-800 rounded text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
            Home / Dashboard
          </div>
        </div>
        <div className="flex flex-col gap-8 flex-1">
          <NavItem
            icon={<LayoutDashboard size={22} />}
            active={currentView === 'dashboard'}
            onClick={() => setCurrentView('dashboard')}
            label="Dashboard"
          />
          <NavItem
            icon={<Activity size={22} />}
            active={currentView === 'activity'}
            onClick={() => setCurrentView('activity')}
            label="Activity"
          />
          <NavItem
            icon={<Search size={22} />}
            active={currentView === 'search'}
            onClick={() => setCurrentView('search')}
            label="Search"
          />
          <NavItem
            icon={<Bell size={22} />}
            active={currentView === 'alerts'}
            onClick={() => setCurrentView('alerts')}
            label="Alerts"
          />
        </div>
        <div className="flex flex-col gap-6">
          <NavItem
            icon={<Settings size={22} />}
            active={currentView === 'settings'}
            onClick={() => setCurrentView('settings')}
            label="Settings"
          />
          <div
            onClick={() => {
              setCurrentView('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-10 h-10 rounded-full border-2 border-slate-800 p-0.5 hover:border-blue-500 transition-colors cursor-pointer mb-2 overflow-hidden shadow-[0_0_10px_rgba(255,255,255,0.1)] active:scale-95"
          >
            <img
              src="/kitten_avatar.png"
              className="w-full h-full object-cover"
              alt="Cute Kitten"
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(30,58,138,0.1),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(37,99,235,0.05),transparent_40%)]">
        {/* Header */}
        <header className="h-20 px-8 flex items-center justify-between border-b border-white/[0.04] bg-slate-950/40 backdrop-blur-xl z-10">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <h1 className="text-xl font-black tracking-tighter text-white drop-shadow-sm">
                AI AGENT MESH <span className="text-blue-500">xBI</span>
              </h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Workflow Automation OS</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all duration-500 border ${isConnected
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
              : 'bg-red-500/10 text-red-400 border-red-500/20'
              }`}>
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-red-500'}`} />
              {isConnected ? 'System Online' : 'System Offline'}
            </div>
          </div>

          <div className="flex items-center gap-4 relative">
            <div className="flex -space-x-2 mr-2">
              {agents.slice(0, 3).map((agent) => (
                <div key={agent.id} className={`w-8 h-8 rounded-full border-2 border-[#020617] transition-all flex items-center justify-center text-[10px] font-bold overflow-hidden shadow-lg hover:z-30 hover:-translate-y-1 cursor-help ${agent.status === 'BUSY' ? 'ring-2 ring-blue-500' : ''
                  }`}>
                  <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${agent.type}`} alt={agent.type} />
                </div>
              ))}
              {agents.length > 3 && (
                <div className="w-8 h-8 rounded-full border-2 border-[#020617] bg-blue-600/20 text-blue-400 flex items-center justify-center text-[10px] font-bold backdrop-blur-sm cursor-pointer hover:bg-blue-600/30 transition-colors">
                  +{agents.length - 3}
                </div>
              )}
            </div>

            <button
              onClick={() => setShowWorkflowMenu(!showWorkflowMenu)}
              className={`h-10 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${showWorkflowMenu
                ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/10 text-slate-200'
                }`}
            >
              <Plus size={16} /> New Workflow
            </button>

            <AnimatePresence>
              {showWorkflowMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-14 right-0 w-64 glass border-white/[0.04] p-2 z-50 shadow-2xl overflow-hidden"
                >
                  <div className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                    Select Template
                  </div>
                  {[
                    { name: 'Standard Sales Report', icon: '📊', cmd: 'Generate sales report' },
                    { name: 'System Connectivity Audit', icon: '🔌', cmd: 'Audit all connections' },
                    { name: 'Data Pipeline Sync', icon: '🔄', cmd: 'Sync production data' }
                  ].map((temp, i) => (
                    <button
                      key={i}
                      onClick={() => handleTemplateSelect(temp.cmd)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-blue-600/10 rounded-lg text-left transition-colors group"
                    >
                      <span className="text-lg">{temp.icon}</span>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-200 group-hover:text-white">{temp.name}</span>
                        <span className="text-[9px] text-slate-500 font-medium">Auto-populates mesh command</span>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 flex overflow-hidden p-8 gap-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex min-w-0"
            >
              {currentView === 'dashboard' && <DashboardView agents={agents} messages={messages} />}
              {currentView === 'activity' && <ActivityView messages={messages} />}
              {currentView === 'search' && <AuditView />}
              {currentView === 'alerts' && <AlertsView agents={agents} />}
              {currentView === 'settings' && <SettingsView />}
            </motion.div>
          </AnimatePresence>

          {/* Right Column: Chat & Events (Always Visible) */}
          <div className="flex-1 min-w-[420px] max-w-[500px] flex flex-col overflow-hidden">
            <ChatPanel messages={messages} onSendMessage={sendMessage} />
          </div>
        </div>
      </main>
    </div>
  );
}

const NavItem = ({ icon, active = false, onClick, label }: { icon: React.ReactNode, active?: boolean, onClick?: () => void, label: string }) => (
  <button
    onClick={onClick}
    className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all relative group ${active
      ? 'bg-blue-600/10 text-white shadow-[inset_0_0_12px_rgba(37,99,235,0.1)]'
      : 'text-slate-500 hover:text-slate-200 hover:bg-slate-900/50'
      }`}
  >
    {active && (
      <motion.div
        layoutId="active-pill"
        className="absolute -left-4 w-1 h-8 bg-blue-500 rounded-r-full shadow-[2px_0_10px_#3b82f6]"
      />
    )}
    {icon}
    <div className="absolute left-full ml-4 px-2 py-1 bg-slate-900 border border-slate-800 rounded text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
      {label}
    </div>
  </button>
);

export default App;
