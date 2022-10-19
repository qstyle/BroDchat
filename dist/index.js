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
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const path_1 = __importDefault(require("path"));
const constants_1 = require("./constants");
const utils_1 = require("./utils");
const app = (0, express_1.default)();
const port = 3030;
app.use('/static', express_1.default.static(path_1.default.resolve(__dirname, 'public')));
app.get('/users', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, utils_1.getUsersData)();
    res.send(JSON.stringify(users));
}));
const server = app.listen(port, () => {
    console.log('server up and running on port ' + port);
});
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    socket.on(constants_1.Events.ChooseUserFromClient, ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
        socket.broadcast.emit(constants_1.Events.ChooseUserFromServer, { id });
        const users = yield (0, utils_1.getUsersData)();
        const changedUsers = (0, utils_1.disableUser)(id, users);
        yield (0, utils_1.updateUsersData)(changedUsers);
    }));
});
//# sourceMappingURL=index.js.map