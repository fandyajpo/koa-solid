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
exports.createToken = exports.createRefresh = exports.createAccess = void 0;
const createUser = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = ctx.request.body;
        return (ctx.response.body = body);
    }
    catch (error) {
        return (ctx.body = { message: "something went wrong" });
    }
});
const createAccess = () => null;
exports.createAccess = createAccess;
const createRefresh = () => null;
exports.createRefresh = createRefresh;
const createToken = () => null;
exports.createToken = createToken;
exports.default = createUser;
