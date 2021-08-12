import {
  AppServicePlan,
  Site,
  SiteConfigResource,
  SitePatchResource,
  SiteSourceControl,
  WebSiteManagementClient,
} from "azure-arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env.subscriptionId;
const token = process.env.GITHUB_TOKEN_FOR_APPSERVICE;
const credential = new DefaultAzureCredential();
const resourceGroup = "myjstest";
const name = "mysitexxxx";
const soltName = "stagingxxx";
const appservicePlanName = "myappserviceplanxxx";
let client: WebSiteManagementClient;

//--WebAppSlotExamples--

//appServicePlans.beginCreateOrUpdateAndWait
async function appServicePlans_beginCreateOrUpdateAndWait() {
  const parameter: AppServicePlan = {
    location: "eastus",
    sku: {
      name: "S1",
      tier: "STANDARD",
      capacity: 1,
    },
    perSiteScaling: false,
    isXenon: false,
  };
  await client.appServicePlans
    .beginCreateOrUpdateAndWait(resourceGroup, appservicePlanName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//webApps.beginCreateOrUpdateAndWait
async function webApps_beginCreateOrUpdateAndWait() {
  const parameter: Site = {
    location: "eastus",
    serverFarmId:
      "/subscriptions/" +
      subscriptionId +
      "/resourceGroups/myjstest/providers/Microsoft.Web/serverfarms/myappserviceplanxxx",
    reserved: false,
    isXenon: false,
    hyperV: false,
    siteConfig: {
      netFrameworkVersion: "v4.6",
      appSettings: [
        {
          name: "WEBSITE_NODE_DEFAULT_VERSION",
          value: "10.14",
        },
      ],
      localMySqlEnabled: false,
      http20Enabled: true,
    },
    scmSiteAlsoStopped: false,
    httpsOnly: false,
  };
  await client.webApps
    .beginCreateOrUpdateAndWait(resourceGroup, name, parameter)
    .then((res) => {
      console.log(res);
    });
}

//webApps.beginCreateOrUpdateSlotAndWait
async function webApps_beginCreateOrUpdateSlotAndWait() {
  const parameter: Site = {
    location: "eastus",
    serverFarmId:
      "/subscriptions/" +
      subscriptionId +
      "/resourceGroups/myjstest/providers/Microsoft.Web/serverfarms/myappserviceplanxxx",
    reserved: false,
    isXenon: false,
    hyperV: false,
    siteConfig: {
      netFrameworkVersion: "v4.6",
      localMySqlEnabled: false,
      http20Enabled: true,
    },
    scmSiteAlsoStopped: false,
  };
  await client.webApps
    .beginCreateOrUpdateSlotAndWait(resourceGroup, name, soltName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//webApps.createOrUpdateConfigurationSlot
async function webApps_createOrUpdateConfigurationSlot() {
  const parameter: SiteConfigResource = {
    numberOfWorkers: 1,
    defaultDocuments: [
      "Default.htm",
      "Default.html",
      "Default.asp",
      "index.htm",
      "index.html",
      "iisstart.htm",
      "default.aspx",
      "index.php",
      "hostingstart.html",
    ],
    netFrameworkVersion: "v3.5",
    phpVersion: "7.2",
    pythonVersion: "3.4",
    nodeVersion: "",
    powerShellVersion: "",
    linuxFxVersion: "",
    requestTracingEnabled: false,
    remoteDebuggingEnabled: false,
    httpLoggingEnabled: false,
    logsDirectorySizeLimit: 35,
    detailedErrorLoggingEnabled: false,
    publishingUsername: "$webapp-config-test000002",
    scmType: "None",
    use32BitWorkerProcess: false,
    webSocketsEnabled: true,
    alwaysOn: true,
    appCommandLine: "",
    managedPipelineMode: "Integrated",
    virtualApplications: [
      {
        virtualPath: "/",
        physicalPath: "site\\wwwroot",
        preloadEnabled: true,
      },
    ],
    loadBalancing: "LeastRequests",
    experiments: {
      rampUpRules: [],
    },
    autoHealEnabled: true,
    vnetName: "",
    localMySqlEnabled: false,
    ipSecurityRestrictions: [
      {
        ipAddress: "Any",
        action: "Allow",
        priority: 1,
        name: "Allow all",
        description: "Allow all access",
      },
    ],
    scmIpSecurityRestrictions: [
      {
        ipAddress: "Any",
        action: "Allow",
        priority: 1,
        name: "Allow all",
        description: "Allow all access",
      },
    ],
    scmIpSecurityRestrictionsUseMain: false,
    http20Enabled: true,
    minTlsVersion: "1.0",
    ftpsState: "Disabled",
    preWarmedInstanceCount: 0,
  };
  await client.webApps
    .createOrUpdateConfigurationSlot(resourceGroup, name, soltName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//webApps.beginCreateOrUpdateSourceControlSlotAndWait
async function webApps_beginCreateOrUpdateSourceControlSlotAndWait() {
  const parameter: SiteSourceControl = {
    repoUrl: "https://github.com/colawwj/azure-site-test",
    branch: "staging",
    isManualIntegration: true,
    isMercurial: false,
  };
  await client.webApps
    .beginCreateOrUpdateSourceControlSlotAndWait(
      resourceGroup,
      name,
      soltName,
      parameter
    )
    .then((res) => {
      console.log(res);
    });
}

//webApps.getSlot
async function webApps_getSlot() {
  await client.webApps.getSlot(resourceGroup, name, soltName).then((res) => {
    console.log(res);
  });
}

//webApps.getConfigurationSlot
async function webApps_getConfigurationSlot() {
  await client.webApps
    .getConfigurationSlot(resourceGroup, name, soltName)
    .then((res) => {
      console.log(res);
    });
}

//webApps.getSourceControlSlot
async function webApps_getSourceControlSlot() {
  await client.webApps
    .getSourceControlSlot(resourceGroup, name, soltName)
    .then((res) => {
      console.log(res);
    });
}

//webApps.listSlots
async function webApps_listSlots() {
  for await (const item of client.webApps.listSlots(resourceGroup, name)) {
    console.log(item);
  }
}

//webApps.updateSlot
async function webApps_updateSlot() {
  const parameter: SitePatchResource = {
    serverFarmId:
      "/subscriptions/" +
      subscriptionId +
      "/resourceGroups/myjstest/providers/Microsoft.Web/serverfarms/myappserviceplanxxx",
    reserved: false,
    isXenon: false,
    hyperV: false,
    siteConfig: {
      netFrameworkVersion: "v4.6",
      localMySqlEnabled: false,
      http20Enabled: true,
    },
    scmSiteAlsoStopped: false,
  };
  await client.webApps
    .updateSlot(resourceGroup, name, soltName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//webApps.updateConfigurationSlot
async function webApps_updateConfigurationSlot() {
  const parameter: SiteConfigResource = {
    numberOfWorkers: 1,
    defaultDocuments: [
      "Default.htm",
      "Default.html",
      "Default.asp",
      "index.htm",
      "index.html",
      "iisstart.htm",
      "default.aspx",
      "index.php",
      "hostingstart.html",
    ],
    netFrameworkVersion: "v3.5",
    phpVersion: "7.2",
    pythonVersion: "3.4",
    nodeVersion: "",
    powerShellVersion: "",
    linuxFxVersion: "",
    requestTracingEnabled: false,
    remoteDebuggingEnabled: false,
    httpLoggingEnabled: false,
    logsDirectorySizeLimit: 35,
    detailedErrorLoggingEnabled: false,
    publishingUsername: "$webapp-config-test000002",
    scmType: "None",
    use32BitWorkerProcess: false,
    webSocketsEnabled: true,
    alwaysOn: true,
    appCommandLine: "",
    managedPipelineMode: "Integrated",
    virtualApplications: [
      {
        virtualPath: "/",
        physicalPath: "site\\wwwroot",
        preloadEnabled: true,
      },
    ],
    loadBalancing: "LeastRequests",
    experiments: {
      rampUpRules: [],
    },
    autoHealEnabled: true,
    vnetName: "",
    localMySqlEnabled: false,
    ipSecurityRestrictions: [
      {
        ipAddress: "Any",
        action: "Allow",
        priority: 1,
        name: "Allow all",
        description: "Allow all access",
      },
    ],
    scmIpSecurityRestrictions: [
      {
        ipAddress: "Any",
        action: "Allow",
        priority: 1,
        name: "Allow all",
        description: "Allow all access",
      },
    ],
    scmIpSecurityRestrictionsUseMain: false,
    http20Enabled: true,
    minTlsVersion: "1.0",
    ftpsState: "Disabled",
    preWarmedInstanceCount: 0,
  };
  await client.webApps
    .updateConfigurationSlot(resourceGroup, name, soltName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//webApps.updateSourceControlSlot
async function webApps_updateSourceControlSlot() {
  const parameter: SiteSourceControl = {
    repoUrl: "https://github.com/colawwj/azure-site-test",
    branch: "staging",
    isManualIntegration: true,
    isMercurial: false,
  };
  await client.webApps
    .updateSourceControlSlot(resourceGroup, name, soltName, parameter)
    .then((res) => {
      console.log(res);
    });
}

//webApps.startSlot
async function webApps_startSlot() {
  await client.webApps.startSlot(resourceGroup, name, soltName).then((res) => {
    console.log(res);
  });
}

//webApps.restartSlot
async function webApps_restartSlot() {
  await client.webApps
    .restartSlot(resourceGroup, name, soltName)
    .then((res) => {
      console.log(res);
    });
}

//webApps.stopSlot
async function webApps_stopSlot() {
  await client.webApps.stopSlot(resourceGroup, name, soltName).then((res) => {
    console.log(res);
  });
}

//webApps.deleteSourceControlSlot
async function webApps_deleteSourceControlSlot() {
  await client.webApps
    .deleteSourceControlSlot(resourceGroup, name, soltName)
    .then((res) => {
      console.log(res);
    });
}

//webApps.deleteSlot
async function webApps_deleteSlot() {
  await client.webApps.deleteSlot(resourceGroup, name, soltName).then((res) => {
    console.log(res);
  });
}

//--WebAppExamples--

//webApps.createOrUpdateConfiguration
async function webApps_createOrUpdateConfiguration() {
  const parameter: SiteConfigResource = {
    numberOfWorkers: 1,
    defaultDocuments: [
      "Default.htm",
      "Default.html",
      "Default.asp",
      "index.htm",
      "index.html",
      "iisstart.htm",
      "default.aspx",
      "index.php",
      "hostingstart.html",
    ],
    netFrameworkVersion: "v3.5",
    phpVersion: "7.2",
    pythonVersion: "3.4",
    nodeVersion: "",
    powerShellVersion: "",
    linuxFxVersion: "",
    requestTracingEnabled: false,
    remoteDebuggingEnabled: false,
    httpLoggingEnabled: false,
    logsDirectorySizeLimit: 35,
    detailedErrorLoggingEnabled: false,
    publishingUsername: "$webapp-config-test000002",
    scmType: "None",
    use32BitWorkerProcess: false,
    webSocketsEnabled: true,
    alwaysOn: true,
    appCommandLine: "",
    managedPipelineMode: "Integrated",
    virtualApplications: [
      {
        virtualPath: "/",
        physicalPath: "site\\wwwroot",
        preloadEnabled: true,
      },
    ],
    loadBalancing: "LeastRequests",
    experiments: {
      rampUpRules: [],
    },
    autoHealEnabled: true,
    vnetName: "",
    localMySqlEnabled: false,
    ipSecurityRestrictions: [
      {
        ipAddress: "Any",
        action: "Allow",
        priority: 1,
        name: "Allow all",
        description: "Allow all access",
      },
    ],
    scmIpSecurityRestrictions: [
      {
        ipAddress: "Any",
        action: "Allow",
        priority: 1,
        name: "Allow all",
        description: "Allow all access",
      },
    ],
    scmIpSecurityRestrictionsUseMain: false,
    http20Enabled: true,
    minTlsVersion: "1.0",
    ftpsState: "Disabled",
    preWarmedInstanceCount: 0,
  };
  await client.webApps
    .createOrUpdateConfiguration(resourceGroup, name, parameter)
    .then((res) => {
      console.log(res);
    });
}

//webApps.beginCreateOrUpdateSourceControlAndWait
async function webApps_beginCreateOrUpdateSourceControlAndWait() {
  const parameter: SiteSourceControl = {
    repoUrl: "https://github.com/colawwj/azure-site-test",
    branch: "staging",
    isManualIntegration: true,
    isMercurial: false,
  };
  await client.webApps
    .beginCreateOrUpdateSourceControlAndWait(resourceGroup, name, parameter)
    .then((res) => {
      console.log(res);
    });
}

//webApps.getConfiguration
async function webApps_getConfiguration() {
  await client.webApps.getConfiguration(resourceGroup, name).then((res) => {
    console.log(res);
  });
}

//webApps.get
async function webApps_get() {
  await client.webApps.get(resourceGroup, name).then((res) => {
    console.log(res);
  });
}

//webApps.getSourceControl
async function webApps_getSourceControl() {
  await client.webApps.getSourceControl(resourceGroup, name).then((res) => {
    console.log(res);
  });
}

//webApps.list
async function webApps_list() {
  for await (const item of client.webApps.list()) {
    console.log(item);
  }
}

//webApps.listConfigurations
async function webApps_listConfigurations() {
  for await (const item of client.webApps.listConfigurations(
    resourceGroup,
    name
  )) {
    console.log(item);
  }
}

//webApps.update
async function webApps_update() {
  const parameter: SitePatchResource = {
    serverFarmId:
      "/subscriptions/" +
      subscriptionId +
      "/resourceGroups/myjstest/providers/Microsoft.Web/serverfarms/myappserviceplanxxx",
    reserved: false,
    isXenon: false,
    hyperV: false,
    siteConfig: {
      netFrameworkVersion: "v4.6",
      localMySqlEnabled: false,
      http20Enabled: true,
    },
    scmSiteAlsoStopped: false,
  };
  await client.webApps.update(resourceGroup, name, parameter).then((res) => {
    console.log(res);
  });
}

//webApps.updateConfiguration
async function webApps_updateConfiguration() {
  const parameter: SiteConfigResource = {
    numberOfWorkers: 1,
    defaultDocuments: [
      "Default.htm",
      "Default.html",
      "Default.asp",
      "index.htm",
      "index.html",
      "iisstart.htm",
      "default.aspx",
      "index.php",
      "hostingstart.html",
    ],
    netFrameworkVersion: "v3.5",
    phpVersion: "7.2",
    pythonVersion: "3.4",
    nodeVersion: "",
    powerShellVersion: "",
    linuxFxVersion: "",
    requestTracingEnabled: false,
    remoteDebuggingEnabled: false,
    httpLoggingEnabled: false,
    logsDirectorySizeLimit: 35,
    detailedErrorLoggingEnabled: false,
    publishingUsername: "$webapp-config-test000002",
    scmType: "None",
    use32BitWorkerProcess: false,
    webSocketsEnabled: true,
    alwaysOn: true,
    appCommandLine: "",
    managedPipelineMode: "Integrated",
    virtualApplications: [
      {
        virtualPath: "/",
        physicalPath: "site\\wwwroot",
        preloadEnabled: true,
      },
    ],
    loadBalancing: "LeastRequests",
    experiments: {
      rampUpRules: [],
    },
    autoHealEnabled: true,
    vnetName: "",
    localMySqlEnabled: false,
    ipSecurityRestrictions: [
      {
        ipAddress: "Any",
        action: "Allow",
        priority: 1,
        name: "Allow all",
        description: "Allow all access",
      },
    ],
    scmIpSecurityRestrictions: [
      {
        ipAddress: "Any",
        action: "Allow",
        priority: 1,
        name: "Allow all",
        description: "Allow all access",
      },
    ],
    scmIpSecurityRestrictionsUseMain: false,
    http20Enabled: true,
    minTlsVersion: "1.0",
    ftpsState: "Disabled",
    preWarmedInstanceCount: 0,
  };
  await client.webApps
    .updateConfiguration(resourceGroup, name, parameter)
    .then((res) => {
      console.log(res);
    });
}

//webApps.updateSourceControl
async function webApps_updateSourceControl() {
  const parameter: SiteSourceControl = {
    repoUrl: "https://github.com/colawwj/azure-site-test",
    branch: "staging",
    isManualIntegration: true,
    isMercurial: false,
  };
  await client.webApps
    .updateSourceControl(resourceGroup, name, parameter)
    .then((res) => {
      console.log(res);
    });
}

//webApps.start
async function webApps_start() {
  await client.webApps.start(resourceGroup, name).then((res) => {
    console.log(res);
  });
}

//webApps.restart
async function webApps_restart() {
  await client.webApps.restart(resourceGroup, name).then((res) => {
    console.log(res);
  });
}

//webApps.stop
async function webApps_stop() {
  await client.webApps.stop(resourceGroup, name).then((res) => {
    console.log(res);
  });
}

//webApps.deleteSourceControl
async function webApps_deleteSourceControl() {
  await client.webApps.deleteSourceControl(resourceGroup, name).then((res) => {
    console.log(res);
  });
}

//--WebAppBackUpExamples--

//webApps.updateScmAllowed
async function webApps_updateScmAllowed() {
  await client.webApps
    .updateScmAllowed(resourceGroup, name, { allow: true })
    .then((res) => {
      console.log(res);
    });
}

//webApps.updateFtpAllowed
async function webApps_updateFtpAllowed() {
  await client.webApps
    .updateFtpAllowed(resourceGroup, name, { allow: true })
    .then((res) => {
      console.log(res);
    });
}

//webApps.getScmAllowed
async function webApps_getScmAllowed() {
  await client.webApps.getScmAllowed(resourceGroup, name).then((res) => {
    console.log(res);
  });
}

//webApps.getFtpAllowed
async function webApps_getFtpAllowed() {
  await client.webApps.getFtpAllowed(resourceGroup, name).then((res) => {
    console.log(res);
  });
}

//webApps.getPrivateLinkResources
async function webApps_getPrivateLinkResources() {
  await client.webApps
    .getPrivateLinkResources(resourceGroup, name)
    .then((res) => {
      console.log(res);
    });
}

//webApps.listSiteBackups
async function webApps_listSiteBackups() {
  for await (const item of client.webApps.listSiteBackups(
    resourceGroup,
    name
  )) {
    console.log(item);
  }
}

//webApps.delete
async function webApps_delete() {
  await client.webApps.delete(resourceGroup, name).then((res) => {
    console.log(res);
  });
}

async function main() {
  client = new WebSiteManagementClient(credential, subscriptionId);
  await appServicePlans_beginCreateOrUpdateAndWait();
}

main();
