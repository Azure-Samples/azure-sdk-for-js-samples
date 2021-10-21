import {
  ContainerRegistryManagementClient,
  ExportPipeline,
  ImportPipeline,
  Registry,
  Task,
  TaskRun,
  TaskRunUpdateParameters,
  TaskUpdateParameters,
} from "azure-arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env.SUBSCRIPTION_ID;
const credential = new DefaultAzureCredential();
const location = "eastus";
const resourceGroup = "myjstest";
const registryName = "myregistryxxxyy";
const importPipelineName = "myimportpipelinexxx";
const exportPipelineName = "myexportpipelinexxx";
const taskRunName = "mytaskrunxxx";
const taskName = "mytaskxxx";
let client: ContainerRegistryManagementClient;

//registries.beginCreateAndWait
async function registries_beginCreateAndWait() {
  const parameter: Registry = {
    location: location,
    tags: {
      key: "value",
    },
    sku: {
      name: "Premium",
    },
    adminUserEnabled: false,
  };
  const res = await client.registries.beginCreateAndWait(
    resourceGroup,
    registryName,
    parameter
  );
  console.log(res);
}

//importPipelines.beginCreateAndWait
async function importPipelines_beginCreateAndWait() {
  const parameter: ImportPipeline = {
    location: location,
    identity: {
      type: "SystemAssigned",
    },
    source: {
      type: "AzureStorageBlobContainer",
      uri: "https://accountname.blob.core.windows.net/containername",
      keyVaultUri: "https://myvault.vault.azure.net/secrets/acrimportsas",
    },
    options: ["OverwriteTags", "DeleteSourceBlobOnSuccess", "ContinueOnErrors"],
  };
  const res = await client.importPipelines.beginCreateAndWait(
    resourceGroup,
    registryName,
    importPipelineName,
    parameter
  );
  console.log(res);
}

//exportPipelines.beginCreateAndWait
async function exportPipelines_beginCreateAndWait() {
  const parameter: ExportPipeline = {
    location: location,
    identity: {
      type: "SystemAssigned",
    },
    target: {
      type: "AzureStorageBlobContainer",
      uri: "https://accountname.blob.core.windows.net/containername",
      keyVaultUri: "https://myvault.vault.azure.net/secrets/acrexportsas",
    },
    options: ["OverwriteBlobs"],
  };
  const res = await client.exportPipelines.beginCreateAndWait(
    resourceGroup,
    registryName,
    exportPipelineName,
    parameter
  );
  console.log(res);
}

//importPipelines.get
async function importPipelines_get() {
  const res = await client.importPipelines.get(
    resourceGroup,
    registryName,
    importPipelineName
  );
  console.log(res);
}

//exportPipelines.get
async function exportPipelines_get() {
  const res = await client.exportPipelines.get(
    resourceGroup,
    registryName,
    exportPipelineName
  );
  console.log(res);
}

//importPipelines.list
async function importPipelines_list() {
  for await (const item of client.importPipelines.list(
    resourceGroup,
    registryName
  )) {
    console.log(item);
  }
}

//exportPipelines.list
async function exportPipelines_list() {
  for await (const item of client.exportPipelines.list(
    resourceGroup,
    registryName
  )) {
    console.log(item);
  }
}

//importPipelines.beginDeleteAndWait
async function importPipelines_beginDeleteAndWait() {
  const res = await client.importPipelines.beginDeleteAndWait(
    resourceGroup,
    registryName,
    importPipelineName
  );
  console.log(res);
}

//exportPipelines.beginDeleteAndWait
async function exportPipelines_beginDeleteAndWait() {
  const res = await client.exportPipelines.beginDeleteAndWait(
    resourceGroup,
    registryName,
    exportPipelineName
  );
  console.log(res);
}

//taskRuns.beginCreateAndWait
async function taskRuns_beginCreateAndWait() {
  const parameter: TaskRun = {
    forceUpdateTag: "test",
    runRequest: {
      type: "DockerBuildRequest",
      imageNames: ["testtaskrun:v1"],
      isPushEnabled: true,
      noCache: false,
      dockerFilePath: "Dockerfile",
      platform: {
        os: "linux",
        architecture: "amd64",
      },
      sourceLocation:
        "https://github.com/Azure-Samples/acr-build-helloworld-node.git",
      isArchiveEnabled: true,
    },
  };
  const res = await client.taskRuns.beginCreateAndWait(
    resourceGroup,
    registryName,
    taskRunName,
    parameter
  );
}

//taskRuns.get
async function taskRuns_get() {
  const res = await client.taskRuns.get(
    resourceGroup,
    registryName,
    taskRunName
  );
  console.log(res);
}

//runs.get
async function runs_get() {
  const runid = await client.taskRuns.get(
    resourceGroup,
    registryName,
    taskRunName
  );
  const res = await client.runs.get(
    resourceGroup,
    registryName,
    runid.runResult.runId
  );
  console.log(res);
}

//taskRuns.list
async function taskRuns_list() {
  for await (const item of client.taskRuns.list(resourceGroup, registryName)) {
    console.log(item);
  }
}

//taskRuns.getDetails
async function taskRuns_getDetails() {
  const res = await client.taskRuns.getDetails(
    resourceGroup,
    registryName,
    taskRunName
  );
  console.log(res);
}

