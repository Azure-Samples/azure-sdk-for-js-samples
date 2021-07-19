import { ApplicationClient,ApplicationDefinition,Application,ApplicationsUpdateOptionalParams } from "@azure/arm-managedapplications";
import { ResourceManagementClient } from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();

class TestApplicationById {

    private applicationClient = new ApplicationClient(credential,subscriptionId);
    private resourceClient = new ResourceManagementClient(credential,subscriptionId);
    private applicationName = "jsapplictiontest";
    private appDefinitionName = "jsapplicationDefinition";
    private resourceGroupName = "jssdktest";
    private applicationId = "/subscriptions/"+subscriptionId+"/resourceGroups/"+this.resourceGroupName+"/providers/Microsoft.Solutions/applications/"+this.applicationName;

    //resourceGroups.createOrUpdate
    public async test_resourceGroups_createOrUpdate(){
        const resourceGroup_create = await this.resourceClient.resourceGroups.createOrUpdate(this.resourceGroupName,{location: "eastus",tags: {tag1: "value1"}});
        console.log(resourceGroup_create)
    }

    //applicationDefinitions.getById
    public async test_applicationDefinitions_getById(){
        await this.applicationClient.applicationDefinitions.getById(this.resourceGroupName,this.appDefinitionName).then(
            result => {
                console.log(result);
            }
        )
    }

    //applications.getById
    public async test_applications_getById(){
        await this.applicationClient.applications.getById(this.applicationId).then(
            result =>{
                console.log(result);
            }
        )
    }

    //applications.deleteById
    public async test_applications_deleteById(){
        await this.applicationClient.applications.beginDeleteByIdAndWait(this.applicationId).then(
            result => {
                console.log(result);
            }
        )
    }

    //resourceGroups.delete
    public async test_resourceGroups_delete(){
        await this.resourceClient.resourceGroups.beginDeleteAndWait(this.resourceGroupName).then(
            result => {
                console.log(result);
            }
        )
    }
}

