import * as resources from "@azure/arm-resources";
import { ManagementGroupsAPI } from "azure-arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();

class TestTagsOperation {

    private resourceClient = new resources.ResourceManagementClient(credential,subscriptionId);
    private tagName = "tagyyy";
    private tagValue = "valueyyy";

    //tags.createOrUpdate
    public async tags_createOrUpdate(){

        await this.resourceClient.tagsOperations.createOrUpdate(this.tagName).then(
            result => {
                console.log(result);
                // console.assert(result.tagName === this.tagName);
            }
        )
    }

    //tags.list
    public async tags_list(){

        for await (let item of this.resourceClient.tagsOperations.list()){
            console.log(item)
        }
    }

    //tags.createOrUpdateValue
    public async tags_createOrUpdateValue(){
        await this.resourceClient.tagsOperations.createOrUpdateValue(this.tagName,this.tagValue).then(
            result => {
                console.log(result);
                // console.assert(result.tagValue === this.tagValue);
            }
        )
    }

    //tags.deleteValue
    public async tags_deleteValue(){
        await this.resourceClient.tagsOperations.deleteValue(this.tagName,this.tagValue).then(
            result => {
                console.log(result);
            }
        )
    }

    //tags.delete
    public async tags_delete(){
        await this.resourceClient.tagsOperations.delete(this.tagName).then(
            result => {
                console.log(result);
            }
        )
    }

    //tags.createOrUpdateAtScope
    public async tags_createOrUpdateAtScope(){
        const scope = "subscriptions/" + subscriptionId;
        const parameter:resources.TagsResource = {
            properties: {
                tags: {
                    tagkey1: "tagValue1",
                    tagkey2: "tagValue2"
                }
            }
        };
        await this.resourceClient.tagsOperations.createOrUpdateAtScope(scope,parameter).then(
            result => {
                console.log(result)
            }
        )
    }

    //tags.getAtScope
    public async tags_getAtScope(){
        const scope = "subscriptions/" + subscriptionId;
        await this.resourceClient.tagsOperations.getAtScope(scope).then(
            result => {
                console.log(result)
            }
        )
    }

    //tags.updateAtScope
    public async tags_updateAtScope(){
        const scope = "subscriptions/" + subscriptionId;
        const parameter:resources.TagsPatchResource = {
            operation: "Delete",
            properties: {
                tags: {
                    tagkey1: "tagValue1"
                }
            }
        };
        await this.resourceClient.tagsOperations.updateAtScope(scope,parameter).then(
            result => {
                console.log(result)
            }
        )
        
    }

    //tags.deleteAtScope
    public async tags_deleteAtScope(){
        const scope = "subscriptions/" + subscriptionId;
        await this.resourceClient.tagsOperations.deleteAtScope(scope).then(
            result => {
                console.log(result)
            }
        )
        
    }
}

class TestResourceGroup {

    private resourceClient = new resources.ResourceManagementClient(credential,subscriptionId);
    private resourceGroupName = "myjstest";

    //resourceGroups.createOrUpdate
    public async resourceGroups_createOrUpdate(){
        const parameter:resources.ResourceGroup = {
            location: "eastus",
            tags: {
                tag1: "value1"
            }
        };
        await this.resourceClient.resourceGroups.createOrUpdate(this.resourceGroupName,parameter).then(
            result => {
                console.log(result);
            }
        )
    }

    //resourceGroups.get
    public async resourceGroups_get(){
        const result_get = await this.resourceClient.resourceGroups.get(this.resourceGroupName);
        console.log(result_get);  
        // console.assert(result_get.name === this.resourceGroupName);
        // console.assert(result_get.tags.tag1 === "value1"); 
    }

    //resourceGroups.checkExistence   
    public async resourceGroups_checkExistence(){
        const result_check = await this.resourceClient.resourceGroups.checkExistence(this.resourceGroupName);
        console.log(result_check);  //{ body: true }
        // console.assert(result_check.body === true);

        const unknowGroup = "unknowGroup";
        const result_check_unknowGroup = await this.resourceClient.resourceGroups.checkExistence(unknowGroup);
        console.log(result_check_unknowGroup)  //{ body: false }
        // console.assert(result_check_unknowGroup.body === true);  // Assertion failed
    }

    //resourceGroups.list
    public async resourceGroups_list(){
        const result_list = new Array();
        for await (let item of this.resourceClient.resourceGroups.list()){
            // console.log(item);
            result_list.push(item);
        }
        console.log(result_list);
        // console.assert(result_list.length > 0);
    }