//taskRuns.beginUpdateAndWait
async function taskRuns_beginUpdateAndWait() {
  const parameter: TaskRunUpdateParameters = {
    forceUpdateTag: "test",
    runRequest: {
      type: "DockerBuildRequest",
      imageNames: ["testtaskrun:v1"],
      isPushEnabled: true,
      noCache: false,
      dockerFilePath: "Dockerfile",
      platform: {
        os: "Linux",
        architecture: "amd64",
      },
      sourceLocation:
        "https://github.com/Azure-Samples/acr-build-helloworld-node.git",
      isArchiveEnabled: true,
    },
  };
  const res = await client.taskRuns.beginUpdateAndWait(
    resourceGroup,
    registryName,
    taskRunName,
    parameter
  );
  console.log(res);
}

//runs.getLogSasUrl
async function runs_getLogSasUrl() {
  const runid = await client.taskRuns.get(
    resourceGroup,
    registryName,
    taskRunName
  );
  const res = await client.runs.getLogSasUrl(
    resourceGroup,
    registryName,
    runid.runResult.runId
  );
  console.log(res);
}

//runs.beginCancelAndWait
async function runs_beginCancelAndWait() {
  const runid = await client.taskRuns.get(
    resourceGroup,
    registryName,
    taskRunName
  );
  const res = await client.runs.beginCancelAndWait(
    resourceGroup,
    registryName,
    runid.runResult.runId
  );
  console.log(res);
}

//taskRuns.beginDeleteAndWait
async function taskRuns_beginDeleteAndWait() {
  const res = await client.taskRuns.beginDeleteAndWait(
    resourceGroup,
    registryName,
    taskRunName
  );
  console.log(res);
}

//registries.beginCreateAndWait for Tasks
async function registries_beginCreateAndWaitForTasks() {
  const resDelete = await client.registries.beginDeleteAndWait(
    resourceGroup,
    registryName
  );
  const parameter: Registry = {
    location: location,
    tags: {
      key: "value",
    },
    sku: {
      name: "Standard",
    },
    adminUserEnabled: true,
  };
  const resCreate = await client.registries.beginCreateAndWait(
    resourceGroup,
    registryName,
    parameter
  );
}

//tasks.beginCreateAndWait
async function tasks_beginCreateAndWait() {
  const parameter: Task = {
    location: location,
    tags: {
      testkey: "value",
    },
    status: "Enabled",
    platform: {
      os: "Linux",
      architecture: "amd64",
    },
    agentConfiguration: {
      cpu: 2,
    },
    step: {
      type: "Docker",
      contextPath: "https://github.com/SteveLasker/node-helloworld",
      imageNames: ["testtask:v1"],
      dockerFilePath: "DockerFile",
      isPushEnabled: true,
      noCache: false,
    },
    trigger: {
      baseImageTrigger: {
        name: "myBaseImageTrigger",
        baseImageTriggerType: "Runtime",
        updateTriggerPayloadType: "Default",
        status: "Enabled",
      },
    },
  };
  const res = await client.tasks.beginCreateAndWait(
    resourceGroup,
    registryName,
    taskName,
    parameter
  );
  console.log(res);
}

//tasks.get
async function tasks_get() {
  const res = await client.tasks.get(resourceGroup, registryName, taskName);
  console.log(res);
}

//tasks.list
async function tasks_list() {
  for await (const item of client.tasks.list(resourceGroup, registryName)) {
    console.log(item);
  }
}

//tasks.getDetails
async function tasks_getDetails() {
  const res = await client.tasks.getDetails(
    resourceGroup,
    registryName,
    taskName
  );
  console.log(res);
}

//tasks.beginUpdateAndWait
async function tasks_beginUpdateAndWait() {
  const parameter: TaskUpdateParameters = {
    tags: {
      testkey: "value",
    },
    status: "Enabled",
    platform: {
      os: "Linux",
      architecture: "amd64",
    },
    agentConfiguration: {
      cpu: 2,
    },
    step: {
      type: "Docker",
      contextPath: "https://github.com/SteveLasker/node-helloworld",
      imageNames: ["testtask:v1"],
      dockerFilePath: "DockerFile",
      isPushEnabled: true,
      noCache: false,
    },
    trigger: {
      baseImageTrigger: {
        name: "myBaseImageTrigger",
        baseImageTriggerType: "Runtime",
        updateTriggerPayloadType: "Default",
        status: "Enabled",
      },
    },
  };
  const res = await client.tasks.beginUpdateAndWait(
    resourceGroup,
    registryName,
    taskName,
    parameter
  );
  console.log(res);
}

//tasks.beginDeleteAndWait
async function tasks_beginDeleteAndWait() {
  const res = await client.tasks.beginDeleteAndWait(
    resourceGroup,
    registryName,
    taskName
  );
  console.log(res);
}

//registries.beginDeleteAndWait
async function registries_beginDeleteAndWait() {
  const res = await client.registries.beginDeleteAndWait(
    resourceGroup,
    registryName
  );
  console.log(res);
}

async function main() {
  client = new ContainerRegistryManagementClient(credential, subscriptionId);
  await registries_beginDeleteAndWait();
}

main();
