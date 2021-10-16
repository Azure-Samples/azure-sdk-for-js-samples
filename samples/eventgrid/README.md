---
page_type: sample
languages:
- javascript
- typescript
products:
- azure
description: "These code samples will show you how to manage Eventgrid using Azure SDK for JavaScript/TypeScript."
urlFragment: eventgrid
---

# Getting started - Managing Eventgrid using Azure JavaScript/TypeScript SDK

These code samples will show you how to manage Eventgrid using Azure SDK for JavaScript/TypeScript.

## Features

This project framework provides examples for the following services:

### Eventgrid
* Using the Azure SDK for JavaScript/TypeScript - Eventgrid Management Library [@azure/arm-eventgrid](https://www.npmjs.com/package/@azure/arm-eventgrid) for the [Azure Eventgrid API](https://docs.microsoft.com/en-us/rest/api/eventgrid/)


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
    cd azure-samples-js-management/samples/eventgrid
    npm i -g typescript
    npm install
    ```

## Demo

A demo app is included to show how to use the project.

To run the complete demo, you need to call the methods you want to test in this main method.

    ```
    async function main() {
        client = new EventGridManagementClient(credential, subscriptionId);
        storage_client = new StorageManagementClient(credential, subscriptionId);
        await eventSubscriptions_beginCreateOrUpdateAndWait();
    }
    ```

execute below command on terminal

    ```
    tsc Eventgrid_examples.ts (it will create a same name js file)
    node Eventgrid_examples.js
    ```

## Resources

- https://github.com/Azure/azure-sdk-for-js
