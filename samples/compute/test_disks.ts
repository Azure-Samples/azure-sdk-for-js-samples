import { ComputeManagementClient,Disk,DiskUpdate,GrantAccessData,DiskEncryptionSet,DiskEncryptionSetUpdate,
        Snapshot,Image,ImageUpdate,SnapshotUpdate } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import { ResourceManagementClient } from "@azure/arm-resources";
import { KeyVaultManagementClient,VaultCreateOrUpdateParameters } from "@azure/arm-keyvault";
import { KeyClient } from "@azure/keyvault-keys";

/*
cover options:
    snapshots: 
    disks: 
    disk_encryption_sets: 
    images: 
*/
var subscriptionId = process.env.subscriptionId;
var credential = new DefaultAzureCredential();
var keyvault_client = new KeyVaultManagementClient(credential,subscriptionId);

class Test_disks{
    private compute_client = new ComputeManagementClient(credential, subscriptionId);
    private resource_client = new ResourceManagementClient(credential, subscriptionId);
    private resourceName = "wwwww";
    private disk_name = "disknamex"
    

    //resource_groups_createOrUpdate
    public resource_groups_createOrUpdate(){
        this.resource_client.resourceGroups.createOrUpdate(this.resourceName,{location:"eastus"})
    }

    //disks.createOrUpdate
    public async test_disks_createOrUpdate(){
        const parameter:Disk ={
            location: "eastus",
            creationData: {
                createOption: "Empty"
            },
            diskSizeGB: 200
        };
        await this.compute_client.disks.createOrUpdate(this.resourceName,this.disk_name,parameter).then(
            response => {
                console.log(response)
            } 
        )
    }

    //disks.get
    public async test_disks_get(){
        await this.compute_client.disks.get(this.resourceName,this.disk_name).then(
            response => {
                console.log(response)
            } 
        )
    }

    //disks.listByResourceGroup
    public async test_disks_listByResourceGroup(){
        await this.compute_client.disks.listByResourceGroup(this.resourceName).then(
            response => {
                console.log(response)
            } 
        )
    }

    //disks.list
    public async test_disks_list(){
        await this.compute_client.disks.list().then(
            response => {
                console.log(response)
            } 
        )
    }

    //disks.update
    public async test_disks_update(){
        const parameter:DiskUpdate= {
            diskSizeGB: 200
        };
        await this.compute_client.disks.update(this.resourceName,this.disk_name,parameter).then(
            response => {
                console.log(response)
            } 
        )
    }

    //disks.grantAccess
    public async test_disks_grantAccess(){
        const parameter:GrantAccessData ={
            access: "Read",
            durationInSeconds: 1800
        };
        await this.compute_client.disks.grantAccess(this.resourceName,this.disk_name,parameter).then(
            response => {
                console.log(response)
            } 
        )
    }

