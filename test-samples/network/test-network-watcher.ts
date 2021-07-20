import * as network from "@azure/arm-network";
import * as storage from "@azure/arm-storage";
import * as compute from "@azure/arm-compute";
import { DefaultAzureCredential} from "@azure/identity";

var subscriptionId = process.env.subscriptionId;
var credential = new DefaultAzureCredential();
var client = new network.NetworkManagementClient(credential,subscriptionId);

class TestNetworkWatcherTroubleshoot {

    private resourceGroup = "myjstest";
    private networkWatcherName = "networkwatchernnn";
    private virtualMachineName = "virtualmachinennn";
    private virtualnetworkName = "virtualnetworknnn";
    private virtualNetworkGatewayName = "virtualnetworkgatewaynnn";
    private publicIpAddressName = "publicipaddressnnn";
    private subnetName = "subnetforgateway";
    private storageAccountName = "storagennn";
    private ipConfigurationName = "ipconfignnn";
    private networkInterfaceName = "networkInterfacennn";
    private vmName = "vmnamennn";
    private vm_extensionName = "myextensionnn";
    

    //virtualNetworks.beginCreateOrUpdateAndWait
    //subnets.beginCreateOrUpdateAndWait
    public async virtualNetworksAndSubnetCreate(){
        await client.virtualNetworks.beginCreateOrUpdateAndWait(this.resourceGroup,this.virtualnetworkName{location: "eastus",addressSpace: {addressPrefixes: ['10.0.0.0/16']}}).then(
            res => {
                console.log(res);
            }
        )
        //create subnet
        await client.subnets.beginCreateOrUpdateAndWait(this.resourceGroup,this.virtualnetworkName,this.subnetName,{addressPrefix:'10.0.0.0/24'}).then(
            res => {
                console.log(res);
            }
        )
    }

    //networkInterfaces.beginCreateOrUpdateAndWait
    private async networkInterfaces_beginCreateOrUpdateAndWait(){
        const subneyId = "/subscriptions/"+subscriptionId+"/resourceGroups/"+this.resourceGroup+"/providers/Microsoft.Network/virtualNetworks/"+this.virtualnetworkName+"/subnets/"+this.subnetName;
        const networkInterface_create = await client.networkInterfaces.beginCreateOrUpdateAndWait(this.resourceGroup,this.networkInterfaceName,{location: "eastus",ipConfigurations:[{name: 'MyIpConfig',subnet:{id:subneyId}}]});
        console.log(networkInterface_create);
        return networkInterface_create;
    }

    //publicIPAddresses.beginCreateOrUpdateAndWait
    public async publicIPAddresses_beginCreateOrUpdateAndWait(){
        const parameter:network.PublicIPAddress = {
            publicIPAllocationMethod: "Staic",
            idleTimeoutInMinutes: 10,
            publicIPAddressVersion: "IPv4",
            location: "eastus",
            sku: {
                name: "Standard"
            }
            
        };
        await client.publicIPAddresses.beginCreateOrUpdateAndWait(this.resourceGroup,this.publicIpAddressName,parameter).then(
            res => {
                console.log(res);
            }
        )
    }

    //virtualNetworkGateways.beginCreateOrUpdateAndWait
    public async virtualNetworkGateways_beginCreateOrUpdateAndWait(){
        const parameter:network.VirtualNetworkGateway = {
            ipConfigurations: [
                {
                    privateIPAllocationMethod: "Dynamic",
                    subnet: {
                        id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceGroup + "/providers/Microsoft.Network/virtualNetworks/" + this.virtualnetworkName + "/subnets/" + this.subnetName
                    },
                    publicIPAddress: {
                        id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceGroup + "/providers/Microsoft.Network/publicIPAddresses/" + this.publicIpAddressName
                    },
                    name: this.ipConfigurationName
                }
            ],
            gatewayType: "Vpn",
            vpnType: "RouteBased",
            enableBgp: false,
            active: false,
            enableDnsForwarding: false,
            sku: {
                name: "VpnGw1",
                tier: "VpnGw1"
            },
            bgpSettings: {
                asn: 65515,
                bgpPeeringAddress: "10.0.1.30",
                peerWeight: 0
            },
            customRoutes: {
                addressPrefixes: [
                    "101.168.0.6/32"
                ]
            },
            location: "eastus"
        };
        await client.virtualNetworkGateways.beginCreateOrUpdateAndWait(this.resourceGroup,this.virtualNetworkGatewayName,parameter).then(
            res => {
                console.log(res);
            }
        )
    }

