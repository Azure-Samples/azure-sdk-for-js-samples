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
var links = require("@azure/arm-links");
var resources = require("@azure/arm-resources");
var identity_1 = require("@azure/identity");
var subscriptionId = process.env.subscriptionId;
var credential = new identity_1.DefaultAzureCredential();
var TestLinks = /** @class */ (function () {
    function TestLinks() {
        this.links_client = new links.ManagementLinkClient(credential, subscriptionId);
        this.resources_client = new resources.ResourceManagementClient(credential, subscriptionId);
        this.resourceGroup = "myjstestzzz";
        this.resourceName = "myresourcezzz";
        this.linksName = "myLink";
    }
    //resources.beginCreateOrUpdateAndWait
    TestLinks.prototype.create_resourceId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resources_client.resources.beginCreateOrUpdateAndWait(this.resourceGroup, "Microsoft.Compute", "", "availabilitySets", this.resourceName, "2019-07-01", { location: "eastus" })];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/, result.id];
                }
            });
        });
    };
    TestLinks.prototype.create_resourceId2 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resources_client.resources.beginCreateOrUpdateAndWait(this.resourceGroup, "Microsoft.Compute", "", "availabilitySets", this.resourceName + "2", "2019-07-01", { location: "eastus" })];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/, result.id];
                }
            });
        });
    };
    //resourceLinks.createOrUpdate
    TestLinks.prototype.resourceLinks_createOrUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var linkId, linkId2, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.create_resourceId()];
                    case 1:
                        linkId = _a.sent();
                        return [4 /*yield*/, this.create_resourceId2()];
                    case 2:
                        linkId2 = _a.sent();
                        return [4 /*yield*/, this.links_client.resourceLinks.createOrUpdate(linkId + "/providers/Microsoft.Resources/links/" + this.linksName, {
                                properties: {
                                    targetId: linkId2,
                                    notes: "Testing links"
                                }
                            })];
                    case 3:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    //resourceLinks.get
    TestLinks.prototype.resourceLinks_get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var linkId, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        linkId = "/subscriptions/" + subscriptionId + "/resourceGroups/myjstestzzz/providers/Microsoft.Compute/availabilitySets/myresourcezzz/providers/Microsoft.Resources/links/myLink";
                        return [4 /*yield*/, this.links_client.resourceLinks.get(linkId)];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    //resourceLinks.listAtSubscription
    TestLinks.prototype.resourceLinks_listAtSubscription = function () {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, _c, item, e_1_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, 6, 11]);
                        _b = __asyncValues(this.links_client.resourceLinks.listAtSubscription());
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
    //resourceLinks.listAtSourceScope
    TestLinks.prototype.resourceLinks_listAtSourceScope = function () {
        var e_2, _a;
        return __awaiter(this, void 0, void 0, function () {
            var resourceId, _b, _c, item, e_2_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        resourceId = "/subscriptions/" + subscriptionId + "/resourceGroups/myjstestzzz/providers/Microsoft.Compute/availabilitySets/myresourcezzz";
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(this.links_client.resourceLinks.listAtSourceScope(resourceId));
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        item = _c.value;
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
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    //resourceLinks.delete
    TestLinks.prototype.resourceLinks_delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var linkId, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        linkId = "/subscriptions/" + subscriptionId + "/resourceGroups/myjstestzzz/providers/Microsoft.Compute/availabilitySets/myresourcezzz/providers/Microsoft.Resources/links/myLink";
                        return [4 /*yield*/, this.links_client.resourceLinks["delete"](linkId)];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    //resources.beginDeleteAndWait
    TestLinks.prototype.resources_beginDeleteAndWait = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //delete reource
                    return [4 /*yield*/, this.resources_client.resources.beginDeleteAndWait(this.resourceGroup, "Microsoft.Compute", "", "availabilitySets", this.resourceName, "2019-07-01").then(function (res) {
                            console.log(res);
                        })
                        //delete reources2
                    ];
                    case 1:
                        //delete reource
                        _a.sent();
                        //delete reources2
                        return [4 /*yield*/, this.resources_client.resources.beginDeleteAndWait(this.resourceGroup, "Microsoft.Compute", "", "availabilitySets", this.resourceName + "2", "2019-07-01").then(function (res) {
                                console.log(res);
                            })];
                    case 2:
                        //delete reources2
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TestLinks;
}());
var t = new TestLinks();
t.resources_beginDeleteAndWait();
