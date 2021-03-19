"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
var arm_resources_1 = require("@azure/arm-resources");
var arm_managementgroups_1 = require("@azure/arm-managementgroups");
var identity_1 = require("@azure/identity");
var subscriptionId = process.env.subscriptionId;
var credential = new identity_1.DefaultAzureCredential();
var TestTagsOperation = /** @class */ (function () {
    function TestTagsOperation() {
        this.resourceClient = new arm_resources_1.ResourceManagementClient(credential, subscriptionId);
        this.tagName = "tagyyy";
        this.tagValue = "valueyyy";
    }
    //tags.createOrUpdate
    TestTagsOperation.prototype.tags_createOrUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tag;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.tags.createOrUpdate(this.tagName)];
                    case 1:
                        tag = _a.sent();
                        console.assert(tag.tagName === this.tagName); // if not same will return  "Assertion failed"
                        return [2 /*return*/];
                }
            });
        });
    };
    //tags.createOrUpdateValue
    TestTagsOperation.prototype.testtags_createOrUpdateValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tag;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.tags.createOrUpdateValue(this.tagName, this.tagValue)];
                    case 1:
                        tag = _a.sent();
                        console.assert(tag.tagValue === this.tagValue);
                        return [2 /*return*/];
                }
            });
        });
    };
    //tags.list
    TestTagsOperation.prototype.test_tags_list = function () {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function () {
            var tag_list, _b, _c, item, e_1_1, _i, tag_list_1, tag_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        tag_list = new Array();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(this.resourceClient.tags.list());
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        item = _c.value;
                        tag_list.push(item);
                        _d.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _d.trys.push([7, , 10, 11]);
                        if (!(_c && !_c.done && (_a = _b["return"]))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _a.call(_b)];
                    case 8:
                        _d.sent();
                        _d.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12:
                        // console.log("------------------------------------")
                        // console.log(tag_list)  // values will change into object after push into tag_list
                        console.assert(tag_list.length > 0);
                        for (_i = 0, tag_list_1 = tag_list; _i < tag_list_1.length; _i++) {
                            tag_1 = tag_list_1[_i];
                            if (tag_1.tagName) {
                                continue;
                            }
                            else {
                                console.assert(false);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //tags.deleteValue
    TestTagsOperation.prototype.test_tags_deleteValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.tags.deleteValue(this.tagName, this.tagValue).then(function (result) {
                            console.log(result);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //tags.delete
    TestTagsOperation.prototype.test_tags_delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.tags["delete"](this.tagName).then(function (result) {
                            console.log(result);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //tags.createOrUpdateAtScope
    TestTagsOperation.prototype.test_tags_createOrUpdateAtScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var scope, parameter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        scope = "subscriptions/" + subscriptionId;
                        parameter = {
                            properties: {
                                tags: {
                                    tagkey1: "tagValue1",
                                    tagkey2: "tagValue2"
                                }
                            }
                        };
                        return [4 /*yield*/, this.resourceClient.tags.createOrUpdateAtScope(scope, parameter).then(function (result) {
                                console.log(result);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //tags.getAtScope
    TestTagsOperation.prototype.test_tags_getAtScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var scope;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        scope = "subscriptions/" + subscriptionId;
                        return [4 /*yield*/, this.resourceClient.tags.getAtScope(scope).then(function (result) {
                                console.log(result);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //tags.updateAtScope
    TestTagsOperation.prototype.test_tags_updateAtScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var scope, parameter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        scope = "subscriptions/" + subscriptionId;
                        parameter = {
                            operation: "Delete",
                            properties: {
                                tags: {
                                    tagkey1: "tagValue1"
                                }
                            }
                        };
                        return [4 /*yield*/, this.resourceClient.tags.updateAtScope(scope, parameter).then(function (result) {
                                console.log(result);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TestTagsOperation;
}());
var TestResourceGroup = /** @class */ (function () {
    function TestResourceGroup() {
        this.resourceClient = new arm_resources_1.ResourceManagementClient(credential, subscriptionId);
        this.resourceGroupName = "myjstest";
    }
    //resourceGroups.createOrUpdate
    TestResourceGroup.prototype.test_resourceGroups_createOrUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var parameter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameter = {
                            location: "eastus",
                            tags: {
                                tag1: "value1"
                            }
                        };
                        return [4 /*yield*/, this.resourceClient.resourceGroups.createOrUpdate(this.resourceGroupName, parameter).then(function (result) {
                                console.log(result);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //resourceGroups.get
    TestResourceGroup.prototype.test_resourceGroups_get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result_get;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.resourceGroups.get(this.resourceGroupName)];
                    case 1:
                        result_get = _a.sent();
                        // console.log(result_get);  
                        console.assert(result_get.name === this.resourceGroupName);
                        console.assert(result_get.tags.tag1 === "value1");
                        return [2 /*return*/];
                }
            });
        });
    };
    //resourceGroups.checkExistence
    TestResourceGroup.prototype.test_resourceGroups_checkExistence = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result_check, unknowGroup, result_check_unknowGroup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.resourceGroups.checkExistence(this.resourceGroupName)];
                    case 1:
                        result_check = _a.sent();
                        // console.log(result_check);  //{ body: true }
                        console.assert(result_check.body === true);
                        unknowGroup = "unknowGroup";
                        return [4 /*yield*/, this.resourceClient.resourceGroups.checkExistence(unknowGroup)];
                    case 2:
                        result_check_unknowGroup = _a.sent();
                        // console.log(result_check_unknowGroup)  //{ body: false }
                        console.assert(result_check_unknowGroup.body === true); // Assertion failed
                        return [2 /*return*/];
                }
            });
        });
    };
    //resourceGroups.list
    TestResourceGroup.prototype.test_resourceGroups_list = function () {
        var e_2, _a;
        return __awaiter(this, void 0, void 0, function () {
            var result_list, _b, _c, item, e_2_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        result_list = new Array();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(this.resourceClient.resourceGroups.list());
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        item = _c.value;
                        // console.log(item);
                        result_list.push(item);
                        _d.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_2_1 = _d.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _d.trys.push([7, , 10, 11]);
                        if (!(_c && !_c.done && (_a = _b["return"]))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _a.call(_b)];
                    case 8:
                        _d.sent();
                        _d.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12:
                        // console.log(result_list);
                        console.assert(result_list.length > 0);
                        return [2 /*return*/];
                }
            });
        });
    };
    //resourceGroups.list
    TestResourceGroup.prototype.test_resourceGroups_listTop2 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result_list_top2;
            return __generator(this, function (_a) {
                result_list_top2 = new Array();
                return [2 /*return*/];
            });
        });
    };
    //resourceGroups.update
    TestResourceGroup.prototype.test_resourceGroups_update = function () {
        return __awaiter(this, void 0, void 0, function () {
            var parameter, result_patch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameter = {
                            tags: {
                                tag1: "value1",
                                tag2: "value2"
                            }
                        };
                        return [4 /*yield*/, this.resourceClient.resourceGroups.update(this.resourceGroupName, parameter)];
                    case 1:
                        result_patch = _a.sent();
                        // console.log(result_patch);  //{... , tags: { tag1: 'value1', tag2: 'value2' } , ...}
                        console.assert(result_patch.tags.tag1 === "value1");
                        console.assert(result_patch.tags.tag2 === "value2");
                        return [2 /*return*/];
                }
            });
        });
    };
    //resources.listByResourceGroup
    TestResourceGroup.prototype.test_resources_listByResourceGroup = function () {
        var e_3, _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, _c, item, e_3_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, 6, 11]);
                        _b = __asyncValues(this.resourceClient.resources.listByResourceGroup(this.resourceGroupName));
                        _d.label = 1;
                    case 1: return [4 /*yield*/, _b.next()];
                    case 2:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 4];
                        item = _c.value;
                        console.log(item);
                        _d.label = 3;
                    case 3: return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 11];
                    case 5:
                        e_3_1 = _d.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 11];
                    case 6:
                        _d.trys.push([6, , 9, 10]);
                        if (!(_c && !_c.done && (_a = _b["return"]))) return [3 /*break*/, 8];
                        return [4 /*yield*/, _a.call(_b)];
                    case 7:
                        _d.sent();
                        _d.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        if (e_3) throw e_3.error;
                        return [7 /*endfinally*/];
                    case 10: return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    //resourceGroups.exportTemplate   (not test)
    TestResourceGroup.prototype.test_resourceGroups_exportTemplate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var parameter, result_template;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameter = {
                            resources: ["*"]
                        };
                        return [4 /*yield*/, this.resourceClient.resourceGroups.exportTemplate(this.resourceGroupName, parameter)];
                    case 1:
                        result_template = _a.sent();
                        console.log(result_template);
                        return [2 /*return*/];
                }
            });
        });
    };
    // resourceGroups.delete (tested but LRO)
    TestResourceGroup.prototype.test_resourceGroups_delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.resourceGroups["delete"](this.resourceGroupName).then(function (result) {
                            console.log(result);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TestResourceGroup;
}());
var TestResources = /** @class */ (function () {
    function TestResources() {
        this.resourceClient = new arm_resources_1.ResourceManagementClient(credential, subscriptionId);
        this.resourceGroupName = "myjstest";
        this.resourceName_1 = "myresource_1";
        this.resourceName_2 = "myresource_2";
        this.resourceId = "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceGroupName + "/providers/" + "Microsoft.Compute" + "/" + "availabilitySets" + "/" + this.resourceName_2;
        this.newResourceGroup = "jsNewGroup";
        this.newResourceId = "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.newResourceGroup + "/providers/" + "Microsoft.Compute" + "/" + "availabilitySets" + "/" + this.resourceName_2;
    }
    //resources.checkExistence
    TestResources.prototype.test_resources_checkExistence = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resources_exist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.resources.checkExistence(this.resourceGroupName, "Microsoft.Compute", "", "availabilitySets", this.resourceName_1, "2019-12-01")];
                    case 1:
                        resources_exist = _a.sent();
                        // console.log(resources_exist);  // { body: false }
                        console.assert(resources_exist.body === false);
                        return [2 /*return*/];
                }
            });
        });
    };
    //resources.checkExistenceById
    TestResources.prototype.test_resources_checkExistenceById = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resourceId, resources_exist_by_id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resourceId = this.resourceId;
                        return [4 /*yield*/, this.resourceClient.resources.checkExistenceById(resourceId, "2019-12-01")];
                    case 1:
                        resources_exist_by_id = _a.sent();
                        console.log(resources_exist_by_id);
                        return [2 /*return*/];
                }
            });
        });
    };
    //resources.createOrUpdateById (but LRO)
    TestResources.prototype.test_resources_createOrUpdateById = function () {
        return __awaiter(this, void 0, void 0, function () {
            var parameter, craete_result_by_id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameter = {
                            location: "eastus"
                        };
                        return [4 /*yield*/, this.resourceClient.resources.createOrUpdateById(this.resourceId, "2019-12-01", parameter)];
                    case 1:
                        craete_result_by_id = _a.sent();
                        console.log(craete_result_by_id);
                        return [2 /*return*/];
                }
            });
        });
    };
    //resources.createOrUpdate (but LRO)
    TestResources.prototype.test_resources_createOrUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var create_result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.resources.createOrUpdate(this.resourceGroupName, "Microsoft.Compute", "", "availabilitySets", this.resourceName_1, "2019-12-01", { location: "eastus" })];
                    case 1:
                        create_result = _a.sent();
                        console.log(create_result);
                        return [2 /*return*/];
                }
            });
        });
    };
    //resources.get
    TestResources.prototype.test_resources_get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var get_result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.resources.get(this.resourceGroupName, "Microsoft.Compute", "", "availabilitySets", this.resourceName_1, "2019-12-01")];
                    case 1:
                        get_result = _a.sent();
                        // console.log(get_result);
                        console.assert(get_result.name === this.resourceName_1);
                        return [2 /*return*/];
                }
            });
        });
    };
    //resources.getById
    TestResources.prototype.test_resources_getById = function () {
        return __awaiter(this, void 0, void 0, function () {
            var get_result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.resources.getById(this.resourceId, "2019-12-01")];
                    case 1:
                        get_result = _a.sent();
                        console.log(get_result);
                        // console.assert(get_result.name === this.resourceName_1);
                        return [2 /*return*/, get_result];
                }
            });
        });
    };
    //resources.list
    TestResources.prototype.test_resources_list = function () {
        var e_4, _a;
        return __awaiter(this, void 0, void 0, function () {
            var resultArray, _b, _c, item, e_4_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        resultArray = new Array();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(this.resourceClient.resources.list({ filter: "name eq '" + this.resourceName_1 + "'" }));
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        item = _c.value;
                        // console.log(item);
                        resultArray.push(item);
                        _d.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_4_1 = _d.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _d.trys.push([7, , 10, 11]);
                        if (!(_c && !_c.done && (_a = _b["return"]))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _a.call(_b)];
                    case 8:
                        _d.sent();
                        _d.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_4) throw e_4.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12:
                        console.assert(resultArray.length == 1);
                        return [2 /*return*/];
                }
            });
        });
    };
    //resources.listByResourceGroup
    TestResources.prototype.test_resources_listByResourceGroup = function () {
        var e_5, _a;
        return __awaiter(this, void 0, void 0, function () {
            var resultArray, _b, _c, item, e_5_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        resultArray = new Array();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(this.resourceClient.resources.listByResourceGroup(this.resourceGroupName));
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        item = _c.value;
                        // console.log(item);
                        resultArray.push(item);
                        _d.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_5_1 = _d.sent();
                        e_5 = { error: e_5_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _d.trys.push([7, , 10, 11]);
                        if (!(_c && !_c.done && (_a = _b["return"]))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _a.call(_b)];
                    case 8:
                        _d.sent();
                        _d.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_5) throw e_5.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12:
                        console.log(resultArray);
                        return [2 /*return*/];
                }
            });
        });
    };
    //resources.validateMoveResources (LRO)
    TestResources.prototype.test_resources_validateMoveResources = function () {
        return __awaiter(this, void 0, void 0, function () {
            var new_Group, result_getById, parameter, result_move;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.resourceGroups.createOrUpdate(this.newResourceGroup, { location: "eastus" })];
                    case 1:
                        new_Group = _a.sent();
                        console.log(new_Group);
                        return [4 /*yield*/, this.test_resources_getById()];
                    case 2:
                        result_getById = _a.sent();
                        parameter = {
                            resources: new Array(result_getById.id),
                            targetResourceGroup: new_Group.id
                        };
                        return [4 /*yield*/, this.resourceClient.resources.validateMoveResources(this.resourceGroupName, parameter)];
                    case 3:
                        result_move = _a.sent();
                        console.log(result_move);
                        return [2 /*return*/];
                }
            });
        });
    };
    //resources.moveResources (LRO)
    TestResources.prototype.test_resources_moveResources = function () {
        return __awaiter(this, void 0, void 0, function () {
            var get_new_Group, result_getById, parameter, result_move;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.resourceGroups.get(this.newResourceGroup)];
                    case 1:
                        get_new_Group = _a.sent();
                        console.log(get_new_Group);
                        return [4 /*yield*/, this.test_resources_getById()];
                    case 2:
                        result_getById = _a.sent();
                        parameter = {
                            resources: new Array(result_getById.id),
                            targetResourceGroup: get_new_Group.id
                        };
                        return [4 /*yield*/, this.resourceClient.resources.moveResources(this.resourceGroupName, parameter)];
                    case 3:
                        result_move = _a.sent();
                        console.log(result_move);
                        return [2 /*return*/];
                }
            });
        });
    };
    //resources.update (LRO)
    TestResources.prototype.test_resources_update = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result_update;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.resources.update(this.resourceGroupName, "Microsoft.Compute", "", "availabilitySets", this.resourceName_1, "2019-12-01", { tags: { tag1: 'value1' } })];
                    case 1:
                        result_update = _a.sent();
                        console.log(result_update);
                        return [2 /*return*/];
                }
            });
        });
    };
    //resources.updateById (LRO)
    TestResources.prototype.test_resources_updateById = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result_update_by_id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.resources.updateById(this.newResourceId, "2019-12-01", { tags: { tag1: "value1" } })];
                    case 1:
                        result_update_by_id = _a.sent();
                        console.log(result_update_by_id);
                        return [2 /*return*/];
                }
            });
        });
    };
    //resources.delete (LRO)
    TestResources.prototype.test_resources_delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result_delete;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.resources["delete"](this.newResourceGroup, "Microsoft.Compute", "", "availabilitySets", this.resourceName_1, "2019-12-01")];
                    case 1:
                        result_delete = _a.sent();
                        console.log(result_delete);
                        return [2 /*return*/];
                }
            });
        });
    };
    //resources.deleteById (LRO)
    TestResources.prototype.test_resources_deleteById = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result_delete_by_id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.resources.deleteById(this.newResourceId, "2019-12-01")];
                    case 1:
                        result_delete_by_id = _a.sent();
                        console.log(result_delete_by_id);
                        return [2 /*return*/];
                }
            });
        });
    };
    //resourceGroups.delete (lro)
    TestResources.prototype.test_resourceGroups_delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result_group_delete;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.resourceGroups["delete"](this.newResourceGroup)];
                    case 1:
                        result_group_delete = _a.sent();
                        console.log(result_group_delete);
                        return [2 /*return*/];
                }
            });
        });
    };
    return TestResources;
}());
var TestDeploymentsBasic = /** @class */ (function () {
    function TestDeploymentsBasic() {
        this.resourceClient = new arm_resources_1.ResourceManagementClient(credential, subscriptionId);
        this.resourceGroupName = "myjstest";
        this.depolymentName = "jstestdeployment";
    }
    // return templeate
    TestDeploymentsBasic.prototype.createTmpleate = function () {
        var template = {
            $schema: "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
            contentVersion: "1.0.0.0",
            parameters: {
                location: {
                    type: "String",
                    allowedValues: [
                        "East US",
                        "West US",
                        "West Europe",
                        "East Asia",
                        "South East Asia"
                    ],
                    metaData: {
                        description: "Location to deploy to"
                    }
                }
            },
            resources: [
                {
                    type: "Microsoft.Compute/availabilitySets",
                    name: "availabilitySet1",
                    apiVersion: "2019-12-01",
                    location: "[parameters('location')]",
                    properties: {}
                }
            ],
            outPuts: {
                myParamete: {
                    type: "object",
                    value: "[reference('Microsoft.Compute/availabilitySets/availabilitySet1')]"
                }
            }
        };
        return template;
    };
    //deployments.checkExistence
    TestDeploymentsBasic.prototype.test_deployments_checkExistence = function () {
        return __awaiter(this, void 0, void 0, function () {
            var deployment_check;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments.checkExistence(this.resourceGroupName, this.depolymentName)];
                    case 1:
                        deployment_check = _a.sent();
                        // console.log(deployment_check);
                        console.assert(deployment_check.body === false);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.calculateTemplateHash
    // public async test_deployments_calculateTemplateHash(){
    //     await this.resourceClient.deployments.calculateTemplateHash();
    // }
    //deployments.createOrUpdate (LRO)
    TestDeploymentsBasic.prototype.test_deployments_createOrUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var parameter, createResult_deployment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameter = {
                            // location: "West US",
                            properties: {
                                mode: "Incremental",
                                template: this.createTmpleate(),
                                parameters: { location: { value: "East US" } }
                            }
                        };
                        return [4 /*yield*/, this.resourceClient.deployments.createOrUpdate(this.resourceGroupName, this.depolymentName, parameter)];
                    case 1:
                        createResult_deployment = _a.sent();
                        console.log(createResult_deployment);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.listByResourceGroup
    TestDeploymentsBasic.prototype.test_deployments_listByResourceGroup = function () {
        var e_6, _a;
        return __awaiter(this, void 0, void 0, function () {
            var listArray_deployment, _b, _c, item, e_6_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        listArray_deployment = new Array();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(this.resourceClient.deployments.listByResourceGroup(this.resourceGroupName));
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        item = _c.value;
                        listArray_deployment.push(item);
                        _d.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_6_1 = _d.sent();
                        e_6 = { error: e_6_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _d.trys.push([7, , 10, 11]);
                        if (!(_c && !_c.done && (_a = _b["return"]))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _a.call(_b)];
                    case 8:
                        _d.sent();
                        _d.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_6) throw e_6.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12:
                        console.assert(listArray_deployment.length == 1);
                        console.assert(listArray_deployment[0].name === this.depolymentName);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.get
    TestDeploymentsBasic.prototype.test_deployments_get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var getResult_deployment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments.get(this.resourceGroupName, this.depolymentName)];
                    case 1:
                        getResult_deployment = _a.sent();
                        // console.log(getResult_deployment);
                        console.assert(getResult_deployment.name === this.depolymentName);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.whatIf (LRO)
    TestDeploymentsBasic.prototype.test_deployments_whatIf = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments.whatIf(this.resourceGroupName, this.depolymentName, { properties: { mode: "Incremental", template: this.createTmpleate() } }).then(function (result) {
                            console.log(result);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //deploymentOperations.list
    TestDeploymentsBasic.prototype.test_deploymentOperations_list = function () {
        var e_7, _a;
        return __awaiter(this, void 0, void 0, function () {
            var listArray_deploymentOperations, _b, _c, item, e_7_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        listArray_deploymentOperations = new Array();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(this.resourceClient.deploymentOperations.list(this.resourceGroupName, this.depolymentName));
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        item = _c.value;
                        listArray_deploymentOperations.push(item);
                        _d.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_7_1 = _d.sent();
                        e_7 = { error: e_7_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _d.trys.push([7, , 10, 11]);
                        if (!(_c && !_c.done && (_a = _b["return"]))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _a.call(_b)];
                    case 8:
                        _d.sent();
                        _d.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_7) throw e_7.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12:
                        console.assert(listArray_deploymentOperations.length > 1);
                        return [2 /*return*/, listArray_deploymentOperations];
                }
            });
        });
    };
    //deploymentOperations.get
    TestDeploymentsBasic.prototype.test_deploymentOperations_get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var operationId, getResult_deployment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.test_deploymentOperations_list()];
                    case 1:
                        operationId = _a.sent();
                        return [4 /*yield*/, this.resourceClient.deploymentOperations.get(this.resourceGroupName, this.depolymentName, operationId[0].operationId)];
                    case 2:
                        getResult_deployment = _a.sent();
                        // console.log(getResult_deployment);
                        console.assert(getResult_deployment.operationId === operationId[0].operationId);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.cancel
    TestDeploymentsBasic.prototype.test_deployments_cancel = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments.cancel(this.resourceGroupName, this.depolymentName)["catch"](function (result) {
                            // console.log(result.code);
                            console.assert(result.code === "DeploymentCannotBeCancelled");
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.validate (LRO)
    TestDeploymentsBasic.prototype.test_deployments_validate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var parameter, validation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameter = {
                            // location: "West US",
                            properties: {
                                mode: "Incremental",
                                template: this.createTmpleate(),
                                parameters: { location: { value: "East US" } }
                            }
                        };
                        return [4 /*yield*/, this.resourceClient.deployments.validate(this.resourceGroupName, this.depolymentName, parameter)];
                    case 1:
                        validation = _a.sent();
                        console.log(validation);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.exportTemplate
    TestDeploymentsBasic.prototype.test_deployments_exportTemplate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result_export;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments.exportTemplate(this.resourceGroupName, this.depolymentName)];
                    case 1:
                        result_export = _a.sent();
                        // console.log(result_export);
                        if (!result_export.template) {
                            console.assert(false);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.delete (LRO)
    TestDeploymentsBasic.prototype.test_deployments_delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result_delete;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments["delete"](this.resourceGroupName, this.depolymentName)];
                    case 1:
                        result_delete = _a.sent();
                        console.log(result_delete);
                        return [2 /*return*/];
                }
            });
        });
    };
    return TestDeploymentsBasic;
}());
var TestDeploymentAtScope = /** @class */ (function () {
    function TestDeploymentAtScope() {
        this.resourceClient = new arm_resources_1.ResourceManagementClient(credential, subscriptionId);
        this.resourceGroupName = "myjstest";
        this.scope = "subscriptions/" + subscriptionId + "/resourcegroups/" + this.resourceGroupName;
        this.depolymentName = "jstestdeployment";
    }
    // return template
    TestDeploymentAtScope.prototype.createTmpleate = function () {
        var template = {
            $schema: "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
            contentVersion: "1.0.0.0",
            parameters: {
                location: {
                    type: "String",
                    allowedValues: [
                        "East US",
                        "West US",
                        "West Europe",
                        "East Asia",
                        "South East Asia"
                    ],
                    metaData: {
                        description: "Location to deploy to"
                    }
                }
            },
            resources: [
                {
                    type: "Microsoft.Compute/availabilitySets",
                    name: "availabilitySet1",
                    apiVersion: "2019-12-01",
                    location: "[parameters('location')]",
                    properties: {}
                }
            ],
            outPuts: {
                myParamete: {
                    type: "object",
                    value: "[reference('Microsoft.Compute/availabilitySets/availabilitySet1')]"
                }
            }
        };
        return template;
    };
    //deployments.checkExistenceAtScope
    TestDeploymentAtScope.prototype.test_deployments_checkExistenceAtScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result_exist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments.checkExistenceAtScope(this.resourceGroupName, this.depolymentName)];
                    case 1:
                        result_exist = _a.sent();
                        // console.log(result_exist);
                        console.assert(result_exist.body === false);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.createOrUpdateAtScope (LRO)
    TestDeploymentAtScope.prototype.test_deployments_createOrUpdateAtScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var parameter, createResult_deployment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameter = {
                            // location: "West US",
                            properties: {
                                mode: "Incremental",
                                template: this.createTmpleate(),
                                parameters: { location: { value: "East US" } }
                            }
                        };
                        return [4 /*yield*/, this.resourceClient.deployments.createOrUpdateAtScope(this.scope, this.depolymentName, parameter)];
                    case 1:
                        createResult_deployment = _a.sent();
                        console.log(createResult_deployment);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.listAtScope
    TestDeploymentAtScope.prototype.test_deployments_listAtScope = function () {
        var e_8, _a;
        return __awaiter(this, void 0, void 0, function () {
            var listArray, _b, _c, item, e_8_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        listArray = new Array();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(this.resourceClient.deployments.listAtScope(this.scope));
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        item = _c.value;
                        listArray.push(item);
                        _d.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_8_1 = _d.sent();
                        e_8 = { error: e_8_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _d.trys.push([7, , 10, 11]);
                        if (!(_c && !_c.done && (_a = _b["return"]))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _a.call(_b)];
                    case 8:
                        _d.sent();
                        _d.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_8) throw e_8.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12:
                        console.assert(listArray.length == 1);
                        console.assert(listArray[0].name === this.depolymentName);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.getAtScope
    TestDeploymentAtScope.prototype.test_deployments_getAtScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var getResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments.getAtScope(this.scope, this.depolymentName)];
                    case 1:
                        getResult = _a.sent();
                        // console.log(getResult);
                        console.assert(getResult.name === this.depolymentName);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deploymentOperations.listAtScope
    TestDeploymentAtScope.prototype.test_deploymentOperations_listAtScope = function () {
        var e_9, _a;
        return __awaiter(this, void 0, void 0, function () {
            var listArray, _b, _c, item, e_9_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        listArray = new Array();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(this.resourceClient.deploymentOperations.listAtScope(this.scope, this.depolymentName));
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        item = _c.value;
                        listArray.push(item);
                        _d.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_9_1 = _d.sent();
                        e_9 = { error: e_9_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _d.trys.push([7, , 10, 11]);
                        if (!(_c && !_c.done && (_a = _b["return"]))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _a.call(_b)];
                    case 8:
                        _d.sent();
                        _d.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_9) throw e_9.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12:
                        console.assert(listArray.length > 1);
                        return [2 /*return*/, listArray];
                }
            });
        });
    };
    //deploymentOperations.getAtScope
    TestDeploymentAtScope.prototype.test_deploymentOperations_getAtScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var operationId, getResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.test_deploymentOperations_listAtScope()];
                    case 1:
                        operationId = _a.sent();
                        return [4 /*yield*/, this.resourceClient.deploymentOperations.getAtScope(this.scope, this.depolymentName, operationId[0].operationId)];
                    case 2:
                        getResult = _a.sent();
                        // console.log(getResult);
                        console.assert(getResult.operationId === operationId[0].operationId);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.cancelAtScope
    TestDeploymentAtScope.prototype.test_deployments_cancelAtScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments.cancelAtScope(this.scope, this.depolymentName)["catch"](function (result) {
                            // console.log(result.code);
                            console.assert(result.code === "DeploymentCannotBeCancelled");
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.validateAtScope (LRO)
    TestDeploymentAtScope.prototype.test_deployments_validateAtScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var parameter, validation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameter = {
                            // location: "West US",
                            properties: {
                                mode: "Incremental",
                                template: this.createTmpleate(),
                                parameters: { location: { value: "East US" } }
                            }
                        };
                        return [4 /*yield*/, this.resourceClient.deployments.validateAtScope(this.scope, this.depolymentName, parameter)];
                    case 1:
                        validation = _a.sent();
                        console.log(validation);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.exportTemplateAtScope
    TestDeploymentAtScope.prototype.test_deployments_exportTemplateAtScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result_export;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments.exportTemplateAtScope(this.scope, this.depolymentName)];
                    case 1:
                        result_export = _a.sent();
                        // console.log(result_export);
                        if (!result_export.template) {
                            console.assert(false);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.deleteAtScope (LRO)
    TestDeploymentAtScope.prototype.test_deployments_deleteAtScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result_delete;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments.deleteAtScope(this.scope, this.depolymentName)];
                    case 1:
                        result_delete = _a.sent();
                        console.log(result_delete);
                        return [2 /*return*/];
                }
            });
        });
    };
    return TestDeploymentAtScope;
}());
var TestDeploymentsAtManagementGroup = /** @class */ (function () {
    function TestDeploymentsAtManagementGroup() {
        this.resourceClient = new arm_resources_1.ResourceManagementClient(credential, subscriptionId);
        this.managementgroupsAPI = new arm_managementgroups_1.ManagementGroupsAPI(credential);
        this.depolymentName = "jstestlinked";
        this.group_id = "20000000-0001-0000-0000-000000000123456";
    }
    //managementGroups.createOrUpdate (LRO)
    TestDeploymentsAtManagementGroup.prototype.test_managementGroups_createOrUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result_create;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.managementgroupsAPI.managementGroups.createOrUpdate(this.group_id, { name: this.group_id })];
                    case 1:
                        result_create = _a.sent();
                        console.log(result_create);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.checkExistenceAtManagementGroupScope
    TestDeploymentsAtManagementGroup.prototype.test_deployments_checkExistenceAtManagementGroupScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result_exist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments.checkExistenceAtManagementGroupScope(this.group_id, this.depolymentName)];
                    case 1:
                        result_exist = _a.sent();
                        // console.log(result_exist);
                        console.assert(result_exist.body === false);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.createOrUpdateAtManagementGroupScope (LRO)
    TestDeploymentsAtManagementGroup.prototype.test_deployments_createOrUpdateAtManagementGroupScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var parameter, resultCreate_depolyments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameter = {
                            location: "West US",
                            properties: {
                                mode: "Incremental",
                                templateLink: {
                                    uri: "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/100-blank-template/azuredeploy.json"
                                },
                                parametersLink: {
                                    uri: "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/100-blank-template/azuredeploy.json"
                                }
                            }
                        };
                        return [4 /*yield*/, this.resourceClient.deployments.createOrUpdateAtManagementGroupScope(this.group_id, this.depolymentName, parameter)];
                    case 1:
                        resultCreate_depolyments = _a.sent();
                        console.log(resultCreate_depolyments);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.listAtManagementGroupScope
    TestDeploymentsAtManagementGroup.prototype.test_deployments_listAtManagementGroupScope = function () {
        var e_10, _a;
        return __awaiter(this, void 0, void 0, function () {
            var listArray, _b, _c, item, e_10_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        listArray = new Array();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(this.resourceClient.deployments.listAtManagementGroupScope(this.group_id));
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        item = _c.value;
                        listArray.push(item);
                        _d.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_10_1 = _d.sent();
                        e_10 = { error: e_10_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _d.trys.push([7, , 10, 11]);
                        if (!(_c && !_c.done && (_a = _b["return"]))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _a.call(_b)];
                    case 8:
                        _d.sent();
                        _d.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_10) throw e_10.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12:
                        console.assert(listArray.length == 1);
                        console.assert(listArray[0].name === this.depolymentName);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.getAtManagementGroupScope
    TestDeploymentsAtManagementGroup.prototype.test_deployments_getAtManagementGroupScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var getResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments.getAtManagementGroupScope(this.group_id, this.depolymentName)];
                    case 1:
                        getResult = _a.sent();
                        // console.log(getResult);
                        console.assert(getResult.name === this.depolymentName);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deploymentOperations.listAtManagementGroupScope
    TestDeploymentsAtManagementGroup.prototype.test_deploymentOperations_listAtManagementGroupScope = function () {
        var e_11, _a;
        return __awaiter(this, void 0, void 0, function () {
            var listArray, _b, _c, item, e_11_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        listArray = new Array();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(this.resourceClient.deploymentOperations.listAtManagementGroupScope(this.group_id, this.depolymentName));
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        item = _c.value;
                        listArray.push(item);
                        _d.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_11_1 = _d.sent();
                        e_11 = { error: e_11_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _d.trys.push([7, , 10, 11]);
                        if (!(_c && !_c.done && (_a = _b["return"]))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _a.call(_b)];
                    case 8:
                        _d.sent();
                        _d.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_11) throw e_11.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12:
                        console.assert(listArray.length > 0);
                        return [2 /*return*/, listArray];
                }
            });
        });
    };
    //deploymentOperations.getAtManagementGroupScope
    TestDeploymentsAtManagementGroup.prototype.test_deploymentOperations_getAtManagementGroupScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var operationId, getResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.test_deploymentOperations_listAtManagementGroupScope()];
                    case 1:
                        operationId = _a.sent();
                        return [4 /*yield*/, this.resourceClient.deploymentOperations.getAtManagementGroupScope(this.group_id, this.depolymentName, operationId[0].operationId)];
                    case 2:
                        getResult = _a.sent();
                        // console.log(getResult);
                        console.assert(getResult.operationId === operationId[0].operationId);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.cancelAtManagementGroupScope
    TestDeploymentsAtManagementGroup.prototype.test_deployments_cancelAtManagementGroupScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments.cancelAtManagementGroupScope(this.group_id, this.depolymentName)["catch"](function (result) {
                            // console.log(result.code);
                            console.assert(result.code === "DeploymentCannotBeCancelled");
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.validateAtManagementGroupScope (LRO)
    TestDeploymentsAtManagementGroup.prototype.test_deployments_validateAtManagementGroupScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var parameter, validation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameter = {
                            location: "West US",
                            properties: {
                                mode: "Incremental",
                                templateLink: {
                                    uri: "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/100-blank-template/azuredeploy.json"
                                },
                                parametersLink: {
                                    uri: "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/100-blank-template/azuredeploy.json"
                                }
                            }
                        };
                        return [4 /*yield*/, this.resourceClient.deployments.validateAtManagementGroupScope(this.group_id, this.depolymentName, parameter)];
                    case 1:
                        validation = _a.sent();
                        console.log(validation);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.exportTemplateAtManagementGroupScope
    TestDeploymentsAtManagementGroup.prototype.test_deployments_exportTemplateAtManagementGroupScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result_export;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments.exportTemplateAtManagementGroupScope(this.group_id, this.depolymentName)];
                    case 1:
                        result_export = _a.sent();
                        // console.log(result_export);
                        if (!result_export.template) {
                            console.assert(false);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.deleteAtManagementGroupScope (LRO)
    TestDeploymentsAtManagementGroup.prototype.test_deployments_deleteAtManagementGroupScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result_delete;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments.deleteAtManagementGroupScope(this.group_id, this.depolymentName)];
                    case 1:
                        result_delete = _a.sent();
                        console.log(result_delete);
                        return [2 /*return*/];
                }
            });
        });
    };
    return TestDeploymentsAtManagementGroup;
}());
var TestDeploymentsAtSubscription = /** @class */ (function () {
    function TestDeploymentsAtSubscription() {
        this.resourceClient = new arm_resources_1.ResourceManagementClient(credential, subscriptionId);
        this.depolymentName = "jstestlinked";
    }
    //return deployment_parameter
    TestDeploymentsAtSubscription.prototype.create_deployment_parameter = function () {
        var parameter = {
            location: "West US",
            properties: {
                mode: "Incremental",
                templateLink: {
                    uri: "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/100-blank-template/azuredeploy.json"
                },
                parametersLink: {
                    uri: "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/100-blank-template/azuredeploy.json"
                }
            }
        };
        return parameter;
    };
    //deployments.checkExistenceAtSubscriptionScope
    TestDeploymentsAtSubscription.prototype.test_deployments_checkExistenceAtSubscriptionScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result_exist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments.checkExistenceAtSubscriptionScope(this.depolymentName)];
                    case 1:
                        result_exist = _a.sent();
                        // console.log(result_exist);
                        console.assert(result_exist.body === false);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.createOrUpdateAtSubscriptionScope (LRO)
    TestDeploymentsAtSubscription.prototype.test_deployments_createOrUpdateAtSubscriptionScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var parameter, resultCreate_depolyments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameter = this.create_deployment_parameter();
                        return [4 /*yield*/, this.resourceClient.deployments.createOrUpdateAtSubscriptionScope(this.depolymentName, parameter)];
                    case 1:
                        resultCreate_depolyments = _a.sent();
                        console.log(resultCreate_depolyments);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.listAtSubscriptionScope
    TestDeploymentsAtSubscription.prototype.test_deployments_listAtSubscriptionScope = function () {
        var e_12, _a;
        return __awaiter(this, void 0, void 0, function () {
            var listArray, _b, _c, item, e_12_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        listArray = new Array();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(this.resourceClient.deployments.listAtSubscriptionScope());
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        item = _c.value;
                        listArray.push(item);
                        _d.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_12_1 = _d.sent();
                        e_12 = { error: e_12_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _d.trys.push([7, , 10, 11]);
                        if (!(_c && !_c.done && (_a = _b["return"]))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _a.call(_b)];
                    case 8:
                        _d.sent();
                        _d.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_12) throw e_12.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12:
                        console.assert(listArray.length >= 1);
                        console.assert(listArray[2].name === this.depolymentName);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.getAtSubscriptionScope
    TestDeploymentsAtSubscription.prototype.test_deployments_getAtSubscriptionScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var getResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments.getAtSubscriptionScope(this.depolymentName)];
                    case 1:
                        getResult = _a.sent();
                        // console.log(getResult);
                        console.assert(getResult.name === this.depolymentName);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.whatIfAtSubscriptionScope (LRO)
    TestDeploymentsAtSubscription.prototype.test_deployments_whatIfAtSubscriptionScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments.whatIfAtSubscriptionScope(this.depolymentName, this.create_deployment_parameter())];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deploymentOperations.listAtSubscriptionScope
    TestDeploymentsAtSubscription.prototype.test_deploymentOperations_listAtSubscriptionScope = function () {
        var e_13, _a;
        return __awaiter(this, void 0, void 0, function () {
            var listArray, _b, _c, item, e_13_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        listArray = new Array();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(this.resourceClient.deploymentOperations.listAtSubscriptionScope(this.depolymentName));
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        item = _c.value;
                        listArray.push(item);
                        _d.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_13_1 = _d.sent();
                        e_13 = { error: e_13_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _d.trys.push([7, , 10, 11]);
                        if (!(_c && !_c.done && (_a = _b["return"]))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _a.call(_b)];
                    case 8:
                        _d.sent();
                        _d.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_13) throw e_13.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12:
                        console.assert(listArray.length > 0);
                        return [2 /*return*/, listArray];
                }
            });
        });
    };
    //deploymentOperations.getAtSubscriptionScope
    TestDeploymentsAtSubscription.prototype.test_deploymentOperations_getAtSubscriptionScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var operationId, getResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.test_deploymentOperations_listAtSubscriptionScope()];
                    case 1:
                        operationId = _a.sent();
                        return [4 /*yield*/, this.resourceClient.deploymentOperations.getAtSubscriptionScope(this.depolymentName, operationId[0].operationId)];
                    case 2:
                        getResult = _a.sent();
                        // console.log(getResult);
                        console.assert(getResult.operationId === operationId[0].operationId);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.cancelAtSubscriptionScope
    TestDeploymentsAtSubscription.prototype.test_deployments_cancelAtSubscriptionScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments.cancelAtSubscriptionScope(this.depolymentName)["catch"](function (result) {
                            // console.log(result.code);
                            console.assert(result.code === "DeploymentCannotBeCancelled");
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.validateAtSubscriptionScope (LRO)
    TestDeploymentsAtSubscription.prototype.test_deployments_validateAtSubscriptionScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var validation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments.validateAtSubscriptionScope(this.depolymentName, this.create_deployment_parameter())];
                    case 1:
                        validation = _a.sent();
                        console.log(validation);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.exportTemplateAtSubscriptionScope
    TestDeploymentsAtSubscription.prototype.test_deployments_exportTemplateAtSubscriptionScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result_export;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments.exportTemplateAtSubscriptionScope(this.depolymentName)];
                    case 1:
                        result_export = _a.sent();
                        // console.log(result_export);
                        if (!result_export.template) {
                            console.assert(false);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.deleteAtSubscriptionScope (LRO)
    TestDeploymentsAtSubscription.prototype.test_deployments_deleteAtSubscriptionScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result_delete;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments.deleteAtSubscriptionScope(this.depolymentName)];
                    case 1:
                        result_delete = _a.sent();
                        console.log(result_delete);
                        return [2 /*return*/];
                }
            });
        });
    };
    return TestDeploymentsAtSubscription;
}());
var TestDeploymentsAtTenant = /** @class */ (function () {
    function TestDeploymentsAtTenant() {
        this.resourceClient = new arm_resources_1.ResourceManagementClient(credential, subscriptionId);
        this.depolymentName = "jstestlinked";
    }
    //return deployment_parameter
    TestDeploymentsAtTenant.prototype.create_deployment_parameter = function () {
        var parameter = {
            location: "West US",
            properties: {
                mode: "Incremental",
                templateLink: {
                    uri: "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/100-blank-template/azuredeploy.json"
                },
                parametersLink: {
                    uri: "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/100-blank-template/azuredeploy.json"
                }
            }
        };
        return parameter;
    };
    //deployments.checkExistenceAtTenantScope
    TestDeploymentsAtTenant.prototype.test_deployments_checkExistenceAtTenantScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result_exist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments.checkExistenceAtTenantScope(this.depolymentName)];
                    case 1:
                        result_exist = _a.sent();
                        // console.log(result_exist);
                        console.assert(result_exist.body === false);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.createOrUpdateAtTenantScope (LRO)
    TestDeploymentsAtTenant.prototype.test_deployments_createOrUpdateAtTenantScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var parameter, resultCreate_depolyments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameter = this.create_deployment_parameter();
                        return [4 /*yield*/, this.resourceClient.deployments.createOrUpdateAtTenantScope(this.depolymentName, parameter)];
                    case 1:
                        resultCreate_depolyments = _a.sent();
                        console.log(resultCreate_depolyments);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.listAtTenantScope
    TestDeploymentsAtTenant.prototype.test_deployments_listAtTenantScope = function () {
        var e_14, _a;
        return __awaiter(this, void 0, void 0, function () {
            var listArray, _b, _c, item, e_14_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        listArray = new Array();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(this.resourceClient.deployments.listAtTenantScope());
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        item = _c.value;
                        listArray.push(item);
                        _d.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_14_1 = _d.sent();
                        e_14 = { error: e_14_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _d.trys.push([7, , 10, 11]);
                        if (!(_c && !_c.done && (_a = _b["return"]))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _a.call(_b)];
                    case 8:
                        _d.sent();
                        _d.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_14) throw e_14.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12:
                        console.assert(listArray.length >= 1);
                        console.assert(listArray[2].name === this.depolymentName);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.getAtTenantScope
    TestDeploymentsAtTenant.prototype.test_deployments_getAtTenantScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var getResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments.getAtTenantScope(this.depolymentName)];
                    case 1:
                        getResult = _a.sent();
                        // console.log(getResult);
                        console.assert(getResult.name === this.depolymentName);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.whatIfAtTenantScope (LRO)
    TestDeploymentsAtTenant.prototype.test_deployments_whatIfAtTenantScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments.whatIfAtTenantScope(this.depolymentName, this.create_deployment_parameter())];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deploymentOperations.listAtTenantScope
    TestDeploymentsAtTenant.prototype.test_deploymentOperations_listAtTenantScope = function () {
        var e_15, _a;
        return __awaiter(this, void 0, void 0, function () {
            var listArray, _b, _c, item, e_15_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        listArray = new Array();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(this.resourceClient.deploymentOperations.listAtTenantScope(this.depolymentName));
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        item = _c.value;
                        listArray.push(item);
                        _d.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_15_1 = _d.sent();
                        e_15 = { error: e_15_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _d.trys.push([7, , 10, 11]);
                        if (!(_c && !_c.done && (_a = _b["return"]))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _a.call(_b)];
                    case 8:
                        _d.sent();
                        _d.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_15) throw e_15.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12:
                        console.assert(listArray.length > 0);
                        return [2 /*return*/, listArray];
                }
            });
        });
    };
    //deploymentOperations.getAtTenantScope
    TestDeploymentsAtTenant.prototype.test_deploymentOperations_getAtTenantScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var operationId, getResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.test_deploymentOperations_listAtTenantScope()];
                    case 1:
                        operationId = _a.sent();
                        return [4 /*yield*/, this.resourceClient.deploymentOperations.getAtTenantScope(this.depolymentName, operationId[0].operationId)];
                    case 2:
                        getResult = _a.sent();
                        // console.log(getResult);
                        console.assert(getResult.operationId === operationId[0].operationId);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.cancelAtTenantScope
    TestDeploymentsAtTenant.prototype.test_deployments_cancelAtTenantScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments.cancelAtTenantScope(this.depolymentName)["catch"](function (result) {
                            // console.log(result.code);
                            console.assert(result.code === "DeploymentCannotBeCancelled");
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.validateAtTenantScope (LRO)
    TestDeploymentsAtTenant.prototype.test_deployments_validateAtTenantScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var validation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments.validateAtTenantScope(this.depolymentName, this.create_deployment_parameter())];
                    case 1:
                        validation = _a.sent();
                        console.log(validation);
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.exportTemplateAtTenantScope
    TestDeploymentsAtTenant.prototype.test_deployments_exportTemplateAtTenantScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result_export;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments.exportTemplateAtTenantScope(this.depolymentName)];
                    case 1:
                        result_export = _a.sent();
                        // console.log(result_export);
                        if (!result_export.template) {
                            console.assert(false);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //deployments.deleteAtTenantScope (LRO)
    TestDeploymentsAtTenant.prototype.test_deployments_deleteAtTenantScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result_delete;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceClient.deployments.deleteAtTenantScope(this.depolymentName)];
                    case 1:
                        result_delete = _a.sent();
                        console.log(result_delete);
                        return [2 /*return*/];
                }
            });
        });
    };
    return TestDeploymentsAtTenant;
}());
var TestProviderLocation = /** @class */ (function () {
    function TestProviderLocation() {
        this.resourceClient = new arm_resources_1.ResourceManagementClient(credential, subscriptionId);
    }
    //providers.get
    TestProviderLocation.prototype.test_providers_get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var getArray, result_get, _i, _a, item;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        getArray = new Array();
                        return [4 /*yield*/, this.resourceClient.providers.get("Microsoft.Web")
                            // console.log(result_get)
                        ];
                    case 1:
                        result_get = _b.sent();
                        // console.log(result_get)
                        for (_i = 0, _a = result_get.resourceTypes; _i < _a.length; _i++) {
                            item = _a[_i];
                            if (item.resourceType === "sites") {
                                console.log(item.locations);
                                if (item.locations.indexOf("West US") >= 0) {
                                    console.assert(true);
                                    break;
                                }
                                else {
                                    console.assert(false);
                                    break;
                                }
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return TestProviderLocation;
}());
var tag = new TestProviderLocation();
tag.test_providers_get();
