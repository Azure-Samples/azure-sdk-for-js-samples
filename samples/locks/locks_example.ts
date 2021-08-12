import { DefaultAzureCredential } from "@azure/identity";
import {
  GenericResource,
  ResourceManagementClient,
} from "@azure/arm-resources";
import { ManagementLockClient } from "@azure/arm-locks";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();
const resourceGroupName = "myjstest";
const lockName = "jslockrg";
const resourceName = "myjsresourcezzz";
const resourceId =
  "/subscriptions/" +
  subscriptionId +
  "/resourceGroups/" +
  resourceGroupName +
  "/providers/Microsoft.Compute/availabilitySets/" +
  resourceName;
let lockClient: ManagementLockClient;
let resourceClient: ResourceManagementClient;

//--LocksAtSubscriptionLevelExamples--

//managementLocks.createOrUpdateAtSubscriptionLevel
async function managementLocks_createOrUpdateAtSubscriptionLevel() {
  const result_create = await lockClient.managementLocks.createOrUpdateAtSubscriptionLevel(
    lockName,
    { level: "CanNotDelete" }
  );
  console.log(result_create);
}

//managementLocks.getAtSubscriptionLevel
async function managementLocks_getAtSubscriptionLevel() {
  await lockClient.managementLocks
    .getAtSubscriptionLevel(lockName)
    .then((result) => {
      console.log(result);
    });
}

//managementLocks.listAtSubscriptionLevel
async function managementLocks_listAtSubscriptionLevel() {
  for await (const item of lockClient.managementLocks.listAtSubscriptionLevel()) {
    console.log(item);
  }
}

//managementLocks.deleteAtSubscriptionLevel
async function managementLocks_deleteAtSubscriptionLevel() {
  const delete_result = await lockClient.managementLocks.deleteAtSubscriptionLevel(
    lockName
  );
  console.log(delete_result);
}

//--LocksByScopeExamples--

//resources.createOrUpdateById
async function resources_createOrUpdateById() {
  const parameter: GenericResource = {
    location: "eastus",
  };
  await resourceClient.resources
    .beginCreateOrUpdateByIdAndWait(resourceId, "2019-07-01", parameter)
    .then((result) => {
      console.log(result);
    });
}

//managementLocks.createOrUpdateByScope
async function managementLocks_createOrUpdateByScope() {
  const lock_create = await lockClient.managementLocks.createOrUpdateByScope(
    resourceId,
    lockName,
    { level: "CanNotDelete" }
  );
  console.log(lock_create);
}

//managementLocks.getByScope
async function managementLocks_getByScope() {
  await lockClient.managementLocks
    .getByScope(resourceId, lockName)
    .then((result) => {
      console.log(result);
    });
}

//managementLocks.listByScope
async function managementLocks_listByScope() {
  for await (const item of lockClient.managementLocks.listByScope(resourceId)) {
    console.log(item);
  }
}

//managementLocks.deleteByScope
async function managementLocks_deleteByScope() {
  await lockClient.managementLocks
    .deleteByScope(resourceId, lockName)
    .then((result) => {
      console.log(result);
    });
}

//resources.deleteById
async function resources_deleteById() {
  await resourceClient.resources
    .beginDeleteByIdAndWait(resourceId, "2019-07-01")
    .then((result) => {
      console.log(result);
    });
}

//--LocksAtResourceLevelExamples--

//resources.createOrUpdate
async function resources_createOrUpdate() {
  const create_result = await resourceClient.resources.beginCreateOrUpdateAndWait(
    resourceGroupName,
    "Microsoft.Compute",
    "",
    "availabilitySets",
    resourceName,
    "2019-07-01",
    { location: "eastus" }
  );
  console.log(create_result);
}

//managementLocks.createOrUpdateAtResourceLevel
async function managementLocks_createOrUpdateAtResourceLevel() {
  const lock_create = await lockClient.managementLocks.createOrUpdateAtResourceLevel(
    resourceGroupName,
    "Microsoft.Compute",
    "",
    "availabilitySets",
    resourceName,
    lockName,
    { level: "CanNotDelete" }
  );
  console.log(lock_create);
  console.assert(lock_create !== null);
}

//managementLocks.getAtResourceLevel
async function managementLocks_getAtResourceLevel() {
  await lockClient.managementLocks
    .getAtResourceLevel(
      resourceGroupName,
      "Microsoft.Compute",
      "",
      "availabilitySets",
      resourceName,
      lockName
    )
    .then((result) => {
      console.log(result);
    });
}

//managementLocks.listAtResourceLevel
async function managementLocks_listAtResourceLevel() {
  const arrayList = [];
  for await (const item of lockClient.managementLocks.listAtResourceLevel(
    resourceGroupName,
    "Microsoft.Compute",
    "",
    "availabilitySets",
    resourceName
  )) {
    arrayList.push(item);
    // console.log(item);
  }
  console.assert(arrayList.length === 1);
}

//managementLocks.deleteAtResourceLevel
async function managementLocks_deleteAtResourceLevel() {
  await lockClient.managementLocks
    .deleteAtResourceLevel(
      resourceGroupName,
      "Microsoft.Compute",
      "",
      "availabilitySets",
      resourceName,
      lockName
    )
    .then((result) => {
      console.log(result);
    });
}

//resources.delete
async function resources_delete() {
  await resourceClient.resources
    .beginDeleteAndWait(
      resourceGroupName,
      "Microsoft.Compute",
      "",
      "availabilitySets",
      resourceName,
      "2019-07-01"
    )
    .then((result) => {
      console.log(result);
    });
}

//--LocksAtResourceGruopLevelExamples--

//managementLocks.createOrUpdateAtResourceGroupLevel
async function managementLocks_createOrUpdateAtResourceGroupLevel() {
  const lock = await lockClient.managementLocks.createOrUpdateAtResourceGroupLevel(
    resourceGroupName,
    lockName,
    { level: "CanNotDelete" }
  );
  console.assert(lock !== null);
}

//managementLocks.getAtResourceGroupLevel
async function managementLocks_getAtResourceGroupLevel() {
  await lockClient.managementLocks
    .getAtResourceGroupLevel(resourceGroupName, lockName)
    .then((result) => {
      console.log(result);
    });
}

//managementLocks.listAtResourceGroupLevel
async function managementLocks_listAtResourceGroupLevel() {
  const arrayList = [];
  for await (const item of lockClient.managementLocks.listAtResourceGroupLevel(
    resourceGroupName
  )) {
    arrayList.push(item);
  }
  console.assert(arrayList.length === 1);
}

//managementLocks.deleteAtResourceGroupLevel
async function managementLocks_deleteAtResourceGroupLevel() {
  await lockClient.managementLocks
    .deleteAtResourceGroupLevel(resourceGroupName, lockName)
    .then((result) => {
      console.log(result);
    });
}

//authorizationOperations.list
async function authorizationOperations_list() {
  for await (const item of lockClient.authorizationOperations.list()) {
    console.log(item);
  }
}

async function main() {
  lockClient = new ManagementLockClient(credential, subscriptionId);
  resourceClient = new ResourceManagementClient(credential, subscriptionId);
  await managementLocks_createOrUpdateAtSubscriptionLevel();
}

main();
