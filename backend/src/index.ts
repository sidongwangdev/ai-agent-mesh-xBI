import express from 'express';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { eventBus } from './core/EventBus';
import { OrchestratorAgent } from './agents/OrchestratorAgent';
import { InstallerAgent } from './agents/InstallerAgent';
import { ConnectorAgent } from './agents/ConnectorAgent';
import { ReporterAgent } from './agents/ReporterAgent';
import { TesterAgent } from './agents/TesterAgent';
import { MonitorAgent } from './agents/MonitorAgent';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend files
const frontendDist = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendDist));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

eventBus.setIO(io);

// Initialize Agents
const agents = {
    orchestrator: new OrchestratorAgent('ORCHESTRATOR'),
    installer: new InstallerAgent('bi_installer'),
    connector: new ConnectorAgent('bi_connector'),
    reporter: new ReporterAgent('bi_reporter'),
    tester: new TesterAgent('bi_tester'),
    monitor: new MonitorAgent('bi_monitor'),
};

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Send initial states
    const states = Object.values(agents).map(a => a.getState());
    socket.emit('initial_states', states);

    socket.on('send_user_message', (text: string) => {
        eventBus.publish({
            id: 'user-' + Date.now(),
            from: 'USER',
            to: 'ORCHESTRATOR',
            type: 'USER_REQUEST',
            content: { text },
            timestamp: new Date().toISOString()
        });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3002;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
