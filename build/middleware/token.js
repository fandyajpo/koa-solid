"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasAuth = void 0;
const jwt_1 = require("../lib/jwt");
const jsonwebtoken_1 = require("jsonwebtoken");
const hasAuth = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorization = ctx.request.header["authorization"];
        if (!authorization) {
            ctx.response.status = 400;
            return (ctx.response.body = { status: false, message: "Unauthorized" });
        }
        const iron = authorization.replace("Bearer ", "");
        (0, jwt_1.verifyAccess)(iron);
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            ctx.response.status = 400;
            console.log(error.message);
            return (ctx.response.body = { status: false, message: error.message });
        }
        ctx.response.status = 400;
        return (ctx.response.body = { status: false, message: error });
    }
});
exports.hasAuth = hasAuth;
