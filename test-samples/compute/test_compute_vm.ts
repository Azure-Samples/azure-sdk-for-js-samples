import * as compute from "azure-arm-compute";
import * as network from "azure-arm-network";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();

/*
#   virtual_machines
#   virtual_machine_siz
#   virtual_machine_run_commands
#   virtual_machine_images
#   virtual_machine_extensions
#   virtual_machine_extension_images
*/
class Test_virtualMachines{

    private compute_client = new compute.ComputeManagementClient(credential, subscriptionId);
    private network_client = new network.NetworkManagementClient(credential,subscriptionId);
    private resourceGroupName = "qiaozhatest";
    private virtual_machine_name = "virtualmachinex";
    private subnet_name = "subnetnamex";
    private interface_name = "interfacex";
    private network_name = "networknamex";
    private virtual_machine_extension_name = "virtualmachineextensionx";
    private location = "eastus";

    //network_client.virtualNetworks.createOrUpdate
    public async createVirtualNetwork(){
        const parameter:network.VirtualNetwork = {
            location:this.location,
            addressSpace: {
                addressPrefixes: ['10.0.0.0/16']
            }
        };
        const virtualNetworks_create_info = await this.network_client.virtualNetworks.beginCreateOrUpdateAndWait(this.resourceGroupName,this.network_name,parameter);
        console.log(virtualNetworks_create_info);

       const subnet_parameter: network.Subnet={
            addressPrefix: "10.0.0.0/24"
       };
       const subnet__create_info = await this.network_client.subnets.beginCreateOrUpdateAndWait(this.resourceGroupName,this.network_name,this.subnet_name,subnet_parameter);
       console.log(subnet__create_info)
       return subnet__create_info;
    }
}

const t = new Test_virtualMachines();
t.createVirtualNetwork();