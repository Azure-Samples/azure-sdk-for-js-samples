import {
  ContainerRegistryManagementClient,
  Registry,
  ScopeMap,
  ScopeMapUpdateParameters,
  WebhookCreateParameters,
  WebhookUpdateParameters,
} from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId =
  process.env.SUBSCRIPTION_ID || "00000000-0000-0000-0000-000000000000";
const credential = new DefaultAzureCredential();
const location = "westus";
const resourceGroup = "myjstest";
const registryName = "myregistryxxxyy";
const replicationName = "myreplicationxxx";
const webhookName = "mywebhookxxx";
const scopeMapName = "myscopemapxxx";
let client: ContainerRegistryManagementClient;

//replications.create
async function replications_create() {
  const res = await client.replications.create(
    resourceGroup,
    registryName,
    replicationName,
    { location: location, tags: { key: "value" } }
  );
  console.log(res);
}

//replications.get
async function replications_get() {
  const res = await client.replications.get(
    resourceGroup,
    registryName,
    replicationName
  );
  console.log(res);
}

//replications.list
async function replications_list() {
  for await (const item of client.replications.list(
    resourceGroup,
    registryName
  )) {
    console.log(item);
  }
}

//replications.update
async function replications_update() {
  const res = await client.replications.update(
    resourceGroup,
    registryName,
    replicationName,
    { tags: { key: "value" } }
  );
  console.log(res);
}

//replications.delete
async function replications_delete() {
  const res = await client.replications.delete(
    resourceGroup,
    registryName,
    replicationName
  );
  console.log(res);
}

//webhooks.create
async function webhooks_create() {
  const parameter: WebhookCreateParameters = {
    location: location,
    serviceUri: "http://www.microsoft.com",
    status: "enabled",
    actions: ["push"],
  };
  const res = await client.webhooks.create(
    resourceGroup,
    registryName,
    webhookName,
    parameter
  );
  console.log(res);
}

//webhooks.get
async function webhooks_get() {
  const res = await client.webhooks.get(
    resourceGroup,
    registryName,
    webhookName
  );
  console.log(res);
}

//webhooks.list
async function webhooks_list() {
  for await (const item of client.webhooks.list(resourceGroup, registryName)) {
    console.log(item);
  }
}

//webhooks.getCallbackConfig
async function webhooks_getCallbackConfig() {
  const res = await client.webhooks.getCallbackConfig(
    resourceGroup,
    registryName,
    webhookName
  );
  console.log(res);
}

//webhooks.listEvents
async function webhooks_listEvents() {
  for await (const item of client.webhooks.listEvents(
    resourceGroup,
    registryName,
    webhookName
  )) {
    console.log(item);
  }
}

//webhooks.ping
async function webhooks_ping() {
  const res = await client.webhooks.ping(
    resourceGroup,
    registryName,
    webhookName
  );
  console.log(res);
}

//webhooks.update
async function webhooks_update() {
  const parameter: WebhookUpdateParameters = {
    serviceUri: "http://www.microsoft.com",
    status: "enabled",
    actions: ["push"],
  };
  const res = await client.webhooks.update(
    resourceGroup,
    registryName,
    webhookName,
    parameter
  );
  console.log(res);
}

//webhooks.delete
async function webhooks_delete() {
  const res = await client.webhooks.delete(
    resourceGroup,
    registryName,
    webhookName
  );
  console.log(res);
}

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

//scopeMaps.create
async function scopeMaps_create() {
  const parameter: ScopeMap = {
    description: "Developer Scopes",
    actions: [
      "repositories/foo/content/read",
      "repositories/foo/content/delete",
    ],
  };
  const res = await client.scopeMaps.create(
    resourceGroup,
    registryName,
    scopeMapName,
    parameter
  );
  console.log(res);
}

//scopeMaps.get
async function scopeMaps_get() {
  const res = await client.scopeMaps.get(
    resourceGroup,
    registryName,
    scopeMapName
  );
  console.log(res);
}

//scopeMaps.list
async function scopeMaps_list() {
  for await (const item of client.scopeMaps.list(resourceGroup, scopeMapName)) {
    console.log(item);
  }
}

//scopeMaps.update
async function scopeMaps_update() {
  const parameter: ScopeMapUpdateParameters = {
    description: "Developer Scopes",
    actions: [
      "repositories/foo/content/read",
      "repositories/foo/content/delete",
    ],
  };
  const res = await client.scopeMaps.update(
    resourceGroup,
    registryName,
    scopeMapName,
    parameter
  );
  console.log(res);
}

//scopeMaps.delete
async function scopeMaps_delete() {
  const res = await client.scopeMaps.delete(
    resourceGroup,
    registryName,
    scopeMapName
  );
  console.log(res);
}

//registries.delete
async function registries_delete() {
  const res = await client.registries.delete(resourceGroup, registryName);
  console.log(res);
}

async function main() {
  client = new ContainerRegistryManagementClient(credential, subscriptionId);
  await registries_delete();
}

main();
