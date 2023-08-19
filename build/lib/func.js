"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dec = exports.enc = exports.dateFormat = exports.retError = exports.logger = exports.listeningTo = exports.corsOption = void 0;
const cors_1 = __importDefault(require("@koa/cors"));
const corsOption = () => {
    const options = {
        origin: "*",
    };
    return (0, cors_1.default)(options);
};
exports.corsOption = corsOption;
const retError = (err, ctx) => {
    logger({ error: err, context: ctx });
};
exports.retError = retError;
const listeningTo = () => {
    logger(`App listening to port`);
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
const cipher = (salt) => {
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
    return (text) => text.split("").map(textToChars).map(applySaltToChar).map(byteHex).join("");
};
const decipher = (salt) => {
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
    return (encoded) => encoded
        .match(/.{1,2}/g)
        .map((hex) => parseInt(hex, 16))
        .map(applySaltToChar)
        .map((charCode) => String.fromCharCode(charCode))
        .join("");
};
const enc = cipher(String(process.env.SALT));
exports.enc = enc;
const dec = decipher(String(process.env.SALT));
exports.dec = dec;
