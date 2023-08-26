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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefresh = exports.verifyAccess = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createAccessToken = (payload) => {
    try {
        delete payload.password;
        const accessToken = jsonwebtoken_1.default.sign(payload, String(process.env.ACCESS_TOKEN), {
            expiresIn: "10s",
        });
        return accessToken;
    }
    catch (error) {
        throw error;
    }
};
const createRefreshToken = (payload) => {
    try {
        delete payload.password;
        const refreshToken = jsonwebtoken_1.default.sign(payload, String(process.env.REFRESH_TOKEN), {
            expiresIn: "7d",
        });
        return refreshToken;
    }
    catch (error) {
        throw error;
    }
};
const createToken = (p) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gen = yield Promise.all([
            createAccessToken(p),
            createRefreshToken(p),
        ]);
        return {
            accessToken: gen[0],
            refreshToken: gen[1],
        };
    }
    catch (error) {
        throw error;
    }
});
const verifyAccess = (token) => {
    try {
        var res = jsonwebtoken_1.default.verify(String(token), String(process.env.ACCESS_TOKEN));
        return res;
    }
    catch (error) {
        throw error;
    }
};
exports.verifyAccess = verifyAccess;
const verifyRefresh = (token) => {
    try {
        var res = jsonwebtoken_1.default.verify(String(token), String(process.env.REFRESH_TOKEN));
        return res;
    }
    catch (error) {
        throw error;
    }
};
exports.verifyRefresh = verifyRefresh;
exports.default = createToken;
