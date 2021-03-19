import { ResourceManagementClient,TagsResource,TagsPatchResource,ResourceGroup,ResourceGroupPatchable,
    ExportTemplateRequest,GenericResource,ResourcesMoveInfo,Deployment,ScopedDeployment } from "@azure/arm-resources";
import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();


class TestTagsOperation {

    private resourceClient = new ResourceManagementClient(credential,subscriptionId);
    private tagName = "tagyyy";
    private tagValue = "valueyyy";

    //tags.createOrUpdate
    public async tags_createOrUpdate(){

        const tag = await this.resourceClient.tags.createOrUpdate(this.tagName);
        console.assert(tag.tagName === this.tagName);  // if not same will return  "Assertion failed"
    }

    //tags.createOrUpdateValue
    public async testtags_createOrUpdateValue(){
        const tag = await this.resourceClient.tags.createOrUpdateValue(this.tagName,this.tagValue);
        console.assert(tag.tagValue === this.tagValue);
    }

    //tags.list
    public async test_tags_list(){
        const tag_list = new Array();
        for await (let item of this.resourceClient.tags.list()){
            tag_list.push(item);
            // console.log(item)
        }
        // console.log("------------------------------------")
        // console.log(tag_list)  // values will change into object after push into tag_list
        console.assert(tag_list.length > 0);
        for(let tag of tag_list){
            if(tag.tagName){
                continue;
            }else{
                console.assert(false)
            }
        }
    }

    //tags.deleteValue
    public async test_tags_deleteValue(){
        await this.resourceClient.tags.deleteValue(this.tagName,this.tagValue).then(
            result => {
                console.log(result);
            }
        )
    }

    //tags.delete
    public async test_tags_delete(){
        await this.resourceClient.tags.delete(this.tagName).then(
            result => {
                console.log(result);
            }
        )
    }

    //tags.createOrUpdateAtScope
    public async test_tags_createOrUpdateAtScope(){
        const scope = "subscriptions/" + subscriptionId;
        const parameter:TagsResource = {
            properties: {
                tags: {
                    tagkey1: "tagValue1",
                    tagkey2: "tagValue2"
                }
            }
        };
        await this.resourceClient.tags.createOrUpdateAtScope(scope,parameter).then(
            result => {
                console.log(result)
            }
        )
    }

    //tags.getAtScope
    public async test_tags_getAtScope(){
        const scope = "subscriptions/" + subscriptionId;
        await this.resourceClient.tags.getAtScope(scope).then(
            result => {
                console.log(result)
            }
        )
    }

    //tags.updateAtScope
    public async test_tags_updateAtScope(){
        const scope = "subscriptions/" + subscriptionId;
        const parameter:TagsPatchResource = {
            operation: "Delete",
            properties: {
                tags: {
                    tagkey1: "tagValue1"
                }
            }
        };
        await this.resourceClient.tags.updateAtScope(scope,parameter).then(
            result => {
                console.log(result)
            }
        )
    }


}

class TestResourceGroup {
    private resourceClient = new ResourceManagementClient(credential,subscriptionId);
    private resourceGroupName = "myjstest";

