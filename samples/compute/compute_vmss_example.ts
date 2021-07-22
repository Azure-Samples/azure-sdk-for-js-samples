import * as compute from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import { NetworkManagementClient,VirtualNetwork,PublicIPAddress,LoadBalancer } from "@azure/arm-network";

var subscriptionId = process.env.subscriptionId;
var credential = new DefaultAzureCredential();

class virtualMachineScaleSetRollingUpgradesExamples{
    private compute_client = new compute.ComputeManagementClient(credential, subscriptionId);
    private network_client = new NetworkManagementClient(credential,subscriptionId);
    private resourceGroupName = "myjstest";
    private virtual_machine_scale_set_name = "virtualmachinescaleset";
    private networkName = "networknamex";
    private subnetName = "subnetworknamex";
    private location = "eastus";

    // virtualNetworks.beginCreateOrUpdateAndWait
    // subnets.beginCreateOrUpdateAndWait
    public async createVirtualNetwork(groupName: any,location: any,networkName: any,subnetName: any){
        const parameter: VirtualNetwork = {
            location: location,
            addressSpace: {
                addressPrefixes: ["10.0.0.0/16"]
            }
        }
        await this.network_client.virtualNetworks.beginCreateOrUpdateAndWait(groupName,networkName,parameter).then(
            result => {
                console.log(result);
            }
        );
        const subnet_info = await this.network_client.subnets.beginCreateOrUpdateAndWait(groupName,networkName,subnetName,{"addressPrefix":"10.0.0.0/24"}); 
        console.log(subnet_info);
        return subnet_info
    }

    // virtualMachineScaleSets.createOrUpdate
    public async virtualMachineScaleSets_createOrUpdate(){
        var subnet: any;
        if(await this.createVirtualNetwork(this.resourceGroupName,this.location,this.networkName,this.subnetName)){
            subnet = await this.createVirtualNetwork(this.resourceGroupName,this.location,this.networkName,this.subnetName);
        }else{
            subnet = "subneturi";
        }

        const parameter : compute.VirtualMachineScaleSet = {
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
                    adminPassword: "000000000000000000",
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
                                     id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceGroupName + "/providers/Microsoft.Network/virtualNetworks/" + this.networkName + "/subnets/" + this.subnetName + ""
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
        }
        // start an extension rolling upgrade.post
        await this.compute_client.virtualMachineScaleSets.beginCreateOrUpdateAndWait(this.resourceGroupName,this.virtual_machine_scale_set_name,parameter).then(
            response => {
                console.log(response)
            }
        );
    }  

    //virtualMachineScaleSetRollingUpgrades.startExtensionUpgrade
    public async virtualMachineScaleSetRollingUpgrades_startExtensionUpgrade(){
        await this.compute_client.virtualMachineScaleSetRollingUpgrades.beginStartExtensionUpgradeAndWait(this.resourceGroupName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response)
            }
        );
    }

    // virtualMachineScaleSetRollingUpgrades.cancel
    public async virtualMachineScaleSetRollingUpgrades_cancel(){
        await this.compute_client.virtualMachineScaleSetRollingUpgrades.beginCancelAndWait(this.resourceGroupName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response)
            }
        );
        // success (cancel ExtensionUpgrade)
    }

    //getLatest
    public async virtualMachineScaleSetRollingUpgrades_getLatest(){
        this.compute_client.virtualMachineScaleSetRollingUpgrades.getLatest(this.resourceGroupName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response)
            }
        );
        //success
    }

    //virtualMachineScaleSets.beginDeleteAndWait
    public async virtualMachineScaleSet_delete(){
        await this.compute_client.virtualMachineScaleSets.beginDeleteAndWait(this.resourceGroupName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response)
            }
        );
    }
}

class virtualMachineScaleSetVMsExamples{
    private compute_client = new compute.ComputeManagementClient(credential, subscriptionId);
    private network_client = new NetworkManagementClient(credential,subscriptionId);
    private resourceGroupName = "myjstest";
    private virtual_machine_scale_set_name = "virtualmachinescaleset";
    private networkName = "networknamex";
    private subnetName = "subnetworknamex";
    private location = "eastus";

