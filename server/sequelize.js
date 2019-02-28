"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_typescript_1 = require("sequelize-typescript");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'mysql',
    database: 'web',
    username: 'root',
    password: '123root123',
    modelPaths: [__dirname + '/models'],
    operatorsAliases: false
});
//# sourceMappingURL=sequelize.js.map