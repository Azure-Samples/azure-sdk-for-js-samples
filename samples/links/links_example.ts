import { DefaultAzureCredential } from "@azure/identity";
import { ManagementLinkClient } from "@azure/arm-links";
import { ResourceManagementClient } from "@azure/arm-resources";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();
const resourceGroup = "myjstestzzz";
const resourceName = "myresourcezzz";
const linksName = "myLink";
let client: ManagementLinkClient;
let resources_client: ResourceManagementClient;

//--LinksExamples--

//resources.beginCreateOrUpdateAndWait
async function create_resourceId() {
  const result = await resources_client.resources.beginCreateOrUpdateAndWait(
    resourceGroup,
    "Microsoft.Compute",
    "",
    "availabilitySets",
    resourceName,
    "2019-07-01",
    { location: "eastus" }
  );
  console.log(result);
  return result.id;
}

async function create_resourceId2() {
  const result = await resources_client.resources.beginCreateOrUpdateAndWait(
    resourceGroup,
    "Microsoft.Compute",
    "",
    "availabilitySets",
    resourceName + "2",
    "2019-07-01",
    { location: "eastus" }
  );
  console.log(result);
  return result.id;
}

//resourceLinks.createOrUpdate
async function resourceLinks_createOrUpdate() {
  const linkId = await create_resourceId();
  const linkId2 = await create_resourceId2();
  const result = await client.resourceLinks.createOrUpdate(
    linkId + "/providers/Microsoft.Resources/links/" + linksName,
    {
      properties: {
        targetId: linkId2,
        notes: "Testing links",
      },
    }
  );
  console.log(result);
}

//resourceLinks.get
async function resourceLinks_get() {
  const linkId =
    "/subscriptions/" +
    subscriptionId +
    "/resourceGroups/myjstestzzz/providers/Microsoft.Compute/availabilitySets/myresourcezzz/providers/Microsoft.Resources/links/myLink";
  const result = await client.resourceLinks.get(linkId);
  console.log(result);
}

//resourceLinks.listAtSubscription
async function resourceLinks_listAtSubscription() {
  for await (const item of client.resourceLinks.listAtSubscription()) {
    console.log(item);
  }
}

//resourceLinks.listAtSourceScope
async function resourceLinks_listAtSourceScope() {
  const resourceId =
    "/subscriptions/" +
    subscriptionId +
    "/resourceGroups/myjstestzzz/providers/Microsoft.Compute/availabilitySets/myresourcezzz";
  for await (const item of client.resourceLinks.listAtSourceScope(resourceId)) {
    console.log(item);
  }
}

//resourceLinks.delete
async function resourceLinks_delete() {
  const linkId =
    "/subscriptions/" +
    subscriptionId +
    "/resourceGroups/myjstestzzz/providers/Microsoft.Compute/availabilitySets/myresourcezzz/providers/Microsoft.Resources/links/myLink";
  const result = await client.resourceLinks.delete(linkId);
  console.log(result);
}

//resources.beginDeleteAndWait
async function resources_beginDeleteAndWait() {
  //delete reource
  await resources_client.resources
    .beginDeleteAndWait(
      resourceGroup,
      "Microsoft.Compute",
      "",
      "availabilitySets",
      resourceName,
      "2019-07-01"
    )
    .then((res) => {
      console.log(res);
    });

  //delete reources2
  await resources_client.resources
    .beginDeleteAndWait(
      resourceGroup,
      "Microsoft.Compute",
      "",
      "availabilitySets",
      resourceName + "2",
      "2019-07-01"
    )
    .then((res) => {
      console.log(res);
    });
}

async function main() {
  client = new ManagementLinkClient(credential, subscriptionId);
  resources_client = new ResourceManagementClient(credential, subscriptionId);
  await create_resourceId();
}

main();
