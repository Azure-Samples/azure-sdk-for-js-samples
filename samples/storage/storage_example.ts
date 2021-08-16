import {
  BlobContainer,
  BlobContainersExtendImmutabilityPolicyOptionalParams,
  BlobContainersLeaseOptionalParams,
  BlobServiceProperties,
  EncryptionScope,
  FileServiceProperties,
  LegalHold,
  ManagementPolicy,
  PrivateEndpointConnection,
  StorageAccountCheckNameAvailabilityParameters,
  StorageAccountCreateParameters,
  StorageAccountRegenerateKeyParameters,
  StorageManagementClient,
} from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";
import { NetworkManagementClient, PrivateEndpoint } from "@azure/arm-network";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();
const resourceGroup = "myjstest";
const storageAccountName = "storageaccountzzzxxx";
const containerName = "containerzzz";
const encryptionScopeName = "encryptionscopezzz";
const vnetName = "virualnetworkzzz";
const subName = "subnetzzz";
const endpointName = "endpointzzz";
let client: StorageManagementClient;
let network_client: NetworkManagementClient;

//--StorageExamples--

//network_client.virtualNetworks.beginCreateOrUpdateAndWait
//network_client.subnets.beginCreateOrUpdateAndWait
//privateEndpoints.beginCreateOrUpdateAndWait
async function create_endpoint(
  resourceGroup: any,
  location: any,
  vnet_name: any,
  sub_net: any,
  endpoint_name: any,
  resource_id: any
) {
  //create VNet
  const vnet_create = await network_client.virtualNetworks.beginCreateOrUpdateAndWait(
    resourceGroup,
    vnet_name,
    { location: location, addressSpace: { addressPrefixes: ["10.0.0.0/16"] } }
  );
  console.log(vnet_create);

  //create Subnet
  const sunbet_create = await network_client.subnets.beginCreateOrUpdateAndWait(
    resourceGroup,
    vnet_name,
    sub_net,
    {
      addressPrefix: "10.0.0.0/24",
      privateLinkServiceNetworkPolicies: "disabled",
      privateEndpointNetworkPolicies: "disabled",
    }
  );
  console.log(sunbet_create);

  //create private endpoint
  const parameter: PrivateEndpoint = {
    location: location,
    privateLinkServiceConnections: [
      {
        name: "myconnection",
        privateLinkServiceId: resource_id,
        groupIds: ["blob"],
      },
    ],
    subnet: {
      id:
        "/subscriptions/" +
        subscriptionId +
        "/resourceGroups/" +
        resourceGroup +
        "/providers/Microsoft.Network/virtualNetworks/" +
        vnet_name +
        "/subnets/" +
        sub_net,
    },
  };
  const endpoint_create = await network_client.privateEndpoints.beginCreateOrUpdateAndWait(
    resourceGroup,
    endpoint_name,
    parameter
  );
  console.log(endpoint_create);
  return endpoint_create.id;
}

// storageAccounts.beginCreateAndWait
async function storageAccounts_beginCreateAndWait() {
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
  const storageaccount = await client.storageAccounts.beginCreateAndWait(
    resourceGroup,
    storageAccountName,
    parameter
  );
  console.log(storageaccount);

  //create endpoint
  await create_endpoint(
    resourceGroup,
    "eastus",
    vnetName,
    subName,
    endpointName,
    storageaccount.id
  ).then((result) => {
    console.log(result);
  });
}

//storageAccounts.getProperties
async function storageAccounts_getProperties() {
  const storageaccount = await client.storageAccounts.getProperties(
    resourceGroup,
    storageAccountName
  );
  console.log(storageaccount);
  return storageaccount;
}

//storageAccounts.listByResourceGroup
async function storageAccounts_listByResourceGroup() {
  for await (const item of client.storageAccounts.listByResourceGroup(
    resourceGroup
  )) {
    console.log(item);
  }
}

//storageAccounts.list
async function storageAccounts_list() {
  for await (const item of client.storageAccounts.list()) {
    console.log(item);
  }
}

//storageAccounts.revokeUserDelegationKeys
async function storageAccounts_revokeUserDelegationKeys() {
  await client.storageAccounts
    .revokeUserDelegationKeys(resourceGroup, storageAccountName)
    .then((res) => {
      console.log(res);
    });
}

