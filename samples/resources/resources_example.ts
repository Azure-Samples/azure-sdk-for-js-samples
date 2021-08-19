import { DefaultAzureCredential } from "@azure/identity";
import {
  Deployment,
  ExportTemplateRequest,
  GenericResource,
  ResourceGroup,
  ResourceGroupPatchable,
  ResourceManagementClient,
  ResourcesMoveInfo,
  ScopedDeployment,
  TagsPatchResource,
  TagsResource,
} from "@azure/arm-resources";
// eslint-disable-next-line import/no-unresolved
import { ManagementGroupsAPI } from "azure-arm-managementgroups";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();
const tagName = "tagyyy";
const tagValue = "valueyyy";
const resourceGroupName = "myjstest";
const resourceName_1 = "myresource_1";
const resourceName_2 = "myresource_2";
const resourceId =
  "/subscriptions/" +
  subscriptionId +
  "/resourceGroups/" +
  resourceGroupName +
  "/providers/" +
  "Microsoft.Compute" +
  "/" +
  "availabilitySets" +
  "/" +
  resourceName_2;
const newResourceGroup = "jsNewGroup";
const newResourceId =
  "/subscriptions/" +
  subscriptionId +
  "/resourceGroups/" +
  newResourceGroup +
  "/providers/" +
  "Microsoft.Compute" +
  "/" +
  "availabilitySets" +
  "/" +
  resourceName_2;
const depolymentName = "jstestdeployment";
const scope =
  "subscriptions/" + subscriptionId + "/resourcegroups/" + resourceGroupName;
const template = createTmpleate();
const group_id = "20000000-0001-0000-0000-000000000123456";
let resourceClient: ResourceManagementClient;
let managementGroupsApi: ManagementGroupsAPI;

//--TagsOperationExamples--

//tags.createOrUpdate
async function tags_createOrUpdate() {
  await resourceClient.tagsOperations.createOrUpdate(tagName).then((result) => {
    console.log(result);
  });
}

//tags.list
async function tags_list() {
  for await (const item of resourceClient.tagsOperations.list()) {
    console.log(item);
  }
}

//tags.createOrUpdateValue
async function tags_createOrUpdateValue() {
  await resourceClient.tagsOperations
    .createOrUpdateValue(tagName, tagValue)
    .then((result) => {
      console.log(result);
    });
}

//tags.deleteValue
async function tags_deleteValue() {
  await resourceClient.tagsOperations
    .deleteValue(tagName, tagValue)
    .then((result) => {
      console.log(result);
    });
}

//tags.delete
async function tags_delete() {
  await resourceClient.tagsOperations.delete(tagName).then((result) => {
    console.log(result);
  });
}

//tags.createOrUpdateAtScope
async function tags_createOrUpdateAtScope() {
  const scope = "subscriptions/" + subscriptionId;
  const parameter: TagsResource = {
    properties: {
      tags: {
        tagkey1: "tagValue1",
        tagkey2: "tagValue2",
      },
    },
  };
  await resourceClient.tagsOperations
    .createOrUpdateAtScope(scope, parameter)
    .then((result) => {
      console.log(result);
    });
}

//tags.getAtScope
async function tags_getAtScope() {
  const scope = "subscriptions/" + subscriptionId;
  await resourceClient.tagsOperations.getAtScope(scope).then((result) => {
    console.log(result);
  });
}

//tags.updateAtScope
async function tags_updateAtScope() {
  const scope = "subscriptions/" + subscriptionId;
  const parameter: TagsPatchResource = {
    operation: "Delete",
    properties: {
      tags: {
        tagkey1: "tagValue1",
      },
    },
  };
  await resourceClient.tagsOperations
    .updateAtScope(scope, parameter)
    .then((result) => {
      console.log(result);
    });
}

//tags.deleteAtScope
async function tags_deleteAtScope() {
  const scope = "subscriptions/" + subscriptionId;
  await resourceClient.tagsOperations.deleteAtScope(scope).then((result) => {
    console.log(result);
  });
}

//--ResourceGroupExamples--

//resourceGroups.createOrUpdate
async function resourceGroups_createOrUpdate() {
  const parameter: ResourceGroup = {
    location: "eastus",
    tags: {
      tag1: "value1",
    },
  };
  await resourceClient.resourceGroups
    .createOrUpdate(resourceGroupName, parameter)
    .then((result) => {
      console.log(result);
    });
}