    //resourceGroups.list  
    public async resourceGroups_listTop2(){
        const result_list_top2 = new Array();
        for await (let item of this.resourceClient.resourceGroups.list({top: 2})){ //The value for top of '2,2' is not an integer; the value must be an integer value greater than zero.
            // console.log(item);
            result_list_top2.push(item);
        }
        console.log(result_list_top2);
        // console.assert(result_list_top2.length === 2);
    }

    //resourceGroups.update
    public async resourceGroups_update(){
        const parameter:resources.ResourceGroupPatchable = {
            tags: {
                tag1: "value1",
                tag2: "value2"
            }
        };
        const result_patch = await this.resourceClient.resourceGroups.update(this.resourceGroupName,parameter);
        console.log(result_patch);  //{... , tags: { tag1: 'value1', tag2: 'value2' } , ...}
        // console.assert(result_patch.tags.tag1 === "value1");
        // console.assert(result_patch.tags.tag2 === "value2");
    }

    //resources.listByResourceGroup
    public async resources_listByResourceGroup(){
        for await (let item of this.resourceClient.resources.listByResourceGroup(this.resourceGroupName)){
            console.log(item);
        }
    }

    //resourceGroups.exportTemplate   (not test)
    public async resourceGroups_beginExportTemplateAndWait(){
        const parameter:resources.ExportTemplateRequest = {
            resources: ["*"]
        };
        const result_template = await this.resourceClient.resourceGroups.beginExportTemplateAndWait(this.resourceGroupName,parameter);
        console.log(result_template)
        // console.assert(result_template.template === "template" );
    }

    // resourceGroups.delete 
    public async resourceGroups_delete(){
        await this.resourceClient.resourceGroups.beginDeleteAndWait(this.resourceGroupName).then(
            result => {
                console.log(result)
            }
        )
    }
}

class TestResources {

    private resourceClient = new resources.ResourceManagementClient(credential,subscriptionId);
    private resourceGroupName = "myjstest";
    private resourceName_1 = "myresource_1";
    private resourceName_2 = "myresource_2";
    private resourceId = "/subscriptions/"+ subscriptionId +"/resourceGroups/"+this.resourceGroupName+"/providers/"+"Microsoft.Compute"+"/"+"availabilitySets"+"/"+this.resourceName_2;
    private newResourceGroup = "jsNewGroup";
    private newResourceId = "/subscriptions/"+ subscriptionId +"/resourceGroups/"+this.newResourceGroup+"/providers/"+"Microsoft.Compute"+"/"+"availabilitySets"+"/"+this.resourceName_2;

    //resources.checkExistence  
    public async resources_checkExistence(){
        const resources_exist = await this.resourceClient.resources.checkExistence(this.resourceGroupName,"Microsoft.Compute","","availabilitySets",this.resourceName_1,"2019-12-01");
        console.log(resources_exist);  // { body: false }
        // console.assert(resources_exist.body === false);
    }

    //resources.checkExistenceById   
    public async test_resources_checkExistenceById(){
        const resourceId = this.resourceId;
        const resources_exist_by_id = await this.resourceClient.resources.checkExistenceById(resourceId,"2019-12-01");
        console.log(resources_exist_by_id);
    }

    //resources.createOrUpdateById 
    public async resources_createOrUpdateById(){
        const parameter:resources.GenericResource = {
            location: "eastus"
        };
        const craete_result_by_id = await this.resourceClient.resources.beginCreateOrUpdateByIdAndWait(this.resourceId,"2019-12-01",parameter)
        console.log(craete_result_by_id)
    }

    //resources.createOrUpdate 
    public async resources_createOrUpdate(){
        const create_result = await this.resourceClient.resources.beginCreateOrUpdateAndWait(this.resourceGroupName,"Microsoft.Compute","","availabilitySets",this.resourceName_1,"2019-12-01",{location: "eastus"});
        console.log(create_result);
        // console.assert(create_result.name === this.resourceName_1);
    }

    //resources.get
    public async resources_get(){
        const get_result = await this.resourceClient.resources.get(this.resourceGroupName,"Microsoft.Compute","","availabilitySets",this.resourceName_1,"2019-12-01");
        console.log(get_result);
        // console.assert(get_result.name === this.resourceName_1);
    }

    //resources.getById
    public async resources_getById(){
        const get_result = await this.resourceClient.resources.getById(this.resourceId,"2019-12-01");
        console.log(get_result);
        // console.assert(get_result.name === this.resourceName_1);
        return get_result;
    }

    //resources.list
    public async resources_list(){
        const resultArray = new Array();
        for await (let item of this.resourceClient.resources.list({filter: "name eq '"+ this.resourceName_1+"'"})){
            // console.log(item);
            resultArray.push(item);
        }
        console.log(resultArray)
        // console.assert(resultArray.length == 1);
    }

