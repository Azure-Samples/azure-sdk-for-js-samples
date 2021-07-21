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

    //availabilitySets.createOrUpdate
    public async availabilitySets_createOrUpdate(){
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

    //availabilitySets.update
    public async availabilitySets_update(){
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

    //availabilitySets.get
    public async availabilitySets_get(){
        await this.client.availabilitySets.get(this.resourceGroupName,this.availabilitySetName).then(
            (response: any) => {
                console.log(response)
            }
        );
    }

    //availabilitySets.list
    public async availabilitySets_list(){
        for await (let item of this.client.availabilitySets.list(this.resourceGroupName)){
            console.log(item);
        }
    }

    // availabilitySets.listAvailableSizes
    public async availabilitySets_listAvailableSizes(){
        for await (let item of this.client.availabilitySets.listAvailableSizes(this.resourceGroupName,this.availabilitySetName)){
            console.log(item);
        }
    }

    // availabilitySets.listBySubscription
    public async availabilitySets_listBySubscription(){
        for await (let item of this.client.availabilitySets.listBySubscription()){
            console.log(item);
        }
    }
 }

