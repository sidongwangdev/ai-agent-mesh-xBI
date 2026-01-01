import { BaseAgent } from './BaseAgent';
import { Message } from '../types';

export class InstallerAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'INSTALLER');
    }

    protected handleMessage(message: Message): void {
        if (message.type === 'INSTALL_BI') {
            this.install(message.content.product);
        }
    }

    private install(product: string) {
        this.updateState('BUSY', `Installing ${product}`);
        setTimeout(() => {
            this.sendMessage('ORCHESTRATOR', 'INSTALL_COMPLETE', { product, status: 'SUCCESS' });
            this.updateState('IDLE');
        }, 3000);
    }
}
