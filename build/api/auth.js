"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const auth_1 = __importDefault(require("../class/auth"));
const token_1 = require("../middleware/token");
const RAuthControll = new koa_router_1.default({ prefix: "/v1" });
RAuthControll.get("/test", auth_1.default.Test);
RAuthControll.post("/register", auth_1.default.Register);
RAuthControll.post("/checker", token_1.hasAuth, auth_1.default.Checker);
RAuthControll.post("/login", auth_1.default.Login);
RAuthControll.post("/refresh", auth_1.default.Refresh);
RAuthControll.post("/force-refresh/:_key", auth_1.default.ForceRefresh);
exports.default = RAuthControll;
