import * as network from "@azure/arm-network";
import { DefaultAzureCredential} from "@azure/identity";

var subscriptionId = process.env.subscriptionId;
var credential = new DefaultAzureCredential();

class testNetworkBase {

    private client = new network.NetworkManagementClient(credential,subscriptionId);
    private serviceName = "myapimrndzzz";
    private resourceGroup = "myjstest";
    private virtualNetworkName = "virtualnetworkzzz";
    private remoteVirtualNetworkName = "rmvirtualnetworkzzz";
    private virtualNetworkTapName = "virtualnetworktapzzz";
    private networkInterfaceName = "networkinterfacenzzz";
    private virtualNetworkPeeringName = "virtualnetworkpeeringzzz";
    private publicIpAddressName = "publicipzzz";
    private virtualNetworkGatewayName = "virtualnetworkgatewayzzz";
    private localNetworkGatewayName = "localnetworkgatewayzzz";
    private ipConfigName = "ipconfigzzz";
    private connectionName = "connectionzzz";
    private subnetName = "subnetzzz";
    private gatewaySubnetName = "GatewaySubnet";
    private virtualRouteName = "virtualroutezzz";

    //publicIPAddresses.beginCreateOrUpdateAndWait
    public async create_public_ip_addresses(resourceGroup:any,location:any,pulicIpName:any){
        const parameter:network.PublicIPAddress = {
            location: location,
            publicIPAllocationMethod: "Dynamic",
            idleTimeoutInMinutes: 4
        };
        const ip_create = await this.client.publicIPAddresses.beginCreateOrUpdateAndWait(resourceGroup,pulicIpName,parameter);
        console.log(ip_create);
        return ip_create;
    }

    //networkInterfaces.beginCreateOrUpdateAndWait
    private async create_network_interface(resourceGroup:any,location:any,networkInterfaceName:any,ipconfig:any){
        const subneyId = "/subscriptions/"+subscriptionId+"/resourceGroups/"+this.resourceGroup+"/providers/Microsoft.Network/virtualNetworks/"+this.virtualNetworkName+"/subnets/"+this.subnetName;
        const networkInterface_create = await this.client.networkInterfaces.beginCreateOrUpdateAndWait(resourceGroup,networkInterfaceName,{location: location,ipConfigurations:[{name: ipconfig,subnet:{id:subneyId}}]});
        console.log(networkInterface_create);
        return networkInterface_create;
    }

    //virtualNetworks.beginCreateOrUpdateAndWait
    public async virtualNetworks_beginCreateOrUpdateAndWait(){
        
        const parameter:network.VirtualNetwork = {
            addressSpace: {
                addressPrefixes: [
                    "10.0.0.0/16"
                ]
            },
            location: "eastus"
        };
        await this.client.virtualNetworks.beginCreateOrUpdateAndWait(this.resourceGroup,this.virtualNetworkName,parameter).then(
            res => {
                console.log(res);
            }
        )
    }

    // //virtualNetworks.beginCreateOrUpdateAndWait
    public async remote_virtualNetworks_beginCreateOrUpdateAndWait(){
        await this.create_network_interface(this.resourceGroup,"eastus",this.networkInterfaceName,this.ipConfigName) //run behind subnet create
        const parameter:network.VirtualNetwork = {
            addressSpace: {
                addressPrefixes: [
                    "10.2.0.0/16"
                ]
            },
            location: "eastus"
        };
        await this.client.virtualNetworks.beginCreateOrUpdateAndWait(this.resourceGroup,this.remoteVirtualNetworkName,parameter).then(
            res => {
                console.log(res);
            }
        )
    }

    //subnets.beginCreateOrUpdateAndWait
    public async subnets_beginCreateOrUpdateAndWait(){
        const parameter:network.Subnet = {
            addressPrefix: "10.0.0.0/24"
        };
        await this.client.subnets.beginCreateOrUpdateAndWait(this.resourceGroup,this.virtualNetworkName,this.subnetName,parameter).then(
            res => {
                console.log(res);
            }
        )
        await this.create_network_interface(this.resourceGroup,"eastus",this.networkInterfaceName,this.ipConfigName);
    }

