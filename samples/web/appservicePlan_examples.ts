import { AppServicePlan, WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();
const resourceGroup = "myjstest";
const name = "mynamezzz";
let client: WebSiteManagementClient;

//--AppservicePlanExamples--

//appServicePlans.beginCreateOrUpdateAndWait
async function appServicePlans_beginCreateOrUpdateAndWait() {
  const parameter: AppServicePlan = {
    kind: "app",
    location: "eastus",
    sku: {
      name: "P1",
      tier: "Premium",
      size: "P1",
      family: "P",
      capacity: 1,
    },
  };
  await client.appServicePlans
    .beginCreateOrUpdateAndWait(resourceGroup, name, parameter)
    .then((res) => {
      console.log(res);
    });
}

//appServicePlans.get
async function appServicePlans_get() {
  await client.appServicePlans.get(resourceGroup, name).then((res) => {
    console.log(res);
  });
}

//appServicePlans.listByResourceGroup
async function appServicePlans_listByResourceGroup() {
  for await (const item of client.appServicePlans.listByResourceGroup(
    resourceGroup
  )) {
    console.log(item);
  }
}

//appServicePlans.list
async function appServicePlans_list() {
  for await (const item of client.appServicePlans.list()) {
    console.log(item);
  }
}

//appServicePlans.update
async function appServicePlans_update() {
  await client.appServicePlans
    .update(resourceGroup, name, { kind: "app" })
    .then((res) => {
      console.log(res);
    });
}

//appServicePlans.delete
async function appServicePlans_delete() {
  await client.appServicePlans.delete(resourceGroup, name).then((res) => {
    console.log(res);
  });
}

async function main() {
  client = new WebSiteManagementClient(credential, subscriptionId);
  await appServicePlans_beginCreateOrUpdateAndWait();
}

main();