    // virtualNetworks.beginCreateOrUpdateAndWait
    // subnets.beginCreateOrUpdateAndWait
    public async createVirtualNetwork(groupName: any,location: any,networkName: any,subnetName: any){
        const parameter: VirtualNetwork = {
            location: location,
            addressSpace: {
                addressPrefixes: ["10.0.0.0/16"]
            }
        }
        await this.network_client.virtualNetworks.beginCreateOrUpdateAndWait(groupName,networkName,parameter).then(
            result => {
                console.log(result);
            }
        );
        const subnet_info = await this.network_client.subnets.beginCreateOrUpdateAndWait(groupName,networkName,subnetName,{"addressPrefix":"10.0.0.0/24"}); 
        console.log(subnet_info);
        return subnet_info
    }

    // virtualMachineScaleSets.createOrUpdate
    public async virtualMachineScaleSets_createOrUpdate(){
        var subnet: any;
        if(await this.createVirtualNetwork(this.resourceGroupName,this.location,this.networkName,this.subnetName)){
            subnet = await this.createVirtualNetwork(this.resourceGroupName,this.location,this.networkName,this.subnetName);
        }else{
            subnet = "subneturi";
        }

        const parameter : compute.VirtualMachineScaleSet = {
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
                    adminPassword: "000000000000000000",
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
                                     id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceGroupName + "/providers/Microsoft.Network/virtualNetworks/" + this.networkName + "/subnets/" + this.subnetName + ""
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
        }
        // start an extension rolling upgrade.post
        await this.compute_client.virtualMachineScaleSets.beginCreateOrUpdateAndWait(this.resourceGroupName,this.virtual_machine_scale_set_name,parameter).then(
            response => {
                console.log(response)
            }
        );
    } 

