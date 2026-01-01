import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import type { AgentState, Message } from '../types';

const SOCKET_URL = import.meta.env.PROD ? '/' : 'http://localhost:3002';

export const useAgentMesh = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [agents, setAgents] = useState<AgentState[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const newSocket = io(SOCKET_URL);
        setSocket(newSocket);

        newSocket.on('connect', () => {
            setIsConnected(true);
            console.log('Connected to Agent Mesh');
        });

        newSocket.on('initial_states', (initialStates: AgentState[]) => {
            setAgents(initialStates);
        });

        newSocket.on('agent_state_update', (updatedState: AgentState) => {
            setAgents(prev => prev.map(a => a.id === updatedState.id ? updatedState : a));
        });

        newSocket.on('agent_message', (msg: Message) => {
            setMessages(prev => [...prev, msg]);
        });

        newSocket.on('disconnect', () => {
            setIsConnected(false);
        });

        return () => {
            newSocket.close();
        };
    }, []);

    const sendMessage = useCallback((text: string) => {
        if (socket) {
            socket.emit('send_user_message', text);
        }
    }, [socket]);

    return { agents, messages, isConnected, sendMessage };
};
