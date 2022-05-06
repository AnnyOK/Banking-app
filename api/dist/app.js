"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//'mongodb+srv://Anayo:anayo@vr2.jgum6.mongodb.net/bankdatabase?retryWrites=true&w=majority'
mongoose_1.default.connect(`${process.env.MONGODB}`, () => { console.log('connecting to Mongo'); });
const router_1 = __importDefault(require("./router/router"));
// // const balancePath = path.join(__dirname, '..', 'data/balance.json')
// // const transactionsPath = path.join(__dirname, '..', 'data/transaction.json')
//  fs.readFile(balancePath).catch((err: HttpError)=>{
//   if (err.code === 'ENOENT'){
//      fs.writeFile(balancePath, JSON.stringify([]))
//   }
// })
//  fs.readFile(transactionsPath).catch( (err: HttpError)=>{
//   if (err.code === 'ENOENT'){
//      fs.writeFile(transactionsPath, JSON.stringify([]))
//   }
// })
const app = (0, express_1.default)();
// view engine setup
app.set('views', path_1.default.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
// console.log(router)
app.use('/', router_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map