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
const user_1 = require("../types/schema/user");
const yup_1 = require("yup");
const user_2 = require("../service/user");
const auth_1 = require("../service/auth");
class CUserControll {
    GetUser(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return ctx;
        });
    }
    SetProfilePicture(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return ctx;
            }
            catch (error) {
                return ctx;
            }
        });
    }
    GetProfile(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield (0, auth_1.findUserByKey)(ctx.params._key);
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
                ctx.response.status = 200;
                ctx.response.body = {
                    data: user,
                    message: "I got the user",
                    status: true,
                    statusCode: ctx.response.status,
                };
                return ctx;
            }
            catch (error) {
                ctx.response.status = 400;
                ctx.response.body = error;
                return ctx;
            }
        });
    }
    GetTenant(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return ctx;
        });
    }
    SetUsername(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = ctx.request.body;
                const { _key, username } = yield user_1.SSetUsername.validate(body, {
                    stripUnknown: true,
                });
                const update = yield (0, user_2.setUsername)({ _key, username });
                ctx.response.status = 200;
                ctx.response.body = {
                    data: update,
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
    SetEmail(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return ctx;
        });
    }
    SetPhoneNumber(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return ctx;
        });
    }
    DeleteUser(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return ctx;
        });
    }
    SetAccountStatus(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return ctx;
        });
    }
    FindUser(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return ctx;
        });
    }
}
const VUserControll = new CUserControll();
exports.default = VUserControll;
