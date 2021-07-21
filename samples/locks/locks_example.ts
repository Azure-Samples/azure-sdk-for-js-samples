import { ManagementLockClient } from "@azure/arm-locks";
import { ResourceManagementClient,GenericResource } from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();

class LocksAtSubscriptionLevelExamples {

    private lockClient = new ManagementLockClient(credential,subscriptionId);
    private lockName = "jslockrg";

    //managementLocks.createOrUpdateAtSubscriptionLevel
    public async managementLocks_createOrUpdateAtSubscriptionLevel(){
        const result_create = await this.lockClient.managementLocks.createOrUpdateAtSubscriptionLevel(this.lockName,{level: "CanNotDelete"});
        console.log(result_create);
        // console.assert(result_create != null);
    }

    //managementLocks.getAtSubscriptionLevel
    public async managementLocks_getAtSubscriptionLevel(){
        await this.lockClient.managementLocks.getAtSubscriptionLevel(this.lockName).then(
            result => {
                console.log(result);
            }
        )
    }

    //managementLocks.listAtSubscriptionLevel
    public async managementLocks_listAtSubscriptionLevel(){
        for await (let item of this.lockClient.managementLocks.listAtSubscriptionLevel()){
            console.log(item);
        }
    }

    //managementLocks.deleteAtSubscriptionLevel
    public async managementLocks_deleteAtSubscriptionLevel(){
        const delete_result = await this.lockClient.managementLocks.deleteAtSubscriptionLevel(this.lockName);
        console.log(delete_result); // { body: undefined }
    }
}

class LocksByScopeExamples {

    private lockClient = new ManagementLockClient(credential,subscriptionId);
    private resourceClient = new ResourceManagementClient(credential,subscriptionId);
    private lockName = "jslockrg";
    private resourceGroupName = "myjstest";
    private resourceName = "myjsresourcetest";
    private resourceId = "/subscriptions/"+subscriptionId+"/resourceGroups/"+ this.resourceGroupName +"/providers/Microsoft.Compute/availabilitySets/"+this.resourceName;

    //resources.createOrUpdateById 
    public async resources_createOrUpdateById(){
        const parameter: GenericResource = {
            location: "eastus"
        };
        await this.resourceClient.resources.beginCreateOrUpdateByIdAndWait(this.resourceId,"2019-07-01",parameter).then(
            result => {
                console.log(result);
            }
        )
    }

    //managementLocks.createOrUpdateByScope
    public async managementLocks_createOrUpdateByScope(){
        const lock_create = await this.lockClient.managementLocks.createOrUpdateByScope(this.resourceId,this.lockName,{level: "CanNotDelete"});
        console.log(lock_create);
    }

    //managementLocks.getByScope
    public async managementLocks_getByScope(){
        await this.lockClient.managementLocks.getByScope(this.resourceId,this.lockName).then(
            result => {
                console.log(result);
            }
        )
    }

    //managementLocks.listByScope
    public async managementLocks_listByScope(){
        for await (let item of this.lockClient.managementLocks.listByScope(this.resourceId)){
            console.log(item)
        }
    }

    //managementLocks.deleteByScope
    public async managementLocks_deleteByScope(){
        await this.lockClient.managementLocks.deleteByScope(this.resourceId,this.lockName).then(
            result => {
                console.log(result); // { body: undefined }
            }
        )
    }

    //resources.deleteById 
    public async resources_deleteById(){
        await this.resourceClient.resources.beginDeleteByIdAndWait(this.resourceId,"2019-07-01").then(
            result => {
                console.log(result);
            }
        )
    }
}

class LocksAtResourceLevelExamples {

    private lockClient = new ManagementLockClient(credential,subscriptionId);
    private resourceClient = new ResourceManagementClient(credential,subscriptionId);
    private lockName = "jslockrg";
    private resourceGroupName = "myjstest";
    private resourceName = "myjsresourcetest";

