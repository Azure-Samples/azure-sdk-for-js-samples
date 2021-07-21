---
page_type: sample
languages:
- typescript
products:
- azure
description: "These code samples will show you how to manage Managedapplications using Azure SDK for Typescript."
urlFragment: managedapplications
---

# Getting started - Managing Managedapplications using Azure typescript SDK

These code samples will show you how to manage Managedapplications using Azure SDK for Typescript.

## Features

This project framework provides examples for the following services:

### Managedapplications
* Using the Azure SDK for Typescript - Managedapplications Management Library [@azure/arm-managedapplications](https://www.npmjs.com/package/@azure/arm-managedapplications) for the [Azure Resources API](https://docs.microsoft.com/en-us/rest/api/resources/)


### Installation

1.  Before using the sdk packgae,we need [install nodejs](https://nodejs.org/en/download/) and add it into environment variables.

    ```
    nodejs version: 14.16.0
    ```
### Quickstart

1.  Clone the repository.

    ```
    git clone https://github.com/Azure-Samples/azure-samples-js-management
    ```

2.  Install the dependencies using npm.

    ```
    cd azure-samples-js-management/samples/managedapplications
    npm i -g typescript@4.1.3
    npm install
    ```

## Demo

A demo app is included to show how to use the project.

To run the complete demo, you need to instantiate a class,and use it to call that you want test methods in this class 

    ```
    const managedapplications = new ApplicationByIdExamples()
    managedapplications.test_applicationDefinitions_getById()
    ```

execute below command on terminal

    ```
    tsc managedapplications_example.ts (it will create a same name js file)
    node managedapplications_example.js
    ```

## Resources

- https://github.com/Azure/azure-sdk-for-js