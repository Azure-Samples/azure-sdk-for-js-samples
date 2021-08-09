import { ApplicationClient } from "@azure/arm-managedapplications";
import { ResourceManagementClient } from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();
const applicationName = "jsapplictiontest";
const resourceGroupName = "jssdktest";
const appDefinitionName = "jsapplicationDefinition";
const applicationId = "/subscriptions/"+subscriptionId+"/resourceGroups/"+resourceGroupName+"/providers/Microsoft.Solutions/applications/"+applicationName;
let applicationClient: ApplicationClient;
let resourceClient: ResourceManagementClient;


//--ApplicationByIdExamples--

//applicationDefinitions.getById
async function applicationDefinitions_getById(){
    await applicationClient.applicationDefinitions.getById(resourceGroupName,appDefinitionName).then(
        result => {
            console.log(result);
        }
    )
}

//applications.getById
async function applications_getById(){
    await applicationClient.applications.getById(applicationId).then(
        result =>{
            console.log(result);
        }
    )
}

//applications.deleteById
async function applications_deleteById(){
    await applicationClient.applications.beginDeleteByIdAndWait(applicationId).then(
        result => {
            console.log(result);
        }
    )
}

async function main() {
    applicationClient = new ApplicationClient(credential, subscriptionId);
    resourceClient = new ResourceManagementClient(credential,subscriptionId);
    await applicationDefinitions_getById();
}

main();
