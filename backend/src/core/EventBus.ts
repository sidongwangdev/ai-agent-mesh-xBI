import { EventEmitter } from 'events';
import { Message } from '../types';
import { Server as SocketServer } from 'socket.io';

class EventBus extends EventEmitter {
    private io?: SocketServer;

    setIO(io: SocketServer) {
        this.io = io;
    }

    publish(message: Message) {
        console.log(`[EventBus] Publishing: ${message.from} -> ${message.to}: ${message.type}`);
        this.emit('message', message);
        if (this.io) {
            this.io.emit('agent_message', message);
        }
    }

    updateAgentState(state: any) {
        if (this.io) {
            this.io.emit('agent_state_update', state);
        }
    }
}

export const eventBus = new EventBus();
