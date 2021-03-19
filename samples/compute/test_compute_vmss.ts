import { ComputeManagementClient,VirtualMachineScaleSet,VirtualMachineScaleSetVMExtension,VirtualMachineScaleSetVMExtensionUpdate,
    VirtualMachineScaleSetVM,RunCommandInput,VirtualMachineScaleSetVMInstanceRequiredIDs,VirtualMachineScaleSetExtension,
    VirtualMachineScaleSetUpdate,VirtualMachineScaleSetExtensionUpdate,OrchestrationServiceStateInput } from "@azure/arm-compute";
import {DefaultAzureCredential} from "@azure/identity";
import { NetworkManagementClient,VirtualNetwork,PublicIPAddress,LoadBalancer } from "@azure/arm-network";

/*
cover options:
    virtualMachineScaleSets :20/22
    virtualMachineScaleSetVMs ：15/15
    virtualMachineScaleSetVMExtensions ：0/5
    virtualMachineScaleSetExtensions ：5/5
    virtualMachineScaleSetRollingUpgrades ：4/4
*/

var subscriptionId = process.env.subscriptionId;
var credential = new DefaultAzureCredential();

/**
 * Class Test_virtualMachineScaleSetVMs.
 */
class Test_virtualMachineScaleSetRollingUpgrades{
    private compute_client = new ComputeManagementClient(credential, subscriptionId);
    private network_client = new NetworkManagementClient(credential,subscriptionId);
    private resourceName = "resourceName";
    private virtual_machine_scale_set_name = "virtualmachinescaleset";
    private networkName = "networknamex";
    private subnetName = "subnetworknamex";
    private location = "eastus";

    public async createVirtualNetwork(groupName: any,location: any,networkName: any,subnetName: any){
        const parameter: VirtualNetwork = {
            location: location,
            addressSpace: {
                addressPrefixes: ["10.0.0.0/16"]
            }
        }
        await this.network_client.virtualNetworks.createOrUpdate(groupName,networkName,parameter);
        const subnet_info = await this.network_client.subnets.createOrUpdate(groupName,networkName,subnetName,{"addressPrefix":"10.0.0.0/24"}); 
        return subnet_info
    }

    // createOrUpdate
    public async test_createOrUpdate(){
        var subnet: any;
        if(await this.createVirtualNetwork(this.resourceName,this.location,this.networkName,this.subnetName)){
            subnet = await this.createVirtualNetwork(this.resourceName,this.location,this.networkName,this.subnetName);
        }else{
            subnet = "subneturi";
        }

        const parameter : VirtualMachineScaleSet = {
            sku: {
                tier: "Standard",
                capacity: 1,
                name: "Standard_D1_V2"
            },
            location: "eastus",
            overprovision: true,
            virtualMachineProfile: {
                storageProfile: {
                    imageReference: {
                        sku: "2016-Datacenter",
                        publisher: "MicrosoftwindowsServer",
                        version: "latest",
                        offer: "windowsServer"
                    },
                    osDisk: {
                        caching: "ReadWrite",
                        managedDisk: {
                            storageAccountType: "Standard_LRS"
                        },
                        createOption: "FromImage",
                        diskSizeGB: 512
                    }
                },
                osProfile: {
                    computerNamePrefix: "testPC",
                    adminUsername: "testuser",
                    adminPassword: "Aa!1()-xyz"
                },
                networkProfile: {
                    networkInterfaceConfigurations: [
                        {
                         name: "testPC",
                         primary: true,
                         enableIPForwarding: true,
                         ipConfigurations: [
                             {
                                 name: "testPC",
                                 subnet: {
                                     id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceName + "/providers/Microsoft.Network/virtualNetworks/" + this.networkName + "/subnets/" + this.subnetName + ""
                                 } 
                             }
                         ]  
                        }
                    ]
                }
            },
            upgradePolicy: {
                mode: "Manual",
                rollingUpgradePolicy: {
                    maxUnhealthyUpgradedInstancePercent: 100,
                    maxBatchInstancePercent: 20   // python is 100
                    /*
                    "error": {
                        "code": "OperationNotAllowed",
                        "message": "The property upgradePolicy.rollingUpgradePolicy.batchInstancePercent has value '100' 
                                    and is greater than the property upgradePolicy.rollingUpgradePolicy.maxUnhealthyInstancePercent with
                                    value '20'. upgradePolicy.rollingUpgradePolicy.batchInstancePercent must be less than or equal to 
                                    upgradePolicy.rollingUpgradePolicy.maxUnhealthyInstancePercent because each Virtual Machines being 
                                    upgraded may become unhealthy or unavailable during the upgrade. To prevent more than 
                                    upgradePolicy.rollingUpgradePolicy.maxUnhealthyInstancePercentpercent of the instances from becoming 
                                    unhealthy or unavailable we do not allow updating more than 
                                    upgradePolicy.rollingUpgradePolicy.maxUnhealthyInstancePercent instances in a single batch."
                    }
                    */
                }
            }
        }
        // start an extension rolling upgrade.post
        await this.compute_client.virtualMachineScaleSets.createOrUpdate(this.resourceName,this.virtual_machine_scale_set_name,parameter).then(
            response => {
                console.log(response)
            }
        );
        // success
    }

