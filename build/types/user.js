"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUser = void 0;
const yup_1 = require("yup");
const SUserAddress = (0, yup_1.object)().shape({
    street: (0, yup_1.string)(),
    city: (0, yup_1.string)(),
    state: (0, yup_1.string)(),
    postalCode: (0, yup_1.string)(),
    country: (0, yup_1.string)(),
});
exports.SUser = (0, yup_1.object)().shape({
    username: (0, yup_1.string)().required(),
    email: (0, yup_1.string)().email().required(),
    firstName: (0, yup_1.string)(),
    lastName: (0, yup_1.string)(),
    birthday: (0, yup_1.date)(),
    address: SUserAddress,
});
