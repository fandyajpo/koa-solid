"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const health_1 = __importDefault(require("../class/health"));
const healthRoute = new koa_router_1.default();
healthRoute.get("/", health_1.default.Health);
exports.default = healthRoute;
