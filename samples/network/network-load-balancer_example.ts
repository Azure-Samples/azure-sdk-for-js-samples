import { DefaultAzureCredential } from "@azure/identity";
import {
  InboundNatRule,
  LoadBalancer,
  NetworkManagementClient,
  PublicIPAddress,
} from "@azure/arm-network";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();
const resourceGroup = "myjstest";
const virtualNetwork = "virtualnetworkttt";
const subnetName = "subnetttt";
const publicIpAddressName = "publicipaddressttt";
const loadBalancerName = "loadbalancerttt";
const inboundNatRuleName = "inboundNatRulettt";
const frontendIpconfigurationName = "frontendipconfigurationttt";
const backendAddressPollName = "backendAddressPoolttt";
const loadBalancingRuleName = "loadbalancingttt";
const outboundRuleName = "outboundRulettt";
const probeName = "probettt";
let client: NetworkManagementClient;

//--NetworkLoadBalancerExamples--

//publicIPAddresses.beginCreateOrUpdateAndWait
async function createPublicIpAddress() {
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
    .beginCreateOrUpdateAndWait(resourceGroup, publicIpAddressName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//virtualNetworks.beginCreateOrUpdateAndWait
//subnets.beginCreateOrUpdateAndWait
async function createVirtualnetworkAndSubnet() {
  //create virtualnetwork
  await client.virtualNetworks
    .beginCreateOrUpdateAndWait(resourceGroup, virtualNetwork, {
      location: "eastus",
      addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
    })
    .then((res) => {
      console.log(res);
    });
  //create subnet
  await client.subnets
    .beginCreateOrUpdateAndWait(resourceGroup, virtualNetwork, subnetName, {
      addressPrefix: "10.0.0.0/24",
    })
    .then((res) => {
      console.log(res);
    });
}

//loadBalancers.beginCreateOrUpdateAndWait
async function loadBalancers_beginCreateOrUpdateAndWait() {
  const parameter: LoadBalancer = {
    location: "eastus",
    sku: {
      name: "Standard",
    },
    frontendIPConfigurations: [
      {
        name: frontendIpconfigurationName,
        publicIPAddress: {
          id:
            "/subscriptions/" +
            subscriptionId +
            "/resourceGroups/" +
            resourceGroup +
            "/providers/Microsoft.Network/publicIPAddresses/" +
            publicIpAddressName,
        },
      },
    ],
    backendAddressPools: [
      {
        name: backendAddressPollName,
      },
    ],
    loadBalancingRules: [
      {
        name: loadBalancingRuleName,
        frontendIPConfiguration: {
          id:
            "/subscriptions/" +
            subscriptionId +
            "/resourceGroups/" +
            resourceGroup +
            "/providers/Microsoft.Network/loadBalancers/" +
            loadBalancerName +
            "/frontendIPConfigurations/" +
            frontendIpconfigurationName,
        },
        frontendPort: 80,
        backendPort: 80,
        enableFloatingIP: true,
        idleTimeoutInMinutes: 15,
        protocol: "Tcp",
        loadDistribution: "Default",
        disableOutboundSnat: true,
        backendAddressPool: {
          id:
            "/subscriptions/" +
            subscriptionId +
            "/resourceGroups/" +
            resourceGroup +
            "/providers/Microsoft.Network/loadBalancers/" +
            loadBalancerName +
            "/backendAddressPools/" +
            backendAddressPollName,
        },
        probe: {
          id:
            "/subscriptions/" +
            subscriptionId +
            "/resourceGroups/" +
            resourceGroup +
            "/providers/Microsoft.Network/loadBalancers/" +
            loadBalancerName +
            "/probes/" +
            probeName,
        },
      },
    ],
    probes: [
      {
        name: probeName,
        protocol: "Http",
        port: 80,
        requestPath: "healthcheck.aspx",
        intervalInSeconds: 15,
        numberOfProbes: 2,
      },
    ],
    outboundRules: [
      {
        name: outboundRuleName,
        backendAddressPool: {
          id:
            "/subscriptions/" +
            subscriptionId +
            "/resourceGroups/" +
            resourceGroup +
            "/providers/Microsoft.Network/loadBalancers/" +
            loadBalancerName +
            "/backendAddressPools/" +
            backendAddressPollName,
        },
        frontendIPConfigurations: [
          {
            id:
              "/subscriptions/" +
              subscriptionId +
              "/resourceGroups/" +
              resourceGroup +
              "/providers/Microsoft.Network/loadBalancers/" +
              loadBalancerName +
              "/frontendIPConfigurations/" +
              frontendIpconfigurationName,
          },
        ],
        protocol: "All",
      },
    ],
  };
  await client.loadBalancers
    .beginCreateOrUpdateAndWait(resourceGroup, loadBalancerName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//inboundNatRules.beginCreateOrUpdateAndWait
async function inboundNatRules_beginCreateOrUpdateAndWait() {
  const parameter: InboundNatRule = {
    protocol: "Tcp",
    frontendIPConfiguration: {
      id:
        "/subscriptions/" +
        subscriptionId +
        "/resourceGroups/" +
        resourceGroup +
        "/providers/Microsoft.Network/loadBalancers/" +
        loadBalancerName +
        "/frontendIPConfigurations/" +
        frontendIpconfigurationName,
    },
    frontendPort: 3390,
    backendPort: 3389,
    idleTimeoutInMinutes: 4,
    enableTcpReset: false,
    enableFloatingIP: false,
  };
  await client.inboundNatRules
    .beginCreateOrUpdateAndWait(
      resourceGroup,
      loadBalancerName,
      inboundNatRuleName,
      parameter
    )
    .then((res) => {
      console.log(res);
    });
}

//loadBalancerFrontendIPConfigurations.get
async function loadBalancerFrontendIPConfigurations_get() {
  await client.loadBalancerFrontendIPConfigurations
    .get(resourceGroup, loadBalancerName, frontendIpconfigurationName)
    .then((res) => {
      console.log(res);
    });
}

//loadBalancerBackendAddressPools.get
async function loadBalancerBackendAddressPools_get() {
  await client.loadBalancerBackendAddressPools
    .get(resourceGroup, loadBalancerName, backendAddressPollName)
    .then((res) => {
      console.log(res);
    });
}

//loadBalancerLoadBalancingRules.get
async function loadBalancerLoadBalancingRules_get() {
  await client.loadBalancerLoadBalancingRules
    .get(resourceGroup, loadBalancerName, loadBalancingRuleName)
    .then((res) => {
      console.log(res);
    });
}

//inboundNatRules.get
async function inboundNatRules_get() {
  await client.inboundNatRules
    .get(resourceGroup, loadBalancerName, inboundNatRuleName)
    .then((res) => {
      console.log(res);
    });
}

//loadBalancerOutboundRules.get
async function loadBalancerOutboundRules_get() {
  await client.loadBalancerOutboundRules
    .get(resourceGroup, loadBalancerName, outboundRuleName)
    .then((res) => {
      console.log(res);
    });
}

//loadBalancers.get
async function loadBalancers_get() {
  await client.loadBalancers
    .get(resourceGroup, loadBalancerName)
    .then((res) => {
      console.log(res);
    });
}

//loadBalancerBackendAddressPools.list
async function loadBalancerBackendAddressPools_list() {
  for await (const item of client.loadBalancerBackendAddressPools.list(
    resourceGroup,
    loadBalancerName
  )) {
    console.log(item);
  }
}

//loadBalancerNetworkInterfaces.list
async function loadBalancerNetworkInterfaces_list() {
  for await (const item of client.loadBalancerNetworkInterfaces.list(
    resourceGroup,
    loadBalancerName
  )) {
    console.log(item);
  }
}

//loadBalancerLoadBalancingRules.list
async function loadBalancerLoadBalancingRules_list() {
  for await (const item of client.loadBalancerLoadBalancingRules.list(
    resourceGroup,
    loadBalancerName
  )) {
    console.log(item);
  }
}

//inboundNatRules.list
async function inboundNatRules_list() {
  for await (const item of client.inboundNatRules.list(
    resourceGroup,
    loadBalancerName
  )) {
    console.log(item);
  }
}

//loadBalancerOutboundRules.list
async function loadBalancerOutboundRules_list() {
  for await (const item of client.loadBalancerOutboundRules.list(
    resourceGroup,
    loadBalancerName
  )) {
    console.log(item);
  }
}

//loadBalancerProbes.list
async function loadBalancerProbes_list() {
  for await (const item of client.loadBalancerProbes.list(
    resourceGroup,
    loadBalancerName
  )) {
    console.log(item);
  }
}

//loadBalancers.list
async function loadBalancers_list() {
  for await (const item of client.loadBalancers.list(resourceGroup)) {
    console.log(item);
  }
}

//loadBalancers.listAll
async function loadBalancers_listAll() {
  for await (const item of client.loadBalancers.listAll()) {
    console.log(item);
  }
}

//loadBalancers.updateTags
async function loadBalancers_updateTags() {
  await client.loadBalancers
    .updateTags(resourceGroup, loadBalancerName, {
      tags: { tag1: "value1", tag2: "value2" },
    })
    .then((res) => {
      console.log(res);
    });
}

//inboundNatRules.beginDeleteAndWait
async function inboundNatRules_beginDeleteAndWait() {
  await client.inboundNatRules
    .beginDeleteAndWait(resourceGroup, loadBalancerName, inboundNatRuleName)
    .then((res) => {
      console.log(res);
    });
}

//loadBalancers.beginDeleteAndWait
async function loadBalancers_beginDeleteAndWait() {
  await client.loadBalancers
    .beginDeleteAndWait(resourceGroup, loadBalancerName)
    .then((res) => {
      console.log(res);
    });
}

async function main() {
  client = new NetworkManagementClient(credential, subscriptionId);
  await createPublicIpAddress();
}

main();
