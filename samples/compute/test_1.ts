import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { ComputeManagementClient,AvailabilitySet } from "@azure/arm-compute";
import {DefaultAzureCredential,ClientSecretCredential} from "@azure/identity";
const subscriptionId = process.env.subscriptionId;
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; 

const tenantId = '72f988bf-86f1-41af-91ab-2d7cd011db47';
const servicePrincipalId = '147dd57b-ff60-4ec8-8529-35dc223f1a33';
const servicePrincipalPassword = '95L66-bx4R_HN9Un5iM4U5K-6EuQW~PMbD';
const credential = new ClientSecretCredential(tenantId, servicePrincipalId, servicePrincipalPassword);
// credential.getToken("")
// const credential = new DefaultAzureCredential();
const client = new ComputeManagementClient(credential, subscriptionId);
const body: AvailabilitySet = {
  platformFaultDomainCount: 2,
  platformUpdateDomainCount: 20,
  location: "eastus"
  };
client.availabilitySets.createOrUpdate("qiaozhatest","availabilitySets",body).then((result) => {
  console.log("The result is:");
  console.log(result);
});