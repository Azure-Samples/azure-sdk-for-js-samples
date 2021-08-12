import { DefaultAzureCredential } from "@azure/identity";
import { FeatureClient } from "@azure/arm-features";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();
let client: FeatureClient;

//--FeaturesExamples--

//features.listAll
async function features_listAll() {
  const arrayList = [];
  for await (const item of client.features.listAll()) {
    arrayList.push(item);
    console.log(item);
  }
  console.log(arrayList);
  // console.assert(arrayList.length > 0);
}

//features.list
async function features_list() {
  const arrayList = [];
  for await (const item of client.features.list("Microsoft.Compute")) {
    arrayList.push(item);
    // console.log(item);
  }
  console.log(arrayList);
  // console.assert(arrayList.length > 0);
  return arrayList;
}

//features.get
async function features_get() {
  const featureList = await features_list();
  const featureName = featureList[0].name.split("/")[1];
  const feature = await client.features.get("Microsoft.Compute", featureName);
  console.log(feature);
  return feature;
}

//client.listOperations
async function listOperations() {
  for await (const item of client.listOperations()) {
    console.log(item);
  }
}

async function main() {
  client = new FeatureClient(credential, subscriptionId);
  await features_listAll();
}

main();
