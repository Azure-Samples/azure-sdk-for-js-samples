import * as storage from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";
import { NetworkManagementClient,PrivateEndpoint } from "@azure/arm-network";

var subscriptionId = process.env.subscriptionId;
var credential = new DefaultAzureCredential();

class Test_Storage {

    private client = new storage.StorageManagementClient(credential,subscriptionId);
    private network_client = new NetworkManagementClient(credential,subscriptionId);
    private resourceGroup = "myjstest";
    private storageAccountName = "storageaccountzzzxxx";
    private containerName = "containerzzz";
    private encryptionScopeName = "encryptionscopezzz";
    private vnetName = "virualnetworkzzz";
    private subName = "subnetzzz";
    private endpointName = "endpointzzz";

    private async create_endpoint(resourceGroup:any,location:any,vnet_name:any,sub_net:any,endpoint_name:any,resource_id:any){
        //create VNet
        const vnet_create = await this.network_client.virtualNetworks.beginCreateOrUpdateAndWait(resourceGroup,vnet_name,{location: location,addressSpace: {addressPrefixes: ["10.0.0.0/16"]}});
        console.log(vnet_create)

        //create Subnet
        const sunbet_create = await this.network_client.subnets.beginCreateOrUpdateAndWait(resourceGroup,vnet_name,sub_net,{addressPrefix: "10.0.0.0/24",privateLinkServiceNetworkPolicies: "disabled",privateEndpointNetworkPolicies: "disabled"});
        console.log(sunbet_create);

        //create private endpoint
        const parameter:PrivateEndpoint = {
            location: location,
            privateLinkServiceConnections: [
                {
                    name: "myconnection",
                    privateLinkServiceId: resource_id,
                    groupIds: ["blob"]
                }
            ],
            subnet: {
                id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + resourceGroup + "/providers/Microsoft.Network/virtualNetworks/" + vnet_name + "/subnets/" + sub_net
            }
        };
        const endpoint_create = await this.network_client.privateEndpoints.beginCreateOrUpdateAndWait(resourceGroup,endpoint_name,parameter);
        console.log(endpoint_create);
        return endpoint_create.id;
    }

