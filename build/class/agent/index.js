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
class CAgentControll {
    CreateAgent(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return ctx;
        });
    }
    DeleteAgent(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return ctx;
        });
    }
    GetAgent(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return ctx;
        });
    }
    SearchAgent(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return ctx;
        });
    }
    UpdateAgent(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return ctx;
        });
    }
}
const VAgentControll = new CAgentControll();
exports.default = VAgentControll;
