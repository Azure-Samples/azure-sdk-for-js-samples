import * as compute from "@azure/arm-compute";
import * as network from "@azure/arm-network";
import * as resources from "@azure/arm-resources";
import {DefaultAzureCredential} from "@azure/identity";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();

class TestCreateVirtualMachines {

    // @ts-ignore
    private computeClient = new compute.ComputeManagementClient(credential, subscriptionId);
    // @ts-ignore
    private networkClient = new network.NetworkManagementClient(credential, subscriptionId);
    // @ts-ignore
    private resourcesClient = new resources.ResourceManagementClient(credential, subscriptionId);
    private resourceGroupName = "testRG";
    private virtualMachineName = "virtualmachinex";
    private subnetName = "subnetnamex";
    private interfaceName = "interfacex";
    private networkName = "networknamex";
    private location = "eastus";

    //virtualMachines.createOrUpdate
    public async createVirtualMachines() {
        await this.createResourceGroup();
        await this.createVirtualNetwork();
        await this.createNetworkInterface(this.resourceGroupName, this.location, this.interfaceName);
        const parameter: compute.VirtualMachine = {
            location: this.location,
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
                        id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceGroupName + "/providers/Microsoft.Network/networkInterfaces/" + this.interfaceName + "",
                        primary: true
                    }
                ]
            }
        };
        const res = await this.computeClient.virtualMachines.beginCreateOrUpdateAndWait(this.resourceGroupName, this.virtualMachineName, parameter);
        console.log(res);
    }

    private async createResourceGroup() {
        const parameter: resources.ResourceGroup = {
            location: "eastus",
            tags: {
                tag1: "value1"
            }
        };
        await this.resourcesClient.resourceGroups.createOrUpdate(this.resourceGroupName, parameter).then(
            result => {
                console.log(result);
            }
        )
    }

    //networkClient.virtualNetworks.createOrUpdate
    private async createVirtualNetwork() {
        const parameter: network.VirtualNetwork = {
            location: this.location,
            addressSpace: {
                addressPrefixes: ['10.0.0.0/16']
            }
        };
        const virtualNetworks_create_info = await this.networkClient.virtualNetworks.beginCreateOrUpdateAndWait(this.resourceGroupName, this.networkName, parameter);
        console.log(virtualNetworks_create_info);

        const subnet_parameter: network.Subnet = {
            addressPrefix: "10.0.0.0/24"
        };
        const subnet_create_info = await this.networkClient.subnets.beginCreateOrUpdateAndWait(this.resourceGroupName, this.networkName, this.subnetName, subnet_parameter);
        console.log(subnet_create_info)
    }

    //networkClient.networkInterfaces.createOrUpdate
    private async createNetworkInterface(group_name: any, location: any, nic_name: any) {
        const parameter: network.NetworkInterface = {
            location: location,
            ipConfigurations: [
                {
                    name: "MyIpConfig",
                    subnet: {
                        id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceGroupName + "/providers/Microsoft.Network/virtualNetworks/" + this.networkName + "/subnets/" + this.subnetName

                    }
                }
            ]
        };
        const nic_info = await this.networkClient.networkInterfaces.beginCreateOrUpdateAndWait(group_name, nic_name, parameter);
        console.log(nic_info);
    }

}

const t = new TestCreateVirtualMachines();
t.createVirtualMachines();