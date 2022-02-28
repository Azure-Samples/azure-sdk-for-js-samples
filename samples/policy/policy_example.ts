import { DefaultAzureCredential } from "@azure/identity";
// eslint-disable-next-line import/no-unresolved
import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import {
  PolicyClient,
  PolicyDefinition,
  PolicySetDefinition,
} from "@azure/arm-policy";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();
const resourceGroupName = "myjstest";
const policyName = "jspolicy";
const policyAssignmentName = "passigment";
const policySetName = "jspolicy";
const groupId = "20000000-0001-0000-0000-000000000123";
const scope =
  "/subscriptions/" + subscriptionId + "/resourceGroups/" + resourceGroupName;
const policyId =
  "/subscriptions/" +
  subscriptionId +
  "/resourceGroups/" +
  resourceGroupName +
  "/providers/Microsoft.Authorization/policyAssignments/" +
  policyAssignmentName;
let policyclient: PolicyClient;
let managementclient: ManagementGroupsAPI;

//--PolicyDefinitionAtManagementGroupExamples--

//managementGroups.createOrUpdate
async function managementGroups_createOrUpdate() {
  const result = await managementclient.managementGroups.beginCreateOrUpdateAndWait(
    groupId,
    { name: groupId }
  );
  console.log(result);
}

//policyDefinitions.createOrUpdateAtManagementGroup
async function policyDefinitions_createOrUpdateAtManagementGroup() {
  const parameter: PolicyDefinition = {
    policyType: "Custom",
    description: "Don't create a VM anywhere",
    policyRule: {
      if: {
        allof: [
          {
            source: "action",
            equals: "Microsoft.Compute/virtualMachines/write",
          },
          {
            field: "location",
            in: ["eastus", "eastus2", "centralus"],
          },
        ],
      },
      then: {
        effect: "deny",
      },
    },
  };
  const definition = await policyclient.policyDefinitions.createOrUpdateAtManagementGroup(
    policyName,
    groupId,
    parameter
  );
  console.log(definition);
}

//policyDefinitions.getAtManagementGroup
async function policyDefinitions_getAtManagementGroup() {
  const definition = await policyclient.policyDefinitions.getAtManagementGroup(
    policyName,
    groupId
  );
  console.log(definition);
  return definition;
}

//policyDefinitions.listByManagementGroup
async function policyDefinitions_listByManagementGroup() {
  for await (const item of policyclient.policyDefinitions.listByManagementGroup(
    groupId
  )) {
    console.log(item);
  }
}

//policyDefinitions.listBuiltIn
async function policyDefinitions_listBuiltIn() {
  const arrayList = [];
  for await (const item of policyclient.policyDefinitions.listBuiltIn()) {
    arrayList.push(item);
    console.log(item);
  }
  return arrayList;
}

//policyDefinitions.getBuiltIn
async function policyDefinitions_getBuiltIn() {
  const arrayOne = await policyDefinitions_listBuiltIn();
  await policyclient.policyDefinitions
    .getBuiltIn(arrayOne[0].name)
    .then((result) => {
      console.log(result);
    });
}

//policyAssignments.listForManagementGroup
async function policyAssignments_listForManagementGroup() {
  for await (const item of policyclient.policyAssignments.listForManagementGroup(
    groupId,
    { filter: "atScope()" }
  )) {
    console.log(item);
  }
}

//policyAssignments.create
async function policyAssignments_create() {
  const scope =
    "/providers/Microsoft.Management/managementgroups/20000000-0001-0000-0000-000000000123/";
  const definition = await policyDefinitions_getAtManagementGroup();
  const assigment = await policyclient.policyAssignments.create(
    scope,
    policyAssignmentName,
    { policyDefinitionId: definition.id }
  );
  console.log(assigment);
  return assigment;
}

//policyAssignments.get
async function policyAssignments_get() {
  const assigment = await policyAssignments_create();
  await policyclient.policyAssignments
    .get(assigment.scope, assigment.name)
    .then((result) => {
      console.log(result);
    });
}

//policyAssignments.list
async function policyAssignments_list() {
  const arrayList = [];
  for await (const item of policyclient.policyAssignments.list()) {
    arrayList.push(item);
    console.log(item);
  }
  console.assert(arrayList.length > 0);
}

//policyAssignments.listForResourceGroup
async function policyAssignments_listForResourceGroup() {
  const arrayList = [];
  for await (const item of policyclient.policyAssignments.listForResourceGroup(
    resourceGroupName
  )) {
    arrayList.push(item);
    console.log(item);
  }
  console.assert(arrayList.length >= 1);
}

//policyAssignments.listForResource
async function policyAssignments_listForResource() {
  const arrayList = [];
  for await (const item of policyclient.policyAssignments.listForResource(
    resourceGroupName,
    "Microsoft.Compute",
    "",
    "availabilitySets",
    "jstrack2test"
  )) {
    arrayList.push(item);
    console.log(item);
  }
  console.log(arrayList);
}

//policyAssignments.delete
async function policyAssignments_delete() {
  const scope =
    "/providers/Microsoft.Management/managementgroups/20000000-0001-0000-0000-000000000123/";
  await policyclient.policyAssignments
    .delete(scope, policyAssignmentName)
    .then((result) => {
      console.log(result);
    });
}

//policySetDefinitions.createOrUpdateAtManagementGroup
async function policySetDefinitions_createOrUpdateAtManagementGroup() {
  const parameter: PolicySetDefinition = {
    policyDefinitions: [
      {
        policyDefinitionId:
          "/providers/Microsoft.Management/managementgroups/" +
          groupId +
          "/providers/Microsoft.Authorization/policyDefinitions/" +
          policyName,
        policyDefinitionReferenceId: "Limit_Skus",
      },
    ],
  };
  await policyclient.policySetDefinitions
    .createOrUpdateAtManagementGroup(policySetName, groupId, parameter)
    .then((result) => {
      console.log(result);
    });
}

