import { ComputeManagementClient,VirtualMachine,VirtualMachineExtension,RunCommandInput,VirtualMachineExtensionUpdate,
        VirtualMachineUpdate,Disk } from "@azure/arm-compute";
import {DefaultAzureCredential} from "@azure/identity";
import { NetworkManagementClient,VirtualNetwork,Subnet,NetworkInterface } from "@azure/arm-network";

/*
cover options:
    
*/
var subscriptionId = process.env.subscriptionId;
var credential = new DefaultAzureCredential();

/*
#   virtual_machines: 
#   virtual_machine_size: 
#   virtual_machine_run_commands: 
#   virtual_machine_images: 
#   virtual_machine_extensions: 
#   virtual_machine_extension_images: 
*/
class Test_virtualMachines{
    private compute_client = new ComputeManagementClient(credential, subscriptionId);
    private network_client = new NetworkManagementClient(credential,subscriptionId);
    private resourceName = "qiaozhatest";
    private virtual_machine_name = "virtualmachinex";
    private subnet_name = "subnetnamex";
    private interface_name = "interfacex";
    private network_name = "networknamex";
    private virtual_machine_extension_name = "virtualmachineextensionx";
    private location = "eastus";

    //network_client.virtualNetworks.createOrUpdate
    public async createVirtualNetwork(){
        const parameter:VirtualNetwork = {
            location:this.location,
            addressSpace: {
                addressPrefixes: ['10.0.0.0/16']
            }
        };
       const azure_operation_poller = await this.network_client.virtualNetworks.createOrUpdate(this.resourceName,this.network_name,parameter)

       const subnet_parameter: Subnet={
            addressPrefix: "10.0.0.0/24"
       };
       const subnet_info = await this.network_client.subnets.createOrUpdate(this.resourceName,this.network_name,this.subnet_name,subnet_parameter);
       return subnet_info;
    }

    //network_client.networkInterfaces.createOrUpdate
    private async createNetworkInterface(group_name: any,location: any,nic_name: any){
        const parameter:NetworkInterface= {
            location: location,
            ipConfigurations: [
                {
                    name: "MyIpConfig",
                    subnet: {
                        id: "/subscriptions/"+ subscriptionId +"/resourceGroups/" + this.resourceName + "/providers/Microsoft.Network/virtualNetworks/" + this.network_name + "/subnets/" + this.subnet_name
                    
                    }
                }
            ]
        };
        const nic_info = await this.network_client.networkInterfaces.createOrUpdate(group_name,nic_name,parameter);
        return nic_info;
    }

