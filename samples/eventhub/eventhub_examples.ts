import {
  AuthorizationRule,
  EHNamespace,
  EventHubManagementClient,
  Eventhub,
  NetworkRuleSet,
} from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";
import { NetworkManagementClient, VirtualNetwork } from "@azure/arm-network";
import {
  StorageAccountCreateParameters,
  StorageManagementClient,
} from "@azure/arm-storage";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();
const resourceGroupName = "myjstest";
const location = "eastus";
const storageAccountName = "mystorageaccountxxx";
const skuName = "Basic";
const subnetName = "subnetxxx";
const eventhubName = "myeventhubxxx";
const namespaceName = "mynamespacexxx";
const namespaceName1 = "mynamespacexxx1";
const namespaceName2 = "mynamespacexxx2";
const consumergroupName = "myconsumergroup";
const virtualNetworkName = "myvirtualnetwork";
const networkRuleSetName = "mynetworkruleset";
const authorizationRuleName = "myauthorizationrule";
const disasterRecoveryConfigName = "mydisasterdecoveryconfigxxx";
let client: EventHubManagementClient;
let storage_client: StorageManagementClient;
let network_client: NetworkManagementClient;

// storageAccounts.beginCreateAndWait
async function storageAccounts_beginCreateAndWait() {
  const parameter: StorageAccountCreateParameters = {
    sku: {
      name: "Standard_GRS",
    },
    kind: "StorageV2",
    location: location,
  };
  const storageaccount = await storage_client.storageAccounts.beginCreateAndWait(
    resourceGroupName,
    storageAccountName,
    parameter
  );
  console.log(storageaccount);
}

// virtualNetworks.beginCreateOrUpdateAndWait
// subnets.beginCreateOrUpdateAndWait
async function createVirtualNetwork() {
  const parameter: VirtualNetwork = {
    location: location,
    addressSpace: {
      addressPrefixes: ["10.0.0.0/16"],
    },
  };
  await network_client.virtualNetworks
    .beginCreateOrUpdateAndWait(
      resourceGroupName,
      virtualNetworkName,
      parameter
    )
    .then((result) => {
      console.log(result);
    });
  const subnet_info = await network_client.subnets.beginCreateOrUpdateAndWait(
    resourceGroupName,
    virtualNetworkName,
    subnetName,
    { addressPrefix: "10.0.0.0/24" }
  );
  console.log(subnet_info);
  return subnet_info;
}

//namespaces.beginCreateOrUpdateAndWait
async function namespaces_beginCreateOrUpdateAndWait() {
  const parameter: EHNamespace = {
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
    namespaceName,
    parameter
  );
  console.log(res);
}

//namespaces.get
async function namespaces_get() {
  const res = await client.namespaces.get(resourceGroupName, namespaceName);
  console.log(res);
}

//eventHubs.createOrUpdate
async function eventHubs_createOrUpdate() {
  await storageAccounts_beginCreateAndWait();
  await createVirtualNetwork();
  //create eventhub
  const parameter: Eventhub = {
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
          resourceGroupName +
          "/providers/Microsoft.Storage/storageAccounts/" +
          storageAccountName,
        blobContainer: "container",
        archiveNameFormat:
          "{Namespace}/{EventHub}/{PartitionId}/{Year}/{Month}/{Day}/{Hour}/{Minute}/{Second}",
      },
    },
  };
  const res = await client.eventHubs.createOrUpdate(
    resourceGroupName,
    namespaceName,
    eventhubName,
    parameter
  );
  console.log(res);
}

//namespaces.createOrUpdateNetworkRuleSet
async function namespaces_createOrUpdateNetworkRuleSet() {
  const parameter: NetworkRuleSet = {
    defaultAction: "Deny",
    virtualNetworkRules: [
      {
        subnet: {
          id:
            "/subscriptions/" +
            subscriptionId +
            "/resourceGroups/" +
            resourceGroupName +
            "/providers/Microsoft.Network/virtualNetworks/" +
            virtualNetworkName +
            "/subnets/" +
            subnetName,
        },
        ignoreMissingVnetServiceEndpoint: true,
      },
    ],
    ipRules: [
      {
        ipMask: "1.1.1.1",
        action: "Allow",
      },
    ],
  };
  const res = await client.namespaces.createOrUpdateNetworkRuleSet(
    resourceGroupName,
    namespaceName,
    parameter
  );
  console.log(res);
}

