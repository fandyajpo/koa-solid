"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLogin = exports.SRegister = void 0;
const yup_1 = require("yup");
exports.SRegister = (0, yup_1.object)().shape({
    _key: (0, yup_1.string)(),
    col: (0, yup_1.string)(),
    username: (0, yup_1.string)().required("Username is required"),
    email: (0, yup_1.string)().email().required("Email is required"),
    password: (0, yup_1.string)().required().min(6, "Password must be more than 6 letter"),
    confirmPassword: (0, yup_1.string)()
        .required()
        .test("password match", "Passwords must match with confirm password", function (value) {
        return value === this.parent.password;
    }),
    createdBy: (0, yup_1.string)(),
    createdAt: (0, yup_1.date)(),
    lastUpdateBy: (0, yup_1.string)(),
    lastUpdateTime: (0, yup_1.date)(),
});
exports.SLogin = (0, yup_1.object)().shape({
    password: (0, yup_1.string)().required("Password is required"),
    username: (0, yup_1.string)().required("Username is required"),
});
