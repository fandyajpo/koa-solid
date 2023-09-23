"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const user_1 = __importDefault(require("../class/user"));
const RUserControll = new koa_router_1.default({ prefix: "/v1/user" });
// GETTER
RUserControll.get("/", (ctx) => (ctx.response.body = "User Route"));
RUserControll.get("/profile/:_key", user_1.default.GetProfile);
// SETTER
// follow username api structure
RUserControll.patch("/username/:_key", user_1.default.SetUsername);
RUserControll.patch("/email", () => { });
RUserControll.patch("/photoUrl", () => { });
exports.default = RUserControll;
