import * as network from "@azure/arm-network";
import { DefaultAzureCredential} from "@azure/identity";

var subscriptionId = process.env.subscriptionId;
var credential = new DefaultAzureCredential();

class TestNetworkLoadBalancer {

    private client = new network.NetworkManagementClient(credential,subscriptionId);
    private resourceGroup = "myjstest";
    private virtualNetwork = "virtualnetworkttt";
    private subnetName = "subnetttt";
    private publicIpAddressName = "publicipaddressttt";
    private loadBalancerName = "loadbalancerttt";
    private inboundNatRuleName = "inboundNatRulettt";
    private frontendIpconfigurationName = "frontendipconfigurationttt";
    private backendAddressPollName = "backendAddressPoolttt";
    private loadBalancingRuleName = "loadbalancingttt";
    private outboundRuleName = "outboundRulettt";
    private probeName = "probettt";

    //publicIPAddresses.beginCreateOrUpdateAndWait
    public async createPublicIpAddress(){
        const parameter:network.PublicIPAddress = {
            publicIPAllocationMethod: "Static",
            idleTimeoutInMinutes: 10,
            publicIPAddressVersion: "IPv4",
            location: "eastus",
            sku: {
                name: "Standard"
            }
        };
        await this.client.publicIPAddresses.beginCreateOrUpdateAndWait(this.resourceGroup,this.publicIpAddressName,parameter).then(
            res => {
                console.log(res);
            }
        )
    }

    //virtualNetworks.beginCreateOrUpdateAndWait
    //subnets.beginCreateOrUpdateAndWait
    public async createVirtualnetworkAndSubnet(){
        //create virtualnetwork
        await this.client.virtualNetworks.beginCreateOrUpdateAndWait(this.resourceGroup,this.virtualNetwork,{location: 'eastus',addressSpace: {addressPrefixes: ['10.0.0.0/16']}}).then(
            res => {
                console.log(res);
            }
        )
        //create subnet
        await this.client.subnets.beginCreateOrUpdateAndWait(this.resourceGroup,this.virtualNetwork,this.subnetName,{addressPrefix: '10.0.0.0/24'}).then(
            res => {
                console.log(res);
            }
        )
    }

    //loadBalancers.beginCreateOrUpdateAndWait
    public async loadBalancers_beginCreateOrUpdateAndWait(){
        const parameter:network.LoadBalancer = {
            location: "eastus",
            sku: {
                name: "Standard"
            },
            frontendIPConfigurations: [
                {
                    name: this.frontendIpconfigurationName,
                    publicIPAddress: {
                        id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceGroup + "/providers/Microsoft.Network/publicIPAddresses/" + this.publicIpAddressName 
                    }
                }
            ],
            backendAddressPools: [
                {
                    name: this.backendAddressPollName
                }
            ],
            loadBalancingRules: [
                {
                    name: this.loadBalancingRuleName,
                    frontendIPConfiguration: {
                        id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceGroup + "/providers/Microsoft.Network/loadBalancers/" + this.loadBalancerName + "/frontendIPConfigurations/" + this.frontendIpconfigurationName
                    },
                    frontendPort: 80,
                    backendPort: 80,
                    enableFloatingIP: true,
                    idleTimeoutInMinutes: 15,
                    protocol: "Tcp",
                    loadDistribution: "Default",
                    disableOutboundSnat: true,
                    backendAddressPool: {
                        id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceGroup + "/providers/Microsoft.Network/loadBalancers/" + this.loadBalancerName + "/backendAddressPools/" + this.backendAddressPollName
                    },
                    probe: {
                        id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceGroup + "/providers/Microsoft.Network/loadBalancers/" + this.loadBalancerName + "/probes/" + this.probeName
                    }
                }
            ],
            probes: [
                {
                    name: this.probeName,
                    protocol: "Http",
                    port: 80,
                    requestPath: "healthcheck.aspx",
                    intervalInSeconds: 15,
                    numberOfProbes: 2
                }
            ],
            outboundRules: [
                {
                    name: this.outboundRuleName,
                    backendAddressPool: {
                        id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceGroup + "/providers/Microsoft.Network/loadBalancers/" + this.loadBalancerName + "/backendAddressPools/" + this.backendAddressPollName
                    },
                    frontendIPConfigurations: [
                        {
                            id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceGroup + "/providers/Microsoft.Network/loadBalancers/" + this.loadBalancerName + "/frontendIPConfigurations/" + this.frontendIpconfigurationName
                        }
                    ],
                    protocol: "All"
                }
            ]
        };
        await this.client.loadBalancers.beginCreateOrUpdateAndWait(this.resourceGroup,this.loadBalancerName,parameter).then(
            res => {
                console.log(res);
            }
        )
    }