    //resources.listByResourceGroup
    public async resources_listByResourceGroup(){
        const resultArray = new Array();
        for await (let item of this.resourceClient.resources.listByResourceGroup(this.resourceGroupName)){
            // console.log(item);
            resultArray.push(item);
        }
        console.log(resultArray);
    }

    //resources.validateMoveResources  
    public async resources_validateMoveResources(){
        const new_Group = await this.resourceClient.resourceGroups.createOrUpdate(this.newResourceGroup,{location: "eastus"});
        console.log(new_Group);
        const result_getById = await this.resources_getById();
        const parameter:resources.ResourcesMoveInfo = {
            resources: new Array(result_getById.id),
            targetResourceGroup: new_Group.id
        };
        const result_move = await this.resourceClient.resources.beginValidateMoveResourcesAndWait(this.resourceGroupName,parameter);
        console.log(result_move);
    }

    //resources.moveResources
    public async resources_moveResources(){
        const get_new_Group = await this.resourceClient.resourceGroups.get(this.newResourceGroup);
        console.log(get_new_Group);
        const result_getById = await this.resources_getById();
        const parameter:resources.ResourcesMoveInfo = {
            resources: new Array(result_getById.id),
            targetResourceGroup: get_new_Group.id
        };
        const result_move = await this.resourceClient.resources.beginMoveResourcesAndWait(this.resourceGroupName,parameter);
        console.log(result_move);
    }

    //resources.update (LRO)
    public async resources_update(){
        const result_update = await this.resourceClient.resources.beginUpdateAndWait(this.resourceGroupName,"Microsoft.Compute","","availabilitySets",this.resourceName_1,"2019-12-01",{tags: {tag1: 'value1'}});
        console.log(result_update);
    }

    //resources.updateById (LRO)
    public async resources_updateById(){
        const result_update_by_id = await this.resourceClient.resources.beginUpdateByIdAndWait(this.newResourceId,"2019-12-01",{tags: { tag1: "value1"}});
        console.log(result_update_by_id);
    }

    //resources.delete 
    public async resources_delete(){
        const result_delete = await this.resourceClient.resources.beginDeleteAndWait(this.newResourceGroup,"Microsoft.Compute","","availabilitySets",this.resourceName_1,"2019-12-01");
        console.log(result_delete);
    }

    //resources.deleteById 
    public async resources_deleteById(){
        const result_delete_by_id = await this.resourceClient.resources.beginDeleteByIdAndWait(this.newResourceId,"2019-12-01");
        console.log(result_delete_by_id);
    }
}

class TestDeploymentsBasic {

    private resourceClient = new resources.ResourceManagementClient(credential,subscriptionId);
    private resourceGroupName = "myjstest";
    private depolymentName = "jstestdeployment";

    // return templeate
    public createTmpleate(){
        const template: any = {
            $schema: "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
            contentVersion: "1.0.0.0",
            parameters: {
                location: {
                    type: "String",
                    allowedValues: [
                        "East US",
                        "West US",
                        "West Europe",
                        "East Asia",
                        "South East Asia"
                    ],
                    metaData: {
                        description: "Location to deploy to"
                    }
                }
            },
            resources: [
                {
                    type: "Microsoft.Compute/availabilitySets",
                    name: "availabilitySet1",
                    apiVersion: "2019-12-01",
                    location: "[parameters('location')]",
                    properties: {}
                }
            ],
            outPuts: {
                myParamete: {
                    type: "object",
                    value: "[reference('Microsoft.Compute/availabilitySets/availabilitySet1')]"
                }
            }
        }
        return template;
    }

    //deployments.checkExistence 
    public async deployments_checkExistence(){
        const deployment_check = await this.resourceClient.deployments.checkExistence(this.resourceGroupName,this.depolymentName);
        console.log(deployment_check);
        // console.assert(deployment_check.body === false);
    }

    //deployments.calculateTemplateHash
    public async deployments_calculateTemplateHash(){
        const template = this.createTmpleate();
        await this.resourceClient.deployments.calculateTemplateHash(template).then(
            result => {
                console.log(result);
            }
        );
    }

    //deployments.createOrUpdate  
    public async deployments_createOrUpdate(){
        const parameter : resources.Deployment = {
            // location: "West US",
            properties: {
                mode: "Incremental",
                template: this.createTmpleate(),
                parameters: {location: {value: "East US"}}
            }
        };
        const createResult_deployment = await this.resourceClient.deployments.beginCreateOrUpdateAndWait(this.resourceGroupName,this.depolymentName,parameter);
        console.log(createResult_deployment);
        // console.assert(createResult_deployment.name === this.depolymentName);
    }

