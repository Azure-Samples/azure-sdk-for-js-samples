import { WebSiteManagementClient,StaticSiteARMResource } from "azure-arm-appservice";
import { DefaultAzureCredential} from "@azure/identity";

const subscriptionId = process.env.subscriptionId;
const token = process.env.GITHUB_TOKEN_FOR_APPSERVICE;
const credential = new DefaultAzureCredential();
const resourceGroup = "myjstest";
const name = "mynameaaaa";
let client: WebSiteManagementClient;

//--StaticSiteExamples--

//staticSites.beginCreateOrUpdateStaticSiteAndWait
async function staticSites_beginCreateOrUpdateStaticSiteAndWait(){
    const parameter:StaticSiteARMResource = {
        location: "eastus2",
        sku: {
            name: "Free"
        },
        repositoryUrl: "https://github.com/colawwj/azure-rest-api-specs",
        branch: "master",
        repositoryToken: token,
        buildProperties: {
            appLocation: "app",
            apiLocation: "api",
            appArtifactLocation: "build"
        }
    };
    await client.staticSites.beginCreateOrUpdateStaticSiteAndWait(resourceGroup,name,parameter).then(
        res => {
            console.log(res);
        }
    )
}

//staticSites.listStaticSiteFunctions
async function staticSites_listStaticSiteFunctions(){
    for await (let item of client.staticSites.listStaticSiteFunctions(resourceGroup,name)){
        console.log(item);
    }
}

//staticSites.list
async function staticSites_list(){
    for await (let item of client.staticSites.list()){
        console.log(item);
    }
}

//staticSites.getStaticSite
async function staticSites_getStaticSite(){
    await client.staticSites.getStaticSite(resourceGroup,name).then(
        res => {
            console.log(res);
        }
    )
}

//staticSites.resetStaticSiteApiKey
async function staticSites_resetStaticSiteApiKey(){
    await client.staticSites.resetStaticSiteApiKey(resourceGroup,name,{shouldUpdateRepository:true,repositoryToken:token}).then(
        res => {
            console.log(res);
        }
    )
}

//staticSites.beginDetachStaticSiteAndWait
async function staticSites_beginDetachStaticSiteAndWait(){
    await client.staticSites.beginDetachStaticSiteAndWait(resourceGroup,name).then(
        res => {
            console.log(res);
        }
    )
}

//staticSites.listStaticSiteCustomDomains
async function staticSites_listStaticSiteCustomDomains(){
    for await (let item of client.staticSites.listStaticSiteCustomDomains(resourceGroup,name)){
        console.log(item);
    }
}

//staticSites.beginDeleteStaticSiteAndWait
async function staticSites_beginDeleteStaticSiteAndWait(){
    await client.staticSites.beginDeleteStaticSiteAndWait(resourceGroup,name).then(
        res => {
            console.log(res);
        }
    )
}

async function main() {
    client = new WebSiteManagementClient(credential, subscriptionId);
    await staticSites_beginCreateOrUpdateStaticSiteAndWait();
}

main();
