"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const entity_controller_1 = __importDefault(require("../controllers/entity.controller"));
class PublicRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/test", (req, res) => {
            res.send("Hello World!");
        });
        this.router.post("/verify", entity_controller_1.default.requestVerification);
    }
}
exports.default = new PublicRoutes().router;
