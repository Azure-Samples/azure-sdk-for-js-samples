import { DefaultAzureCredential } from "@azure/identity";
import {
  ExtendedServerBlobAuditingPolicy,
  ServerAzureADAdministrator,
  ServerBlobAuditingPolicy,
  ServerSecurityAlertPolicy,
  SqlManagementClient,
  VirtualNetworkRule,
} from "azure-arm-sql";
import { NetworkManagementClient } from "@azure/arm-network";
import {
  StorageAccountCreateParameters,
  StorageManagementClient,
} from "@azure/arm-storage";

const subscriptionId = process.env.subscriptionId;
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

//storageAccounts.beginCreateAndWait
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
    .beginCreateAndWait(resourceGroup, storageAccountName, parameter)
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
  return res.keys[0].value;
}

//servers.beginCreateOrUpdateAndWait
async function servers_beginCreateOrUpdateAndWait() {
  const res = await client.servers.beginCreateOrUpdateAndWait(
    resourceGroup,
    serverName,
    {
      location: "eastus",
      administratorLogin: "dummylogin",
      administratorLoginPassword: "Un53cuRE!",
    }
  );
  console.log(res);
}

//serverSecurityAlertPolicies.beginCreateOrUpdateAndWait
async function serverSecurityAlertPolicies_beginCreateOrUpdateAndWait() {
  const key = await createStorageAccountAndBlobContainer();
  const parameter: ServerSecurityAlertPolicy = {
    state: "Disabled",
    emailAccountAdmins: true,
    storageAccountAccessKey: key,
    storageEndpoint: "https://" + storageAccountName + ".blob.core.windows.net",
  };
  const res = await client.serverSecurityAlertPolicies.beginCreateOrUpdateAndWait(
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

//serverBlobAuditingPolicies.beginCreateOrUpdateAndWait
async function serverBlobAuditingPolicies_beginCreateOrUpdateAndWait() {
  const accessKy = await createStorageAccountAndBlobContainer();
  const parameter: ServerBlobAuditingPolicy = {
    state: "Enabled",
    storageAccountAccessKey: accessKy,
    storageEndpoint: "https://" + storageAccountName + ".blob.core.windows.net",
  };
  await client.serverBlobAuditingPolicies
    .beginCreateOrUpdateAndWait(resourceGroup, serverName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//extendedServerBlobAuditingPolicies.beginCreateOrUpdateAndWait
async function extendedServerBlobAuditingPolicies_beginCreateOrUpdateAndWait() {
  const accessKy = await createStorageAccountAndBlobContainer();
  const parameter: ExtendedServerBlobAuditingPolicy = {
    state: "Enabled",
    storageAccountAccessKey: accessKy,
    storageEndpoint: "https://" + storageAccountName + ".blob.core.windows.net",
    isAzureMonitorTargetEnabled: true,
    isDevopsAuditEnabled: true,
  };
  const res = await client.extendedServerBlobAuditingPolicies.beginCreateOrUpdateAndWait(
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

//serverAzureADAdministrators.beginCreateOrUpdateAndWait
async function serverAzureADAdministrators_beginCreateOrUpdateAndWait() {
  const parameter: ServerAzureADAdministrator = {
    administratorType: "ActiveDirectory",
    login: "bob@contoso.com",
    sid: AZURE_CLIENT_ID,
    tenantId: AZURE_TENANT_ID,
  };
  const res = await client.serverAzureADAdministrators.beginCreateOrUpdateAndWait(
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
    .get(resourceGroup, serverName, adminName)
    .then((res) => {
      console.log(res);
    });
}

//serverAzureADAdministrators.beginDeleteAndWait
async function serverAzureADAdministrators_beginDeleteAndWait() {
  const adminName = await serverAzureADAdministrators_listByServer();
  await client.serverAzureADAdministrators
    .beginDeleteAndWait(resourceGroup, serverName, adminName)
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

//--ServiceObjectiveExamples--

//serviceObjectives.listByServer
async function serviceObjectives_listByServer() {
  for await (const item of client.serviceObjectives.listByServer(
    resourceGroup,
    serverName
  )) {
    console.log(item);
    return item.name;
  }
}

//serviceObjectives.get
async function serviceObjectives_get() {
  const serviceObjectiveName = await serviceObjectives_listByServer();
  const res = await client.serviceObjectives.get(
    resourceGroup,
    serverName,
    serviceObjectiveName
  );
  console.log(res);
}

//--VirtualNetworkRulesExamples--

//virtualNetworks.beginCreateOrUpdateAndWait
//subnets.beginCreateOrUpdateAndWait
async function createVirtualNetworkAndSubnet() {
  //create virtualNetwork
  const vir_res = await network_client.virtualNetworks.beginCreateOrUpdateAndWait(
    resourceGroup,
    virtualNetworkName,
    { location: "eastus", addressSpace: { addressPrefixes: ["10.0.0.0/16"] } }
  );
  console.log(vir_res);

  //create subnet
  const sub_res = await network_client.subnets.beginCreateOrUpdateAndWait(
    resourceGroup,
    virtualNetworkName,
    subnetName,
    { addressPrefix: "10.0.0.0/24" }
  );
  console.log(sub_res);
}

//virtualNetworkRules.beginCreateOrUpdateAndWait
async function virtualNetworkRules_beginCreateOrUpdateAndWait() {
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
  const res = await client.virtualNetworkRules.beginCreateOrUpdateAndWait(
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

//virtualNetworkRules.beginDeleteAndWait
async function virtualNetworkRules_beginDeleteAndWait() {
  await client.virtualNetworkRules
    .beginDeleteAndWait(resourceGroup, serverName, virtualNetworkRuleName)
    .then((res) => {
      console.log(res);
    });
}

//--ServerCommunicationLinksExamples--

//serverCommunicationLinks.beginCreateOrUpdateAndWait
async function serverCommunicationLinks_beginCreateOrUpdateAndWait() {
  const res = await client.serverCommunicationLinks.beginCreateOrUpdateAndWait(
    resourceGroup,
    serverName,
    communicationName,
    { partnerServer: partnerServerName }
  );
  console.log(res);
}

//serverCommunicationLinks.get
async function serverCommunicationLinks_get() {
  const res = await client.serverCommunicationLinks.get(
    resourceGroup,
    serverName,
    communicationName
  );
  console.log(res);
}

//serverCommunicationLinks.listByServer
async function serverCommunicationLinks_listByServer() {
  for await (const item of client.serverCommunicationLinks.listByServer(
    resourceGroup,
    serverName
  )) {
    console.log(item);
  }
}

//serverCommunicationLinks.delete
async function serverCommunicationLinks_delete() {
  const res = await client.serverCommunicationLinks.delete(
    resourceGroup,
    serverName,
    communicationName
  );
  console.log(res);
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

//servers.beginUpdateAndWait
async function servers_beginUpdateAndWait() {
  const res = await client.servers.beginUpdateAndWait(
    resourceGroup,
    serverName,
    {
      administratorLogin: "dummylogin",
      administratorLoginPassword: "Un53cuRE!",
    }
  );
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

//servers.beginDeleteAndWait
async function servers_beginDeleteAndWait() {
  const res = await client.servers.beginDeleteAndWait(
    resourceGroup,
    serverName
  );
  console.log(res);
}

async function main() {
  client = new SqlManagementClient(credential, subscriptionId);
  storage_client = new StorageManagementClient(credential, subscriptionId);
  await servers_beginCreateOrUpdateAndWait();
}

main();