    //resourceGroups.createOrUpdate
    public async test_resourceGroups_createOrUpdate(){
        const parameter:ResourceGroup = {
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
    public async test_resourceGroups_get(){
        const result_get = await this.resourceClient.resourceGroups.get(this.resourceGroupName);
        // console.log(result_get);  
        console.assert(result_get.name === this.resourceGroupName);
        console.assert(result_get.tags.tag1 === "value1");
        
    }

    //resourceGroups.checkExistence
    public async test_resourceGroups_checkExistence(){
        const result_check = await this.resourceClient.resourceGroups.checkExistence(this.resourceGroupName);
        // console.log(result_check);  //{ body: true }
        console.assert(result_check.body === true);

        const unknowGroup = "unknowGroup";
        const result_check_unknowGroup = await this.resourceClient.resourceGroups.checkExistence(unknowGroup);
        // console.log(result_check_unknowGroup)  //{ body: false }
        console.assert(result_check_unknowGroup.body === true);  // Assertion failed
    }

    //resourceGroups.list
    public async test_resourceGroups_list(){
        const result_list = new Array();
        for await (let item of this.resourceClient.resourceGroups.list()){
            // console.log(item);
            result_list.push(item);
        }
        // console.log(result_list);
        console.assert(result_list.length > 0);
    }
    
    //resourceGroups.list
    public async test_resourceGroups_listTop2(){
        const result_list_top2 = new Array();
        // for await (let item of this.resourceClient.resourceGroups.list({top: 2})){ //The value for top of '2,2' is not an integer; the value must be an integer value greater than zero.
            // console.log(item);
            // result_list_top2.push(item);
        // }
        // console.log(result_list);
        // console.assert(result_list_top2.length === 2);
    }

    //resourceGroups.update
    public async test_resourceGroups_update(){
        const parameter:ResourceGroupPatchable = {
            tags: {
                tag1: "value1",
                tag2: "value2"
            }
        };
        const result_patch = await this.resourceClient.resourceGroups.update(this.resourceGroupName,parameter);
        // console.log(result_patch);  //{... , tags: { tag1: 'value1', tag2: 'value2' } , ...}
        console.assert(result_patch.tags.tag1 === "value1");
        console.assert(result_patch.tags.tag2 === "value2");
    }

    //resources.listByResourceGroup
    public async test_resources_listByResourceGroup(){
        for await (let item of this.resourceClient.resources.listByResourceGroup(this.resourceGroupName)){
            console.log(item);
        }
    }

    //resourceGroups.exportTemplate   (not test)
    public async test_resourceGroups_exportTemplate(){
        const parameter:ExportTemplateRequest = {
            resources: ["*"]
        };
        const result_template = await this.resourceClient.resourceGroups.exportTemplate(this.resourceGroupName,parameter);
        console.log(result_template)
        // console.assert(result_template.template === "template" );
    }

    // resourceGroups.delete (tested but LRO)
    public async test_resourceGroups_delete(){
        await this.resourceClient.resourceGroups.delete(this.resourceGroupName).then(
            result => {
                console.log(result)
            }
        )
    }
}

class TestResources {

    private resourceClient = new ResourceManagementClient(credential,subscriptionId);
    private resourceGroupName = "myjstest";
    private resourceName_1 = "myresource_1";
    private resourceName_2 = "myresource_2";
    private resourceId = "/subscriptions/"+ subscriptionId +"/resourceGroups/"+this.resourceGroupName+"/providers/"+"Microsoft.Compute"+"/"+"availabilitySets"+"/"+this.resourceName_2;
    private newResourceGroup = "jsNewGroup";
    private newResourceId = "/subscriptions/"+ subscriptionId +"/resourceGroups/"+this.newResourceGroup+"/providers/"+"Microsoft.Compute"+"/"+"availabilitySets"+"/"+this.resourceName_2;

    //resources.checkExistence
    public async test_resources_checkExistence(){
        const resources_exist = await this.resourceClient.resources.checkExistence(this.resourceGroupName,"Microsoft.Compute","","availabilitySets",this.resourceName_1,"2019-12-01");
        // console.log(resources_exist);  // { body: false }
        console.assert(resources_exist.body === false);
    }

    //resources.checkExistenceById
    public async test_resources_checkExistenceById(){
        const resourceId = this.resourceId;
        const resources_exist_by_id = await this.resourceClient.resources.checkExistenceById(resourceId,"2019-12-01");
        console.log(resources_exist_by_id);
    }

    //resources.createOrUpdateById (but LRO)
    public async test_resources_createOrUpdateById(){
        const parameter:GenericResource = {
            location: "eastus"
        };
        const craete_result_by_id = await this.resourceClient.resources.createOrUpdateById(this.resourceId,"2019-12-01",parameter)
        console.log(craete_result_by_id)
    }

    //resources.createOrUpdate (but LRO)
    public async test_resources_createOrUpdate(){
        const create_result = await this.resourceClient.resources.createOrUpdate(this.resourceGroupName,"Microsoft.Compute","","availabilitySets",this.resourceName_1,"2019-12-01",{location: "eastus"});
        console.log(create_result);
        // console.assert(create_result.name === this.resourceName_1);
    }

    //resources.get
    public async test_resources_get(){
        const get_result = await this.resourceClient.resources.get(this.resourceGroupName,"Microsoft.Compute","","availabilitySets",this.resourceName_1,"2019-12-01");
        // console.log(get_result);
        console.assert(get_result.name === this.resourceName_1);
    }

    //resources.getById
    public async test_resources_getById(){
        const get_result = await this.resourceClient.resources.getById(this.resourceId,"2019-12-01");
        console.log(get_result);
        // console.assert(get_result.name === this.resourceName_1);
        return get_result;
    }

    //resources.list
    public async test_resources_list(){
        const resultArray = new Array();
        for await (let item of this.resourceClient.resources.list({filter: "name eq '"+ this.resourceName_1+"'"})){
            // console.log(item);
            resultArray.push(item);
        }
        console.assert(resultArray.length == 1);
    }

    //resources.listByResourceGroup
    public async test_resources_listByResourceGroup(){
        const resultArray = new Array();
        for await (let item of this.resourceClient.resources.listByResourceGroup(this.resourceGroupName)){
            // console.log(item);
            resultArray.push(item);
        }
        console.log(resultArray);
    }

    //resources.validateMoveResources (LRO)
    public async test_resources_validateMoveResources(){
        const new_Group = await this.resourceClient.resourceGroups.createOrUpdate(this.newResourceGroup,{location: "eastus"});
        console.log(new_Group);
        const result_getById = await this.test_resources_getById();
        const parameter:ResourcesMoveInfo = {
            resources: new Array(result_getById.id),
            targetResourceGroup: new_Group.id
        };
        const result_move = await this.resourceClient.resources.validateMoveResources(this.resourceGroupName,parameter);
        console.log(result_move);
    }

    //resources.moveResources (LRO)
    public async test_resources_moveResources(){
        const get_new_Group = await this.resourceClient.resourceGroups.get(this.newResourceGroup);
        console.log(get_new_Group);
        const result_getById = await this.test_resources_getById();
        const parameter:ResourcesMoveInfo = {
            resources: new Array(result_getById.id),
            targetResourceGroup: get_new_Group.id
        };
        const result_move = await this.resourceClient.resources.moveResources(this.resourceGroupName,parameter);
        console.log(result_move);
    }

    //resources.update (LRO)
    public async test_resources_update(){
        const result_update = await this.resourceClient.resources.update(this.resourceGroupName,"Microsoft.Compute","","availabilitySets",this.resourceName_1,"2019-12-01",{tags: {tag1: 'value1'}});
        console.log(result_update);
    }

    //resources.updateById (LRO)
    public async test_resources_updateById(){
        const result_update_by_id = await this.resourceClient.resources.updateById(this.newResourceId,"2019-12-01",{tags: { tag1: "value1"}});
        console.log(result_update_by_id);
    }

    //resources.delete (LRO)
    public async test_resources_delete(){
        const result_delete = await this.resourceClient.resources.delete(this.newResourceGroup,"Microsoft.Compute","","availabilitySets",this.resourceName_1,"2019-12-01");
        console.log(result_delete);
    }

    //resources.deleteById (LRO)
    public async test_resources_deleteById(){
        const result_delete_by_id = await this.resourceClient.resources.deleteById(this.newResourceId,"2019-12-01");
        console.log(result_delete_by_id);
    }

    //resourceGroups.delete (lro)
    public async test_resourceGroups_delete(){
        const result_group_delete = await this.resourceClient.resourceGroups.delete(this.newResourceGroup);
        console.log(result_group_delete);
    }
}

class TestDeploymentsBasic {

    private resourceClient = new ResourceManagementClient(credential,subscriptionId);
    private resourceGroupName = "myjstest";
    private depolymentName = "jstestdeployment";

    // return templeate
    private createTmpleate(){
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
    public async test_deployments_checkExistence(){
        const deployment_check = await this.resourceClient.deployments.checkExistence(this.resourceGroupName,this.depolymentName);
        // console.log(deployment_check);
        console.assert(deployment_check.body === false);
    }

    //deployments.calculateTemplateHash
    // public async test_deployments_calculateTemplateHash(){
    //     await this.resourceClient.deployments.calculateTemplateHash();
    // }

    //deployments.createOrUpdate (LRO)
    public async test_deployments_createOrUpdate(){
        const parameter : Deployment = {
            // location: "West US",
            properties: {
                mode: "Incremental",
                template: this.createTmpleate(),
                parameters: {location: {value: "East US"}}
            }
        };
        const createResult_deployment = await this.resourceClient.deployments.createOrUpdate(this.resourceGroupName,this.depolymentName,parameter);
        console.log(createResult_deployment);
        // console.assert(createResult_deployment.name === this.depolymentName);
    }

    //deployments.listByResourceGroup
    public async test_deployments_listByResourceGroup(){
        const listArray_deployment = new Array();
        for await (let item of this.resourceClient.deployments.listByResourceGroup(this.resourceGroupName)){
            listArray_deployment.push(item);
            // console.log(item);
        }
        console.assert(listArray_deployment.length == 1);
        console.assert(listArray_deployment[0].name === this.depolymentName);
    }

    //deployments.get
    public async test_deployments_get(){
        const getResult_deployment = await this.resourceClient.deployments.get(this.resourceGroupName,this.depolymentName);
        // console.log(getResult_deployment);
        console.assert(getResult_deployment.name === this.depolymentName);
    }

    //deployments.whatIf (LRO)
    public async test_deployments_whatIf(){
        await this.resourceClient.deployments.whatIf(this.resourceGroupName,this.depolymentName,{properties: {mode: "Incremental",template: this.createTmpleate()}}).then(
            result => {
                console.log(result);
            }
        )
    }

    //deploymentOperations.list
    public async test_deploymentOperations_list(){
        const listArray_deploymentOperations = new Array();
        for await (let item of this.resourceClient.deploymentOperations.list(this.resourceGroupName,this.depolymentName)){
            listArray_deploymentOperations.push(item);
            // console.log(item);
        }
        console.assert(listArray_deploymentOperations.length > 1);
        return listArray_deploymentOperations;
    }

    //deploymentOperations.get
    public async test_deploymentOperations_get(){
        const operationId = await this.test_deploymentOperations_list();
        const getResult_deployment = await this.resourceClient.deploymentOperations.get(this.resourceGroupName,this.depolymentName,operationId[0].operationId);
        // console.log(getResult_deployment);
        console.assert(getResult_deployment.operationId === operationId[0].operationId);
    }

    //deployments.cancel
    public async test_deployments_cancel(){
        await this.resourceClient.deployments.cancel(this.resourceGroupName,this.depolymentName).catch(
            result => {
                // console.log(result.code);
                console.assert(result.code === "DeploymentCannotBeCancelled");
            }
        );  
    }

    //deployments.validate (LRO)
    public async test_deployments_validate(){
        const parameter : Deployment = {
            // location: "West US",
            properties: {
                mode: "Incremental",
                template: this.createTmpleate(),
                parameters: {location: {value: "East US"}}
            }
        };
        const validation = await this.resourceClient.deployments.validate(this.resourceGroupName,this.depolymentName,parameter);
        console.log(validation);
        // if(validation.properties{
        //     continue
        // }else{
        //     console.assert(false)
        // }
    }

    //deployments.exportTemplate
    public async test_deployments_exportTemplate(){
        const result_export = await this.resourceClient.deployments.exportTemplate(this.resourceGroupName,this.depolymentName);
        // console.log(result_export);
        if(!result_export.template){
            console.assert(false);
        }
    }

    //deployments.delete (LRO)
    public async test_deployments_delete(){
        const result_delete = await this.resourceClient.deployments.delete(this.resourceGroupName,this.depolymentName);
        console.log(result_delete);
    }
}

class TestDeploymentAtScope {

    private resourceClient = new ResourceManagementClient(credential,subscriptionId);
    private resourceGroupName = "myjstest";
    private scope = "subscriptions/"+subscriptionId+"/resourcegroups/"+this.resourceGroupName;
    private depolymentName = "jstestdeployment";

    // return template
    private createTmpleate(){
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

    //deployments.checkExistenceAtScope
    public async test_deployments_checkExistenceAtScope(){
        const result_exist = await this.resourceClient.deployments.checkExistenceAtScope(this.resourceGroupName,this.depolymentName);
        // console.log(result_exist);
        console.assert(result_exist.body === false);
    }

    //deployments.createOrUpdateAtScope (LRO)
    public async test_deployments_createOrUpdateAtScope(){
        const parameter : Deployment = {
            // location: "West US",
            properties: {
                mode: "Incremental",
                template: this.createTmpleate(),
                parameters: {location: {value: "East US"}}
            }
        };
        const createResult_deployment = await this.resourceClient.deployments.createOrUpdateAtScope(this.scope,this.depolymentName,parameter);
        console.log(createResult_deployment);
        // console.assert(createResult_deployment.name === this.depolymentName);
    }

    //deployments.listAtScope
    public async test_deployments_listAtScope(){
        const listArray = new Array();
        for await (let item of this.resourceClient.deployments.listAtScope(this.scope)){
            listArray.push(item);
            // console.log(item);
        }
        console.assert(listArray.length == 1);
        console.assert(listArray[0].name === this.depolymentName);
    }

    //deployments.getAtScope
    public async test_deployments_getAtScope(){
        const getResult = await this.resourceClient.deployments.getAtScope(this.scope,this.depolymentName);
        // console.log(getResult);
        console.assert(getResult.name === this.depolymentName);
    }

    //deploymentOperations.listAtScope
    public async test_deploymentOperations_listAtScope(){
        const listArray = new Array();
        for await (let item of this.resourceClient.deploymentOperations.listAtScope(this.scope,this.depolymentName)){
            listArray.push(item);
            // console.log(item);
        }
        console.assert(listArray.length > 1);
        return listArray;
    }

    //deploymentOperations.getAtScope
    public async test_deploymentOperations_getAtScope(){
        const operationId = await this.test_deploymentOperations_listAtScope();
        const getResult = await this.resourceClient.deploymentOperations.getAtScope(this.scope,this.depolymentName,operationId[0].operationId);
        // console.log(getResult);
        console.assert(getResult.operationId === operationId[0].operationId);
    }

    //deployments.cancelAtScope
    public async test_deployments_cancelAtScope(){
        await this.resourceClient.deployments.cancelAtScope(this.scope,this.depolymentName).catch(
            result => {
                // console.log(result.code);
                console.assert(result.code === "DeploymentCannotBeCancelled");
            }
        );  
    }

    //deployments.validateAtScope (LRO)
    public async test_deployments_validateAtScope(){
        const parameter : Deployment = {
            // location: "West US",
            properties: {
                mode: "Incremental",
                template: this.createTmpleate(),
                parameters: {location: {value: "East US"}}
            }
        };
        const validation = await this.resourceClient.deployments.validateAtScope(this.scope,this.depolymentName,parameter);
        console.log(validation);
        // if(validation.properties{
        //     continue
        // }else{
        //     console.assert(false)
        // }
    }

    //deployments.exportTemplateAtScope
    public async test_deployments_exportTemplateAtScope(){
        const result_export = await this.resourceClient.deployments.exportTemplateAtScope(this.scope,this.depolymentName);
        // console.log(result_export);
        if(!result_export.template){
            console.assert(false);
        }
    }

    //deployments.deleteAtScope (LRO)
    public async test_deployments_deleteAtScope(){
        const result_delete = await this.resourceClient.deployments.deleteAtScope(this.scope,this.depolymentName);
        console.log(result_delete);
    }
}

class TestDeploymentsAtManagementGroup {

    private resourceClient = new ResourceManagementClient(credential,subscriptionId);
    private managementgroupsAPI = new ManagementGroupsAPI(credential);
    private depolymentName = "jstestlinked";
    private group_id = "20000000-0001-0000-0000-000000000123456";

    //managementGroups.createOrUpdate (LRO)
    private async test_managementGroups_createOrUpdate(){
        const result_create = await this.managementgroupsAPI.managementGroups.createOrUpdate(this.group_id,{name: this.group_id})
        console.log(result_create);
    }

    //deployments.checkExistenceAtManagementGroupScope
    public async test_deployments_checkExistenceAtManagementGroupScope(){
        const result_exist = await this.resourceClient.deployments.checkExistenceAtManagementGroupScope(this.group_id,this.depolymentName);
        // console.log(result_exist);
        console.assert(result_exist.body === false);
    }

    //deployments.createOrUpdateAtManagementGroupScope (LRO)
    public async test_deployments_createOrUpdateAtManagementGroupScope(){
        const parameter:ScopedDeployment = {
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
        const resultCreate_depolyments = await this.resourceClient.deployments.createOrUpdateAtManagementGroupScope(this.group_id,this.depolymentName,parameter);
        console.log(resultCreate_depolyments);
        // console.assert(resultCreate_depolyments.name === this.depolymentName);
    }

    //deployments.listAtManagementGroupScope
    public async test_deployments_listAtManagementGroupScope(){
        const listArray = new Array();
        for await (let item of this.resourceClient.deployments.listAtManagementGroupScope(this.group_id)){
            listArray.push(item);
            // console.log(item);
        }
        console.assert(listArray.length == 1);
        console.assert(listArray[0].name === this.depolymentName);
    }

    //deployments.getAtManagementGroupScope
    public async test_deployments_getAtManagementGroupScope(){
        const getResult = await this.resourceClient.deployments.getAtManagementGroupScope(this.group_id,this.depolymentName);
        // console.log(getResult);
        console.assert(getResult.name === this.depolymentName);
    }

    //deploymentOperations.listAtManagementGroupScope
    public async test_deploymentOperations_listAtManagementGroupScope(){
        const listArray = new Array();
        for await (let item of this.resourceClient.deploymentOperations.listAtManagementGroupScope(this.group_id,this.depolymentName)){
            listArray.push(item);
            // console.log(item);
        }
        console.assert(listArray.length > 0);
        return listArray;
    }

    //deploymentOperations.getAtManagementGroupScope
    public async test_deploymentOperations_getAtManagementGroupScope(){
        const operationId = await this.test_deploymentOperations_listAtManagementGroupScope();
        const getResult = await this.resourceClient.deploymentOperations.getAtManagementGroupScope(this.group_id,this.depolymentName,operationId[0].operationId);
        // console.log(getResult);
        console.assert(getResult.operationId === operationId[0].operationId);
    }

    //deployments.cancelAtManagementGroupScope
    public async test_deployments_cancelAtManagementGroupScope(){
        await this.resourceClient.deployments.cancelAtManagementGroupScope(this.group_id,this.depolymentName).catch(
            result => {
                // console.log(result.code);
                console.assert(result.code === "DeploymentCannotBeCancelled");
            }
        );  
    }

    //deployments.validateAtManagementGroupScope (LRO)
    public async test_deployments_validateAtManagementGroupScope(){
        const parameter:ScopedDeployment = {
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
        const validation = await this.resourceClient.deployments.validateAtManagementGroupScope(this.group_id,this.depolymentName,parameter);
        console.log(validation);
        // if(validation.properties{
        //     continue
        // }else{
        //     console.assert(false)
        // }
    }

    //deployments.exportTemplateAtManagementGroupScope
    public async test_deployments_exportTemplateAtManagementGroupScope(){
        const result_export = await this.resourceClient.deployments.exportTemplateAtManagementGroupScope(this.group_id,this.depolymentName);
        // console.log(result_export);
        if(!result_export.template){
            console.assert(false);
        }
    }

    //deployments.deleteAtManagementGroupScope (LRO)
    public async test_deployments_deleteAtManagementGroupScope(){
        const result_delete = await this.resourceClient.deployments.deleteAtManagementGroupScope(this.group_id,this.depolymentName);
        console.log(result_delete);
    }
}

class TestDeploymentsAtSubscription {

    private resourceClient = new ResourceManagementClient(credential,subscriptionId);
    private depolymentName = "jstestlinked";

    //return deployment_parameter
    private create_deployment_parameter(){
        const parameter:Deployment = {
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
    public async test_deployments_checkExistenceAtSubscriptionScope(){
        const result_exist = await this.resourceClient.deployments.checkExistenceAtSubscriptionScope(this.depolymentName);
        // console.log(result_exist);
        console.assert(result_exist.body === false);
    }

    //deployments.createOrUpdateAtSubscriptionScope (LRO)
    public async test_deployments_createOrUpdateAtSubscriptionScope(){
        const parameter = this.create_deployment_parameter();
        const resultCreate_depolyments = await this.resourceClient.deployments.createOrUpdateAtSubscriptionScope(this.depolymentName,parameter);
        console.log(resultCreate_depolyments);
        // console.assert(resultCreate_depolyments.name === this.depolymentName);
    }

    //deployments.listAtSubscriptionScope
    public async test_deployments_listAtSubscriptionScope(){
        const listArray = new Array();
        for await (let item of this.resourceClient.deployments.listAtSubscriptionScope()){
            listArray.push(item);
            // console.log(item);
        }
        console.assert(listArray.length >= 1);
        console.assert(listArray[2].name === this.depolymentName);
    }

    //deployments.getAtSubscriptionScope
    public async test_deployments_getAtSubscriptionScope(){
        const getResult = await this.resourceClient.deployments.getAtSubscriptionScope(this.depolymentName);
        // console.log(getResult);
        console.assert(getResult.name === this.depolymentName);
    }

    //deployments.whatIfAtSubscriptionScope (LRO)
    public async test_deployments_whatIfAtSubscriptionScope(){
        const result = await this.resourceClient.deployments.whatIfAtSubscriptionScope(this.depolymentName,this.create_deployment_parameter());
        console.log(result);
    }

    //deploymentOperations.listAtSubscriptionScope
    public async test_deploymentOperations_listAtSubscriptionScope(){
        const listArray = new Array();
        for await (let item of this.resourceClient.deploymentOperations.listAtSubscriptionScope(this.depolymentName)){
            listArray.push(item);
            // console.log(item);
        }
        console.assert(listArray.length > 0);
        return listArray;
    }

    //deploymentOperations.getAtSubscriptionScope
    public async test_deploymentOperations_getAtSubscriptionScope(){
        const operationId = await this.test_deploymentOperations_listAtSubscriptionScope();
        const getResult = await this.resourceClient.deploymentOperations.getAtSubscriptionScope(this.depolymentName,operationId[0].operationId);
        // console.log(getResult);
        console.assert(getResult.operationId === operationId[0].operationId);
    }

    //deployments.cancelAtSubscriptionScope
    public async test_deployments_cancelAtSubscriptionScope(){
        await this.resourceClient.deployments.cancelAtSubscriptionScope(this.depolymentName).catch(
            result => {
                // console.log(result.code);
                console.assert(result.code === "DeploymentCannotBeCancelled");
            }
        );  
    }

    //deployments.validateAtSubscriptionScope (LRO)
    public async test_deployments_validateAtSubscriptionScope(){
        const validation = await this.resourceClient.deployments.validateAtSubscriptionScope(this.depolymentName,this.create_deployment_parameter());
        console.log(validation);
        // if(validation.properties{
        //     continue
        // }else{
        //     console.assert(false)
        // }
    }

    //deployments.exportTemplateAtSubscriptionScope
    public async test_deployments_exportTemplateAtSubscriptionScope(){
        const result_export = await this.resourceClient.deployments.exportTemplateAtSubscriptionScope(this.depolymentName);
        // console.log(result_export);
        if(!result_export.template){
            console.assert(false);
        }
    }

    //deployments.deleteAtSubscriptionScope (LRO)
    public async test_deployments_deleteAtSubscriptionScope(){
        const result_delete = await this.resourceClient.deployments.deleteAtSubscriptionScope(this.depolymentName);
        console.log(result_delete);
    }
}

class TestDeploymentsAtTenant {

    private resourceClient = new ResourceManagementClient(credential,subscriptionId);
    private depolymentName = "jstestlinked";

    //return deployment_parameter
    private create_deployment_parameter(){
        const parameter:ScopedDeployment = {
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
    public async test_deployments_checkExistenceAtTenantScope(){
        const result_exist = await this.resourceClient.deployments.checkExistenceAtTenantScope(this.depolymentName);
        // console.log(result_exist);
        console.assert(result_exist.body === false);
    }

    //deployments.createOrUpdateAtTenantScope (LRO)
    public async test_deployments_createOrUpdateAtTenantScope(){
        const parameter = this.create_deployment_parameter();
        const resultCreate_depolyments = await this.resourceClient.deployments.createOrUpdateAtTenantScope(this.depolymentName,parameter);
        console.log(resultCreate_depolyments);
        // console.assert(resultCreate_depolyments.name === this.depolymentName);
    }

    //deployments.listAtTenantScope
    public async test_deployments_listAtTenantScope(){
        const listArray = new Array();
        for await (let item of this.resourceClient.deployments.listAtTenantScope()){
            listArray.push(item);
            // console.log(item);
        }
        console.assert(listArray.length >= 1);
        console.assert(listArray[2].name === this.depolymentName);
    }

    //deployments.getAtTenantScope
    public async test_deployments_getAtTenantScope(){
        const getResult = await this.resourceClient.deployments.getAtTenantScope(this.depolymentName);
        // console.log(getResult);
        console.assert(getResult.name === this.depolymentName);
    }

    //deployments.whatIfAtTenantScope (LRO)
    public async test_deployments_whatIfAtTenantScope(){
        const result = await this.resourceClient.deployments.whatIfAtTenantScope(this.depolymentName,this.create_deployment_parameter());
        console.log(result);
    }

    //deploymentOperations.listAtTenantScope
    public async test_deploymentOperations_listAtTenantScope(){
        const listArray = new Array();
        for await (let item of this.resourceClient.deploymentOperations.listAtTenantScope(this.depolymentName)){
            listArray.push(item);
            // console.log(item);
        }
        console.assert(listArray.length > 0);
        return listArray;
    }

    //deploymentOperations.getAtTenantScope
    public async test_deploymentOperations_getAtTenantScope(){
        const operationId = await this.test_deploymentOperations_listAtTenantScope();
        const getResult = await this.resourceClient.deploymentOperations.getAtTenantScope(this.depolymentName,operationId[0].operationId);
        // console.log(getResult);
        console.assert(getResult.operationId === operationId[0].operationId);
    }

    //deployments.cancelAtTenantScope
    public async test_deployments_cancelAtTenantScope(){
        await this.resourceClient.deployments.cancelAtTenantScope(this.depolymentName).catch(
            result => {
                // console.log(result.code);
                console.assert(result.code === "DeploymentCannotBeCancelled");
            }
        );  
    }

    //deployments.validateAtTenantScope (LRO)
    public async test_deployments_validateAtTenantScope(){
        const validation = await this.resourceClient.deployments.validateAtTenantScope(this.depolymentName,this.create_deployment_parameter());
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

    //deployments.deleteAtTenantScope (LRO)
    public async test_deployments_deleteAtTenantScope(){
        const result_delete = await this.resourceClient.deployments.deleteAtTenantScope(this.depolymentName);
        console.log(result_delete);
    }
}

class TestProviderOperations {

    private resourceClient = new ResourceManagementClient(credential,subscriptionId);

    //providers.get
    public async test_providers_get(){
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
    public async test_get_register(){
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
    public async test_providers_list(){
        const resultArray = new Array();
        for await (let item of this.resourceClient.providers.list()){
            console.log(item);
            resultArray.push(item);
        }
    }

    //providers.getAtTenantScope providers.listAtTenantScope
    public async test_providers_getAtTenantScope(){
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
    public async test_operations_list(){
        const resultArray = new Array();
        for await (let item of this.resourceClient.operations.list()){
            console.log(item);
            resultArray.push(item)
        }
    }
}
// const tag = new TestProviderLocation();
// tag.test_providers_get();