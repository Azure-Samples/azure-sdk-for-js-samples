import { DefaultAzureCredential } from "@azure/identity";
import { IpGroup, NetworkManagementClient } from "@azure/arm-network";

const subscriptionId =
  process.env.subscriptionId || "00000000-0000-0000-0000-000000000000";
const credential = new DefaultAzureCredential();
const resourceGroup = "myjstest";
const virtualnetworkName = "virtualnetworkyyy";
const ipGroupName = "ipgroupyyy";
let client: NetworkManagementClient;

//--NetworkIpExamples--

//virtualNetworks.createOrUpdate
async function virtualNetworks_createOrUpdate() {
  await client.virtualNetworks
    .createOrUpdate(resourceGroup, virtualnetworkName, {
      location: "eastus",
      addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
    })
    .then((res) => {
      console.log(res);
    });
}

//ipGroups.createOrUpdate
async function ipGroups_createOrUpdate() {
  const parameter: IpGroup = {
    tags: {
      key1: "value1",
    },
    location: "eastus",
    ipAddresses: ["13.64.39.16/32", "40.74.146.80/31", "40.74.147.32/28"],
  };
  await client.ipGroups
    .createOrUpdate(resourceGroup, ipGroupName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//ipGroups.get
async function ipGroups_get() {
  await client.ipGroups.get(resourceGroup, ipGroupName).then((res) => {
    console.log(res);
  });
}

//ipGroups.listByResourceGroup
async function ipGroups_listByResourceGroup() {
  for await (const item of client.ipGroups.listByResourceGroup(resourceGroup)) {
    console.log(item);
  }
}

//ipGroups.list
async function ipGroups_list() {
  for await (const item of client.ipGroups.list()) {
    console.log(item);
  }
}

//ipGroups.delete
async function ipGroups_delete() {
  await client.ipGroups.delete(resourceGroup, ipGroupName).then((res) => {
    console.log(res);
  });
}

async function main() {
  client = new NetworkManagementClient(credential, subscriptionId);
  await virtualNetworks_createOrUpdate();
}

main();
