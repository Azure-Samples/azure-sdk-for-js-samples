---
page_type: sample
languages:
- javascript
- typescript
products:
- azure
description: "These code samples will show you how to manage Monitor using Azure SDK for JavaScript/TypeScript."
urlFragment: monitor
---

# Getting started - Managing Monitor using Azure JavaScript/TypeScript SDK

These code samples will show you how to manage Monitor using Azure SDK for JavaScript/TypeScript.

## Features

This project framework provides examples for the following services:

### Monitor
* Using the Azure SDK for JavaScript/TypeScript - Monitor Management Library [@azure/arm-monitor](https://www.npmjs.com/package/@azure/arm-monitor) for the [Azure Monitor API](https://docs.microsoft.com/en-us/rest/api/monitor/)


### Installation

1.  Before using the sdk package,we need [install nodejs](https://nodejs.org/en/download/) and add it into environment variables.

    reference :
    
    ```
    nodejs version: 14.16.0
    typescript version: 4.1.3
    ```

### Quickstart

1.  Clone the repository.

    ```
    git clone https://github.com/Azure-Samples/azure-samples-js-management
    ```

2.  Install the dependencies using npm.

    ```
    cd azure-samples-js-management/samples/monitor
    npm i -g typescript
    npm install
    ```

## Demo

A demo app is included to show how to use the project.

To run the complete demo, you need to call the methods you want to test in main method. 

    ```
    async function main() {
        client = new MonitorClient(credential, subscriptionId);
        logic_client = new LogicManagementClient(credential, subscriptionId);
        storage_client = new StorageManagementClient(credential, subscriptionId);
        eventhub_client = new EventHubManagementClient(credential, subscriptionId);
        op_client = new OperationalInsightsManagementClient(credential,subscriptionId);
        await diagnosticSettings_delete();
    }
    ```

execute below command on terminal

    ```
    tsc monitor_examples.ts (it will create a same name js file)
    node monitor_examples.js
    ```

## Resources

- https://github.com/Azure/azure-sdk-for-js