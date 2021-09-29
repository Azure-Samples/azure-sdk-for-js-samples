import {
  ApiManagementClient,
  ApiManagementServiceResource,
  ApiManagementServiceUpdateParameters,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env.SUBSCRIPTION_ID;
const credential = new DefaultAzureCredential();
const resourceGroupName = "myjstest";
const location = "eastus";
const serviceName = "myservicexxx";
let client: ApiManagementClient;

//apiManagementService.beginCreateOrUpdateAndWait
async function apiManagementService_beginCreateOrUpdateAndWait() {
  const parameter: ApiManagementServiceResource = {
    location: location,
    sku: {
      name: "Standard",
      capacity: 1,
    },
    publisherEmail: "123@microsoft.com",
    publisherName: "123",
  };
  const res = await client.apiManagementService.beginCreateOrUpdateAndWait(
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

//apiManagementService.beginUpdateAndWait
async function apiManagementService_beginUpdateAndWait() {
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
      const res = await client.apiManagementService.beginUpdateAndWait(
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

//apiManagementService.beginDeleteAndWait
async function apiManagementService_beginDeleteAndWait() {
  let count = 0;
  while (count < 20) {
    count++;
    const res = await client.apiManagementService.get(
      resourceGroupName,
      serviceName
    );
    if (res.provisioningState === "Succeeded") {
      const res = await client.apiManagementService.beginDeleteAndWait(
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
  await client.deletedServices
    .beginPurgeAndWait("myservicexxx2", location)
    .then((res) => {
      console.log(res);
    });
}

async function main() {
  client = new ApiManagementClient(credential, subscriptionId);
  await apiManagementService_beginDeleteAndWait();
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main();