//resourceGroups.get
async function resourceGroups_get() {
  const result_get = await resourceClient.resourceGroups.get(resourceGroupName);
  console.log(result_get);
}

//resourceGroups.checkExistence
async function resourceGroups_checkExistence() {
  const result_check = await resourceClient.resourceGroups.checkExistence(
    resourceGroupName
  );
  console.log(result_check);

  const unknowGroup = "unknowGroup";
  const result_check_unknowGroup = await resourceClient.resourceGroups.checkExistence(
    unknowGroup
  );
  console.log(result_check_unknowGroup);
}

//resourceGroups.list
async function resourceGroups_list() {
  const result_list = [];
  for await (const item of resourceClient.resourceGroups.list()) {
    result_list.push(item);
  }
  console.log(result_list);
}

//resourceGroups.list
async function resourceGroups_listTop2() {
  const result_list_top2 = [];
  for await (const item of resourceClient.resourceGroups.list({ top: 2 })) {
    result_list_top2.push(item);
  }
  console.log(result_list_top2);
}

//resourceGroups.update
async function resourceGroups_update() {
  const parameter: ResourceGroupPatchable = {
    tags: {
      tag1: "value1",
      tag2: "value2",
    },
  };
  const result_patch = await resourceClient.resourceGroups.update(
    resourceGroupName,
    parameter
  );
  console.log(result_patch);
}

//resourceGroups.exportTemplate
async function resourceGroups_beginExportTemplateAndWait() {
  const parameter: ExportTemplateRequest = {
    resources: ["*"],
  };
  const result_template = await resourceClient.resourceGroups.beginExportTemplateAndWait(
    resourceGroupName,
    parameter
  );
  console.log(result_template);
}

// resourceGroups.delete
async function resourceGroups_delete() {
  await resourceClient.resourceGroups
    .beginDeleteAndWait(resourceGroupName)
    .then((result) => {
      console.log(result);
    });
}

//--ResourcesExamples--

//resources.checkExistence
async function resources_checkExistence() {
  const resources_exist = await resourceClient.resources.checkExistence(
    resourceGroupName,
    "Microsoft.Compute",
    "",
    "availabilitySets",
    resourceName_1,
    "2019-12-01"
  );
  console.log(resources_exist);
}

//resources.checkExistenceById
async function resources_checkExistenceById() {
  const resources_exist_by_id = await resourceClient.resources.checkExistenceById(
    resourceId,
    "2019-12-01"
  );
  console.log(resources_exist_by_id);
}

//resources.createOrUpdateById
async function resources_createOrUpdateById() {
  const parameter: GenericResource = {
    location: "eastus",
  };
  const craete_result_by_id = await resourceClient.resources.beginCreateOrUpdateByIdAndWait(
    resourceId,
    "2019-12-01",
    parameter
  );
  console.log(craete_result_by_id);
}

//resources.createOrUpdate
async function resources_createOrUpdate() {
  const create_result = await resourceClient.resources.beginCreateOrUpdateAndWait(
    resourceGroupName,
    "Microsoft.Compute",
    "",
    "availabilitySets",
    resourceName_1,
    "2019-12-01",
    { location: "eastus" }
  );
  console.log(create_result);
}

//resources.get
async function resources_get() {
  const get_result = await resourceClient.resources.get(
    resourceGroupName,
    "Microsoft.Compute",
    "",
    "availabilitySets",
    resourceName_1,
    "2019-12-01"
  );
  console.log(get_result);
}

//resources.getById
async function resources_getById() {
  const get_result = await resourceClient.resources.getById(
    resourceId,
    "2019-12-01"
  );
  console.log(get_result);
  return get_result;
}

//resources.list
async function resources_list() {
  const resultArray = [];
  for await (const item of resourceClient.resources.list({
    filter: "name eq '" + resourceName_1 + "'",
  })) {
    resultArray.push(item);
  }
  console.log(resultArray);
}

//resources.listByResourceGroup
async function resources_listByResourceGroup() {
  const resultArray = [];
  for await (const item of resourceClient.resources.listByResourceGroup(
    resourceGroupName
  )) {
    resultArray.push(item);
  }
  console.log(resultArray);
}

