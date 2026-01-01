import { eventBus } from '../core/EventBus';
import { Message, AgentType, AgentState } from '../types';
import { v4 as uuidv4 } from 'uuid';

export abstract class BaseAgent {
    protected id: string;
    protected type: AgentType;
    protected status: 'IDLE' | 'BUSY' | 'ERROR' = 'IDLE';
    protected currentTask?: string;

    constructor(id: string, type: AgentType) {
        this.id = id;
        this.type = type;
        eventBus.on('message', (msg: Message) => {
            if (msg.to === this.id || msg.to === 'ALL') {
                this.handleMessage(msg);
            }
        });
    }

    protected abstract handleMessage(message: Message): void;

    protected sendMessage(to: string | 'ALL', type: string, content: any) {
        const message: Message = {
            id: uuidv4(),
            from: this.id,
            to,
            type,
            content,
            timestamp: new Date().toISOString(),
        };
        eventBus.publish(message);
    }

    protected updateState(status: 'IDLE' | 'BUSY' | 'ERROR', currentTask?: string) {
        this.status = status;
        this.currentTask = currentTask;
        eventBus.updateAgentState(this.getState());
    }

    public getState(): AgentState {
        return {
            id: this.id,
            type: this.type,
            status: this.status,
            currentTask: this.currentTask,
        };
    }
}
