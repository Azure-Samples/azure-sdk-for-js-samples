import { FeatureClient } from "@azure/arm-features";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();

class FeaturesExamples { 
    
    private featuresClient = new FeatureClient(credential,subscriptionId);

    //features.listAll
    public async features_listAll(){
        const arrayList = new Array();
        for await (let item of this.featuresClient.features.listAll()){
            arrayList.push(item);
            console.log(item);
        }
        console.log(arrayList);
        // console.assert(arrayList.length > 0);
    }

    //features.list
    public async features_list(){
        const arrayList = new Array();
        for await (let item of this.featuresClient.features.list("Microsoft.Compute")){
            arrayList.push(item);
            // console.log(item);
        }
        console.log(arrayList);
        // console.assert(arrayList.length > 0);
        return arrayList;
    }

    //features.get
    public async features_get(){
        const featureList = await this.features_list();
        const featureName = featureList[0].name.split("/")[1];
        const feature = await this.featuresClient.features.get("Microsoft.Compute",featureName);
        console.log(feature);
        return feature;
    }

    //featuresClient.listOperations
    public async listOperations(){
        for await (let item of this.featuresClient.listOperations()){
            console.log(item);
        }
    }
}

