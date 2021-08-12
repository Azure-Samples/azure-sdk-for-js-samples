import {
  ComputeManagementClient,
  Disk,
  DiskUpdate,
  GrantAccessData,
  Image,
  ImageUpdate,
  Snapshot,
} from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import { ResourceManagementClient } from "@azure/arm-resources";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();
const resourceGroupName = "myjstest";
const location = "eastus";
const disk_name = "disknamex";
const shapshot_name = "snapshotx";
const image_name = "imagex";
let client: ComputeManagementClient;

//--DisksExamples--

//disks.createOrUpdate
async function disks_createOrUpdate() {
  const parameter: Disk = {
    location: "eastus",
    creationData: {
      createOption: "Empty",
    },
    diskSizeGB: 200,
  };
  await client.disks
    .beginCreateOrUpdateAndWait(resourceGroupName, disk_name, parameter)
    .then((response) => {
      console.log(response);
    });
}

//disks.get
async function disks_get() {
  await client.disks.get(resourceGroupName, disk_name).then((response) => {
    console.log(response);
  });
}

//disks.listByResourceGroup
async function disks_listByResourceGroup() {
  for await (const item of client.disks.listByResourceGroup(
    resourceGroupName
  )) {
    console.log(item);
  }
}

//disks.list
async function disks_list() {
  for await (const item of client.disks.list()) {
    console.log(item);
  }
}

//disks.update
async function disks_update() {
  const parameter: DiskUpdate = {
    diskSizeGB: 200,
  };
  await client.disks
    .beginUpdateAndWait(resourceGroupName, disk_name, parameter)
    .then((response) => {
      console.log(response);
    });
}

//disks.grantAccess
async function disks_grantAccess() {
  const parameter: GrantAccessData = {
    access: "Read",
    durationInSeconds: 1800,
  };
  await client.disks
    .beginGrantAccessAndWait(resourceGroupName, disk_name, parameter)
    .then((response) => {
      console.log(response);
    });
}

//disks.revokeAccess
async function disks_revokeAccess() {
  await client.disks
    .beginRevokeAccessAndWait(resourceGroupName, disk_name)
    .then((response) => {
      console.log(response);
    });
}

//--SnapshotsExamples--

//snapshots.createOrUpdate
async function snapshots_createOrUpdate() {
  const parameter: Snapshot = {
    location: "eastus",
    creationData: {
      createOption: "Copy",
      sourceUri:
        "/subscriptions/" +
        subscriptionId +
        "/resourceGroups/" +
        resourceGroupName +
        "/providers/Microsoft.Compute/disks/" +
        disk_name,
    },
  };
  await client.snapshots
    .beginCreateOrUpdateAndWait(resourceGroupName, shapshot_name, parameter)
    .then((response) => {
      console.log(response);
    });
}

//snapshots.get
async function snapshots_get() {
  await client.snapshots
    .get(resourceGroupName, shapshot_name)
    .then((response) => {
      console.log(response);
    });
}

//snapshots.listByResourceGroup
async function snapshots_listByResourceGroup() {
  for await (const item of client.snapshots.listByResourceGroup(
    resourceGroupName
  )) {
    console.log(item);
  }
}

//snapshots.list
async function snapshots_list() {
  for await (const item of client.snapshots.list()) {
    console.log(item);
  }
}

//snapshots.grantAccess
async function snapshots_grantAccess() {
  const parameter: GrantAccessData = {
    access: "Read",
    durationInSeconds: 1800,
  };
  await client.snapshots
    .beginGrantAccessAndWait(resourceGroupName, shapshot_name, parameter)
    .then((response) => {
      console.log(response);
    });
}

//snapshots.revokeAccess
async function snapshots_revokeAccess() {
  await client.snapshots
    .beginRevokeAccessAndWait(resourceGroupName, shapshot_name)
    .then((response) => {
      console.log(response);
    });
}

//snapshots.delete
async function snapshots_delete() {
  await client.snapshots
    .beginDeleteAndWait(resourceGroupName, shapshot_name)
    .then((response) => {
      console.log(response);
    });
}

//images.createOrUpdate
async function images_createOrUpdate() {
  const parameter: Image = {
    location: "eastus",
    storageProfile: {
      osDisk: {
        osType: "Linux",
        snapshot: {
          id:
            "subscriptions/" +
            subscriptionId +
            "/resourceGroups/" +
            resourceGroupName +
            "/providers/Microsoft.Compute/snapshots/" +
            shapshot_name,
        },
        osState: "Generalized",
      },
      zoneResilient: false,
    },
    hyperVGeneration: "V1",
  };
  await client.images
    .beginCreateOrUpdateAndWait(resourceGroupName, image_name, parameter)
    .then((response) => {
      console.log(response);
    });
}

//images.get
async function images_get() {
  await client.images.get(resourceGroupName, image_name).then((response) => {
    console.log(response);
  });
}

//images.listByResourceGroup
async function images_listByResourceGroup() {
  for await (const item of client.images.listByResourceGroup(
    resourceGroupName
  )) {
    console.log(item);
  }
}

//images.list
async function images_list() {
  for await (const item of client.images.list()) {
    console.log(item);
  }
}

//images.update
async function images_update() {
  const parameter: ImageUpdate = {
    tags: {
      ["department"]: "HR",
    },
  };
  await client.images
    .beginUpdateAndWait(resourceGroupName, image_name, parameter)
    .then((response) => {
      console.log(response);
    });
}

//images.delete
async function images_delete() {
  await client.images
    .beginDeleteAndWait(resourceGroupName, image_name)
    .then((response) => {
      console.log(response);
    });
}

//disks.delete
async function disks_delete() {
  await client.disks
    .beginDeleteAndWait(resourceGroupName, disk_name)
    .then((response) => {
      console.log(response);
    });
}

async function main() {
  client = new ComputeManagementClient(credential, subscriptionId);
  await disks_createOrUpdate();
}

main();