//policySetDefinitions.getAtManagementGroup
async function policySetDefinitions_getAtManagementGroup() {
  await policyclient.policySetDefinitions
    .getAtManagementGroup(policySetName, groupId)
    .then((result) => {
      console.log(result);
    });
}

//policySetDefinitions.listByManagementGroup
async function policySetDefinitions_listByManagementGroup() {
  const arrayList = [];
  for await (const item of policyclient.policySetDefinitions.listByManagementGroup(
    groupId
  )) {
    arrayList.push(item);
    console.log(item);
  }
}

//policySetDefinitions.listBuiltIn
async function policySetDefinitions_listBuiltIn() {
  const arrayList = [];
  for await (const item of policyclient.policySetDefinitions.listBuiltIn()) {
    arrayList.push(item);
    console.log(item);
  }
  // console.assert()
  return arrayList;
}

//policySetDefinitions.list
async function policySetDefinitions_list() {
  const arrayList = [];
  for await (const item of policyclient.policySetDefinitions.list()) {
    arrayList.push(item);
    console.log(item);
  }
}

//policySetDefinitions.getBuiltIn
async function policySetDefinitions_getBuiltIn() {
  const arrayList = await policySetDefinitions_listBuiltIn();
  await policyclient.policySetDefinitions
    .getBuiltIn(arrayList[0].name)
    .then((result) => {
      console.log(result);
    });
}

//policySetDefinitions.deleteAtManagementGroup
async function policySetDefinitions_deleteAtManagementGroup() {
  await policyclient.policySetDefinitions
    .deleteAtManagementGroup(policySetName, groupId)
    .then((result) => {
      console.log(result);
    });
}

//policyDefinitions.deleteAtManagementGroup
async function policyDefinitions_deleteAtManagementGroup() {
  await policyclient.policyDefinitions
    .deleteAtManagementGroup(policyName, groupId)
    .then((result) => {
      console.log(result);
    });
}

//managementGroups.delete
async function managementGroups_delete() {
  await managementclient.managementGroups
    .beginDeleteAndWait(groupId)
    .then((result) => {
      console.log(result);
    });
}

//--PolicyDefinitionExamples--

//policyDefinitions.createOrUpdate
async function policyDefinitions_createOrUpdate() {
  const parameter: PolicyDefinition = {
    policyType: "Custom",
    description: "Don't create a VM anywhere",
    policyRule: {
      if: {
        allof: [
          {
            source: "action",
            equals: "Microsoft.Compute/virtualMachines/read",
          },
          {
            field: "location",
            in: ["eastus", "eastus2", "centralus"],
          },
        ],
      },
      then: {
        effect: "deny",
      },
    },
  };
  const definition = await policyclient.policyDefinitions.createOrUpdate(
    policyName,
    parameter
  );
  console.log(definition);
  return definition;
}

//policyDefinitions.get
async function policyDefinitions_get() {
  const definition = await policyDefinitions_createOrUpdate();
  await policyclient.policyDefinitions.get(definition.name).then((result) => {
    console.log(result);
  });
}

//policyDefinitions.list
async function policyDefinitions_list() {
  const arrayList = [];
  for await (const item of policyclient.policyDefinitions.list()) {
    arrayList.push(item);
    console.log(item);
  }
  console.assert(arrayList.length > 0);
}

//policySetDefinitions.createOrUpdate
async function policySetDefinitions_createOrUpdate() {
  const definition = await policyDefinitions_createOrUpdate();
  const parameter: PolicySetDefinition = {
    displayName: "Cost Management",
    description: "Policies to enforce low cost storage SKUs",
    metadata: {
      category: "Cost Management",
    },
    policyDefinitions: [
      {
        policyDefinitionId: definition.id,
        parameters: {},
      },
    ],
  };
  await policyclient.policySetDefinitions
    .createOrUpdate(policySetName, parameter)
    .then((result) => {
      console.log(result);
    });
}

//policyAssignments.createById
async function policyAssignments_createById() {
  const definition = await policyDefinitions_createOrUpdate();
  const assigment = await policyclient.policyAssignments.createById(policyId, {
    policyDefinitionId: definition.id,
  });
  console.log(assigment);
  return assigment;
}

//policySetDefinitions.get
async function policySetDefinitions_get() {
  await policyclient.policySetDefinitions.get(policySetName).then((result) => {
    console.log(result);
  });
}

//policyAssignments.getById
async function policyAssignments_getById() {
  const assigment = await policyAssignments_createById();
  await policyclient.policyAssignments.getById(assigment.id).then((result) => {
    console.log(result);
  });
}

//policyAssignments.deleteById
async function policyAssignments_deleteById() {
  const assigment = await policyAssignments_createById();
  await policyclient.policyAssignments
    .deleteById(assigment.id)
    .then((result) => {
      console.log(result);
    });
}

//policySetDefinitions.delete
async function policySetDefinitions_delete() {
  await policyclient.policySetDefinitions
    .delete(policySetName)
    .then((result) => {
      console.log(result);
    });
}

//policyDefinitions.delete
async function policyDefinitions_delete() {
  const definition = await policyDefinitions_createOrUpdate();
  await policyclient.policyDefinitions
    .delete(definition.name)
    .then((result) => {
      console.log(result);
    });
}

async function main() {
  policyclient = new PolicyClient(credential, subscriptionId);
  managementclient = new ManagementGroupsAPI(credential);
  await policyDefinitions_createOrUpdateAtManagementGroup();
}

main();