    //virtualMachines.createOrUpdate
    public async test_createOrUpdate(){
        // await this.createVirtualNetwork(this.resourceName,this.location,this.network_name,this.subnet_name);
        // await this.createNetworkInterface(this.resourceName,this.location,this.interface_name);
        const parameter:VirtualMachine = {
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
                        id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceName + "/providers/Microsoft.Network/networkInterfaces/" + this.interface_name + "",
                        primary: true
                    }
                ]
            }
        };
        await this.compute_client.virtualMachines.createOrUpdate(this.resourceName,this.virtual_machine_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineExtensions.createOrUpdate
    public async test_MachineExtensions_createOrUpdate(){
        const parameter:VirtualMachineExtension = {
            location: this.location,
            autoUpgradeMinorVersion:true,
            publisher: "Microsoft.Azure.NetworkWatcher",
            typePropertiesType: "NetworkWatcherAgentWindows",
            typeHandlerVersion: "1.4"
        };
        await this.compute_client.virtualMachineExtensions.createOrUpdate(this.resourceName,this.virtual_machine_name,this.virtual_machine_extension_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachines.instanceView
    public async test_instanceView(){
        await this.compute_client.virtualMachines.instanceView(this.resourceName,this.virtual_machine_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineExtensions.get
    public async test_MachineExtensions_get(){
        await this.compute_client.virtualMachineExtensions.get(this.resourceName,this.virtual_machine_name,this.virtual_machine_extension_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineRunCommands.get
    public async test_MachineRunCommands_get(){
        const commandId = "RunPowerShellScript";
        const location = "southeastasia";
        await this.compute_client.virtualMachineRunCommands.get(location,commandId).then(
            res => {
                console.log(res)
            }
        )
    }

    //virtualMachines.listAvailableSizes
    public async test_listAvailableSizes(){
        await this.compute_client.virtualMachines.listAvailableSizes(this.resourceName,this.virtual_machine_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineExtensions.list
    public async test_MachineExtensions_list(){
        await this.compute_client.virtualMachineExtensions.list(this.resourceName,this.virtual_machine_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineSizes.list
    public async test_MachineSizes_list(){
        await this.compute_client.virtualMachineSizes.list(this.location).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineRunCommands.list
    public async test_MachineRunCommands_list(){
        await this.compute_client.virtualMachineRunCommands.list(this.location).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachines.get
    public async test_get(){
        await this.compute_client.virtualMachines.get(this.resourceName,this.virtual_machine_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachines.list
    public async test_list(){
        await this.compute_client.virtualMachines.list(this.resourceName).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachines.listAll
    public async test_listAll(){
        await this.compute_client.virtualMachines.listAll().then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachines.listByLocation
    public async test_listByLocation(){
        await this.compute_client.virtualMachines.listByLocation(this.location).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachines.runCommand
    public async test_runCommand(){
        const parameter:RunCommandInput = {
            commandId: "RunPowerShellScript"
        };
        await this.compute_client.virtualMachines.runCommand(this.resourceName,this.virtual_machine_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachines.restart
    public async test_restart(){
        await this.compute_client.virtualMachines.restart(this.resourceName,this.virtual_machine_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachines.powerOff
    public async test_powerOff(){
        await this.compute_client.virtualMachines.powerOff(this.resourceName,this.virtual_machine_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachines.start
    public async test_start(){
        await this.compute_client.virtualMachines.start(this.resourceName,this.virtual_machine_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineExtensions.update
    public async test_MachineExtensions_update(){
        const parameter:VirtualMachineExtensionUpdate = {
            autoUpgradeMinorVersion: true,
            // type:  "CustomScriptExtension",  // "PropertyChangeNotAllowed"
        };
        await this.compute_client.virtualMachineExtensions.update(this.resourceName,this.virtual_machine_name,this.virtual_machine_extension_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineExtensions.delete
    public async test_MachineExtensions_delete(){
        await this.compute_client.virtualMachineExtensions.delete(this.resourceName,this.virtual_machine_name,this.virtual_machine_extension_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachines.reapply
    public async test_reapply(){
        await this.test_powerOff(); //before reapply 
        await this.compute_client.virtualMachines.reapply(this.resourceName,this.virtual_machine_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachines.redeploy
    public async test_redeploy(){
        await this.compute_client.virtualMachines.redeploy(this.resourceName,this.virtual_machine_name).then(
            response => {
                console.log(response)
            }
        )
    }

    // //virtualMachines.performMaintenance
    // public async test_performMaintenance(){
    //     await this.compute_client.virtualMachines.performMaintenance(this.resourceName,this.virtual_machine_name).then(
    //         response => {
    //             console.log(response)
    //         }
    //     )
    // }

    // //virtualMachines.convertToManagedDisks
    // public async test_convertToManagedDisks(){
    //     await this.compute_client.virtualMachines.convertToManagedDisks(this.resourceName,this.virtual_machine_name).then(
    //         response => {
    //             response
    //         }
    //     )
    // }

    // //virtualMachines.reimage
    // public async test_reimage(){
    //     await this.compute_client.virtualMachines.reimage(this.resourceName,this.virtual_machine_name).then(
    //         response => {
    //             console.log(response)
    //         }
    //     )
    // }

    //virtualMachines.update
    public async test_update(){
        const parameter:VirtualMachineUpdate = {
            networkProfile: {
                networkInterfaces: [
                    {
                        id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceName + "/providers/Microsoft.Network/networkInterfaces/" + this.interface_name + "",
                        primary: true
                    }
                ]
            }
        };
        await this.compute_client.virtualMachines.update(this.resourceName,this.virtual_machine_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachines.generalize
    public async test_generalize(){
        await this.compute_client.virtualMachines.generalize(this.resourceName,this.virtual_machine_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachines.deallocate
    public async test_deallocate(){
        await this.compute_client.virtualMachines.deallocate(this.resourceName,this.virtual_machine_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachines.delete
    public async test_delete(){
        await this.compute_client.virtualMachines.delete(this.resourceName,this.virtual_machine_name).then(
            response => {
                console.log(response)
            }
        )
    }
}

/*
class mTest_virtualMachines_2
*/
class Test_virtualMachines_2{
    private compute_client = new ComputeManagementClient(credential, subscriptionId);
    private network_client = new NetworkManagementClient(credential,subscriptionId);
    private resourceName = "qiaozhatest";
    private virtual_machine_name = "virtualmachinex";
    private subnet_name = "subnetnamex";
    private interface_name = "interfacex";
    private network_name = "networknamex";
    private virtual_machine_extension_name = "virtualmachineextensionx";
    private location = "eastus";

    //network_client.virtualNetworks.createOrUpdate
    private async createVirtualNetwork(group_name: any,location: any,network_name: any,subnet_name: any){
        const parameter:VirtualNetwork = {
            location:this.location,
            addressSpace: {
                addressPrefixes: ['10.0.0.0/16']
            }
        };
       const azure_operation_poller = await this.network_client.virtualNetworks.createOrUpdate(this.resourceName,this.network_name,parameter)

       const subnet_parameter: Subnet={
            addressPrefix: "10.0.0.0/24"
       };
       const subnet_info = await this.network_client.subnets.createOrUpdate(this.resourceName,this.network_name,this.subnet_name,subnet_parameter);
       return subnet_info;
    }

    //network_client.networkInterfaces.createOrUpdate
    private async createNetworkInterface(group_name: any,location: any,nic_name: any,subnet: any){
        const parameter:NetworkInterface= {
            location: this.location,
            ipConfigurations: [
                {
                    name: "MyIpConfig",
                    subnet: {
                        id: subnet.id
                    }
                }
            ]
        };
        const nic_info = await this.network_client.networkInterfaces.createOrUpdate(group_name,nic_name,parameter);
        return nic_info;
    }

    //
    public async test_createOrUpdate(){
        const parameter:VirtualMachine = {
            location: this.location,
            hardwareProfile: {
                vmSize: "Standard_D2_v2"
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
                    name: "myVMosdisk",
                    createOption: "FromImage"
                }
            },
            osProfile: {
                adminUsername: "testuser",
                computerName: "myVM",
                adminPassword: "Aa1!zyx_",
                windowsConfiguration: {
                    enableAutomaticUpdates: true
                }
            },
            networkProfile: {
                networkInterfaces: [
                    {
                        id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceName + "/providers/Microsoft.Network/networkInterfaces/" + this.interface_name + "",
                        primary: true
                    }
                ]
            },
            evictionPolicy: "Deallocate",
            billingProfile: {
                maxPrice: 1
            },
            priority: "Spot"
        };
        await this.compute_client.virtualMachines.createOrUpdate(this.resourceName,this.virtual_machine_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachines.simulateEviction
    public async test_simulateEviction(){
        await this.compute_client.virtualMachines.simulateEviction(this.resourceName,this.virtual_machine_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachines.performMaintenance
    public async test_performMaintenance(){
        try{
            await this.compute_client.virtualMachines.performMaintenance(this.resourceName,this.virtual_machine_name).then(
                response => {
                    console.log(
                        response
                    )
                }
            )
        }catch(error){
            const errorInfo = JSON.parse(error);
            console.assert(errorInfo.error.code.startsWith("OperationNotAllowed"))
            console.assert(errorInfo.error.message.startsWith("VM "+ this.virtual_machine_name +" is already using managed disks."))
        }
    }

    //virtualMachines.convertToManagedDisks
    public async test_convertToManagedDisks(){
        try{
            await this.compute_client.virtualMachines.convertToManagedDisks(this.resourceName,this.virtual_machine_name).then(
                response => {
                    console.log(
                        response
                    )
                }
            )
        }catch(error){
            const errorInfo = JSON.parse(error);
            console.assert(errorInfo.error.code.startsWith("OperationNotAllowed"))
            console.assert(errorInfo.error.message.startsWith("VM "+ this.virtual_machine_name +" is already using managed disks."))
        }
    }

    //virtualMachines.reimage
    public async test_reimage(){
        try{
            await this.compute_client.virtualMachines.reimage(this.resourceName,this.virtual_machine_name).then(
                response => {
                    console.log(
                        response
                    )
                }
            )
        }catch(error){
            const errorInfo = JSON.parse(error);
            console.assert(errorInfo.error.code.startsWith("OperationNotAllowed"))
            console.assert(errorInfo.error.message.startsWith("VM "+ this.virtual_machine_name +" is already using managed disks."))
        }
    }

    //virtualMachines.delete
    public async test_delete(){
        await this.compute_client.virtualMachines.delete(this.resourceName,this.virtual_machine_name).then(
            response => {
                console.log(response)
            }
        )
    }
}

/*
class Test_virtualMachineImages
*/
class Test_virtualMachineImages{
    private compute_client = new ComputeManagementClient(credential, subscriptionId);
    private publisher_name = "MicrosoftWindowsServer";
    private offer = "WindowsServer";
    private skus = "2019-Datacenter";
    private version = "2019.0.20190115" ;
    private location = "eastus";

    //virtualMachineImages.get
    public async test_get(){
        await this.compute_client.virtualMachineImages.get(this.location,this.publisher_name,this.offer,this.skus,this.version).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineImages.list
    public async test_list(){
        await this.compute_client.virtualMachineImages.list(this.location,this.publisher_name,this.offer,this.skus).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineImages.listOffers
    public async test_listOffers(){
        await this.compute_client.virtualMachineImages.listOffers(this.location,this.publisher_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineImages.listPublishers
    public async test_listPublishers(){
        await this.compute_client.virtualMachineImages.listPublishers(this.location).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineImages.listSkus
    public async test_listSkus(){
        await this.compute_client.virtualMachineImages.listSkus(this.location,this.publisher_name,this.offer).then(
            response => {
                console.log(response)
            }
        )
    }
}

/*
class Test_virtualMachineExtensionImages
*/
class Test_virtualMachineExtensionImages{
    private compute_client = new ComputeManagementClient(credential, subscriptionId);
    private extension_publisher_name = "Microsoft.Compute";
    private extension_image_type = "VMAccessAgent";
    private extension_image_version = "1.0.2";
    private location = "eastus";

    //virtualMachineExtensionImages.get
    public async test_get(){
        await this.compute_client.virtualMachineExtensionImages.get(this.location,this.extension_publisher_name,this.extension_image_version,this.extension_image_type).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineExtensionImages.listTypes
    public async test_listTypes(){
        await this.compute_client.virtualMachineExtensionImages.listTypes(this.location,this.extension_publisher_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineExtensionImages.listVersions
    public async test_listVersions(){
        await this.compute_client.virtualMachineExtensionImages.listVersions(this.location,this.extension_publisher_name,this.extension_image_type).then(
            response => {
                console.log(response)
            }
        )
    }
}

