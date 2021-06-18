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
var arm_policy_1 = require("@azure/arm-policy");
var arm_managementgroups_1 = require("@azure/arm-managementgroups");
var identity_1 = require("@azure/identity");
var subscriptionId = process.env.subscriptionId;
var credential = new identity_1.DefaultAzureCredential();
var TestPolicyDefinitionAtManagementGroup = /** @class */ (function () {
    function TestPolicyDefinitionAtManagementGroup() {
        this.policyclient = new arm_policy_1.PolicyClient(credential, subscriptionId);
        this.managementclient = new arm_managementgroups_1.ManagementGroupsAPI(credential);
        this.resourceGroupName = "qiaozhatest";
        this.policyName = "jspolicy";
        this.policyAssignmentName = "passigment";
        this.policySetName = "jspolicy";
        this.groupId = "20000000-0001-0000-0000-000000000123";
    }
    //managementGroups.createOrUpdate (LRO)
    TestPolicyDefinitionAtManagementGroup.prototype.test_managementGroups_createOrUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.managementclient.managementGroups.createOrUpdate(this.groupId, { name: this.groupId })];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    //policyDefinitions.createOrUpdateAtManagementGroup
    TestPolicyDefinitionAtManagementGroup.prototype.test_policyDefinitions_createOrUpdateAtManagementGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var parameter, definition;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameter = {
                            policyType: "Custom",
                            description: "Don\'t create a VM anywhere",
                            policyRule: {
                                "if": {
                                    allof: [
                                        {
                                            source: "action",
                                            equals: "Microsoft.Compute/virtualMachines/write"
                                        },
                                        {
                                            field: "location",
                                            "in": [
                                                "eastus",
                                                "eastus2",
                                                "centralus"
                                            ]
                                        }
                                    ]
                                },
                                then: {
                                    effect: "deny"
                                }
                            }
                        };
                        return [4 /*yield*/, this.policyclient.policyDefinitions.createOrUpdateAtManagementGroup(this.policyName, this.groupId, parameter)];
                    case 1:
                        definition = _a.sent();
                        console.log(definition);
                        return [2 /*return*/];
                }
            });
        });
    };
    //policyDefinitions.getAtManagementGroup
    TestPolicyDefinitionAtManagementGroup.prototype.test_policyDefinitions_getAtManagementGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var definition;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.policyclient.policyDefinitions.getAtManagementGroup(this.policyName, this.groupId)];
                    case 1:
                        definition = _a.sent();
                        console.log(definition);
                        return [2 /*return*/, definition];
                }
            });
        });
    };
    //policyDefinitions.listByManagementGroup
    TestPolicyDefinitionAtManagementGroup.prototype.test_policyDefinitions_listByManagementGroup = function () {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, _c, item, e_1_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, 6, 11]);
                        _b = __asyncValues(this.policyclient.policyDefinitions.listByManagementGroup(this.groupId));
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
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
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
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 10: return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    //policyDefinitions.listBuiltIn
    TestPolicyDefinitionAtManagementGroup.prototype.test_policyDefinitions_listBuiltIn = function () {
        var e_2, _a;
        return __awaiter(this, void 0, void 0, function () {
            var arrayList, _b, _c, item, e_2_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        arrayList = new Array();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(this.policyclient.policyDefinitions.listBuiltIn());
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        item = _c.value;
                        arrayList.push(item);
                        console.log(item);
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
                    case 12: return [2 /*return*/, arrayList];
                }
            });
        });
    };
    //policyDefinitions.getBuiltIn
    TestPolicyDefinitionAtManagementGroup.prototype.test_policyDefinitions_getBuiltIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var arrayOne;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.test_policyDefinitions_listBuiltIn()];
                    case 1:
                        arrayOne = _a.sent();
                        return [4 /*yield*/, this.policyclient.policyDefinitions.getBuiltIn(arrayOne[0].name).then(function (result) {
                                console.log(result);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //policyDefinitions.list
    TestPolicyDefinitionAtManagementGroup.prototype.test_policyDefinitions_list = function () {
        var e_3, _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, _c, item, e_3_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, 6, 11]);
                        _b = __asyncValues(this.policyclient.policyDefinitions.list());
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
    //policyAssignments.listForManagementGroup
    TestPolicyDefinitionAtManagementGroup.prototype.test_policyAssignments_listForManagementGroup = function () {
        var e_4, _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, _c, item, e_4_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, 6, 11]);
                        _b = __asyncValues(this.policyclient.policyAssignments.listForManagementGroup(this.groupId, { filter: "atScope()" }));
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
                        e_4_1 = _d.sent();
                        e_4 = { error: e_4_1 };
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
                        if (e_4) throw e_4.error;
                        return [7 /*endfinally*/];
                    case 10: return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    //policyAssignments.create
    TestPolicyDefinitionAtManagementGroup.prototype.test_policyAssignments_create = function () {
        return __awaiter(this, void 0, void 0, function () {
            var scope, definition, assigment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        scope = "/providers/Microsoft.Management/managementgroups/20000000-0001-0000-0000-000000000123/";
                        return [4 /*yield*/, this.test_policyDefinitions_getAtManagementGroup()];
                    case 1:
                        definition = _a.sent();
                        return [4 /*yield*/, this.policyclient.policyAssignments.create(scope, this.policyAssignmentName, { policyDefinitionId: definition.id })];
                    case 2:
                        assigment = _a.sent();
                        console.log(assigment);
                        return [2 /*return*/, assigment];
                }
            });
        });
    };
    //policyAssignments.get
    TestPolicyDefinitionAtManagementGroup.prototype.test_policyAssignments_get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var assigment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.test_policyAssignments_create()];
                    case 1:
                        assigment = _a.sent();
                        return [4 /*yield*/, this.policyclient.policyAssignments.get(assigment.scope, assigment.name).then(function (result) {
                                console.log(result);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //policyAssignments.list
    TestPolicyDefinitionAtManagementGroup.prototype.test_policyAssignments_list = function () {
        var e_5, _a;
        return __awaiter(this, void 0, void 0, function () {
            var arrayList, _b, _c, item, e_5_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        arrayList = new Array();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(this.policyclient.policyAssignments.list());
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        item = _c.value;
                        arrayList.push(item);
                        console.log(item);
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
                        console.assert(arrayList.length > 0);
                        return [2 /*return*/];
                }
            });
        });
    };
    //policyAssignments.listForResourceGroup
    TestPolicyDefinitionAtManagementGroup.prototype.test_policyAssignments_listForResourceGroup = function () {
        var e_6, _a;
        return __awaiter(this, void 0, void 0, function () {
            var arrayList, _b, _c, item, e_6_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        arrayList = new Array();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(this.policyclient.policyAssignments.listForResourceGroup(this.resourceGroupName));
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        item = _c.value;
                        arrayList.push(item);
                        console.log(item);
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
                        console.assert(arrayList.length >= 1);
                        return [2 /*return*/];
                }
            });
        });
    };
    //policyAssignments.listForResource
    TestPolicyDefinitionAtManagementGroup.prototype.test_policyAssignments_listForResource = function () {
        var e_7, _a;
        return __awaiter(this, void 0, void 0, function () {
            var arrayList, _b, _c, item, e_7_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        arrayList = new Array();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(this.policyclient.policyAssignments.listForResource(this.resourceGroupName, "Microsoft.Compute", "", "availabilitySets", "jstrack2test"));
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        item = _c.value;
                        arrayList.push(item);
                        console.log(item);
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
                        console.log(arrayList);
                        return [2 /*return*/];
                }
            });
        });
    };
    //policyAssignments.delete
    TestPolicyDefinitionAtManagementGroup.prototype.test_policyAssignments_delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var scope;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        scope = "/providers/Microsoft.Management/managementgroups/20000000-0001-0000-0000-000000000123/";
                        return [4 /*yield*/, this.policyclient.policyAssignments["delete"](scope, this.policyAssignmentName).then(function (result) {
                                console.log(result);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //policyAssignments.createById
    TestPolicyDefinitionAtManagementGroup.prototype.test_policyAssignments_createById = function () {
        return __awaiter(this, void 0, void 0, function () {
            var policyId, definition, assigment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        policyId = "20000000-0001-0000-0000-000000000123/providers/Microsoft.Authorization/policyAssignments/" + this.policyAssignmentName;
                        return [4 /*yield*/, this.test_policyDefinitions_getAtManagementGroup()];
                    case 1:
                        definition = _a.sent();
                        return [4 /*yield*/, this.policyclient.policyAssignments.createById(policyId, { policyDefinitionId: definition.id })];
                    case 2:
                        assigment = _a.sent();
                        console.log(assigment);
                        return [2 /*return*/, assigment];
                }
            });
        });
    };
    //policyAssignments.getById
    TestPolicyDefinitionAtManagementGroup.prototype.test_policyAssignments_getById = function () {
        return __awaiter(this, void 0, void 0, function () {
            var assigment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.test_policyAssignments_createById()];
                    case 1:
                        assigment = _a.sent();
                        return [4 /*yield*/, this.policyclient.policyAssignments.getById(assigment.id).then(function (result) {
                                console.log(result);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //policyAssignments.deleteById
    TestPolicyDefinitionAtManagementGroup.prototype.test_policyAssignments_deleteById = function () {
        return __awaiter(this, void 0, void 0, function () {
            var assigment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.test_policyAssignments_createById()];
                    case 1:
                        assigment = _a.sent();
                        return [4 /*yield*/, this.policyclient.policyAssignments.deleteById(assigment.id).then(function (result) {
                                console.log(result);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //policySetDefinitions.createOrUpdateAtManagementGroup
    TestPolicyDefinitionAtManagementGroup.prototype.test_policySetDefinitions_createOrUpdateAtManagementGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.policyclient.policySetDefinitions.createOrUpdateAtManagementGroup(this.policySetName, this.groupId, {}).then(function (result) {
                            console.log(result);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //policySetDefinitions.getAtManagementGroup
    TestPolicyDefinitionAtManagementGroup.prototype.test_policySetDefinitions_getAtManagementGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.policyclient.policySetDefinitions.getAtManagementGroup(this.policySetName, this.groupId).then(function (result) {
                            console.log(result);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //policySetDefinitions.listByManagementGroup
    TestPolicyDefinitionAtManagementGroup.prototype.test_policySetDefinitions_listByManagementGroup = function () {
        var e_8, _a;
        return __awaiter(this, void 0, void 0, function () {
            var arrayList, _b, _c, item, e_8_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        arrayList = new Array();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(this.policyclient.policySetDefinitions.listByManagementGroup(this.groupId));
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        item = _c.value;
                        arrayList.push(item);
                        console.log(item);
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
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    //policySetDefinitions.listBuiltIn
    TestPolicyDefinitionAtManagementGroup.prototype.test_policySetDefinitions_listBuiltIn = function () {
        var e_9, _a;
        return __awaiter(this, void 0, void 0, function () {
            var arrayList, _b, _c, item, e_9_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        arrayList = new Array();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(this.policyclient.policySetDefinitions.listBuiltIn());
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        item = _c.value;
                        arrayList.push(item);
                        console.log(item);
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
                    // console.assert()
                    return [2 /*return*/, arrayList];
                }
            });
        });
    };
    //policySetDefinitions.list
    TestPolicyDefinitionAtManagementGroup.prototype.test_policySetDefinitions_list = function () {
        var e_10, _a;
        return __awaiter(this, void 0, void 0, function () {
            var arrayList, _b, _c, item, e_10_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        arrayList = new Array();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(this.policyclient.policySetDefinitions.list());
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        item = _c.value;
                        arrayList.push(item);
                        console.log(item);
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
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    //policySetDefinitions.getBuiltIn
    TestPolicyDefinitionAtManagementGroup.prototype.test_policySetDefinitions_getBuiltIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var arrayList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.test_policySetDefinitions_listBuiltIn()];
                    case 1:
                        arrayList = _a.sent();
                        return [4 /*yield*/, this.policyclient.policySetDefinitions.getBuiltIn(arrayList[0].name).then(function (result) {
                                console.log(result);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //policySetDefinitions.deleteAtManagementGroup
    TestPolicyDefinitionAtManagementGroup.prototype.test_policySetDefinitions_deleteAtManagementGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.policyclient.policySetDefinitions.deleteAtManagementGroup(this.policySetName, this.groupId).then(function (result) {
                            console.log(result);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //policyDefinitions.deleteAtManagementGroup
    TestPolicyDefinitionAtManagementGroup.prototype.test_policyDefinitions_deleteAtManagementGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.policyclient.policyDefinitions.deleteAtManagementGroup(this.policyName, this.groupId).then(function (result) {
                            console.log(result);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //managementGroups.delete
    TestPolicyDefinitionAtManagementGroup.prototype.test_managementGroups_delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.managementclient.managementGroups["delete"](this.groupId).then(function (result) {
                            console.log(result);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TestPolicyDefinitionAtManagementGroup;
}());
var TestPolicyDefinition = /** @class */ (function () {
    function TestPolicyDefinition() {
        this.policyclient = new arm_policy_1.PolicyClient(credential, subscriptionId);
        this.managementclient = new arm_managementgroups_1.ManagementGroupsAPI(credential);
        this.resourceGroupName = "qiaozhatest";
        this.policyName = "jspolicy";
        this.policyAssignmentName = "passigment";
        this.policySetName = "jspolicy";
        this.scope = "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceGroupName;
        this.policyId = "/subscriptions/" + subscriptionId + "/resourceGroups/" + this.resourceGroupName + "/providers/Microsoft.Authorization/policyAssignments/" + this.policyAssignmentName;
    }
    //policyDefinitions.createOrUpdate
    TestPolicyDefinition.prototype.test_policyDefinitions_createOrUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var parameter, definition;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameter = {
                            policyType: "Custom",
                            description: "Don\'t create a VM anywhere",
                            policyRule: {
                                "if": {
                                    allof: [
                                        {
                                            source: "action",
                                            equals: "Microsoft.Compute/virtualMachines/read"
                                        },
                                        {
                                            field: "location",
                                            "in": [
                                                "eastus",
                                                "eastus2",
                                                "centralus"
                                            ]
                                        }
                                    ]
                                },
                                then: {
                                    effect: "deny"
                                }
                            }
                        };
                        return [4 /*yield*/, this.policyclient.policyDefinitions.createOrUpdate(this.policyName, parameter)];
                    case 1:
                        definition = _a.sent();
                        console.log(definition);
                        return [2 /*return*/, definition];
                }
            });
        });
    };
    //policyDefinitions.get
    TestPolicyDefinition.prototype.test_policyDefinitions_get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var definition;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.test_policyDefinitions_createOrUpdate()];
                    case 1:
                        definition = _a.sent();
                        return [4 /*yield*/, this.policyclient.policyDefinitions.get(definition.name).then(function (result) {
                                console.log(result);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //policyDefinitions.list
    TestPolicyDefinition.prototype.test_policyDefinitions_list = function () {
        var e_11, _a;
        return __awaiter(this, void 0, void 0, function () {
            var arrayList, _b, _c, item, e_11_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        arrayList = new Array();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(this.policyclient.policyDefinitions.list());
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        item = _c.value;
                        arrayList.push(item);
                        console.log(item);
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
                        console.assert(arrayList.length > 0);
                        return [2 /*return*/];
                }
            });
        });
    };
    //policyAssignments.create
    TestPolicyDefinition.prototype.test_policyAssignments_create = function () {
        return __awaiter(this, void 0, void 0, function () {
            var definition, assigment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.test_policyDefinitions_createOrUpdate()];
                    case 1:
                        definition = _a.sent();
                        return [4 /*yield*/, this.policyclient.policyAssignments.create(this.scope, this.policyAssignmentName, { policyDefinitionId: definition.id })];
                    case 2:
                        assigment = _a.sent();
                        console.log(assigment);
                        return [2 /*return*/, assigment];
                }
            });
        });
    };
    //policySetDefinitions.createOrUpdate
    TestPolicyDefinition.prototype.test_policySetDefinitions_createOrUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var definition, parameter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.test_policyDefinitions_createOrUpdate()];
                    case 1:
                        definition = _a.sent();
                        parameter = {
                            displayName: "Cost Management",
                            description: "Policies to enforce low cost storage SKUs",
                            metadata: {
                                category: "Cost Management"
                            },
                            policyDefinitions: [
                                {
                                    policyDefinitionId: definition.id,
                                    parameters: {}
                                }
                            ]
                        };
                        return [4 /*yield*/, this.policyclient.policySetDefinitions.createOrUpdate(this.policySetName, parameter).then(function (result) {
                                console.log(result);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //policyAssignments.get
    TestPolicyDefinition.prototype.test_policyAssignments_get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var assigment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.test_policyAssignments_create()];
                    case 1:
                        assigment = _a.sent();
                        return [4 /*yield*/, this.policyclient.policyAssignments.get(assigment.scope, assigment.name).then(function (result) {
                                console.log(result);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //policyAssignments.list
    TestPolicyDefinition.prototype.test_policyAssignments_list = function () {
        var e_12, _a;
        return __awaiter(this, void 0, void 0, function () {
            var arrayList, _b, _c, item, e_12_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        arrayList = new Array();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(this.policyclient.policyAssignments.list());
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        item = _c.value;
                        arrayList.push(item);
                        console.log(item);
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
                        console.assert(arrayList.length > 0);
                        return [2 /*return*/];
                }
            });
        });
    };
    //policyAssignments.listForResourceGroup
    TestPolicyDefinition.prototype.test_policyAssignments_listForResourceGroup = function () {
        var e_13, _a;
        return __awaiter(this, void 0, void 0, function () {
            var arrayList, _b, _c, item, e_13_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        arrayList = new Array();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(this.policyclient.policyAssignments.listForResourceGroup(this.resourceGroupName));
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        item = _c.value;
                        arrayList.push(item);
                        console.log(item);
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
                        console.assert(arrayList.length >= 1);
                        return [2 /*return*/];
                }
            });
        });
    };
    //policyAssignments.listForResource
    TestPolicyDefinition.prototype.test_policyAssignments_listForResource = function () {
        var e_14, _a;
        return __awaiter(this, void 0, void 0, function () {
            var arrayList, _b, _c, item, e_14_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        arrayList = new Array();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(this.policyclient.policyAssignments.listForResource(this.resourceGroupName, "Microsoft.Compute", "", "availabilitySets", "jstrack2test"));
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        item = _c.value;
                        arrayList.push(item);
                        console.log(item);
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
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    //policyAssignments.delete
    TestPolicyDefinition.prototype.test_policyAssignments_delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.policyclient.policyAssignments["delete"](this.scope, this.policyAssignmentName).then(function (result) {
                            console.log(result);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //policyAssignments.createById
    TestPolicyDefinition.prototype.test_policyAssignments_createById = function () {
        return __awaiter(this, void 0, void 0, function () {
            var definition, assigment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.test_policyDefinitions_createOrUpdate()];
                    case 1:
                        definition = _a.sent();
                        return [4 /*yield*/, this.policyclient.policyAssignments.createById(this.policyId, { policyDefinitionId: definition.id })];
                    case 2:
                        assigment = _a.sent();
                        console.log(assigment);
                        return [2 /*return*/, assigment];
                }
            });
        });
    };
    //policySetDefinitions.get
    TestPolicyDefinition.prototype.test_policySetDefinitions_get = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.policyclient.policySetDefinitions.get(this.policySetName).then(function (result) {
                            console.log(result);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //policyAssignments.getById
    TestPolicyDefinition.prototype.test_policyAssignments_getById = function () {
        return __awaiter(this, void 0, void 0, function () {
            var assigment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.test_policyAssignments_createById()];
                    case 1:
                        assigment = _a.sent();
                        return [4 /*yield*/, this.policyclient.policyAssignments.getById(assigment.id).then(function (result) {
                                console.log(result);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //policyAssignments.deleteById
    TestPolicyDefinition.prototype.test_policyAssignments_deleteById = function () {
        return __awaiter(this, void 0, void 0, function () {
            var assigment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.test_policyAssignments_createById()];
                    case 1:
                        assigment = _a.sent();
                        return [4 /*yield*/, this.policyclient.policyAssignments.deleteById(assigment.id).then(function (result) {
                                console.log(result);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //policySetDefinitions.delete
    TestPolicyDefinition.prototype.test_policySetDefinitions_delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.policyclient.policySetDefinitions["delete"](this.policySetName).then(function (result) {
                            console.log(result);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //policyDefinitions.delete
    TestPolicyDefinition.prototype.test_policyDefinitions_delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var definition;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.test_policyDefinitions_createOrUpdate()];
                    case 1:
                        definition = _a.sent();
                        return [4 /*yield*/, this.policyclient.policyDefinitions["delete"](definition.name).then(function (result) {
                                console.log(result);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TestPolicyDefinition;
}());
var tm = new TestPolicyDefinitionAtManagementGroup();
tm.test_policyAssignments_createById();
