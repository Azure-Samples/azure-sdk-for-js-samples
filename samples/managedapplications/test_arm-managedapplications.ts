import { ApplicationClient,ApplicationDefinition,Application,ApplicationsUpdateOptionalParams } from "@azure/arm-managedapplications";
import { ResourceManagementClient } from "@azure/arm-resources";
import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();

class TestApplicationById {

    private applicationClient = new ApplicationClient(credential,subscriptionId);
    private resourceClient = new ResourceManagementClient(credential,subscriptionId);
    private managementGroupsAPI = new ManagementGroupsAPI(credential);
    private groupName = " test_js_group";
    private applicationName = "jsapplictiontest";
    private appDefinitionName = "jsapplicationDefinition";
    private resourceGroupName = "jssdktest";
    private applicationDefinitionId = "/subscriptions/" + subscriptionId +"/resourceGroups/"+this.resourceGroupName+"/providers/Microsoft.Solutions/applicationDefinitions/"+this.appDefinitionName;
    private applicationId = "/subscriptions/"+subscriptionId+"/resourceGroups/"+this.resourceGroupName+"/providers/Microsoft.Solutions/applications/"+this.applicationName;
    
    //resourceGroups.createOrUpdate
    public async test_resourceGroups_createOrUpdate(){
        const resourceGroup_create = await this.resourceClient.resourceGroups.createOrUpdate(this.resourceGroupName,{location: "eastus",tags: {tag1: "value1"}});
        console.log(resourceGroup_create)
    }

    //managementGroups.createOrUpdate
    public async test_managementGroups_createOrUpdate(){
        const group_id = "20000000-0001-0000-0000-000000000123";
        await this.managementGroupsAPI.managementGroups.createOrUpdate(group_id,{name: group_id}).then(
            result => {
                console.log(result);
            }
        )
    }

    //applicationDefinitions.createOrUpdateById
    public async test_applicationDefinitions_createOrUpdateById(){
        const parameter:ApplicationDefinition = {
            lockLevel: "None",
            displayName: "jsManageApplication",
            description: "jsManageApplication description",
            authorizations: [

            ],
            packageFileUri: "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/101-managed-application-with-linked-templates/artifacts/ManagedAppZip/pkg.zip",
            location: "East US"
        };
        await this.applicationClient.applicationDefinitions.createOrUpdateById(this.resourceGroupName,this.appDefinitionName,parameter).then(
            result => {
                console.log(result);
            }
        )
    }

    //applicationDefinitions.getById
    public async test_applicationDefinitions_getById(){
        await this.applicationClient.applicationDefinitions.getById(this.resourceGroupName,this.appDefinitionName).then(
            result => {
                console.log(result);
            }
        )
    }