    //virtualMachineScaleSetRollingUpgrades.startExtensionUpgrade
    public async test_startExtensionUpgrade(){
        await this.compute_client.virtualMachineScaleSetRollingUpgrades.startExtensionUpgrade(this.resourceName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response)
            }
        );
        // success  (need cancel)
    }

    // virtualMachineScaleSetRollingUpgrades.startOSUpgrade
    public async test_startOSUpgrade(){
        await this.compute_client.virtualMachineScaleSetRollingUpgrades.startOSUpgrade(this.resourceName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response)
            }
        );
        //success
        /*
        "error": {
            "code": "OperationNotAllowed",
            "message": "Virtual Machine Scale Set updates are not allowed while there is a Rolling Upgrade in progress.
             Please cancel Rolling Upgrade operation to continue with updates."
        }
        */
    }

    // virtualMachineScaleSetRollingUpgrades.cancel
    public async test_cancel(){
        await this.compute_client.virtualMachineScaleSetRollingUpgrades.cancel(this.resourceName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response)
            }
        );
        // success (cancel ExtensionUpgrade)
    }

    //getLatest
    public async test_getLatest(){
        this.compute_client.virtualMachineScaleSetRollingUpgrades.getLatest(this.resourceName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response)
            }
        );
        //success
    }

    //delete
    public async virtualMachineScaleSet_delete(){
        await this.compute_client.virtualMachineScaleSets.delete(this.resourceName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response)
            }
        );
        //success
    }
}

/*
Class Test_virtualMachineScaleSetVMExtensions
Subscription is not registered.
*/
class Test_virtualMachineScaleSetVMExtensions{
    private compute_client = new ComputeManagementClient(credential, subscriptionId);
    private network_client = new NetworkManagementClient(credential,subscriptionId);
    private resourceName = "resourceName";
    private virtual_machine_scale_set_name = "virtualmachinescaleset";
    private virtual_machine_extension_name = "vmssextensionx";
    private networkName = "networknamex";
    private subnetName = "subnetworknamex";
    private location = "eastus"; 

    // Create or update a VM scale set.
    public test_createOrUpdate(){
        const subnet = new Test_virtualMachineScaleSetRollingUpgrades().createVirtualNetwork(this.resourceName,this.location,this.networkName,this.subnetName);
        const parameter : VirtualMachineScaleSet = {
            sku: {
                tier: "Standard",
                capacity: 1,
                name: "Standard_D1_V2"
            },
            location: "eastus",
            overprovision: true,
            virtualMachineProfile: {
                storageProfile: {
                    imageReference: {
                        sku: "2016-Datacenter",
                        publisher: "MicrosoftwindowsServer",
                        version: "latest",
                        offer: "windowsServer"
                    },
                    osDisk: {
                        caching: "ReadWrite",
                        managedDisk: {
                            storageAccountType: "Standard_LRS"
                        },
                        createOption: "FromImage",
                        diskSizeGB: 512
                    }
                },
                osProfile: {
                    computerNamePrefix: "testPC",
                    adminUsername: "testuser",
                    adminPassword: "Aa!1()-xyz"
                },
                networkProfile: {
                    networkInterfaceConfigurations: [
                        {
                         name: "testPC",
                         primary: true,
                         enableIPForwarding: true,
                         ipConfigurations: [
                             {
                                 name: "testPC",
                                 subnet: {
                                     id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceName + "/providers/Microsoft.Network/virtualNetworks/" + this.networkName + "/subnets/" + this.subnetName + ""
                                 } 
                             }
                         ]  
                        }
                    ]
                }
            },
            upgradePolicy: {
                mode: "Manual",
            }
        }
        const result = this.compute_client.virtualMachineScaleSets.createOrUpdate(this.resourceName,this.virtual_machine_scale_set_name,parameter);
        return result;
        //  seccess (the start will create scale set instance1 and instance0,but after some minutes the two instance will change into instance1 only )
    }

    //getInstanceView
    public async test_getInstanceView(){
        let instanceId: number;
        let e: boolean ;
        for(let i = 0 ; i < 4 ; i++ ){
            e = false;
            // console.log(e);
            try{
                await this.compute_client.virtualMachineScaleSetVMs.getInstanceView(this.resourceName,this.virtual_machine_scale_set_name,i.toString())
            }catch(error){
                // console.log(error.message)
                e = true;
            }finally{
                if(e){
                    continue;
                }else{
                    instanceId = i;
                    break
                }
            }
        };
        return instanceId;
    }

    //virtualMachineScaleSetVMExtensions.createOrUpdate
    public async test_SetVMExtensions_createOrUpdate(){
        const instanceId = await this.test_getInstanceView();
        const parameter: VirtualMachineScaleSetVMExtension = {
            autoUpgradeMinorVersion: false,
            publisher: "Microsoft.Compute",
            typeHandlerVersion: "2.0",
            typePropertiesType: "VMAccessAgent"
        }
        try {
            await this.compute_client.virtualMachineScaleSetVMExtensions.createOrUpdate(this.resourceName,this.virtual_machine_scale_set_name, instanceId.toString(),this.virtual_machine_extension_name,parameter).then(
                response => {
                    console.log(response)
                    return response
                }
            );
        } catch (error) {
            console.log(error)
        }
        //Subscription is not registered.
    }

    // virtualMachineScaleSetVMExtensions.get
    public async test_get(){
        const instanceId = await this.test_getInstanceView(); 
        var e: any = null;
        for(let i =0 ; i < 3; i++){
            e = false;
            try{
                await this.compute_client.virtualMachineScaleSetVMExtensions.get(this.resourceName,this.virtual_machine_scale_set_name,instanceId.toString(),this.virtual_machine_extension_name).then(
                    response => {
                        console.log(response)
                    }
                );
            }catch(error){
                e = true;
                if(i >= 2){
                    console.log("can not get extension")
                }
            }finally{
                if(!e){
                    break
                }
            }
        };
    }

    //virtualMachineScaleSetVMExtensions.list
    public async test_list(){
        const instanceId = await this.test_getInstanceView();
        await this.compute_client.virtualMachineScaleSetVMExtensions.list(this.resourceName,this.virtual_machine_scale_set_name,instanceId.toString()).then(
            response => {
                console.log(response)
            }
        );
    }

