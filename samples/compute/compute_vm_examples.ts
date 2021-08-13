import {
  ComputeManagementClient,
  RunCommandInput,
  VirtualMachine,
  VirtualMachineExtension,
  VirtualMachineExtensionUpdate,
  VirtualMachineUpdate,
} from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
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
const virtual_machine_name = "virtualmachinex";
const subnet_name = "subnetnamex";
const interface_name = "interfacex";
const network_name = "networknamex";
const virtual_machine_extension_name = "virtualmachineextensionx";
const publisher_name = "MicrosoftWindowsServer";
const offer = "WindowsServer";
const skus = "2019-Datacenter";
const version = "2019.0.20190115";
const extension_publisher_name = "Microsoft.Compute";
const extension_image_type = "VMAccessAgent";
const extension_image_version = "1.0.2";
let client: ComputeManagementClient;
let network_client: NetworkManagementClient;

//--VirtualMachinesExamples--

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

//network_client.networkInterfaces.createOrUpdate
async function createNetworkInterface(
  group_name: any,
  location: any,
  nic_name: any
) {
  const parameter: NetworkInterface = {
    location: location,
    ipConfigurations: [
      {
        name: "MyIpConfig",
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
      },
    ],
  };
  const nic_info = await network_client.networkInterfaces.beginCreateOrUpdateAndWait(
    group_name,
    nic_name,
    parameter
  );
  console.log(nic_info);
}

//virtualMachines.createOrUpdate
async function virtualMachines_createOrUpdate() {
  await createVirtualNetwork();
  await createNetworkInterface(resourceGroupName, location, interface_name);
  const parameter: VirtualMachine = {
    location: location,
    hardwareProfile: {
      vmSize: "Standard_D2_v2",
    },
    storageProfile: {
      imageReference: {
        sku: "2016-Datacenter",
        publisher: "MicrosoftWindowsServer",
        version: "latest",
        offer: "WindowsServer",
      },
      osDisk: {
        caching: "ReadWrite",
        managedDisk: {
          storageAccountType: "Standard_LRS",
        },
        name: "myVMosdisk",
        createOption: "FromImage",
      },
      dataDisks: [
        {
          diskSizeGB: 1023,
          createOption: "Empty",
          lun: 0,
        },
        {
          diskSizeGB: 1023,
          createOption: "Empty",
          lun: 1,
        },
      ],
    },
    osProfile: {
      adminUsername: "testuser",
      computerName: "myVM",
      adminPassword: "Aa!1()-xyz",
      windowsConfiguration: {
        enableAutomaticUpdates: true, // need automatic update for reimage
      },
    },
    networkProfile: {
      networkInterfaces: [
        {
          id:
            "/subscriptions/" +
            subscriptionId +
            "/resourceGroups/" +
            resourceGroupName +
            "/providers/Microsoft.Network/networkInterfaces/" +
            interface_name +
            "",
          primary: true,
        },
      ],
    },
  };
  await client.virtualMachines
    .beginCreateOrUpdateAndWait(
      resourceGroupName,
      virtual_machine_name,
      parameter
    )
    .then((response) => {
      console.log(response);
    });
}

//virtualMachines.instanceView
async function virtualMachines_instanceView() {
  await client.virtualMachines
    .instanceView(resourceGroupName, virtual_machine_name)
    .then((response) => {
      console.log(response);
    });
}

//virtualMachines.listAvailableSizes
async function virtualMachines_listAvailableSizes() {
  for await (const item of client.virtualMachines.listAvailableSizes(
    resourceGroupName,
    virtual_machine_name
  )) {
    console.log(item);
  }
}

//virtualMachines.get
async function virtualMachines_get() {
  await client.virtualMachines
    .get(resourceGroupName, virtual_machine_name)
    .then((response) => {
      console.log(response);
    });
}

//virtualMachines.list
async function virtualMachines_list() {
  for await (const item of client.virtualMachines.list(resourceGroupName)) {
    console.log(item);
  }
}

//virtualMachines.listAll
async function virtualMachines_listAll() {
  for await (const item of client.virtualMachines.listAll()) {
    console.log(item);
  }
}

//virtualMachines.listByLocation
async function virtualMachines_listByLocation() {
  for await (const item of client.virtualMachines.listByLocation(location)) {
    console.log(item);
  }
}

//virtualMachines.runCommand
async function virtualMachines_runCommand() {
  const parameter: RunCommandInput = {
    commandId: "RunPowerShellScript",
  };
  await client.virtualMachines
    .beginRunCommandAndWait(resourceGroupName, virtual_machine_name, parameter)
    .then((response) => {
      console.log(response);
    });
}

//virtualMachines.restart
async function virtualMachines_restart() {
  await client.virtualMachines
    .beginRestartAndWait(resourceGroupName, virtual_machine_name)
    .then((response) => {
      console.log(response);
    });
}

//virtualMachines.powerOff
async function virtualMachines_powerOff() {
  await client.virtualMachines
    .beginPowerOffAndWait(resourceGroupName, virtual_machine_name)
    .then((response) => {
      console.log(response);
    });
}

//virtualMachines.start
async function virtualMachines_start() {
  await client.virtualMachines
    .beginStartAndWait(resourceGroupName, virtual_machine_name)
    .then((response) => {
      console.log(response);
    });
}

//virtualMachines.reapply
async function virtualMachines_reapply() {
  await virtualMachines_powerOff(); //before reapply
  await client.virtualMachines
    .beginReapplyAndWait(resourceGroupName, virtual_machine_name)
    .then((response) => {
      console.log(response);
    });
}

