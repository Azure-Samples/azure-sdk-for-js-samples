import { DefaultAzureCredential } from "@azure/identity";
import {
  ExtendedServerBlobAuditingPolicy,
  ServerAzureADAdministrator,
  ServerBlobAuditingPolicy,
  ServerSecurityAlertPolicy,
  SqlManagementClient,
  VirtualNetworkRule,
} from "@azure/arm-sql";
import { NetworkManagementClient } from "@azure/arm-network";
import {
  StorageAccountCreateParameters,
  StorageManagementClient,
} from "@azure/arm-storage";

const subscriptionId =
  process.env.subscriptionId || "00000000-0000-0000-0000-000000000000";
const AZURE_CLIENT_ID = process.env.AZURE_CLIENT_ID;
const AZURE_TENANT_ID = process.env.AZURE_TENANT_ID;
const credential = new DefaultAzureCredential();
const resourceGroup = "myjstest";
const serverName = "myserverzzzz";
const storageAccountName = "myaccountzzz";
const blobContainerName = "myblobzzzz";
const securityAlterPolicyName = "default";
const partnerServerName = "mypartnerserverzzz";
const administratorName = "ActiveDirectory";
const virtualNetworkName = "myvirtualnetworkzzz";
const subnetName = "mysubnetzzz";
const virtualNetworkRuleName = "myvirtualnetworkRulezzz";
const communicationName = "mycommunicationLinkzzz";
let client: SqlManagementClient;
let storage_client: StorageManagementClient;
let network_client: NetworkManagementClient;

//--ServerSecurityAlertPoliciesExamples--

