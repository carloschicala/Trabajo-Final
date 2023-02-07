"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
//const sequelize = new Sequelize('rrhh', 'root', '1234',
const sequelize = new sequelize_1.Sequelize('rrhh', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});
//jdbc:mysql://localhost:3306/?user=root
exports.default = sequelize; //