//resources.validateMoveResources
async function resources_validateMoveResources() {
  const new_Group = await resourceClient.resourceGroups.createOrUpdate(
    newResourceGroup,
    { location: "eastus" }
  );
  console.log(new_Group);
  const result_getById = await resources_getById();
  const parameter: ResourcesMoveInfo = {
    resources: new Array(result_getById.id),
    targetResourceGroup: new_Group.id,
  };
  const result_move = await resourceClient.resources.beginValidateMoveResourcesAndWait(
    resourceGroupName,
    parameter
  );
  console.log(result_move);
}

//resources.moveResources
async function resources_moveResources() {
  const get_new_Group = await resourceClient.resourceGroups.get(
    newResourceGroup
  );
  console.log(get_new_Group);
  const result_getById = await resources_getById();
  const parameter: ResourcesMoveInfo = {
    resources: new Array(result_getById.id),
    targetResourceGroup: get_new_Group.id,
  };
  const result_move = await resourceClient.resources.beginMoveResourcesAndWait(
    resourceGroupName,
    parameter
  );
  console.log(result_move);
}

//resources.update
async function resources_update() {
  const result_update = await resourceClient.resources.beginUpdateAndWait(
    resourceGroupName,
    "Microsoft.Compute",
    "",
    "availabilitySets",
    resourceName_1,
    "2019-12-01",
    { tags: { tag1: "value1" } }
  );
  console.log(result_update);
}

//resources.updateById
async function resources_updateById() {
  const result_update_by_id = await resourceClient.resources.beginUpdateByIdAndWait(
    newResourceId,
    "2019-12-01",
    { tags: { tag1: "value1" } }
  );
  console.log(result_update_by_id);
}

//resources.delete
async function resources_delete() {
  const result_delete = await resourceClient.resources.beginDeleteAndWait(
    newResourceGroup,
    "Microsoft.Compute",
    "",
    "availabilitySets",
    resourceName_1,
    "2019-12-01"
  );
  console.log(result_delete);
}

//resources.deleteById
async function resources_deleteById() {
  const result_delete_by_id = await resourceClient.resources.beginDeleteByIdAndWait(
    newResourceId,
    "2019-12-01"
  );
  console.log(result_delete_by_id);
}

//--DeploymentsBasicExamples--

// return templeate
function createTmpleate() {
  const template: any = {
    $schema:
      "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
    contentVersion: "1.0.0.0",
    parameters: {
      location: {
        type: "String",
        allowedValues: [
          "East US",
          "West US",
          "West Europe",
          "East Asia",
          "South East Asia",
        ],
        metaData: {
          description: "Location to deploy to",
        },
      },
    },
    resources: [
      {
        type: "Microsoft.Compute/availabilitySets",
        name: "availabilitySet1",
        apiVersion: "2019-12-01",
        location: "[parameters('location')]",
        properties: {},
      },
    ],
    outPuts: {
      myParamete: {
        type: "object",
        value:
          "[reference('Microsoft.Compute/availabilitySets/availabilitySet1')]",
      },
    },
  };
  return template;
}

//deployments.checkExistence
async function deployments_checkExistence() {
  const deployment_check = await resourceClient.deployments.checkExistence(
    resourceGroupName,
    depolymentName
  );
  console.log(deployment_check);
}

//deployments.calculateTemplateHash
async function deployments_calculateTemplateHash() {
  await resourceClient.deployments
    .calculateTemplateHash(template)
    .then((result) => {
      console.log(result);
    });
}

//deployments.createOrUpdate
async function deployments_createOrUpdate() {
  const parameter: Deployment = {
    properties: {
      mode: "Incremental",
      template: template,
      parameters: { location: { value: "East US" } },
    },
  };
  const createResult_deployment = await resourceClient.deployments.beginCreateOrUpdateAndWait(
    resourceGroupName,
    depolymentName,
    parameter
  );
  console.log(createResult_deployment);
}

//deployments.listByResourceGroup
async function deployments_listByResourceGroup() {
  const listArray_deployment = [];
  for await (const item of resourceClient.deployments.listByResourceGroup(
    resourceGroupName
  )) {
    listArray_deployment.push(item);
  }
  console.log(listArray_deployment);
}

//deployments.get
async function deployments_get() {
  const getResult_deployment = await resourceClient.deployments.get(
    resourceGroupName,
    depolymentName
  );
  console.log(getResult_deployment);
}

//deployments.whatIf
async function deployments_whatIf() {
  await resourceClient.deployments
    .beginWhatIfAndWait(resourceGroupName, depolymentName, {
      properties: { mode: "Incremental", template: template },
    })
    .then((result) => {
      console.log(result);
    });
}