    // storageAccounts.beginCreateAndWait
    public async storageAccounts_beginCreateAndWait(){
        const parameter: storage.StorageAccountCreateParameters = {
            sku: {
                name: "Standard_GRS"
            },
            kind: "StorageV2",
            location: "westeurope",
            encryption: {
                services: {
                    file: {
                        keyType: "Account",
                        enabled: true
                    },
                    blob: {
                        keyType: "Account",
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
        const storageaccount = await this.client.storageAccounts.beginCreateAndWait(this.resourceGroup,this.storageAccountName,parameter);
        console.log(storageaccount);

        //create endpoint
        await this.create_endpoint(this.resourceGroup,"eastus",this.vnetName,this.subName,this.endpointName,storageaccount.id).then(
            result => {
                console.log(result)
            }
        )
    }

    //storageAccounts.getProperties
    public async storageAccounts_getProperties(){
        const storageaccount = await this.client.storageAccounts.getProperties(this.resourceGroup,this.storageAccountName);
        console.log(storageaccount);
        return storageaccount;
    }

    //storageAccounts.listByResourceGroup
    public async storageAccounts_listByResourceGroup(){
        for await (let item of this.client.storageAccounts.listByResourceGroup(this.resourceGroup)){
            console.log(item);
        }
    }

    //storageAccounts.list
    public async storageAccounts_list(){
        for await (let item of this.client.storageAccounts.list()){
            console.log(item);
        }
    }

    //storageAccounts.revokeUserDelegationKeys
    public async storageAccounts_revokeUserDelegationKeys(){
        await this.client.storageAccounts.revokeUserDelegationKeys(this.resourceGroup,this.storageAccountName).then(
            res => {
                console.log(res);
            }
        )
    }

    //storageAccounts.regenerateKey
    public async storageAccounts_regenerateKey(){
        const parameter:storage.StorageAccountRegenerateKeyParameters = {
            keyName: "key2"
        };
        await this.client.storageAccounts.regenerateKey(this.resourceGroup,this.storageAccountName,parameter).then(
            res => {
                console.log(res);
            }
        )
    }

    //storageAccounts_listKeys
    public async storageAccounts_listKeys(){
        await this.client.storageAccounts.listKeys(this.resourceGroup,this.storageAccountName).then(
            res => {
                console.log(res)
            }
        )
    }

    //storageAccounts.checkNameAvailability
    public async storageAccounts_checkNameAvailability(){
        const parameter:storage.StorageAccountCheckNameAvailabilityParameters={
            name: "sto3363",
            type: "Microsoft.Storage/storageAccounts"
        };
        await this.client.storageAccounts.checkNameAvailability(parameter).then(
            res => {
                console.log(res)
            }
        )
    }

    //fileServices.setServiceProperties
    public async fileServices_setServiceProperties(){
        const parameter:storage.FileServiceProperties = {
            cors: {
                corsRules: [
                    {
                        allowedOrigins: [
                            "http://www.contoso.com",
                            "http://www.fabrikam.com"
                        ],
                        allowedMethods: [
                            "GET",
                            "HEAD",
                            "POST",
                            "OPTIONS",
                            "MERGE",
                            "PUT" 
                        ],
                        maxAgeInSeconds: 100,
                        exposedHeaders: [
                            "x-ms-meta-*"
                        ],
                        allowedHeaders: [
                            "x-ms-meta-abc",
                            "x-ms-meta-data*",
                            "x-ms-meta-target*"
                        ]
                    },
                    {
                        allowedOrigins: [
                            "*"
                        ],
                        allowedMethods: [
                            "GET"
                        ],
                        maxAgeInSeconds: 2,
                        exposedHeaders: [
                            "*"
                        ],
                        allowedHeaders: [
                            "*"
                        ]
                    },
                    {
                        allowedOrigins: [
                            "http://www.abc23.com",
                            "https://www.fabrikam.com/*"
                        ],
                        allowedMethods: [
                            "GET",
                            "PUT"
                        ],
                        maxAgeInSeconds: 2000,
                        exposedHeaders: [
                            "x-ms-meta-abc",
                            "x-ms-meta-data*",
                            "x-ms-meta-target*"
                        ],
                        allowedHeaders: [
                            "x-ms-meta-12345675754564*"
                        ]
                    }
                ]
            }
        };
        await this.client.fileServices.setServiceProperties(this.resourceGroup,this.storageAccountName,parameter).then(
            result => {
                console.log(result);
            }
        )
    }

    //fileServices.getServiceProperties
    public async fileServices_getServiceProperties(){
        await this.client.fileServices.getServiceProperties(this.resourceGroup,this.storageAccountName).then(
            result => {
                console.log(result);
            }
        )
    }

    //fileServices.list
    public async fileServices_list(){
       await this.client.fileServices.list(this.resourceGroup,this.storageAccountName).then(
           result => {
               console.log(result);
           }
       )
    }

    //blobServices.setServiceProperties
    public async blobServices_setServiceProperties(){
        const parameter:storage.BlobServiceProperties = {
            cors: {
                corsRules: [
                    {
                        allowedOrigins: [
                            "http://www.contoso.com",
                            "http://www.fabrikam.com"
                        ],
                        allowedMethods: [
                            "GET",
                            "HEAD",
                            "POST",
                            "OPTIONS",
                            "MERGE",
                            "PUT" 
                        ],
                        maxAgeInSeconds: 100,
                        exposedHeaders: [
                            "x-ms-meta-*"
                        ],
                        allowedHeaders: [
                            "x-ms-meta-abc",
                            "x-ms-meta-data*",
                            "x-ms-meta-target*"
                        ]
                    },
                    {
                        allowedOrigins: [
                            "*"
                        ],
                        allowedMethods: [
                            "GET"
                        ],
                        maxAgeInSeconds: 2,
                        exposedHeaders: [
                            "*"
                        ],
                        allowedHeaders: [
                            "*"
                        ]
                    },
                    {
                        allowedOrigins: [
                            "http://www.abc23.com",
                            "https://www.fabrikam.com/*"
                        ],
                        allowedMethods: [
                            "GET",
                            "PUT"
                        ],
                        maxAgeInSeconds: 2000,
                        exposedHeaders: [
                            "x-ms-meta-abc",
                            "x-ms-meta-data*",
                            "x-ms-meta-target*"
                        ],
                        allowedHeaders: [
                            "x-ms-meta-12345675754564*"
                        ]
                    }
                ]
            },
            defaultServiceVersion: "2017-07-29",
            deleteRetentionPolicy: {
                enabled: true,
                days: 300
            },
            // isVersioningEnabled: true,    Change Feed is not supported for the account.
            // changeFeed: {
            //     enabled: true,
            //     retentionInDays: 7
            // }
        };
        await this.client.blobServices.setServiceProperties(this.resourceGroup,this.storageAccountName,parameter).then(
            result => {
                console.log(result);
            }
        )
    }

    //blobServices.getServiceProperties
    public async blobServices_getServiceProperties(){
        await this.client.blobServices.getServiceProperties(this.resourceGroup,this.storageAccountName).then(
            result => {
                console.log(result);
            }
        )
    }

    //blobServices.list
    public async blobServices_list(){
        for await (let item of this.client.blobServices.list(this.resourceGroup,this.storageAccountName)){
            console.log(item);
        }
    }

    //encryptionScopes.put
    public async encryptionScopes_put(){
        const parameter:storage.EncryptionScope = {
            source: "Microsoft.Storage",
            state: "Enabled"
        };
        await this.client.encryptionScopes.put(this.resourceGroup,this.storageAccountName,this.encryptionScopeName,parameter).then(
            result => {
                console.log(result);
            }
        )
    }

    //encryptionScopes.get
    public async encryptionScopes_get(){
        await this.client.encryptionScopes.get(this.resourceGroup,this.storageAccountName,this.encryptionScopeName).then(
            result => {
                console.log(result);
            }
        )
    }

    //encryptionScopes.list
    public async encryptionScopes_list(){
        for await (let item of this.client.encryptionScopes.list(this.resourceGroup,this.storageAccountName)){
            console.log(item);
        }
    }

    //encryptionScopes.patch
    public async encryptionScopes_patch(){
        const parameter:storage.EncryptionScope= {
            source: "Microsoft.Storage",
            state: "Enabled"
        };
        await this.client.encryptionScopes.patch(this.resourceGroup,this.storageAccountName,this.encryptionScopeName,parameter).then(
            result => {
                console.log(result)
            }    
        )
    }

    //managementPolicies.createOrUpdate
    public async managementPolicies_createOrUpdate(){
        const parameter:storage.ManagementPolicy = {
            policy: {
                rules: [
                    {
                        enabled: true,
                        name: "olcmtest",
                        type: "Lifecycle",
                        definition: {
                            filters: {
                                blobTypes: [
                                    "blockBlob"
                                ],
                                prefixMatch: [
                                    "olcmtestcontainer"
                                ]
                            },
                            actions: {
                                baseBlob: {
                                    tierToCool: {
                                        daysAfterModificationGreaterThan: 30
                                    },
                                    tierToArchive: {
                                        daysAfterModificationGreaterThan: 90
                                    },
                                    delete: {
                                        daysAfterModificationGreaterThan: 1000
                                    }
                                },
                                snapshot: {
                                    delete: {
                                        daysAfterCreationGreaterThan: 30
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        };
        await this.client.managementPolicies.createOrUpdate(this.resourceGroup,this.storageAccountName,"default",parameter).then(
            result => {
                console.log(result);
            }
        )
    }

    //managementPolicies.get
    public async managementPolicies_get(){
        await this.client.managementPolicies.get(this.resourceGroup,this.storageAccountName,"default").then(
            result => {
                console.log(result);
            }
        )
    }

    //privateEndpointConnections.put
    public async privateEndpointConnections_put(){
        const privateEndpointConnections = (await this.storageAccounts_getProperties()).privateEndpointConnections[0].name;

        const parameter:storage.PrivateEndpointConnection = {
            privateLinkServiceConnectionState: {
                status: "Rejected",
                description: "Auto-Approved"
            }
        };
        await this.client.privateEndpointConnections.put(this.resourceGroup,this.storageAccountName,privateEndpointConnections,parameter).then(
            result => {
                console.log(result);
            }
        )
    }

    //privateEndpointConnections.get
    public async privateEndpointConnections_get(){
        const privateEndpointConnections = (await this.storageAccounts_getProperties()).privateEndpointConnections[0].name;
        await this.client.privateEndpointConnections.get(this.resourceGroup,this.storageAccountName,privateEndpointConnections).then(
            result => {
                console.log(result);
            }
        )
    }

    //blobContainers.create
    public async blobContainers_create(){
        await this.client.blobContainers.create(this.resourceGroup,this.storageAccountName,this.containerName,{}).then(
            result => {
                console.log(result);
            }
        )
    }

    //blobContainers.createOrUpdateImmutabilityPolicy
    public async blobContainers_createOrUpdateImmutabilityPolicy(){
        const create_result = await this.client.blobContainers.createOrUpdateImmutabilityPolicy(this.resourceGroup,this.storageAccountName,this.containerName,{parameters: {immutabilityPeriodSinceCreationInDays: 3,allowProtectedAppendWrites: true}});
        console.log(create_result);
    }

    //blobContainers.getImmutabilityPolicy
    public async blobContainers_getImmutabilityPolicy(){
        const get_result = await this.client.blobContainers.getImmutabilityPolicy(this.resourceGroup,this.storageAccountName,this.containerName);
        console.log(get_result);
        return get_result;
    }

    //blobContainers.get
    public async blobContainers_get(){
        await this.client.blobContainers.get(this.resourceGroup,this.storageAccountName,this.containerName).then(
            result => {
                console.log(result);
            }
        )
    }

    //blobContainers.list
    public async blobContainers_list(){
        for await (let item of this.client.blobContainers.list(this.resourceGroup,this.storageAccountName)){
            console.log(item);
        }
    }

    //blobContainers.setLegalHold
    public async blobContainers_setLegalHold(){
        const parameter:storage.LegalHold = {
            tags: [
                "tag1",
                "tag2",
                "tag3"
            ]
        };
        await this.client.blobContainers.setLegalHold(this.resourceGroup,this.storageAccountName,this.containerName,parameter).then(
            result => {
                console.log(result);
            }
        )
    }

    //blobContainers.clearLegalHold
    public async blobContainers_clearLegalHold(){
        const parameter:storage.LegalHold = {
            tags: [
                "tag1",
                "tag2",
                "tag3"
            ]
        };
        await this.client.blobContainers.clearLegalHold(this.resourceGroup,this.storageAccountName,this.containerName,parameter).then(
            result => {
                console.log(result);
            }
        )
    }

    //blobContainers.lease
    public async blobContainers_lease(){
        const parameter:storage.BlobContainersLeaseOptionalParams = {
            parameters: {
                action: "Acquire",
                leaseDuration: -1
            }
        };
        const lease_info = await this.client.blobContainers.lease(this.resourceGroup,this.storageAccountName,this.containerName,parameter);
        console.log(lease_info);
        return lease_info;
    }

    //blobContainers.update
    public async blobContainers_update(){

        const parameter:storage.BlobContainer={
            publicAccess: "Container",
            metadata: {
                metadata: "true"
            }
        };
        await this.client.blobContainers.update(this.resourceGroup,this.storageAccountName,this.containerName,parameter).then(
            result => {
                console.log(result);
            }
        )
    }

    //blobContainers.deleteImmutabilityPolicy
    public async blobContainers_deleteImmutabilityPolicy(){
        const etag = (await this.blobContainers_getImmutabilityPolicy()).eTag;
        await this.client.blobContainers.deleteImmutabilityPolicy(this.resourceGroup,this.storageAccountName,this.containerName,etag).then(
            result => {
                console.log(result)                
            }
        )
    }

    //blobContainers.lockImmutabilityPolicy
    public async blobContainers_lockImmutabilityPolicy(){
        const etag = (await this.blobContainers_getImmutabilityPolicy()).eTag;
        await this.client.blobContainers.lockImmutabilityPolicy(this.resourceGroup,this.storageAccountName,this.containerName,etag).then(
            res => {
                console.log(res);
            }
        )
    }

    //blobContainers.extendImmutabilityPolicy
    public async blobContainers_extendImmutabilityPolicy(){
        const etag = (await this.blobContainers_getImmutabilityPolicy()).eTag;
        const parameter:storage.BlobContainersExtendImmutabilityPolicyOptionalParams = {
            parameters: {
                immutabilityPeriodSinceCreationInDays: 100
            }
        };
        await this.client.blobContainers.extendImmutabilityPolicy(this.resourceGroup,this.storageAccountName,this.containerName,etag,parameter).then(
            res => {
                console.log(res);
            }
        )
    }

    //blobContainers.delete
    public async blobContainers_delete(){
        
        await this.client.blobContainers.delete(this.resourceGroup,this.storageAccountName,this.containerName).then(
            res => {
                console.log(res);
            }
        )
    }

    //privateLinkResources.listByStorageAccount
    public async privateLinkResources_listByStorageAccount(){
        await this.client.privateLinkResources.listByStorageAccount(this.resourceGroup,this.storageAccountName).then(
            result => {
                console.log(result);
            }
        )
    }

    //usages.listByLocation
    public async usages_listByLocation(){
        for await (let item of this.client.usages.listByLocation("westeurope")){
            console.log(item);
        }
    }

    //skus.list
    public async skus_list(){
        for await (let item of this.client.skus.list()){
            console.log(item)
        }
    }

    //operations.list
    public async operations_list(){
        for await (let item of this.client.operations.list()){
            console.log(item)
        }
    }

    //privateEndpointConnections.delete
    public async privateEndpointConnections_delete(){
        const privateEndpointConnections = (await this.storageAccounts_getProperties()).privateEndpointConnections[0].name;
        await this.client.privateEndpointConnections.delete(this.resourceGroup,this.storageAccountName,privateEndpointConnections).then(
            res => {
                console.log(res);
            }
        )
    }

    //managementPolicies.delete
    public async managementPolicies_delete(){
        
        await this.client.managementPolicies.delete(this.resourceGroup,this.storageAccountName,"default").then(
            res => {
                console.log(res);
            }
        )
    }

    //storageAccounts.delete
    public async storageAccounts_delete(){
        
        await this.client.storageAccounts.delete(this.resourceGroup,this.storageAccountName).then(
            res => {
                console.log(res);
            }
        )
    }
}

