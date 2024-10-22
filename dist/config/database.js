"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME || "verifier", process.env.DB_USER || "admin", process.env.DB_PASSWORD || "airtnueysapafivujbgnxgvgm", {
    host: process.env.DB_HOST || "127.0.0.1",
    port: 3306,
    dialect: "mysql",
    logging: console.log,
});
exports.default = sequelize;