    //
    public async gateway_subnets_beginCreateOrUpdateAndWait(){
        const parameter:network.Subnet = {
            addressPrefix: "10.0.1.0/24"
        };
        await this.client.subnets.beginCreateOrUpdateAndWait(this.resourceGroup,this.virtualNetworkName,this.gatewaySubnetName,parameter).then(
            res => {
                console.log(res);
            }
        )
    }

    //localNetworkGateways.beginCreateOrUpdateAndWait
    public async localNetworkGateways_beginCreateOrUpdateAndWait(){
        const parameter:network.LocalNetworkGateway = {
            localNetworkAddressSpace: {
                addressPrefixes: [
                    "10.1.0.0/16"
                ]
            },
            gatewayIpAddress: "11.12.13.14",
            location: "eastus"
        };
        await this.client.localNetworkGateways.beginCreateOrUpdateAndWait(this.resourceGroup,this.localNetworkGatewayName,parameter).then(
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
                        id: "/subscriptions/"+subscriptionId+"/resourceGroups/"+this.resourceGroup+"/providers/Microsoft.Network/virtualNetworks/"+this.virtualNetworkName+"/subnets/"+this.gatewaySubnetName
                    },
                    publicIPAddress: {
                        id: "/subscriptions/"+subscriptionId+"/resourceGroups/"+this.resourceGroup+"/providers/Microsoft.Network/publicIPAddresses/"+this.publicIpAddressName
                    },
                    name: this.ipConfigName
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
        await this.client.virtualNetworkGateways.beginCreateOrUpdateAndWait(this.resourceGroup,this.virtualNetworkGatewayName,parameter).then(
            res => {
                console.log(res);
            }
        )
    }

    //virtualNetworkPeerings.beginCreateOrUpdateAndWait
    public async virtualNetworkPeerings_beginCreateOrUpdateAndWait(){
        const parameter:network.VirtualNetworkPeering = {
            allowVirtualNetworkAccess: true,
            allowForwardedTraffic: true,
            allowGatewayTransit: false,
            useRemoteGateways: false,
            remoteVirtualNetwork: {
                id: "/subscriptions/"+subscriptionId+"/resourceGroups/"+this.resourceGroup+"/providers/Microsoft.Network/virtualNetworks/"+this.remoteVirtualNetworkName
            }
        };
        await this.client.virtualNetworkPeerings.beginCreateOrUpdateAndWait(this.resourceGroup,this.virtualNetworkName,this.virtualNetworkPeeringName,parameter).then(
            res => {
                console.log(res);
            }
        )
    }

    //virtualNetworkGatewayConnections.beginCreateOrUpdateAndWait
    public async virtualNetworkGatewayConnections_beginCreateOrUpdateAndWait(){
        const parameter:network.VirtualNetworkGatewayConnection = {
            virtualNetworkGateway1: {
                ipConfigurations: [
                    {
                        privateIPAllocationMethod: "Dynamic",
                        subnet: {
                            id: "/subscriptions/"+subscriptionId+"/resourceGroups/"+this.resourceGroup+"/providers/Microsoft.Network/virtualNetworks/"+this.virtualNetworkName+"/subnets/"+this.gatewaySubnetName
                        },
                        publicIPAddress: {
                            id: "/subscriptions/"+subscriptionId+"/resourceGroups/"+this.resourceGroup+"/providers/Microsoft.Network/publicIPAddresses/"+this.publicIpAddressName
                        },
                        name: this.ipConfigName,
                        id: "/subscriptions/"+subscriptionId+"/resourceGroups/"+this.resourceGroup+"/providers/Microsoft.Network/virtualNetworkGateways/"+this.remoteVirtualNetworkName+"/ipConfigurations/"+this.ipConfigName
                    }
                ],
                gatewayType: "Vpn",
                vpnType: "RouteBased",
                enableBgp: false,
                active: false,
                sku: {
                    name: "VpnGw1",
                    tier: "VpnGw1"
                },
                bgpSettings: {
                    asn: 65514,
                    bgpPeeringAddress: "10.0.2.30",
                    peerWeight: 0
                },
                id: "/subscriptions/"+subscriptionId+"/resourceGroups/"+this.resourceGroup+"/providers/Microsoft.Network/virtualNetworkGateways/"+this.virtualNetworkGatewayName,
                location: "eastus"
            },
            localNetworkGateway2: {
                localNetworkAddressSpace: {
                    addressPrefixes: [
                        "10.1.0.0/16"
                    ]
                },
                gatewayIpAddress: "10.1.0.1",
                id: "/subscriptions/"+subscriptionId+"/resourceGroups/"+this.resourceGroup+"/providers/Microsoft.Network/localNetworkGateways/"+this.localNetworkGatewayName,
                location: "eastus"
            },
            connectionType: "IPsec",
            connectionProtocol: "IKEv2",
            routingWeight: 0,
            sharedKey: "ABc123",
            enableBgp: false,
            usePolicyBasedTrafficSelectors: false,
            ipsecPolicies: [],
            trafficSelectorPolicies: [],
            location: "eastus"
        };
        await this.client.virtualNetworkGatewayConnections.beginCreateOrUpdateAndWait(this.resourceGroup,this.connectionName,parameter).then(
            res => {
                console.log(res);
            }
        )
    }

