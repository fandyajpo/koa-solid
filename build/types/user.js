"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SRegister = exports.SUser = exports.SLogin = void 0;
const yup_1 = require("yup");
const SUserAddress = (0, yup_1.object)().shape({
    street: (0, yup_1.string)(),
    city: (0, yup_1.string)(),
    state: (0, yup_1.string)(),
    postalCode: (0, yup_1.string)(),
    country: (0, yup_1.string)(),
});
exports.SLogin = (0, yup_1.object)().shape({
    password: (0, yup_1.string)().required("Password is required"),
    username: (0, yup_1.string)().required("Username is required"),
});
exports.SUser = (0, yup_1.object)().shape({
    _key: (0, yup_1.string)(),
    _id: (0, yup_1.string)(),
    _rev: (0, yup_1.string)(),
    username: (0, yup_1.string)().required("Username is required"),
    email: (0, yup_1.string)().email().required("Email is required"),
    birthday: (0, yup_1.date)(),
    photoUrl: (0, yup_1.string)(),
    address: SUserAddress,
    password: (0, yup_1.string)(),
});
exports.SRegister = (0, yup_1.object)().shape({
    username: (0, yup_1.string)().required("Username is required"),
    email: (0, yup_1.string)().email().required("Email is required"),
    password: (0, yup_1.string)().required().min(6, "Password must be more than 6 letter"),
    confirmPassword: (0, yup_1.string)()
        .required()
        .test("password match", "Passwords must match with confirm password", function (value) {
        return value === this.parent.password;
    }),
});
