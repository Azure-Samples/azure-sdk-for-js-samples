import * as network from "@azure/arm-network";
import { DefaultAzureCredential} from "@azure/identity";

var subscriptionId = process.env.subscriptionId;
var credential = new DefaultAzureCredential();

class TestNetworkIp {

    private client = new network.NetworkManagementClient(credential,subscriptionId);
    private resourceGroup = "myjstest";
    private virtualnetworkName = "virtualnetworkyyy";
    private ipGroupName = "ipgroupyyy";


    //virtualNetworks.beginCreateOrUpdateAndWait
    public async virtualNetworks_beginCreateOrUpdateAndWait(){
        await this.client.virtualNetworks.beginCreateOrUpdateAndWait(this.resourceGroup,this.virtualnetworkName,{location:"eastus",addressSpace:{addressPrefixes:['10.0.0.0/16']}}).then(
            res => {
                console.log(res);
            }
        )
    }

    //ipGroups.beginCreateOrUpdateAndWait
    public async ipGroups_beginCreateOrUpdateAndWait(){
        const parameter:network.IpGroup= {
            tags: {
                key1: "value1"
            },
            location: "eastus",
            ipAddresses: [
                "13.64.39.16/32",
                "40.74.146.80/31",
                "40.74.147.32/28"
            ]
        };
        await this.client.ipGroups.beginCreateOrUpdateAndWait(this.resourceGroup,this.ipGroupName,parameter).then(
            res => {
                console.log(res);
            }
        )
    }

    //ipGroups.get
    public async ipGroups_get(){
        await this.client.ipGroups.get(this.resourceGroup,this.ipGroupName).then(
            res => {
                console.log(res);
            }
        )
    }

    //ipGroups.listByResourceGroup
    public async ipGroups_listByResourceGroup(){
        for await (let item of this.client.ipGroups.listByResourceGroup(this.resourceGroup)){
            console.log(item);
        }
    }

    //ipGroups.list
    public async ipGroups_list(){
        for await (let item of this.client.ipGroups.list()){
            console.log(item);
        }
    }

    //ipGroups.beginDeleteAndWait
    public async ipGroups_beginDeleteAndWait(){
        await this.client.ipGroups.beginDeleteAndWait(this.resourceGroup,this.ipGroupName).then(
            res => {
                console.log(res);
            }
        )
    }
}

