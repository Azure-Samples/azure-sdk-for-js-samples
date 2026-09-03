import { DefaultAzureCredential } from "@azure/identity";
import {
  ExportTemplateRequest,
  GenericResource,
  ResourceGroup,
  ResourceGroupPatchable,
  ResourceManagementClient,
  ResourcesMoveInfo,
  TagsPatchResource,
  TagsResource,
} from "@azure/arm-resources";
// eslint-disable-next-line import/no-unresolved
import { ManagementGroupsAPI } from "@azure/arm-managementgroups";

const subscriptionId =
  process.env.subscriptionId || "00000000-0000-0000-0000-000000000000";
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
async function resourceGroups_exportTemplate() {
  const parameter: ExportTemplateRequest = {
    resources: ["*"],
  };
  const result_template = await resourceClient.resourceGroups.exportTemplate(
    resourceGroupName,
    parameter
  );
  console.log(result_template);
}

// resourceGroups.delete
async function resourceGroups_delete() {
  await resourceClient.resourceGroups
    .delete(resourceGroupName)
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
  const craete_result_by_id = await resourceClient.resources.createOrUpdateById(
    resourceId,
    "2019-12-01",
    parameter
  );
  console.log(craete_result_by_id);
}

//resources.createOrUpdate
async function resources_createOrUpdate() {
  const create_result = await resourceClient.resources.createOrUpdate(
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
    resources: new Array(result_getById.id as string),
    targetResourceGroup: new_Group.id,
  };
  const result_move = await resourceClient.resources.validateMoveResources(
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
    resources: new Array(result_getById.id as string),
    targetResourceGroup: get_new_Group.id,
  };
  const result_move = await resourceClient.resources.moveResources(
    resourceGroupName,
    parameter
  );
  console.log(result_move);
}

//resources.update
async function resources_update() {
  const result_update = await resourceClient.resources.update(
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
  const result_update_by_id = await resourceClient.resources.updateById(
    newResourceId,
    "2019-12-01",
    { tags: { tag1: "value1" } }
  );
  console.log(result_update_by_id);
}

//resources.delete
async function resources_delete() {
  const result_delete = await resourceClient.resources.delete(
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
  const result_delete_by_id = await resourceClient.resources.deleteById(
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

//--DeploymentsAtManagementGroupExamples--

//managementGroups.createOrUpdate
async function managementGroups_createOrUpdate() {
  const result_create = await managementGroupsApi.managementGroups.createOrUpdate(
    group_id,
    { name: group_id }
  );
  console.log(result_create);
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
