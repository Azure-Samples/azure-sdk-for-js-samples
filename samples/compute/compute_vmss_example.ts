import {
  ComputeManagementClient,
  RunCommandInput,
  VirtualMachineScaleSet,
  VirtualMachineScaleSetExtension,
  VirtualMachineScaleSetExtensionUpdate,
  VirtualMachineScaleSetUpdate,
  VirtualMachineScaleSetVM,
  VirtualMachineScaleSetVMInstanceRequiredIDs,
} from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import { NetworkManagementClient, VirtualNetwork } from "@azure/arm-network";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();
const resourceGroupName = "myjstest";
const location = "eastus";
const virtual_machine_scale_set_name = "virtualmachinescaleset";
const networkName = "networknamex";
const subnetName = "subnetworknamex";
const vmss_extension_name = "vmssextensionx";
let client: ComputeManagementClient;
let network_client: NetworkManagementClient;

//--VirtualMachineScaleSetRollingUpgradesExamples--

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

// virtualMachineScaleSets.createOrUpdate
async function virtualMachineScaleSets_createOrUpdate() {
  const subnet = await createVirtualNetwork(
    resourceGroupName,
    location,
    networkName,
    subnetName
  );
  const parameter: VirtualMachineScaleSet = {
    sku: {
      tier: "Standard",
      capacity: 1,
      name: "Standard_D1_V2",
    },
    location: "eastus",
    overprovision: true,
    virtualMachineProfile: {
      storageProfile: {
        imageReference: {
          sku: "2016-Datacenter",
          publisher: "MicrosoftwindowsServer",
          version: "latest",
          offer: "windowsServer",
        },
        osDisk: {
          caching: "ReadWrite",
          managedDisk: {
            storageAccountType: "Standard_LRS",
          },
          createOption: "FromImage",
          diskSizeGB: 512,
        },
      },
      osProfile: {
        computerNamePrefix: "testPC",
        adminUsername: "testuser",
        adminPassword: "Aa!1()-xyz",
      },
      networkProfile: {
        networkInterfaceConfigurations: [
          {
            name: "testPC",
            primary: true,
            enableIPForwarding: true,
            ipConfigurations: [
              {
                name: "testPC",
                subnet: {
                  id:
                    "/subscriptions/" +
                    subscriptionId +
                    "/resourceGroups/" +
                    resourceGroupName +
                    "/providers/Microsoft.Network/virtualNetworks/" +
                    networkName +
                    "/subnets/" +
                    subnetName +
                    "",
                },
              },
            ],
          },
        ],
      },
    },
    upgradePolicy: {
      mode: "Manual",
      rollingUpgradePolicy: {
        maxUnhealthyUpgradedInstancePercent: 100,
        maxBatchInstancePercent: 20, // python is 100
      },
    },
  };
  // start an extension rolling upgrade.post
  await client.virtualMachineScaleSets
    .beginCreateOrUpdateAndWait(
      resourceGroupName,
      virtual_machine_scale_set_name,
      parameter
    )
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineScaleSetRollingUpgrades.startExtensionUpgrade
async function virtualMachineScaleSetRollingUpgrades_startExtensionUpgrade() {
  await client.virtualMachineScaleSetRollingUpgrades
    .beginStartExtensionUpgradeAndWait(
      resourceGroupName,
      virtual_machine_scale_set_name
    )
    .then((response) => {
      console.log(response);
    });
}

// virtualMachineScaleSetRollingUpgrades.cancel
async function virtualMachineScaleSetRollingUpgrades_cancel() {
  await client.virtualMachineScaleSetRollingUpgrades
    .beginCancelAndWait(resourceGroupName, virtual_machine_scale_set_name)
    .then((response) => {
      console.log(response);
    });
  // success (cancel ExtensionUpgrade)
}

//getLatest
async function virtualMachineScaleSetRollingUpgrades_getLatest() {
  client.virtualMachineScaleSetRollingUpgrades
    .getLatest(resourceGroupName, virtual_machine_scale_set_name)
    .then((response) => {
      console.log(response);
    });
  //success
}

//virtualMachineScaleSets.beginDeleteAndWait
async function virtualMachineScaleSet_delete() {
  await client.virtualMachineScaleSets
    .beginDeleteAndWait(resourceGroupName, virtual_machine_scale_set_name)
    .then((response) => {
      console.log(response);
    });
}

//--virtualMachineScaleSetVMsExamples--

//get instanceId
async function getInstanceId() {
  for await (const item of client.virtualMachineScaleSetVMs.list(
    resourceGroupName,
    virtual_machine_scale_set_name
  )) {
    if (item.instanceId) {
      console.log(item.instanceId);
      return item.instanceId;
    }
  }
}

//virtualMachineScaleSetVMs.getInstanceView
async function virtualMachineScaleSetVMs_getInstanceView() {
  const instanceId = await getInstanceId();
  try {
    await client.virtualMachineScaleSetVMs
      .getInstanceView(
        resourceGroupName,
        virtual_machine_scale_set_name,
        instanceId
      )
      .then((res) => {
        console.log(res);
      });
  } catch (error) {
    console.log(error);
  }
}

//virtualMachineScaleSetVMs.list
async function virtualMachineScaleSetVMs_list() {
  for await (const item of client.virtualMachineScaleSetVMs.list(
    resourceGroupName,
    virtual_machine_scale_set_name
  )) {
    console.log(item);
  }
}

//virtualMachineScaleSetVMs.get
async function virtualMachineScaleSetVMs_get() {
  const instanceId = await getInstanceId();
  await client.virtualMachineScaleSetVMs
    .get(resourceGroupName, virtual_machine_scale_set_name, instanceId)
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineScaleSetVMs.update
async function virtualMachineScaleSetVMs_update() {
  const instanceId = await getInstanceId();
  const parameter: VirtualMachineScaleSetVM = {
    location: location,
    tags: {
      department: "HR",
    },
  };
  await client.virtualMachineScaleSetVMs
    .beginUpdateAndWait(
      resourceGroupName,
      virtual_machine_scale_set_name,
      instanceId,
      parameter
    )
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineScaleSetVMs.restart
async function virtualMachineScaleSetVMs_restart() {
  const instanceId = await getInstanceId();
  await client.virtualMachineScaleSetVMs
    .beginRestartAndWait(
      resourceGroupName,
      virtual_machine_scale_set_name,
      instanceId
    )
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineScaleSetVMs.powerOff
async function virtualMachineScaleSetVMs_powerOff() {
  const instanceId = await getInstanceId();
  await client.virtualMachineScaleSetVMs
    .beginPowerOffAndWait(
      resourceGroupName,
      virtual_machine_scale_set_name,
      instanceId
    )
    .then((response) => {
      console.log(response);
      //success
    });
}

// virtualMachineScaleSetVMs.start
async function virtualMachineScaleSetVMs_start() {
  const instanceId = await getInstanceId();
  await client.virtualMachineScaleSetVMs
    .beginStartAndWait(
      resourceGroupName,
      virtual_machine_scale_set_name,
      instanceId
    )
    .then((response) => {
      console.log(response);
      //success
    });
}

//virtualMachineScaleSetVMs.runCommand
async function virtualMachineScaleSetVMs_runCommand() {
  const instanceId = await getInstanceId();
  const parameter: RunCommandInput = {
    commandId: "RunPowerShellScript",
  };
  await client.virtualMachineScaleSetVMs
    .beginRunCommandAndWait(
      resourceGroupName,
      virtual_machine_scale_set_name,
      instanceId,
      parameter
    )
    .then((response) => {
      console.log(response);
      //success
    });
}

//virtualMachineScaleSetVMs.deallocate
async function virtualMachineScaleSetVMs_deallocate() {
  const instanceId = await getInstanceId();
  await client.virtualMachineScaleSetVMs
    .beginDeallocateAndWait(
      resourceGroupName,
      virtual_machine_scale_set_name,
      instanceId
    )
    .then((response) => {
      console.log(response);
      //success
    });
}

//virtualMachineScaleSetVMs.reimage
async function virtualMachineScaleSetVMs_reimage() {
  const instanceId = await getInstanceId();
  await client.virtualMachineScaleSetVMs
    .beginReimageAndWait(
      resourceGroupName,
      virtual_machine_scale_set_name,
      instanceId
    )
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineScaleSetVMs.reimageAll
async function virtualMachineScaleSetVMs_reimageAll() {
  const instanceId = await getInstanceId();
  await client.virtualMachineScaleSetVMs
    .beginReimageAllAndWait(
      resourceGroupName,
      virtual_machine_scale_set_name,
      instanceId
    )
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineScaleSetVMs.delete
async function virtualMachineScaleSetVMs_delete() {
  const instanceId = await getInstanceId();
  await client.virtualMachineScaleSetVMs
    .beginDeleteAndWait(
      resourceGroupName,
      virtual_machine_scale_set_name,
      instanceId
    )
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineScaleSets.deleteInstances
async function virtualMachineScaleSets_deleteInstances() {
  const instanceId = await getInstanceId();
  const parameter: VirtualMachineScaleSetVMInstanceRequiredIDs = {
    instanceIds: [instanceId],
  };
  await client.virtualMachineScaleSets
    .beginDeleteInstancesAndWait(
      resourceGroupName,
      virtual_machine_scale_set_name,
      parameter
    )
    .then((response) => {
      console.log(response);
      //success
    });
}

//--virtualMachineScaleSetsExamples--

//virtualMachineScaleSets.get
async function virtualMachineScaleSets_get() {
  await client.virtualMachineScaleSets
    .get(resourceGroupName, virtual_machine_scale_set_name)
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineScaleSets.getInstanceView
async function virtualMachineScaleSets_getInstanceView() {
  await client.virtualMachineScaleSets
    .getInstanceView(resourceGroupName, virtual_machine_scale_set_name)
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineScaleSets.list
async function virtualMachineScaleSets_list() {
  for await (const item of client.virtualMachineScaleSets.list(
    resourceGroupName
  )) {
    console.log(item);
  }
}

//virtualMachineScaleSets.listAll
async function virtualMachineScaleSets_listAll() {
  for await (const item of client.virtualMachineScaleSets.listAll()) {
    console.log(item);
  }
}

//virtualMachineScaleSets.listSkus
async function virtualMachineScaleSets_listSkus() {
  for await (const item of client.virtualMachineScaleSets.listSkus(
    resourceGroupName,
    virtual_machine_scale_set_name
  )) {
    console.log;
  }
}

//virtualMachineScaleSets.update
async function virtualMachineScaleSets_update() {
  const parameter: VirtualMachineScaleSetUpdate = {
    sku: {
      tier: "Standard",
      capacity: 2,
      name: "Standard_D1_v2",
    },
    upgradePolicy: {
      mode: "Manual",
    },
  };
  await client.virtualMachineScaleSets
    .beginUpdateAndWait(
      resourceGroupName,
      virtual_machine_scale_set_name,
      parameter
    )
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineScaleSets.restart
async function virtualMachineScaleSets_restart() {
  await client.virtualMachineScaleSets
    .beginRestartAndWait(resourceGroupName, virtual_machine_scale_set_name)
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineScaleSets.powerOff
async function virtualMachineScaleSets_powerOff() {
  await client.virtualMachineScaleSets
    .beginPowerOffAndWait(resourceGroupName, virtual_machine_scale_set_name)
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineScaleSets.start
async function virtualMachineScaleSets_start() {
  // before start should poweroff scale set
  await client.virtualMachineScaleSets
    .beginStartAndWait(resourceGroupName, virtual_machine_scale_set_name)
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineScaleSets.redeploy
async function virtualMachineScaleSets_redeploy() {
  try {
    await client.virtualMachineScaleSets
      .beginRedeployAndWait(resourceGroupName, virtual_machine_scale_set_name)
      .then((response) => {
        console.log(response);
      });
  } catch (error) {
    console.log(error);
    if (error.message.startswith("(VMRedeploymentTimedOut)")) {
      throw new Error(error);
    }
  }
}

//virtualMachineScaleSets.start
async function virtualMachineScaleSets_deallocate() {
  await client.virtualMachineScaleSets
    .beginDeallocateAndWait(resourceGroupName, virtual_machine_scale_set_name)
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineScaleSetExtensions.createOrUpdate
async function virtualMachineScaleSetExtensions_createOrUpdate() {
  await virtualMachineScaleSets_createOrUpdate();
  const parameter: VirtualMachineScaleSetExtension = {
    autoUpgradeMinorVersion: true,
    publisher: "Microsoft.Azure.NetworkWatcher",
    typePropertiesType: "NetworkWatcherAgentWindows",
    typeHandlerVersion: "1.4",
  };
  await client.virtualMachineScaleSetExtensions
    .beginCreateOrUpdateAndWait(
      resourceGroupName,
      virtual_machine_scale_set_name,
      vmss_extension_name,
      parameter
    )
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineScaleSetExtensions.get
async function virtualMachineScaleSetExtensions_get() {
  await client.virtualMachineScaleSetExtensions
    .get(resourceGroupName, virtual_machine_scale_set_name, vmss_extension_name)
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineScaleSetExtensions.list
async function virtualMachineScaleSetExtensions_list() {
  for await (const item of client.virtualMachineScaleSetExtensions.list(
    resourceGroupName,
    virtual_machine_scale_set_name
  )) {
    console.log(item);
  }
}

//virtualMachineScaleSetExtensions.update
async function virtualMachineScaleSetExtensions_update() {
  // before update should poweroff scale set
  const parameter: VirtualMachineScaleSetExtensionUpdate = {
    autoUpgradeMinorVersion: true,
  };
  await client.virtualMachineScaleSetExtensions
    .beginUpdateAndWait(
      resourceGroupName,
      virtual_machine_scale_set_name,
      vmss_extension_name,
      parameter
    )
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineScaleSetExtensions.delete
async function virtualMachineScaleSetExtensions_delete() {
  await client.virtualMachineScaleSetExtensions
    .beginDeleteAndWait(
      resourceGroupName,
      virtual_machine_scale_set_name,
      vmss_extension_name
    )
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineScaleSets.delete
async function virtualMachineScaleSets_delete() {
  await client.virtualMachineScaleSets
    .beginDeleteAndWait(resourceGroupName, virtual_machine_scale_set_name)
    .then((response) => {
      console.log(response);
    });
}

async function main() {
  client = new ComputeManagementClient(credential, subscriptionId);
  network_client = new NetworkManagementClient(credential, subscriptionId);
  await virtualMachineScaleSets_createOrUpdate();
}

main();
