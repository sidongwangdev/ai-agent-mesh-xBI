import { BaseAgent } from './BaseAgent';
import { Message } from '../types';

export class OrchestratorAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'ORCHESTRATOR');
    }

    protected handleMessage(message: Message): void {
        if (message.type === 'USER_REQUEST') {
            this.processUserRequest(message.content.text);
        }
    }

    private async processUserRequest(text: string) {
        this.updateState('BUSY', 'Decomposing request');
        console.log(`[Orchestrator] Processing request: ${text}`);

        const normalizedText = text.toLowerCase();
        if (normalizedText.includes('generate') && normalizedText.includes('report')) {
            this.sendMessage('bi_installer', 'INSTALL_BI', { product: 'Power BI Desktop' });
            this.sendMessage('bi_connector', 'CONNECT_DATA', { source: 'sales_2025.csv' });
            this.sendMessage('bi_reporter', 'GENERATE_CHART', { type: 'bar', data: 'sales_trends' });
            this.sendMessage('bi_tester', 'RUN_TESTS', { suite: 'report_validation' });
            this.sendMessage('bi_monitor', 'LOG_SYSTEM_STATUS', { event: 'report_generation_started' });
        } else {
            this.sendMessage('ALL', 'GENERAL_COMMAND', { text: `Command received: ${text}` });
        }

        setTimeout(() => {
            this.updateState('IDLE');
        }, 2000);
    }
}
