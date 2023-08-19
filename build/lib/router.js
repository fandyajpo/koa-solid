"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const user_1 = __importDefault(require("../api/user"));
const auth_1 = __importDefault(require("../api/auth"));
const api_1 = __importDefault(require("../api"));
const func_1 = require("./func");
const koa_body_1 = require("koa-body");
// redis.connect();
const R = new koa_router_1.default();
R.use(api_1.default.routes());
R.use(auth_1.default.routes());
R.use(user_1.default.routes());
const App = new koa_1.default();
App.use((0, func_1.corsOption)());
App.use((0, koa_body_1.koaBody)());
App.use(R.routes());
App.use(R.allowedMethods());
App.on("error", func_1.retError);
App.listen(process.env.PORT, func_1.listeningTo);
exports.default = R;
