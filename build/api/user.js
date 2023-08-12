"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const profile = new koa_router_1.default();
profile.patch("/displayName", () => { });
profile.patch("/email", () => { });
profile.patch("/photoUrl", () => { });
exports.default = profile;
