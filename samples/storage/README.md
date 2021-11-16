---
page_type: sample
languages:
- javascript
- typescript
products:
- azure
description: "These code samples will show you how to manage Storage using Azure SDK for JavaScript/TypeScript."
urlFragment: storage
---

# Getting started - Managing Storage using Azure JavaScript/TypeScript SDK

These code samples will show you how to manage Storage using Azure SDK for JavaScript/TypeScript.

## Features

This project framework provides examples for the following services:

### Storage
* Using the Azure SDK for JavaScript/TypeScript - Storage Management Library [@azure/arm-storage](https://www.npmjs.com/package/@azure/arm-storage) for the [Azure Storage API](https://docs.microsoft.com/en-us/rest/api/storagerp/)


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
    cd azure-samples-js-management/samples/storage
    npm i -g typescript
    npm install
    ```

## Demo

A demo app is included to show how to use the project.

To run the complete demo, you need to call the methods you want to test in main method. 

    ```
    async function main() {
        client = new StorageManagementClient(credential, subscriptionId);
        network_client = new NetworkManagementClient(credential,subscriptionId);
        await storageAccounts_beginCreateAndWait();
    }
    ```

execute below command on terminal

    ```
    tsc storage_example.ts (it will create a same name js file)
    node storage_example.js
    ```

## Resources

- https://github.com/Azure/azure-sdk-for-js
