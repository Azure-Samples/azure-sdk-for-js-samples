import { ComputeManagementClient,DedicatedHostGroup,DedicatedHost,DedicatedHostGroupUpdate,DedicatedHostUpdate } from "@azure/arm-compute";
import {DefaultAzureCredential} from "@azure/identity";
import { ResourceManagementClient } from "@azure/arm-resources";

/*
cover options:
    dedicatedHostGroups:
    dedicatedHosts:

*/
var subscriptionId = process.env.subscriptionId;
var credential = new DefaultAzureCredential();

class Test_dedicatedHostGroups{

    private compute_client = new ComputeManagementClient(credential, subscriptionId);
    private resource_client = new ResourceManagementClient(credential, subscriptionId);
    private resourceName = "zsgtest";
    private host_group_name = "hostgroup";
    private host_name = "hosname";

    //resource_groups_createOrUpdate
    private resource_groups_createOrUpdate(){
        this.resource_client.resourceGroups.createOrUpdate(this.resourceName,{location:"eastus"})
    }

    //dedicatedHostGroups.createOrUpdate
    public async test_HostGroups_createOrUpdate(){
        const parameter:DedicatedHostGroup = {
            location: "eastus",
            tags: {
                ["department"]: "finance"
            },
            zones: [
                "1"
            ],
            platformFaultDomainCount: 3
        };
        await this.compute_client.dedicatedHostGroups.createOrUpdate(this.resourceName,this.host_group_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    //dedicatedHosts.createOrUpdate
    public async test_createOrUpdate(){
        const parameter:DedicatedHost = {
            location: "eastus",
            tags: {
                ["department"]: "HR"
            },
            platformFaultDomain: 1,
            sku: {
                name: "DSv3-Type1"
            }
        };
        await this.compute_client.dedicatedHosts.createOrUpdate(this.resourceName,this.host_group_name,this.host_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    //HostGroups.get
    public async test_HostGroups_get(){
        await this.compute_client.dedicatedHostGroups.get(this.resourceName,this.host_group_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //dedicatedHosts.get
    public async test_get(){
        await this.compute_client.dedicatedHosts.get(this.resourceName,this.host_group_name,this.host_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //dedicatedHostGroups.listByResourceGroup
    public async test_HostGroups_listByResourceGroup(){
        await this.compute_client.dedicatedHostGroups.listByResourceGroup(this.resourceName).then(
            response => {
                console.log(response)
            }
        )
    }

    //dedicatedHosts.listByHostGroup
    public async test_listByResourceGroup(){
        await this.compute_client.dedicatedHosts.listByHostGroup(this.resourceName,this.host_group_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //HostGroups.listBySubscription
    public async test_HostGroups_listBySubscription(){
        await this.compute_client.dedicatedHostGroups.listBySubscription().then(
            response => {
                console.log(response)
            }
        )
    }

    //dedicatedHostGroups.update
    public async test_HostGroups_update(){
        const parameter:DedicatedHostGroupUpdate = {
            tags: {
                ["department"]: "finance"
            },
            platformFaultDomainCount: 3
        };
        await this.compute_client.dedicatedHostGroups.update(this.resourceName,this.host_group_name,parameter)
    }

    //dedicatedHosts.update
    public async test_update(){
        const parameter:DedicatedHostUpdate = {
            tags: {
                ["department"]: "HR"
            }
        };
        await this.compute_client.dedicatedHosts.update(this.resourceName,this.host_group_name,this.host_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }


    //dedicatedHosts.delete
    public async test_delete(){
        await this.compute_client.dedicatedHosts.delete(this.resourceName,this.host_group_name,this.host_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //HostGroups.delete
    public async test_HostGroups_delete(){
        await this.compute_client.dedicatedHostGroups.delete(this.resourceName,this.host_group_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //resourceGroups.delete
    private async delete_resource_group(){
        await this.resource_client.resourceGroups.delete(this.resourceName).then(
            resposne => {
                console.log(resposne)
            }
        )
    }
}