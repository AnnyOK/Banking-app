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
exports.getTransaction = exports.getAllAcount = exports.getAccount = exports.transfer = exports.payto = exports.createNewUser = void 0;
//import { Account } from "../interface/types";
const async_1 = require("nanoid/async");
const Account_1 = __importDefault(require("../models/Account"));
const models_1 = __importDefault(require("../models/models"));
const AccountOwner_1 = __importDefault(require("../models/AccountOwner"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const nanoid = (0, async_1.customAlphabet)("1234567890", 10);
const reference = (0, async_1.customAlphabet)("1234567890abedefghijklmnopqrst", 30);
function createNewUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { firstName, lastName, email, password, phoneNumber } = req.body;
        let newuserAccoutNo = yield nanoid();
        const saltPassword = yield bcrypt_1.default.genSalt(10);
        const securePassword = yield bcrypt_1.default.hash(password, saltPassword);
        try {
            const newAccount = new AccountOwner_1.default({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                account: newuserAccoutNo.toString(),
                password: securePassword,
                createdAt: new Date().toISOString()
            });
            yield newAccount.save();
            let uniqueUser = new Account_1.default({
                account: newAccount.account,
                balance: 0,
                createdAt: newAccount.createdAt
            });
            yield uniqueUser.save();
            res.status(200).json(newAccount);
        }
        catch (err) {
            res.status(500).json({ msg: err });
        }
    });
}
exports.createNewUser = createNewUser;
function payto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { account, amount } = req.body;
        const userAccount = yield Account_1.default.find({ account: account });
        if (!userAccount) {
            res.status(404).json({ message: "user account does not exist" });
        }
        console.log(userAccount);
        const newbalance = yield Account_1.default.findOneAndUpdate({ account: account }, { balance: userAccount[0].balance + amount }, { new: true });
        res.status(200).json(newbalance);
    });
}
exports.payto = payto;
function transfer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { senderAccount, amount, receiverAccount } = req.body;
            const isSender = yield Account_1.default.find({ account: senderAccount });
            const isreceiver = yield Account_1.default.find({ account: receiverAccount });
            if (!isSender) {
                res.status(404).json({ message: "Sender Account does not exist" });
                return;
            }
            if (!isreceiver) {
                res.status(404).json({ message: "Receiver Account does not exist" });
                return;
            }
            //console.log(isSender)
            if (amount > isSender[0].balance) {
                res.status(404).json({ message: "Insufficient funds" });
                throw new Error(`Insufficient funds`);
            }
            // console.log(isSender)
            // console.log(isreceiver)
            const newBalanceSender = Number(isSender[0].balance) - amount;
            const newBalanceReceiver = Number(isreceiver[0].balance) + amount;
            //console.log(newBalanceSender, newBalanceReceiver)
            yield Account_1.default.findOneAndUpdate({ account: senderAccount }, { $set: { balance: newBalanceSender } }, { new: true });
            yield Account_1.default.findOneAndUpdate({ account: receiverAccount }, { $set: { balance: newBalanceReceiver } }, { new: true });
            const transactionInfo = {
                reference: yield reference(),
                senderAccount: senderAccount,
                amount: amount,
                receiverAccount: receiverAccount,
                transferDescription: `transfer of ${amount} from ${senderAccount} to ${receiverAccount} successfully completed`,
                createdAt: new Date().toISOString()
            };
            const transactionReport = new models_1.default(transactionInfo);
            transactionReport.save();
            res.status(200).json(transactionInfo);
        }
        catch (error) {
        }
    });
}
exports.transfer = transfer;
// let sindex =balanceDatabase.indexOf(Senderexists)
// let rindex= balanceDatabase.indexOf(receiver)
// balanceDatabase[sindex].balance-=amount
// balanceDatabase[rindex].balance+=amount
// TransactionDatabase.push(transactionInfo)
// fs.writeFile(transactionPath, JSON.stringify(TransactionDatabase, null, 2), (err) => {
//   res.status(201).json(transactionInfo)
// })
function getAccount(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const accountNo = req.params.account;
        const account = yield Account_1.default.find({ account: accountNo }).exec();
        // const Senderexists = balanceDatabase.find((balance: Account) => balance.account === id)
        if (!account) {
            res.status(404).json({ message: `${account} does not exist` });
        }
        else {
            res.status(200).json(account);
        }
    });
}
exports.getAccount = getAccount;
function getAllAcount(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield Account_1.default.find({}).exec();
        res.status(200).json(data);
    });
}
exports.getAllAcount = getAllAcount;
function getTransaction(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield models_1.default.find({}).limit(5).exec();
        res.status(200).json(data);
    });
}
exports.getTransaction = getTransaction;
//# sourceMappingURL=functions.js.map