//deployments.cancel
async function deployments_cancel() {
  await resourceClient.deployments
    .cancel(resourceGroupName, depolymentName)
    .catch((result) => {
      console.log(result.code);
    });
}

//deployments.validate
async function deployments_validate() {
  const parameter: Deployment = {
    properties: {
      mode: "Incremental",
      template: template,
      parameters: { location: { value: "East US" } },
    },
  };
  const validation = await resourceClient.deployments.beginValidateAndWait(
    resourceGroupName,
    depolymentName,
    parameter
  );
  console.log(validation);
}

//deployments.exportTemplate
async function deployments_exportTemplate() {
  const result_export = await resourceClient.deployments.exportTemplate(
    resourceGroupName,
    depolymentName
  );
  console.log(result_export);
}

//deployments.delete
async function deployments_delete() {
  const result_delete = await resourceClient.deployments.beginDeleteAndWait(
    resourceGroupName,
    depolymentName
  );
  console.log(result_delete);
}

//deploymentOperations.list
async function deploymentOperations_list() {
  const listArray_deploymentOperations = [];
  for await (const item of resourceClient.deploymentOperations.list(
    resourceGroupName,
    depolymentName
  )) {
    listArray_deploymentOperations.push(item);
  }
  console.log(listArray_deploymentOperations);
  return listArray_deploymentOperations;
}

//deploymentOperations.get
async function deploymentOperations_get() {
  const operationId = await deploymentOperations_list();
  const getResult_deployment = await resourceClient.deploymentOperations.get(
    resourceGroupName,
    depolymentName,
    operationId[0].operationId
  );
  console.log(getResult_deployment);
}

//--DeploymentAtScopeExamples--

//deployments.checkExistenceAtScope
async function deployments_checkExistenceAtScope() {
  const result_exist = await resourceClient.deployments.checkExistenceAtScope(
    resourceGroupName,
    depolymentName
  );
  console.log(result_exist);
}

//deployments.createOrUpdateAtScope
async function deployments_createOrUpdateAtScope() {
  const parameter: Deployment = {
    properties: {
      mode: "Incremental",
      template: template,
      parameters: { location: { value: "East US" } },
    },
  };
  const createResult_deployment = await resourceClient.deployments.beginCreateOrUpdateAtScopeAndWait(
    scope,
    depolymentName,
    parameter
  );
  console.log(createResult_deployment);
}

//deployments.listAtScope
async function deployments_listAtScope() {
  const listArray = [];
  for await (const item of resourceClient.deployments.listAtScope(scope)) {
    listArray.push(item);
  }
  console.log(listArray);
}

//deployments.getAtScope
async function deployments_getAtScope() {
  const getResult = await resourceClient.deployments.getAtScope(
    scope,
    depolymentName
  );
  console.log(getResult);
}

//deployments.cancelAtScope
async function deployments_cancelAtScope() {
  await resourceClient.deployments
    .cancelAtScope(scope, depolymentName)
    .catch((result) => {
      console.log(result.code);
    });
}

//deployments.validateAtScope
async function deployments_validateAtScope() {
  const parameter: Deployment = {
    properties: {
      mode: "Incremental",
      template: template,
      parameters: { location: { value: "East US" } },
    },
  };
  const validation = await resourceClient.deployments.beginValidateAtScopeAndWait(
    scope,
    depolymentName,
    parameter
  );
  console.log(validation);
}

//deployments.exportTemplateAtScope
async function deployments_exportTemplateAtScope() {
  const result_export = await resourceClient.deployments.exportTemplateAtScope(
    scope,
    depolymentName
  );
  console.log(result_export);
}

//deployments.deleteAtScope
async function deployments_deleteAtScope() {
  const result_delete = await resourceClient.deployments.beginDeleteAtScopeAndWait(
    scope,
    depolymentName
  );
  console.log(result_delete);
}

//deploymentOperations.listAtScope
async function deploymentOperations_listAtScope() {
  const listArray = [];
  for await (const item of resourceClient.deploymentOperations.listAtScope(
    scope,
    depolymentName
  )) {
    listArray.push(item);
  }
  console.log(listArray);
  return listArray;
}