    //virtualNetworkGatewayConnections.beginSetSharedKeyAndWait
    public async virtualNetworkGatewayConnections_beginSetSharedKeyAndWait(){
        const parameter:network.ConnectionSharedKey = {
            value: "AzureAbc123"
        };
        await this.client.virtualNetworkGatewayConnections.beginSetSharedKeyAndWait(this.resourceGroup,this.connectionName,parameter).then(
            res => {
                console.log(res);
            }
        )
    }

    //virtualNetworkPeerings.get
    public async virtualNetworkPeerings_get(){
        await this.client.virtualNetworkPeerings.get(this.resourceGroup,this.virtualNetworkName,this.virtualNetworkPeeringName).then(
            res => {
                console.log(res);
            }
        )
    }

    //serviceAssociationLinks.list
    public async serviceAssociationLinks_list(){
        await this.client.serviceAssociationLinks.list(this.resourceGroup,this.virtualNetworkName,this.subnetName).then(
            res => {
                console.log(res);
            }
        )
    }

    //resourceNavigationLinks.list
    public async resourceNavigationLinks_list(){
        await this.client.resourceNavigationLinks.list(this.resourceGroup,this.virtualNetworkName,this.subnetName).then(
            res => {
                console.log(res);
            }
        )
    }

    //virtualNetworks.checkIPAddressAvailability
    public async virtualNetworks_checkIPAddressAvailability(){
        await this.client.virtualNetworks.checkIPAddressAvailability(this.resourceGroup,this.virtualNetworkName,"10.0.1.4").then(
            res => {
                console.log(res);
            }
        )
    }

    //virtualNetworkGateways.listConnections
    public async virtualNetworkGateways_listConnections(){
        for await (let item of this.client.virtualNetworkGateways.listConnections(this.resourceGroup,this.virtualNetworkGatewayName)){
            console.log(item);
        }
    }

    //subnets.get
    public async subnets_get(){
        await this.client.subnets.get(this.resourceGroup,this.virtualNetworkName,this.subnetName).then(
            res => {
                console.log(res);
            }
        )
    }

    //virtualNetworkPeerings.list
    public async virtualNetworkPeerings_list(){
        for await (let item of this.client.virtualNetworkPeerings.list(this.resourceGroup,this.virtualNetworkName)){
            console.log(item);
        }
    }

    //virtualNetworkGateways.get
    public async virtualNetworkGateways_get(){
        await this.client.virtualNetworkGateways.get(this.resourceGroup,this.virtualNetworkGatewayName).then(
            res => {
                console.log(res);
            }
        )
    }

    //localNetworkGateways.get
    public async localNetworkGateways_get(){
        await this.client.localNetworkGateways.get(this.resourceGroup,this.localNetworkGatewayName).then(
            res => {
                console.log(res);
            }
        )
    }

    //subnets.list
    public async subnets_list(){
        for await (let item of this.client.subnets.list(this.resourceGroup,this.virtualNetworkName)){
            console.log(item);
        }
    }