//namespaces.createOrUpdateAuthorizationRule
async function namespaces_createOrUpdateAuthorizationRule() {
  const parameter: AuthorizationRule = {
    rights: ["Listen", "Send"],
  };
  const res = await client.namespaces.createOrUpdateAuthorizationRule(
    resourceGroupName,
    namespaceName,
    authorizationRuleName,
    parameter
  );
  console.log(res);
}

//consumerGroups.createOrUpdate
async function consumerGroups_createOrUpdate() {
  const res = await client.consumerGroups.createOrUpdate(
    resourceGroupName,
    namespaceName,
    eventhubName,
    consumergroupName,
    { userMetadata: "New consumergroup" }
  );
  console.log(res);
}

//eventHubs.createOrUpdateAuthorizationRule
async function eventHubs_createOrUpdateAuthorizationRule() {
  const res = await client.eventHubs.createOrUpdateAuthorizationRule(
    resourceGroupName,
    namespaceName,
    eventhubName,
    authorizationRuleName,
    { rights: ["Listen", "Send"] }
  );
  console.log(res);
}

//namespaces.getAuthorizationRule
async function namespaces_getAuthorizationRule() {
  const res = await client.namespaces.getAuthorizationRule(
    resourceGroupName,
    namespaceName,
    authorizationRuleName
  );
  console.log(res);
}

//eventHubs.getAuthorizationRule
async function eventHubs_getAuthorizationRule() {
  const res = await client.eventHubs.getAuthorizationRule(
    resourceGroupName,
    namespaceName,
    eventhubName,
    authorizationRuleName
  );
  console.log(res);
}

//consumerGroups.get
async function consumerGroups_get() {
  const res = await client.consumerGroups.get(
    resourceGroupName,
    namespaceName,
    eventhubName,
    consumergroupName
  );
  console.log(res);
}

//eventHubs.listAuthorizationRules
async function eventHubs_listAuthorizationRules() {
  for await (const item of client.eventHubs.listAuthorizationRules(
    resourceGroupName,
    namespaceName,
    eventhubName
  )) {
    console.log(item);
  }
}

//consumerGroups.listByEventHub
async function consumerGroups_listByEventHub() {
  for await (const item of client.consumerGroups.listByEventHub(
    resourceGroupName,
    namespaceName,
    eventhubName
  )) {
    console.log(item);
  }
}

//namespaces.getNetworkRuleSet
async function namespaces_getNetworkRuleSet() {
  const res = await client.namespaces.getNetworkRuleSet(
    resourceGroupName,
    namespaceName
  );
  console.log(res);
}

//eventHubs.get
async function eventHubs_get() {
  const res = await client.eventHubs.get(
    resourceGroupName,
    namespaceName,
    eventhubName
  );
  console.log(res);
}

//namespaces.listAuthorizationRules
async function namespaces_listAuthorizationRules() {
  for await (const item of client.namespaces.listAuthorizationRules(
    resourceGroupName,
    namespaceName
  )) {
    console.log(item);
  }
}

//namespaces.listVirtualNetworkRules
async function namespaces_listVirtualNetworkRules() {
  for await (const item of client.namespaces.listVirtualNetworkRules(
    resourceGroupName,
    namespaceName
  )) {
    console.log(item);
  }
}

//eventHubs.listByNamespace
async function eventHubs_listByNamespace() {
  for await (const item of client.eventHubs.listByNamespace(
    resourceGroupName,
    namespaceName
  )) {
    console.log(item);
  }
}

//namespaces.listByResourceGroup
async function namespaces_listByResourceGroup() {
  for await (const item of client.namespaces.listByResourceGroup(
    resourceGroupName
  )) {
    console.log(item);
  }
}

