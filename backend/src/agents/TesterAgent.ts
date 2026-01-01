import { BaseAgent } from './BaseAgent';
import { Message } from '../types';

export class TesterAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'TESTER');
    }

    protected handleMessage(message: Message): void {
        if (message.type === 'RUN_TESTS') {
            this.runTests(message.content.suite);
        }
    }

    private runTests(suite: string) {
        this.updateState('BUSY', `Running Playwright suite: ${suite}`);

        // Simulate Playwright logs
        setTimeout(() => {
            this.sendMessage('MONITOR', 'LOG', { text: '> playwright test ' + suite });
        }, 500);

        setTimeout(() => {
            this.sendMessage('MONITOR', 'LOG', { text: 'Running 3 tests using 1 worker' });
            this.sendMessage('MONITOR', 'LOG', { text: '[ok] report_validation.spec.ts:10:1 › check chart visibility' });
        }, 2000);

        setTimeout(() => {


            // Send detailed report to the mesh
            this.sendMessage('ALL', 'TEST_REPORT', {
                suite,
                summary: '3 passed (5.4s)',
                tests: [
                    { name: 'Check chart visibility', status: 'passed', duration: '1.2s' },
                    { name: 'Validate sales data binding', status: 'passed', duration: '2.1s' },
                    { name: 'Verify export to PDF functionality', status: 'passed', duration: '2.1s' }
                ]
            });

            this.sendMessage('ORCHESTRATOR', 'TESTS_PASSED', { suite });
            this.updateState('IDLE');
        }, 5000);
    }
}
