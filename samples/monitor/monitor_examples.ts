import { DefaultAzureCredential } from "@azure/identity";
import { EventHubManagementClient } from "@azure/arm-eventhub";
import { LogicManagementClient } from "@azure/arm-logic";
import { MonitorClient } from "@azure/arm-monitor";
import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { StorageManagementClient } from "@azure/arm-storage";

const subscriptionId = process.env.SUBSCRIPTION_ID;
const credential = new DefaultAzureCredential();
const location = "westus";
const resourceGroup = "myjstest";
const diagnosticName = "mydiagnosticxxx";
const workflowName = "myworkflowxxx";
const storageAccountName = "mystorageaccountxxxyy";
const namespaceName = "mynamespacexxx";
const eventhubName = "myeventhubxxx";
const workspaceName = "myworkspacexxx";
const authorizationRuleName = "myauthorizationRulexxx";
const logProfileName = "mylogProfilexxx";
let client: MonitorClient;
let logic_client: LogicManagementClient;
let storage_client: StorageManagementClient;
let eventhub_client: EventHubManagementClient;
let op_client: OperationalInsightsManagementClient;

//workflows.createOrUpdate
async function workflows_createOrUpdate() {
  const res = await logic_client.workflows.createOrUpdate(
    resourceGroup,
    workflowName,
    {
      location: location,
      definition: {
        $schema:
          "https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#",
        contentVersion: "1.0.0.0",
        parameters: {},
        triggers: {},
        actions: {},
        outputs: {},
      },
    }
  );
  console.log(res);
  return res;
}

// storageAccounts.beginCreateAndWait
async function storageAccounts_beginCreateAndWait() {
  const storageaccount = await storage_client.storageAccounts.beginCreateAndWait(
    resourceGroup,
    storageAccountName,
    {
      sku: {
        name: "Standard_GRS",
      },
      kind: "StorageV2",
      location: "westus",
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
    }
  );
  console.log(storageaccount);

  //blobContainers.create
  // const container = await storage_client.blobContainers.create(resourceGroup,storageAccountName,containerName,{});

  return storageaccount;
}

//authorization.create
async function eventHubs_createOrUpdateAuthorizationRule() {
  //namespaces.beginCreateOrUpdateAndWait
  const namespaces = await eventhub_client.namespaces.beginCreateOrUpdateAndWait(
    resourceGroup,
    namespaceName,
    {
      sku: {
        name: "Standard",
        tier: "Standard",
      },
      location: location,
      tags: {
        tag1: "value1",
        tag2: "value2",
      },
    }
  );
  //namespaces.createOrUpdateAuthorizationRule
  const authorization = await eventhub_client.namespaces.createOrUpdateAuthorizationRule(
    resourceGroup,
    namespaceName,
    authorizationRuleName,
    { rights: ["Listen", "Send", "Manage"] }
  );
  //eventHubs.createOrUpdate
  const eventhub = await eventhub_client.eventHubs.createOrUpdate(
    resourceGroup,
    namespaceName,
    eventhubName,
    {
      messageRetentionInDays: 4,
      partitionCount: 4,
      status: "Active",
      captureDescription: {
        enabled: true,
        encoding: "Avro",
        intervalInSeconds: 120,
        sizeLimitInBytes: 10485763,
        destination: {
          name: "EventHubArchive.AzureBlockBlob",
          storageAccountResourceId:
            "/subscriptions/" +
            subscriptionId +
            "/resourceGroups/" +
            resourceGroup +
            "/providers/Microsoft.Storage/storageAccounts/" +
            storageAccountName,
          blobContainer: "container",
          archiveNameFormat:
            "{Namespace}/{EventHub}/{PartitionId}/{Year}/{Month}/{Day}/{Hour}/{Minute}/{Second}",
        },
      },
    }
  );
  console.log(authorization);
  return authorization;
}

//workspaces.beginCreateOrUpdateAndWait
async function workspaces_beginCreateOrUpdateAndWait() {
  const res = await op_client.workspaces.beginCreateOrUpdateAndWait(
    resourceGroup,
    workspaceName,
    {
      sku: {
        name: "PerNode",
      },
      retentionInDays: 30,
      location: location,
      tags: {
        tag1: "value1",
      },
    }
  );
  console.log(res);
  return res;
}

//diagnosticSettings.createOrUpdate
async function diagnosticSettings_createOrUpdate() {
  const resourUrl = await workflows_createOrUpdate();
  const storageAccount = await storageAccounts_beginCreateAndWait();
  const authorization = await eventHubs_createOrUpdateAuthorizationRule();
  const workspace = await workspaces_beginCreateOrUpdateAndWait();
  const res = await client.diagnosticSettings.createOrUpdate(
    resourUrl.id,
    diagnosticName,
    {
      storageAccountId: storageAccount.id,
      workspaceId: workspace.id,
      eventHubAuthorizationRuleId: authorization.id,
      eventHubName: eventhubName,
      metrics: [],
      logs: [
        {
          category: "WorkflowRuntime",
          enabled: true,
          retentionPolicy: {
            enabled: false,
            days: 0,
          },
        },
      ],
    }
  );
  console.log(res);
}

//diagnosticSettings.get
async function diagnosticSettings_get() {
  const res = await client.diagnosticSettings.get(
    resourceGroup,
    diagnosticName
  );
  console.log(res);
}

//diagnosticSettings.list
async function diagnosticSettings_list() {
  const resourceUrl = await logic_client.workflows.get(
    resourceGroup,
    workflowName
  );
  const res = await client.diagnosticSettings.list(resourceUrl.id);
  console.log(res);
}

//diagnosticSettings.delete
async function diagnosticSettings_delete() {
  const resourceUrl = await logic_client.workflows.get(
    resourceGroup,
    workflowName
  );
  const resDelete = await client.diagnosticSettings.delete(
    resourceUrl.id,
    diagnosticName
  );
  const res = await client.diagnosticSettings.list(resourceUrl.id);
  console.log(res);
}

//logProfiles.createOrUpdate
async function logProfiles_createOrUpdate() {
  const storage = await storage_client.storageAccounts.getProperties(
    resourceGroup,
    storageAccountName
  );
  //delete sample logfile
  const resArray = [];
  for await (const item of client.logProfiles.list()) {
    resArray.push(item);
  }
  console.log(resArray);
  // const resDelete = await client.logProfiles.delete(resArray[0].name);
  const res = await client.logProfiles.createOrUpdate(logProfileName, {
    location: "",
    locations: ["global"],
    categories: ["Write", "Delete", "Action"],
    retentionPolicy: {
      enabled: true,
      days: 3,
    },
    storageAccountId: storage.id,
  });
  console.log(res);
}

//logProfiles.list
async function logProfiles_list() {
  for await (const item of client.logProfiles.list()) {
    console.log(item);
  }
}

//logProfiles.get
async function logProfiles_get() {
  const res = await client.logProfiles.get(logProfileName);
  console.log(res);
}

//logProfiles.delete
async function logProfiles_delete() {
  const res = await client.logProfiles.delete(logProfileName);
  console.log(res);
}

async function main() {
  client = new MonitorClient(credential, subscriptionId);
  logic_client = new LogicManagementClient(credential, subscriptionId);
  storage_client = new StorageManagementClient(credential, subscriptionId);
  eventhub_client = new EventHubManagementClient(credential, subscriptionId);
  op_client = new OperationalInsightsManagementClient(
    credential,
    subscriptionId
  );
  await diagnosticSettings_delete();
}

main();
