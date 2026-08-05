import {
  ContainerRegistryManagementClient,
  ExportPipeline,
  ImportPipeline,
  Registry,
} from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env.SUBSCRIPTION_ID || "00000000-0000-0000-0000-000000000000";
const credential = new DefaultAzureCredential();
const location = "eastus";
const resourceGroup = "myjstest";
const registryName = "myregistryxxxyy";
const importPipelineName = "myimportpipelinexxx";
const exportPipelineName = "myexportpipelinexxx";
let client: ContainerRegistryManagementClient;

//registries.create
async function registries_create() {
  const parameter: Registry = {
    location: location,
    tags: {
      key: "value",
    },
    sku: {
      name: "Premium",
    },
    adminUserEnabled: false,
  };
  const res = await client.registries.create(
    resourceGroup,
    registryName,
    parameter
  );
  console.log(res);
}

//importPipelines.create
async function importPipelines_create() {
  const parameter: ImportPipeline = {
    location: location,
    identity: {
      type: "SystemAssigned",
    },
    source: {
      type: "AzureStorageBlobContainer",
      uri: "https://accountname.blob.core.windows.net/containername",
      keyVaultUri: "https://myvault.vault.azure.net/secrets/acrimportsas",
    },
    options: ["OverwriteTags", "DeleteSourceBlobOnSuccess", "ContinueOnErrors"],
  };
  const res = await client.importPipelines.create(
    resourceGroup,
    registryName,
    importPipelineName,
    parameter
  );
  console.log(res);
}

//exportPipelines.create
async function exportPipelines_create() {
  const parameter: ExportPipeline = {
    location: location,
    identity: {
      type: "SystemAssigned",
    },
    target: {
      type: "AzureStorageBlobContainer",
      uri: "https://accountname.blob.core.windows.net/containername",
      keyVaultUri: "https://myvault.vault.azure.net/secrets/acrexportsas",
    },
    options: ["OverwriteBlobs"],
  };
  const res = await client.exportPipelines.create(
    resourceGroup,
    registryName,
    exportPipelineName,
    parameter
  );
  console.log(res);
}

//importPipelines.get
async function importPipelines_get() {
  const res = await client.importPipelines.get(
    resourceGroup,
    registryName,
    importPipelineName
  );
  console.log(res);
}

//exportPipelines.get
async function exportPipelines_get() {
  const res = await client.exportPipelines.get(
    resourceGroup,
    registryName,
    exportPipelineName
  );
  console.log(res);
}

//importPipelines.list
async function importPipelines_list() {
  for await (const item of client.importPipelines.list(
    resourceGroup,
    registryName
  )) {
    console.log(item);
  }
}

//exportPipelines.list
async function exportPipelines_list() {
  for await (const item of client.exportPipelines.list(
    resourceGroup,
    registryName
  )) {
    console.log(item);
  }
}

//importPipelines.delete
async function importPipelines_delete() {
  const res = await client.importPipelines.delete(
    resourceGroup,
    registryName,
    importPipelineName
  );
  console.log(res);
}

//exportPipelines.delete
async function exportPipelines_delete() {
  const res = await client.exportPipelines.delete(
    resourceGroup,
    registryName,
    exportPipelineName
  );
  console.log(res);
}

//registries.create
async function registries_Create() {
  const resDelete = await client.registries.delete(
    resourceGroup,
    registryName
  );
  const parameter: Registry = {
    location: location,
    tags: {
      key: "value",
    },
    sku: {
      name: "Standard",
    },
    adminUserEnabled: true,
  };
  const resCreate = await client.registries.create(
    resourceGroup,
    registryName,
    parameter
  );
}

//registries.delete
async function registries_delete() {
  const res = await client.registries.delete(
    resourceGroup,
    registryName
  );
  console.log(res);
}

async function main() {
  client = new ContainerRegistryManagementClient(credential, subscriptionId);
  await registries_delete();
}

main();
