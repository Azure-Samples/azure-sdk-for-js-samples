import { DefaultAzureCredential } from "@azure/identity";
// eslint-disable-next-line import/no-unresolved
import { SBNamespace, ServiceBusManagementClient } from "azure-arm-servicebus";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();
const resourceGroupName = "myjstest";
const location = "eastus";
const namespacesName = "mynamespacexxx";
const topicName = "mytopic";
const authorizationRuleName = "myauthorization";
const subscriptionName = "mysubscription";
const ruleName = "myrule";
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

//topics.createOrUpdate
async function topics_createOrUpdate() {
  const res = await client.topics.createOrUpdate(
    resourceGroupName,
    namespacesName,
    topicName,
    { enableExpress: true }
  );
  console.log(res);
}

//subscriptions.createOrUpdate
async function subscriptions_createOrUpdate() {
  const res = await client.subscriptions.createOrUpdate(
    resourceGroupName,
    namespacesName,
    topicName,
    subscriptionName,
    { enableBatchedOperations: true }
  );
  console.log(res);
}

//rules.createOrUpdate
async function rules_createOrUpdate() {
  const res = await client.rules.createOrUpdate(
    resourceGroupName,
    namespacesName,
    topicName,
    subscriptionName,
    ruleName,
    {}
  );
  console.log(res);
}

//subscriptions.get
async function subscriptions_get() {
  await client.subscriptions
    .get(resourceGroupName, namespacesName, topicName, subscriptionName)
    .then((res) => {
      console.log(res);
    });
}

//rules.get
async function rules_get() {
  await client.rules
    .get(
      resourceGroupName,
      namespacesName,
      topicName,
      subscriptionName,
      ruleName
    )
    .then((res) => {
      console.log(res);
    });
}

//rules.listBySubscriptions
async function rules_listBySubscriptions() {
  for await (const item of client.rules.listBySubscriptions(
    resourceGroupName,
    namespacesName,
    topicName,
    subscriptionName
  )) {
    console.log(item);
  }
}

//subscriptions.listByTopic
async function subscriptions_listByTopic() {
  for await (const item of client.subscriptions.listByTopic(
    resourceGroupName,
    namespacesName,
    topicName
  )) {
    console.log(item);
  }
}

//rules.delete
async function rules_delete() {
  await client.rules
    .delete(
      resourceGroupName,
      namespacesName,
      topicName,
      subscriptionName,
      ruleName
    )
    .then((res) => {
      console.log(res);
    });
}

//subscriptions.delete
async function subscriptions_delete() {
  await client.subscriptions
    .delete(resourceGroupName, namespacesName, topicName, subscriptionName)
    .then((res) => {
      console.log(res);
    });
}

//topics.createOrUpdateAuthorizationRule
async function topics_createOrUpdateAuthorizationRule() {
  const res = await client.topics.createOrUpdateAuthorizationRule(
    resourceGroupName,
    namespacesName,
    topicName,
    authorizationRuleName,
    { rights: ["Listen", "Send"] }
  );
  console.log(res);
}

//topics.getAuthorizationRule
async function topics_getAuthorizationRule() {
  await client.topics
    .getAuthorizationRule(
      resourceGroupName,
      namespacesName,
      topicName,
      authorizationRuleName
    )
    .then((res) => {
      console.log(res);
    });
}

//topics.listAuthorizationRules
async function topics_listAuthorizationRules() {
  for await (const item of client.topics.listAuthorizationRules(
    resourceGroupName,
    namespacesName,
    topicName
  )) {
    console.log(item);
  }
}

//topics.listByNamespace
async function topics_listByNamespace() {
  for await (const item of client.topics.listByNamespace(
    resourceGroupName,
    namespacesName
  )) {
    console.log(item);
  }
}

//topics.regenerateKeys
async function topics_regenerateKeys() {
  const res = await client.topics.regenerateKeys(
    resourceGroupName,
    namespacesName,
    topicName,
    authorizationRuleName,
    { keyType: "PrimaryKey" }
  );
  console.log(res);
}

//topics.listKeys
async function topics_listKeys() {
  await client.topics
    .listKeys(
      resourceGroupName,
      namespacesName,
      topicName,
      authorizationRuleName
    )
    .then((res) => {
      console.log(res);
    });
}

//topics.deleteAuthorizationRule
async function topics_deleteAuthorizationRule() {
  await client.topics
    .deleteAuthorizationRule(
      resourceGroupName,
      namespacesName,
      topicName,
      authorizationRuleName
    )
    .then((res) => {
      console.log(res);
    });
}

//topics.delete
async function topics_delete() {
  await client.topics
    .delete(resourceGroupName, namespacesName, topicName)
    .then((res) => {
      console.log(res);
    });
}

//namespaces.beginDeleteAndWait
async function namespaces_beginDeleteAndWait() {
  await client.namespaces
    .beginDeleteAndWait(resourceGroupName, namespacesName)
    .then((res) => {
      console.log(res);
    });
}

async function main() {
  client = new ServiceBusManagementClient(credential, subscriptionId);
  await namespaces_beginCreateOrUpdateAndWait();
}

main();
