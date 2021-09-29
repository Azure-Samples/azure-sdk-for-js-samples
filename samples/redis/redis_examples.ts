import { DefaultAzureCredential } from "@azure/identity";
import { NetworkManagementClient, VirtualNetwork } from "@azure/arm-network";
import {
  RedisCreateParameters,
  RedisFirewallRule,
  RedisManagementClient,
  RedisPatchSchedule,
} from "azure-arm-redis";

const subscriptionId = process.env.SUBSCRIPTION_ID;
const credential = new DefaultAzureCredential();
const resourceGroupName = "myjstest1";
const location = "eastus";
const networkName = "networknamex";
const subnetName = "subnetworknamex";
const name = "myrediscachexxx";
const ruleName = "myrulexxxx";

let client: RedisManagementClient;
let network_client: NetworkManagementClient;

// virtualNetworks.beginCreateOrUpdateAndWait
// subnets.beginCreateOrUpdateAndWait
async function createVirtualNetwork(
  groupName: any,
  location: any,
  networkName: any,
  subnetName: any
) {
  const parameter: VirtualNetwork = {
    location: location,
    addressSpace: {
      addressPrefixes: ["10.0.0.0/16"],
    },
  };
  await network_client.virtualNetworks
    .beginCreateOrUpdateAndWait(groupName, networkName, parameter)
    .then((result) => {
      console.log(result);
    });
  const subnet_info = await network_client.subnets.beginCreateOrUpdateAndWait(
    groupName,
    networkName,
    subnetName,
    { addressPrefix: "10.0.0.0/24" }
  );
  console.log(subnet_info);
  return subnet_info;
}

//redis.beginCreateAndWait
async function redis_beginCreateAndWait() {
  //create network resource
  await createVirtualNetwork(
    resourceGroupName,
    location,
    networkName,
    subnetName
  );
  //create redis resource
  const parameter: RedisCreateParameters = {
    location: location,
    zones: ["1"],
    sku: {
      name: "Premium",
      family: "P",
      capacity: 1,
    },
    enableNonSslPort: true,
    shardCount: 2,
    redisConfiguration: {
      maxmemoryPolicy: "allkeys-lru",
    },
    subnetId:
      "/subscriptions/" +
      subscriptionId +
      "/resourceGroups/" +
      resourceGroupName +
      "/providers/Microsoft.Network/virtualNetworks/" +
      networkName +
      "/subnets/" +
      subnetName,
    staticIP: "10.0.0.5",
    minimumTlsVersion: "1.2",
  };
  const res = await client.redis.beginCreateAndWait(
    resourceGroupName,
    name,
    parameter
  );
  console.log(res);
}

//patchSchedules.createOrUpdate
async function patchSchedules_createOrUpdate() {
  const parameter: RedisPatchSchedule = {
    scheduleEntries: [
      {
        dayOfWeek: "Monday",
        startHourUtc: 12,
        maintenanceWindow: "PT5H",
      },
      {
        dayOfWeek: "Tuesday",
        startHourUtc: 12,
      },
    ],
  };
  const res = await client.patchSchedules.createOrUpdate(
    resourceGroupName,
    name,
    parameter,
    "default"
  );
  console.log(res);
}

//firewallRules.createOrUpdate
async function firewallRules_createOrUpdate() {
  const parameter: RedisFirewallRule = {
    startIP: "10.0.1.1",
    endIP: "10.0.1.4",
  };
  const res = await client.firewallRules.createOrUpdate(
    resourceGroupName,
    name,
    ruleName,
    parameter
  );
  console.log(res);
}

//firewallRules.get
async function firewallRules_get() {
  const parameter: RedisFirewallRule = {
    startIP: "10.0.1.1",
    endIP: "10.0.1.4",
  };
  const res = await client.firewallRules.get(resourceGroupName, name, ruleName);
  console.log(res);
}

//patchSchedules.listByRedisResource
async function patchSchedules_listByRedisResource() {
  for await (const item of client.patchSchedules.listByRedisResource(
    resourceGroupName,
    name
  )) {
    console.log(item);
  }
}

//firewallRules.list
async function firewallRules_list() {
  for await (const item of client.firewallRules.list(resourceGroupName, name)) {
    console.log(item);
  }
}

//linkedServer.list
async function linkedServer_list() {
  for await (const item of client.linkedServer.list(resourceGroupName, name)) {
    console.log(item);
  }
}

//redis.listByResourceGroup
async function redis_listByResourceGroup() {
  for await (const item of client.redis.listByResourceGroup(
    resourceGroupName
  )) {
    console.log(item);
  }
}

//operations.list
async function operations_list() {
  for await (const item of client.operations.list()) {
    console.log(item);
  }
}

//redis.regenerateKey
async function redis_regenerateKey() {
  const res = await client.redis.regenerateKey(resourceGroupName, name, {
    keyType: "Primary",
  });
  console.log(res);
}

//redis.forceReboot
async function redis_forceReboot() {
  const res = await client.redis.forceReboot(resourceGroupName, name, {
    shardId: 0,
    rebootType: "AllNodes",
  });
  console.log(res);
}

//redis.get
async function redis_get() {
  const res = await client.redis.get(resourceGroupName, name);
  console.log(res);
}

//redis.listKeys
async function redis_listKeys() {
  const res = await client.redis.listKeys(resourceGroupName, name);
  console.log(res);
}

//redis.update
async function redis_update() {
  const res = await client.redis.update(resourceGroupName, name, {
    enableNonSslPort: true,
  });
  console.log(res);
}

//redis.checkNameAvailability
async function redis_checkNameAvailability() {
  const res = await client.redis.checkNameAvailability({
    type: "Microsoft.Cache/Redis",
    name: "cacheName",
  });
  console.log(res);
}

//firewallRules.delete
async function firewallRules_delete() {
  const res = await client.firewallRules.delete(
    resourceGroupName,
    name,
    ruleName
  );
  console.log(res);
}

//patchSchedules.delete
async function patchSchedules_delete() {
  const res = await client.patchSchedules.delete(
    resourceGroupName,
    name,
    "default"
  );
  console.log(res);
}

//redis.beginDeleteAndWait
async function redis_beginDeleteAndWait() {
  const res = await client.redis.beginDeleteAndWait(resourceGroupName, name);
  console.log(res);
}

async function main() {
  client = new RedisManagementClient(credential, subscriptionId);
  network_client = new NetworkManagementClient(credential, subscriptionId);
  await patchSchedules_listByRedisResource();
}

main();
