"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const functions_1 = require("../controllers/functions");
const types_1 = require("../interface/types");
const router = express_1.default.Router();
router.post('/transfer', (0, types_1.validate)(types_1.Accountschema), functions_1.transfer);
router.post('/create-account', (0, types_1.validate)(types_1.RegisterAccount), functions_1.createNewUser);
router.post('/pay-in', (0, types_1.validate)(types_1.pay), functions_1.payto);
router.get('/', functions_1.getTransaction);
router.get('/balance', functions_1.getAllAcount);
router.get('/balance/:account', functions_1.getAccount);
exports.default = router;
//# sourceMappingURL=router.js.map