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
exports.getTest = void 0;
const redis_1 = require("redis");
const func_1 = require("./func");
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;
const redis = (0, redis_1.createClient)({
    url: `redis://:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`,
});
redis.on("error", (error) => (0, func_1.logger)({ name: "Redis Error", error }));
redis.once("ready", () => {
    (0, func_1.logger)({ name: "Redis Ready" });
});
const getTest = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getting = yield redis.GET("test");
        if (getting === null) {
            return "Key is not exist";
        }
        return getting;
    }
    catch (error) {
        throw error;
    }
});
exports.getTest = getTest;
