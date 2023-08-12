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
const { Database, aql } = require("arangojs");
const getConnection = () => {
    return new Database({
        url: "http://127.0.0.1:8529",
        databaseName: "crud",
        auth: { username: "fanvercel", password: "giriland11" },
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