    //deployments.listByResourceGroup
    public async deployments_listByResourceGroup(){
        const listArray_deployment = new Array();
        for await (let item of this.resourceClient.deployments.listByResourceGroup(this.resourceGroupName)){
            listArray_deployment.push(item);
            // console.log(item);
        }
        console.log(listArray_deployment);
        // console.assert(listArray_deployment.length == 1);
        // console.assert(listArray_deployment[0].name === this.depolymentName);
    }

    //deployments.get
    public async deployments_get(){
        const getResult_deployment = await this.resourceClient.deployments.get(this.resourceGroupName,this.depolymentName);
        console.log(getResult_deployment);
        // console.assert(getResult_deployment.name === this.depolymentName);
    }

    //deployments.whatIf 
    public async deployments_whatIf(){
        await this.resourceClient.deployments.beginWhatIfAndWait(this.resourceGroupName,this.depolymentName,{properties: {mode: "Incremental",template: this.createTmpleate()}}).then(
            result => {
                console.log(result);
            }
        )
    }

    //deployments.cancel
    public async deployments_cancel(){
        await this.resourceClient.deployments.cancel(this.resourceGroupName,this.depolymentName).catch(
            result => {
                console.log(result.code);
                // console.assert(result.code === "DeploymentCannotBeCancelled");
            }
        );  
    }

    //deployments.validate 
    public async deployments_validate(){
        const parameter : resources.Deployment = {
            // location: "West US",
            properties: {
                mode: "Incremental",
                template: this.createTmpleate(),
                parameters: {location: {value: "East US"}}
            }
        };
        const validation = await this.resourceClient.deployments.beginValidateAndWait(this.resourceGroupName,this.depolymentName,parameter);
        console.log(validation);
        // if(validation.properties{
        //     continue
        // }else{
        //     console.assert(false)
        // }
    }

    //deployments.exportTemplate
    public async deployments_exportTemplate(){
        const result_export = await this.resourceClient.deployments.exportTemplate(this.resourceGroupName,this.depolymentName);
        console.log(result_export);
        // if(!result_export.template){
        //     console.assert(false);
        // }
    }

    //deployments.delete  
    public async deployments_delete(){
        const result_delete = await this.resourceClient.deployments.beginDeleteAndWait(this.resourceGroupName,this.depolymentName);
        console.log(result_delete);
    }

    //deploymentOperations.list
    public async deploymentOperations_list(){
        const listArray_deploymentOperations = new Array();
        for await (let item of this.resourceClient.deploymentOperations.list(this.resourceGroupName,this.depolymentName)){
            listArray_deploymentOperations.push(item);
            // console.log(item);
        }
        console.log(listArray_deploymentOperations);
        // console.assert(listArray_deploymentOperations.length > 1);
        return listArray_deploymentOperations;
    }

    //deploymentOperations.get
    public async deploymentOperations_get(){
        const operationId = await this.deploymentOperations_list();
        const getResult_deployment = await this.resourceClient.deploymentOperations.get(this.resourceGroupName,this.depolymentName,operationId[0].operationId);
        console.log(getResult_deployment);
        // console.assert(getResult_deployment.operationId === operationId[0].operationId);
    }

}

class TestDeploymentAtScope {

    private resourceClient = new resources.ResourceManagementClient(credential,subscriptionId);
    private resourceGroupName = "myjstest";
    private scope = "subscriptions/"+subscriptionId+"/resourcegroups/"+this.resourceGroupName;
    private depolymentName = "jstestdeployment";
    private templeate = (new TestDeploymentsBasic).createTmpleate();

    //deployments.checkExistenceAtScope   
    public async deployments_checkExistenceAtScope(){
        const result_exist = await this.resourceClient.deployments.checkExistenceAtScope(this.resourceGroupName,this.depolymentName);
        console.log(result_exist);
        // console.assert(result_exist.body === false);
    }

    //deployments.createOrUpdateAtScope  
    public async deployments_createOrUpdateAtScope(){
        const parameter : resources.Deployment = {
            // location: "West US",
            properties: {
                mode: "Incremental",
                template: this.templeate,
                parameters: {location: {value: "East US"}}
            }
        };
        const createResult_deployment = await this.resourceClient.deployments.beginCreateOrUpdateAtScopeAndWait(this.scope,this.depolymentName,parameter);
        console.log(createResult_deployment);
        // console.assert(createResult_deployment.name === this.depolymentName);
    }

    //deployments.listAtScope
    public async deployments_listAtScope(){
        const listArray = new Array();
        for await (let item of this.resourceClient.deployments.listAtScope(this.scope)){
            listArray.push(item);
            // console.log(item);
        }
        console.log(listArray);
        // console.assert(listArray.length == 1);
        // console.assert(listArray[0].name === this.depolymentName);
    }

