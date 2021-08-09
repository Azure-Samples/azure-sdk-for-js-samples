import { KeyVaultManagementClient,VaultCreateOrUpdateParameters,VaultAccessPolicyParameters,VaultPatchParameters } from "azure-arm-keyvault";
import { DefaultAzureCredential} from "@azure/identity";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();
const resourceGroup = "myjstest";
const tenantId = "72f988bf-86f1-41af-91ab-2d7cd011db47";
const vaultName = "myvaultzzzz";
const endpointConnectionName = "myendpointConnectionzzz";
let client: KeyVaultManagementClient;


//--keyvaultExamples--

//vaults.beginCreateOrUpdateAndWait
async function vaults_beginCreateOrUpdateAndWait(){
    const parameter:VaultCreateOrUpdateParameters = {
        location: "eastus",
        properties: {
            tenantId: tenantId,
            sku: {
                family: "A",
                name: "standard"
            },
            accessPolicies: [
                {
                    tenantId: tenantId,
                    objectId: "00000000-0000-0000-0000-000000000000",
                    permissions: {
                        keys: [
                            "encrypt",
                            "decrypt",
                            "wrapKey",
                            "unwrapKey",
                            "sign",
                            "verify",
                            "get",
                            "list",
                            "create",
                            "update",
                            "import",
                            "delete",
                            "backup",
                            "restore",
                            "recover",
                            "purge"
                        ],
                        secrets: [
                            "get",
                            "list",
                            "set",
                            "delete",
                            "backup",
                            "restore",
                            "recover",
                            "purge"
                        ],
                        certificates: [
                            "get",
                            "list",
                            "delete",
                            "create",
                            "import",
                            "update",
                            "managecontacts",
                            "getissuers",
                            "listissuers",
                            "setissuers",
                            "deleteissuers",
                            "manageissuers",
                            "recover",
                            "purge"
                        ]
                    }
                }
            ],
            enabledForDeployment: true,
            enabledForDiskEncryption: true,
            enabledForTemplateDeployment: true
        }
    };
    await client.vaults.beginCreateOrUpdateAndWait(resourceGroup,vaultName,parameter).then(
        res => {
            console.log(res);
        }
    )
}

//vaults.updateAccessPolicy
async function vaults_updateAccessPolicy(){
    const parameter:VaultAccessPolicyParameters = {
        properties: {
            accessPolicies: [
                {
                    tenantId: tenantId,
                    objectId: "00000000-0000-0000-0000-000000000000",
                    permissions: {
                        keys: [
                            "encrypt"
                        ],
                        secrets: [
                            "get"
                        ],
                        certificates: [
                            "get"
                        ]
                    }
                }
            ]
        }
    };
    await client.vaults.updateAccessPolicy(resourceGroup,vaultName,"add",parameter).then(
        res => {
            console.log(res);
        }
    )
}

//vaults.get
async function vaults_get(){
    await client.vaults.get(resourceGroup,vaultName).then(
        res => {
            console.log(res);
        }
    )
}

//vaults.listByResourceGroup
async function vaults_listByResourceGroup(){
    for await (let item of client.vaults.listByResourceGroup(resourceGroup,{top: 1})){
        console.log(item);
    }
}

//vaults.listDeleted
async function vaults_listDeleted(){
    for await (let item of client.vaults.listDeleted()){
        console.log(item);
    }
}

//vaults.listBySubscription
async function vaults_listBySubscription(){
    for await (let item of client.vaults.listBySubscription({top: 1})){
        console.log(item);
    }
}

//vaults.update
async function vaults_update(){
    const parameter:VaultPatchParameters = {
        properties: {
            tenantId: tenantId,
            sku: {
                family: "A",
                name: "standard"
            },
            accessPolicies: [
                {
                    tenantId: tenantId,
                    objectId: "00000000-0000-0000-0000-000000000000",
                    permissions: {
                        keys: [
                            "encrypt",
                            "decrypt",
                            "wrapKey",
                            "unwrapKey",
                            "sign",
                            "verify",
                            "get",
                            "list",
                            "create",
                            "update",
                            "import",
                            "delete",
                            "backup",
                            "restore",
                            "recover",
                            "purge"
                        ],
                        secrets: [
                            "get",
                            "list",
                            "set",
                            "delete",
                            "backup",
                            "restore",
                            "recover",
                            "purge"
                        ],
                        certificates: [
                            "get",
                            "list",
                            "delete",
                            "create",
                            "import",
                            "update",
                            "managecontacts",
                            "getissuers",
                            "listissuers",
                            "setissuers",
                            "deleteissuers",
                            "manageissuers",
                            "recover",
                            "purge"
                        ]
                    }
                }
            ],
            enabledForDeployment: true,
            enabledForDiskEncryption: true,
            enabledForTemplateDeployment: true
        }
    };
    await client.vaults.update(resourceGroup,vaultName,parameter).then(
        res => {
            console.log(res);
        }
    )
}

//vaults.checkNameAvailability
async function vaults_checkNameAvailability(){
    await client.vaults.checkNameAvailability({name: "sample-vault",type:"Microsoft.KeyVault/vaults"}).then(
        res => {
            console.log(res);
        }
    )
}

//vaults.delete
async function vaults_delete(){
    await client.vaults.delete(resourceGroup,vaultName).then(
        res => {
            console.log(res);
        }
    )
}

//vaults.getDeleted
async function vaults_getDeleted(){
    await client.vaults.getDeleted(vaultName,"eastus").then(
        res => {
            console.log(res);
        }
    )
}

//vaults.beginPurgeDeletedAndWait
async function vaults_beginPurgeDeletedAndWait(){
    await client.vaults.beginPurgeDeletedAndWait(vaultName,"eastus").then(
        res => {
            console.log(res);
        }
    )
}

//operations.list
async function operations_list(){
    for await (let item of client.operations.list()){
        console.log(item);
    }
}

async function main() {
    client = new KeyVaultManagementClient(credential, subscriptionId);
    await vaults_beginCreateOrUpdateAndWait();
}

main();
