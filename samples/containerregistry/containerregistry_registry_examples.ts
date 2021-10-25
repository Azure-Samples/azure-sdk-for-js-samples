import {
  AgentPool,
  ContainerRegistryManagementClient,
  Registry,
  ScopeMap,
  ScopeMapUpdateParameters,
  WebhookCreateParameters,
  WebhookUpdateParameters,
} from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env.SUBSCRIPTION_ID;
const credential = new DefaultAzureCredential();
const location = "westus";
const resourceGroup = "myjstest";
const registryName = "myregistryxxxyy";
const replicationName = "myreplicationxxx";
const webhookName = "mywebhookxxx";
const agentPoolName = "myagentpollxxx";
const scopeMapName = "myscopemapxxx";
let client: ContainerRegistryManagementClient;

//registries.beginCreateAndWait for replications
async function registries_beginCreateAndWaitForReplications() {
  const parameter: Registry = {
    location: location,
    tags: {
      key: "value",
    },
    sku: {
      name: "Premium",
    },
    adminUserEnabled: true,
  };
  const res = await client.registries.beginCreateAndWait(
    resourceGroup,
    registryName,
    parameter
  );
  console.log(res);
}

//replications.beginCreateAndWait
async function replications_beginCreateAndWait() {
  const res = await client.replications.beginCreateAndWait(
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

//replications.beginUpdateAndWait
async function replications_beginUpdateAndWait() {
  const res = await client.replications.beginUpdateAndWait(
    resourceGroup,
    registryName,
    replicationName,
    { tags: { key: "value" } }
  );
  console.log(res);
}

//replications.beginDeleteAndWait
async function replications_beginDeleteAndWait() {
  const res = await client.replications.beginDeleteAndWait(
    resourceGroup,
    registryName,
    replicationName
  );
  console.log(res);
}

//registries.beginDeleteAndWait
async function registries_beginDeleteAndWaitForReplications() {
  const res = await client.registries.beginDeleteAndWait(
    resourceGroup,
    registryName
  );
  console.log(res);
}

//registries.beginCreateAndWait for webhooks
async function registries_beginCreateAndWaitForWebhooks() {
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
  const res = await client.registries.beginCreateAndWait(
    resourceGroup,
    registryName,
    parameter
  );
  console.log(res);
}

//webhooks.beginCreateAndWait
async function webhooks_beginCreateAndWait() {
  const parameter: WebhookCreateParameters = {
    location: location,
    serviceUri: "http://www.microsoft.com",
    status: "enabled",
    actions: ["push"],
  };
  const res = await client.webhooks.beginCreateAndWait(
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

//webhooks.beginUpdateAndWait
async function webhooks_beginUpdateAndWait() {
  const parameter: WebhookUpdateParameters = {
    serviceUri: "http://www.microsoft.com",
    status: "enabled",
    actions: ["push"],
  };
  const res = await client.webhooks.beginUpdateAndWait(
    resourceGroup,
    registryName,
    webhookName,
    parameter
  );
  console.log(res);
}

//webhooks.beginDeleteAndWait
async function webhooks_beginDeleteAndWait() {
  const res = await client.webhooks.beginDeleteAndWait(
    resourceGroup,
    registryName,
    webhookName
  );
  console.log(res);
}

//registries.beginDeleteAndWait
async function registries_beginDeleteAndWaitForWebhooks() {
  const res = await client.registries.beginDeleteAndWait(
    resourceGroup,
    registryName
  );
  console.log(res);
}

//registries.beginCreateAndWait for agentPools
async function registries_beginCreateAndWaitForAgentPools() {
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
  const res = await client.registries.beginCreateAndWait(
    resourceGroup,
    registryName,
    parameter
  );
  console.log(res);
}

//agentPools.beginCreateAndWait
async function agentPools_beginCreateAndWait() {
  const parameter: AgentPool = {
    location: location,
    tags: {
      key: "value",
    },
    count: 1,
    tier: "S1",
    os: "Linux",
  };
  const res = await client.agentPools.beginCreateAndWait(
    resourceGroup,
    registryName,
    agentPoolName,
    parameter
  );
  console.log(res);
}

//agentPools.get
async function agentPools_get() {
  const res = await client.agentPools.get(
    resourceGroup,
    registryName,
    agentPoolName
  );
  console.log(res);
}

//agentPools.list
async function agentPools_list() {
  for await (const item of client.agentPools.list(
    resourceGroup,
    registryName
  )) {
    console.log(item);
  }
}

//agentPools.getQueueStatus
async function agentPools_getQueueStatus() {
  const res = await client.agentPools.getQueueStatus(
    resourceGroup,
    registryName,
    agentPoolName
  );
  console.log(res);
}

//agentPools.beginUpdateAndWait
async function agentPools_beginUpdateAndWait() {
  const res = await client.agentPools.beginUpdateAndWait(
    resourceGroup,
    registryName,
    agentPoolName,
    { count: 1 }
  );
  console.log(res);
}

//agentPools.beginDeleteAndWait
async function agentPools_beginDeleteAndWait() {
  const res = await client.agentPools.beginDeleteAndWait(
    resourceGroup,
    registryName,
    agentPoolName
  );
  console.log(res);
}

//scopeMaps.beginCreateAndWait
async function scopeMaps_beginCreateAndWait() {
  const parameter: ScopeMap = {
    description: "Developer Scopes",
    actions: [
      "repositories/foo/content/read",
      "repositories/foo/content/delete",
    ],
  };
  const res = await client.scopeMaps.beginCreateAndWait(
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

//scopeMaps.beginUpdateAndWait
async function scopeMaps_beginUpdateAndWait() {
  const parameter: ScopeMapUpdateParameters = {
    description: "Developer Scopes",
    actions: [
      "repositories/foo/content/read",
      "repositories/foo/content/delete",
    ],
  };
  const res = await client.scopeMaps.beginUpdateAndWait(
    resourceGroup,
    registryName,
    scopeMapName,
    parameter
  );
  console.log(res);
}

//scopeMaps.beginDeleteAndWait
async function scopeMaps_beginDeleteAndWait() {
  const res = await client.scopeMaps.beginDeleteAndWait(
    resourceGroup,
    registryName,
    scopeMapName
  );
  console.log(res);
}

//registries.beginDeleteAndWait
async function registries_beginDeleteAndWaitForAgentPools() {
  const res = await client.registries.beginDeleteAndWait(
    resourceGroup,
    registryName
  );
  console.log(res);
}
