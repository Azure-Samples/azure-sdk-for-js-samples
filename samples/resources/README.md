---
page_type: sample
languages:
- javaScript
- typescript
products:
- azure
description: "These code samples will show you how to manage Resources using Azure SDK for Typescript."
urlFragment: resources
---

# Getting started - Managing Resources using Azure Typescript SDK

These code samples will show you how to manage Resources using Azure SDK for Typescript.

## Features

This project framework provides examples for the following services:

### Resources
* Using the Azure SDK for JavaScript/Typescript - Resources Management Library [@azure/arm-resources](https://www.npmjs.com/package/@azure/arm-resources) for the [Azure Resources API](https://docs.microsoft.com/en-us/rest/api/resources/)


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
    cd azure-samples-js-management/samples/resources
    npm i -g typescript
    npm install
    ```

## Demo

A demo app is included to show how to use the project.

To run the complete demo, you need to instantiate a class,and use it to call the methods you want to test in this class 

    ```
    const resources = new TagsOperationExamples()
    resources.tags_createOrUpdate()
    ```

execute below command on terminal

    ```
    tsc resources_example.ts (it will create a same name js file)
    node resources_example.js
    ```

## Resources

- https://github.com/Azure/azure-sdk-for-js