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
const auth_1 = require("../types/schema/auth");
const yup_1 = require("yup");
const uuid_1 = require("uuid");
const auth_2 = __importStar(require("../service/auth"));
const jwt_1 = __importStar(require("../lib/jwt"));
const jsonwebtoken_1 = require("jsonwebtoken");
class CAuthControll {
    UserActivation(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return ctx;
        });
    }
    ForceRefresh(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield (0, auth_2.findUserByKey)(ctx.params._key);
                if (!user) {
                    ctx.response.status = 400;
                    ctx.response.body = {
                        data: {},
                        message: "Invalid user key",
                        status: false,
                        statusCode: ctx.response.status,
                    };
                    return ctx;
                }
                const { accessToken, refreshToken } = yield (0, jwt_1.default)(user);
                ctx.response.status = 200;
                ctx.response.body = {
                    status: true,
                    statusCode: ctx.response.status,
                    message: "Force refresh",
                    user,
                    token: {
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    },
                };
                return ctx;
            }
            catch (error) {
                if (error instanceof yup_1.ValidationError) {
                    ctx.response.status = 400;
                    ctx.response.body = {
                        status: false,
                        message: error.message,
                        statusCode: ctx.response.status,
                    };
                    return ctx;
                }
                ctx.response.status = 400;
                ctx.response.body = {
                    status: false,
                    message: error,
                    statusCode: ctx.response.status,
                };
                return ctx;
            }
        });
    }
    Test(ctx) {
        try {
            ctx.response.status = 200;
            ctx.response.body = {
                statusCode: ctx.response.status,
                status: true,
                message: "hai",
            };
            return ctx;
        }
        catch (error) {
            ctx.response.status = 400;
            ctx.response.body = {
                status: false,
                message: error,
                statusCode: ctx.response.status,
            };
            return ctx;
        }
    }
    Refresh(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authorization = ctx.request.header["authorization"];
                if (!authorization) {
                    ctx.response.status = 400;
                    ctx.response.body = {
                        status: false,
                        statusCode: ctx.response.status,
                        message: "Unauthorized",
                    };
                    return ctx;
                }
                const iron = authorization.replace("Bearer ", "");
                const refresh = (0, jwt_1.verifyRefresh)(iron);
                delete refresh.iat;
                delete refresh.exp;
                const { accessToken, refreshToken } = yield (0, jwt_1.default)(refresh);
                console.log("refreshed");
                ctx.response.status = 200;
                ctx.response.body = {
                    status: true,
                    statusCode: ctx.response.status,
                    message: "Token refreshed",
                    refresh,
                    token: {
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    },
                };
                return ctx;
            }
            catch (error) {
                if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
                    ctx.response.status = 400;
                    ctx.response.body = {
                        status: false,
                        message: error.message,
                        statusCode: ctx.response.status,
                    };
                    return ctx;
                }
                ctx.response.status = 400;
                ctx.response.body = {
                    status: false,
                    message: error,
                    statusCode: ctx.response.status,
                };
                return ctx;
            }
        });
    }
    Checker(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                ctx.response.status = 200;
                ctx.response.body = {
                    status: true,
                    statusCode: ctx.response.status,
                    message: "Token normal",
                };
                return ctx;
            }
            catch (error) {
                ctx.response.status = 400;
                ctx.response.body = {
                    status: false,
                    message: "Malformed!",
                    statusCode: ctx.response.status,
                };
                return ctx;
            }
        });
    }
    Login(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = ctx.request.body;
                const passed = yield auth_1.SLogin.validate(body, {
                    stripUnknown: true,
                });
                const user = yield (0, auth_2.findUsername)(String(passed.username));
                if (!user) {
                    ctx.response.status = 400;
                    ctx.response.body = {
                        status: false,
                        message: "Invalid username",
                        statusCode: ctx.response.status,
                    };
                    return ctx;
                }
                const isValid = yield (0, auth_2.compareHashPassword)(String(passed.password), String(user.password));
                if (!isValid) {
                    ctx.response.status = 400;
                    ctx.response.body = {
                        status: false,
                        message: "Invalid password",
                        statusCode: ctx.response.status,
                    };
                    return ctx;
                }
                const { accessToken, refreshToken } = yield (0, jwt_1.default)(user);
                ctx.response.status = 200;
                ctx.response.body = {
                    status: true,
                    statusCode: ctx.response.status,
                    message: "Login success",
                    user,
                    token: {
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    },
                };
                return ctx;
            }
            catch (error) {
                if (error instanceof yup_1.ValidationError) {
                    ctx.response.status = 400;
                    ctx.response.body = {
                        status: false,
                        message: error.message,
                        statusCode: ctx.response.status,
                    };
                    return ctx;
                }
                ctx.response.status = 400;
                ctx.response.body = {
                    status: false,
                    message: error,
                    statusCode: ctx.response.status,
                };
                return ctx;
            }
        });
    }
    Register(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = ctx.request.body;
                const passed = yield auth_1.SRegister.validate(body, {
                    stripUnknown: true,
                });
                const isTaken = yield (0, auth_2.findUsernameAndEmail)(String(passed.username), String(passed.email));
                if (isTaken.some((user) => user.username === passed.username)) {
                    ctx.response.status = 400;
                    ctx.response.body = {
                        status: false,
                        message: "Username is taken",
                        statusCode: ctx.response.status,
                    };
                    return ctx;
                }
                if (isTaken.some((user) => user.email === passed.email)) {
                    ctx.response.status = 400;
                    ctx.response.body = {
                        status: false,
                        message: "Email is taken",
                        statusCode: ctx.response.status,
                    };
                    return ctx;
                }
                const hash = yield (0, auth_2.createHashPassword)(String(passed.password));
                const isValid = yield (0, auth_2.compareHashPassword)(String(passed.password), hash);
                if (!isValid) {
                    ctx.response.status = 400;
                    ctx.response.body = {
                        status: false,
                        message: "Try again later",
                        statusCode: ctx.response.status,
                    };
                    return ctx;
                }
                yield (0, auth_2.default)({
                    _key: (0, uuid_1.v4)(),
                    email: String(passed.email),
                    username: String(passed.username),
                    password: hash,
                });
                ctx.response.status = 200;
                ctx.response.body = {
                    status: true,
                    message: "Register successfully",
                    statusCode: ctx.response.status,
                };
                return ctx;
            }
            catch (error) {
                if (error instanceof yup_1.ValidationError) {
                    ctx.response.status = 400;
                    ctx.response.body = {
                        status: false,
                        message: error.message,
                        statusCode: ctx.response.status,
                    };
                    return ctx;
                }
                ctx.response.status = 400;
                ctx.response.body = {
                    status: false,
                    message: error,
                    statusCode: ctx.response.status,
                };
                return ctx;
            }
        });
    }
}
const VAuthControll = new CAuthControll();
exports.default = VAuthControll;