    //deployments.getAtScope
    public async deployments_getAtScope(){
        const getResult = await this.resourceClient.deployments.getAtScope(this.scope,this.depolymentName);
        console.log(getResult);
        // console.assert(getResult.name === this.depolymentName);
    }

    //deployments.cancelAtScope
    public async deployments_cancelAtScope(){
        await this.resourceClient.deployments.cancelAtScope(this.scope,this.depolymentName).catch(
            result => {
                console.log(result.code);
                // console.assert(result.code === "DeploymentCannotBeCancelled");
            }
        );  
    }

    //deployments.validateAtScope 
    public async deployments_validateAtScope(){
        const parameter : resources.Deployment = {
            // location: "West US",
            properties: {
                mode: "Incremental",
                template: this.templeate,
                parameters: {location: {value: "East US"}}
            }
        };
        const validation = await this.resourceClient.deployments.beginValidateAtScopeAndWait(this.scope,this.depolymentName,parameter);
        console.log(validation);
        // if(validation.properties{
        //     continue
        // }else{
        //     console.assert(false)
        // }
    }

    //deployments.exportTemplateAtScope
    public async deployments_exportTemplateAtScope(){
        const result_export = await this.resourceClient.deployments.exportTemplateAtScope(this.scope,this.depolymentName);
        console.log(result_export);
        // if(!result_export.template){
        //     console.assert(false);
        // }
    }

    //deployments.deleteAtScope 
    public async deployments_deleteAtScope(){
        const result_delete = await this.resourceClient.deployments.beginDeleteAtScopeAndWait(this.scope,this.depolymentName);
        console.log(result_delete);
    }

    //deploymentOperations.listAtScope
    public async deploymentOperations_listAtScope(){
        const listArray = new Array();
        for await (let item of this.resourceClient.deploymentOperations.listAtScope(this.scope,this.depolymentName)){
            listArray.push(item);
            // console.log(item);
        }
        console.log(listArray);
        // console.assert(listArray.length > 1);
        return listArray;
    }

    //deploymentOperations.getAtScope
    public async deploymentOperations_getAtScope(){
        const operationId = await this.deploymentOperations_listAtScope();
        const getResult = await this.resourceClient.deploymentOperations.getAtScope(this.scope,this.depolymentName,operationId[0].operationId);
        // console.log(getResult);
        console.assert(getResult.operationId === operationId[0].operationId);
    }
}

class TestDeploymentsAtManagementGroup {

    private resourceClient = new resources.ResourceManagementClient(credential,subscriptionId);
    private managementgroupsAPI = new ManagementGroupsAPI(credential);
    private depolymentName = "jstestlinked";
    private group_id = "20000000-0001-0000-0000-000000000123456";

    //managementGroups.createOrUpdate 
    public async managementGroups_createOrUpdate(){
        const result_create = await this.managementgroupsAPI.managementGroups.beginCreateOrUpdateAndWait(this.group_id,{name: this.group_id})
        console.log(result_create);
    }

    //deployments.checkExistenceAtManagementGroupScope  
    public async deployments_checkExistenceAtManagementGroupScope(){
        const result_exist = await this.resourceClient.deployments.checkExistenceAtManagementGroupScope(this.group_id,this.depolymentName);
        console.log(result_exist);
        // console.assert(result_exist.body === false);
    }

    //deployments.createOrUpdateAtManagementGroupScope 
    public async deployments_createOrUpdateAtManagementGroupScope(){
        const parameter:resources.ScopedDeployment = {
            location: "West US",
            properties: {
                mode:"Incremental",
                templateLink: {
                    uri: "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/100-blank-template/azuredeploy.json"
                },
                parametersLink: {
                    uri: "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/100-blank-template/azuredeploy.json"
                }
            }
        };
        const resultCreate_depolyments = await this.resourceClient.deployments.beginCreateOrUpdateAtManagementGroupScopeAndWait(this.group_id,this.depolymentName,parameter);
        console.log(resultCreate_depolyments);
        // console.assert(resultCreate_depolyments.name === this.depolymentName);
    }

    //deployments.listAtManagementGroupScope
    public async deployments_listAtManagementGroupScope(){
        const listArray = new Array();
        for await (let item of this.resourceClient.deployments.listAtManagementGroupScope(this.group_id)){
            listArray.push(item);
            console.log(item);
        }
        // console.assert(listArray.length == 1);
        // console.assert(listArray[0].name === this.depolymentName);
    }

