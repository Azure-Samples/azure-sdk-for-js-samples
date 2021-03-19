import { StorageManagementClient,StorageAccountCreateParameters,FileServiceProperties,BlobServiceProperties,
    EncryptionScope,ManagementPolicy,PrivateEndpointConnection } from "@azure/arm-storage";
import { NetworkManagementClient,PrivateEndpoint } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();
const location = "westeurope";

class StorageTest{
    private network_client = new NetworkManagementClient(credential,subscriptionId);
    private storage_client = new StorageManagementClient(credential,subscriptionId);
    private resourceName = "qiaozhatest";
    private storage_account_name = "storageaccountxxyyzzccc";
    private dest_storage_account_name = "storageaccountDestxy";
    private object_replication_policy_name = "default";
    private file_service_name = "fileservicezsg";
    private share_name = "filesharenamezsg";
    private blob_service_name = "blobservicezsg";
    private container_name = "containernamezsg";
    private encryption_scope_name = "encryptionscopezsg";
    private immutability_policy_name = "immutabilitypolicynamezsg";
    private vnet_name = "virualnetworkzsg";
    private sub_net = "subnetzsg";
    private load_balance = "loaderbalancer";
    private bapool = "bapoolzsg";
    private fipconfig = "fipconfigzsg";
    private probes = "probezsg";
    private private_endponint_connection_name = "privateEndpointConnection";
    private private_enpoint = "endpointzsg"


    //create_endpoint
    public async create_endpoint(resourceGroup_name:any,location:any,vnet_name:any,sub_net:any,endpoint_name:any,resource_id:any){
        const async_vnet_creation =await this.network_client.virtualNetworks.createOrUpdate(resourceGroup_name,vnet_name,{
            location: location,
            addressSpace: {
                addressPrefixes: ['10.0.0.0/16']
            }
        })
        
        //create subnet
        const async_subnet_creation = await this.network_client.subnets.createOrUpdate(resourceGroup_name,vnet_name,sub_net,{
            addressPrefix: "10.0.0.0/24",
            privateLinkServiceNetworkPolicies: "disabled",
            privateEndpointNetworkPolicies: "disabled"
        })

        //create private endpoint
        const parameter:PrivateEndpoint = {
            location: location,
            privateLinkServiceConnections: [
                {
                    name: "myconnection",
                    privateLinkServiceId: "/subscriptions/" + subscriptionId + "/resourceGroups/" + resourceGroup_name + "/providers/Microsoft.Storage/storageAccounts/" + this.storage_account_name + "",
                    groupIds: ["blob"]
                }
            ],
            subnet: {
                id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + resourceGroup_name + "/providers/Microsoft.Network/virtualNetworks/" + vnet_name + "/subnets/" + sub_net
            }
        };
        await this.network_client.privateEndpoints.createOrUpdate(resourceGroup_name,endpoint_name,parameter).then(
            response => {
                console.log(response)
            }
        )
        return "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/" + resourceGroup_name + "/providers/Microsoft.Network/privateEndpoints/" + endpoint_name
    }

    //storageAccounts.create
    public async test_storageAccounts_create(){
        const parameter:StorageAccountCreateParameters = {
            sku: {
                name: "Standard_GRS"
            },
            kind: "StorageV2",  // Storage v2 support policy
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
                    },
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

    //create destination storage account
    // public async test_dest_storageAccounts.create(){
    //     const parameter:StorageAccountCreateParameters = {
    //         sku: {
    //             name: "Standard_GRS"
    //         },
    //         kind: "StorageV2",  // Storage v2 support policy
    //         location: "westeurope",
    //         encryption: {
    //             services: {
    //                 file: {
    //                     keyType: "Account",
    //                     enabled: true
    //                 },
    //                 blob: {
    //                     keyType: "Account",
    //                     enabled: true
    //                 },
    //             },
    //             keySource: "Microsoft.Storage"
    //         },
    //         tags: {
    //             key1: "value1",
    //             key2: "value2"
    //         }
    //     };
    //     await this.storage_client.storageAccounts.create(this.resourceName,this.dest_storage_account_name,parameter).then(
    //         response => {
    //             console.log(response)
    //         }
    //     )
    // }

    //create object deature is unavailable
    // public async test_objectReplicationPolicies_createOrUpdate(){
    //     const parameter:ObjectReplicationPolicy = {
    //         sourceAccount: this.storage_account_name,
    //         destinationAccount: this.dest_storage_account_name,
    //         rules: []
    //     };
    //     await this.storage_client.objectReplicationPolicies.createOrUpdate(this.resourceName,this.storage_account_name,this.object_replication_policy_name,parameter).then(
    //         response => {
    //             console.log(response)
    //         }
    //     )
    // }

    //fileServices.setServiceProperties
    public async test_fileServices_setServiceProperties(){
        await this.create_endpoint(this.resourceName,location,this.vnet_name,this.sub_net,this.private_enpoint,"/subscriptions/"+subscriptionId+"/resourceGroups/"+this.resourceName+"/providers/Microsoft.Storage/storageAccounts/"+this.storage_account_name+"").then(
            response => {
                console.log(response)
            }
        )
        const parameter:FileServiceProperties = {
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
                        allowedOrigins:[
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
                        allowedOrigins:[
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
                    },
                ]
            }
        }; 
        await this.storage_client.fileServices.setServiceProperties(this.resourceName,this.storage_account_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    //blobServices.setServiceProperties
    public async test_blobServices_setServiceProperties(){
        const parameter:BlobServiceProperties = {
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
                            "GET",
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
                            "x -ms-meta-target*"
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
            }
        };
        await this.storage_client.blobServices.setServiceProperties(this.resourceName,this.storage_account_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    //encryptionScopes.put
    public async test_encryptionScopes_put(){
        const parameter:EncryptionScope = {
            source: "Microsoft.Storage",
            state: "Enabled"
        };
        await this.storage_client.encryptionScopes.put(this.resourceName,this.storage_account_name,this.encryption_scope_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    //managementPolicies.createOrUpdate
    public async test_managementPolicies_createOrUpdate(){
        const parameter:ManagementPolicy = {
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
        await this.storage_client.managementPolicies.createOrUpdate(this.resourceName,this.storage_account_name,"default",parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    //fileShares.create
    // public async test_fileShares_create(){
    //     await this.storage_client.fileShares.create(this.resourceName,this.storage_account_name,this.share_name,{}).then(
    //         response => {
    //             console.log(response)
    //         }
    //     )
    // }

    //privateEndpointConnections.put
    public async test_privateEndpointConnections_put(){
        const private_endponint_connection_name = await this.storage_client.storageAccounts.getProperties(this.resourceName,this.storage_account_name)[0]["name"];
        const parameter:PrivateEndpointConnection = {
            privateLinkServiceConnectionState: {
                status: "Rejected",  // it has been approved, so test `Rejected`
                description: "Auto-Approved"
            }
        };
        await this.storage_client.privateEndpointConnections.put(this.resourceName,this.storage_account_name,private_endponint_connection_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    //blobContainers.create
    public async test_blobContainers_create(){
        await this.storage_client.blobContainers.create(this.resourceName,this.storage_account_name,this.container_name,{}).then(
            response => {
                console.log(response)
            }
        )
    }

    //
    public async test_(){
        
    }
}


const s = new StorageTest();
// s.create_endpoint()