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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUsernameAndEmail = exports.findUserByKey = exports.findUsername = exports.compareHashPassword = exports.createHashPassword = void 0;
const arango_1 = require("../lib/arango");
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_1 = require("arangojs/error");
const createHashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hash = yield bcrypt_1.default.hash(password, Number(process.env.BCRYPT_SALT_COUNT));
        return hash;
    }
    catch (error) {
        throw error;
    }
});
exports.createHashPassword = createHashPassword;
const compareHashPassword = (pass, hash) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const compare = yield bcrypt_1.default.compare(pass, hash);
        return compare;
    }
    catch (error) {
        throw error;
    }
});
exports.compareHashPassword = compareHashPassword;
const registerUser = (p) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, arango_1.getConnection)();
    try {
        yield (0, arango_1.getCollection)("user", db);
        const resx = yield db.query({
            query: `INSERT { 
        "_key": @_key,
        "username": @username,
        "email": @email,
        "password": @password,
        "verified": @verified,
        "createdAt": DATE_NOW(),
        "createdBy": @username,
        "lastUpdateBy": @username,
        "lastUpdateTime": DATE_NOW(),
       } IN @@col RETURN NEW`,
            bindVars: {
                "@col": "user",
                _key: p._key,
                username: p.username,
                email: p.email,
                password: p.password,
                verified: false,
            },
        });
        const result = yield resx.all();
        return result;
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
const findUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, arango_1.getConnection)();
    try {
        yield (0, arango_1.getCollection)("user", db);
        const resx = yield db.query((0, arango_1.aql) `
     FOR u IN user
      FILTER u.username == ${username}
     RETURN u
   `);
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
exports.findUsername = findUsername;
const findUserByKey = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, arango_1.getConnection)();
    try {
        yield (0, arango_1.getCollection)("user", db);
        const resx = yield db.query((0, arango_1.aql) `
     FOR u IN user
      FILTER u._key == ${key}
     RETURN {
      _key: u._key,
      _id: u._id,
      _rev: u._rev,
      username: u.username,
      email: u.email,
      verified: u.verified,
      createdAt: u.createdAt,
      createdBy: u.createdBy,
      lastUpdateBy: u.lastUpdateBy,
      lastUpdateTime: u.lastUpdateTime
     }
   `);
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
exports.findUserByKey = findUserByKey;
const findUsernameAndEmail = (username, email) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, arango_1.getConnection)();
    try {
        yield (0, arango_1.getCollection)("user", db);
        const resx = yield db.query((0, arango_1.aql) `
    FOR u IN user
     FILTER u.username == ${username} OR u.email == ${email}
    RETURN u
   `);
        const result = yield resx.all();
        return result;
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
exports.findUsernameAndEmail = findUsernameAndEmail;
exports.default = registerUser;
