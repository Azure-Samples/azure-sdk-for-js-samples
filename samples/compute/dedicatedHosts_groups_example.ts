import { ComputeManagementClient,DedicatedHostGroup,DedicatedHostGroupUpdate,DedicatedHost,DedicatedHostUpdate } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();
const resourceGroupName = "myjstest";
const location = "eastus";
const host_group_name = "hostgroup";
const host_name = "hosname";
let client: ComputeManagementClient;

//--dedicatedHostGroupsExamples--

//dedicatedHostGroups.createOrUpdate
async function dedicatedHostGroups_createOrUpdate(){
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
    await client.dedicatedHostGroups.createOrUpdate(resourceGroupName,host_group_name,parameter).then(
        response => {
            console.log(response)
        }
    )
}

//dedicatedHostGroups.get
async function dedicatedHostGroups_get(){
    await client.dedicatedHostGroups.get(resourceGroupName,host_group_name).then(
        response => {
            console.log(response)
        }
    )
}

//dedicatedHostGroups.listByResourceGroup
async function dedicatedHostGroups_listByResourceGroup(){
    for await (let item of client.dedicatedHostGroups.listByResourceGroup(resourceGroupName)){
        console.log(item);
    }
}

//HostGroups.listBySubscription
async function dedicatedHostGroups_listBySubscription(){
    for await (let item of client.dedicatedHostGroups.listBySubscription()){
        console.log(item);
    }
}

//dedicatedHostGroups.update
async function dedicatedHostGroups_update(){
    const parameter:DedicatedHostGroupUpdate = {
        tags: {
            ["department"]: "finance"
        },
        platformFaultDomainCount: 3
    };
    await client.dedicatedHostGroups.update(resourceGroupName,host_group_name,parameter).then(
        result => {
            console.log(result);
        }
    )
}

//dedicatedHosts.createOrUpdate
async function dedicatedHosts_createOrUpdate(){
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
    await client.dedicatedHosts.beginCreateOrUpdateAndWait(resourceGroupName,host_group_name,host_name,parameter).then(
        response => {
            console.log(response)
        }
    )
}

//dedicatedHosts.get
async function dedicatedHosts_get(){
    await client.dedicatedHosts.get(resourceGroupName,host_group_name,host_name).then(
        response => {
            console.log(response)
        }
    )
}

//dedicatedHosts.listByHostGroup
async function dedicatedHosts_listByHostGroup(){
    for await (let item of client.dedicatedHosts.listByHostGroup(resourceGroupName,host_group_name)){
        console.log(item);
    }
}

//dedicatedHosts.update
async function dedicatedHosts_update(){
    const parameter:DedicatedHostUpdate = {
        tags: {
            ["department"]: "HR"
        }
    };
    await client.dedicatedHosts.beginUpdateAndWait(resourceGroupName,host_group_name,host_name,parameter).then(
        response => {
            console.log(response)
        }
    )
}

//dedicatedHosts.delete
async function dedicatedHosts_delete(){
    await client.dedicatedHosts.beginDeleteAndWait(resourceGroupName,host_group_name,host_name).then(
        response => {
            console.log(response)
        }
    )
}

//HostGroups.delete
async function dedicatedHostGroups_delete(){
    await client.dedicatedHostGroups.delete(resourceGroupName,host_group_name).then(
        response => {
            console.log(response)
        }
    )
}

async function main() {
    client = new ComputeManagementClient(credential, subscriptionId);
    await dedicatedHostGroups_createOrUpdate();
}

main();