     //deployments.getAtManagementGroupScope
     public async deployments_getAtManagementGroupScope(){
        const getResult = await this.resourceClient.deployments.getAtManagementGroupScope(this.group_id,this.depolymentName);
        console.log(getResult);
        // console.assert(getResult.name === this.depolymentName);
    }

    //deployments.cancelAtManagementGroupScope
    public async deployments_cancelAtManagementGroupScope(){
        await this.resourceClient.deployments.cancelAtManagementGroupScope(this.group_id,this.depolymentName).catch(
            result => {
                console.log(result.code);
                // console.assert(result.code === "DeploymentCannotBeCancelled");
            }
        );  
    }

    //deployments.validateAtManagementGroupScope 
    public async deployments_validateAtManagementGroupScope(){
        const parameter:resources.ScopedDeployment = {
            location: "West US",
            properties: {
                mode:"Incremental",
                templateLink: {
                    uri: "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/100-blank-template/azuredeploy.json"
                },
                parametersLink: {
                    uri: "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/100-blank-template/azuredeploy.json"
                }
            }
        };
        const validation = await this.resourceClient.deployments.beginValidateAtManagementGroupScopeAndWait(this.group_id,this.depolymentName,parameter);
        console.log(validation);
        // if(validation.properties{
        //     continue
        // }else{
        //     console.assert(false)
        // }
    }

    //deployments.exportTemplateAtManagementGroupScope
    public async deployments_exportTemplateAtManagementGroupScope(){
        const result_export = await this.resourceClient.deployments.exportTemplateAtManagementGroupScope(this.group_id,this.depolymentName);
        console.log(result_export);
        // if(!result_export.template){
        //     console.assert(false);
        // }
    }

    //deployments.deleteAtManagementGroupScope 
    public async deployments_deleteAtManagementGroupScope(){
        const result_delete = await this.resourceClient.deployments.beginDeleteAtManagementGroupScopeAndWait(this.group_id,this.depolymentName);
        console.log(result_delete);
    }

    //deploymentOperations.listAtManagementGroupScope
    public async deploymentOperations_listAtManagementGroupScope(){
        const listArray = new Array();
        for await (let item of this.resourceClient.deploymentOperations.listAtManagementGroupScope(this.group_id,this.depolymentName)){
            listArray.push(item);
            // console.log(item);
        }
        // console.assert(listArray.length > 0);
        console.log(listArray);
        return listArray;
    }

    //deploymentOperations.getAtManagementGroupScope
    public async deploymentOperations_getAtManagementGroupScope(){
        const operationId = await this.deploymentOperations_listAtManagementGroupScope();
        const getResult = await this.resourceClient.deploymentOperations.getAtManagementGroupScope(this.group_id,this.depolymentName,operationId[0].operationId);
        console.log(getResult);
        // console.assert(getResult.operationId === operationId[0].operationId);
    }  
}

class TestDeploymentsAtSubscription {

    private resourceClient = new resources.ResourceManagementClient(credential,subscriptionId);
    private depolymentName = "jstestlinked";

    //return deployment_parameter
    private create_deployment_parameter(){
        const parameter:resources.Deployment = {
            location: "West US",
            properties: {
                mode: "Incremental",
                templateLink: {
                    uri: "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/100-blank-template/azuredeploy.json"
                },
                parametersLink: {
                    uri: "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/100-blank-template/azuredeploy.json"
                }
            }
        };
        return parameter;
    }
 
    //deployments.checkExistenceAtSubscriptionScope  
    public async deployments_checkExistenceAtSubscriptionScope(){
        const result_exist = await this.resourceClient.deployments.checkExistenceAtSubscriptionScope(this.depolymentName);
        console.log(result_exist)
        // console.assert(result_exist.body === false);
    }

    //deployments.createOrUpdateAtSubscriptionScope 
    public async deployments_createOrUpdateAtSubscriptionScope(){
        const parameter = this.create_deployment_parameter();
        const resultCreate_depolyments = await this.resourceClient.deployments.beginCreateOrUpdateAtSubscriptionScopeAndWait(this.depolymentName,parameter);
        console.log(resultCreate_depolyments);
        // console.assert(resultCreate_depolyments.name === this.depolymentName);
    }

    //deployments.listAtSubscriptionScope
    public async deployments_listAtSubscriptionScope(){
        const listArray = new Array();
        for await (let item of this.resourceClient.deployments.listAtSubscriptionScope()){
            listArray.push(item);
            // console.log(item);
        }
        console.log(listArray);
        // console.assert(listArray.length >= 1);
        // console.assert(listArray[2].name === this.depolymentName);
    }

