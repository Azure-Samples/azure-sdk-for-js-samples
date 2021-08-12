import {
  ComputeManagementClient,
  VirtualMachine,
  VirtualMachineExtension,
} from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import {
  NetworkManagementClient,
  PublicIPAddress,
  TroubleshootingParameters,
  VerificationIPFlowParameters,
  VirtualNetworkGateway,
} from "@azure/arm-network";
import {
  StorageAccountCreateParameters,
  StorageManagementClient,
} from "@azure/arm-storage";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();
const resourceGroup = "myjstest";
const networkWatcherName = "networkwatchernnn";
const virtualMachineName = "virtualmachinennn";
const virtualnetworkName = "virtualnetworknnn";
const virtualNetworkGatewayName = "virtualnetworkgatewaynnn";
const publicIpAddressName = "publicipaddressnnn";
const subnetName = "subnetforgateway";
const storageAccountName = "storagennn";
const ipConfigurationName = "ipconfignnn";
const networkInterfaceName = "networkInterfacennn";
const vmName = "vmnamennn";
const vm_extensionName = "myextensionnn";
let client: NetworkManagementClient;
let compute_client: ComputeManagementClient;
let storage_client: StorageManagementClient;

//--NetworkWatcherTroubleshootExamples--

//virtualNetworks.beginCreateOrUpdateAndWait
//subnets.beginCreateOrUpdateAndWait
async function virtualNetworksAndSubnetCreate() {
  await client.virtualNetworks
    .beginCreateOrUpdateAndWait(resourceGroup, virtualnetworkName, {
      location: "eastus",
      addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
    })
    .then((res) => {
      console.log(res);
    });
  //create subnet
  await client.subnets
    .beginCreateOrUpdateAndWait(resourceGroup, virtualnetworkName, subnetName, {
      addressPrefix: "10.0.0.0/24",
    })
    .then((res) => {
      console.log(res);
    });
}

//networkInterfaces.beginCreateOrUpdateAndWait
async function networkInterfaces_beginCreateOrUpdateAndWait() {
  const subneyId =
    "/subscriptions/" +
    subscriptionId +
    "/resourceGroups/" +
    resourceGroup +
    "/providers/Microsoft.Network/virtualNetworks/" +
    virtualnetworkName +
    "/subnets/" +
    subnetName;
  const networkInterface_create = await client.networkInterfaces.beginCreateOrUpdateAndWait(
    resourceGroup,
    networkInterfaceName,
    {
      location: "eastus",
      ipConfigurations: [{ name: "MyIpConfig", subnet: { id: subneyId } }],
    }
  );
  console.log(networkInterface_create);
  return networkInterface_create;
}