    //virtualMachineScaleSetVMExtensions.update
    public async test_update(){
        const instanceId = await this.test_getInstanceView();
        const parameter: VirtualMachineScaleSetVMExtensionUpdate = {
            autoUpgradeMinorVersion: false,
            publisher: "Microsoft.Azure.NetworkWatcher",
            typePropertiesType: "NetworkWatcherAgentWindows",
            typeHandlerVersion: "1.4"
        } ;
        await this.compute_client.virtualMachineScaleSetVMExtensions.update(this.resourceName,this.virtual_machine_scale_set_name,instanceId.toString(),this.virtual_machine_extension_name,parameter).then(
            response => {
                console.log(response)
            }
        );
    }

    // virtualMachineScaleSetVMExtensions.delete
    public async test_delete(){
        const instanceId = await this.test_getInstanceView();
        await this.compute_client.virtualMachineScaleSetVMExtensions.delete(this.resourceName,this.virtual_machine_scale_set_name,instanceId.toString(),this.virtual_machine_extension_name).then(
            response => {
                console.log(response);
            }
        )
    }

    //virtualMachineScaleSets.delete
    public async virtualMachineScaleSet_delete(){
        await this.compute_client.virtualMachineScaleSets.delete(this.resourceName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response);
            }
        );
    }
}

/*
Class Test_virtualMachineScaleSetVMs
*/
class Test_virtualMachineScaleSetVMs{
    private compute_client = new ComputeManagementClient(credential, subscriptionId);
    private network_client = new NetworkManagementClient(credential,subscriptionId);
    private resourceName = "resourceName";
    private virtual_machine_scale_set_name = "virtualmachinescaleset";
    private networkName = "networknamex";
    private subnetName = "subnetworknamex";
    private location = "eastus";

    //create a viryual network
    private async createVirtualNetwork(groupName: any,location: any,networkName: any,subnetName: any){
        const parameter: VirtualNetwork = {
            location: location,
            addressSpace: {
                addressPrefixes: ["10.0.0.0/16"]
            }
        }
        await this.network_client.virtualNetworks.createOrUpdate(groupName,networkName,parameter).then(
            reponse => {
                console.log(reponse)
            }
        );
        const subnet_info = await this.network_client.subnets.createOrUpdate(groupName,networkName,subnetName,{"addressPrefix":"10.0.0.0/24"});
        return subnet_info; 
    } 

    //create a virtual machine scale set
    private async createVirtualMachineScaleSet(){
        const subnet = await this.createVirtualNetwork(this.resourceName,this.location,this.networkName,this.subnetName);
        const parameter : VirtualMachineScaleSet = {
            sku: {
                tier: "Standard",
                capacity: 1,
                name: "Standard_D1_V2"
            },
            location: "eastus",
            overprovision: true,
            virtualMachineProfile: {
                storageProfile: {
                    imageReference: {
                        sku: "2016-Datacenter",
                        publisher: "MicrosoftwindowsServer",
                        version: "latest",
                        offer: "windowsServer"
                    },
                    osDisk: {
                        caching: "ReadWrite",
                        managedDisk: {
                            storageAccountType: "Standard_LRS"
                        },
                        createOption: "FromImage",
                        diskSizeGB: 512
                    }
                },
                osProfile: {
                    computerNamePrefix: "testPC",
                    adminUsername: "testuser",
                    adminPassword: "Aa!1()-xyz"
                },
                networkProfile: {
                    networkInterfaceConfigurations: [
                        {
                         name: "testPC",
                         primary: true,
                         enableIPForwarding: true,
                         ipConfigurations: [
                             {
                                 name: "testPC",
                                 subnet: {
                                     id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceName + "/providers/Microsoft.Network/virtualNetworks/" + this.networkName + "/subnets/" + this.subnetName + ""
                                 } 
                             }
                         ]  
                        }
                    ]
                }
            },
            upgradePolicy: {
                mode: "Manual",
                rollingUpgradePolicy: {
                maxUnhealthyUpgradedInstancePercent: 100,
                maxBatchInstancePercent: 20   // python is 100
                }
            }
        };
        try{
            await this.compute_client.virtualMachineScaleSets.createOrUpdate(this.resourceName,this.virtual_machine_scale_set_name,parameter).then(
                response => {
                    console.log(response);
                }
            )
        }catch(error){
            console.log(error)
        }  
    }

    //getInstanceView (intance ID)
    public async test_getInstanceView(){
        let instanceId: number;
        let e: boolean ;
        for(let i = 0 ; i < 4 ; i++ ){
            e = false;
            // console.log(e);
            try{
                await this.compute_client.virtualMachineScaleSetVMs.getInstanceView(this.resourceName,this.virtual_machine_scale_set_name,i.toString())
            }catch(error){
                // console.log(error.message)
                e = true;
            }finally{
                if(e){
                    continue;
                }else{
                    instanceId = i;
                    break
                }
            }
        };
        return instanceId;
    }

    //virtualMachineScaleSetVMs.list
    public async test_list(){
       try{
           await this.createVirtualMachineScaleSet();  // create for one time
       }catch(error){
           console.log(error)
       }
       await this.compute_client.virtualMachineScaleSetVMs.list(this.resourceName,this.virtual_machine_scale_set_name).then(
           response => {
               console.log(response)
           }
       )
    }

    //virtualMachineScaleSetVMs.get
    public async test_get(){
        const instanceId = await this.test_getInstanceView();
        await this.compute_client.virtualMachineScaleSetVMs.get(this.resourceName,this.virtual_machine_scale_set_name,instanceId.toString()).then(
            response => {
                console.log(response);
            }
        );
    }

