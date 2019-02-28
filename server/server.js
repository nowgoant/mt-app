"use strict";
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
var Koa = require("koa");
var consola = require("consola");
var _a = require('nuxt'), Nuxt = _a.Nuxt, Builder = _a.Builder;
// import chalk from 'chalk';
var path_1 = require("path");
var routing_controllers_1 = require("routing-controllers");
var routePrefix = '/api';
var app = new Koa();
var config = require('../nuxt.config.js');
config.dev = !(app.env === 'production');
var Server = /** @class */ (function () {
    function Server() {
        this.setRoutes = function () {
            routing_controllers_1.useKoaServer(app, {
                /**
                 * We can add options about how routing-controllers should configure itself.
                 * Here we specify what controllers should be registered in our express server.
                 */
                controllers: [path_1.join(__dirname, '/controllers/**/*')],
                routePrefix: routePrefix
            });
        };
        //When hosting a client app such as angular - map the path to the client dist folder
        this.setStaticFolders = function () {
            // var path = require('path');
            // let clientPath = path.join(__dirname, '../<client folder>/dist');
            //console.log(`adding static folder: ${clientPath}`)
            // this.app.use(express.static(clientPath));
        };
        this.setErrorHandlers = function () {
            // this.app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
            //   res.status((<any>err).status || 500);
            //   res.send({
            //     message: err.message,
            //     error: err
            //   });
            // });
        };
    }
    Server.prototype.startServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nuxt, _a, _b, host, _c, port, builder;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        nuxt = new Nuxt(config);
                        _a = nuxt.options.server, _b = _a.host, host = _b === void 0 ? process.env.HOST || '127.0.0.1' : _b, _c = _a.port, port = _c === void 0 ? process.env.PORT || 3000 : _c;
                        if (!config.dev) return [3 /*break*/, 2];
                        builder = new Builder(nuxt);
                        return [4 /*yield*/, builder.build()];
                    case 1:
                        _d.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, nuxt.ready()];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        this.setRoutes();
                        app.use(function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(ctx.originalUrl.indexOf(routePrefix) === 0)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, next()];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        ctx.status = 200;
                                        // koa defaults to 404 when it sees that status is unset
                                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                                ctx.res.on('close', resolve);
                                                ctx.res.on('finish', resolve);
                                                nuxt.render(ctx.req, ctx.res, function (promise) {
                                                    // nuxt.render passes a rejected promise into callback on error.
                                                    promise.then(resolve).catch(reject);
                                                });
                                            })];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); });
                        app.listen(port, host);
                        consola.ready({
                            message: "Server listening on http://" + host + ":" + port,
                            badge: true
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=server.js.map