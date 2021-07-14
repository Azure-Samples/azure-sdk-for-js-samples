import * as network from "azure-arm-network";
import { DefaultAzureCredential} from "@azure/identity";

var subscriptionId = process.env.subscriptionId;
var credential = new DefaultAzureCredential();

class TestNetworkIpAddress {

    private client = new network.NetworkManagementClient(credential,subscriptionId);
    private resourceGroup = "qiaozhatest";
    private publicIpPrefixName = "publicipprefixyyy";
    private publicIpAddressName = "publicipaddressyyy";

    //publicIPPrefixes.beginCreateOrUpdateAndWait
    public async publicIPPrefixes_beginCreateOrUpdateAndWait(){
        const parameter:network.PublicIPPrefix = {
            location: "eastus",
            prefixLength: 30,
            sku: {
                name: "Standard"
            }
        };
        await this.client.publicIPPrefixes.beginCreateOrUpdateAndWait(this.resourceGroup,this.publicIpPrefixName,parameter).then(
            res => {
                console.log(res);
            }
        )
    }

    //publicIPAddresses.beginCreateOrUpdate
    public async publicIPAddresses_beginCreateOrUpdate(){
        await this.client.publicIPAddresses.beginCreateOrUpdateAndWait(this.resourceGroup,this.publicIpAddressName,{location: "eastus"}).then(
            res => {
                console.log(res);
            }
        )
    }

    //publicIPAddresses.get
    public async publicIPAddresses_get(){
        await this.client.publicIPAddresses.get(this.resourceGroup,this.publicIpAddressName).then(
            res => {
                console.log(res);
            }
        )
    }

    //publicIPPrefixes.get
    public async publicIPPrefixes_get(){
        await this.client.publicIPPrefixes.get(this.resourceGroup,this.publicIpPrefixName).then(
            res => {
                console.log(res);
            }
        )
    }

    //publicIPPrefixes.list
    public async publicIPPrefixes_list(){
        for await (let item of this.client.publicIPPrefixes.list(this.resourceGroup)){
            console.log(item);
        }
    }

    //publicIPAddresses.list
    public async publicIPAddresses_list(){
        for await (let item of this.client.publicIPAddresses.list(this.resourceGroup)){
            console.log(item);
        }
    }

    //publicIPAddresses.listAll
    public async publicIPAddresses_listAll(){
        for await (let item of this.client.publicIPAddresses.listAll()){
            console.log(item);
        }
    }

    //publicIPPrefixes.listAll
    public async publicIPPrefixes_listAll(){
        for await (let item of this.client.publicIPPrefixes.listAll()){
            console.log(item);
        }
    }

    //publicIPPrefixes.updateTags
    public async publicIPPrefixes_updateTags(){
        this.client.publicIPPrefixes.updateTags(this.resourceGroup,this.publicIpPrefixName,{tags: {tag1:'value1',tag2:"value2"}}).then(
            res => {
                console.log(res);
            }
        )
    }

    //publicIPAddresses.updateTags
    public async publicIPAddresses_updateTags(){
        this.client.publicIPAddresses.updateTags(this.resourceGroup,this.publicIpAddressName,{tags: {tag1:'value1',tag2:"value2"}}).then(
            res => {
                console.log(res);
            }
        )
    }

    //publicIPAddresses.beginDeleteAndWait
    public async publicIPAddresses_beginDeleteAndWait(){
        this.client.publicIPAddresses.beginDeleteAndWait(this.resourceGroup,this.publicIpAddressName).then(
            res => {
                console.log(res);
            }
        )
    }

    //publicIPPrefixes.beginDeleteAndWait
    public async publicIPPrefixes_beginDeleteAndWait(){
        this.client.publicIPPrefixes.beginDeleteAndWait(this.resourceGroup,this.publicIpPrefixName).then(
            res => {
                console.log(res);
            }
        )
    }
}
const t= new TestNetworkIpAddress();
t.publicIPPrefixes_beginDeleteAndWait();