    //virtualMachineScaleSetVMs.update
    public async test_update(){
        const instanceId = await this.test_getInstanceView();
        const parameter: VirtualMachineScaleSetVM = {
            location: this.location,
            tags: {
                "department": "HR"
            }
        };
        await this.compute_client.virtualMachineScaleSetVMs.update(this.resourceName,this.virtual_machine_scale_set_name,instanceId.toString(),parameter).then(
            response => {
                console.log(response);
                //success
            }
        );
    }

    //virtualMachineScaleSetVMs.restart
    public async test_restart(){
        const instanceId = await this.test_getInstanceView();
        await this.compute_client.virtualMachineScaleSetVMs.restart(this.resourceName,this.virtual_machine_scale_set_name,instanceId.toString()).then(
            response => {
                console.log(response);
            }
        )
    }

    //virtualMachineScaleSetVMs.powerOff
    public async test_powerOff(){
        const instanceId = await this.test_getInstanceView();
        await this.compute_client.virtualMachineScaleSetVMs.powerOff(this.resourceName,this.virtual_machine_scale_set_name,instanceId.toString()).then(
            response => {
                console.log(response);
                //success
            }
        )
    }

    // virtualMachineScaleSetVMs.start
    public async test_start(){
        const instanceId = await this.test_getInstanceView();
        await this.compute_client.virtualMachineScaleSetVMs.start(this.resourceName,this.virtual_machine_scale_set_name,instanceId.toString()).then(
            response => {
                console.log(response);
                //success
            }
        )
    }

    //virtualMachineScaleSetVMs.runCommand
    public async test_runCommand(){
        const instanceId = await this.test_getInstanceView();
        const parameter: RunCommandInput = {
            commandId: "RunPowerShellScript"
        };
        await this.compute_client.virtualMachineScaleSetVMs.runCommand(this.resourceName,this.virtual_machine_scale_set_name,instanceId.toString(),parameter).then(
            response => {
                console.log(response);
                //success
            }
        );
    }

    //virtualMachineScaleSets.updateInstances
    public async test_updateInstances(){
        const instanceId = await this.test_getInstanceView();
        const parameter: VirtualMachineScaleSetVMInstanceRequiredIDs = {
            instanceIds: [
                instanceId.toString(),
            ]
        };
        await this.compute_client.virtualMachineScaleSets.updateInstances(this.resourceName,this.virtual_machine_scale_set_name,parameter).then(
            response => {
                console.log(response);
                //success
            }
        )
    }

    //virtualMachineScaleSetVMs.deallocate
    public async test_deallocate(){
        const instanceId = await this.test_getInstanceView()
        await this.compute_client.virtualMachineScaleSetVMs.deallocate(this.resourceName,this.virtual_machine_scale_set_name,instanceId.toString()).then(
            response => {
                console.log(response);
                //success
            }
        )
    }

    //virtualMachineScaleSetVMs.redeploy
    public async test_redeploy(){
        const instanceId = await this.test_getInstanceView();
        await this.compute_client.virtualMachineScaleSetVMs.redeploy(this.resourceName,this.virtual_machine_scale_set_name,instanceId.toString()).then(
            response => {
                console.log(response);
            }
        )
    }

    // //virtualMachineScaleSetVMs.simulateEviction
    // //it isn't in vmss vm
    // public async test_simulateEviction(){
    //     const instanceId = await this.test_getInstanceView();
    //     await this.compute_client.virtualMachineScaleSetVMs.simulateEviction(this.resourceName,this.virtual_machine_scale_set_name,instanceId.toString()).then(
    //         response => {
    //             console.log(response)
    //         }
    //     )
    // }

    //virtualMachineScaleSetVMs.retrieveBootDiagnosticsData
    // public async test_retrieveBootDiagnosticsData(){
    //     const instanceId = await this.test_getInstanceView()
    //     await this.compute_client.virtualMachineScaleSetVMs.retrieveBootDiagnosticsData(this.resourceName,this.virtual_machine_scale_set_name,instanceId.toString()).then(
    //         response => {
    //             console.log(response)
    //         }
    //     )
    // }

    //virtualMachineScaleSetVMs.reimage
    public async test_reimage(){
        const instanceId = await this.test_getInstanceView();
        await this.compute_client.virtualMachineScaleSetVMs.reimage(this.resourceName,this.virtual_machine_scale_set_name,instanceId.toString()).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineScaleSetVMs.reimageAll
    public async test_reimageAll(){
        const instanceId = await this.test_getInstanceView();
        await this.compute_client.virtualMachineScaleSetVMs.reimageAll(this.resourceName,this.virtual_machine_scale_set_name,instanceId.toString()).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineScaleSets.deleteInstances
    public async test_deleteInstances(){
        const instanceId = await this.test_getInstanceView();
        const parameter: VirtualMachineScaleSetVMInstanceRequiredIDs = {
            instanceIds: [
                instanceId.toString(),
            ]
        };
        await this.compute_client.virtualMachineScaleSets.deleteInstances(this.resourceName,this.virtual_machine_scale_set_name,parameter).then(
            response => {
                console.log(response);
                //success
            }
        )
    }

    //virtualMachineScaleSetVMs.delete
    public async test_scaleSetVM_delete(){
        const instanceId = await this.test_getInstanceView();
        await this.compute_client.virtualMachineScaleSetVMs.delete(this.resourceName,this.virtual_machine_scale_set_name,instanceId.toString()).then(
            response => {
                console.log(response);
                // success
            }
        )
    }

    //virtualMachineScaleSets.delete
    public async test_scaleSet_delete(){
        await this.compute_client.virtualMachineScaleSets.delete(this.resourceName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response);
                //success
            }
        )
    }
}

/*
Class Test_virtualMachineScaleSets
*/
class Test_virtualMachineScaleSets{
    private compute_client = new ComputeManagementClient(credential, subscriptionId);
    private network_client = new NetworkManagementClient(credential,subscriptionId);
    private resourceName = "resourceName";
    private virtual_machine_scale_set_name = "virtualmachinescaleset2";
    private vmss_extension_name = "vmssextensionx";
    private networkName = "networknamex";
    private subnetName = "subnetworknamex";
    private location = "eastus";