    //resources.createOrUpdate 
    public async resources_createOrUpdate(){
        const create_result = await this.resourceClient.resources.beginCreateOrUpdateAndWait(this.resourceGroupName,"Microsoft.Compute","","availabilitySets",this.resourceName,"2019-07-01",{location: "eastus"});
        console.log(create_result);
    }

    //managementLocks.createOrUpdateAtResourceLevel
    public async managementLocks_createOrUpdateAtResourceLevel(){
        const lock_create = await this.lockClient.managementLocks.createOrUpdateAtResourceLevel(this.resourceGroupName,"Microsoft.Compute","","availabilitySets",this.resourceName,this.lockName,{level: "CanNotDelete"});
        console.log(lock_create);
        console.assert(lock_create != null);
    }

    //managementLocks.getAtResourceLevel
    public async managementLocks_getAtResourceLevel(){
        await this.lockClient.managementLocks.getAtResourceLevel(this.resourceGroupName,"Microsoft.Compute","","availabilitySets",this.resourceName,this.lockName).then(
            result => {
                console.log(result);
            }
        )
    }

    //managementLocks.listAtResourceLevel
    public async managementLocks_listAtResourceLevel(){
        const arrayList = new Array();
        for await (let item of this.lockClient.managementLocks.listAtResourceLevel(this.resourceGroupName,"Microsoft.Compute","","availabilitySets",this.resourceName)){
            arrayList.push(item);
            // console.log(item);
        }
        console.assert(arrayList.length == 1);
    }

    //managementLocks.deleteAtResourceLevel
    public async managementLocks_deleteAtResourceLevel(){
        await this.lockClient.managementLocks.deleteAtResourceLevel(this.resourceGroupName,"Microsoft.Compute","","availabilitySets",this.resourceName,this.lockName).then(
            result => {
                console.log(result); // { body: undefined }
            }
        )
    }

    //resources.delete 
    public async resources_delete(){
        await this.resourceClient.resources.beginDeleteAndWait(this.resourceGroupName,"Microsoft.Compute","","availabilitySets",this.resourceName,"2019-07-01").then(
            result => {
                console.log(result);
            }
        )
    }

}

class LocksAtResourceGruopLevelExamples {

    private lockClient = new ManagementLockClient(credential,subscriptionId);
    private resourceGroupName = "myjstest";
    private lockName = "jslockrg";

    //managementLocks.createOrUpdateAtResourceGroupLevel
    public async managementLocks_createOrUpdateAtResourceGroupLevel(){
        const lock = await this.lockClient.managementLocks.createOrUpdateAtResourceGroupLevel(this.resourceGroupName,this.lockName,{level: "CanNotDelete"});
        // console.log(lock);
        console.assert(lock != null);
    }

    //managementLocks.getAtResourceGroupLevel
    public async managementLocks_getAtResourceGroupLevel(){
        await this.lockClient.managementLocks.getAtResourceGroupLevel(this.resourceGroupName,this.lockName).then(
            result => {
                console.log(result);
            }
        )
    }

    //managementLocks.listAtResourceGroupLevel
    public async managementLocks_listAtResourceGroupLevel(){
        const arrayList = new Array();
        for await (let item of this.lockClient.managementLocks.listAtResourceGroupLevel(this.resourceGroupName)){
            arrayList.push(item);
            // console.log(item);
        }
        console.assert(arrayList.length == 1);
    }

    //managementLocks.deleteAtResourceGroupLevel
    public async managementLocks_deleteAtResourceGroupLevel(){
        await this.lockClient.managementLocks.deleteAtResourceGroupLevel(this.resourceGroupName,this.lockName).then(
            result => {
                console.log(result); //{ body: undefined }
            }
        )
    }

    //authorizationOperations.list
    public async authorizationOperations_list(){
        for await (let item of this.lockClient.authorizationOperations.list()){
            console.log(item);
            // could not be found in the namespace 'Microsoft.Authorization' for api version '2016-09-01'.
            // The supported api-versions are '2014-06-01,2014-10-01-preview,2015-01-01,2015-07-01,2016-07-01,2017-05-01'."}}
        }
    }
}