//virtualMachines.redeploy
async function virtualMachines_redeploy() {
  await client.virtualMachines
    .beginRedeployAndWait(resourceGroupName, virtual_machine_name)
    .then((response) => {
      console.log(response);
    });
}

//virtualMachines.update
async function virtualMachines_update() {
  const parameter: VirtualMachineUpdate = {
    networkProfile: {
      networkInterfaces: [
        {
          id:
            "/subscriptions/" +
            subscriptionId +
            "/resourceGroups/" +
            resourceGroupName +
            "/providers/Microsoft.Network/networkInterfaces/" +
            interface_name +
            "",
          primary: true,
        },
      ],
    },
  };
  await client.virtualMachines
    .beginUpdateAndWait(resourceGroupName, virtual_machine_name, parameter)
    .then((response) => {
      console.log(response);
    });
}

//virtualMachines.generalize
async function virtualMachines_generalize() {
  await client.virtualMachines
    .generalize(resourceGroupName, virtual_machine_name)
    .then((response) => {
      console.log(response);
    });
}

//virtualMachines.deallocate
async function virtualMachines_deallocate() {
  await client.virtualMachines
    .beginDeallocateAndWait(resourceGroupName, virtual_machine_name)
    .then((response) => {
      console.log(response);
    });
}

//virtualMachines.delete
async function virtualMachines_delete() {
  await client.virtualMachines
    .beginDeleteAndWait(resourceGroupName, virtual_machine_name)
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineExtensions.createOrUpdate
async function MachineExtensions_createOrUpdate() {
  const parameter: VirtualMachineExtension = {
    location: location,
    autoUpgradeMinorVersion: true,
    publisher: "Microsoft.Azure.NetworkWatcher",
    typePropertiesType: "NetworkWatcherAgentWindows",
    typeHandlerVersion: "1.4",
  };
  await client.virtualMachineExtensions
    .beginCreateOrUpdateAndWait(
      resourceGroupName,
      virtual_machine_name,
      virtual_machine_extension_name,
      parameter
    )
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineExtensions.get
async function MachineExtensions_get() {
  await client.virtualMachineExtensions
    .get(
      resourceGroupName,
      virtual_machine_name,
      virtual_machine_extension_name
    )
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineExtensions.list
async function MachineExtensions_list() {
  await client.virtualMachineExtensions
    .list(resourceGroupName, virtual_machine_name)
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineExtensions.update
async function MachineExtensions_update() {
  const parameter: VirtualMachineExtensionUpdate = {
    autoUpgradeMinorVersion: true,
    // type:  "CustomScriptExtension",  // "PropertyChangeNotAllowed"
  };
  await client.virtualMachineExtensions
    .beginUpdateAndWait(
      resourceGroupName,
      virtual_machine_name,
      virtual_machine_extension_name,
      parameter
    )
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineExtensions.delete
async function MachineExtensions_delete() {
  await client.virtualMachineExtensions
    .beginDeleteAndWait(
      resourceGroupName,
      virtual_machine_name,
      virtual_machine_extension_name
    )
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineRunCommands.get
async function MachineRunCommands_get() {
  const commandId = "RunPowerShellScript";
  const location = "southeastasia";
  await client.virtualMachineRunCommands
    .get(location, commandId)
    .then((res) => {
      console.log(res);
    });
}

//virtualMachineRunCommands.list
async function MachineRunCommands_list() {
  for await (const item of client.virtualMachineRunCommands.list(location)) {
    console.log(item);
  }
}

//virtualMachineSizes.list
async function MachineSizes_list() {
  for await (const item of client.virtualMachineSizes.list(location)) {
    console.log(item);
  }
}

//--VirtualMachineImagesExamples--

//virtualMachineImages.get
async function virtualMachineImages_get() {
  await client.virtualMachineImages
    .get(location, publisher_name, offer, skus, version)
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineImages.list
async function virtualMachineImages_list() {
  await client.virtualMachineImages
    .list(location, publisher_name, offer, skus)
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineImages.listOffers
async function virtualMachineImages_listOffers() {
  await client.virtualMachineImages
    .listOffers(location, publisher_name)
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineImages.listPublishers
async function virtualMachineImages_listPublishers() {
  await client.virtualMachineImages
    .listPublishers(location)
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineImages.listSkus
async function virtualMachineImages_listSkus() {
  await client.virtualMachineImages
    .listSkus(location, publisher_name, offer)
    .then((response) => {
      console.log(response);
    });
}

//--VirtualMachineExtensionImagesExamples--

//virtualMachineExtensionImages.get
async function virtualMachineExtensionImages_get() {
  await client.virtualMachineExtensionImages
    .get(
      location,
      extension_publisher_name,
      extension_image_version,
      extension_image_type
    )
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineExtensionImages.listTypes
async function virtualMachineExtensionImages_listTypes() {
  await client.virtualMachineExtensionImages
    .listTypes(location, extension_publisher_name)
    .then((response) => {
      console.log(response);
    });
}

//virtualMachineExtensionImages.listVersions
async function virtualMachineExtensionImages_listVersions() {
  await client.virtualMachineExtensionImages
    .listVersions(location, extension_publisher_name, extension_image_type)
    .then((response) => {
      console.log(response);
    });
}

async function main() {
  client = new ComputeManagementClient(credential, subscriptionId);
  network_client = new NetworkManagementClient(credential, subscriptionId);
  await virtualMachines_createOrUpdate();
}

main();