    //create a viryual network
    private async createVirtualNetwork(groupName: any,location: any,networkName: any,subnetName: any){
        const parameter: VirtualNetwork = {
            location: location,
            addressSpace: {
                addressPrefixes: ["10.0.0.0/16"]
            }
        }
        await this.network_client.virtualNetworks.createOrUpdate(groupName,networkName,parameter).then(
            reponse => {
                console.log(reponse)
            }
        );
        const subnet_info = await this.network_client.subnets.createOrUpdate(groupName,networkName,subnetName,{"addressPrefix":"10.0.0.0/24"});
        return subnet_info; 
    } 

    //create a virtual machine scale set
    public async createVirtualMachineScaleSet(){
        const subnet = await this.createVirtualNetwork(this.resourceName,this.location,this.networkName,this.subnetName);
        const parameter : VirtualMachineScaleSet = {
            sku: {
                tier: "Standard",
                capacity: 1,
                name: "Standard_D1_v2"
            },
            location: "eastus",
            overprovision: true,
            virtualMachineProfile: {
                storageProfile: {
                    // imageReference: {
                    //     sku: "2016-Datacenter",
                    //     publisher: "MicrosoftwindowsServer",
                    //     version: "latest",
                    //     offer: "windowsServer"
                    // },
                    imageReference: {
                        offer: "UbuntuServer",
                        publisher: "Canonical",
                        sku: "18.04-LTS",
                        version: "Latest"
                    },
                    osDisk: {
                        caching: "ReadWrite",
                        managedDisk: {
                            storageAccountType: "Standard_LRS"
                        },
                        createOption: "FromImage",
                        diskSizeGB: 512
                    }
                },
                osProfile: {
                    computerNamePrefix: "testPC",
                    adminUsername: "testuser",
                    adminPassword: "Aa!1()-xyz"
                },
                networkProfile: {
                    networkInterfaceConfigurations: [
                        {
                         name: "testPC",
                         primary: true,
                         enableIPForwarding: true,
                         ipConfigurations: [
                             {
                                 name: "testPC",
                                 subnet: {
                                     id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceName + "/providers/Microsoft.Network/virtualNetworks/" + this.networkName + "/subnets/" + this.subnetName + ""
                                 } 
                             }
                         ]  
                        }
                    ]
                }
            },
            upgradePolicy: {
                mode: "Manual",
            }
        };
        try{
            await this.compute_client.virtualMachineScaleSets.createOrUpdate(this.resourceName,this.virtual_machine_scale_set_name,parameter);
        }catch(error){
            console.log(error)
        }  
    }

    //virtualMachineScaleSetExtensions.createOrUpdate
    public async test_createOrUpdate(){
        await this.createVirtualMachineScaleSet();
        const parameter:VirtualMachineScaleSetExtension = {
            autoUpgradeMinorVersion: true,
            publisher: "Microsoft.Azure.NetworkWatcher",
            typePropertiesType:  "NetworkWatcherAgentWindows",
            typeHandlerVersion: "1.4"
        };
        await this.compute_client.virtualMachineScaleSetExtensions.createOrUpdate(this.resourceName,this.virtual_machine_scale_set_name,this.vmss_extension_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineScaleSets.get
    public async test_get(){
        await this.compute_client.virtualMachineScaleSets.get(this.resourceName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineScaleSetExtensions.get
    public async test_ScaleSetExtensions_get(){
        await this.compute_client.virtualMachineScaleSetExtensions.get(this.resourceName,this.virtual_machine_scale_set_name,this.vmss_extension_name).then(
            response => {
                console.log(response)
            }
        )
    }

    // //virtualMachineScaleSets.listOSUpgradeHistory
    // public test_listOSUpgradeHistory(){
    //     const result =  this.compute_client.virtualMachineScaleSets.getOSUpgradeHistory(this.resourceName, this.virtual_machine_scale_set_name);
    //     return result;
    // }

    //virtualMachineScaleSets.getInstanceView
    public async test_getInstanceView(){
        await this.compute_client.virtualMachineScaleSets.getInstanceView(this.resourceName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response);
            }
        )
    }

    //virtualMachineScaleSets.list
    public async test_list(){
        await this.compute_client.virtualMachineScaleSets.list(this.resourceName).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineScaleSetExtensions.list
    public async test_ScaleSetExtensions_list(){
        await this.compute_client.virtualMachineScaleSetExtensions.list(this.resourceName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineScaleSets.listAll
    public async test_listAll(){
        await this.compute_client.virtualMachineScaleSets.listAll().then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineScaleSets.listSkus
    public async test_listSkus(){
        await this.compute_client.virtualMachineScaleSets.listSkus(this.resourceName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineScaleSetRollingUpgrades.startExtensionUpgrade
    public async test_startExtensionUpgrade(){
        await this.compute_client.virtualMachineScaleSetRollingUpgrades.startExtensionUpgrade(this.resourceName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response);
            }
        )
    }

    //virtualMachineScaleSets.update
    public async test_update(){
        const parameter: VirtualMachineScaleSetUpdate= {
            sku: {
                tier: "Standard",
                capacity: 2,
                name: "Standard_D1_v2"
            },
            upgradePolicy: {
                mode: "Manual"
            }
        };
        await this.compute_client.virtualMachineScaleSets.update(this.resourceName,this.virtual_machine_scale_set_name,parameter).then(
            response => {
                console.log(response);
            }
        )
    }

    //virtualMachineScaleSets.restart
    public async test_restart(){
        await this.compute_client.virtualMachineScaleSets.restart(this.resourceName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response);
            }
        )
    }

    //virtualMachineScaleSets.powerOff
    public async test_powerOff(){
        await this.compute_client.virtualMachineScaleSets.powerOff(this.resourceName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response);
            }
        )
    }

    //virtualMachineScaleSets.start
    public async test_start(){
        // before start should poweroff scale set
        await this.compute_client.virtualMachineScaleSets.start(this.resourceName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response);
            }
        )
    }

