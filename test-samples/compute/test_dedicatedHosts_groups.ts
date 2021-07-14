import * as compute from "azure-arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import { ResourceManagementClient } from "azure-arm-resources";


var subscriptionId = process.env.subscriptionId;
var credential = new DefaultAzureCredential();

class Test_dedicatedHostGroups{

    private compute_client = new compute.ComputeManagementClient(credential, subscriptionId);
    private resource_client = new ResourceManagementClient(credential, subscriptionId);
    private resourceGroupName = "qiaozhatest";
    private host_group_name = "hostgroup";
    private host_name = "hosname";

    //resource_groups_createOrUpdate
    private resource_groups_createOrUpdate(){
        this.resource_client.resourceGroups.createOrUpdate(this.resourceGroupName,{location:"eastus"})
    }

    //dedicatedHostGroups.createOrUpdate
    public async dedicatedHostGroups_createOrUpdate(){
        const parameter:compute.DedicatedHostGroup = {
            location: "eastus",
            tags: {
                ["department"]: "finance"
            },
            zones: [
                "1"
            ],
            platformFaultDomainCount: 3
        };
        await this.compute_client.dedicatedHostGroups.createOrUpdate(this.resourceGroupName,this.host_group_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    //dedicatedHostGroups.get
    public async dedicatedHostGroups_get(){
        await this.compute_client.dedicatedHostGroups.get(this.resourceGroupName,this.host_group_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //dedicatedHostGroups.listByResourceGroup
    public async dedicatedHostGroups_listByResourceGroup(){
        for await (let item of this.compute_client.dedicatedHostGroups.listByResourceGroup(this.resourceGroupName)){
            console.log(item);
        }
    }

    //HostGroups.listBySubscription
    public async dedicatedHostGroups_listBySubscription(){
        for await (let item of this.compute_client.dedicatedHostGroups.listBySubscription()){
            console.log(item);
        }
    }

    //dedicatedHostGroups.update
    public async dedicatedHostGroups_update(){
        const parameter:compute.DedicatedHostGroupUpdate = {
            tags: {
                ["department"]: "finance"
            },
            platformFaultDomainCount: 3
        };
        await this.compute_client.dedicatedHostGroups.update(this.resourceGroupName,this.host_group_name,parameter).then(
            result => {
                console.log(result);
            }
        )
    }

    //dedicatedHosts.createOrUpdate
    public async dedicatedHosts_createOrUpdate(){
        const parameter:compute.DedicatedHost = {
            location: "eastus",
            tags: {
                ["department"]: "HR"
            },
            platformFaultDomain: 1,
            sku: {
                name: "DSv3-Type1"
            }
        };
        await this.compute_client.dedicatedHosts.beginCreateOrUpdateAndWait(this.resourceGroupName,this.host_group_name,this.host_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    //dedicatedHosts.get
    public async dedicatedHosts_get(){
        await this.compute_client.dedicatedHosts.get(this.resourceGroupName,this.host_group_name,this.host_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //dedicatedHosts.listByHostGroup
    public async dedicatedHosts_listByHostGroup(){
       for await (let item of this.compute_client.dedicatedHosts.listByHostGroup(this.resourceGroupName,this.host_group_name)){
           console.log(item);
       }
    }

    //dedicatedHosts.update
    public async dedicatedHosts_update(){
        const parameter:compute.DedicatedHostUpdate = {
            tags: {
                ["department"]: "HR"
            }
        };
        await this.compute_client.dedicatedHosts.beginUpdateAndWait(this.resourceGroupName,this.host_group_name,this.host_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    //dedicatedHosts.delete
    public async dedicatedHosts_delete(){
        await this.compute_client.dedicatedHosts.beginDeleteAndWait(this.resourceGroupName,this.host_group_name,this.host_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //HostGroups.delete
    public async dedicatedHostGroups_delete(){
        await this.compute_client.dedicatedHostGroups.delete(this.resourceGroupName,this.host_group_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //resourceGroups.delete
    private async delete_resourceGroups(){
        await this.resource_client.resourceGroups.beginDeleteAndWait(this.resourceGroupName).then(
            resposne => {
                console.log(resposne)
            }
        )
    }
}

// const t = new Test_dedicatedHostGroups();
// t.dedicatedHostGroups_delete();
