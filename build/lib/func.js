"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateFormat = exports.retError = exports.logger = exports.listeningTo = exports.corsOption = void 0;
const cors_1 = __importDefault(require("@koa/cors"));
const corsOption = () => {
    const options = {
        origin: "*",
    };
    return (0, cors_1.default)(options);
};
exports.corsOption = corsOption;
const retError = (err, ctx) => {
    console.log(err, ctx);
};
exports.retError = retError;
const listeningTo = () => {
    console.log("App listening to port");
};
exports.listeningTo = listeningTo;
const logger = (a) => {
    console.log(JSON.stringify(a, null, 2));
};
exports.logger = logger;
const dateFormat = (date) => {
    if (typeof date === "undefined" || !(date instanceof Date))
        return "";
    const d = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const req = new Intl.DateTimeFormat("en-US", d);
    const format = req.format(date);
    return format;
};
exports.dateFormat = dateFormat;
const cipher = () => null;
const decopher = () => null;