    //virtualMachineScaleSetExtensions.update
    public async test_ScaleSetExtensions_update(){
        // before update should poweroff scale set
        const parameter:VirtualMachineScaleSetExtensionUpdate = {
            autoUpgradeMinorVersion: true,
        };
        await this.compute_client.virtualMachineScaleSetExtensions.update(this.resourceName,this.virtual_machine_scale_set_name,this.vmss_extension_name,parameter).then(
            response => {
                console.log(response);
            }
        )
    }

    //virtualMachineScaleSetExtensions.delete
    public async test_ScaleSetExtensions_delete(){
        await this.compute_client.virtualMachineScaleSetExtensions.delete(this.resourceName,this.virtual_machine_scale_set_name,this.vmss_extension_name).then(
            response => {
                console.log(response);
            }
        )
    }

    //virtualMachineScaleSets.redeploy
    public async test_redeploy(){
        try{
            await this.compute_client.virtualMachineScaleSets.redeploy(this.resourceName,this.virtual_machine_scale_set_name).then(
                response => {
                    console.log(response);
                }
            )
        }catch(error){
            console.log(error);
            if(error.message.startswith("(VMRedeploymentTimedOut)")){
                throw new Error(error);
            }
        }  
    }

    //virtualMachineScaleSets.start
    public async test_deallocate(){
        await this.compute_client.virtualMachineScaleSets.deallocate(this.resourceName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response);
            }
        )
    }

    //virtualMachineScaleSets.delete
    public async test_delete(){
        await this.compute_client.virtualMachineScaleSets.delete(this.resourceName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response);
            }
        )
    }
}

/*
class Test_virtualMachineScaleSets2
*/

class Test_virtualMachineScaleSets2{
    private compute_client = new ComputeManagementClient(credential, subscriptionId);
    private network_client = new NetworkManagementClient(credential,subscriptionId);
    private resourceName = "qiaozhatest";
    private virtual_machine_scale_set_name = "virtualmachinescaleset";
    private vmss_extension_name = "vmssextensionx";
    private networkName = "networknamex";
    private subnetName = "subnetworknamex";
    private location = "eastus";

    //create a viryual network
    private async createVirtualNetwork(groupName: any,location: any,networkName: any,subnetName: any){
        const parameter: VirtualNetwork = {
            location: location,
            addressSpace: {
                addressPrefixes: ["10.0.0.0/16"]
            }
        }
        await this.network_client.virtualNetworks.createOrUpdate(groupName,networkName,parameter).then(
            reponse => {
                console.log(reponse)
            }
        );
        const subnet_info = await this.network_client.subnets.createOrUpdate(groupName,networkName,subnetName,{"addressPrefix":"10.0.0.0/24"});
        return subnet_info; 
        /*
            LROPoller {
            stopped: true,
            pollProgressCallbacks: [],
            operation: {
                state: {
                initialOperation: [Object],
                lastOperation: [Object],
                pollingStrategy: [Object],
                finalStateVia: 'azure-async-operation'
                },
                update: [Function: update],
                cancel: [Function: cancel],
                toString: [Function: toString]
            },
            resolve: [Function],
            reject: [Function],
            promise: Promise { <pending> },
            intervalInMs: 2000
            }
            LROPoller {
            stopped: true,
            pollProgressCallbacks: [],
            operation: {
                state: {
                initialOperation: [Object],
                lastOperation: [Object],
                pollingStrategy: [Object],
                finalStateVia: 'azure-async-operation'
                },
                update: [Function: update],
                cancel: [Function: cancel],
                toString: [Function: toString]
            },
            resolve: [Function],
            reject: [Function],
            promise: Promise { <pending> },
            intervalInMs: 2000
            }
        */
        
    } 

    //publicIPAddresses.createOrUpdate
    private async createPublicIpAddress(publicIpAddressName: string){
        //# Create public IP address defaults[put]
        const parameter:PublicIPAddress = {
            publicIPAllocationMethod: "Static",
            idleTimeoutInMinutes: 10,
            publicIPAddressVersion: "IPv4",
            location: this.location,
            sku: {
                name: "Standard"
            }
        };
        await this.network_client.publicIPAddresses.createOrUpdate(this.resourceName,publicIpAddressName,parameter).then(
            response => {
                console.log(response);
            }
        )
    }

