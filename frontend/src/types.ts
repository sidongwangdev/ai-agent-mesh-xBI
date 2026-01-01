export type AgentType = 'ORCHESTRATOR' | 'INSTALLER' | 'CONNECTOR' | 'REPORTER' | 'TESTER' | 'MONITOR';

export interface Message {
    id: string;
    from: string;
    to: string | 'ALL';
    type: string;
    content: any;
    timestamp: string;
}

export interface AgentState {
    id: string;
    type: AgentType;
    status: 'IDLE' | 'BUSY' | 'ERROR';
    currentTask?: string;
}

export interface Artifact {
    type: 'CHART' | 'TABLE' | 'TEXT';
    chartType?: string;
    title: string;
    data: any;
}
