import { ComputeManagementClient } from "@azure/arm-compute";
import { StorageManagementClient,BlobContainer,StorageAccountCreateParameters } from "@azure/arm-storage";
import { generateAccountSASQueryParameters,AccountSASPermissions,ContainerClient,AccountSASResourceTypes,
    AccountSASSignatureValues,StorageSharedKeyCredential } from "@azure/storage-blob"
import {DefaultAzureCredential} from "@azure/identity";

var subscriptionId = process.env.subscriptionId;
var credential = new DefaultAzureCredential();

/*
class Test_logAnalytics
*/
class Test_logAnalytics{
    private storage_client = new StorageManagementClient(credential, subscriptionId);
    private compute_client = new ComputeManagementClient(credential, subscriptionId);
    private resourceName = "qiaozhatest";
    private storage_account_name = "accountxyz";
    private log_analytic_name = "loganalyticx";
    private location = "eastus";


    //
    private async create_sas_uri(){
        const parameter:StorageAccountCreateParameters = {
            sku: {
                name: "Standard_GRS"
            },
            kind: "StorageV2",
            location: this.location,
            encryption: {
                services: {
                    file: {
                        keyType: "Account",
                        enabled: true
                    },
                    blob: {
                        keyType:  "Account",
                        enabled: true
                    }
                },
                keySource: "Microsoft.Storage"
            },
            tags: {
                key1: "value1",
                key2: "value2"
            }
        };
        await this.storage_client.storageAccounts.create(this.resourceName,this.storage_account_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    // //
    // public async create_container_client_uri(){
    //     const keys = this.storage_client.storageAccounts.listKeys(this.resourceName,this.storage_account_name);
    //     console.log(keys)

    //     const containerClient_uri = new ContainerClient()
    // }
}