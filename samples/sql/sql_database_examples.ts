import {
  BackupShortTermRetentionPolicy,
  CreateDatabaseRestorePointDefinition,
  Database,
  DatabaseBlobAuditingPolicy,
  DatabaseUpdate,
  LongTermRetentionPolicy,
  ResourceMoveDefinition,
  Server,
  SqlManagementClient,
  WorkloadGroup,
} from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";
import {
  StorageAccountCreateParameters,
  StorageManagementClient,
} from "@azure/arm-storage";

const subscriptionId =
  process.env.subscriptionId || "00000000-0000-0000-0000-000000000000";
const credential = new DefaultAzureCredential();
const resourceGroup = "myjstest";
const databaseName = "mydatabasezzz";
const serverName = "myserverzzz";
const policyName = "default";
const storageAccountName = "myaccountzzz";
const blobContainerName = "myblobzzzz";
const workloadGroupName = "myworkloadgroupzzz";
const transparentDataEncryptionName = "current";
const geobackupPolicyName = "default";
const connectionPolicyName = "myconnectionpolicyzzz";
const databaseName2 = "mydatabasezzz2";
let client: SqlManagementClient;
let storage_client: StorageManagementClient;

//--BackUpShortTermRetentionPolicyExamples--

//servers.createOrUpdate
async function servers_createOrUpdate() {
  const parameter: Server = {
    location: "eastus",
    administratorLogin: "dummylogin",
    administratorLoginPassword: "Un53cuRE!",
    version: "12.0",
  };
  const res = await client.servers.createOrUpdate(
    resourceGroup,
    serverName,
    parameter
  );
  console.log(res);
}

