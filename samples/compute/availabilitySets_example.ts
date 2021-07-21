import * as compute from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();

/**
 * Class Test_AvailabilitySets.
 */
 class AvailabilitySetsExamples{ 
     
    private client = new compute.ComputeManagementClient(credential, subscriptionId);
    private resourceGroupName = "myjstest";
    private availabilitySetName = "availabilitySetss";
    private location = "eastus";

    //createOrUpdate (ok)
    public async test_createOrUpate(){
        const body: compute.AvailabilitySet = {
            platformFaultDomainCount: 2,
            platformUpdateDomainCount: 20,
            location: this.location
        };
        await this.client.availabilitySets.createOrUpdate(this.resourceGroupName,this.availabilitySetName,body).then(
            (response: any) => {
                console.log(response)
            }
        );
    }

    //update (ok)
    public async test_update(){
        const body: compute.AvailabilitySetUpdate = {
            platformFaultDomainCount: 2,
            platformUpdateDomainCount: 20 
        }
        await this.client.availabilitySets.update(this.resourceGroupName,this.availabilitySetName,body).then(
            (response: any) => {
                console.log(response)
            }
        );
    }

    //get (ok)
    public async test_get(){
        await this.client.availabilitySets.get(this.resourceGroupName,this.availabilitySetName).then(
            (response: any) => {
                console.log(response)
            }
        );
    }

    //list (ok)
    public async test_list(){
        for await (let item of this.client.availabilitySets.list(this.resourceGroupName)){
            console.log(item);
        }
    }

    // //listAvailableSizes (ok)
    public async test_listAvailableSizes(){
        for await (let item of this.client.availabilitySets.listAvailableSizes(this.resourceGroupName,this.availabilitySetName)){
            console.log(item);
        }
    }

    // //listBySubscription (ok)
    public async test_listBySubscription(){
        for await (let item of this.client.availabilitySets.listBySubscription()){
            console.log(item);
        }
    }
 }