    //applications.createOrUpdateById
    public async test_applications_createOrUpdateById(){
        const parameter:Application = {
            applicationDefinitionId: this.applicationDefinitionId,
            managedResourceGroupId: "/subscriptions/" + subscriptionId + "/resourceGroups/myManagedRG" + this.groupName,
            location: "East US",
            kind: "ServiceCatalog"
        };
        await this.applicationClient.applications.createOrUpdateById(this.applicationId,parameter).then(
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

    //applications.updateById
    public async test_applications_updateById(){
        const parameter:Application = {
            managedResourceGroupId: "/subscriptions/" + subscriptionId + "/resourceGroups/myManagedRG" + this.groupName,
            kind: "ServiceCatalog"
        };
        try{
            await this.applicationClient.applications.updateById(this.applicationId,parameter).then(
                result => {
                    console.log(result);
                }
            )
        }catch(error){
            console.log(error)
        }
    }

    //applications.deleteById
    public async test_applications_deleteById(){
        await this.applicationClient.applications.deleteById(this.applicationId).then(
            result => {
                console.log(result);
            }
        )
    }

    //applicationDefinitions.deleteById
    public async test_applicationDefinitions_deleteById(){
        await this.applicationClient.applicationDefinitions.deleteById(this.resourceGroupName,this.appDefinitionName).then(
            result => {
                console.log(result);
            }
        )
    }

    //resourceGroups.delete
    public async test_resourceGroups_delete(){
        await this.resourceClient.resourceGroups.delete(this.resourceGroupName).then(
            result => {
                console.log(result);
            }
        )
    }
}

class TestApplication {

    private applicationClient = new ApplicationClient(credential,subscriptionId);
    private resourceClient = new ResourceManagementClient(credential,subscriptionId);
    private managementGroupsAPI = new ManagementGroupsAPI(credential);
    private groupName = " test_js_group";
    private applicationName = "jsapplictiontest";
    private appDefinitionName = "jsapplicationDefinition";
    private resourceGroupName = "jssdktest";
    
    //resourceGroups.createOrUpdate
    public async test_resourceGroups_createOrUpdate(){
        const resourceGroup_create = await this.resourceClient.resourceGroups.createOrUpdate(this.groupName,{location: "eastus",tags: {tag1: "value1"}});
        console.log(resourceGroup_create)
    }

    //applicationDefinitions.createOrUpdate
    public async test_applicationDefinitions_createOrUpdate(){
        const parameter:ApplicationDefinition = {
            lockLevel: "None",
            displayName: "jsManageApplication",
            description: "jsManageApplication description",
            authorizations: [

            ],
            packageFileUri: "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/101-managed-application-with-linked-templates/artifacts/ManagedAppZip/pkg.zip",
            location: "East US"
        };
        await this.applicationClient.applicationDefinitions.createOrUpdate(this.resourceGroupName,this.appDefinitionName,parameter).then(
            result => {
                console.log(result);
            }
        )
    }

    //applicationDefinitions.get
    public async test_applicationDefinitions_get(){
        await this.applicationClient.applicationDefinitions.get(this.resourceGroupName,this.appDefinitionName).then(
            result => {
                console.log(result);
            }
        )
    }

    //applicationDefinitions.listByResourceGroup
    public async test_applicationDefinitions_listByResourceGroup(){
        for await (let item of this.applicationClient.applicationDefinitions.listByResourceGroup(this.resourceGroupName)){
            console.log(item);
        }
    }

    //applications.createOrUpdate
    public async test_applications_createOrUpdate(){
        const parameter:Application = {
            applicationDefinitionId: "/subscriptions/" + subscriptionId +"/resourceGroups/"+this.resourceGroupName+"/providers/Microsoft.Solutions/applicationDefinitions/"+this.appDefinitionName,
            managedResourceGroupId: "/subscriptions/" + subscriptionId + "/resourceGroups/myManagedRG" + this.groupName,
            location: "East US",
            kind: "ServiceCatalog"
        };
        await this.applicationClient.applications.createOrUpdate(this.resourceGroupName,this.applicationName,parameter).then(
            result => {
                console.log(result);
            }
        )
    }

    //applications.get
    public async test_applications_get(){
        await this.applicationClient.applications.get(this.resourceGroupName,this.applicationName).then(
            result => {
                console.log(result);
            }
        )
    }

    //applications.update
    public async test_applications_update(){
        const parameter:ApplicationsUpdateOptionalParams = {
            parameters: {
                managedResourceGroupId: "/subscriptions/" + subscriptionId + "/resourceGroups/myManagedRG" + this.groupName,
                kind: "ServiceCatalog"
            }
        };
        try{
            const result_update = await this.applicationClient.applications.update(this.resourceGroupName,this.applicationName,parameter);
            console.log(result_update);
        }catch(error){
            console.log(error);
        }
    }

    //applications.listByResourceGroup
    public async test_applications_listByResourceGroup(){
        for await (let item of this.applicationClient.applications.listByResourceGroup(this.resourceGroupName)){
            console.log(item);
        }
    }

    //applications.listBySubscription
    public async test_applications_listBySubscription(){
        for await (let item of this.applicationClient.applications.listBySubscription()){
            console.log(item);
        }
    }

    //applications.delete
    public async test_applications_delete(){
        await this.applicationClient.applications.delete(this.resourceGroupName,this.applicationName).then(
            result => {
                console.log(result);
            }
        )
    }

    //applicationDefinitions.delete
    public async test_applicationDefinitions_delete(){
        await this.applicationClient.applicationDefinitions.delete(this.resourceGroupName,this.applicationName).then(
            result => {
                console.log(result);
            }
        )
    }

    //resourceGroups.delete
    public async test_resourceGroups_delete(){
        await this.resourceClient.resourceGroups.delete(this.groupName).then(
            result =>{
                console.log(result);
            }
        )
    }
}