//publicIPAddresses.beginCreateOrUpdateAndWait
async function publicIPAddresses_beginCreateOrUpdateAndWait() {
  const parameter: PublicIPAddress = {
    publicIPAllocationMethod: "Staic",
    idleTimeoutInMinutes: 10,
    publicIPAddressVersion: "IPv4",
    location: "eastus",
    sku: {
      name: "Standard",
    },
  };
  await client.publicIPAddresses
    .beginCreateOrUpdateAndWait(resourceGroup, publicIpAddressName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//virtualNetworkGateways.beginCreateOrUpdateAndWait
async function virtualNetworkGateways_beginCreateOrUpdateAndWait() {
  const parameter: VirtualNetworkGateway = {
    ipConfigurations: [
      {
        privateIPAllocationMethod: "Dynamic",
        subnet: {
          id:
            "/subscriptions/" +
            subscriptionId +
            "/resourceGroups/" +
            resourceGroup +
            "/providers/Microsoft.Network/virtualNetworks/" +
            virtualnetworkName +
            "/subnets/" +
            subnetName,
        },
        publicIPAddress: {
          id:
            "/subscriptions/" +
            subscriptionId +
            "/resourceGroups/" +
            resourceGroup +
            "/providers/Microsoft.Network/publicIPAddresses/" +
            publicIpAddressName,
        },
        name: ipConfigurationName,
      },
    ],
    gatewayType: "Vpn",
    vpnType: "RouteBased",
    enableBgp: false,
    active: false,
    enableDnsForwarding: false,
    sku: {
      name: "VpnGw1",
      tier: "VpnGw1",
    },
    bgpSettings: {
      asn: 65515,
      bgpPeeringAddress: "10.0.1.30",
      peerWeight: 0,
    },
    customRoutes: {
      addressPrefixes: ["101.168.0.6/32"],
    },
    location: "eastus",
  };
  await client.virtualNetworkGateways
    .beginCreateOrUpdateAndWait(
      resourceGroup,
      virtualNetworkGatewayName,
      parameter
    )
    .then((res) => {
      console.log(res);
    });
}

//storageAccounts.beginCreateAndWait
async function storageAccounts_beginCreateAndWait() {
  const parameter: StorageAccountCreateParameters = {
    location: "eastus",
    sku: {
      name: "Standard_GRS",
    },
    kind: "StorageV2",
  };
  await storage_client.storageAccounts
    .beginCreateAndWait(resourceGroup, storageAccountName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//networkWatchers.createOrUpdate
async function networkWatchers_createOrUpdate() {
  await client.networkWatchers
    .createOrUpdate(resourceGroup, networkWatcherName, { location: "eastus" })
    .then((res) => {
      console.log(res);
    });
}

//networkWatchers.beginGetTroubleshootingAndWait
async function networkWatchers_beginGetTroubleshootingAndWait() {
  const parameter: TroubleshootingParameters = {
    targetResourceId:
      "/subscriptions/" +
      subscriptionId +
      "/resourceGroups/" +
      resourceGroup +
      "/providers/Microsoft.Network/virtualNetworkGateways/" +
      virtualNetworkGatewayName,
    storageId:
      "/subscriptions/" +
      subscriptionId +
      "/resourceGroups/" +
      resourceGroup +
      "/providers/Microsoft.Storage/storageAccounts/" +
      storageAccountName,
    storagePath:
      "https://" +
      storageAccountName +
      ".blob.core.windows.net/troubleshooting",
  };
  await client.networkWatchers
    .beginGetTroubleshootingAndWait(
      resourceGroup,
      networkWatcherName,
      parameter
    )
    .then((res) => {
      console.log(res);
    });
}

//networkWatchers.beginGetTroubleshootingResultAndWait
async function networkWatchers_beginGetTroubleshootingResultAndWait() {
  await client.networkWatchers
    .beginGetTroubleshootingResultAndWait(resourceGroup, networkWatcherName, {
      targetResourceId:
        "/subscriptions/" +
        subscriptionId +
        "/resourceGroups/" +
        resourceGroup +
        "/providers/Microsoft.Network/virtualNetworkGateways/" +
        virtualNetworkGatewayName,
    })
    .then((res) => {
      console.log(res);
    });
}

//virtualMachines.beginCreateOrUpdateAndWait
async function virtualMachines_beginCreateOrUpdateAndWait() {
  const nic_id = await networkInterfaces_beginCreateOrUpdateAndWait();
  const parameter: VirtualMachine = {
    location: "eastus",
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
      computerName: "myvm",
      adminPassword: "Aa!1()-xyz",
      windowsConfiguration: {
        enableAutomaticUpdates: true,
      },
    },
    networkProfile: {
      networkInterfaces: [
        {
          id: nic_id.id,
        },
      ],
    },
  };
  await compute_client.virtualMachines
    .beginCreateOrUpdateAndWait(resourceGroup, vmName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//virtualMachineExtensions.beginCreateOrUpdateAndWait
async function virtualMachineExtensions_beginCreateOrUpdateAndWait() {
  const parameter: VirtualMachineExtension = {
    location: "eastus",
    autoUpgradeMinorVersion: true,
    publisher: "Microsoft.Azure.NetworkWatcher",
    typeHandlerVersion: "1.4",
  };
  await compute_client.virtualMachineExtensions
    .beginCreateOrUpdateAndWait(
      resourceGroup,
      vmName,
      vm_extensionName,
      parameter
    )
    .then((res) => {
      console.log(res);
    });
}

//networkInterfaces.get
async function networkInterfaces_get() {
  const getResult = await client.networkInterfaces.get(
    resourceGroup,
    networkInterfaceName
  );
  console.log(getResult);
  return getResult;
}

//networkWatchers.beginVerifyIPFlowAndWait
async function networkWatchers_beginVerifyIPFlowAndWait() {
  const nic = await networkInterfaces_get();
  const parameter: VerificationIPFlowParameters = {
    targetResourceId:
      "/subscriptions/" +
      subscriptionId +
      "/resourceGroups/" +
      resourceGroup +
      "/providers/Microsoft.Compute/virtualMachines/" +
      virtualMachineName,
    direction: "Outbound",
    protocol: "TCP",
    localPort: "80",
    remotePort: "80",
    localIPAddress: nic.ipConfigurations[0].privateIPAddress,
    remoteIPAddress: "121.10.1.1",
  };
  await client.networkWatchers
    .beginVerifyIPFlowAndWait(resourceGroup, networkWatcherName, parameter)
    .then((res) => {
      console.log(res);
    });
}

async function main() {
  client = new NetworkManagementClient(credential, subscriptionId);
  compute_client = new ComputeManagementClient(credential, subscriptionId);
  storage_client = new StorageManagementClient(credential, subscriptionId);
  await virtualNetworksAndSubnetCreate();
}

main();
