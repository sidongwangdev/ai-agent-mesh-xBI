import { BaseAgent } from './BaseAgent';
import { Message } from '../types';

export class MonitorAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'MONITOR');
    }

    protected handleMessage(message: Message): void {
        if (message.type === 'LOG' || message.type === 'LOG_SYSTEM_STATUS') {
            console.log(`[Monitor] ${JSON.stringify(message.content)}`);
            // In a real app, this would save to a DB or push to Grafana/Langfuse
        }
    }
}
