"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasPermission = void 0;
const user_1 = require("../class/user");
const hasPermission = (perm) => (ctx, next) => {
    try {
        return next();
    }
    catch (err) {
        if (err instanceof user_1.UserError) {
            return err.handleFunc();
        }
        return (ctx.body = { message: "Something went wrong" });
    }
};
exports.hasPermission = hasPermission;
