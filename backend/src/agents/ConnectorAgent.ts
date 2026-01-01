import { BaseAgent } from './BaseAgent';
import { Message } from '../types';

export class ConnectorAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'CONNECTOR');
    }

    protected handleMessage(message: Message): void {
        if (message.type === 'CONNECT_DATA') {
            this.connect(message.content.source);
        }
    }

    private connect(source: string) {
        this.updateState('BUSY', `Connecting to ${source}`);
        setTimeout(() => {
            this.sendMessage('ORCHESTRATOR', 'CONNECTION_SUCCESS', { source });
            this.updateState('IDLE');
        }, 2000);
    }
}
