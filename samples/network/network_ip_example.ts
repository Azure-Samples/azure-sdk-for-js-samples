import { DefaultAzureCredential } from "@azure/identity";
import { IpGroup, NetworkManagementClient } from "@azure/arm-network";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();
const resourceGroup = "myjstest";
const virtualnetworkName = "virtualnetworkyyy";
const ipGroupName = "ipgroupyyy";
let client: NetworkManagementClient;

//--NetworkIpExamples--

//virtualNetworks.beginCreateOrUpdateAndWait
async function virtualNetworks_beginCreateOrUpdateAndWait() {
  await client.virtualNetworks
    .beginCreateOrUpdateAndWait(resourceGroup, virtualnetworkName, {
      location: "eastus",
      addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
    })
    .then((res) => {
      console.log(res);
    });
}

//ipGroups.beginCreateOrUpdateAndWait
async function ipGroups_beginCreateOrUpdateAndWait() {
  const parameter: IpGroup = {
    tags: {
      key1: "value1",
    },
    location: "eastus",
    ipAddresses: ["13.64.39.16/32", "40.74.146.80/31", "40.74.147.32/28"],
  };
  await client.ipGroups
    .beginCreateOrUpdateAndWait(resourceGroup, ipGroupName, parameter)
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

//ipGroups.beginDeleteAndWait
async function ipGroups_beginDeleteAndWait() {
  await client.ipGroups
    .beginDeleteAndWait(resourceGroup, ipGroupName)
    .then((res) => {
      console.log(res);
    });
}

async function main() {
  client = new NetworkManagementClient(credential, subscriptionId);
  await virtualNetworks_beginCreateOrUpdateAndWait();
}

main();
