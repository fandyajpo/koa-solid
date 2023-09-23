"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSetUsername = exports.SUser = void 0;
const yup_1 = require("yup");
const SUserAddress = (0, yup_1.object)().shape({
    street: (0, yup_1.string)(),
    city: (0, yup_1.string)(),
    state: (0, yup_1.string)(),
    postalCode: (0, yup_1.string)(),
    country: (0, yup_1.string)(),
});
exports.SUser = (0, yup_1.object)().shape({
    col: (0, yup_1.string)(),
    _key: (0, yup_1.string)(),
    verified: (0, yup_1.boolean)().required(),
    status: (0, yup_1.string)()
        .oneOf(["ACTIVE", "DISABLED", "BANNED"])
        .required(),
    createdBy: (0, yup_1.string)(),
    createdAt: (0, yup_1.date)(),
    lastUpdateBy: (0, yup_1.string)(),
    lastUpdateTime: (0, yup_1.date)(),
    bio: (0, yup_1.string)(),
    username: (0, yup_1.string)().required("Username is required"),
    email: (0, yup_1.string)().email().required("Email is required"),
    birthday: (0, yup_1.date)(),
    photoUrl: (0, yup_1.string)(),
    address: SUserAddress,
    password: (0, yup_1.string)(),
    permission: (0, yup_1.array)(),
});
exports.SSetUsername = (0, yup_1.object)().shape({
    username: (0, yup_1.string)().required(),
    lastUpdateBy: (0, yup_1.string)(),
    lastUpdateTime: (0, yup_1.date)(),
});
