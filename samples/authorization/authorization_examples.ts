import {
  AuthorizationManagementClient,
  RoleAssignmentCreateParameters,
} from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();
const resourceGroup = "myjstest";
const roleDefinitionName = "e078ab98-ef3a-4c9a-aba7-12f5172b45d0";
const roleAssignmentName = "37c86f8c-37ea-4ab5-989f-adbfe4bc7e72";
const scope =
  "subscriptions/" + subscriptionId + "/resourcegroups/" + resourceGroup;
const roleId =
  scope +
  "/providers/Microsoft.Authorization/roleAssignments/" +
  roleAssignmentName;
let client: AuthorizationManagementClient;

async function roleAssignments_createById() {
  const parameter: RoleAssignmentCreateParameters = {
    roleDefinitionId:
      "/subscriptions/" +
      subscriptionId +
      "/providers/Microsoft.Authorization/roleDefinitions/" +
      roleDefinitionName,
    principalId: process.env.principalId, //create a management identity and copy objectId
  };
  await client.roleAssignments.createById(roleId, parameter).then((res) => {
    console.log(res);
  });
}

async function roleAssignments_getById() {
  await client.roleAssignments.getById(roleId).then((res) => {
    console.log(res);
  });
}

async function roleAssignments_get() {
  await client.roleAssignments.get(scope, roleAssignmentName).then((res) => {
    console.log(res);
  });
}

async function roleAssignments_list() {
  for await (const item of client.roleAssignments.list()) {
    console.log(item);
  }
}

async function roleAssignments_listForResourceGroup() {
  for await (const item of client.roleAssignments.listForResourceGroup(
    "myjstest"
  )) {
    console.log(item);
  }
}

async function roleAssignments_listForScope() {
  for await (const item of client.roleAssignments.listForScope(scope)) {
    console.log(item);
  }
}

async function roleAssignments_deleteById() {
  await client.roleAssignments.deleteById(roleId).then((res) => {
    console.log(res);
  });
}

async function roleAssignments_delete() {
  await client.roleAssignments.delete(scope, roleAssignmentName).then((res) => {
    console.log(res);
  });
}

async function main() {
  client = new AuthorizationManagementClient(credential, subscriptionId);
  await roleAssignments_listForScope();
}

main();