//deploymentOperations.getAtScope
async function deploymentOperations_getAtScope() {
  const operationId = await deploymentOperations_listAtScope();
  const getResult = await resourceClient.deploymentOperations.getAtScope(
    scope,
    depolymentName,
    operationId[0].operationId
  );
  console.assert(getResult.operationId === operationId[0].operationId);
}

//--DeploymentsAtManagementGroupExamples--

//managementGroups.createOrUpdate
async function managementGroups_createOrUpdate() {
  const result_create = await managementGroupsApi.managementGroups.beginCreateOrUpdateAndWait(
    group_id,
    { name: group_id }
  );
  console.log(result_create);
}

//deployments.checkExistenceAtManagementGroupScope
async function deployments_checkExistenceAtManagementGroupScope() {
  const result_exist = await resourceClient.deployments.checkExistenceAtManagementGroupScope(
    group_id,
    depolymentName
  );
  console.log(result_exist);
}

//deployments.createOrUpdateAtManagementGroupScope
async function deployments_createOrUpdateAtManagementGroupScope() {
  const parameter: ScopedDeployment = {
    location: "West US",
    properties: {
      mode: "Incremental",
      templateLink: {
        uri:
          "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/100-blank-template/azuredeploy.json",
      },
      parametersLink: {
        uri:
          "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/100-blank-template/azuredeploy.json",
      },
    },
  };
  const resultCreate_depolyments = await resourceClient.deployments.beginCreateOrUpdateAtManagementGroupScopeAndWait(
    group_id,
    depolymentName,
    parameter
  );
  console.log(resultCreate_depolyments);
}

//deployments.listAtManagementGroupScope
async function deployments_listAtManagementGroupScope() {
  const listArray = [];
  for await (const item of resourceClient.deployments.listAtManagementGroupScope(
    group_id
  )) {
    listArray.push(item);
    console.log(item);
  }
}

//deployments.getAtManagementGroupScope
async function deployments_getAtManagementGroupScope() {
  const getResult = await resourceClient.deployments.getAtManagementGroupScope(
    group_id,
    depolymentName
  );
  console.log(getResult);
}

//deployments.cancelAtManagementGroupScope
async function deployments_cancelAtManagementGroupScope() {
  await resourceClient.deployments
    .cancelAtManagementGroupScope(group_id, depolymentName)
    .catch((result) => {
      console.log(result.code);
    });
}

//deployments.validateAtManagementGroupScope
async function deployments_validateAtManagementGroupScope() {
  const parameter: ScopedDeployment = {
    location: "West US",
    properties: {
      mode: "Incremental",
      templateLink: {
        uri:
          "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/100-blank-template/azuredeploy.json",
      },
      parametersLink: {
        uri:
          "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/100-blank-template/azuredeploy.json",
      },
    },
  };
  const validation = await resourceClient.deployments.beginValidateAtManagementGroupScopeAndWait(
    group_id,
    depolymentName,
    parameter
  );
  console.log(validation);
}

//deployments.exportTemplateAtManagementGroupScope
async function deployments_exportTemplateAtManagementGroupScope() {
  const result_export = await resourceClient.deployments.exportTemplateAtManagementGroupScope(
    group_id,
    depolymentName
  );
  console.log(result_export);
}

//deployments.deleteAtManagementGroupScope
async function deployments_deleteAtManagementGroupScope() {
  const result_delete = await resourceClient.deployments.beginDeleteAtManagementGroupScopeAndWait(
    group_id,
    depolymentName
  );
  console.log(result_delete);
}

//deploymentOperations.listAtManagementGroupScope
async function deploymentOperations_listAtManagementGroupScope() {
  const listArray = [];
  for await (const item of resourceClient.deploymentOperations.listAtManagementGroupScope(
    group_id,
    depolymentName
  )) {
    listArray.push(item);
  }
  console.log(listArray);
  return listArray;
}

//deploymentOperations.getAtManagementGroupScope
async function deploymentOperations_getAtManagementGroupScope() {
  const operationId = await deploymentOperations_listAtManagementGroupScope();
  const getResult = await resourceClient.deploymentOperations.getAtManagementGroupScope(
    group_id,
    depolymentName,
    operationId[0].operationId
  );
  console.log(getResult);
}

//--DeploymentsAtSubscriptionExamples--