    //inboundNatRules.beginCreateOrUpdateAndWait
    public async inboundNatRules_beginCreateOrUpdateAndWait(){
        const parameter:network.InboundNatRule ={
            protocol: "Tcp",
            frontendIPConfiguration: {
                id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceGroup + "/providers/Microsoft.Network/loadBalancers/" + this.loadBalancerName + "/frontendIPConfigurations/" + this.frontendIpconfigurationName
            },
            frontendPort: 3390,
            backendPort: 3389,
            idleTimeoutInMinutes: 4,
            enableTcpReset: false,
            enableFloatingIP: false
        };
        await this.client.inboundNatRules.beginCreateOrUpdateAndWait(this.resourceGroup,this.loadBalancerName,this.inboundNatRuleName,parameter).then(
            res => {
                console.log(res);
            }
        )
    }

    //loadBalancerFrontendIPConfigurations.get
    public async loadBalancerFrontendIPConfigurations_get(){
        await this.client.loadBalancerFrontendIPConfigurations.get(this.resourceGroup,this.loadBalancerName,this.frontendIpconfigurationName).then(
            res => {
                console.log(res);
            }
        )
    }

    //loadBalancerBackendAddressPools.get
    public async loadBalancerBackendAddressPools_get(){
        await this.client.loadBalancerBackendAddressPools.get(this.resourceGroup,this.loadBalancerName,this.backendAddressPollName).then(
            res => {
                console.log(res);
            }
        )
    }

    //loadBalancerLoadBalancingRules.get
    public async loadBalancerLoadBalancingRules_get(){
        await this.client.loadBalancerLoadBalancingRules.get(this.resourceGroup,this.loadBalancerName,this.loadBalancingRuleName).then(
            res => {
                console.log(res);
            }
        )
    }

    //inboundNatRules.get
    public async inboundNatRules_get(){
        await this.client.inboundNatRules.get(this.resourceGroup,this.loadBalancerName,this.inboundNatRuleName).then(
            res => {
                console.log(res);
            }
        )
    }

    //loadBalancerOutboundRules.get
    public async loadBalancerOutboundRules_get(){
        await this.client.loadBalancerOutboundRules.get(this.resourceGroup,this.loadBalancerName,this.outboundRuleName).then(
            res => {
                console.log(res);
            }
        )
    }

    //loadBalancers.get
    public async loadBalancers_get(){
        await this.client.loadBalancers.get(this.resourceGroup,this.loadBalancerName).then(
            res => {
                console.log(res);
            }
        )
    }

    //loadBalancerBackendAddressPools.list
    public async loadBalancerBackendAddressPools_list(){
        for await (let item of this.client.loadBalancerBackendAddressPools.list(this.resourceGroup,this.loadBalancerName)){
            console.log(item);
        }
    }

    //loadBalancerNetworkInterfaces.list
    public async loadBalancerNetworkInterfaces_list(){
        for await (let item of this.client.loadBalancerNetworkInterfaces.list(this.resourceGroup,this.loadBalancerName)){
            console.log(item);
        }
    }

    //loadBalancerLoadBalancingRules.list
    public async loadBalancerLoadBalancingRules_list(){
        for await (let item of this.client.loadBalancerLoadBalancingRules.list(this.resourceGroup,this.loadBalancerName)){
            console.log(item);
        }
    }

    //inboundNatRules.list
    public async inboundNatRules_list(){
        for await (let item of this.client.inboundNatRules.list(this.resourceGroup,this.loadBalancerName)){
            console.log(item);
        }
    }

    //loadBalancerOutboundRules.list
    public async loadBalancerOutboundRules_list(){
        for await (let item of this.client.loadBalancerOutboundRules.list(this.resourceGroup,this.loadBalancerName)){
            console.log(item);
        }
    }

    //loadBalancerProbes.list
    public async loadBalancerProbes_list(){
        for await (let item of this.client.loadBalancerProbes.list(this.resourceGroup,this.loadBalancerName)){
            console.log(item);
        }
    }

    //loadBalancers.list
    public async loadBalancers_list(){
        for await (let item of this.client.loadBalancers.list(this.resourceGroup)){
            console.log(item);
        }
    }

    //loadBalancers.listAll
    public async loadBalancers_listAll(){
        for await (let item of this.client.loadBalancers.listAll()){
            console.log(item);
        }
    }

    //loadBalancers.updateTags
    public async loadBalancers_updateTags(){
        await this.client.loadBalancers.updateTags(this.resourceGroup,this.loadBalancerName,{tags: {tag1: "value1",tag2: "value2"}}).then(
            res => {
                console.log(res);
            }
        )
    }

    //inboundNatRules.beginDeleteAndWait
    public async inboundNatRules_beginDeleteAndWait(){
        await this.client.inboundNatRules.beginDeleteAndWait(this.resourceGroup,this.loadBalancerName,this.inboundNatRuleName).then(
            res => {
                console.log(res);
            }
        )
    }

    //loadBalancers.beginDeleteAndWait
    public async loadBalancers_beginDeleteAndWait(){
        await this.client.loadBalancers.beginDeleteAndWait(this.resourceGroup,this.loadBalancerName).then(
            res => {
                console.log(res);
            }
        )
    }
}
const t = new TestNetworkLoadBalancer();
t.loadBalancers_beginDeleteAndWait();

