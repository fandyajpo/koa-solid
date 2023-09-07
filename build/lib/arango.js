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
exports.createPing = exports.aql = exports.getConnection = exports.getCollection = void 0;
const arangojs_1 = require("arangojs");
Object.defineProperty(exports, "aql", { enumerable: true, get: function () { return arangojs_1.aql; } });
const getConnection = () => {
    return new arangojs_1.Database({
        url: process.env.ARANGO_ENPOINT,
        databaseName: process.env.ARANGO_DATABASE,
        auth: {
            username: process.env.ARANGO_USERNAME,
            password: process.env.ARANGO_PASSWORD,
        },
    });
};
exports.getConnection = getConnection;
const getCollection = (cName, db) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collections = yield db.collections();
        if (collections.find((c) => c._name === cName)) {
            return db.collection(cName);
        }
        return db.createCollection(cName);
    }
    catch (error) {
        throw error;
    }
});
exports.getCollection = getCollection;
const createPing = (message) => __awaiter(void 0, void 0, void 0, function* () {
    const db = getConnection();
    try {
        yield getCollection("ping", db);
        const resx = yield db.query({
            query: 'INSERT { "ping": @message } in ping RETURN NEW',
            bindVars: { message },
        });
        const result = yield resx.all();
        return result;
    }
    catch (error) {
        throw error;
    }
    finally {
        db.close();
    }
});
exports.createPing = createPing;
