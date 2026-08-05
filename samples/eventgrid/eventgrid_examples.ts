import { DefaultAzureCredential } from "@azure/identity";
import {
  DomainUpdateParameters,
  EventGridManagementClient,
  EventSubscription,
} from "@azure/arm-eventgrid";
import {
  StorageAccountCreateParameters,
  StorageManagementClient,
} from "@azure/arm-storage";

const subscriptionId =
  process.env.SUBSCRIPTION_ID || "00000000-0000-0000-0000-000000000000";
const credential = new DefaultAzureCredential();
const resourceGroupName = "myjstest";
const location = "eastus";
const topicName = "mytopicxxx";
const eventsubscriptName = "myeventsubscriptionxxx";
const storageAccountName = "mystorageaccountxxx";
const queueName = "myqueuexxxx";
const domainName = "mydomainxxx";
let client: EventGridManagementClient;
let storage_client: StorageManagementClient;

//storageAccounts.create
//queue.create
async function createStorageAccount() {
  const parameter: StorageAccountCreateParameters = {
    sku: {
      name: "Standard_GRS",
    },
    kind: "StorageV2",
    location: "westeurope",
    encryption: {
      services: {
        file: {
          keyType: "Account",
          enabled: true,
        },
        blob: {
          keyType: "Account",
          enabled: true,
        },
      },
      keySource: "Microsoft.Storage",
    },
    tags: {
      key1: "value1",
      key2: "value2",
    },
  };
  // create storageAccounts
  const storageaccount = await storage_client.storageAccounts.create(
    resourceGroupName,
    storageAccountName,
    parameter
  );
  console.log(storageaccount);
  // create queue
  const queueCreate = await storage_client.queue.create(
    resourceGroupName,
    storageAccountName,
    queueName,
    {}
  );
  console.log(queueCreate);
}

//topics.createOrUpdate
async function topics_createOrUpdate() {
  const res = await client.topics.createOrUpdate(resourceGroupName, topicName, {
    location: "westcentralus",
  });
  console.log(res);
}

//eventSubscriptions.createOrUpdate
async function eventSubscriptions_createOrUpdate() {
  const scope =
    "/subscriptions/" +
    subscriptionId +
    "/resourceGroups/" +
    resourceGroupName +
    "/providers/Microsoft.EventGrid/topics/" +
    topicName;
  const parameter: EventSubscription = {
    destination: {
      resourceId:
        "/subscriptions/" +
        subscriptionId +
        "/resourceGroups/myjstest/providers/Microsoft.Storage/storageAccounts/mystorageaccountxxx",
      queueName: queueName,
      endpointType: "StorageQueue",
    },
    eventDeliverySchema: "CloudEventSchemaV1_0",
    retryPolicy: {
      maxDeliveryAttempts: 10,
      eventTimeToLiveInMinutes: 5,
    },
  };
  const res = await client.eventSubscriptions.createOrUpdate(
    scope,
    eventsubscriptName,
    parameter
  );
  console.log(res);
}

//eventSubscriptions.delete
async function eventSubscriptions_delete() {
  const scope =
    "/subscriptions/" +
    subscriptionId +
    "/resourceGroups/" +
    resourceGroupName +
    "/providers/Microsoft.EventGrid/topics/" +
    topicName;
  const res = await client.eventSubscriptions.delete(scope, eventsubscriptName);
  console.log(res);
}

//topics.delete
async function topics_delete() {
  const res = await client.topics.delete(resourceGroupName, topicName);
  console.log(res);
}

//domains.createOrUpdate
async function domains_createOrUpdate() {
  const res = await client.domains.createOrUpdate(
    resourceGroupName,
    domainName,
    { location: location }
  );
  console.log(res);
}

//domains.update
async function domains_update() {
  const parameter: DomainUpdateParameters = {
    tags: {
      tag1: "value1",
      tag2: "value2",
    },
  };
  const res = await client.domains.update(
    resourceGroupName,
    domainName,
    parameter
  );
  console.log(res);
}

//domains.get
async function domains_get() {
  const res = await client.domains.get(resourceGroupName, domainName);
  console.log(res);
}

//domains.listByResourceGroup
async function domains_listByResourceGroup() {
  for await (const item of client.domains.listByResourceGroup(
    resourceGroupName
  )) {
    console.log(item);
  }
}

//domains.delete
async function domains_delete() {
  const res = await client.domains.delete(resourceGroupName, domainName);
  console.log(res);
}

async function main() {
  client = new EventGridManagementClient(credential, subscriptionId);
  storage_client = new StorageManagementClient(credential, subscriptionId);
  await eventSubscriptions_createOrUpdate();
}

main();
