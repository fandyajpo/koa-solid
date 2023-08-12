"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserError = exports.UserHandler = void 0;
const permissionField_1 = require("../lib/permissionField");
class UserHandler {
    constructor(p) {
        this.user = p;
    }
    hasPermission(p) {
        const userPermissionValue = Math.max(...this.user.permission.map((permission) => permissionField_1.PermissionField[permission]));
        return userPermissionValue >= permissionField_1.PermissionField[p];
    }
    setEmail(m) { }
    setPassword(p) { }
    setUsername(u) {
        if (typeof u !== "string")
            return;
        this.user.username = u;
    }
    setPermission(permissions) {
        const validPermissions = permissions.every((permission) => Object.values(permissionField_1.PermissionField).includes(permission));
        if (!validPermissions) {
            throw new Error("malformed-permission");
        }
        this.user.permission = permissions;
    }
    get email() {
        return this.user.email;
    }
    get username() {
        return this.user.username;
    }
    get permission() {
        return this.user.permission;
    }
}
exports.UserHandler = UserHandler;
class UserError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = "UserError";
        this.statusCode = statusCode;
        this.message = message;
    }
    handleFunc() { }
}
exports.UserError = UserError;
