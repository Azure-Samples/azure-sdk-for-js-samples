import { NetworkManagementClient,PublicIPPrefix } from "@azure/arm-network";
import { DefaultAzureCredential} from "@azure/identity";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();
const resourceGroup = "myjstest";
const publicIpPrefixName = "publicipprefixyyy";
const publicIpAddressName = "publicipaddressyyy";
let client: NetworkManagementClient;


//--NetworkIpAddressExamples--

//publicIPPrefixes.beginCreateOrUpdateAndWait
async function publicIPPrefixes_beginCreateOrUpdateAndWait(){
    const parameter:PublicIPPrefix = {
        location: "eastus",
        prefixLength: 30,
        sku: {
            name: "Standard"
        }
    };
    await client.publicIPPrefixes.beginCreateOrUpdateAndWait(resourceGroup,publicIpPrefixName,parameter).then(
        res => {
            console.log(res);
        }
    )
}

//publicIPAddresses.beginCreateOrUpdate
async function publicIPAddresses_beginCreateOrUpdate(){
    await client.publicIPAddresses.beginCreateOrUpdateAndWait(resourceGroup,publicIpAddressName,{location: "eastus"}).then(
        res => {
            console.log(res);
        }
    )
}

//publicIPAddresses.get
async function publicIPAddresses_get(){
    await client.publicIPAddresses.get(resourceGroup,publicIpAddressName).then(
        res => {
            console.log(res);
        }
    )
}

//publicIPPrefixes.get
async function publicIPPrefixes_get(){
    await client.publicIPPrefixes.get(resourceGroup,publicIpPrefixName).then(
        res => {
            console.log(res);
        }
    )
}

//publicIPPrefixes.list
async function publicIPPrefixes_list(){
    for await (let item of client.publicIPPrefixes.list(resourceGroup)){
        console.log(item);
    }
}

//publicIPAddresses.list
async function publicIPAddresses_list(){
    for await (let item of client.publicIPAddresses.list(resourceGroup)){
        console.log(item);
    }
}

//publicIPAddresses.listAll
async function publicIPAddresses_listAll(){
    for await (let item of client.publicIPAddresses.listAll()){
        console.log(item);
    }
}

//publicIPPrefixes.listAll
async function publicIPPrefixes_listAll(){
    for await (let item of client.publicIPPrefixes.listAll()){
        console.log(item);
    }
}

//publicIPPrefixes.updateTags
async function publicIPPrefixes_updateTags(){
    client.publicIPPrefixes.updateTags(resourceGroup,publicIpPrefixName,{tags: {tag1:'value1',tag2:"value2"}}).then(
        res => {
            console.log(res);
        }
    )
}

//publicIPAddresses.updateTags
async function publicIPAddresses_updateTags(){
    client.publicIPAddresses.updateTags(resourceGroup,publicIpAddressName,{tags: {tag1:'value1',tag2:"value2"}}).then(
        res => {
            console.log(res);
        }
    )
}

//publicIPAddresses.beginDeleteAndWait
async function publicIPAddresses_beginDeleteAndWait(){
    client.publicIPAddresses.beginDeleteAndWait(resourceGroup,publicIpAddressName).then(
        res => {
            console.log(res);
        }
    )
}

//publicIPPrefixes.beginDeleteAndWait
async function publicIPPrefixes_beginDeleteAndWait(){
    client.publicIPPrefixes.beginDeleteAndWait(resourceGroup,publicIpPrefixName).then(
        res => {
            console.log(res);
        }
    )
}

async function main() {
    client = new NetworkManagementClient(credential, subscriptionId);
    await publicIPPrefixes_beginCreateOrUpdateAndWait();
}

main();
