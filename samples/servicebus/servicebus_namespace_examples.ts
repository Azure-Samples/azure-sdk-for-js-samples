import { DefaultAzureCredential } from "@azure/identity";
// eslint-disable-next-line import/no-unresolved
import {
  MigrationConfigProperties,
  NetworkRuleSet,
  RegenerateAccessKeyParameters,
  SBAuthorizationRule,
  SBNamespace,
  SBNamespaceUpdateParameters,
  ServiceBusManagementClient,
} from "azure-arm-servicebus";
import {
  NetworkInterface,
  NetworkManagementClient,
  Subnet,
  VirtualNetwork,
} from "@azure/arm-network";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();
const resourceGroupName = "myjstest";
const location = "eastus";
const subnet_name = "subnetnamex";
const network_name = "networknamex";
const namespacesName = "mynamespacexxx";
const authorizationRuleName = "myAuthoriztionRule";
const sku = "Premium";
const configName = "default";
const postMigrationName = "postmigrationxxx";
const alias = "mydisasterrecovercf";
let client: ServiceBusManagementClient;
let network_client: NetworkManagementClient;

//network_client.virtualNetworks.createOrUpdate
async function createVirtualNetwork() {
  const parameter: VirtualNetwork = {
    location: location,
    addressSpace: {
      addressPrefixes: ["10.0.0.0/16"],
    },
  };
  const virtualNetworks_create_info = await network_client.virtualNetworks.beginCreateOrUpdateAndWait(
    resourceGroupName,
    network_name,
    parameter
  );
  console.log(virtualNetworks_create_info);

  const subnet_parameter: Subnet = {
    addressPrefix: "10.0.0.0/24",
  };
  const subnet__create_info = await network_client.subnets.beginCreateOrUpdateAndWait(
    resourceGroupName,
    network_name,
    subnet_name,
    subnet_parameter
  );
  console.log(subnet__create_info);
}

