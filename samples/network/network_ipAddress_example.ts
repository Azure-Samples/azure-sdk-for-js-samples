import { DefaultAzureCredential } from "@azure/identity";
import { NetworkManagementClient, PublicIPPrefix } from "@azure/arm-network";

const subscriptionId =
  process.env.subscriptionId || "00000000-0000-0000-0000-000000000000";
const credential = new DefaultAzureCredential();
const resourceGroup = "myjstest";
const publicIpPrefixName = "publicipprefixyyy";
const publicIpAddressName = "publicipaddressyyy";
let client: NetworkManagementClient;

//--NetworkIpAddressExamples--

//publicIPPrefixes.createOrUpdate
async function publicIPPrefixes_createOrUpdate() {
  const parameter: PublicIPPrefix = {
    location: "eastus",
    prefixLength: 30,
    sku: {
      name: "Standard",
    },
  };
  await client.publicIPPrefixes
    .createOrUpdate(resourceGroup, publicIpPrefixName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//publicIPAddresses.createOrUpdate
async function publicIPAddresses_createOrUpdate() {
  await client.publicIPAddresses
    .createOrUpdate(resourceGroup, publicIpAddressName, {
      location: "eastus",
    })
    .then((res) => {
      console.log(res);
    });
}

//publicIPAddresses.get
async function publicIPAddresses_get() {
  await client.publicIPAddresses
    .get(resourceGroup, publicIpAddressName)
    .then((res) => {
      console.log(res);
    });
}

//publicIPPrefixes.get
async function publicIPPrefixes_get() {
  await client.publicIPPrefixes
    .get(resourceGroup, publicIpPrefixName)
    .then((res) => {
      console.log(res);
    });
}

//publicIPPrefixes.list
async function publicIPPrefixes_list() {
  for await (const item of client.publicIPPrefixes.list(resourceGroup)) {
    console.log(item);
  }
}

//publicIPAddresses.list
async function publicIPAddresses_list() {
  for await (const item of client.publicIPAddresses.list(resourceGroup)) {
    console.log(item);
  }
}

//publicIPAddresses.listAll
async function publicIPAddresses_listAll() {
  for await (const item of client.publicIPAddresses.listAll()) {
    console.log(item);
  }
}

//publicIPPrefixes.listAll
async function publicIPPrefixes_listAll() {
  for await (const item of client.publicIPPrefixes.listAll()) {
    console.log(item);
  }
}

//publicIPPrefixes.updateTags
async function publicIPPrefixes_updateTags() {
  client.publicIPPrefixes
    .updateTags(resourceGroup, publicIpPrefixName, {
      tags: { tag1: "value1", tag2: "value2" },
    })
    .then((res) => {
      console.log(res);
    });
}

//publicIPAddresses.updateTags
async function publicIPAddresses_updateTags() {
  client.publicIPAddresses
    .updateTags(resourceGroup, publicIpAddressName, {
      tags: { tag1: "value1", tag2: "value2" },
    })
    .then((res) => {
      console.log(res);
    });
}

//publicIPAddresses.delete
async function publicIPAddresses_delete() {
  client.publicIPAddresses
    .delete(resourceGroup, publicIpAddressName)
    .then((res) => {
      console.log(res);
    });
}

//publicIPPrefixes.delete
async function publicIPPrefixes_delete() {
  client.publicIPPrefixes
    .delete(resourceGroup, publicIpPrefixName)
    .then((res) => {
      console.log(res);
    });
}

async function main() {
  client = new NetworkManagementClient(credential, subscriptionId);
  await publicIPPrefixes_createOrUpdate();
}

main();
