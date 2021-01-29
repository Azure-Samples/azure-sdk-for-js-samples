import { ComputeManagementClient,Disk,Snapshot,Gallery,GalleryApplication,GalleryApplicationVersion } from "@azure/arm-compute";
import { ResourceManagementClient } from "@azure/arm-resources";
import { NetworkManagementClient } from "@azure/arm-network";
import {DefaultAzureCredential} from "@azure/identity";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();
const location = "eastus";

/*
 covered ops:
   galleries: 
   gallery_applications: 
   gallery_application_versions: 
   gallery_images: 
   gallery_image_versions: 
*/

class Test_galleries{
    private compute_client = new ComputeManagementClient(credential, subscriptionId);
    private resource_client = new ResourceManagementClient(credential, subscriptionId);
    private newwork_client = new NetworkManagementClient(credential,subscriptionId);
    private resourceGroup = "qiaozhatest";
    private disk_name = "diskname";
    private snapshot_name = "snapshotname";
    private gallery_name = "galleryname";
    private image_name = "imagex";
    private application_name = "applicationname";
    private version_name = "1.0.0";

    public async create_snashot(){
        const parameter:Disk = {
            location: location,
            creationData: {
                createOption: "Empty"
            },
            diskSizeGB: 200
        };
        const disk = await this.compute_client.disks.createOrUpdate(this.resourceGroup,this.disk_name,parameter);
        // console.log(disk)
        //create snapshot
        const snapshotParameter:Snapshot= {
            location:location,
            creationData: {
                createOption: "Copy",
                sourceUri: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceGroup + "/providers/Microsoft.Compute/disks/" + this.disk_name
            }
        };
        await this.compute_client.snapshots.createOrUpdate(this.resourceGroup,this.snapshot_name,snapshotParameter).then(
            response =>{
                console.log(response)
            }
        )
    }

    //snapshots.delete
    public async delete_snapshot(){
        await this.compute_client.snapshots.revokeAccess(this.resourceGroup,this.snapshot_name).then(
            response => {
                console.log(response)
            }
        )
        //delete snapshot
        await this.compute_client.snapshots.delete(this.resourceGroup,this.snapshot_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //galleries.createOrUpdate
    public async test_galleries_createOrUpdate(){
        const parameter:Gallery = {
            location: "eastus",
            description: "This is the gallery description."
        };
        await this.compute_client.galleries.createOrUpdate(this.resourceGroup,this.gallery_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    //galleryApplications.createOrUpdate
    public async test_galleryApplications_createOrUpdate(){
        const parameter:GalleryApplication = {
            location: 'eastus',
            description: "This is the gallery application description.",
            eula: "This is the gallery application EULA.",
            supportedOSType: "Windows"
        };
        await this.compute_client.galleryApplications.createOrUpdate(this.resourceGroup,this.gallery_name,this.application_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    public async test_(){
        const parameter:GalleryApplicationVersion = {
            location: "eastus",

        };
        await this.compute_client.galleryApplicationVersions.createOrUpdate(this.resourceGroup,this.gallery_name,this.application_name,this.version_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

}

const t = new Test_galleries();
t.create_snashot()