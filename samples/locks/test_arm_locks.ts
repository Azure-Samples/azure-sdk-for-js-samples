import { ManagementLockClient } from "@azure/arm-locks";
import { ResourceManagementClient,GenericResource } from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();

class TestLocksAtSubscriptionLevel {

    private lockClient = new ManagementLockClient(credential,subscriptionId);
    private lockName = "jslockrg";

    //managementLocks.createOrUpdateAtSubscriptionLevel
    public async test_managementLocks_createOrUpdateAtSubscriptionLevel(){
        const result_create = await this.lockClient.managementLocks.createOrUpdateAtSubscriptionLevel(this.lockName,{level: "CanNotDelete"});
        // console.log(result_create);
        console.assert(result_create != null);
    }

    //managementLocks.getAtSubscriptionLevel
    public async test_managementLocks_getAtSubscriptionLevel(){
        await this.lockClient.managementLocks.getAtSubscriptionLevel(this.lockName).then(
            result => {
                console.log(result);
            }
        )
    }

    //managementLocks.listAtSubscriptionLevel
    public async test_managementLocks_listAtSubscriptionLevel(){
        for await (let item of this.lockClient.managementLocks.listAtSubscriptionLevel()){
            console.log(item);
        }
    }

    //managementLocks.deleteAtSubscriptionLevel
    public async test_managementLocks_deleteAtSubscriptionLevel(){
        const delete_result = await this.lockClient.managementLocks.deleteAtSubscriptionLevel(this.lockName);
        console.log(delete_result); // { body: undefined }
    }
}

class TestLocksByScope {

    private lockClient = new ManagementLockClient(credential,subscriptionId);
    private resourceClient = new ResourceManagementClient(credential,subscriptionId);
    private lockName = "jslockrg";
    private resourceGroupName = "qiaozhatest";
    private resourceName = "myjsresourcetest";
    private resourceId = "/subscriptions/"+subscriptionId+"/resourceGroups/"+ this.resourceGroupName +"/providers/Microsoft.Compute/availabilitySets/"+this.resourceName;

    //resources.createOrUpdateById (LRO)
    public async test_resources_createOrUpdateById(){
        const parameter: GenericResource = {
            location: "eastus"
        };
        await this.resourceClient.resources.createOrUpdateById(this.resourceId,"2019-07-01",parameter).then(
            result => {
                console.log(result);
            }
        )
    }
    
    //managementLocks.createOrUpdateByScope
    public async test_managementLocks_createOrUpdateByScope(){
        const lock_create = await this.lockClient.managementLocks.createOrUpdateByScope(this.resourceId,this.lockName,{level: "CanNotDelete"});
        console.log(lock_create);
    }

    //managementLocks.getByScope
    public async test_managementLocks_getByScope(){
        await this.lockClient.managementLocks.getByScope(this.resourceId,this.lockName).then(
            result => {
                console.log(result);
            }
        )
    }

    //managementLocks.listByScope
    public async test_managementLocks_listByScope(){
        for await (let item of this.lockClient.managementLocks.listByScope(this.resourceId)){
            console.log(item)
        }
    }

    //managementLocks.deleteByScope
    public async test_managementLocks_deleteByScope(){
        await this.lockClient.managementLocks.deleteByScope(this.resourceId,this.lockName).then(
            result => {
                console.log(result); // { body: undefined }
            }
        )
    }

    //resources.deleteById  (LRO)
    public async test_resources_deleteById(){
        await this.resourceClient.resources.deleteById(this.resourceId,"2019-07-01").then(
            result => {
                console.log(result);
            }
        )
    }
}

class TestLocksAtResourceLevel {

    private lockClient = new ManagementLockClient(credential,subscriptionId);
    private resourceClient = new ResourceManagementClient(credential,subscriptionId);
    private lockName = "jslockrg";
    private resourceGroupName = "qiaozhatest";
    private resourceName = "myjsresourcetest";

    //resources.createOrUpdate (LRO)
    public async test_resources_createOrUpdate(){
        const create_result = await this.resourceClient.resources.createOrUpdate(this.resourceGroupName,"Microsoft.Compute","","availabilitySets",this.resourceName,"2019-07-01",{location: "eastus"});
        console.log(create_result);
    }

