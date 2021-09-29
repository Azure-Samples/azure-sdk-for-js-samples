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

const subscriptionId = process.env.SUBSCRIPTION_ID;
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

//storageAccounts.beginCreateAndWait
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
  const storageaccount = await storage_client.storageAccounts.beginCreateAndWait(
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

//topics.beginCreateOrUpdateAndWait
async function topics_beginCreateOrUpdateAndWait() {
  const res = await client.topics.beginCreateOrUpdateAndWait(
    resourceGroupName,
    topicName,
    { location: "westcentralus" }
  );
  console.log(res);
}

//eventSubscriptions.beginCreateOrUpdateAndWait
async function eventSubscriptions_beginCreateOrUpdateAndWait() {
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
  const res = await client.eventSubscriptions.beginCreateOrUpdateAndWait(
    scope,
    eventsubscriptName,
    parameter
  );
  console.log(res);
}

//eventSubscriptions.beginDeleteAndWait
async function eventSubscriptions_beginDeleteAndWait() {
  const scope =
    "/subscriptions/" +
    subscriptionId +
    "/resourceGroups/" +
    resourceGroupName +
    "/providers/Microsoft.EventGrid/topics/" +
    topicName;
  const res = await client.eventSubscriptions.beginDeleteAndWait(
    scope,
    eventsubscriptName
  );
  console.log(res);
}

//topics.beginDeleteAndWait
async function topics_beginDeleteAndWait() {
  const res = client.topics.beginDeleteAndWait(resourceGroupName, topicName);
  console.log(res);
}

//domains.beginCreateOrUpdateAndWait
async function domains_beginCreateOrUpdateAndWait() {
  const res = await client.domains.beginCreateOrUpdateAndWait(
    resourceGroupName,
    domainName,
    { location: location }
  );
  console.log(res);
}

//domains.beginUpdateAndWait
async function domains_beginUpdateAndWait() {
  const parameter: DomainUpdateParameters = {
    tags: {
      tag1: "value1",
      tag2: "value2",
    },
  };
  const res = await client.domains.beginUpdateAndWait(
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

//domains.beginDeleteAndWait
async function domains_beginDeleteAndWait() {
  const res = await client.domains.beginDeleteAndWait(
    resourceGroupName,
    domainName
  );
  console.log(res);
}

async function main() {
  client = new EventGridManagementClient(credential, subscriptionId);
  storage_client = new StorageManagementClient(credential, subscriptionId);
  await eventSubscriptions_beginCreateOrUpdateAndWait();
}

main();
