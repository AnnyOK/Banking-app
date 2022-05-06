"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Account = new mongoose_1.default.Schema({
    account: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    createdAt: {
        type: String,
        required: true,
    }
});
const bankdatabase = mongoose_1.default.model('bankdatabase', Account);
exports.default = bankdatabase;
//# sourceMappingURL=Account.js.map