    //virtualNetworks.listUsage
    public async virtualNetworks_listUsage(){
        for await (let item of this.client.virtualNetworks.listUsage(this.resourceGroup,this.virtualNetworkName)){
            console.log(item);
        }
    }

    //virtualNetworkGatewayConnections.getSharedKey
    public async virtualNetworkGatewayConnections_getSharedKey(){
        await this.client.virtualNetworkGatewayConnections.getSharedKey(this.resourceGroup,this.connectionName).then(
            res => {
                console.log(res);
            }
        )
    }

    //virtualNetworks.get
    public async virtualNetworks_get(){
        await this.client.virtualNetworks.get(this.resourceGroup,this.virtualNetworkName).then(
            res => {
                console.log(res);
            }
        )
    }

    //virtualNetworkGatewayConnections.get
    public async virtualNetworkGatewayConnections_get(){
        await this.client.virtualNetworkGatewayConnections.get(this.resourceGroup,this.connectionName).then(
            res => {
                console.log(res);
            }
        )
    }

    //virtualNetworkGateways.list
    public async virtualNetworkGateways_list(){
        for await (let item of this.client.virtualNetworkGateways.list(this.resourceGroup)){
            console.log(item);
        }
    }

    //localNetworkGateways.list
    public async localNetworkGateways_list(){
        for await (let item of this.client.localNetworkGateways.list(this.resourceGroup)){
            console.log(item);
        }
    }

    //virtualNetworks.list
    public async virtualNetworks_list(){
        for await (let item of this.client.virtualNetworks.list(this.resourceGroup)){
            console.log(item);
        }
    }

    //virtualNetworkGatewayConnections.list
    public async virtualNetworkGatewayConnections_list(){
        for await (let item of this.client.virtualNetworkGatewayConnections.list(this.resourceGroup)){
            console.log(item);
        }
    }

    //virtualNetworks.listAll
    public async virtualNetworks_listAll(){
        for await (let item of this.client.virtualNetworks.listAll()){
            console.log(item);
        }
    }

    // //virtualNetworkGateways.beginSetVpnclientIpsecParametersAndWait (need vpn client)
    // public async virtualNetworkGateways_beginSetVpnclientIpsecParametersAndWait(){
    //     const parameter:network.VpnClientIPsecParameters = {
    //         saLifeTimeSeconds: 86473,
    //         saDataSizeKilobytes: 429497,
    //         ipsecEncryption: "AES256",
    //         ipsecIntegrity: "SHA256",
    //         ikeEncryption: "AES256",
    //         ikeIntegrity: "SHA384",
    //         dhGroup: "DHGroup2",
    //         pfsGroup: "PFS2"
    //     };
    //     await this.client.virtualNetworkGateways.beginSetVpnclientIpsecParametersAndWait(this.resourceGroup,this.virtualNetworkGatewayName,parameter).then(
    //         res => {
    //             console.log(res);
    //         }
    //     )
    // }

    //virtualNetworkGateways.beginGetAdvertisedRoutesAndWait
    public async virtualNetworkGateways_beginGetAdvertisedRoutesAndWait(){
        await this.client.virtualNetworkGateways.beginGetAdvertisedRoutesAndWait(this.resourceGroup,this.virtualNetworkGatewayName,"10.0.0.2").then(
            res => {
                console.log(res);
            }
        )
    }

    //virtualNetworkGateways.beginGetBgpPeerStatusAndWait
    public async virtualNetworkGateways_beginGetBgpPeerStatusAndWait(){
        await this.client.virtualNetworkGateways.beginGetBgpPeerStatusAndWait(this.resourceGroup,this.virtualNetworkGatewayName).then(
            res => {
                console.log(res);
            }
        )
    }

    //virtualNetworkGateways.beginGetLearnedRoutesAndWait
    public async virtualNetworkGateways_beginGetLearnedRoutesAndWait(){
        await this.client.virtualNetworkGateways.beginGetLearnedRoutesAndWait(this.resourceGroup,this.virtualNetworkGatewayName).then(
            res => {
                console.log(res);
            }
        )
    }

    //virtualNetworkGatewayConnections.beginResetSharedKeyAndWait
    public async virtualNetworkGatewayConnections_beginResetSharedKeyAndWait(){
        await this.client.virtualNetworkGatewayConnections.beginResetSharedKeyAndWait(this.resourceGroup,this.connectionName,{keyLength: 128}).then(
            res => {
                console.log(res);
            }
        )
    }

