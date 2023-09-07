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
exports.setUsername = void 0;
const arango_1 = require("../lib/arango");
const error_1 = require("arangojs/error");
const setUsername = (p) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, arango_1.getConnection)();
    try {
        yield (0, arango_1.getCollection)("user", db);
        const resx = yield db.query({
            query: `LET user = DOCUMENT("user", @_key)
                FILTER user != null
                UPDATE user WITH {"username": @username,"lastUpdateBy": @lastUpdateBy} IN @@col RETURN {"username": @username,"lastUpdateBy": @lastUpdateBy}`,
            bindVars: {
                "@col": "user",
                _key: p._key,
                username: p.username,
                lastUpdateBy: p.lastUpdateBy || " ",
            },
        }, { stream: true });
        const result = yield resx.all();
        return result[0];
    }
    catch (error) {
        if (error instanceof error_1.ArangoError) {
            throw error.message;
        }
        throw error;
    }
    finally {
        db.close();
    }
});
exports.setUsername = setUsername;