    //virtualMachineScaleSetVMs.getInstanceView
    public async virtualMachineScaleSetVMs_getInstanceView(){
        let instanceId: number;
        let e: boolean ;
        for(let i = 0 ; i < 4 ; i++ ){
            e = false;
            try{
                await this.compute_client.virtualMachineScaleSetVMs.getInstanceView(this.resourceGroupName,this.virtual_machine_scale_set_name,i.toString())
            }catch(error){
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
        console.log(instanceId);
        return instanceId;
    }

    //virtualMachineScaleSetVMs.list
    public async virtualMachineScaleSetVMs_list(){
        // try{
        //     await this.createVirtualMachineScaleSet();  // create for one time
        // }catch(error){
        //     console.log(error)
        // }
        for await (let item of this.compute_client.virtualMachineScaleSetVMs.list(this.resourceGroupName,this.virtual_machine_scale_set_name)){
            console.log(item);
        }
    }

    //virtualMachineScaleSetVMs.get
    public async virtualMachineScaleSetVMs_get(){
        const instanceId = await this.virtualMachineScaleSetVMs_getInstanceView();
        await this.compute_client.virtualMachineScaleSetVMs.get(this.resourceGroupName,this.virtual_machine_scale_set_name,instanceId.toString()).then(
            response => {
                console.log(response);
            }
        );
    }

    //virtualMachineScaleSetVMs.update
    public async virtualMachineScaleSetVMs_update(){
        const instanceId = await this.virtualMachineScaleSetVMs_getInstanceView();
        const parameter: compute.VirtualMachineScaleSetVM = {
            location: this.location,
            tags: {
                "department": "HR"
            }
        };
        await this.compute_client.virtualMachineScaleSetVMs.beginUpdateAndWait(this.resourceGroupName,this.virtual_machine_scale_set_name,instanceId.toString(),parameter).then(
            response => {
                console.log(response);
                //success
            }
        );
    }

    //virtualMachineScaleSetVMs.restart
    public async virtualMachineScaleSetVMs_restart(){
        const instanceId = await this.virtualMachineScaleSetVMs_getInstanceView();
        await this.compute_client.virtualMachineScaleSetVMs.beginRestartAndWait(this.resourceGroupName,this.virtual_machine_scale_set_name,instanceId.toString()).then(
            response => {
                console.log(response);
            }
        )
    }

    //virtualMachineScaleSetVMs.powerOff
    public async virtualMachineScaleSetVMs_powerOff(){
        const instanceId = await this.virtualMachineScaleSetVMs_getInstanceView();
        await this.compute_client.virtualMachineScaleSetVMs.beginPowerOffAndWait(this.resourceGroupName,this.virtual_machine_scale_set_name,instanceId.toString()).then(
            response => {
                console.log(response);
                //success
            }
        )
    }

    // virtualMachineScaleSetVMs.start
    public async virtualMachineScaleSetVMs_start(){
        const instanceId = await this.virtualMachineScaleSetVMs_getInstanceView();
        await this.compute_client.virtualMachineScaleSetVMs.beginStartAndWait(this.resourceGroupName,this.virtual_machine_scale_set_name,instanceId.toString()).then(
            response => {
                console.log(response);
                //success
            }
        )
    }

    //virtualMachineScaleSetVMs.runCommand
    public async virtualMachineScaleSetVMs_runCommand(){
        const instanceId = await this.virtualMachineScaleSetVMs_getInstanceView();
        const parameter: compute.RunCommandInput = {
            commandId: "RunPowerShellScript"
        };
        await this.compute_client.virtualMachineScaleSetVMs.beginRunCommandAndWait(this.resourceGroupName,this.virtual_machine_scale_set_name,instanceId.toString(),parameter).then(
            response => {
                console.log(response);
                //success
            }
        );
    }

    //virtualMachineScaleSetVMs.deallocate
    public async virtualMachineScaleSetVMs_deallocate(){
        const instanceId = await this.virtualMachineScaleSetVMs_getInstanceView()
        await this.compute_client.virtualMachineScaleSetVMs.beginDeallocateAndWait(this.resourceGroupName,this.virtual_machine_scale_set_name,instanceId.toString()).then(
            response => {
                console.log(response);
                //success
            }
        )
    }

    //virtualMachineScaleSetVMs.reimage
    public async virtualMachineScaleSetVMs_reimage(){
        const instanceId = await this.virtualMachineScaleSetVMs_getInstanceView();
        await this.compute_client.virtualMachineScaleSetVMs.beginReimageAndWait(this.resourceGroupName,this.virtual_machine_scale_set_name,instanceId.toString()).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineScaleSetVMs.reimageAll
    public async virtualMachineScaleSetVMs_reimageAll(){
        const instanceId = await this.virtualMachineScaleSetVMs_getInstanceView();
        await this.compute_client.virtualMachineScaleSetVMs.beginReimageAllAndWait(this.resourceGroupName,this.virtual_machine_scale_set_name,instanceId.toString()).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineScaleSetVMs.delete
    public async virtualMachineScaleSetVMs_delete(){
        const instanceId = await this.virtualMachineScaleSetVMs_getInstanceView();
        await this.compute_client.virtualMachineScaleSetVMs.beginDeleteAndWait(this.resourceGroupName,this.virtual_machine_scale_set_name,instanceId.toString()).then(
            response => {
                console.log(response);
            }
        )
    }

    //virtualMachineScaleSets.deleteInstances
    public async virtualMachineScaleSets_deleteInstances(){
        const instanceId = await this.virtualMachineScaleSetVMs_getInstanceView();
        const parameter: compute.VirtualMachineScaleSetVMInstanceRequiredIDs = {
            instanceIds: [
                instanceId.toString(),
            ]
        };
        await this.compute_client.virtualMachineScaleSets.beginDeleteInstancesAndWait(this.resourceGroupName,this.virtual_machine_scale_set_name,parameter).then(
            response => {
                console.log(response);
                //success
            }
        )
    }

    //virtualMachineScaleSets.delete
    public async virtualMachineScaleSets_delete(){
        await this.compute_client.virtualMachineScaleSets.beginDeleteAndWait(this.resourceGroupName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response);
                //success
            }
        )
    }

}

class virtualMachineScaleSetsExamples{
    private compute_client = new compute.ComputeManagementClient(credential, subscriptionId);
    private network_client = new NetworkManagementClient(credential,subscriptionId);
    private resourceGroupName = "myjstest";
    private virtual_machine_scale_set_name = "virtualmachinescaleset2";
    private vmss_extension_name = "vmssextensionx";
    private networkName = "networknamex";
    private subnetName = "subnetworknamex";
    private location = "eastus";

    // virtualNetworks.beginCreateOrUpdateAndWait
    // subnets.beginCreateOrUpdateAndWait
    public async createVirtualNetwork(groupName: any,location: any,networkName: any,subnetName: any){
        const parameter: VirtualNetwork = {
            location: location,
            addressSpace: {
                addressPrefixes: ["10.0.0.0/16"]
            }
        }
        await this.network_client.virtualNetworks.beginCreateOrUpdateAndWait(groupName,networkName,parameter).then(
            result => {
                console.log(result);
            }
        );
        const subnet_info = await this.network_client.subnets.beginCreateOrUpdateAndWait(groupName,networkName,subnetName,{"addressPrefix":"10.0.0.0/24"}); 
        console.log(subnet_info);
        return subnet_info
    }

    // virtualMachineScaleSets.createOrUpdate
    public async virtualMachineScaleSets_createOrUpdate(){
        var subnet: any;
        if(await this.createVirtualNetwork(this.resourceGroupName,this.location,this.networkName,this.subnetName)){
            subnet = await this.createVirtualNetwork(this.resourceGroupName,this.location,this.networkName,this.subnetName);
        }else{
            subnet = "subneturi";
        }

        const parameter : compute.VirtualMachineScaleSet = {
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
                    adminPassword: "000000000000000000",
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
                                     id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceGroupName + "/providers/Microsoft.Network/virtualNetworks/" + this.networkName + "/subnets/" + this.subnetName + ""
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
        }
        // start an extension rolling upgrade.post
        await this.compute_client.virtualMachineScaleSets.beginCreateOrUpdateAndWait(this.resourceGroupName,this.virtual_machine_scale_set_name,parameter).then(
            response => {
                console.log(response)
            }
        );
    } 

    //virtualMachineScaleSets.get
    public async virtualMachineScaleSets_get(){
        await this.compute_client.virtualMachineScaleSets.get(this.resourceGroupName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineScaleSets.getInstanceView
    public async virtualMachineScaleSets_getInstanceView(){
        await this.compute_client.virtualMachineScaleSets.getInstanceView(this.resourceGroupName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response);
            }
        )
    }

    //virtualMachineScaleSets.list
    public async virtualMachineScaleSets_list(){
        for await (let item of this.compute_client.virtualMachineScaleSets.list(this.resourceGroupName)){
            console.log(item)
        }
    }

    //virtualMachineScaleSets.listAll
    public async virtualMachineScaleSets_listAll(){
        for await (let item of this.compute_client.virtualMachineScaleSets.listAll()){
            console.log(item);
        }
    }

    //virtualMachineScaleSets.listSkus
    public async virtualMachineScaleSets_listSkus(){
        for await (let item of this.compute_client.virtualMachineScaleSets.listSkus(this.resourceGroupName,this.virtual_machine_scale_set_name)){
            console.log
        }
    }

    //virtualMachineScaleSets.update
    public async virtualMachineScaleSets_update(){
        const parameter: compute.VirtualMachineScaleSetUpdate= {
            sku: {
                tier: "Standard",
                capacity: 2,
                name: "Standard_D1_v2"
            },
            upgradePolicy: {
                mode: "Manual"
            }
        };
        await this.compute_client.virtualMachineScaleSets.beginUpdateAndWait(this.resourceGroupName,this.virtual_machine_scale_set_name,parameter).then(
            response => {
                console.log(response);
            }
        )
    }

    //virtualMachineScaleSets.restart
    public async virtualMachineScaleSets_restart(){
        await this.compute_client.virtualMachineScaleSets.beginRestartAndWait(this.resourceGroupName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response);
            }
        )
    }

