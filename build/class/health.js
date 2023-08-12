"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Healt {
    Health(ctx) {
        return (ctx.body = "KOA");
    }
}
const healthClass = new Healt();
exports.default = healthClass;
