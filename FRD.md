
# AI Agent Mesh xBI

A mockup web multi-agent framework to build extensible business intelligence (xBI) for BI workflow automation.

The architecture of the framework consists of a bi_orchestrator agent that oversees the workflow of all sub-agents and their state transitions with the capabilities of trigger and error handling.

## Sub agent bi_installer

bi_installer agent installs the bi product (Power BI Desktop versoin).

## Sub agent bi_connector

bi_connector agent connects to a data source file or a database.

## Sub agent bi_reporter

bi_reporter agent generates analytics reports in different visualization types such as bar chart.

## Sub agent bi_tester

bi_tester agent executes functional and regression testing with the capabilities of test suite selection and result logging. bi_tester agent uses Playwright to automatically create test specs and generate test reports.

## Sub agent bi_monitor

bi_monitor agent uses Grafana or Langfuse dashboard to monitor the state of such multi-agent system.