//return deployment_parameter
async function create_deployment_parameter() {
  const parameter: Deployment = {
    location: "West US",
    properties: {
      mode: "Incremental",
      templateLink: {
        uri:
          "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/100-blank-template/azuredeploy.json",
      },
      parametersLink: {
        uri:
          "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/100-blank-template/azuredeploy.json",
      },
    },
  };
  return parameter;
}

//deployments.checkExistenceAtSubscriptionScope
async function deployments_checkExistenceAtSubscriptionScope() {
  const result_exist = await resourceClient.deployments.checkExistenceAtSubscriptionScope(
    depolymentName
  );
  console.log(result_exist);
}

//deployments.createOrUpdateAtSubscriptionScope
async function deployments_createOrUpdateAtSubscriptionScope() {
  const parameter = await create_deployment_parameter();
  const resultCreate_depolyments = await resourceClient.deployments.beginCreateOrUpdateAtSubscriptionScopeAndWait(
    depolymentName,
    parameter
  );
  console.log(resultCreate_depolyments);
}

//deployments.listAtSubscriptionScope
async function deployments_listAtSubscriptionScope() {
  const listArray = [];
  for await (const item of resourceClient.deployments.listAtSubscriptionScope()) {
    listArray.push(item);
  }
  console.log(listArray);
}

//deployments.getAtSubscriptionScope
async function deployments_getAtSubscriptionScope() {
  const getResult = await resourceClient.deployments.getAtSubscriptionScope(
    depolymentName
  );
  console.log(getResult);
}

//deployments.whatIfAtSubscriptionScope
async function deployments_whatIfAtSubscriptionScope() {
  const parameter = await create_deployment_parameter();
  const result = await resourceClient.deployments.beginWhatIfAtSubscriptionScopeAndWait(
    depolymentName,
    parameter
  );
  console.log(result);
}

//deployments.cancelAtSubscriptionScope
async function deployments_cancelAtSubscriptionScope() {
  await resourceClient.deployments
    .cancelAtSubscriptionScope(depolymentName)
    .catch((result) => {
      console.log(result.code);
    });
}

//deployments.validateAtSubscriptionScope
async function deployments_validateAtSubscriptionScope() {
  const parameter = await create_deployment_parameter();
  const validation = await resourceClient.deployments.beginValidateAtSubscriptionScopeAndWait(
    depolymentName,
    parameter
  );
  console.log(validation);
}

//deployments.exportTemplateAtSubscriptionScope
async function deployments_exportTemplateAtSubscriptionScope() {
  const result_export = await resourceClient.deployments.exportTemplateAtSubscriptionScope(
    depolymentName
  );
  console.log(result_export);
}

//deployments.deleteAtSubscriptionScope
async function deployments_deleteAtSubscriptionScope() {
  const result_delete = await resourceClient.deployments.beginDeleteAtSubscriptionScopeAndWait(
    depolymentName
  );
  console.log(result_delete);
}

//deploymentOperations.listAtSubscriptionScope
async function deploymentOperations_listAtSubscriptionScope() {
  const listArray = [];
  for await (const item of resourceClient.deploymentOperations.listAtSubscriptionScope(
    depolymentName
  )) {
    listArray.push(item);
  }
  console.log(listArray);
  return listArray;
}

//deploymentOperations.getAtSubscriptionScope
async function deploymentOperations_getAtSubscriptionScope() {
  const operationId = await deploymentOperations_listAtSubscriptionScope();
  const getResult = await resourceClient.deploymentOperations.getAtSubscriptionScope(
    depolymentName,
    operationId[0].operationId
  );
  console.log(getResult);
}

//--DeploymentsAtTenantExamples--

//return deployment_parameter
async function create_deployment_parameter2() {
  const parameter: ScopedDeployment = {
    location: "West US",
    properties: {
      mode: "Incremental",
      templateLink: {
        uri:
          "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/100-blank-template/azuredeploy.json",
      },
      parametersLink: {
        uri:
          "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/100-blank-template/azuredeploy.json",
      },
    },
  };
  return parameter;
}

//deployments.checkExistenceAtTenantScope
async function deployments_checkExistenceAtTenantScope() {
  const result_exist = await resourceClient.deployments.checkExistenceAtTenantScope(
    depolymentName
  );
  console.log(result_exist);
}

//deployments.createOrUpdateAtTenantScope
async function deployments_createOrUpdateAtTenantScope() {
  const parameter = await create_deployment_parameter2();
  const resultCreate_depolyments = await resourceClient.deployments.beginCreateOrUpdateAtTenantScopeAndWait(
    depolymentName,
    parameter
  );
  console.log(resultCreate_depolyments);
}