//regions.listBySku
async function regions_listBySku() {
  //"Basic" supported api-versions are '2014-09-01,2015-08-01,2017-04-01'
  for await (const item of client.regions.listBySku(skuName)) {
    console.log(item);
  }
}

//namespaces.list
async function namespaces_list() {
  for await (const item of client.namespaces.list()) {
    console.log(item);
  }
}

//operations.list
async function operations_list() {
  for await (const item of client.operations.list()) {
    console.log(item);
  }
}

//eventHubs.regenerateKeys
async function eventHubs_regenerateKeys() {
  const res = await client.eventHubs.regenerateKeys(
    resourceGroupName,
    namespaceName,
    eventhubName,
    authorizationRuleName,
    { keyType: "PrimaryKey" }
  );
  console.log(res);
}

//eventHubs.listKeys
async function eventHubs_listKeys() {
  const res = await client.eventHubs.listKeys(
    resourceGroupName,
    namespaceName,
    eventhubName,
    authorizationRuleName
  );
  console.log(res);
}

//namespaces.regenerateKeys
async function namespaces_regenerateKeys() {
  const res = await client.namespaces.regenerateKeys(
    resourceGroupName,
    namespaceName,
    authorizationRuleName,
    { keyType: "PrimaryKey" }
  );
  console.log(res);
}

//namespaces.listKeys
async function namespaces_listKeys() {
  const res = await client.namespaces.listKeys(
    resourceGroupName,
    namespaceName,
    authorizationRuleName
  );
  console.log(res);
}

//namespaces.update
async function namespaces_update() {
  const parameter: EHNamespace = {
    location: "South Central US",
    tags: {
      tag3: "value3",
      tag4: "value4",
    },
  };
  const res = await client.namespaces.update(
    resourceGroupName,
    namespaceName,
    parameter
  );
  console.log(res);
}

//namespaces.checkNameAvailability
async function namespaces_checkNameAvailability() {
  const res = await client.namespaces.checkNameAvailability({
    name: "sdk-DisasterRecovery-9474",
  });
  console.log(res);
}

//eventHubs.deleteAuthorizationRule
async function eventHubs_deleteAuthorizationRule() {
  const res = await client.eventHubs.deleteAuthorizationRule(
    resourceGroupName,
    namespaceName,
    eventhubName,
    authorizationRuleName
  );
  console.log(res);
}

//consumerGroups.delete
async function consumerGroups_delete() {
  const res = await client.consumerGroups.delete(
    resourceGroupName,
    namespaceName,
    eventhubName,
    consumergroupName
  );
  console.log(res);
}

//namespaces.deleteAuthorizationRule
async function namespaces_deleteAuthorizationRule() {
  const res = await client.namespaces.deleteAuthorizationRule(
    resourceGroupName,
    namespaceName,
    authorizationRuleName
  );
  console.log(res);
}

//eventHubs.delete
async function eventHubs_delete() {
  const res = await client.eventHubs.delete(
    resourceGroupName,
    namespaceName,
    eventhubName
  );
  console.log(res);
}

//namespaces.beginCreateOrUpdateAndWait(namespaceName1)
async function namespaces_beginCreateOrUpdateAndWait1() {
  const parameter: EHNamespace = {
    sku: {
      name: "Standard",
      tier: "Standard",
    },
    location: "South Central US",
    tags: {
      tag1: "value1",
      tag2: "value2",
    },
  };
  const res = await client.namespaces.beginCreateOrUpdateAndWait(
    resourceGroupName,
    namespaceName1,
    parameter
  );
  console.log(res);
}

//namespaces.beginCreateOrUpdateAndWait(namespaceName2)
async function namespaces_beginCreateOrUpdateAndWait2() {
  const parameter: EHNamespace = {
    sku: {
      name: "Standard",
      tier: "Standard",
    },
    location: "NorthCentralUS",
    tags: {
      tag1: "value1",
      tag2: "value2",
    },
  };
  const res = await client.namespaces.beginCreateOrUpdateAndWait(
    resourceGroupName,
    namespaceName2,
    parameter
  );
  console.log(res);
  return res;
}

