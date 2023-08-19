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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHashPassword = exports.createHashPassword = exports.findUsernameAndEmail = exports.findUsername = void 0;
const arango_1 = require("../lib/arango");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const createHashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hash = yield bcrypt_1.default.hash(password, Number(process.env.BCRYPT_SALT_COUNT));
        return String(hash);
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
const createAuth = () => {
    try {
        //create auth
        //save for 7day and 1day
    }
    catch (error) {
        //return an error
    }
};
const fetchAuth = () => {
    try {
        //get user uuid
        //exist or nah
    }
    catch (error) {
        //return an error
    }
};
const verifyToken = () => {
    try {
        //verify the access token
    }
    catch (error) { }
};
const registerUser = (p) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    try {
        const db = (0, arango_1.getConnection)();
        let result = [];
        yield (0, arango_1.getCollection)("username", db);
        const resx = yield db.query((0, arango_1.aql) `
    INSERT { 
     "_key": ${(0, uuid_1.v4)()},
     "username": ${p.username},
     "email": ${p.email},
     "password": ${p.password},
    } in user RETURN NEW
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
    }
    catch (error) {
        throw error;
    }
});
const findUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, e_2, _f, _g;
    try {
        const db = (0, arango_1.getConnection)();
        let result = [];
        yield (0, arango_1.getCollection)("user", db);
        const resx = yield db.query((0, arango_1.aql) `
     FOR u IN user
      FILTER u.username == ${username}
     RETURN u
   `);
        try {
            for (var _h = true, resx_2 = __asyncValues(resx), resx_2_1; resx_2_1 = yield resx_2.next(), _e = resx_2_1.done, !_e; _h = true) {
                _g = resx_2_1.value;
                _h = false;
                let config = _g;
                result.push(config);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (!_h && !_e && (_f = resx_2.return)) yield _f.call(resx_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return result[0];
    }
    catch (error) {
        throw error;
    }
});
exports.findUsername = findUsername;
const findUsernameAndEmail = (username, email) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, e_3, _k, _l;
    try {
        const db = (0, arango_1.getConnection)();
        let result = [];
        yield (0, arango_1.getCollection)("user", db);
        const resx = yield db.query((0, arango_1.aql) `
    FOR u IN user
     FILTER u.username == ${username}
    RETURN u
   `);
        try {
            for (var _m = true, resx_3 = __asyncValues(resx), resx_3_1; resx_3_1 = yield resx_3.next(), _j = resx_3_1.done, !_j; _m = true) {
                _l = resx_3_1.value;
                _m = false;
                let config = _l;
                result.push(config);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (!_m && !_j && (_k = resx_3.return)) yield _k.call(resx_3);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.findUsernameAndEmail = findUsernameAndEmail;
exports.default = registerUser;
