import { DefaultAzureCredential } from "@azure/identity";
// eslint-disable-next-line import/no-unresolved
import { SBNamespace, ServiceBusManagementClient } from "azure-arm-servicebus";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();
const resourceGroupName = "myjstest";
const location = "eastus";
const namespacesName = "mynamespacexxx";
const authorizationRuleName = "myAuthoriztionRule";
const queueName = "myQueue";
let client: ServiceBusManagementClient;

//namespaces.beginCreateOrUpdateAndWait
async function namespaces_beginCreateOrUpdateAndWait() {
  const parameter: SBNamespace = {
    sku: {
      name: "Standard",
      tier: "Standard",
    },
    location: location,
    tags: {
      tag1: "value1",
      tag2: "value2",
    },
  };
  const res = await client.namespaces.beginCreateOrUpdateAndWait(
    resourceGroupName,
    namespacesName,
    parameter
  );
  console.log(res);
}

//queues.createOrUpdate
async function queues_createOrUpdate() {
  const res = await client.queues.createOrUpdate(
    resourceGroupName,
    namespacesName,
    queueName,
    { enablePartitioning: true }
  );
  console.log(res);
}

//queues.createOrUpdateAuthorizationRule
async function queues_createOrUpdateAuthorizationRule() {
  const res = await client.queues.createOrUpdateAuthorizationRule(
    resourceGroupName,
    namespacesName,
    queueName,
    authorizationRuleName,
    { rights: ["Listen", "Send"] }
  );
  console.log(res);
}

//queues.getAuthorizationRule
async function queues_getAuthorizationRule() {
  const res = await client.queues.getAuthorizationRule(
    resourceGroupName,
    namespacesName,
    queueName,
    authorizationRuleName
  );
  console.log(res);
}

//queues.listAuthorizationRules
async function queues_listAuthorizationRules() {
  for await (const item of client.queues.listAuthorizationRules(
    resourceGroupName,
    namespacesName,
    queueName
  )) {
    console.log(item);
  }
}

//queues.get
async function queues_get() {
  const res = await client.queues.get(
    resourceGroupName,
    namespacesName,
    queueName
  );
  console.log(res);
}

//queues.listByNamespace
async function queues_listByNamespace() {
  for await (const item of client.queues.listByNamespace(
    resourceGroupName,
    namespacesName
  )) {
    console.log(item);
  }
}

//queues.regenerateKeys
async function queues_regenerateKeys() {
  const res = await client.queues.regenerateKeys(
    resourceGroupName,
    namespacesName,
    queueName,
    authorizationRuleName,
    { keyType: "PrimaryKey" }
  );
  console.log(res);
}

//queues.listKeys
async function queues_listKeys() {
  await client.queues
    .listKeys(
      resourceGroupName,
      namespacesName,
      queueName,
      authorizationRuleName
    )
    .then((res) => {
      console.log(res);
    });
}

//queues.deleteAuthorizationRule
async function queues_deleteAuthorizationRule() {
  const res = await client.queues.deleteAuthorizationRule(
    resourceGroupName,
    namespacesName,
    queueName,
    authorizationRuleName
  );
  console.log(res);
}

//queues.delete
async function queues_delete() {
  const res = await client.queues.delete(
    resourceGroupName,
    namespacesName,
    queueName
  );
  console.log(res);
}

//namespaces.beginDeleteAndWait
async function namespaces_beginDeleteAndWait() {
  const res = await client.namespaces.beginDeleteAndWait(
    resourceGroupName,
    namespacesName
  );
  console.log(res);
}

async function main() {
  client = new ServiceBusManagementClient(credential, subscriptionId);
  await namespaces_beginCreateOrUpdateAndWait();
}

main();
