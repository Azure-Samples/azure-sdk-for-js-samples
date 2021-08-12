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
} from "azure-arm-sql";
import { DefaultAzureCredential } from "@azure/identity";
import {
  StorageAccountCreateParameters,
  StorageManagementClient,
} from "@azure/arm-storage";

const subscriptionId = process.env.subscriptionId;
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

//servers.beginCreateOrUpdateAndWait
async function servers_beginCreateOrUpdateAndWait() {
  const parameter: Server = {
    location: "eastus",
    administratorLogin: "dummylogin",
    administratorLoginPassword: "Un53cuRE!",
    version: "12.0",
  };
  await client.servers
    .beginCreateOrUpdateAndWait(resourceGroup, serverName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//databases.beginCreateOrUpdateAndWait
async function databases_beginCreateOrUpdateAndWaitAboutBackupShortTermRetentionPolicies() {
  const parameter: Database = {
    location: "eastus",
    sku: {
      name: "BC_Gen5",
      capacity: 2,
    },
  };
  await client.databases
    .beginCreateOrUpdateAndWait(
      resourceGroup,
      serverName,
      databaseName,
      parameter
    )
    .then((res) => {
      console.log(res);
    });
}

//backupShortTermRetentionPolicies.beginCreateOrUpdateAndWait
async function backupShortTermRetentionPolicies_beginCreateOrUpdateAndWait() {
  const parameter: BackupShortTermRetentionPolicy = {
    retentionDays: 14,
  };
  await client.backupShortTermRetentionPolicies
    .beginCreateOrUpdateAndWait(
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

//backupShortTermRetentionPolicies.beginUpdateAndWait
async function backupShortTermRetentionPolicies_beginUpdateAndWait() {
  const parameter: BackupShortTermRetentionPolicy = {
    retentionDays: 14,
  };
  await client.backupShortTermRetentionPolicies
    .beginUpdateAndWait(
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

//databases.beginDeleteAndWaitAboutBackupShortTermRetentionPolicies
async function databases_beginDeleteAndWaitAboutBackupShortTermRetentionPolicies() {
  const res = await client.databases.beginDeleteAndWait(
    resourceGroup,
    serverName,
    databaseName
  );
  console.log(res);
}

//--RestorePointsExamples--

//databases.beginCreateOrUpdateAndWait
async function databases_beginCreateOrUpdateAndWaitAboutRestorePoints() {
  const parameter: Database = {
    location: "eastus",
    sku: {
      name: "DataWarehouse",
      tier: "DataWarehouse",
    },
  };
  await client.databases
    .beginCreateOrUpdateAndWait(
      resourceGroup,
      serverName,
      databaseName,
      parameter
    )
    .then((res) => {
      console.log(res);
    });
}

//restorePoints.beginCreateAndWait
async function restorePoints_beginCreateAndWait() {
  const parameter: CreateDatabaseRestorePointDefinition = {
    restorePointLabel: "mylabel",
  };
  await client.restorePoints
    .beginCreateAndWait(resourceGroup, serverName, databaseName, parameter)
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
    .get(resourceGroup, serverName, databaseName, restorePointName)
    .then((res) => {
      console.log(res);
    });
}

//restorePoints.delete
async function restorePoints_delete() {
  const restorePointName = await restorePoints_listByDatabase();
  await client.restorePoints
    .delete(resourceGroup, serverName, databaseName, restorePointName)
    .then((res) => {
      console.log(res);
    });
}

//databases.beginDeleteAndWaitAboutRestorePoints
async function databases_beginDeleteAndWaitAboutRestorePoints() {
  const res = await client.databases.beginDeleteAndWait(
    resourceGroup,
    serverName,
    databaseName
  );
  console.log(res);
}

//--DatabaseAutomaticTuningExamples--

//databases.beginCreateOrUpdateAndWaitInCommon
async function databases_beginCreateOrUpdateAndWaitInCommon() {
  const parameter: Database = {
    location: "eastus",
  };
  await client.databases
    .beginCreateOrUpdateAndWait(
      resourceGroup,
      serverName,
      databaseName,
      parameter
    )
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

//workloadGroups.beginCreateOrUpdateAndWait
async function workloadGroups_beginCreateOrUpdateAndWait() {
  const parameter: WorkloadGroup = {
    minResourcePercent: 0,
    maxResourcePercent: 100,
    minResourcePercentPerRequest: 3,
  };
  await client.workloadGroups
    .beginCreateOrUpdateAndWait(
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

//workloadGroups.beginDeleteAndWait
async function workloadGroups_beginDeleteAndWait() {
  await client.workloadGroups
    .beginDeleteAndWait(
      resourceGroup,
      serverName,
      databaseName,
      workloadGroupName
    )
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

//longTermRetentionPolicies.beginCreateOrUpdateAndWait
async function longTermRetentionPolicies_beginCreateOrUpdateAndWait() {
  const parameter: LongTermRetentionPolicy = {
    weeklyRetention: "P1M",
    monthlyRetention: "P1Y",
    yearlyRetention: "P5Y",
    weekOfYear: 5,
  };
  await client.longTermRetentionPolicies
    .beginCreateOrUpdateAndWait(
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
      { status: "Enabled" }
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

//transparentDataEncryptions.listByConfiguration
async function transparentDataEncryptions_listByConfiguration() {
  for await (const item of client.transparentDataEncryptionActivities.listByConfiguration(
    resourceGroup,
    serverName,
    databaseName,
    transparentDataEncryptionName
  )) {
    console.log(item);
  }
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
  for await (const item of client.geoBackupPolicies.listByDatabase(
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

//databases.beginDeleteAndWaitInCommon
async function databases_beginDeleteAndWaitInCommon() {
  const res = await client.databases.beginDeleteAndWait(
    resourceGroup,
    serverName,
    databaseName
  );
  console.log(res);
}

//--DatabaseOperationExamples--

//databases.beginCreateOrUpdateAndWaitAboutdatabaseOperations
async function databases_beginCreateOrUpdateAndWaitAboutdatabaseOperations() {
  const parameter: Database = {
    location: "eastus",
    readScale: "Disabled",
  };
  await client.databases
    .beginCreateOrUpdateAndWait(
      resourceGroup,
      serverName,
      databaseName,
      parameter
    )
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
    .cancel(resourceGroup, serverName, databaseName, opdatetionId)
    .then((res) => {
      console.log(res);
    });
}

//databases.beginDeleteAndWaitAboutdatabaseOperations
async function databases_beginDeleteAndWaitAboutdatabaseOperations() {
  const res = await client.databases.beginDeleteAndWait(
    resourceGroup,
    serverName,
    databaseName
  );
  console.log(res);
}

//--DatabaseExamples--

//databases.beginCreateOrUpdateAndWait
async function databases_beginCreateOrUpdateAndWait() {
  const parameter: Database = {
    location: "eastus",
    readScale: "Disabled",
  };
  await client.databases
    .beginCreateOrUpdateAndWait(
      resourceGroup,
      serverName,
      databaseName,
      parameter
    )
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

//databases.listMetrics
async function databases_listMetrics() {
  for await (const item of client.databases.listMetrics(
    resourceGroup,
    serverName,
    databaseName,
    "name/value eq 'cpu_percent' and timeGrain eq '00:10:00' and startTime eq '2017-06-02T18:35:00Z' and endTime eq '2017-06-02T18:55:00Z'"
  )) {
    console.log(item);
  }
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

//databases.beginUpdateAndWait
async function databases_beginUpdateAndWait() {
  const parameter: DatabaseUpdate = {
    sku: {
      name: "S1",
      tier: "Standard",
    },
    collation: "SQL_Latin1_General_CP1_CI_AS",
    maxLogSizeBytes: 1073741824,
  };
  await client.databases
    .beginUpdateAndWait(resourceGroup, serverName, databaseName2, parameter)
    .then((res) => {
      console.log(res);
    });
}

//databases.beginFailoverAndWait
async function databases_beginFailoverAndWait() {
  await client.databases
    .beginFailoverAndWait(resourceGroup, serverName, databaseName2, {
      replicaType: "Primary",
    })
    .then((res) => {
      console.log(res);
    });
}

//databases.beginDeleteAndWait
async function databases_beginDeleteAndWait() {
  const res = await client.databases.beginDeleteAndWait(
    resourceGroup,
    serverName,
    databaseName
  );
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