    //virtualNetworkGateways.beginResetAndWait
    public async virtualNetworkGateways_beginResetAndWait(){
        await this.client.virtualNetworkGateways.beginResetAndWait(this.resourceGroup,this.virtualNetworkGatewayName).then(
            res => {
                console.log(res);
            }
        )
    }

    //virtualNetworkGateways.beginUpdateTagsAndWait
    public async virtualNetworkGateways_beginUpdateTagsAndWait(){
        await this.client.virtualNetworkGateways.beginUpdateTagsAndWait(this.resourceGroup,this.virtualNetworkGatewayName,{tags: {tag1: 'value1',tag2: "value2"}}).then(
            res => {
                console.log(res);
            }
        )
    }

    //localNetworkGateways.updateTags
    public async localNetworkGateways_updateTags(){
        await this.client.localNetworkGateways.updateTags(this.resourceGroup,this.localNetworkGatewayName,{tags: {tag1: 'value1',tag2: "value2"}}).then(
            res => {
                console.log(res);
            }
        )
    }

    //virtualNetworks.updateTags
    public async virtualNetworks_updateTags(){
        await this.client.virtualNetworks.updateTags(this.resourceGroup,this.virtualNetworkName,{tags: {tag1:"value1",tag2:"value2"}}).then(
            res => {
                console.log(res);
            }
        )
    }

    //virtualNetworkGatewayConnections.beginUpdateTagsAndWait
    public async virtualNetworkGatewayConnections_beginUpdateTagsAndWait(){
        await this.client.virtualNetworkGatewayConnections.beginUpdateTagsAndWait(this.resourceGroup,this.connectionName,{tags: {tag1:"value1",tag2:"value2"}}).then(
            res => {
                console.log(res);
            }
        )
    }

    //virtualNetworkGatewayConnections.beginDeleteAndWait
    public async virtualNetworkGatewayConnections_beginDeleteAndWait(){
        await this.client.virtualNetworkGatewayConnections.beginDeleteAndWait(this.resourceGroup,this.connectionName).then(
            res => {
                console.log(res);
            }
        )
    }

    //virtualNetworkPeerings.beginDeleteAndWait
    public async virtualNetworkPeerings_beginDeleteAndWait(){
        await this.client.virtualNetworkPeerings.beginDeleteAndWait(this.resourceGroup,this.virtualNetworkName,this.virtualNetworkPeeringName).then(
            res => {
                console.log(res);
            }
        )
    }

    //virtualNetworkGateways.beginDeleteAndWait
    public async virtualNetworkGateways_beginDeleteAndWait(){
        await this.client.virtualNetworkGateways.beginDeleteAndWait(this.resourceGroup,this.virtualNetworkGatewayName).then(
            res => {
                console.log(res);
            }
        )
    }

    //localNetworkGateways.beginDeleteAndWait
    public async localNetworkGateways_beginDeleteAndWait(){
        await this.client.localNetworkGateways.beginDeleteAndWait(this.resourceGroup,this.localNetworkGatewayName).then(
            res => {
                console.log(res);
            }
        )
    }

    //networkInterfaces.beginDeleteAndWait
    public async networkInterfaces_beginDeleteAndWait(){
        await this.client.networkInterfaces.beginDeleteAndWait(this.resourceGroup,this.networkInterfaceName).then(
            res => {
                console.log(res);
            }
        )
    }

    //subnets.beginDeleteAndWait
    public async subnets_beginDeleteAndWait(){
        await this.client.subnets.beginDeleteAndWait(this.resourceGroup,this.virtualNetworkName,this.subnetName).then(
            res => {
                console.log(res);
            }
        )
    }

    //subnets.beginDeleteAndWait
    public async virtualNetworks_beginDeleteAndWait(){
        await this.client.virtualNetworks.beginDeleteAndWait(this.resourceGroup,this.virtualNetworkName).then(
            res => {
                console.log(res);
            }
        )
    }
}

// const t = new testNetworkBase()
// t.virtualNetworks_beginDeleteAndWait();