//namespaces.beginCreateOrUpdateAndWait
async function namespaces_beginCreateOrUpdateAndWait() {
  const parameter: SBNamespace = {
    sku: {
      name: "Premium",
      tier: "Premium",
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
  return res;
}

//namespaces.createOrUpdateAuthorizationRule
async function namespaces_createOrUpdateAuthorizationRule() {
  const parameter: SBAuthorizationRule = {
    rights: ["Listen", "Send"],
  };
  await client.namespaces
    .createOrUpdateAuthorizationRule(
      resourceGroupName,
      namespacesName,
      authorizationRuleName,
      parameter
    )
    .then((res) => {
      console.log(res);
    });
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
            network_name +
            "/subnets/" +
            subnet_name,
        },
        ignoreMissingVnetServiceEndpoint: true,
      },
    ],
    ipRules: [
      {
        ipMask: "1.1.1.1",
        action: "Allow",
      },
      {
        ipMask: "1.1.1.2",
        action: "Allow",
      },
      {
        ipMask: "1.1.1.3",
        action: "Allow",
      },
      {
        ipMask: "1.1.1.4",
        action: "Allow",
      },
      {
        ipMask: "1.1.1.5",
        action: "Allow",
      },
    ],
  };
  await client.namespaces
    .createOrUpdateNetworkRuleSet(resourceGroupName, namespacesName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//namespaces.getAuthorizationRule
async function namespaces_getAuthorizationRule() {
  await client.namespaces
    .getAuthorizationRule(
      resourceGroupName,
      namespacesName,
      authorizationRuleName
    )
    .then((res) => {
      console.log(res);
    });
}

//namespaces.getNetworkRuleSet
async function namespaces_getNetworkRuleSet() {
  await client.namespaces
    .getNetworkRuleSet(resourceGroupName, namespacesName)
    .then((res) => {
      console.log(res);
    });
}

//namespaces.get
async function namespaces_get() {
  await client.namespaces.get(resourceGroupName, namespacesName).then((res) => {
    console.log(res);
  });
}

//namespaces.listAuthorizationRules
async function namespaces_listAuthorizationRules() {
  for await (const item of client.namespaces.listAuthorizationRules(
    resourceGroupName,
    namespacesName
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

//premiumMessagingRegionsOperations.list
async function premiumMessagingRegionsOperations_list() {
  for await (const item of client.premiumMessagingRegionsOperations.list()) {
    console.log(item);
  }
}

//regions.listBySku
async function regions_listBySku() {
  for await (const item of client.regions.listBySku(sku)) {
    console.log(item);
  }
}

//namespaces.regenerateKeys
async function namespaces_regenerateKeys() {
  const parameter: RegenerateAccessKeyParameters = {
    keyType: "PrimaryKey",
  };
  await client.namespaces
    .regenerateKeys(
      resourceGroupName,
      namespacesName,
      authorizationRuleName,
      parameter
    )
    .then((res) => {
      console.log(res);
    });
}

//namespaces.listKeys
async function namespaces_listKeys() {
  await client.namespaces
    .listKeys(resourceGroupName, namespacesName, authorizationRuleName)
    .then((res) => {
      console.log(res);
    });
}

//namespaces.update
async function namespaces_update() {
  const parameter: SBNamespaceUpdateParameters = {
    location: location,
    tags: {
      tag3: "value3",
      tag4: "value4",
    },
  };
  await client.namespaces
    .update(resourceGroupName, namespacesName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//namespaces.checkNameAvailability
async function namespaces_checkNameAvailability() {
  await client.namespaces
    .checkNameAvailability({ name: "sdk-Namespace-2924" })
    .then((res) => {
      console.log(res);
    });
}

//migrationConfigs.beginCreateAndStartMigrationAndWait
async function migrationConfigs_beginCreateAndStartMigrationAndWait() {
  const namespace = await namespaces_beginCreateOrUpdateAndWait();
  const parameter: MigrationConfigProperties = {
    targetNamespace: namespace.id,
    postMigrationName: postMigrationName,
  };
  await client.migrationConfigs
    .beginCreateAndStartMigrationAndWait(
      resourceGroupName,
      namespacesName,
      configName,
      parameter
    )
    .then((res) => {
      console.log(res);
    });
}

//migrationConfigs.list
async function migrationConfigs_list() {
  for await (const item of client.migrationConfigs.list(
    resourceGroupName,
    namespacesName
  )) {
    console.log(item);
  }
}

//namespaces.migrate
async function namespaces_migrate() {
  await client.namespaces
    .migrate(resourceGroupName, namespacesName, {
      targetNamespaceType: "EventHub",
    })
    .then((res) => {
      console.log(res);
    });
}

//migrationConfigs.revert
async function migrationConfigs_revert() {
  await client.migrationConfigs
    .revert(resourceGroupName, namespacesName, configName)
    .then((res) => {
      console.log(res);
    });
}

//migrationConfigs.completeMigration
async function migrationConfigs_completeMigration() {
  await client.migrationConfigs
    .completeMigration(resourceGroupName, namespacesName, configName)
    .then((res) => {
      console.log(res);
    });
}

//migrationConfigs.get
async function migrationConfigs_get() {
  await client.migrationConfigs
    .get(resourceGroupName, namespacesName, configName)
    .then((res) => {
      console.log(res);
    });
}

//migrationConfigs.delete
async function migrationConfigs_delete() {
  await client.migrationConfigs
    .delete(resourceGroupName, namespacesName, configName)
    .then((res) => {
      console.log(res);
    });
}

//disasterRecoveryConfigs.checkNameAvailability
async function disasterRecoveryConfigs_checkNameAvailability() {
  await client.disasterRecoveryConfigs
    .checkNameAvailability(resourceGroupName, namespacesName, {
      name: "sdk-DisasterRecovery-9474",
    })
    .then((res) => {
      console.log(res);
    });
}

//disasterRecoveryConfigs.createOrUpdate
async function disasterRecoveryConfigs_createOrUpdate() {
  const namespace = await namespaces_beginCreateOrUpdateAndWait();
  await client.disasterRecoveryConfigs
    .createOrUpdate(resourceGroupName, namespacesName, alias, {
      partnerNamespace: namespace.id,
    })
    .then((res) => {
      console.log(res);
    });
}

//disasterRecoveryConfigs.get
async function disasterRecoveryConfigs_get() {
  await client.disasterRecoveryConfigs
    .get(resourceGroupName, namespacesName, alias)
    .then((res) => {
      console.log(res);
    });
}

//disasterRecoveryConfigs.getAuthorizationRule
async function disasterRecoveryConfigs_getAuthorizationRule() {
  await client.disasterRecoveryConfigs
    .getAuthorizationRule(
      resourceGroupName,
      namespacesName,
      alias,
      authorizationRuleName
    )
    .then((res) => {
      console.log(res);
    });
}

//disasterRecoveryConfigs.list
async function disasterRecoveryConfigs_list() {
  for await (const item of client.disasterRecoveryConfigs.list(
    resourceGroupName,
    namespacesName
  )) {
    console.log(item);
  }
}

//disasterRecoveryConfigs.listKeys
async function disasterRecoveryConfigs_listKeys() {
  await client.disasterRecoveryConfigs
    .listKeys(resourceGroupName, namespacesName, alias, authorizationRuleName)
    .then((res) => {
      console.log(res);
    });
}

//disasterRecoveryConfigs.breakPairing
async function disasterRecoveryConfigs_breakPairing() {
  await client.disasterRecoveryConfigs
    .breakPairing(resourceGroupName, namespacesName, alias)
    .then((res) => {
      console.log(res);
    });
}

//disasterRecoveryConfigs.failOver
async function disasterRecoveryConfigs_failOver() {
  await client.disasterRecoveryConfigs
    .failOver(resourceGroupName, namespacesName, alias)
    .then((res) => {
      console.log(res);
    });
}

//namespaces.deleteAuthorizationRule
async function namespaces_deleteAuthorizationRule() {
  await client.namespaces
    .deleteAuthorizationRule(
      resourceGroupName,
      namespacesName,
      authorizationRuleName
    )
    .then((res) => {
      console.log(res);
    });
}

//disasterRecoveryConfigs.delete
async function disasterRecoveryConfigs_delete() {
  await client.disasterRecoveryConfigs
    .delete(resourceGroupName, namespacesName, alias)
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
  network_client = new NetworkManagementClient(credential, subscriptionId);
  await namespaces_beginCreateOrUpdateAndWait();
}

main();