    //managementLocks.createOrUpdateAtResourceLevel
    public async test_managementLocks_createOrUpdateAtResourceLevel(){
        const lock_create = await this.lockClient.managementLocks.createOrUpdateAtResourceLevel(this.resourceGroupName,"Microsoft.Compute","","availabilitySets",this.resourceName,this.lockName,{level: "CanNotDelete"});
        console.log(lock_create);
        console.assert(lock_create != null);
    }

    //managementLocks.getAtResourceLevel
    public async test_managementLocks_getAtResourceLevel(){
        await this.lockClient.managementLocks.getAtResourceLevel(this.resourceGroupName,"Microsoft.Compute","","availabilitySets",this.resourceName,this.lockName).then(
            result => {
                console.log(result);
            }
        )
    }

    //managementLocks.listAtResourceLevel
    public async test_managementLocks_listAtResourceLevel(){
        const arrayList = new Array();
        for await (let item of this.lockClient.managementLocks.listAtResourceLevel(this.resourceGroupName,"Microsoft.Compute","","availabilitySets",this.resourceName)){
            arrayList.push(item);
            // console.log(item);
        }
        console.assert(arrayList.length == 1);
    }

    //managementLocks.deleteAtResourceLevel
    public async test_managementLocks_deleteAtResourceLevel(){
        await this.lockClient.managementLocks.deleteAtResourceLevel(this.resourceGroupName,"Microsoft.Compute","","availabilitySets",this.resourceName,this.lockName).then(
            result => {
                console.log(result); // { body: undefined }
            }
        )
    }

    //resources.delete (LRO)
    public async test_resources_delete(){
        await this.resourceClient.resources.delete(this.resourceGroupName,"Microsoft.Compute","","availabilitySets",this.resourceName,"2019-07-01").then(
            result => {
                console.log(result);
            }
        )
    }
}

class TestLocksAtResourceGruopLevel {

    private lockClient = new ManagementLockClient(credential,subscriptionId);
    private resourceGroupName = "qiaozhatest";
    private lockName = "jslockrg";

    //managementLocks.createOrUpdateAtResourceGroupLevel
    public async test_managementLocks_createOrUpdateAtResourceGroupLevel(){
        const lock = await this.lockClient.managementLocks.createOrUpdateAtResourceGroupLevel(this.resourceGroupName,this.lockName,{level: "CanNotDelete"});
        // console.log(lock);
        console.assert(lock != null);
    }

    //managementLocks.getAtResourceGroupLevel
    public async test_managementLocks_getAtResourceGroupLevel(){
        await this.lockClient.managementLocks.getAtResourceGroupLevel(this.resourceGroupName,this.lockName).then(
            result => {
                console.log(result);
            }
        )
    }
    
    //managementLocks.listAtResourceGroupLevel
    public async test_managementLocks_listAtResourceGroupLevel(){
        const arrayList = new Array();
        for await (let item of this.lockClient.managementLocks.listAtResourceGroupLevel(this.resourceGroupName)){
            arrayList.push(item);
            // console.log(item);
        }
        console.assert(arrayList.length == 1);
    }

    //managementLocks.deleteAtResourceGroupLevel
    public async test_managementLocks_deleteAtResourceGroupLevel(){
        await this.lockClient.managementLocks.deleteAtResourceGroupLevel(this.resourceGroupName,this.lockName).then(
            result => {
                console.log(result); //{ body: undefined }
            }
        )
    }

    //authorizationOperations.list
    public async test_authorizationOperations_list(){
        for await (let item of this.lockClient.authorizationOperations.list()){
            console.log(item);
            // could not be found in the namespace 'Microsoft.Authorization' for api version '2016-09-01'.
            // The supported api-versions are '2014-06-01,2014-10-01-preview,2015-01-01,2015-07-01,2016-07-01,2017-05-01'."}}
        }
    }
}
// const tk = new TestLocksAtResourceGruopLevel();
// tk.test_authorizationOperations_list();