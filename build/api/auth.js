"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const auth_1 = __importDefault(require("../class/auth"));
const token_1 = require("../middleware/token");
const authRoute = new koa_router_1.default({ prefix: "/v1" });
authRoute.post("/register", auth_1.default.Register);
authRoute.post("/checker", token_1.hasAuth, auth_1.default.Checker);
authRoute.post("/refresh", auth_1.default.Refresh);
authRoute.post("/login", auth_1.default.Login);
authRoute.post("/forgot-password", () => { });
exports.default = authRoute;