//deployments.listAtTenantScope
async function deployments_listAtTenantScope() {
  const listArray = [];
  for await (const item of resourceClient.deployments.listAtTenantScope()) {
    listArray.push(item);
  }
  console.log(listArray);
}

//deployments.getAtTenantScope
async function deployments_getAtTenantScope() {
  const getResult = await resourceClient.deployments.getAtTenantScope(
    depolymentName
  );
  console.log(getResult);
}

//deployments.whatIfAtTenantScope
async function deployments_whatIfAtTenantScope() {
  const parameter = await create_deployment_parameter2();
  const result = await resourceClient.deployments.beginWhatIfAtTenantScopeAndWait(
    depolymentName,
    parameter
  );
  console.log(result);
}

//deploymentOperations.listAtTenantScope
async function deploymentOperations_listAtTenantScope() {
  const listArray = [];
  for await (const item of resourceClient.deploymentOperations.listAtTenantScope(
    depolymentName
  )) {
    listArray.push(item);
  }
  console.assert(listArray.length > 0);
  return listArray;
}

//deploymentOperations.getAtTenantScope
async function deploymentOperations_getAtTenantScope() {
  const operationId = await deploymentOperations_listAtTenantScope();
  const getResult = await resourceClient.deploymentOperations.getAtTenantScope(
    depolymentName,
    operationId[0].operationId
  );
  console.log(getResult);
}

//deployments.cancelAtTenantScope
async function deployments_cancelAtTenantScope() {
  await resourceClient.deployments
    .cancelAtTenantScope(depolymentName)
    .catch((result) => {
      console.assert(result.code === "DeploymentCannotBeCancelled");
    });
}

//deployments.validateAtTenantScope
async function deployments_validateAtTenantScope() {
  const parameter = await create_deployment_parameter2();
  const validation = await resourceClient.deployments.beginValidateAtTenantScopeAndWait(
    depolymentName,
    parameter
  );
  console.log(validation);
}

//deployments.exportTemplateAtTenantScope
async function deployments_exportTemplateAtTenantScope() {
  const result_export = await resourceClient.deployments.exportTemplateAtTenantScope(
    depolymentName
  );
  if (!result_export.template) {
    console.assert(false);
  }
}

//deployments.deleteAtTenantScope
async function deployments_deleteAtTenantScope() {
  const result_delete = await resourceClient.deployments.beginDeleteAtTenantScopeAndWait(
    depolymentName
  );
  console.log(result_delete);
}

//--ProviderOperationsExamples--

//providers.get
async function providers_get() {
  const getArray = [];
  const result_get = await resourceClient.providers.get("Microsoft.Web");
  // console.log(result_get)
  for (const item of result_get.resourceTypes) {
    if (item.resourceType === "sites") {
      if (item.locations.indexOf("West US") >= 0) {
        console.assert(true);
        break;
      } else {
        console.assert(false);
        break;
      }
    }
  }
}

//providers.unregister providers.get providers.register
async function get_register() {
  await resourceClient.providers
    .unregister("Microsoft.Search")
    .then((result) => {
      console.log(result);
    });
  await resourceClient.providers.get("Microsoft.Search").then((result) => {
    console.log(result);
  });
  await resourceClient.providers.register("Microsoft.Search").then((result) => {
    console.log(result);
  });
}

//providers.list
async function providers_list() {
  const resultArray = [];
  for await (const item of resourceClient.providers.list()) {
    console.log(item);
    resultArray.push(item);
  }
}

//providers.getAtTenantScope providers.listAtTenantScope
async function providers_getAtTenantScope() {
  await resourceClient.providers
    .getAtTenantScope("Microsoft.Web")
    .then((result) => {
      console.log(result);
    });
  const resultArray = [];
  for await (const item of resourceClient.providers.listAtTenantScope()) {
    console.log(item);
    resultArray.push(item);
  }
}

//operations.list
async function operations_list() {
  const resultArray = [];
  for await (const item of resourceClient.operations.list()) {
    console.log(item);
    resultArray.push(item);
  }
}

async function main() {
  resourceClient = new ResourceManagementClient(credential, subscriptionId);
  managementGroupsApi = new ManagementGroupsAPI(credential);
  await tags_createOrUpdate();
}

main();