    //storageAccounts.beginCreateAndWait
    public async storageAccounts_beginCreateAndWait(){
        const storage_ciient = new storage.StorageManagementClient(credential,subscriptionId);
        const parameter:storage.StorageAccountCreateParameters = {
            location: "eastus",
            sku: {
                name: "Standard_GRS"
            },
            kind: "StorageV2", 
        };
        await storage_ciient.storageAccounts.beginCreateAndWait(this.resourceGroup,this.storageAccountName,parameter).then(
            res => {
                console.log(res);
            }
        )
    }

    //networkWatchers.createOrUpdate
    public async networkWatchers_createOrUpdate(){
        await client.networkWatchers.createOrUpdate(this.resourceGroup,this.networkWatcherName,{location: "eastus"}).then(
            res => {
                console.log(res);
            }
        )
    }

    //networkWatchers.beginGetTroubleshootingAndWait
    public async networkWatchers_beginGetTroubleshootingAndWait(){
        const parameter:network.TroubleshootingParameters = {
            targetResourceId: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceGroup + "/providers/Microsoft.Network/virtualNetworkGateways/" + this.virtualNetworkGatewayName,
            storageId: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceGroup + "/providers/Microsoft.Storage/storageAccounts/" + this.storageAccountName,
            storagePath: "https://" + this.storageAccountName + ".blob.core.windows.net/troubleshooting"
        };
        await client.networkWatchers.beginGetTroubleshootingAndWait(this.resourceGroup,this.networkWatcherName,parameter).then(
            res => {
                console.log(res);
            }
        )
    }

    //networkWatchers.beginGetTroubleshootingResultAndWait
    public async networkWatchers_beginGetTroubleshootingResultAndWait(){
        await client.networkWatchers.beginGetTroubleshootingResultAndWait(this.resourceGroup,this.networkWatcherName,{targetResourceId: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceGroup + "/providers/Microsoft.Network/virtualNetworkGateways/" + this.virtualNetworkGatewayName}).then(
            res => {
                console.log(res);
            }
        )
    }

    //virtualMachines.beginCreateOrUpdateAndWait
    public async virtualMachines_beginCreateOrUpdateAndWait(){
        const compute_client = new compute.ComputeManagementClient(credential,subscriptionId)
        const nic_id = await this.networkInterfaces_beginCreateOrUpdateAndWait();
        const parameter:compute.VirtualMachine = {
            location: "eastus",
            hardwareProfile: {
                vmSize: "Standard_D2_v2"
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
                computerName: "myvm",
                adminPassword: "Aa1!zyx_",
                windowsConfiguration: {
                    enableAutomaticUpdates: true
                }
            },
            networkProfile: {
                networkInterfaces: [
                    {
                        id: nic_id.id
                    }
                ]
            }
        };
        await compute_client.virtualMachines.beginCreateOrUpdateAndWait(this.resourceGroup,this.vmName,parameter).then(
            res => {
                console.log(res);
            }
        )
    }

    //virtualMachineExtensions.beginCreateOrUpdateAndWait
    public async virtualMachineExtensions_beginCreateOrUpdateAndWait(){
        const compute_client = new compute.ComputeManagementClient(credential,subscriptionId)
        const parameter:compute.VirtualMachineExtension = {
            location: 'eastus',
            autoUpgradeMinorVersion: true,
            publisher: "Microsoft.Azure.NetworkWatcher",
            typeHandlerVersion: "1.4"
        };
        await compute_client.virtualMachineExtensions.beginCreateOrUpdateAndWait(this.resourceGroup,this.vmName,this.vm_extensionName,parameter).then(
            res => {
                console.log(res);
            }
        )
    }

    //networkInterfaces.get
    public async networkInterfaces_get(){
        const getResult = await client.networkInterfaces.get(this.resourceGroup,this.networkInterfaceName);
        console.log(getResult);
        return getResult;
    }

    //networkWatchers.beginVerifyIPFlowAndWait
    public async networkWatchers_beginVerifyIPFlowAndWait(){
        const nic = await this.networkInterfaces_get();
        const parameter:network.VerificationIPFlowParameters = {
            targetResourceId: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceGroup + "/providers/Microsoft.Compute/virtualMachines/" + this.virtualMachineName,
            direction: "Outbound",
            protocol: "TCP",
            localPort: "80",
            remotePort: "80",
            localIPAddress: nic.ipConfigurations[0].privateIPAddress,
            remoteIPAddress: "121.10.1.1"

        };
        await client.networkWatchers.beginVerifyIPFlowAndWait(this.resourceGroup,this.networkWatcherName,parameter).then(
            res => {
                console.log(res);
            }
        )
    }   
}