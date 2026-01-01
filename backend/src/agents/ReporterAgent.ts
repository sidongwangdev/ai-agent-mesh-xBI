import { BaseAgent } from './BaseAgent';
import { Message } from '../types';

export class ReporterAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'REPORTER');
    }

    protected handleMessage(message: Message): void {
        if (message.type === 'GENERATE_CHART') {
            this.generate(message.content.type, message.content.data);
        }
    }

    private generate(type: string, dataKey: string) {
        this.updateState('BUSY', `Generating ${type} chart for ${dataKey}`);
        setTimeout(() => {
            const artifact = {
                type: 'CHART',
                chartType: type,
                title: `Sales Trends 2025`,
                data: [
                    { name: 'Jan', value: 400 },
                    { name: 'Feb', value: 300 },
                    { name: 'Mar', value: 600 },
                    { name: 'Apr', value: 800 },
                    { name: 'May', value: 500 },
                ]
            };
            this.sendMessage('ALL', 'ARTIFACT_GENERATED', artifact);
            this.sendMessage('ORCHESTRATOR', 'REPORT_READY', { artifactId: 'abc-123' });
            this.updateState('IDLE');
        }, 4000);
    }
}