//storageAccounts.regenerateKey
async function storageAccounts_regenerateKey() {
  const parameter: StorageAccountRegenerateKeyParameters = {
    keyName: "key2",
  };
  await client.storageAccounts
    .regenerateKey(resourceGroup, storageAccountName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//storageAccounts_listKeys
async function storageAccounts_listKeys() {
  await client.storageAccounts
    .listKeys(resourceGroup, storageAccountName)
    .then((res) => {
      console.log(res);
    });
}

//storageAccounts.checkNameAvailability
async function storageAccounts_checkNameAvailability() {
  const parameter: StorageAccountCheckNameAvailabilityParameters = {
    name: "sto3363",
    type: "Microsoft.Storage/storageAccounts",
  };
  await client.storageAccounts.checkNameAvailability(parameter).then((res) => {
    console.log(res);
  });
}

//fileServices.setServiceProperties
async function fileServices_setServiceProperties() {
  const parameter: FileServiceProperties = {
    cors: {
      corsRules: [
        {
          allowedOrigins: ["http://www.contoso.com", "http://www.fabrikam.com"],
          allowedMethods: ["GET", "HEAD", "POST", "OPTIONS", "MERGE", "PUT"],
          maxAgeInSeconds: 100,
          exposedHeaders: ["x-ms-meta-*"],
          allowedHeaders: [
            "x-ms-meta-abc",
            "x-ms-meta-data*",
            "x-ms-meta-target*",
          ],
        },
        {
          allowedOrigins: ["*"],
          allowedMethods: ["GET"],
          maxAgeInSeconds: 2,
          exposedHeaders: ["*"],
          allowedHeaders: ["*"],
        },
        {
          allowedOrigins: [
            "http://www.abc23.com",
            "https://www.fabrikam.com/*",
          ],
          allowedMethods: ["GET", "PUT"],
          maxAgeInSeconds: 2000,
          exposedHeaders: [
            "x-ms-meta-abc",
            "x-ms-meta-data*",
            "x-ms-meta-target*",
          ],
          allowedHeaders: ["x-ms-meta-12345675754564*"],
        },
      ],
    },
  };
  await client.fileServices
    .setServiceProperties(resourceGroup, storageAccountName, parameter)
    .then((result) => {
      console.log(result);
    });
}

//fileServices.getServiceProperties
async function fileServices_getServiceProperties() {
  await client.fileServices
    .getServiceProperties(resourceGroup, storageAccountName)
    .then((result) => {
      console.log(result);
    });
}

//fileServices.list
async function fileServices_list() {
  await client.fileServices
    .list(resourceGroup, storageAccountName)
    .then((result) => {
      console.log(result);
    });
}

//blobServices.setServiceProperties
async function blobServices_setServiceProperties() {
  const parameter: BlobServiceProperties = {
    cors: {
      corsRules: [
        {
          allowedOrigins: ["http://www.contoso.com", "http://www.fabrikam.com"],
          allowedMethods: ["GET", "HEAD", "POST", "OPTIONS", "MERGE", "PUT"],
          maxAgeInSeconds: 100,
          exposedHeaders: ["x-ms-meta-*"],
          allowedHeaders: [
            "x-ms-meta-abc",
            "x-ms-meta-data*",
            "x-ms-meta-target*",
          ],
        },
        {
          allowedOrigins: ["*"],
          allowedMethods: ["GET"],
          maxAgeInSeconds: 2,
          exposedHeaders: ["*"],
          allowedHeaders: ["*"],
        },
        {
          allowedOrigins: [
            "http://www.abc23.com",
            "https://www.fabrikam.com/*",
          ],
          allowedMethods: ["GET", "PUT"],
          maxAgeInSeconds: 2000,
          exposedHeaders: [
            "x-ms-meta-abc",
            "x-ms-meta-data*",
            "x-ms-meta-target*",
          ],
          allowedHeaders: ["x-ms-meta-12345675754564*"],
        },
      ],
    },
    defaultServiceVersion: "2017-07-29",
    deleteRetentionPolicy: {
      enabled: true,
      days: 300,
    },
    // isVersioningEnabled: true,    Change Feed is not supported for the account.
    // changeFeed: {
    //     enabled: true,
    //     retentionInDays: 7
    // }
  };
  await client.blobServices
    .setServiceProperties(resourceGroup, storageAccountName, parameter)
    .then((result) => {
      console.log(result);
    });
}

//blobServices.getServiceProperties
async function blobServices_getServiceProperties() {
  await client.blobServices
    .getServiceProperties(resourceGroup, storageAccountName)
    .then((result) => {
      console.log(result);
    });
}

//blobServices.list
async function blobServices_list() {
  for await (const item of client.blobServices.list(
    resourceGroup,
    storageAccountName
  )) {
    console.log(item);
  }
}

//encryptionScopes.put
async function encryptionScopes_put() {
  const parameter: EncryptionScope = {
    source: "Microsoft.Storage",
    state: "Enabled",
  };
  await client.encryptionScopes
    .put(resourceGroup, storageAccountName, encryptionScopeName, parameter)
    .then((result) => {
      console.log(result);
    });
}

//encryptionScopes.get
async function encryptionScopes_get() {
  await client.encryptionScopes
    .get(resourceGroup, storageAccountName, encryptionScopeName)
    .then((result) => {
      console.log(result);
    });
}

//encryptionScopes.list
async function encryptionScopes_list() {
  for await (const item of client.encryptionScopes.list(
    resourceGroup,
    storageAccountName
  )) {
    console.log(item);
  }
}

//encryptionScopes.patch
async function encryptionScopes_patch() {
  const parameter: EncryptionScope = {
    source: "Microsoft.Storage",
    state: "Enabled",
  };
  await client.encryptionScopes
    .patch(resourceGroup, storageAccountName, encryptionScopeName, parameter)
    .then((result) => {
      console.log(result);
    });
}

//managementPolicies.createOrUpdate
async function managementPolicies_createOrUpdate() {
  const parameter: ManagementPolicy = {
    policy: {
      rules: [
        {
          enabled: true,
          name: "olcmtest",
          type: "Lifecycle",
          definition: {
            filters: {
              blobTypes: ["blockBlob"],
              prefixMatch: ["olcmtestcontainer"],
            },
            actions: {
              baseBlob: {
                tierToCool: {
                  daysAfterModificationGreaterThan: 30,
                },
                tierToArchive: {
                  daysAfterModificationGreaterThan: 90,
                },
                delete: {
                  daysAfterModificationGreaterThan: 1000,
                },
              },
              snapshot: {
                delete: {
                  daysAfterCreationGreaterThan: 30,
                },
              },
            },
          },
        },
      ],
    },
  };
  await client.managementPolicies
    .createOrUpdate(resourceGroup, storageAccountName, "default", parameter)
    .then((result) => {
      console.log(result);
    });
}

//managementPolicies.get
async function managementPolicies_get() {
  await client.managementPolicies
    .get(resourceGroup, storageAccountName, "default")
    .then((result) => {
      console.log(result);
    });
}

//privateEndpointConnections.put
async function privateEndpointConnections_put() {
  const privateEndpointConnections = (await storageAccounts_getProperties())
    .privateEndpointConnections[0].name;

  const parameter: PrivateEndpointConnection = {
    privateLinkServiceConnectionState: {
      status: "Rejected",
      description: "Auto-Approved",
    },
  };
  await client.privateEndpointConnections
    .put(
      resourceGroup,
      storageAccountName,
      privateEndpointConnections,
      parameter
    )
    .then((result) => {
      console.log(result);
    });
}

//privateEndpointConnections.get
async function privateEndpointConnections_get() {
  const privateEndpointConnections = (await storageAccounts_getProperties())
    .privateEndpointConnections[0].name;
  await client.privateEndpointConnections
    .get(resourceGroup, storageAccountName, privateEndpointConnections)
    .then((result) => {
      console.log(result);
    });
}

//blobContainers.create
async function blobContainers_create() {
  await client.blobContainers
    .create(resourceGroup, storageAccountName, containerName, {})
    .then((result) => {
      console.log(result);
    });
}

//blobContainers.createOrUpdateImmutabilityPolicy
async function blobContainers_createOrUpdateImmutabilityPolicy() {
  const create_result = await client.blobContainers.createOrUpdateImmutabilityPolicy(
    resourceGroup,
    storageAccountName,
    containerName,
    {
      parameters: {
        immutabilityPeriodSinceCreationInDays: 3,
        allowProtectedAppendWrites: true,
      },
    }
  );
  console.log(create_result);
}

//blobContainers.getImmutabilityPolicy
async function blobContainers_getImmutabilityPolicy() {
  const get_result = await client.blobContainers.getImmutabilityPolicy(
    resourceGroup,
    storageAccountName,
    containerName
  );
  console.log(get_result);
  return get_result;
}

//blobContainers.get
async function blobContainers_get() {
  await client.blobContainers
    .get(resourceGroup, storageAccountName, containerName)
    .then((result) => {
      console.log(result);
    });
}

//blobContainers.list
async function blobContainers_list() {
  for await (const item of client.blobContainers.list(
    resourceGroup,
    storageAccountName
  )) {
    console.log(item);
  }
}

//blobContainers.setLegalHold
async function blobContainers_setLegalHold() {
  const parameter: LegalHold = {
    tags: ["tag1", "tag2", "tag3"],
  };
  await client.blobContainers
    .setLegalHold(resourceGroup, storageAccountName, containerName, parameter)
    .then((result) => {
      console.log(result);
    });
}

//blobContainers.clearLegalHold
async function blobContainers_clearLegalHold() {
  const parameter: LegalHold = {
    tags: ["tag1", "tag2", "tag3"],
  };
  await client.blobContainers
    .clearLegalHold(resourceGroup, storageAccountName, containerName, parameter)
    .then((result) => {
      console.log(result);
    });
}

//blobContainers.lease
async function blobContainers_lease() {
  const parameter: BlobContainersLeaseOptionalParams = {
    parameters: {
      action: "Acquire",
      leaseDuration: -1,
    },
  };
  const lease_info = await client.blobContainers.lease(
    resourceGroup,
    storageAccountName,
    containerName,
    parameter
  );
  console.log(lease_info);
  return lease_info;
}

//blobContainers.update
async function blobContainers_update() {
  const parameter: BlobContainer = {
    publicAccess: "Container",
    metadata: {
      metadata: "true",
    },
  };
  await client.blobContainers
    .update(resourceGroup, storageAccountName, containerName, parameter)
    .then((result) => {
      console.log(result);
    });
}

//blobContainers.deleteImmutabilityPolicy
async function blobContainers_deleteImmutabilityPolicy() {
  const etag = (await blobContainers_getImmutabilityPolicy()).eTag;
  await client.blobContainers
    .deleteImmutabilityPolicy(
      resourceGroup,
      storageAccountName,
      containerName,
      etag
    )
    .then((result) => {
      console.log(result);
    });
}

//blobContainers.lockImmutabilityPolicy
async function blobContainers_lockImmutabilityPolicy() {
  const etag = (await blobContainers_getImmutabilityPolicy()).eTag;
  await client.blobContainers
    .lockImmutabilityPolicy(
      resourceGroup,
      storageAccountName,
      containerName,
      etag
    )
    .then((res) => {
      console.log(res);
    });
}

//blobContainers.extendImmutabilityPolicy
async function blobContainers_extendImmutabilityPolicy() {
  const etag = (await blobContainers_getImmutabilityPolicy()).eTag;
  const parameter: BlobContainersExtendImmutabilityPolicyOptionalParams = {
    parameters: {
      immutabilityPeriodSinceCreationInDays: 100,
    },
  };
  await client.blobContainers
    .extendImmutabilityPolicy(
      resourceGroup,
      storageAccountName,
      containerName,
      etag,
      parameter
    )
    .then((res) => {
      console.log(res);
    });
}

//blobContainers.delete
async function blobContainers_delete() {
  await client.blobContainers
    .delete(resourceGroup, storageAccountName, containerName)
    .then((res) => {
      console.log(res);
    });
}

//privateLinkResources.listByStorageAccount
async function privateLinkResources_listByStorageAccount() {
  await client.privateLinkResources
    .listByStorageAccount(resourceGroup, storageAccountName)
    .then((result) => {
      console.log(result);
    });
}

//usages.listByLocation
async function usages_listByLocation() {
  for await (const item of client.usages.listByLocation("westeurope")) {
    console.log(item);
  }
}

//skus.list
async function skus_list() {
  for await (const item of client.skus.list()) {
    console.log(item);
  }
}

//operations.list
async function operations_list() {
  for await (const item of client.operations.list()) {
    console.log(item);
  }
}

//privateEndpointConnections.delete
async function privateEndpointConnections_delete() {
  const privateEndpointConnections = (await storageAccounts_getProperties())
    .privateEndpointConnections[0].name;
  await client.privateEndpointConnections
    .delete(resourceGroup, storageAccountName, privateEndpointConnections)
    .then((res) => {
      console.log(res);
    });
}

//managementPolicies.delete
async function managementPolicies_delete() {
  await client.managementPolicies
    .delete(resourceGroup, storageAccountName, "default")
    .then((res) => {
      console.log(res);
    });
}

//storageAccounts.delete
async function storageAccounts_delete() {
  await client.storageAccounts
    .delete(resourceGroup, storageAccountName)
    .then((res) => {
      console.log(res);
    });
}

async function main() {
  client = new StorageManagementClient(credential, subscriptionId);
  network_client = new NetworkManagementClient(credential, subscriptionId);
  await storageAccounts_beginCreateAndWait();
}

main();
