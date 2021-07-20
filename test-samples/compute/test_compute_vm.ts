import * as compute from "@azure/arm-compute";
import * as network from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();

class Test_virtualMachines{

    private compute_client = new compute.ComputeManagementClient(credential, subscriptionId);
    private network_client = new network.NetworkManagementClient(credential,subscriptionId);
    private resourceGroupName = "myjstest";
    private virtual_machine_name = "virtualmachinex";
    private subnet_name = "subnetnamex";
    private interface_name = "interfacex";
    private network_name = "networknamex";
    private virtual_machine_extension_name = "virtualmachineextensionx";
    private location = "eastus";

    //network_client.virtualNetworks.createOrUpdate
    private async createVirtualNetwork(){
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
    //    return subnet__create_info;
    }

    //network_client.networkInterfaces.createOrUpdate
    private async createNetworkInterface(group_name: any,location: any,nic_name: any){
        const parameter:network.NetworkInterface= {
            location: location,
            ipConfigurations: [
                {
                    name: "MyIpConfig",
                    subnet: {
                        id: "/subscriptions/"+ subscriptionId +"/resourceGroups/" + this.resourceGroupName + "/providers/Microsoft.Network/virtualNetworks/" + this.network_name + "/subnets/" + this.subnet_name
                    
                    }
                }
            ]
        };
        const nic_info = await this.network_client.networkInterfaces.beginCreateOrUpdateAndWait(group_name,nic_name,parameter);
        console.log(nic_info);
        // return nic_info;
    }