//storageAccounts.create
//blobContainers.create
async function createStorageAccountAndBlobContainer() {
  const parameter: StorageAccountCreateParameters = {
    sku: {
      name: "Standard_GRS",
    },
    kind: "StorageV2",
    location: "eastus",
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
  //create storageAccount
  await storage_client.storageAccounts
    .create(resourceGroup, storageAccountName, parameter)
    .then((res) => {
      console.log(res);
    });
  // create blobContainer
  await storage_client.blobContainers
    .create(resourceGroup, storageAccountName, blobContainerName, {})
    .then((res) => {
      console.log(res);
    });

  //regenerateKey
  const res = await storage_client.storageAccounts.regenerateKey(
    resourceGroup,
    storageAccountName,
    { keyName: "key2" }
  );
  console.log(res);

  const storageKeys = res.keys;
  if (!storageKeys?.length) {
    throw new Error("No storage account keys were returned.");
  }

  return storageKeys[0].value;
}

//servers.createOrUpdate
async function servers_createOrUpdate() {
  const res = await client.servers.createOrUpdate(resourceGroup, serverName, {
    location: "eastus",
    administratorLogin: "dummylogin",
    administratorLoginPassword: "Un53cuRE!",
  });
  console.log(res);
}

//serverSecurityAlertPolicies.createOrUpdate
async function serverSecurityAlertPolicies_createOrUpdate() {
  const key = await createStorageAccountAndBlobContainer();
  const parameter: ServerSecurityAlertPolicy = {
    state: "Disabled",
    emailAccountAdmins: true,
    storageAccountAccessKey: key,
    storageEndpoint: "https://" + storageAccountName + ".blob.core.windows.net",
  };
  const res = await client.serverSecurityAlertPolicies.createOrUpdate(
    resourceGroup,
    serverName,
    securityAlterPolicyName,
    parameter
  );
  console.log(res);
}

//serverSecurityAlertPolicies.get
async function serverSecurityAlertPolicies_get() {
  const res = await client.serverSecurityAlertPolicies.get(
    resourceGroup,
    serverName,
    securityAlterPolicyName
  );
  console.log(res);
}

//serverSecurityAlertPolicies.listByServer
async function serverSecurityAlertPolicies_listByServer() {
  for await (const item of client.serverSecurityAlertPolicies.listByServer(
    resourceGroup,
    serverName
  )) {
    console.log(item);
  }
}

//--ServerBlobAuditingPolicy--

//serverBlobAuditingPolicies.createOrUpdate
async function serverBlobAuditingPolicies_createOrUpdate() {
  const accessKy = await createStorageAccountAndBlobContainer();
  const parameter: ServerBlobAuditingPolicy = {
    state: "Enabled",
    storageAccountAccessKey: accessKy,
    storageEndpoint: "https://" + storageAccountName + ".blob.core.windows.net",
  };
  await client.serverBlobAuditingPolicies
    .createOrUpdate(resourceGroup, serverName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//extendedServerBlobAuditingPolicies.createOrUpdate
async function extendedServerBlobAuditingPolicies_createOrUpdate() {
  const accessKy = await createStorageAccountAndBlobContainer();
  const parameter: ExtendedServerBlobAuditingPolicy = {
    state: "Enabled",
    storageAccountAccessKey: accessKy,
    storageEndpoint: "https://" + storageAccountName + ".blob.core.windows.net",
    isAzureMonitorTargetEnabled: true,
    isDevopsAuditEnabled: true,
  };
  const res = await client.extendedServerBlobAuditingPolicies.createOrUpdate(
    resourceGroup,
    serverName,
    parameter
  );
  console.log(res);
}

//extendedServerBlobAuditingPolicies.get
async function extendedServerBlobAuditingPolicies_get() {
  await client.extendedServerBlobAuditingPolicies
    .get(resourceGroup, serverName)
    .then((res) => {
      console.log(res);
    });
}

//serverBlobAuditingPolicies.get
async function serverBlobAuditingPolicies_get() {
  await client.serverBlobAuditingPolicies
    .get(resourceGroup, serverName)
    .then((res) => {
      console.log(res);
    });
}

//serverBlobAuditingPolicies.listByServer
async function serverBlobAuditingPolicies_listByServer() {
  for await (const item of client.serverBlobAuditingPolicies.listByServer(
    resourceGroup,
    serverName
  )) {
    console.log(item);
  }
}

//extendedServerBlobAuditingPolicies.listByServer
async function extendedServerBlobAuditingPolicies_listByServer() {
  for await (const item of client.extendedServerBlobAuditingPolicies.listByServer(
    resourceGroup,
    serverName
  )) {
    console.log(item);
  }
}

//--ServerAzureAdAdministrator--

//serverAzureADAdministrators.createOrUpdate
async function serverAzureADAdministrators_createOrUpdate() {
  const parameter: ServerAzureADAdministrator = {
    administratorType: "ActiveDirectory",
    login: "bob@contoso.com",
    sid: AZURE_CLIENT_ID,
    tenantId: AZURE_TENANT_ID,
  };
  const res = await client.serverAzureADAdministrators.createOrUpdate(
    resourceGroup,
    serverName,
    administratorName,
    parameter
  );
  console.log(res);
}

//serverAzureADAdministrators.listByServer
async function serverAzureADAdministrators_listByServer() {
  for await (const item of client.serverAzureADAdministrators.listByServer(
    resourceGroup,
    serverName
  )) {
    console.log(item);
    return item.name;
  }
}

//serverAzureADAdministrators.get
async function serverAzureADAdministrators_get() {
  const adminName = await serverAzureADAdministrators_listByServer();
  await client.serverAzureADAdministrators
    .get(resourceGroup, serverName, adminName as string)
    .then((res) => {
      console.log(res);
    });
}

//serverAzureADAdministrators.delete
async function serverAzureADAdministrators_delete() {
  const adminName = await serverAzureADAdministrators_listByServer();
  await client.serverAzureADAdministrators
    .delete(resourceGroup, serverName, adminName as string)
    .then((res) => {
      console.log(res);
    });
}

//--ServerAutomaticTuningExamples--

//serverAutomaticTuningOperations.get
async function serverAutomaticTuningOperations_get() {
  const res = await client.serverAutomaticTuningOperations.get(
    resourceGroup,
    serverName
  );
  console.log(res);
}

//serverAutomaticTuningOperations.update
async function serverAutomaticTuningOperations_update() {
  const res = await client.serverAutomaticTuningOperations.update(
    resourceGroup,
    serverName,
    { desiredState: "Auto" }
  );
  console.log(res);
}

//--VirtualNetworkRulesExamples--

//virtualNetworks.createOrUpdate
//subnets.createOrUpdate
async function createVirtualNetworkAndSubnet() {
  //create virtualNetwork
  const vir_res = await network_client.virtualNetworks.createOrUpdate(
    resourceGroup,
    virtualNetworkName,
    { location: "eastus", addressSpace: { addressPrefixes: ["10.0.0.0/16"] } }
  );
  console.log(vir_res);

  //create subnet
  const sub_res = await network_client.subnets.createOrUpdate(
    resourceGroup,
    virtualNetworkName,
    subnetName,
    { addressPrefix: "10.0.0.0/24" }
  );
  console.log(sub_res);
}

//virtualNetworkRules.createOrUpdate
async function virtualNetworkRules_createOrUpdate() {
  const parameter: VirtualNetworkRule = {
    ignoreMissingVnetServiceEndpoint: true,
    virtualNetworkSubnetId:
      "/subscriptions/" +
      subscriptionId +
      "/resourceGroups/" +
      resourceGroup +
      "/providers/Microsoft.Network/virtualNetworks/" +
      virtualNetworkName +
      "/subnets/" +
      subnetName,
  };
  const res = await client.virtualNetworkRules.createOrUpdate(
    resourceGroup,
    serverName,
    virtualNetworkRuleName,
    parameter
  );
  console.log(res);
}

//virtualNetworkRules.get
async function virtualNetworkRules_get() {
  const res = await client.virtualNetworkRules.get(
    resourceGroup,
    serverName,
    virtualNetworkRuleName
  );
  console.log(res);
}

//virtualNetworkRules.listByServer
async function virtualNetworkRules_listByServer() {
  for await (const item of client.virtualNetworkRules.listByServer(
    resourceGroup,
    serverName
  )) {
    console.log(item);
  }
}

//virtualNetworkRules.delete
async function virtualNetworkRules_delete() {
  await client.virtualNetworkRules
    .delete(resourceGroup, serverName, virtualNetworkRuleName)
    .then((res) => {
      console.log(res);
    });
}

//--ServersExamples--

//capabilities.listByLocation
async function capabilities_listByLocation() {
  const res = await client.capabilities.listByLocation("eastus");
  console.log(res);
}

//servers.get
async function servers_get() {
  const res = await client.servers.get(resourceGroup, serverName);
  console.log(res);
}

//servers.listByResourceGroup
async function servers_listByResourceGroup() {
  for await (const item of client.servers.listByResourceGroup(resourceGroup)) {
    console.log(item);
  }
}

//servers.list
async function servers_list() {
  for await (const item of client.servers.list()) {
    console.log(item);
  }
}

//serverUsages.listByServer
async function serverUsages_listByServer() {
  for await (const item of client.serverUsages.listByServer(
    resourceGroup,
    serverName
  )) {
    console.log(item);
  }
}

//servers.update
async function servers_update() {
  const res = await client.servers.update(resourceGroup, serverName, {
    administratorLogin: "dummylogin",
    administratorLoginPassword: "Un53cuRE!",
  });
  console.log(res);
}

//servers.checkNameAvailability
async function servers_checkNameAvailability() {
  const res = await client.servers.checkNameAvailability({
    name: "server1",
    type: "Microsoft.Sql/servers",
  });
  console.log(res);
}

//servers.delete
async function servers_delete() {
  const res = await client.servers.delete(resourceGroup, serverName);
  console.log(res);
}

async function main() {
  client = new SqlManagementClient(credential, subscriptionId);
  storage_client = new StorageManagementClient(credential, subscriptionId);
  network_client = new NetworkManagementClient(credential, subscriptionId);
  await servers_createOrUpdate();
}

main();