    //deployments.getAtSubscriptionScope
    public async deployments_getAtSubscriptionScope(){
        const getResult = await this.resourceClient.deployments.getAtSubscriptionScope(this.depolymentName);
        console.log(getResult);
        // console.assert(getResult.name === this.depolymentName);
    }

    //deployments.whatIfAtSubscriptionScope 
    public async deployments_whatIfAtSubscriptionScope(){
        const result = await this.resourceClient.deployments.beginWhatIfAtSubscriptionScopeAndWait(this.depolymentName,this.create_deployment_parameter());
        console.log(result);
    }

    //deployments.cancelAtSubscriptionScope
    public async deployments_cancelAtSubscriptionScope(){
        await this.resourceClient.deployments.cancelAtSubscriptionScope(this.depolymentName).catch(
            result => {
                console.log(result.code);
                // console.assert(result.code === "DeploymentCannotBeCancelled");
            }
        );  
    }

    //deployments.validateAtSubscriptionScope 
    public async deployments_validateAtSubscriptionScope(){
        const validation = await this.resourceClient.deployments.beginValidateAtSubscriptionScopeAndWait(this.depolymentName,this.create_deployment_parameter());
        console.log(validation);
        // if(validation.properties{
        //     continue
        // }else{
        //     console.assert(false)
        // }
    }

    //deployments.exportTemplateAtSubscriptionScope
    public async deployments_exportTemplateAtSubscriptionScope(){
        const result_export = await this.resourceClient.deployments.exportTemplateAtSubscriptionScope(this.depolymentName);
        console.log(result_export);
        // if(!result_export.template){
        //     console.assert(false);
        // }
    }

    //deployments.deleteAtSubscriptionScope 
    public async deployments_deleteAtSubscriptionScope(){
        const result_delete = await this.resourceClient.deployments.beginDeleteAtSubscriptionScopeAndWait(this.depolymentName);
        console.log(result_delete);
    }

    //deploymentOperations.listAtSubscriptionScope
    public async deploymentOperations_listAtSubscriptionScope(){
        const listArray = new Array();
        for await (let item of this.resourceClient.deploymentOperations.listAtSubscriptionScope(this.depolymentName)){
            listArray.push(item);
            // console.log(item);
        }
        console.log(listArray);
        // console.assert(listArray.length > 0);
        return listArray;
    }

    //deploymentOperations.getAtSubscriptionScope
    public async deploymentOperations_getAtSubscriptionScope(){
        const operationId = await this.deploymentOperations_listAtSubscriptionScope();
        const getResult = await this.resourceClient.deploymentOperations.getAtSubscriptionScope(this.depolymentName,operationId[0].operationId);
        console.log(getResult);
        // console.assert(getResult.operationId === operationId[0].operationId);
    }

    
}

class TestDeploymentsAtTenant {

    private resourceClient = new resources.ResourceManagementClient(credential,subscriptionId);
    private depolymentName = "jstestlinked";

    //return deployment_parameter
    private create_deployment_parameter(){
        const parameter:resources.ScopedDeployment = {
            location: "West US",
            properties: {
                mode: "Incremental",
                templateLink: {
                    uri: "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/100-blank-template/azuredeploy.json"
                },
                parametersLink: {
                    uri: "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/100-blank-template/azuredeploy.json"
                }
            }
        };
        return parameter;
    }

    //deployments.checkExistenceAtTenantScope  
    public async deployments_checkExistenceAtTenantScope(){
        const result_exist = await this.resourceClient.deployments.checkExistenceAtTenantScope(this.depolymentName);
        console.log(result_exist);
        // console.assert(result_exist.body === false);
    }

    //deployments.createOrUpdateAtTenantScope 
    // The client 'f76f8265-6a7e-4a2f-91d8-502be6f04df4' with object id 'f76f8265-6a7e-4a2f-91d8-502be6f04df4' does not have authorization 
    // to perform action 'Microsoft.Resources/deployments/write' over scope '/providers/Microsoft.Resources/deployments/jstestlinked' 
    // or the scope is invalid. If access was recently granted, please refresh your credentials.
    public async deployments_createOrUpdateAtTenantScope(){
        const parameter = this.create_deployment_parameter();
        const resultCreate_depolyments = await this.resourceClient.deployments.beginCreateOrUpdateAtTenantScopeAndWait(this.depolymentName,parameter);
        console.log(resultCreate_depolyments);
        // console.assert(resultCreate_depolyments.name === this.depolymentName);
    }

    //deployments.listAtTenantScope
    public async deployments_listAtTenantScope(){
        const listArray = new Array();
        for await (let item of this.resourceClient.deployments.listAtTenantScope()){
            listArray.push(item);
            // console.log(item);
        }
        console.log(listArray);
        // console.assert(listArray.length >= 1);
        // console.assert(listArray[2].name === this.depolymentName);
    }

