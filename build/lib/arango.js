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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPing = void 0;
const { Database, aql } = require("arangojs");
const getConnection = () => {
    return new Database({
        url: process.env.ARANGO_ENPOINT,
        databaseName: process.env.ARANGO_DATABASE,
        auth: {
            username: process.env.ARANGO_USERNAME,
            password: process.env.ARANGO_PASSWORD,
        },
    });
};
const getCollection = (cName, db) => __awaiter(void 0, void 0, void 0, function* () {
    const collections = yield db.collections();
    if (collections.find((c) => c._name === cName)) {
        return yield db.collection(cName);
    }
    else {
        return db.createCollection(cName);
    }
});
const createPing = (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    const db = getConnection();
    let result = [];
    yield getCollection("ping", db);
    const resx = yield db.query(aql `
    INSERT { 
     "ping":${message}
    } in ping RETURN NEW
`);
    try {
        for (var _d = true, resx_1 = __asyncValues(resx), resx_1_1; resx_1_1 = yield resx_1.next(), _a = resx_1_1.done, !_a; _d = true) {
            _c = resx_1_1.value;
            _d = false;
            let config = _c;
            result.push(config);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = resx_1.return)) yield _b.call(resx_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result;
});
exports.createPing = createPing;
