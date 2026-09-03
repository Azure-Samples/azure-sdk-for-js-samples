import {
  ApiManagementClient,
  ApiManagementServiceResource,
  ApiManagementServiceUpdateParameters,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId =
  process.env.SUBSCRIPTION_ID || "00000000-0000-0000-0000-000000000000";
const credential = new DefaultAzureCredential();
const resourceGroupName = "myjstest";
const location = "eastus";
const serviceName = "myservicexxx";
let client: ApiManagementClient;

//apiManagementService.createOrUpdate
async function apiManagementService_createOrUpdate() {
  const parameter: ApiManagementServiceResource = {
    location: location,
    sku: {
      name: "Standard",
      capacity: 1,
    },
    publisherEmail: "123@microsoft.com",
    publisherName: "123",
  };
  const res = await client.apiManagementService.createOrUpdate(
    resourceGroupName,
    serviceName,
    parameter
  );
  console.log(res);
}

//apiManagementService.get
async function apiManagementService_get() {
  const res = await client.apiManagementService.get(
    resourceGroupName,
    serviceName
  );
  console.log(res);
}

//apiManagementService.listByResourceGroup
async function apiManagementService_listByResourceGroup() {
  for await (const item of client.apiManagementService.list()) {
    console.log(item);
  }
}

//apiManagementService.update
async function apiManagementService_update() {
  let count = 0;
  while (count < 20) {
    count++;
    const res = await client.apiManagementService.get(
      resourceGroupName,
      serviceName
    );
    if (res.provisioningState === "Succeeded") {
      const parameter: ApiManagementServiceUpdateParameters = {
        customProperties: {
          "Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Protocols.Tls10":
            "false",
        },
      };
      const res = await client.apiManagementService.update(
        resourceGroupName,
        serviceName,
        parameter
      );
      console.log(res);
      break;
    } else {
      // it's in activating
      await sleep(300000);
    }
  }
}

//apiManagementService.delete
async function apiManagementService_delete() {
  let count = 0;
  while (count < 20) {
    count++;
    const res = await client.apiManagementService.get(
      resourceGroupName,
      serviceName
    );
    if (res.provisioningState === "Succeeded") {
      const res = await client.apiManagementService.delete(
        resourceGroupName,
        serviceName
      );
      console.log(res);
      break;
    } else {
      // it's in activating
      await sleep(300000);
    }
  }
  //soft-delete purge
  await client.deletedServices.purge("myservicexxx2", location).then((res) => {
    console.log(res);
  });
}

async function main() {
  client = new ApiManagementClient(credential, subscriptionId);
  await apiManagementService_delete();
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main();
