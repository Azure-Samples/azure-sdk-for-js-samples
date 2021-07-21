import * as links from "@azure/arm-links";
import * as resources from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";

var subscriptionId = process.env.subscriptionId;
var credential = new DefaultAzureCredential();

class LinksExamples {

    private links_client = new links.ManagementLinkClient(credential,subscriptionId);
    private resources_client = new resources.ResourceManagementClient(credential,subscriptionId);
    private resourceGroup = "myjstestzzz";
    private resourceName = "myresourcezzz";
    private linksName = "myLink";

    //resources.beginCreateOrUpdateAndWait
    public async create_resourceId(){
        const result =  await this.resources_client.resources.beginCreateOrUpdateAndWait(this.resourceGroup,"Microsoft.Compute","","availabilitySets",this.resourceName,"2019-07-01",{location: "eastus"});
        console.log(result);
        return result.id;
    }

    public async create_resourceId2(){
        const result =  await this.resources_client.resources.beginCreateOrUpdateAndWait(this.resourceGroup,"Microsoft.Compute","","availabilitySets",this.resourceName+"2","2019-07-01",{location: "eastus"});
        console.log(result);
        return result.id;
    }

    //resourceLinks.createOrUpdate
    public async resourceLinks_createOrUpdate(){
        const linkId = await this.create_resourceId();
        const linkId2 = await this.create_resourceId2();
        const result = await this.links_client.resourceLinks.createOrUpdate(
            linkId+"/providers/Microsoft.Resources/links/"+this.linksName,
            {
               properties: {
                   targetId: linkId2,
                   notes: "Testing links"
               } 
            }
        );
        console.log(result);
    }

    //resourceLinks.get
    public async resourceLinks_get(){
        const linkId = "/subscriptions/"+subscriptionId+"/resourceGroups/myjstestzzz/providers/Microsoft.Compute/availabilitySets/myresourcezzz/providers/Microsoft.Resources/links/myLink";
        const result = await this.links_client.resourceLinks.get(linkId);
        console.log(result);
    }

    //resourceLinks.listAtSubscription
    public async resourceLinks_listAtSubscription(){
        for await (let item of this.links_client.resourceLinks.listAtSubscription()){
            console.log(item);
        }
    }

    //resourceLinks.listAtSourceScope
    public async resourceLinks_listAtSourceScope(){
        const resourceId = "/subscriptions/"+subscriptionId+"/resourceGroups/myjstestzzz/providers/Microsoft.Compute/availabilitySets/myresourcezzz";
        for await (let item of this.links_client.resourceLinks.listAtSourceScope(resourceId)){
            console.log(item);
        }
    }

    //resourceLinks.delete
    public async resourceLinks_delete(){
        const linkId = "/subscriptions/"+subscriptionId+"/resourceGroups/myjstestzzz/providers/Microsoft.Compute/availabilitySets/myresourcezzz/providers/Microsoft.Resources/links/myLink";
        const result = await this.links_client.resourceLinks.delete(linkId);
        console.log(result);
    }

    //resources.beginDeleteAndWait
    public async resources_beginDeleteAndWait(){
        //delete reource
        await this.resources_client.resources.beginDeleteAndWait(this.resourceGroup,"Microsoft.Compute","","availabilitySets",this.resourceName,"2019-07-01").then(
            res => {
                console.log(res);
            }
        )

        //delete reources2
        await this.resources_client.resources.beginDeleteAndWait(this.resourceGroup,"Microsoft.Compute","","availabilitySets",this.resourceName+"2","2019-07-01").then(
            res => {
                console.log(res);
            }
        )
    }
}