    //network_client.loadBalancers.createOrUpdate
    private async createLoadBalanceProbe(){
        const publicIpAddressName = "public_ip_address_name";
        const loadBalancerName = "myLoadBalancer";
        const inboundNatRuleName = "myInBoundNatRule";
        const frontEndIpConfigurationName = "myFrontendIpconfiguration";
        const backendAddressPoolName = "myBackendAddressPool";
        const loadBalancingRuleName = "myLoadBalancingRule";
        const outBoundRuleName = "myOutboundRule";
        const probeName = "myProbe";

        await this.createPublicIpAddress(publicIpAddressName);

        //create load balancer
        const parameter:LoadBalancer = {
            location: this.location,
            sku: {
                name: "Standard"
            },
            frontendIPConfigurations: [
                {
                    name: frontEndIpConfigurationName,
                    publicIPAddress: {
                        id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceName + "/providers/Microsoft.Network/publicIPAddresses/" + publicIpAddressName
                    }
                }
            ],
            backendAddressPools: [
                {
                    name: backendAddressPoolName
                }
            ],
            loadBalancingRules: [
                {
                    name: loadBalancingRuleName,
                    frontendIPConfiguration: {
                        id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceName + "/providers/Microsoft.Network/loadBalancers/" + loadBalancerName + "/frontendIPConfigurations/" + frontEndIpConfigurationName
                    },
                    frontendPort: 80,
                    backendPort: 80,
                    enableFloatingIP: true,
                    idleTimeoutInMinutes: 15,
                    protocol: "Tcp",
                    loadDistribution: "Default",
                    disableOutboundSnat: true,
                    backendAddressPool: {
                        id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceName + "/providers/Microsoft.Network/loadBalancers/" + loadBalancerName + "/backendAddressPools/" + backendAddressPoolName
                    },
                    probe: {
                        id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceName + "/providers/Microsoft.Network/loadBalancers/" + loadBalancerName + "/probes/" + probeName
                    }
                }
            ],
            probes: [
                {
                    name: probeName,
                    protocol: "Http",
                    port: 80,
                    requestPath: "healthcheck.aspx",
                    intervalInSeconds: 15,
                    numberOfProbes: 2
                }
            ],
            outboundRules: [
                {
                    name: outBoundRuleName,
                    backendAddressPool: {
                        id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceName + "/providers/Microsoft.Network/loadBalancers/" + loadBalancerName + "/backendAddressPools/" + backendAddressPoolName
                    },
                    frontendIPConfigurations: [
                        {
                            id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceName + "/providers/Microsoft.Network/loadBalancers/" + loadBalancerName + "/frontendIPConfigurations/" + frontEndIpConfigurationName
                        }
                    ],
                    protocol: "All"
                }
            ]
        };
        await this.network_client.loadBalancers.createOrUpdate(this.resourceName,loadBalancerName,parameter).then(
            response => {
                console.log(response)
            }
        )
        return [
          "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceName + "/providers/Microsoft.Network/loadBalancers/" + loadBalancerName + "/probes/myProbe",
          "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceName + "/providers/Microsoft.Network/loadBalancers/" + loadBalancerName + "/backendAddressPools/" + backendAddressPoolName
        ]
    }