    //virtualMachines.createOrUpdate
    public async virtualMachines_createOrUpdate(){
        await this.createVirtualNetwork();
        await this.createNetworkInterface(this.resourceGroupName,this.location,this.interface_name);
        const parameter:compute.VirtualMachine = {
            location: this.location,
            hardwareProfile: {
                vmSize: "Standard_D2_v2",
            },
            storageProfile: {
                imageReference: {
                    sku: "2016-Datacenter",
                    publisher: "MicrosoftWindowsServer",
                    version: "latest",
                    offer: "WindowsServer"
                },
                osDisk: {
                   caching: "ReadWrite",
                   managedDisk: {
                       storageAccountType: "Standard_LRS" 
                   },
                   name: "myVMosdisk",
                   createOption: "FromImage" 
                },
                dataDisks: [
                    {
                        diskSizeGB: 1023,
                        createOption: "Empty",
                        lun: 0
                    },
                    {
                        diskSizeGB: 1023,
                        createOption: "Empty",
                        lun: 1   
                    }
                ]
            },
            osProfile: {
                adminUsername: "testuser",
                computerName: "myVM",
                adminPassword: "Aa1!zyx_",
                windowsConfiguration: {
                    enableAutomaticUpdates: true // need automatic update for reimage
                }
            },
            networkProfile: {
                networkInterfaces: [
                    {
                        id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceGroupName + "/providers/Microsoft.Network/networkInterfaces/" + this.interface_name + "",
                        primary: true
                    }
                ]
            }
        };
        await this.compute_client.virtualMachines.beginCreateOrUpdateAndWait(this.resourceGroupName,this.virtual_machine_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachines.instanceView
    public async virtualMachines_instanceView(){
        await this.compute_client.virtualMachines.instanceView(this.resourceGroupName,this.virtual_machine_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachines.listAvailableSizes
    public async virtualMachines_listAvailableSizes(){
        for await (let item of this.compute_client.virtualMachines.listAvailableSizes(this.resourceGroupName,this.virtual_machine_name)){
            console.log(item);
        }
    }

    //virtualMachines.get
    public async virtualMachines_get(){
        await this.compute_client.virtualMachines.get(this.resourceGroupName,this.virtual_machine_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachines.list
    public async virtualMachines_list(){
        for await (let item of this.compute_client.virtualMachines.list(this.resourceGroupName)){
            console.log(item);
        }
    }

    //virtualMachines.listAll
    public async virtualMachines_listAll(){
        for await (let item of this.compute_client.virtualMachines.listAll()){
            console.log(item);
        }
    }

    //virtualMachines.listByLocation
    public async virtualMachines_listByLocation(){
        for await (let item of this.compute_client.virtualMachines.listByLocation(this.location)){
            console.log(item);
        }
    }

    //virtualMachines.runCommand
    public async virtualMachines_runCommand(){
        const parameter:compute.RunCommandInput = {
            commandId: "RunPowerShellScript"
        };
        await this.compute_client.virtualMachines.beginRunCommandAndWait(this.resourceGroupName,this.virtual_machine_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachines.restart
    public async virtualMachines_restart(){
        await this.compute_client.virtualMachines.beginRestartAndWait(this.resourceGroupName,this.virtual_machine_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachines.powerOff
    public async virtualMachines_powerOff(){
        await this.compute_client.virtualMachines.beginPowerOffAndWait(this.resourceGroupName,this.virtual_machine_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachines.start
    public async virtualMachines_start(){
        await this.compute_client.virtualMachines.beginStartAndWait(this.resourceGroupName,this.virtual_machine_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachines.reapply
    public async virtualMachines_reapply(){
        await this.virtualMachines_powerOff(); //before reapply 
        await this.compute_client.virtualMachines.beginReapplyAndWait(this.resourceGroupName,this.virtual_machine_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachines.redeploy
    public async virtualMachines_redeploy(){
        await this.compute_client.virtualMachines.beginRedeployAndWait(this.resourceGroupName,this.virtual_machine_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachines.update
    public async virtualMachines_update(){
        const parameter:compute.VirtualMachineUpdate = {
            networkProfile: {
                networkInterfaces: [
                    {
                        id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceGroupName + "/providers/Microsoft.Network/networkInterfaces/" + this.interface_name + "",
                        primary: true
                    }
                ]
            }
        };
        await this.compute_client.virtualMachines.beginUpdateAndWait(this.resourceGroupName,this.virtual_machine_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachines.generalize
    public async virtualMachines_generalize(){
        await this.compute_client.virtualMachines.generalize(this.resourceGroupName,this.virtual_machine_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachines.deallocate
    public async virtualMachines_deallocate(){
        await this.compute_client.virtualMachines.beginDeallocateAndWait(this.resourceGroupName,this.virtual_machine_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachines.delete
    public async virtualMachines_delete(){
        await this.compute_client.virtualMachines.beginDeleteAndWait(this.resourceGroupName,this.virtual_machine_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineExtensions.createOrUpdate
    public async MachineExtensions_createOrUpdate(){
        const parameter:compute.VirtualMachineExtension = {
            location: this.location,
            autoUpgradeMinorVersion:true,
            publisher: "Microsoft.Azure.NetworkWatcher",
            typePropertiesType: "NetworkWatcherAgentWindows",
            typeHandlerVersion: "1.4"
        };
        await this.compute_client.virtualMachineExtensions.beginCreateOrUpdateAndWait(this.resourceGroupName,this.virtual_machine_name,this.virtual_machine_extension_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineExtensions.get
    public async MachineExtensions_get(){
        await this.compute_client.virtualMachineExtensions.get(this.resourceGroupName,this.virtual_machine_name,this.virtual_machine_extension_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineExtensions.list
    public async MachineExtensions_list(){
        await this.compute_client.virtualMachineExtensions.list(this.resourceGroupName,this.virtual_machine_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineExtensions.update
    public async MachineExtensions_update(){
        const parameter:compute.VirtualMachineExtensionUpdate = {
            autoUpgradeMinorVersion: true,
            // type:  "CustomScriptExtension",  // "PropertyChangeNotAllowed"
        };
        await this.compute_client.virtualMachineExtensions.beginUpdateAndWait(this.resourceGroupName,this.virtual_machine_name,this.virtual_machine_extension_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineExtensions.delete
    public async MachineExtensions_delete(){
        await this.compute_client.virtualMachineExtensions.beginDeleteAndWait(this.resourceGroupName,this.virtual_machine_name,this.virtual_machine_extension_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineRunCommands.get
    public async MachineRunCommands_get(){
        const commandId = "RunPowerShellScript";
        const location = "southeastasia";
        await this.compute_client.virtualMachineRunCommands.get(location,commandId).then(
            res => {
                console.log(res)
            }
        )
    }

    //virtualMachineRunCommands.list
    public async MachineRunCommands_list(){
        for await (let item of this.compute_client.virtualMachineRunCommands.list(this.location)){
            console.log(item)
        }
    }

    //virtualMachineSizes.list
    public async MachineSizes_list(){
        for await (let item of this.compute_client.virtualMachineSizes.list(this.location)){
            console.log(item)
        }
    }
}

class Test_virtualMachineImages{
    private compute_client = new compute.ComputeManagementClient(credential, subscriptionId);
    private publisher_name = "MicrosoftWindowsServer";
    private offer = "WindowsServer";
    private skus = "2019-Datacenter";
    private version = "2019.0.20190115" ;
    private location = "eastus";

    //virtualMachineImages.get
    public async virtualMachineImages_get(){
        await this.compute_client.virtualMachineImages.get(this.location,this.publisher_name,this.offer,this.skus,this.version).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineImages.list
    public async virtualMachineImages_list(){
        await this.compute_client.virtualMachineImages.list(this.location,this.publisher_name,this.offer,this.skus).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineImages.listOffers
    public async virtualMachineImages_listOffers(){
        await this.compute_client.virtualMachineImages.listOffers(this.location,this.publisher_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineImages.listPublishers
    public async virtualMachineImages_listPublishers(){
        await this.compute_client.virtualMachineImages.listPublishers(this.location).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineImages.listSkus
    public async virtualMachineImages_listSkus(){
        await this.compute_client.virtualMachineImages.listSkus(this.location,this.publisher_name,this.offer).then(
            response => {
                console.log(response)
            }
        )
    }
}

class Test_virtualMachineExtensionImages{
    private compute_client = new compute.ComputeManagementClient(credential, subscriptionId);
    private extension_publisher_name = "Microsoft.Compute";
    private extension_image_type = "VMAccessAgent";
    private extension_image_version = "1.0.2";
    private location = "eastus";

    //virtualMachineExtensionImages.get
    public async virtualMachineExtensionImages_get(){
        await this.compute_client.virtualMachineExtensionImages.get(this.location,this.extension_publisher_name,this.extension_image_version,this.extension_image_type).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineExtensionImages.listTypes
    public async virtualMachineExtensionImages_listTypes(){
        await this.compute_client.virtualMachineExtensionImages.listTypes(this.location,this.extension_publisher_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineExtensionImages.listVersions
    public async virtualMachineExtensionImages_listVersions(){
        await this.compute_client.virtualMachineExtensionImages.listVersions(this.location,this.extension_publisher_name,this.extension_image_type).then(
            response => {
                console.log(response)
            }
        )
    }
}
