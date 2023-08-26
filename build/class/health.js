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
const arango_1 = require("../lib/arango");
class Healt {
    Health(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                ctx.response.status = 200;
                return (ctx.response.body = {
                    status: true,
                    message: "Hai success",
                });
            }
            catch (error) {
                ctx.response.status = 400;
                return (ctx.response.body = error);
            }
        });
    }
    Arango(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { message } = ctx.request.body;
                const ping = yield (0, arango_1.createPing)(message);
                ctx.response.status = 200;
                return (ctx.response.body = ping);
            }
            catch (error) {
                ctx.response.status = 400;
                return (ctx.response.body = error);
            }
        });
    }
}
const healthClass = new Healt();
exports.default = healthClass;