//databases.createOrUpdate
async function databases_createOrUpdateAboutBackupShortTermRetentionPolicies() {
  const parameter: Database = {
    location: "eastus",
    sku: {
      name: "BC_Gen5",
      capacity: 2,
    },
  };
  await client.databases
    .createOrUpdate(resourceGroup, serverName, databaseName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//backupShortTermRetentionPolicies.createOrUpdate
async function backupShortTermRetentionPolicies_createOrUpdate() {
  const parameter: BackupShortTermRetentionPolicy = {
    retentionDays: 14,
  };
  await client.backupShortTermRetentionPolicies
    .createOrUpdate(
      resourceGroup,
      serverName,
      databaseName,
      policyName,
      parameter
    )
    .then((res) => {
      console.log(res);
    });
}

//backupShortTermRetentionPolicies.get
async function backupShortTermRetentionPolicies_get() {
  await client.backupShortTermRetentionPolicies
    .get(resourceGroup, serverName, databaseName, policyName)
    .then((res) => {
      console.log(res);
    });
}

//backupShortTermRetentionPolicies.listByDatabase
async function backupShortTermRetentionPolicies_listByDatabase() {
  for await (const item of client.backupShortTermRetentionPolicies.listByDatabase(
    resourceGroup,
    serverName,
    databaseName
  )) {
    console.log(item);
  }
}

//backupShortTermRetentionPolicies.update
async function backupShortTermRetentionPolicies_update() {
  const parameter: BackupShortTermRetentionPolicy = {
    retentionDays: 14,
  };
  await client.backupShortTermRetentionPolicies
    .update(resourceGroup, serverName, databaseName, policyName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//databases.delete
async function databases_deleteAboutBackupShortTermRetentionPolicies() {
  const res = await client.databases.delete(
    resourceGroup,
    serverName,
    databaseName
  );
  console.log(res);
}

//--RestorePointsExamples--

//databases.createOrUpdate
async function databases_createOrUpdateAboutRestorePoints() {
  const parameter: Database = {
    location: "eastus",
    sku: {
      name: "DataWarehouse",
      tier: "DataWarehouse",
    },
  };
  await client.databases
    .createOrUpdate(resourceGroup, serverName, databaseName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//restorePoints.create
async function restorePoints_create() {
  const parameter: CreateDatabaseRestorePointDefinition = {
    restorePointLabel: "mylabel",
  };
  await client.restorePoints
    .create(resourceGroup, serverName, databaseName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//restorePoints.listByDatabase
async function restorePoints_listByDatabase() {
  for await (const item of client.restorePoints.listByDatabase(
    resourceGroup,
    serverName,
    databaseName
  )) {
    console.log(item);
    return item.name;
  }
}

//restorePoints.get
async function restorePoints_get() {
  const restorePointName = await restorePoints_listByDatabase();
  await client.restorePoints
    .get(resourceGroup, serverName, databaseName, restorePointName as string)
    .then((res) => {
      console.log(res);
    });
}

//restorePoints.delete
async function restorePoints_delete() {
  const restorePointName = await restorePoints_listByDatabase();
  await client.restorePoints
    .delete(resourceGroup, serverName, databaseName, restorePointName as string)
    .then((res) => {
      console.log(res);
    });
}

//databases.delete
async function databases_deleteAboutRestorePoints() {
  const res = await client.databases.delete(
    resourceGroup,
    serverName,
    databaseName
  );
  console.log(res);
}

//--DatabaseAutomaticTuningExamples--

//databases.createOrUpdate
async function databases_createOrUpdateInCommon() {
  const parameter: Database = {
    location: "eastus",
  };
  await client.databases
    .createOrUpdate(resourceGroup, serverName, databaseName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//databaseAutomaticTuningOperations.get
async function databaseAutomaticTuningOperations_get() {
  await client.databaseAutomaticTuningOperations
    .get(resourceGroup, serverName, databaseName)
    .then((res) => {
      console.log(res);
    });
}

//databaseAutomaticTuningOperations.update
async function databaseAutomaticTuningOperations_update() {
  await client.databaseAutomaticTuningOperations
    .update(resourceGroup, serverName, databaseName, { desiredState: "Auto" })
    .then((res) => {
      console.log(res);
    });
}

//--DatabaseAdvisorsExamples--

//databaseAdvisors.listByDatabase
async function databaseAdvisors_listByDatabase() {
  await client.databaseAdvisors
    .listByDatabase(resourceGroup, serverName, databaseName)
    .then((res) => {
      console.log(res);
      return res[0].name;
    });
}

//databaseAdvisors.get
async function databaseAdvisors_get() {
  const name = await databaseAdvisors_listByDatabase();
  await client.databaseAdvisors
    .get(resourceGroup, serverName, databaseName, "CreateIndex")
    .then((res) => {
      console.log(res);
    });
}

//--DatabaseBlobAuditingPoliciesExamples--

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
  const keys = res.keys;
  if (!keys || keys.length === 0) {
    throw new Error("No storage account keys were returned.");
  }
  return keys[0].value;
}

//databaseBlobAuditingPolicies.createOrUpdate
async function databaseBlobAuditingPolicies_createOrUpdate() {
  const accessKy = await createStorageAccountAndBlobContainer();
  const parameter: DatabaseBlobAuditingPolicy = {
    state: "Enabled",
    storageAccountAccessKey: accessKy,
    storageEndpoint: "https://" + storageAccountName + ".blob.core.windows.net",
  };
  await client.databaseBlobAuditingPolicies
    .createOrUpdate(resourceGroup, serverName, databaseName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//databaseBlobAuditingPolicies.get
async function databaseBlobAuditingPolicies_get() {
  await client.databaseBlobAuditingPolicies
    .get(resourceGroup, serverName, databaseName)
    .then((res) => {
      console.log(res);
    });
}

//--WordLoadExamples--

//workloadGroups.createOrUpdate
async function workloadGroups_createOrUpdate() {
  const parameter: WorkloadGroup = {
    minResourcePercent: 0,
    maxResourcePercent: 100,
    minResourcePercentPerRequest: 3,
  };
  await client.workloadGroups
    .createOrUpdate(
      resourceGroup,
      serverName,
      databaseName,
      workloadGroupName,
      parameter
    )
    .then((res) => {
      console.log(res);
    });
}

//workloadGroups.get
async function workloadGroups_get() {
  await client.workloadGroups
    .get(resourceGroup, serverName, databaseName, workloadGroupName)
    .then((res) => {
      console.log(res);
    });
}

//workloadGroups.listByDatabase
async function workloadGroups_listByDatabase() {
  for await (const item of client.workloadGroups.listByDatabase(
    resourceGroup,
    serverName,
    databaseName
  )) {
    console.log(item);
  }
}

//workloadGroups.delete
async function workloadGroups_delete() {
  await client.workloadGroups
    .delete(resourceGroup, serverName, databaseName, workloadGroupName)
    .then((res) => {
      console.log(res);
    });
}

//--LongTermRetentionBackupExamples--

//longTermRetentionBackups.listByResourceGroupDatabase
async function longTermRetentionBackups_listByResourceGroupDatabase() {
  for await (const item of client.longTermRetentionBackups.listByResourceGroupDatabase(
    resourceGroup,
    "eastus",
    serverName,
    databaseName
  )) {
    console.log(item);
  }
}

//longTermRetentionBackups.listByResourceGroupServer
async function longTermRetentionBackups_listByResourceGroupServer() {
  for await (const item of client.longTermRetentionBackups.listByResourceGroupServer(
    resourceGroup,
    "eastus",
    serverName
  )) {
    console.log(item);
  }
}

//longTermRetentionBackups.listByResourceGroupLocation
async function longTermRetentionBackups_listByResourceGroupLocation() {
  for await (const item of client.longTermRetentionBackups.listByResourceGroupLocation(
    resourceGroup,
    "eastus"
  )) {
    console.log(item);
  }
}

//longTermRetentionPolicies.createOrUpdate
async function longTermRetentionPolicies_createOrUpdate() {
  const parameter: LongTermRetentionPolicy = {
    weeklyRetention: "P1M",
    monthlyRetention: "P1Y",
    yearlyRetention: "P5Y",
    weekOfYear: 5,
  };
  await client.longTermRetentionPolicies
    .createOrUpdate(
      resourceGroup,
      serverName,
      databaseName,
      policyName,
      parameter
    )
    .then((res) => {
      console.log(res);
    });
}

//longTermRetentionPolicies.get
async function longTermRetentionPolicies_get() {
  await client.longTermRetentionPolicies
    .get(resourceGroup, serverName, databaseName, policyName)
    .then((res) => {
      console.log(res);
    });
}

//longTermRetentionPolicies.listByDatabase
async function longTermRetentionPolicies_listByDatabase() {
  for await (const item of client.longTermRetentionPolicies.listByDatabase(
    resourceGroup,
    serverName,
    databaseName
  )) {
    console.log(item);
  }
}

//--TransparentDataEncryptionExamples--

//transparentDataEncryptions.createOrUpdate
async function transparentDataEncryptions_createOrUpdate() {
  await client.transparentDataEncryptions
    .createOrUpdate(
      resourceGroup,
      serverName,
      databaseName,
      transparentDataEncryptionName,
      { state: "Enabled" }
    )
    .then((res) => {
      console.log(res);
    });
}

//transparentDataEncryptions.get
async function transparentDataEncryptions_get() {
  await client.transparentDataEncryptions
    .get(resourceGroup, serverName, databaseName, transparentDataEncryptionName)
    .then((res) => {
      console.log(res);
    });
}

//--GeoBackupPolicyExamples--

//geoBackupPolicies.createOrUpdate
async function geoBackupPolicies_createOrUpdate() {
  await client.geoBackupPolicies
    .createOrUpdate(
      resourceGroup,
      serverName,
      databaseName,
      geobackupPolicyName,
      { state: "Enabled" }
    )
    .then((res) => {
      console.log(res);
    });
}

//geoBackupPolicies.get
async function geoBackupPolicies_get() {
  await client.geoBackupPolicies
    .get(resourceGroup, serverName, databaseName, geobackupPolicyName)
    .then((res) => {
      console.log(res);
    });
}

//geoBackupPolicies.listByDatabase
async function geoBackupPolicies_listByDatabase() {
  for await (const item of client.geoBackupPolicies.list(
    resourceGroup,
    serverName,
    databaseName
  )) {
    console.log(item);
  }
}

//-DatamaskingExamples--

//dataMaskingPolicies.createOrUpdate
async function dataMaskingPolicies_createOrUpdate() {
  await client.dataMaskingPolicies
    .createOrUpdate(resourceGroup, serverName, databaseName, {
      dataMaskingState: "Disabled",
    })
    .then((res) => {
      console.log(res);
    });
}

//dataMaskingPolicies.get
async function dataMaskingPolicies_get() {
  await client.dataMaskingPolicies
    .get(resourceGroup, serverName, databaseName)
    .then((res) => {
      console.log(res);
    });
}

//dataMaskingRules.listByDatabase
async function dataMaskingRules_listByDatabase() {
  for await (const item of client.dataMaskingRules.listByDatabase(
    resourceGroup,
    serverName,
    databaseName
  )) {
    console.log(item);
  }
}

//databases.delete
async function databases_delete() {
  const res = await client.databases.delete(
    resourceGroup,
    serverName,
    databaseName
  );
  console.log(res);
}

//--DatabaseOperationExamples--

//databases.createOrUpdate
async function databases_createOrUpdateAboutdatabaseOperations() {
  const parameter: Database = {
    location: "eastus",
    readScale: "Disabled",
  };
  await client.databases
    .createOrUpdate(resourceGroup, serverName, databaseName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//databaseOperations.listByDatabase
async function databaseOperations_listByDatabase() {
  for await (const item of client.databaseOperations.listByDatabase(
    resourceGroup,
    serverName,
    databaseName
  )) {
    console.log(item);
    return item.name;
  }
}

//databaseOperations.cancel
async function databaseOperations_cancel() {
  const opdatetionId = await databaseOperations_listByDatabase();
  await client.databaseOperations
    .cancel(resourceGroup, serverName, databaseName, opdatetionId as string)
    .then((res) => {
      console.log(res);
    });
}

//databases.delete
async function databases_deleteAboutdatabaseOperations() {
  const res = await client.databases.delete(
    resourceGroup,
    serverName,
    databaseName
  );
  console.log(res);
}

//--DatabaseExamples--

//databases.createOrUpdate
async function databases_createOrUpdate() {
  const parameter: Database = {
    location: "eastus",
    readScale: "Disabled",
  };
  await client.databases
    .createOrUpdate(resourceGroup, serverName, databaseName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//serverConnectionPolicies.createOrUpdate
async function serverConnectionPolicies_createOrUpdate() {
  await client.serverConnectionPolicies
    .createOrUpdate(resourceGroup, serverName, connectionPolicyName, {
      connectionType: "Proxy",
    })
    .then((res) => {
      console.log(res);
    });
}

//serverConnectionPolicies.get
async function serverConnectionPolicies_get() {
  await client.serverConnectionPolicies
    .get(resourceGroup, serverName, connectionPolicyName)
    .then((res) => {
      console.log(res);
    });
}

//databases.get
async function databases_get() {
  await client.databases
    .get(resourceGroup, serverName, databaseName)
    .then((res) => {
      console.log(res);
    });
}

//databases.listByServer
async function databases_listByServer() {
  for await (const item of client.databases.listByServer(
    resourceGroup,
    serverName
  )) {
    console.log(item);
  }
}

//databaseUsages.listByDatabase
async function databaseUsages_listByDatabase() {
  for await (const item of client.databaseUsages.listByDatabase(
    resourceGroup,
    serverName,
    databaseName
  )) {
    console.log(item);
  }
}

//databases.rename
async function databases_rename() {
  const parameter: ResourceMoveDefinition = {
    id:
      "/subscriptions/" +
      subscriptionId +
      "/resourceGroups/" +
      resourceGroup +
      "/providers/Microsoft.Sql/servers/" +
      serverName +
      "/databases/" +
      databaseName +
      "2",
  };
  await client.databases
    .rename(resourceGroup, serverName, databaseName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//databases.update
async function databases_update() {
  const parameter: DatabaseUpdate = {
    sku: {
      name: "S1",
      tier: "Standard",
    },
    collation: "SQL_Latin1_General_CP1_CI_AS",
    maxLogSizeBytes: 1073741824,
  };
  await client.databases
    .update(resourceGroup, serverName, databaseName2, parameter)
    .then((res) => {
      console.log(res);
    });
}

//databases.failover
async function databases_failover() {
  await client.databases
    .failover(resourceGroup, serverName, databaseName2, {
      replicaType: "Primary",
    })
    .then((res) => {
      console.log(res);
    });
}

//servers.delete
async function servers_delete() {
  const res = await client.servers.delete(resourceGroup, serverName);
  console.log(res);
}

async function main() {
  client = new SqlManagementClient(credential, subscriptionId);
  storage_client = new StorageManagementClient(credential, subscriptionId);
  await servers_createOrUpdate();
}

main();
