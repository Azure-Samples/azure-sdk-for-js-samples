import {
  ConnectionSharedKey,
  LocalNetworkGateway,
  NetworkManagementClient,
  PublicIPAddress,
  PublicIPPrefix,
  Subnet,
  VirtualNetwork,
  VirtualNetworkGateway,
  VirtualNetworkGatewayConnection,
  VirtualNetworkPeering,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId =
  process.env.subscriptionId || "00000000-0000-0000-0000-000000000000";
const credential = new DefaultAzureCredential();
const resourceGroup = "myjstest";
const serviceName = "myapimrndzzz";
const virtualNetworkName = "virtualnetworkzzz";
const remoteVirtualNetworkName = "rmvirtualnetworkzzz";
const virtualNetworkTapName = "virtualnetworktapzzz";
const networkInterfaceName = "networkinterfacenzzz";
const virtualNetworkPeeringName = "virtualnetworkpeeringzzz";
const publicIpAddressName = "publicipzzz";
const virtualNetworkGatewayName = "virtualnetworkgatewayzzz";
const localNetworkGatewayName = "localnetworkgatewayzzz";
const ipConfigName = "ipconfigzzz";
const connectionName = "connectionzzz";
const subnetName = "subnetzzz";
const gatewaySubnetName = "GatewaySubnet";
const virtualRouteName = "virtualroutezzz";
let client: NetworkManagementClient;

//--NetworkBaseExamples--

//publicIPAddresses.createOrUpdate
async function create_public_ip_addresses(
  resourceGroup: any,
  location: any,
  pulicIpName: any
) {
  const parameter: PublicIPAddress = {
    location: location,
    publicIPAllocationMethod: "Dynamic",
    idleTimeoutInMinutes: 4,
  };
  const ip_create = await client.publicIPAddresses.createOrUpdate(
    resourceGroup,
    pulicIpName,
    parameter
  );
  console.log(ip_create);
  return ip_create;
}

//networkInterfaces.createOrUpdate
async function create_network_interface(
  resourceGroup: any,
  location: any,
  networkInterfaceName: any,
  ipconfig: any
) {
  const subneyId =
    "/subscriptions/" +
    subscriptionId +
    "/resourceGroups/" +
    resourceGroup +
    "/providers/Microsoft.Network/virtualNetworks/" +
    virtualNetworkName +
    "/subnets/" +
    subnetName;
  const networkInterface_create = await client.networkInterfaces.createOrUpdate(
    resourceGroup,
    networkInterfaceName,
    {
      location: location,
      ipConfigurations: [{ name: ipconfig, subnet: { id: subneyId } }],
    }
  );
  console.log(networkInterface_create);
  return networkInterface_create;
}

//virtualNetworks.createOrUpdate
async function virtualNetworks_createOrUpdate() {
  const parameter: VirtualNetwork = {
    addressSpace: {
      addressPrefixes: ["10.0.0.0/16"],
    },
    location: "eastus",
  };
  await client.virtualNetworks
    .createOrUpdate(resourceGroup, virtualNetworkName, parameter)
    .then((res) => {
      console.log(res);
    });
}

// //virtualNetworks.createOrUpdate
async function remote_virtualNetworks_createOrUpdate() {
  await create_network_interface(
    resourceGroup,
    "eastus",
    networkInterfaceName,
    ipConfigName
  ); //run behind subnet create
  const parameter: VirtualNetwork = {
    addressSpace: {
      addressPrefixes: ["10.2.0.0/16"],
    },
    location: "eastus",
  };
  await client.virtualNetworks
    .createOrUpdate(resourceGroup, remoteVirtualNetworkName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//subnets.createOrUpdate
async function subnets_createOrUpdate() {
  const parameter: Subnet = {
    addressPrefix: "10.0.0.0/24",
  };
  await client.subnets
    .createOrUpdate(resourceGroup, virtualNetworkName, subnetName, parameter)
    .then((res) => {
      console.log(res);
    });
  await create_network_interface(
    resourceGroup,
    "eastus",
    networkInterfaceName,
    ipConfigName
  );
}

//
async function gateway_subnets_createOrUpdate() {
  const parameter: Subnet = {
    addressPrefix: "10.0.1.0/24",
  };
  await client.subnets
    .createOrUpdate(
      resourceGroup,
      virtualNetworkName,
      gatewaySubnetName,
      parameter
    )
    .then((res) => {
      console.log(res);
    });
}

//localNetworkGateways.createOrUpdate
async function localNetworkGateways_createOrUpdate() {
  const parameter: LocalNetworkGateway = {
    localNetworkAddressSpace: {
      addressPrefixes: ["10.1.0.0/16"],
    },
    gatewayIpAddress: "11.12.13.14",
    location: "eastus",
  };
  await client.localNetworkGateways
    .createOrUpdate(resourceGroup, localNetworkGatewayName, parameter)
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
            virtualNetworkName +
            "/subnets/" +
            gatewaySubnetName,
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
        name: ipConfigName,
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

//virtualNetworkPeerings.createOrUpdate
async function virtualNetworkPeerings_createOrUpdate() {
  const parameter: VirtualNetworkPeering = {
    allowVirtualNetworkAccess: true,
    allowForwardedTraffic: true,
    allowGatewayTransit: false,
    useRemoteGateways: false,
    remoteVirtualNetwork: {
      id:
        "/subscriptions/" +
        subscriptionId +
        "/resourceGroups/" +
        resourceGroup +
        "/providers/Microsoft.Network/virtualNetworks/" +
        remoteVirtualNetworkName,
    },
  };
  await client.virtualNetworkPeerings
    .createOrUpdate(
      resourceGroup,
      virtualNetworkName,
      virtualNetworkPeeringName,
      parameter
    )
    .then((res) => {
      console.log(res);
    });
}

//virtualNetworkGatewayConnections.createOrUpdate
async function virtualNetworkGatewayConnections_createOrUpdate() {
  const parameter: VirtualNetworkGatewayConnection = {
    virtualNetworkGateway1: {
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
              virtualNetworkName +
              "/subnets/" +
              gatewaySubnetName,
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
          name: ipConfigName,
          id:
            "/subscriptions/" +
            subscriptionId +
            "/resourceGroups/" +
            resourceGroup +
            "/providers/Microsoft.Network/virtualNetworkGateways/" +
            remoteVirtualNetworkName +
            "/ipConfigurations/" +
            ipConfigName,
        },
      ],
      gatewayType: "Vpn",
      vpnType: "RouteBased",
      enableBgp: false,
      active: false,
      sku: {
        name: "VpnGw1",
        tier: "VpnGw1",
      },
      bgpSettings: {
        asn: 65514,
        bgpPeeringAddress: "10.0.2.30",
        peerWeight: 0,
      },
      id:
        "/subscriptions/" +
        subscriptionId +
        "/resourceGroups/" +
        resourceGroup +
        "/providers/Microsoft.Network/virtualNetworkGateways/" +
        virtualNetworkGatewayName,
      location: "eastus",
    },
    localNetworkGateway2: {
      localNetworkAddressSpace: {
        addressPrefixes: ["10.1.0.0/16"],
      },
      gatewayIpAddress: "10.1.0.1",
      id:
        "/subscriptions/" +
        subscriptionId +
        "/resourceGroups/" +
        resourceGroup +
        "/providers/Microsoft.Network/localNetworkGateways/" +
        localNetworkGatewayName,
      location: "eastus",
    },
    connectionType: "IPsec",
    connectionProtocol: "IKEv2",
    routingWeight: 0,
    sharedKey: "ABc123",
    enableBgp: false,
    usePolicyBasedTrafficSelectors: false,
    ipsecPolicies: [],
    trafficSelectorPolicies: [],
    location: "eastus",
  };
  await client.virtualNetworkGatewayConnections
    .createOrUpdate(resourceGroup, connectionName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//virtualNetworkGatewayConnections.setSharedKey
async function virtualNetworkGatewayConnections_setSharedKey() {
  const parameter: ConnectionSharedKey = {
    value: "AzureAbc123",
  };
  await client.virtualNetworkGatewayConnections
    .setSharedKey(resourceGroup, connectionName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//virtualNetworkPeerings.get
async function virtualNetworkPeerings_get() {
  await client.virtualNetworkPeerings
    .get(resourceGroup, virtualNetworkName, virtualNetworkPeeringName)
    .then((res) => {
      console.log(res);
    });
}

//serviceAssociationLinks.list
async function serviceAssociationLinks_list() {
  await client.serviceAssociationLinks
    .list(resourceGroup, virtualNetworkName, subnetName)
    .then((res) => {
      console.log(res);
    });
}

//resourceNavigationLinks.list
async function resourceNavigationLinks_list() {
  await client.resourceNavigationLinks
    .list(resourceGroup, virtualNetworkName, subnetName)
    .then((res) => {
      console.log(res);
    });
}

//virtualNetworks.checkIPAddressAvailability
async function virtualNetworks_checkIPAddressAvailability() {
  await client.virtualNetworks
    .checkIPAddressAvailability(resourceGroup, virtualNetworkName, "10.0.1.4")
    .then((res) => {
      console.log(res);
    });
}

//virtualNetworkGateways.listConnections
async function virtualNetworkGateways_listConnections() {
  for await (const item of client.virtualNetworkGateways.listConnections(
    resourceGroup,
    virtualNetworkGatewayName
  )) {
    console.log(item);
  }
}

//subnets.get
async function subnets_get() {
  await client.subnets
    .get(resourceGroup, virtualNetworkName, subnetName)
    .then((res) => {
      console.log(res);
    });
}

//virtualNetworkPeerings.list
async function virtualNetworkPeerings_list() {
  for await (const item of client.virtualNetworkPeerings.list(
    resourceGroup,
    virtualNetworkName
  )) {
    console.log(item);
  }
}

//virtualNetworkGateways.get
async function virtualNetworkGateways_get() {
  await client.virtualNetworkGateways
    .get(resourceGroup, virtualNetworkGatewayName)
    .then((res) => {
      console.log(res);
    });
}

//localNetworkGateways.get
async function localNetworkGateways_get() {
  await client.localNetworkGateways
    .get(resourceGroup, localNetworkGatewayName)
    .then((res) => {
      console.log(res);
    });
}

//subnets.list
async function subnets_list() {
  for await (const item of client.subnets.list(
    resourceGroup,
    virtualNetworkName
  )) {
    console.log(item);
  }
}

//virtualNetworks.listUsage
async function virtualNetworks_listUsage() {
  for await (const item of client.virtualNetworks.listUsage(
    resourceGroup,
    virtualNetworkName
  )) {
    console.log(item);
  }
}

//virtualNetworkGatewayConnections.getSharedKey
async function virtualNetworkGatewayConnections_getSharedKey() {
  await client.virtualNetworkGatewayConnections
    .getSharedKey(resourceGroup, connectionName)
    .then((res) => {
      console.log(res);
    });
}

//virtualNetworks.get
async function virtualNetworks_get() {
  await client.virtualNetworks
    .get(resourceGroup, virtualNetworkName)
    .then((res) => {
      console.log(res);
    });
}

//virtualNetworkGatewayConnections.get
async function virtualNetworkGatewayConnections_get() {
  await client.virtualNetworkGatewayConnections
    .get(resourceGroup, connectionName)
    .then((res) => {
      console.log(res);
    });
}

//virtualNetworkGateways.list
async function virtualNetworkGateways_list() {
  for await (const item of client.virtualNetworkGateways.list(resourceGroup)) {
    console.log(item);
  }
}

//localNetworkGateways.list
async function localNetworkGateways_list() {
  for await (const item of client.localNetworkGateways.list(resourceGroup)) {
    console.log(item);
  }
}

//virtualNetworks.list
async function virtualNetworks_list() {
  for await (const item of client.virtualNetworks.list(resourceGroup)) {
    console.log(item);
  }
}

//virtualNetworkGatewayConnections.list
async function virtualNetworkGatewayConnections_list() {
  for await (const item of client.virtualNetworkGatewayConnections.list(
    resourceGroup
  )) {
    console.log(item);
  }
}

//virtualNetworks.listAll
async function virtualNetworks_listAll() {
  for await (const item of client.virtualNetworks.listAll()) {
    console.log(item);
  }
}

//virtualNetworkGateways.getAdvertisedRoutes
async function virtualNetworkGateways_getAdvertisedRoutes() {
  await client.virtualNetworkGateways
    .getAdvertisedRoutes(resourceGroup, virtualNetworkGatewayName, "10.0.0.2")
    .then((res) => {
      console.log(res);
    });
}

//virtualNetworkGateways.getBgpPeerStatus
async function virtualNetworkGateways_getBgpPeerStatus() {
  await client.virtualNetworkGateways
    .getBgpPeerStatus(resourceGroup, virtualNetworkGatewayName)
    .then((res) => {
      console.log(res);
    });
}

//virtualNetworkGateways.getLearnedRoutes
async function virtualNetworkGateways_getLearnedRoutes() {
  await client.virtualNetworkGateways
    .getLearnedRoutes(resourceGroup, virtualNetworkGatewayName)
    .then((res) => {
      console.log(res);
    });
}

//virtualNetworkGatewayConnections.resetSharedKey
async function virtualNetworkGatewayConnections_resetSharedKey() {
  await client.virtualNetworkGatewayConnections
    .resetSharedKey(resourceGroup, connectionName, {
      keyLength: 128,
    })
    .then((res) => {
      console.log(res);
    });
}

//virtualNetworkGateways.reset
async function virtualNetworkGateways_reset() {
  await client.virtualNetworkGateways
    .reset(resourceGroup, virtualNetworkGatewayName)
    .then((res) => {
      console.log(res);
    });
}

//virtualNetworkGateways.updateTags
async function virtualNetworkGateways_updateTags() {
  await client.virtualNetworkGateways
    .updateTags(resourceGroup, virtualNetworkGatewayName, {
      tags: { tag1: "value1", tag2: "value2" },
    })
    .then((res) => {
      console.log(res);
    });
}

//localNetworkGateways.updateTags
async function localNetworkGateways_updateTags() {
  await client.localNetworkGateways
    .updateTags(resourceGroup, localNetworkGatewayName, {
      tags: { tag1: "value1", tag2: "value2" },
    })
    .then((res) => {
      console.log(res);
    });
}

//virtualNetworks.updateTags
async function virtualNetworks_updateTags() {
  await client.virtualNetworks
    .updateTags(resourceGroup, virtualNetworkName, {
      tags: { tag1: "value1", tag2: "value2" },
    })
    .then((res) => {
      console.log(res);
    });
}

//virtualNetworkGatewayConnections.updateTags
async function virtualNetworkGatewayConnections_updateTags() {
  await client.virtualNetworkGatewayConnections
    .updateTags(resourceGroup, connectionName, {
      tags: { tag1: "value1", tag2: "value2" },
    })
    .then((res) => {
      console.log(res);
    });
}

//virtualNetworkGatewayConnections.delete
async function virtualNetworkGatewayConnections_delete() {
  await client.virtualNetworkGatewayConnections
    .delete(resourceGroup, connectionName)
    .then((res) => {
      console.log(res);
    });
}

//virtualNetworkPeerings.delete
async function virtualNetworkPeerings_delete() {
  await client.virtualNetworkPeerings
    .delete(resourceGroup, virtualNetworkName, virtualNetworkPeeringName)
    .then((res) => {
      console.log(res);
    });
}

//virtualNetworkGateways.delete
async function virtualNetworkGateways_delete() {
  await client.virtualNetworkGateways
    .delete(resourceGroup, virtualNetworkGatewayName)
    .then((res) => {
      console.log(res);
    });
}

//localNetworkGateways.delete
async function localNetworkGateways_delete() {
  await client.localNetworkGateways
    .delete(resourceGroup, localNetworkGatewayName)
    .then((res) => {
      console.log(res);
    });
}

//networkInterfaces.delete
async function networkInterfaces_delete() {
  await client.networkInterfaces
    .delete(resourceGroup, networkInterfaceName)
    .then((res) => {
      console.log(res);
    });
}

//subnets.delete
async function subnets_delete() {
  await client.subnets
    .delete(resourceGroup, virtualNetworkName, subnetName)
    .then((res) => {
      console.log(res);
    });
}

//subnets.delete
async function virtualNetworks_delete() {
  await client.virtualNetworks
    .delete(resourceGroup, virtualNetworkName)
    .then((res) => {
      console.log(res);
    });
}

async function main() {
  client = new NetworkManagementClient(credential, subscriptionId);
  await virtualNetworks_createOrUpdate();
}

main();