    //virtualMachineScaleSets.powerOff
    public async virtualMachineScaleSets_powerOff(){
        await this.compute_client.virtualMachineScaleSets.beginPowerOffAndWait(this.resourceGroupName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response);
            }
        )
    }

    //virtualMachineScaleSets.start
    public async virtualMachineScaleSets_start(){
        // before start should poweroff scale set
        await this.compute_client.virtualMachineScaleSets.beginStartAndWait(this.resourceGroupName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response);
            }
        )
    }

    //virtualMachineScaleSets.redeploy
    public async virtualMachineScaleSets_redeploy(){
        try{
            await this.compute_client.virtualMachineScaleSets.beginRedeployAndWait(this.resourceGroupName,this.virtual_machine_scale_set_name).then(
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
    public async virtualMachineScaleSets_deallocate(){
        await this.compute_client.virtualMachineScaleSets.beginDeallocateAndWait(this.resourceGroupName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response);
            }
        )
    }

    //virtualMachineScaleSets.delete
    public async virtualMachineScaleSets_delete(){
        await this.compute_client.virtualMachineScaleSets.beginDeleteAndWait(this.resourceGroupName,this.virtual_machine_scale_set_name).then(
            response => {
                console.log(response);
            }
        )
    }

    //virtualMachineScaleSetExtensions.createOrUpdate
    public async virtualMachineScaleSetExtensions_createOrUpdate(){
        await this.virtualMachineScaleSets_createOrUpdate();
        const parameter:compute.VirtualMachineScaleSetExtension = {
            autoUpgradeMinorVersion: true,
            publisher: "Microsoft.Azure.NetworkWatcher",
            typePropertiesType:  "NetworkWatcherAgentWindows",
            typeHandlerVersion: "1.4"
        };
        await this.compute_client.virtualMachineScaleSetExtensions.beginCreateOrUpdateAndWait(this.resourceGroupName,this.virtual_machine_scale_set_name,this.vmss_extension_name,parameter).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineScaleSetExtensions.get
    public async virtualMachineScaleSetExtensions_get(){
        await this.compute_client.virtualMachineScaleSetExtensions.get(this.resourceGroupName,this.virtual_machine_scale_set_name,this.vmss_extension_name).then(
            response => {
                console.log(response)
            }
        )
    }

    //virtualMachineScaleSetExtensions.list
    public async virtualMachineScaleSetExtensions_list(){
        for await (let item of this.compute_client.virtualMachineScaleSetExtensions.list(this.resourceGroupName,this.virtual_machine_scale_set_name)){
            console.log(item);
        }
    }

    //virtualMachineScaleSetExtensions.update
    public async virtualMachineScaleSetExtensions_update(){
        // before update should poweroff scale set
        const parameter:compute.VirtualMachineScaleSetExtensionUpdate = {
            autoUpgradeMinorVersion: true,
        };
        await this.compute_client.virtualMachineScaleSetExtensions.beginUpdateAndWait(this.resourceGroupName,this.virtual_machine_scale_set_name,this.vmss_extension_name,parameter).then(
            response => {
                console.log(response);
            }
        )
    }

    //virtualMachineScaleSetExtensions.delete
    public async virtualMachineScaleSetExtensions_delete(){
        await this.compute_client.virtualMachineScaleSetExtensions.beginDeleteAndWait(this.resourceGroupName,this.virtual_machine_scale_set_name,this.vmss_extension_name).then(
            response => {
                console.log(response);
            }
        )
    }
}