"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors = require('cors');
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.connect(`${process.env.MONGODB}`, () => { console.log('connecting to Mongo'); });
const router_1 = __importDefault(require("./router/router"));
const app = (0, express_1.default)();
app.use(cors());
//const server = new ApolloServer({typeDefs,resolvers,context})
// app.use(cors({origin:true}))
// app.options("*", cors())
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
app.use('/', router_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map