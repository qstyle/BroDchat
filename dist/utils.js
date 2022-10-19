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
exports.updateUsersData = exports.disableUser = exports.getUsersData = exports.readFile = exports.updateFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function updateFile(filename, data) {
    return new Promise((resolve, reject) => {
        const _path = path_1.default.resolve(__dirname, '..', 'db', filename);
        fs_1.default.writeFile(_path, JSON.stringify({ data }), 'utf8', err => {
            if (err) {
                reject(err);
                return;
            }
            resolve(true);
        });
    });
}
exports.updateFile = updateFile;
function readFile(filename) {
    return new Promise((resolve, reject) => {
        fs_1.default.readFile(path_1.default.resolve(__dirname, '..', 'db', filename), 'utf8', (err, jsonString) => {
            if (err) {
                console.log('Error reading file from disk:', err);
                reject(false);
                return;
            }
            try {
                const dataObj = JSON.parse(jsonString);
                resolve(dataObj.data);
                return;
            }
            catch (err) {
                console.log('Error parse JSON string', err);
                reject(false);
                return;
            }
        });
    });
}
exports.readFile = readFile;
function getUsersData() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield readFile('users.json');
        return data;
    });
}
exports.getUsersData = getUsersData;
function disableUser(id, users) {
    return users.map(user => {
        return user.id === id
            ? Object.assign(Object.assign({}, user), { available: false }) : user;
    });
}
exports.disableUser = disableUser;
function updateUsersData(usersData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield updateFile('users.json', usersData);
            return true;
        }
        catch (err) {
            console.log('Error update users', err);
            return false;
        }
    });
}
exports.updateUsersData = updateUsersData;
//# sourceMappingURL=utils.js.map