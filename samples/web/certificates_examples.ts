import { Certificate, WebSiteManagementClient } from "azure-arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env.subscriptionId;
const token = process.env.GITHUB_TOKEN_FOR_APPSERVICE;
const credential = new DefaultAzureCredential();
const resourceGroup = "myjstest";
const name = "mynamezzz";
let client: WebSiteManagementClient;

//--CertificatesExamples--

//certificates.createOrUpdate
async function certificates_createOrUpdate() {
  const parameter: Certificate = {
    location: "westus",
    hostNames: ["ServerCert"],
    password: "SWsSsd__233$Sdsds#%Sd!",
  };
  await client.certificates
    .createOrUpdate(resourceGroup, name, parameter)
    .then((res) => {
      console.log(res);
    });
}

//certificates.get
async function certificates_get() {
  await client.certificates.get(resourceGroup, name).then((res) => {
    console.log(res);
  });
}

//certificates.listByResourceGroup
async function certificates_listByResourceGroup() {
  for await (const item of client.certificates.listByResourceGroup(
    resourceGroup
  )) {
    console.log(item);
  }
}

//certificates.list
async function certificates_list() {
  for await (const item of client.certificates.list()) {
    console.log(item);
  }
}

//certificateRegistrationProvider.listOperations
async function certificateRegistrationProvider_listOperations() {
  for await (const item of client.certificateRegistrationProvider.listOperations()) {
    console.log(item);
  }
}

//certificates.update
async function certificates_update() {
  await client.certificates
    .update(resourceGroup, name, { password: "SWsSsd__233$Sdsds#%Sd!" })
    .then((res) => {
      console.log(res);
    });
}

//certificates.delete
async function certificates_delete() {
  await client.certificates.delete(resourceGroup, name).then((res) => {
    console.log(res);
  });
}

async function main() {
  client = new WebSiteManagementClient(credential, subscriptionId);
  await certificates_createOrUpdate();
}

main();
