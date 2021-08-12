import {
  AvailabilitySet,
  AvailabilitySetUpdate,
  ComputeManagementClient,
} from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();
const resourceGroupName = "myjstest";
const location = "eastus";
const availabilitySetName = "availabilitySets123";
let client: ComputeManagementClient;

//availabilitySets.createOrUpdate
async function availabilitySets_createOrUpdate() {
  const body: AvailabilitySet = {
    platformFaultDomainCount: 2,
    platformUpdateDomainCount: 20,
    location: location,
  };
  await client.availabilitySets
    .createOrUpdate(resourceGroupName, availabilitySetName, body)
    .then((response: any) => {
      console.log(response);
    });
}

//availabilitySets.update
async function availabilitySets_update() {
  const body: AvailabilitySetUpdate = {
    platformFaultDomainCount: 2,
    platformUpdateDomainCount: 20,
  };
  await client.availabilitySets
    .update(resourceGroupName, availabilitySetName, body)
    .then((response: any) => {
      console.log(response);
    });
}

//availabilitySets.get
async function availabilitySets_get() {
  await client.availabilitySets
    .get(resourceGroupName, availabilitySetName)
    .then((response: any) => {
      console.log(response);
    });
}

//availabilitySets.list
async function availabilitySets_list() {
  for await (let item of client.availabilitySets.list(resourceGroupName)) {
    console.log(item);
  }
}

// availabilitySets.listAvailableSizes
async function availabilitySets_listAvailableSizes() {
  for await (let item of client.availabilitySets.listAvailableSizes(
    resourceGroupName,
    availabilitySetName
  )) {
    console.log(item);
  }
}

// availabilitySets.listBySubscription
async function availabilitySets_listBySubscription() {
  for await (let item of client.availabilitySets.listBySubscription()) {
    console.log(item);
  }
}

async function main() {
  client = new ComputeManagementClient(credential, subscriptionId);
  await availabilitySets_createOrUpdate();
}

main();
