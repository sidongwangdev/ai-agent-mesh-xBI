import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Terminal, Cpu, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import type { Message } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const TestReport = ({ content }: { content: any }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="flex flex-col gap-3 py-1 min-w-[280px]">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 -m-2 rounded-xl transition-colors"
            >
                <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span className="font-bold text-slate-200 group-hover:text-blue-400 transition-colors uppercase tracking-tight underline decoration-blue-500/30 underline-offset-4">
                        {content.summary}
                    </span>
                </div>
                {isExpanded ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-2 flex flex-col gap-2 border-l-2 border-white/5 ml-2 pl-4">
                            {content.tests.map((test: any, i: number) => (
                                <div key={i} className="flex items-center justify-between py-1 group/item">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-emerald-500" />
                                        <span className="text-[11px] text-slate-400 font-medium group-hover/item:text-slate-200 transition-colors">
                                            {test.name}
                                        </span>
                                    </div>
                                    <span className="text-[9px] font-mono text-slate-600 font-bold group-hover/item:text-blue-500 transition-colors">
                                        {test.duration}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const ChatPanel = ({ messages, onSendMessage }: { messages: Message[], onSendMessage: (text: string) => void }) => {
    const [input, setInput] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        onSendMessage(input);
        setInput('');
    };

    useEffect(() => {
        const handleSetInput = (e: any) => {
            setInput(e.detail);
        };
        window.addEventListener('set-chat-input', handleSetInput);
        return () => window.removeEventListener('set-chat-input', handleSetInput);
    }, []);

    const renderContent = (msg: Message) => {
        if (typeof msg.content !== 'string' && msg.content.type === 'CHART') {
            const chart = msg.content;
            const maxValue = Math.max(...chart.data.map((d: any) => d.value), 1);

            return (
                <div className="flex flex-col gap-4 py-2 min-w-[300px]">
                    <div className="flex items-center justify-between">
                        <span className="font-black uppercase tracking-tighter text-blue-400">{chart.title}</span>
                        <span className="text-[10px] bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded uppercase font-bold">{chart.chartType}</span>
                    </div>
                    <div className="flex items-end gap-3 h-32 pt-4">
                        {chart.data.map((item: any, i: number) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(item.value / maxValue) * 100}%` }}
                                    transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 100 }}
                                    className="w-full bg-gradient-to-t from-blue-600/40 to-blue-400 rounded-t-md relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.div>
                                <span className="text-[10px] font-bold text-slate-500">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        if (msg.type === 'TEST_REPORT') {
            return <TestReport content={msg.content} />;
        }

        if (msg.type === 'TESTS_PASSED') {
            return null;
        }

        return typeof msg.content === 'string' ? msg.content : msg.content.text || JSON.stringify(msg.content, null, 2);
    };

    return (
        <div className="flex flex-col h-full glass rounded-[2.5rem] overflow-hidden border-white/[0.04] bg-slate-950/20 backdrop-blur-3xl shadow-2xl">
            <div className="p-6 border-b border-white/[0.04] bg-white/[0.02] flex justify-between items-center backdrop-blur-md relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                        <Terminal size={20} />
                    </div>
                    <div>
                        <h3 className="font-black text-sm text-white tracking-tight uppercase">Agent Mesh Stream</h3>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                            <span className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em]">Socket: WebSocket/v2</span>
                        </div>
                    </div>
                </div>
                <div className="p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer text-slate-500">
                    <Cpu size={18} />
                </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-gradient-to-b from-transparent to-[#020617]/40">
                <AnimatePresence initial={false}>
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-20">
                            <Bot size={48} className="mb-4" />
                            <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Waiting for mesh broadcast...</p>
                        </div>
                    ) : (
                        messages.filter(msg => msg.type !== 'TESTS_PASSED').map((msg) => (
                            <motion.div
                                initial={{ opacity: 0, x: msg.from === 'USER' ? 20 : -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={msg.id}
                                className={`flex flex-col ${msg.from === 'USER' ? 'items-end' : 'items-start'}`}
                            >
                                <div className={`flex gap-2 items-center mb-1.5`}>
                                    {msg.from !== 'USER' ? (
                                        <>
                                            <div className="w-5 h-5 rounded-md bg-blue-600/20 flex items-center justify-center text-blue-500 border border-blue-500/10">
                                                <Bot size={12} />
                                            </div>
                                            <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{msg.from}</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Operator Console</span>
                                            <div className="w-5 h-5 rounded-md bg-slate-800 flex items-center justify-center text-slate-400">
                                                <User size={12} />
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className={`max-w-[85%] rounded-[1.25rem] px-5 py-3.5 text-sm leading-relaxed shadow-lg ${msg.from === 'USER'
                                    ? 'bg-blue-600 text-white rounded-tr-none font-medium'
                                    : 'bg-[#111827] text-slate-200 rounded-tl-none border border-white/5 ring-1 ring-white/[0.02]'
                                    }`}>
                                    {renderContent(msg)}
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            <div className="p-6 bg-slate-950/40 border-t border-white/[0.04] backdrop-blur-md relative z-10">
                <form onSubmit={handleSubmit} className="relative group">
                    <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Input automation command (e.g., Generate sales report)"
                        className="w-full bg-[#0f172a] border border-white/[0.03] rounded-2xl py-4 pl-6 pr-14 text-sm focus:ring-2 focus:ring-blue-500/50 transition-all outline-none text-white placeholder:text-slate-600 shadow-inner"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="absolute right-2.5 top-2.5 p-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:bg-slate-800 rounded-xl transition-all duration-300 text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_20px_rgba(37,99,235,0.5)] active:scale-95"
                    >
                        <Send size={20} />
                    </button>
                </form>
                <p className="mt-4 text-[9px] text-center text-slate-600 font-black uppercase tracking-[0.3em]">
                    End-to-End Encrypted Agent Protocol
                </p>
            </div>
        </div>
    );
};