    //disks.revokeAccess
    public async test_disks_revokeAccess(){
        await this.compute_client.disks.revokeAccess(this.resourceName,this.disk_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //disks.delete
    public async test_disks_delete(){
        await this.compute_client.disks.delete(this.resourceName,this.disk_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //resource_groups_delete
    private resource_groups_delete(){
        this.resource_client.resourceGroups.delete(this.resourceName)
    }
}

class Test_disks_encryption{
    private compute_client = new ComputeManagementClient(credential, subscriptionId);
    private resource_client = new ResourceManagementClient(credential, subscriptionId);
    private resourceName = "qiaozhatest";
    private keyvault_name = "keyvaultxmm";
    private disk_encryption_name = "diskencryptionset"


    //vaults.createOrUpdate
    public async create_key(){
        const tenant_id = "ffa9512c-9f6d-4a0b-be85-f0a9f0a1e5a8";
        const object_id = "f3c9bd0a-2f29-48ee-8277-a430cad3eca5";
        const parameter:VaultCreateOrUpdateParameters = {
            location: "eastus",
            properties: {
                sku: {
                    family: "A",
                    name: "standard"
                },
                tenantId: tenant_id,
                accessPolicies: [
                    {
                        tenantId: tenant_id,
                        objectId: object_id,
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
                enabledForDiskEncryption: true
            } 
        };
        await keyvault_client.vaults.createOrUpdate(this.resourceName,this.keyvault_name,parameter).then(
            response => {
                console.log(response)
            }
        );
        // console.log(vault_res);
        // const vault_url = vault_res.properties.vault_url;
        // const vault_id = vault_res.id;
        // const key_client = new KeyClient(vault_url,credential);
        // const expiresTime = new Date("2050-02-02")
        // const key = await key_client.createKey("testkey","RSA",{keySize:2048,expiresOn:expiresTime})
        // return [vault_id,key.id]
    }

    //diskEncryptionSets.createOrUpdate
    public async test_createOrUpdate(){
        // const vault = await this.create_key();
        // const vault_id = vault[0];
        // const vault_url = vault[1];
        const parameter:DiskEncryptionSet = {
            location: "eastus",
            identity: {
                type: "SystemAssigned"
            },
            activeKey: {
                sourceVault: {
                    id: "/subscriptions/"+ subscriptionId +"/resourceGroups/"+this.resourceName+"/providers/Microsoft.KeyVault/vaults/" + this.keyvault_name + ""
                },
                keyUrl: "https://myvmvault.vault-int.azure-int.net/keys/{key}/{key_version}" // not have vault_url
            }
        };
        await this.compute_client.diskEncryptionSets.createOrUpdate(this.resourceName,this.disk_encryption_name,parameter)
    }

    //diskEncryptionSets.get
    public async test_get(){
        await this.compute_client.diskEncryptionSets.get(this.resourceName,this.disk_encryption_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //diskEncryptionSets.listByResourceGroup
    public async test_listByResourceGroup(){
        await this.compute_client.diskEncryptionSets.listByResourceGroup(this.resourceName).then(
            response => {
                console.log(response)
            }
        )
    }

    //diskEncryptionSets.list
    public async test_list(){
        await this.compute_client.diskEncryptionSets.list().then(
            response => {
                console.log(response)
            }
        )
    }

    //diskEncryptionSets.update
    public async test_update(){
        const parameter:DiskEncryptionSetUpdate = {
            activeKey: {
                sourceVault: {
                    id: "/subscriptions/"+ subscriptionId +"/resourceGroups/"+this.resourceName+"/providers/Microsoft.KeyVault/vaults/" + this.keyvault_name + ""
                },
                keyUrl: "https://myvmvault.vault-int.azure-int.net/keys/{key}/{key_version}" // not have vault_url
            },
            tags: {
            ["department"]: "Development",
            ["project"]: "Encryption"
            }
        };
        await this.compute_client.diskEncryptionSets.update(this.resourceName,this.disk_encryption_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    //diskEncryptionSets.delete
    public async test_delete(){
        await this.compute_client.diskEncryptionSets.delete(this.resourceName,this.disk_encryption_name).then(
            response =>{
                console.log(response)
            }
        )
    }

}

class Test_snapshots{
    private compute_client = new ComputeManagementClient(credential, subscriptionId);
    private disk_name = "disknamex";
    private resourceName = "qiaozhatest";
    private shapshot_name = "snapshotx";
    private image_name = "imagex";

    //disks.createOrUpdate
    public async disks_createOrUpdate(){
        const parameter:Disk = {
            location: "eastus",
            creationData: {
                createOption: "Empty"
            },
            diskSizeGB: 200
        };
        await this.compute_client.disks.createOrUpdate(this.resourceName,this.disk_name,parameter).then(
            response => [
                console.log(response)
            ]
        )
    }

    //snapshots.createOrUpdate
    public async test_snapshots_createOrUpdate(){
        const parameter:Snapshot = {
            location: "eastus",
            creationData: {
                createOption: "Copy",
                sourceUri: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceName + "/providers/Microsoft.Compute/disks/" + this.disk_name
            }
        };
        await this.compute_client.snapshots.createOrUpdate(this.resourceName,this.shapshot_name,parameter).then(
            response =>{
                console.log(response)
            }
        )
    }

    //images.createOrUpdate
    public async test_images_createOrUpdate(){
        const parameter:Image = {
            location: "eastus",
            storageProfile: {
                osDisk: {
                    osType: "Linux",
                    snapshot: {
                        id: "subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceName + "/providers/Microsoft.Compute/snapshots/" + this.shapshot_name
                    },
                    osState: "Generalized",
                },
                zoneResilient: false
            },
            hyperVGeneration: "V1"
        };
        await this.compute_client.images.createOrUpdate(this.resourceName,this.image_name,parameter).then(
            response =>{
                console.log(response)
            }
        )
    }

    //snapshots.get
    public async test_snapshots_get(){
        await this.compute_client.snapshots.get(this.resourceName,this.shapshot_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //images.get
    public async test_images_get(){
        await this.compute_client.images.get(this.resourceName,this.image_name).then(
            response => {
                console.log(response)
            }
        ) 
    }

    //images.listByResourceGroup
    public async test_images_listByResourceGroup(){
        await this.compute_client.images.listByResourceGroup(this.resourceName).then(
            response => {
                console.log(response)
            }
        ) 
    }

    //snapshots.listByResourceGroup
    public async test_snapshots_listByResourceGroup(){
        await this.compute_client.snapshots.listByResourceGroup(this.resourceName).then(
            response => {
                console.log(response)
            }
        ) 
    }

    //snapshots.list
    public async test_snapshots_list(){
        await this.compute_client.snapshots.list().then(
            response => {
                console.log(response)
            }
        ) 
    }

    //images.list
    public async test_images_list(){
        await this.compute_client.images.list().then(
            response => {
                console.log(response)
            }
        ) 
    }

    //images.update
    public async test_images_update(){
        const parameter:ImageUpdate = {
            tags: {
                ["department"]: "HR"
            }
        };
        await this.compute_client.images.update(this.resourceName,this.image_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    //snapshots.update
    public async test_snapshots_update(){
        const parameter:SnapshotUpdate = {
            tags: {
                ["department"]: "HR"
            }
        };
        await this.compute_client.snapshots.update(this.resourceName,this.shapshot_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    //snapshots.grantAccess
    public async test_snapshots_grantAccess(){
        const parameter:GrantAccessData = {
            access: "Read",
            durationInSeconds: 1800
        };
        await this.compute_client.snapshots.grantAccess(this.resourceName,this.shapshot_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    //snapshots.revokeAccess
    public async test_snapshots_revokeAccess(){
        await this.compute_client.snapshots.revokeAccess(this.resourceName,this.shapshot_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //images.delete
    public async test_images_delete(){
        await this.compute_client.images.delete(this.resourceName,this.image_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //snapshots.delete
    public async test_snapshots_delete(){
        await this.compute_client.snapshots.delete(this.resourceName,this.shapshot_name).then(
            response => {
                console.log(response)
            }
        )
    }
}
const t = new Test_disks();
t.resource_groups_createOrUpdate()