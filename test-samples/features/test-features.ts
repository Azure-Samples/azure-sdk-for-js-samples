import { FeatureClient } from "azure-arm-features";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env.subscriptionId;
const credential = new DefaultAzureCredential();

class TestFeatures { 
    
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

    //features.register
    public async features_register(){
        const feature = await this.features_get();
        // console.log(feature)
        const featureName = feature.name.split("/")[1];
        await this.featuresClient.features.register("Microsoft.Compute",featureName).then(
            result => {
                console.log(result); //The feature 'CanonicalEssentialsPlan' is not owned by current client making the request.
            }
        )
    }

    //featuresClient.listOperations
    public async test_listOperations(){
        for await (let item of this.featuresClient.listOperations()){
            console.log(item);
        }
    }
}

const t = new TestFeatures();
t.test_listOperations();