"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const user_1 = require("../types/user");
const yup_1 = require("yup");
const auth_1 = __importStar(require("../service/auth"));
const jwt_1 = __importStar(require("../lib/jwt"));
const jsonwebtoken_1 = require("jsonwebtoken");
class Auth {
    Refresh(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authorization = ctx.request.header["authorization"];
                if (!authorization) {
                    ctx.response.status = 400;
                    return (ctx.response.body = { status: false, message: "Unauthorized" });
                }
                const iron = authorization.replace("Bearer ", "");
                const refresh = (0, jwt_1.verifyRefresh)(iron);
                delete refresh.iat;
                delete refresh.exp;
                const { accessToken, refreshToken } = yield (0, jwt_1.default)(refresh);
                ctx.response.status = 200;
                return (ctx.response.body = {
                    status: true,
                    message: "Refresh success",
                    token: {
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    },
                });
            }
            catch (error) {
                if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
                    ctx.response.status = 400;
                    return (ctx.response.body = error);
                }
                ctx.response.status = 400;
                return (ctx.response.body = error);
            }
        });
    }
    Checker(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                ctx.response.status = 200;
                return (ctx.response.body = { status: "refresh" });
            }
            catch (error) {
                ctx.response.status = 400;
                return (ctx.response.body = { status: "broken" });
            }
        });
    }
    Login(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = ctx.request.body;
                const passed = yield user_1.SLogin.validate(body, {
                    stripUnknown: true,
                });
                const user = yield (0, auth_1.findUsername)(String(passed.username));
                if (user === undefined) {
                    ctx.response.status = 400;
                    return (ctx.response.body = {
                        status: false,
                        message: "Invalid username",
                    });
                }
                const isValid = yield (0, auth_1.compareHashPassword)(String(passed.password), String(user.password));
                if (!isValid) {
                    ctx.response.status = 400;
                    return (ctx.response.body = {
                        status: false,
                        message: "Invalid password",
                    });
                }
                const { accessToken, refreshToken } = yield (0, jwt_1.default)(user);
                ctx.response.status = 200;
                return (ctx.response.body = {
                    status: true,
                    message: "Login success",
                    token: {
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    },
                });
            }
            catch (error) {
                if (error instanceof yup_1.ValidationError) {
                    ctx.response.status = 400;
                    return (ctx.response.body = { status: false, message: error.message });
                }
                ctx.response.status = 400;
                return (ctx.response.body = { status: false, message: error });
            }
        });
    }
    Register(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = ctx.request.body;
                const passed = yield user_1.SRegister.validate(body, {
                    stripUnknown: true,
                });
                const isTaken = yield (0, auth_1.findUsernameAndEmail)(String(passed.username), String(passed.email));
                if (isTaken.some((user) => user.username === passed.username)) {
                    ctx.response.status = 400;
                    return (ctx.response.body = {
                        status: false,
                        message: "Username is taken",
                    });
                }
                if (isTaken.some((user) => user.email === passed.email)) {
                    ctx.response.status = 400;
                    return (ctx.response.body = {
                        status: false,
                        message: "Email is taken",
                    });
                }
                const hash = yield (0, auth_1.createHashPassword)(String(passed.password));
                yield (0, auth_1.default)({
                    email: String(passed.email),
                    username: String(passed.username),
                    password: hash,
                });
                ctx.response.status = 200;
                return (ctx.response.body = { status: true, message: "User registered" });
            }
            catch (error) {
                if (error instanceof yup_1.ValidationError) {
                    ctx.response.status = 400;
                    return (ctx.response.body = { status: false, message: error.message });
                }
                ctx.response.status = 400;
                return (ctx.response.body = { status: false, message: error });
            }
        });
    }
}
const authClass = new Auth();
exports.default = authClass;