    //create a virtual machine scale set
    public async createVirtualMachineScaleSet(){
        const subnet = await this.createVirtualNetwork(this.resourceName,this.location,this.networkName,this.subnetName);
        const uri: string[] = await this.createLoadBalanceProbe();
        const probe_uri = uri[0];
        const backed_pools_uri = uri[1];
        //     probe_uri = uri[0];
        //     backed_pools_uri = uri[1];
        // if(await this.createLoadBalanceProbe()){
        //     const uri: string[] = await this.createLoadBalanceProbe();
        //     probe_uri = uri[0];
        //     backed_pools_uri = uri[1];
        // }else{
        //     probe_uri = "probe_uri"
        //     backed_pools_uri = "backed_pools_uri"
        // }
        

        console.log(probe_uri);  
        console.log(backed_pools_uri);

        const parameter : VirtualMachineScaleSet = {
            sku: {
                tier: "Standard",
                capacity: 2,
                name: "Standard_D1_v2"
            },
            location: "eastus",
            overprovision: true,
            virtualMachineProfile: {
                extensionProfile:{},
                storageProfile: {
                    imageReference: {
                        offer: "UbuntuServer",
                        publisher: "Canonical",
                        sku: "18.04-LTS",
                        version: "latest"
                    },
                    osDisk: {
                        caching: "ReadWrite",
                        managedDisk: {
                            storageAccountType: "Standard_LRS"
                        },
                        createOption: "FromImage",
                        diskSizeGB: 512
                    }
                },
                osProfile: {
                    computerNamePrefix: "testPC",
                    adminUsername: "testuser",
                    adminPassword: "Aa!1()-xyz"
                },
                networkProfile: {
                    networkInterfaceConfigurations: [
                        {
                            name:"testPC",
                            primary: true,
                            enableIPForwarding: true,
                            ipConfigurations: [
                                {
                                    name: "testPC",
                                    subnet: {
                                        id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceName + "/providers/Microsoft.Network/virtualNetworks/" + this.networkName + "/subnets/" + this.subnetName + ""
                                    },
                                    loadBalancerBackendAddressPools: [
                                        {
                                            id: backed_pools_uri
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    healthProbe: {
                        id: probe_uri
                    }
                }
            },
            upgradePolicy: {
                mode: "Manual",
            },
            automaticRepairsPolicy: {
                enabled: true,
                gracePeriod: "PT30M"
            }
        };
        try{
            await this.compute_client.virtualMachineScaleSets.createOrUpdate(this.resourceName,this.virtual_machine_scale_set_name,parameter);
        }catch(error){
            console.log(error)
        }  
    }

    //virtualMachineScaleSets.setOrchestrationServiceState
    public async test_setOrchestrationServiceState(){
        const parameter:OrchestrationServiceStateInput = {
            action: "Suspend",
            serviceName: "AutomaticRepairs"
        };
        await this.compute_client.virtualMachineScaleSets.setOrchestrationServiceState(this.resourceName,this.virtual_machine_scale_set_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineScaleSets.reimage
    public async test_reimage(){
        await this.compute_client.virtualMachineScaleSets.reimage(this.resourceName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response);
            }
        )
    }

    //virtualMachineScaleSets.reimageAll
    public async test_reimageAll(){
        await this.compute_client.virtualMachineScaleSets.reimageAll(this.resourceName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response);
            }
        )
    }

    //Force recovery service fabric platform update domain walk
    public async test_forceRecoveryServiceFabricPlatformUpdateDomainWalk(){
        await this.compute_client.virtualMachineScaleSets.forceRecoveryServiceFabricPlatformUpdateDomainWalk(this.resourceName,this.virtual_machine_scale_set_name,1).then(
            response => {
                console.log(response);
            }
        )
    }

    //Convert to single placement virtual machine scale sets
    public async test_convertToSinglePlacementGroup(){
        const parameter: VMScaleSetConvertToSinglePlacementGroupInput={
        };
        await this.compute_client.virtualMachineScaleSets.convertToSinglePlacementGroup(this.resourceName,this.virtual_machine_scale_set_name,parameter).then(
            response => {
                console.log(response);
            }
        )
    }

    //delete scale set
    public async test_delete(){
        await this.compute_client.virtualMachineScaleSets.delete(this.resourceName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response);
            }
        )
    }
}


/*
class Test_computeVmssPerformMaintenance
*/
class Test_computeVmssPerformMaintenance{
    private compute_client = new ComputeManagementClient(credential, subscriptionId);
    private network_client = new NetworkManagementClient(credential,subscriptionId);
    private resourceName = "qiaozhatest";
    private virtual_machine_scale_set_name = "virtualmachinescaleset";
    private networkName = "networknamex";
    private subnetName = "subnetworknamex";
    private location = "eastus";

    //create a viryual network
    private async createVirtualNetwork(groupName: any,location: any,networkName: any,subnetName: any){
        const parameter: VirtualNetwork = {
            location: location,
            addressSpace: {
                addressPrefixes: ["10.0.0.0/16"]
            }
        }
        await this.network_client.virtualNetworks.createOrUpdate(groupName,networkName,parameter).then(
            reponse => {
                console.log(reponse)
            }
        );
        const subnet_info = await this.network_client.subnets.createOrUpdate(groupName,networkName,subnetName,{"addressPrefix":"10.0.0.0/24"});
        return subnet_info; 
    } 

    //create a virtual machine scale set
    private async createVirtualMachineScaleSet(){
        const subnet = await this.createVirtualNetwork(this.resourceName,this.location,this.networkName,this.subnetName);
        const parameter : VirtualMachineScaleSet = {
            sku: {
                tier: "Standard",
                capacity: 1,
                name: "Standard_D1_V2"
            },
            location: "eastus",
            overprovision: true,
            virtualMachineProfile: {
                storageProfile: {
                    imageReference: {
                        sku: "2016-Datacenter",
                        publisher: "MicrosoftwindowsServer",
                        version: "latest",
                        offer: "windowsServer"
                    },
                    osDisk: {
                        caching: "ReadWrite",
                        managedDisk: {
                            storageAccountType: "Standard_LRS"
                        },
                        createOption: "FromImage",
                        diskSizeGB: 512
                    }
                },
                osProfile: {
                    computerNamePrefix: "testPC",
                    adminUsername: "testuser",
                    adminPassword: "Aa!1()-xyz"
                },
                networkProfile: {
                    networkInterfaceConfigurations: [
                        {
                         name: "testPC",
                         primary: true,
                         enableIPForwarding: true,
                         ipConfigurations: [
                             {
                                 name: "testPC",
                                 subnet: {
                                     id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceName + "/providers/Microsoft.Network/virtualNetworks/" + this.networkName + "/subnets/" + this.subnetName + ""
                                 } 
                             }
                         ]  
                        }
                    ]
                }
            },
            upgradePolicy: {
                mode: "Manual"
            }
        };
        try{
            await this.compute_client.virtualMachineScaleSets.createOrUpdate(this.resourceName,this.virtual_machine_scale_set_name,parameter).then(
                response => {
                    console.log(response);
                }
            )
        }catch(error){
            console.log(error)
        }  
    }

    //getInstanceView (intance ID)
    public async test_getInstanceView(){
        let instanceId: number;
        let e: boolean ;
        for(let i = 0 ; i < 4 ; i++ ){
            e = false;
            // console.log(e);
            try{
                await this.compute_client.virtualMachineScaleSetVMs.getInstanceView(this.resourceName,this.virtual_machine_scale_set_name,i.toString())
            }catch(error){
                // console.log(error.message)
                e = true;
            }finally{
                if(e){
                    continue;
                }else{
                    instanceId = i;
                    break
                }
            }
        };
        return instanceId;
    }

    //virtualMachineScaleSets.performMaintenance
    public async test_performMaintenance(){
        // await this.createVirtualMachineScaleSet();  // create for one time
        try{
            await this.compute_client.virtualMachineScaleSets.performMaintenance(this.resourceName,this.virtual_machine_scale_set_name)
        }catch(error){
            const errorInfoJson = JSON.parse(error.message);
            console.assert(errorInfoJson.error.code.startsWith("OperationNotAllowed"))
            console.assert(errorInfoJson.error.message.startsWith("Operation 'performMaintenance' is not allowed on"))
        }
    }

    //virtualMachineScaleSetVMs.performMaintenance
    public async test_setVms_performMaintenance(){
        const instanceId = await this.test_getInstanceView();
        try{
            await this.compute_client.virtualMachineScaleSetVMs.performMaintenance(this.resourceName,this.virtual_machine_scale_set_name,instanceId.toString())
        }catch(error){
            const errorInfoJson = JSON.parse(error.message);
            console.assert(errorInfoJson.error.code.startsWith("OperationNotAllowed"))
            console.assert(errorInfoJson.error.message.startsWith("Operation 'performMaintenance' is not allowed on"))
        }
    }

    // delete scale set
    public async test_delete(){
        await this.compute_client.virtualMachineScaleSets.delete(this.resourceName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response);
            }
        )
    }
}


const t = new Test_computeVmssPerformMaintenance();
t.test_setVms_performMaintenance()
// t.test_getInstanceView().then(i => console.log(i));
// const test = new Test_virtualMachineScaleSetRollingUpgrades();
// console.log(test.test_createOrUpdate)