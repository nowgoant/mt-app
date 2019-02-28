"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
var routing_controllers_1 = require("routing-controllers");
var koa_1 = require("koa");
var axios_1 = require("axios");
var fecha_1 = require("fecha");
var esQuery_1 = require("./../common/esQuery");
var ResultData_1 = require("./../view/ResultData");
var PageError_1 = require("./../models/PageError");
var ApiErrorController = /** @class */ (function () {
    function ApiErrorController() {
    }
    ApiErrorController.prototype.test = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ['test success']];
            });
        });
    };
    ApiErrorController.prototype.search = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var url, query, data, originData, rstData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'http://jrapp-es.jdfmgt.com/jrmdp-h5-business-2018-07-16,jrmdp-h5-business-2018-07-17/_search';
                        query = esQuery_1.default();
                        return [4 /*yield*/, axios_1.default.post(url, query)];
                    case 1:
                        data = (_a.sent()).data;
                        originData = data.hits && data.hits.hits;
                        rstData = [];
                        if (originData && originData.length) {
                            rstData = originData;
                        }
                        return [2 /*return*/, rstData];
                }
            });
        });
    };
    ApiErrorController.prototype.searchPost = function (req, res, dateRange) {
        return __awaiter(this, void 0, void 0, function () {
            var startDate, endDate, serverUrl, query, data, originData, rstData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (dateRange && dateRange.length) {
                            startDate = dateRange[0];
                            endDate = dateRange[1] || '';
                            serverUrl = esQuery_1.allreWrite('http://jrapp-es.jdfmgt.com/{jrmdp-h5-business}/_search', startDate, endDate);
                        }
                        else {
                            startDate = fecha_1.default.format(new Date(), 'YYYY-MM-DD');
                            serverUrl = "http://jrapp-es.jdfmgt.com/jrmdp-h5-business-" + startDate + "/_search";
                        }
                        query = esQuery_1.default();
                        query = esQuery_1.addMust(query, [
                            {
                                key: 'pin',
                                value: req.body['pin']
                            },
                            {
                                key: 'url',
                                expressionKey: 'prefix',
                                value: req.body['url']
                            },
                            {
                                key: 'logLevel',
                                value: req.body['logLevel']
                            }
                        ]);
                        console.log(req.body);
                        console.log(serverUrl);
                        console.log(query.query.bool.must);
                        return [4 /*yield*/, axios_1.default.post(serverUrl, query)];
                    case 1:
                        data = (_a.sent()).data;
                        originData = data.hits && data.hits.hits;
                        rstData = new ResultData_1.default('0', '', { isSuccess: '1' });
                        if (originData && originData.length) {
                            rstData.resultData.list = originData;
                        }
                        return [2 /*return*/, rstData];
                }
            });
        });
    };
    ApiErrorController.prototype.sync = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var startDate, startDate1, url, data, resultData, promises;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startDate = fecha_1.default.format(new Date(), 'YYYY-MM-DD');
                        startDate1 = startDate.split('-').join('');
                        url = "http://jrmdp.jd.com/report/getCardReprot?sid=654f48de9faad53a678baa767bf2d27f&url=http://spago.jr.jd.com/SpagoBI/restful-services/2.0/datasets/jrapp_h5_data_r_error_20/content?etl_dt=" + startDate1 + "&sid=f81a2afb61a6a0770807c6f8fc9d01fw";
                        console.log(url);
                        // const { data } = await axios.get(url, {})
                        // console.log('data', data)
                        console.log('req.header', req.cookies);
                        data = [{ urlP: '/rn/BTMonthBill/index.html' }, { urlP: '/jdbt/lightning/index.html' }, { urlP: '/jdbt/quotamanage/quota.html' }, { urlP: '/jdbt/btgold/index.html' }];
                        resultData = [];
                        promises = data.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                            var errorCount, pvCount;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.getErrorCount(startDate, item.urlP)];
                                    case 1:
                                        errorCount = _a.sent();
                                        return [4 /*yield*/, this.getPVCount(startDate, item.urlP)];
                                    case 2:
                                        pvCount = _a.sent();
                                        resultData.push({
                                            urlP: item.urlP,
                                            errorCount: errorCount,
                                            pvCount: pvCount,
                                            errorRate: ((errorCount / pvCount) * 100).toFixed(2)
                                        });
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        _a.sent();
                        console.log(resultData);
                        return [2 /*return*/, res.json(resultData)];
                }
            });
        });
    };
    ApiErrorController.prototype.createPageErrorAction = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var createDate, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        createDate = fecha_1.default.format(new Date(), 'YYYY-MM-DD');
                        return [4 /*yield*/, PageError_1.default.create({
                                urlP: req.body['urlP'] || '',
                                date: req.body['date'] || '',
                                errorCount: 0,
                                pvCount: 0,
                                errorRate: 0,
                                createDate: createDate
                            })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user.dataValues];
                }
            });
        });
    };
    ApiErrorController.prototype.getErrorCount = function (startDate, urlP) {
        return __awaiter(this, void 0, void 0, function () {
            var errorQuery, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errorQuery = esQuery_1.default();
                        errorQuery = esQuery_1.addMust(errorQuery, [
                            {
                                key: 'urlP',
                                value: urlP || ''
                            },
                            {
                                key: 'logLevel',
                                value: 'ERROR'
                            }
                        ]);
                        return [4 /*yield*/, axios_1.default.post("http://jrapp-es.jdfmgt.com/jrmdp-h5-business-" + startDate + "/_count", errorQuery)];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data.count || 0];
                }
            });
        });
    };
    ApiErrorController.prototype.getPVCount = function (startDate, urlP) {
        return __awaiter(this, void 0, void 0, function () {
            var errorQuery, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errorQuery = esQuery_1.default();
                        errorQuery = esQuery_1.addMust(errorQuery, [
                            {
                                key: 'urlP',
                                value: urlP || ''
                            },
                            {
                                key: 'logLevel',
                                value: 'TRACE'
                            }
                        ]);
                        return [4 /*yield*/, axios_1.default.post("http://jrapp-es.jdfmgt.com/jrmdp-h5-business-" + startDate + "/_count", errorQuery)];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data.count || 0];
                }
            });
        });
    };
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    __decorate([
        routing_controllers_1.Get('/test'),
        __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Res()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_a = typeof koa_1.Request !== "undefined" && koa_1.Request) === "function" ? _a : Object, typeof (_b = typeof koa_1.Response !== "undefined" && koa_1.Response) === "function" ? _b : Object]),
        __metadata("design:returntype", Promise)
    ], ApiErrorController.prototype, "test", null);
    __decorate([
        routing_controllers_1.Get('/search'),
        __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Res()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_c = typeof koa_1.Request !== "undefined" && koa_1.Request) === "function" ? _c : Object, typeof (_d = typeof koa_1.Response !== "undefined" && koa_1.Response) === "function" ? _d : Object]),
        __metadata("design:returntype", Promise)
    ], ApiErrorController.prototype, "search", null);
    __decorate([
        routing_controllers_1.Post('/search'),
        __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Res()), __param(2, routing_controllers_1.BodyParam('dateRange')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_e = typeof koa_1.Request !== "undefined" && koa_1.Request) === "function" ? _e : Object, typeof (_f = typeof koa_1.Response !== "undefined" && koa_1.Response) === "function" ? _f : Object, Array]),
        __metadata("design:returntype", Promise)
    ], ApiErrorController.prototype, "searchPost", null);
    __decorate([
        routing_controllers_1.Post('/sync'),
        __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Res()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_g = typeof koa_1.Request !== "undefined" && koa_1.Request) === "function" ? _g : Object, typeof (_h = typeof koa_1.Response !== "undefined" && koa_1.Response) === "function" ? _h : Object]),
        __metadata("design:returntype", Promise)
    ], ApiErrorController.prototype, "sync", null);
    __decorate([
        routing_controllers_1.Post('/create'),
        __param(0, routing_controllers_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_j = typeof koa_1.Request !== "undefined" && koa_1.Request) === "function" ? _j : Object]),
        __metadata("design:returntype", Promise)
    ], ApiErrorController.prototype, "createPageErrorAction", null);
    ApiErrorController = __decorate([
        routing_controllers_1.JsonController('/api/error')
    ], ApiErrorController);
    return ApiErrorController;
}());
exports.ApiErrorController = ApiErrorController;
//# sourceMappingURL=ApiErrorController.js.map