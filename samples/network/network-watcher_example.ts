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

const subscriptionId =
  process.env.subscriptionId || "00000000-0000-0000-0000-000000000000";
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

//virtualNetworks.createOrUpdate
//subnets.createOrUpdate
async function virtualNetworksAndSubnetCreate() {
  await client.virtualNetworks
    .createOrUpdate(resourceGroup, virtualnetworkName, {
      location: "eastus",
      addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
    })
    .then((res) => {
      console.log(res);
    });
  //create subnet
  await client.subnets
    .createOrUpdate(resourceGroup, virtualnetworkName, subnetName, {
      addressPrefix: "10.0.0.0/24",
    })
    .then((res) => {
      console.log(res);
    });
}

//networkInterfaces.createOrUpdate
async function networkInterfaces_createOrUpdate() {
  const subneyId =
    "/subscriptions/" +
    subscriptionId +
    "/resourceGroups/" +
    resourceGroup +
    "/providers/Microsoft.Network/virtualNetworks/" +
    virtualnetworkName +
    "/subnets/" +
    subnetName;
  const networkInterface_create = await client.networkInterfaces.createOrUpdate(
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

//publicIPAddresses.createOrUpdate
async function publicIPAddresses_createOrUpdate() {
  const parameter: PublicIPAddress = {
    publicIPAllocationMethod: "Static",
    idleTimeoutInMinutes: 10,
    publicIPAddressVersion: "IPv4",
    location: "eastus",
    sku: {
      name: "Standard",
    },
  };
  await client.publicIPAddresses
    .createOrUpdate(resourceGroup, publicIpAddressName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//virtualNetworkGateways.createOrUpdate
async function virtualNetworkGateways_createOrUpdate() {
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
    .createOrUpdate(resourceGroup, virtualNetworkGatewayName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//storageAccounts.create
async function storageAccounts_create() {
  const parameter: StorageAccountCreateParameters = {
    location: "eastus",
    sku: {
      name: "Standard_GRS",
    },
    kind: "StorageV2",
  };
  await storage_client.storageAccounts
    .create(resourceGroup, storageAccountName, parameter)
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

//networkWatchers.getTroubleshooting
async function networkWatchers_getTroubleshooting() {
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
    .getTroubleshooting(resourceGroup, networkWatcherName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//networkWatchers.getTroubleshootingResult
async function networkWatchers_getTroubleshootingResult() {
  await client.networkWatchers
    .getTroubleshootingResult(resourceGroup, networkWatcherName, {
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

//virtualMachines.createOrUpdate
async function virtualMachines_createOrUpdate() {
  const nic_id = await networkInterfaces_createOrUpdate();
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
    .createOrUpdate(resourceGroup, vmName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//virtualMachineExtensions.createOrUpdate
async function virtualMachineExtensions_createOrUpdate() {
  const parameter: VirtualMachineExtension = {
    location: "eastus",
    autoUpgradeMinorVersion: true,
    publisher: "Microsoft.Azure.NetworkWatcher",
    typeHandlerVersion: "1.4",
  };
  await compute_client.virtualMachineExtensions
    .createOrUpdate(resourceGroup, vmName, vm_extensionName, parameter)
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

//networkWatchers.verifyIPFlow
async function networkWatchers_verifyIPFlow() {
  const nic = await networkInterfaces_get();
  nic.ipConfigurations = nic.ipConfigurations as any[];
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
    localIPAddress: (nic.ipConfigurations[0] as any).privateIPAddress,
    remoteIPAddress: "121.10.1.1",
  };
  await client.networkWatchers
    .verifyIPFlow(resourceGroup, networkWatcherName, parameter)
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