    //deployments.getAtTenantScope
    public async deployments_getAtTenantScope(){
        const getResult = await this.resourceClient.deployments.getAtTenantScope(this.depolymentName);
        console.log(getResult);
        // console.assert(getResult.name === this.depolymentName);
    }

    //deployments.whatIfAtTenantScope 
    public async deployments_whatIfAtTenantScope(){
        const result = await this.resourceClient.deployments.beginWhatIfAtTenantScopeAndWait(this.depolymentName,this.create_deployment_parameter());
        console.log(result);
    }

    //deploymentOperations.listAtTenantScope
    public async deploymentOperations_listAtTenantScope(){
        const listArray = new Array();
        for await (let item of this.resourceClient.deploymentOperations.listAtTenantScope(this.depolymentName)){
            listArray.push(item);
            // console.log(item);
        }
        console.assert(listArray.length > 0);
        return listArray;
    }

    //deploymentOperations.getAtTenantScope
    public async deploymentOperations_getAtTenantScope(){
        const operationId = await this.deploymentOperations_listAtTenantScope();
        const getResult = await this.resourceClient.deploymentOperations.getAtTenantScope(this.depolymentName,operationId[0].operationId);
        console.log(getResult);
        // console.assert(getResult.operationId === operationId[0].operationId);
    }

    //deployments.cancelAtTenantScope
    public async deployments_cancelAtTenantScope(){
        await this.resourceClient.deployments.cancelAtTenantScope(this.depolymentName).catch(
            result => {
                // console.log(result.code);
                console.assert(result.code === "DeploymentCannotBeCancelled");
            }
        );  
    }

    //deployments.validateAtTenantScope 
    public async test_deployments_validateAtTenantScope(){
        const validation = await this.resourceClient.deployments.beginValidateAtTenantScopeAndWait(this.depolymentName,this.create_deployment_parameter());
        console.log(validation);
        // if(validation.properties{
        //     continue
        // }else{
        //     console.assert(false)
        // }
    }

    //deployments.exportTemplateAtTenantScope
    public async test_deployments_exportTemplateAtTenantScope(){
        const result_export = await this.resourceClient.deployments.exportTemplateAtTenantScope(this.depolymentName);
        // console.log(result_export);
        if(!result_export.template){
            console.assert(false);
        }
    }

    //deployments.deleteAtTenantScope 
    public async test_deployments_deleteAtTenantScope(){
        const result_delete = await this.resourceClient.deployments.beginDeleteAtTenantScopeAndWait(this.depolymentName);
        console.log(result_delete);
    }
}

class TestProviderOperations {

    private resourceClient = new resources.ResourceManagementClient(credential,subscriptionId);

    //providers.get
    public async providers_get(){
        const getArray = new Array();
        const result_get = await this.resourceClient.providers.get("Microsoft.Web")
        // console.log(result_get)
        for(let item of result_get.resourceTypes){
            if(item.resourceType === "sites"){
                // console.log(item.locations);
                if(item.locations.indexOf("West US") >= 0){
                    console.assert(true);
                    break;
                }else{
                    console.assert(false);
                    break;
                }
            }
        }
    }

    //providers.unregister providers.get providers.register
    public async get_register(){
        await this.resourceClient.providers.unregister("Microsoft.Search").then(
            result => {
                console.log(result);
            }
        );
        await this.resourceClient.providers.get("Microsoft.Search").then(
            result => {
                console.log(result);
            }
        );
        await this.resourceClient.providers.register("Microsoft.Search").then(
            result => {
                console.log(result);
            }
        );
    }

    //providers.list
    public async providers_list(){
        const resultArray = new Array();
        for await (let item of this.resourceClient.providers.list()){
            console.log(item);
            resultArray.push(item);
        }
    }

    //providers.getAtTenantScope providers.listAtTenantScope
    public async providers_getAtTenantScope(){
        await this.resourceClient.providers.getAtTenantScope("Microsoft.Web").then(
            result => {
                console.log(result);
            }
        )
        const resultArray = new Array();
        for await (let item of this.resourceClient.providers.listAtTenantScope()){
            console.log(item);
            resultArray.push(item);
        }
    }

    //operations.list
    // RestError: The resource type 'operations' could not be found in the namespace 'Microsoft.Resources' for api version '2020-10-01'. 
    // The supported api-versions are '2015-01-01'
    public async operations_list(){
        const resultArray = new Array();
        for await (let item of this.resourceClient.operations.list()){
            console.log(item);
            resultArray.push(item)
        }
    }
}

