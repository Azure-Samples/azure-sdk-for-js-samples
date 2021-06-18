import { ComputeManagementClient,AvailabilitySet,AvailabilitySetUpdate } from "@azure/arm-compute";
import {DefaultAzureCredential} from "@azure/identity";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();


/**
 * Class Test_AvailabilitySets.
 */
class Test_AvailabilitySets{ 
    private client = new ComputeManagementClient(credential, subscriptionId);
    private resourceName = "qiaozhatest";
    private availabilitySetName = "availabilitySetss";
    private location = "eastus";

    //createOrUpdate
    public async test_createOrUpate(){
        const body: AvailabilitySet = {
            platformFaultDomainCount: 2,
            platformUpdateDomainCount: 20,
            location: this.location
            };
        await this.client.availabilitySets.createOrUpdate(this.resourceName,this.availabilitySetName,body).then(
            (response: any) => {
                console.log(response)
            }
        );
    }

    //update
    public async test_update(){
        const body: AvailabilitySetUpdate = {
            platformFaultDomainCount: 2,
            platformUpdateDomainCount: 20 
        }
        await this.client.availabilitySets.update(this.resourceName,this.availabilitySetName,body).then(
            (response: any) => {
                console.log(response)
            }
        );
        /*
        (node:10124) UnhandledPromiseRejectionWarning: RestError: {
        "error": {
        "code": "PropertyChangeNotAllowed",
        "message": "Changing property 'platformFaultDomainCount' is not allowed.",
        "target": "platformFaultDomainCount"
           }
        }
        */ 
    }

    //delete
    public async test_delete(){
        await this.client.availabilitySets.delete(this.resourceName,this.availabilitySetName).then(
            (response: any) => {
                console.log(response)
            }
        );
    }

    //get
    public async test_get(){
        await this.client.availabilitySets.get(this.resourceName,this.availabilitySetName).then(
            (response: any) => {
                console.log(response)
            }
        );
    }

    //list
    // public async test_list(){
    //     await this.client.availabilitySets.list(this.resourceName).then(
    //         response => {
    //             console.log(response)
    //         }
    //     )
    // }

    // //listAvailableSizes
    // public async test_listAvailableSizes(){
    //     await this.client.availabilitySets.listAvailableSizes(this.resourceName,this.availabilitySetName).then(
    //         response => {
    //             console.log(response)
    //         }
    //     )
    // }

    // //listBySubscription
    // public async test_listBySubscription(){
    //     await this.client.availabilitySets.listBySubscription().then(
    //         response => {
    //             console.log(response)
    //         }
    //     )
    // }
}
        
const t = new Test_AvailabilitySets();
console.log(t.test_createOrUpate());
