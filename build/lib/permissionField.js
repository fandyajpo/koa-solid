"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionField = void 0;
var PermissionField;
(function (PermissionField) {
    PermissionField[PermissionField["ADMINISTRATOR"] = 5] = "ADMINISTRATOR";
    PermissionField[PermissionField["MANAGE_TENANT"] = 4] = "MANAGE_TENANT";
    PermissionField[PermissionField["MANAGE_PROJECT"] = 3] = "MANAGE_PROJECT";
    PermissionField[PermissionField["MANAGE_ROLE"] = 2] = "MANAGE_ROLE";
    PermissionField[PermissionField["MANAGE_USER"] = 1] = "MANAGE_USER";
    PermissionField[PermissionField["READ"] = 0] = "READ";
})(PermissionField || (exports.PermissionField = PermissionField = {}));
