"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const public_routes_1 = __importDefault(require("./public.routes"));
class Routes {
    constructor(app) {
        app.use("/v1", public_routes_1.default);
    }
}
exports.default = Routes;
