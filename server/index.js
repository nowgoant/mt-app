"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var server_1 = require("./server");
// import './sequelize'
// let configPath = path.join(__dirname, "./config/.env")
// config({ path: configPath });
var server = new server_1.Server();
server.setStaticFolders();
server.setErrorHandlers();
server.startServer();
//# sourceMappingURL=index.js.map