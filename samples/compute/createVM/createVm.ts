import { ComputeManagementClient, VirtualMachine } from "@azure/arm-compute";
import { NetworkManagementClient, VirtualNetwork, Subnet, NetworkInterface } from "@azure/arm-network";
import { ResourceManagementClient, ResourceGroup } from "@azure/arm-resources";
import {DefaultAzureCredential } from "@azure/identity";

const subscriptionId = "92f95d8f-3c67-4124-91c7-8cf07cdbf241";
const resourceGroupName = "qiaozhatest1";
const virtualMachineName = "virtualmachinex";
const subnetName = "subnetnamex";
const interfaceName = "interfacex";
const networkName = "networknamex";
const location = "eastus";
let computeClient: ComputeManagementClient;
let networkClient: NetworkManagementClient;
let resourcesClient: ResourceManagementClient;

//virtualMachines.createOrUpdate
async function createVirtualMachines() {
    await createResourceGroup();
    await createVirtualNetwork();
    await createNetworkInterface(resourceGroupName, location, interfaceName);
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
                offer: "WindowsServer"
            },
            osDisk: {
                caching: "ReadWrite",
                managedDisk: {
                    storageAccountType: "Standard_LRS"
                },
                name: "myVMosdisk",
                createOption: "FromImage"
            },
            dataDisks: [
                {
                    diskSizeGB: 1023,
                    createOption: "Empty",
                    lun: 0
                },
                {
                    diskSizeGB: 1023,
                    createOption: "Empty",
                    lun: 1
                }
            ]
        },
        osProfile: {
            adminUsername: "testuser",
            computerName: "myVM",
            adminPassword: "Aa1!zyx_",
            windowsConfiguration: {
                enableAutomaticUpdates: true // need automatic update for reimage
            }
        },
        networkProfile: {
            networkInterfaces: [
                {
                    id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + resourceGroupName + "/providers/Microsoft.Network/networkInterfaces/" + interfaceName + "",
                    primary: true
                }
            ]
        }
    };
    const res = await computeClient.virtualMachines.beginCreateOrUpdateAndWait(resourceGroupName, virtualMachineName, parameter);
    console.log(res);
}

// networkClient.networkInterfaces.createOrUpdate
async function createNetworkInterface(group_name: any, location: any, nic_name: any) {
    const parameter: NetworkInterface = {
        location: location,
        ipConfigurations: [
            {
                name: "MyIpConfig",
                subnet: {
                    id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + resourceGroupName + "/providers/Microsoft.Network/virtualNetworks/" + networkName + "/subnets/" + subnetName

                }
            }
        ]
    };
    const nic_info = await networkClient.networkInterfaces.beginCreateOrUpdateAndWait(group_name, nic_name, parameter);
    console.log(nic_info);
}

async function createResourceGroup() {
    const parameter: ResourceGroup = {
        location: "eastus",
        tags: {
            tag1: "value1"
        }
    };
    await resourcesClient.resourceGroups.createOrUpdate(resourceGroupName, parameter).then(
        result => {
            console.log(result);
        }
    )
}

// networkClient.virtualNetworks.createOrUpdate
async function createVirtualNetwork() {
    const parameter: VirtualNetwork = {
        location: location,
        addressSpace: {
            addressPrefixes: ['10.0.0.0/16']
        }
    };
    const virtualNetworks_create_info = await networkClient.virtualNetworks.beginCreateOrUpdateAndWait(resourceGroupName, networkName, parameter);
    console.log(virtualNetworks_create_info);

    const subnet_parameter: Subnet = {
        addressPrefix: "10.0.0.0/24"
    };
    const subnet_create_info = await networkClient.subnets.beginCreateOrUpdateAndWait(resourceGroupName, networkName, subnetName, subnet_parameter);
    console.log(subnet_create_info)
}

async function main() {
    const credential = new DefaultAzureCredential();
    computeClient = new ComputeManagementClient(credential, subscriptionId);
    networkClient = new NetworkManagementClient(credential, subscriptionId);
    resourcesClient = new ResourceManagementClient(credential, subscriptionId);
    await createVirtualMachines();
}

main();