//namespaces.createOrUpdateAuthorizationRule(namespaceName1)
async function namespaces_createOrUpdateAuthorizationRule1() {
  const parameter: AuthorizationRule = {
    rights: ["Send"],
  };
  const res = await client.namespaces.createOrUpdateAuthorizationRule(
    resourceGroupName,
    namespaceName1,
    authorizationRuleName,
    parameter
  );
  console.log(res);
}

//disasterRecoveryConfigs.checkNameAvailability(namespaceName1)
async function disasterRecoveryConfigs_checkNameAvailability() {
  const res = await client.disasterRecoveryConfigs.checkNameAvailability(
    resourceGroupName,
    namespaceName1,
    { name: "sdk-DisasterRecovery-9474" }
  );
  console.log(res);
}

//disasterRecoveryConfigs.createOrUpdate
async function disasterRecoveryConfigs_createOrUpdate() {
  const secondNamespace = await namespaces_beginCreateOrUpdateAndWait2();
  const res = await client.disasterRecoveryConfigs.createOrUpdate(
    resourceGroupName,
    namespaceName1,
    disasterRecoveryConfigName,
    { partnerNamespace: secondNamespace.id }
  );
  console.log(res);
}

//disasterRecoveryConfigs.get
async function disasterRecoveryConfigs_get() {
  const res = await client.disasterRecoveryConfigs.get(
    resourceGroupName,
    namespaceName1,
    disasterRecoveryConfigName
  );
  console.log(res);
}

//disasterRecoveryConfigs.listAuthorizationRules
async function disasterRecoveryConfigs_listAuthorizationRules() {
  for await (const item of client.disasterRecoveryConfigs.listAuthorizationRules(
    resourceGroupName,
    namespaceName1,
    disasterRecoveryConfigName
  )) {
    console.log(item);
  }
}

//disasterRecoveryConfigs.getAuthorizationRule
async function disasterRecoveryConfigs_getAuthorizationRule() {
  const res = await client.disasterRecoveryConfigs.getAuthorizationRule(
    resourceGroupName,
    namespaceName1,
    disasterRecoveryConfigName,
    authorizationRuleName
  );
  console.log(res);
}

//disasterRecoveryConfigs.list
async function disasterRecoveryConfigs_list() {
  for await (const item of client.disasterRecoveryConfigs.list(
    resourceGroupName,
    namespaceName1
  )) {
    console.log(item);
  }
}

//disasterRecoveryConfigs.listKeys
async function disasterRecoveryConfigs_listKeys() {
  const res = await client.disasterRecoveryConfigs.listKeys(
    resourceGroupName,
    namespaceName1,
    disasterRecoveryConfigName,
    authorizationRuleName
  );
  console.log(res);
}

//disasterRecoveryConfigs.breakPairing
async function disasterRecoveryConfigs_breakPairing() {
  const res = await client.disasterRecoveryConfigs.breakPairing(
    resourceGroupName,
    namespaceName1,
    disasterRecoveryConfigName
  );
  console.log(res);
}

//disasterRecoveryConfigs.failOver
async function disasterRecoveryConfigs_failOver() {
  const res = await client.disasterRecoveryConfigs.failOver(
    resourceGroupName,
    namespaceName1,
    disasterRecoveryConfigName
  );
  console.log(res);
}

//disasterRecoveryConfigs.delete
async function disasterRecoveryConfigs_delete() {
  const res = await client.disasterRecoveryConfigs.delete(
    resourceGroupName,
    namespaceName1,
    disasterRecoveryConfigName
  );
  console.log(res);
}

//namespaces.beginDeleteAndWait
async function namespaces_beginDeleteAndWait() {
  const res = await client.namespaces.beginDeleteAndWait(
    resourceGroupName,
    namespaceName
  );
  console.log(res);
}

async function main() {
  client = new EventHubManagementClient(credential, subscriptionId);
  storage_client = new StorageManagementClient(credential, subscriptionId);
  network_client = new NetworkManagementClient(credential, subscriptionId);
  await namespaces_beginCreateOrUpdateAndWait();
}

main();
