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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.pay = exports.RegisterAccount = exports.Accountschema = void 0;
const zod_1 = require("zod");
const Accountschema = zod_1.z.object({
    body: zod_1.z.object({
        senderAccount: zod_1.z
            .string({
            required_error: 'sender account is required',
        })
            .length(10),
        receiverAccount: zod_1.z
            .string({
            required_error: 'sender account is required',
        })
            .length(10),
        amount: zod_1.z.number({
            required_error: 'amount  is required',
        }),
    }),
});
exports.Accountschema = Accountschema;
const pay = zod_1.z.object({
    body: zod_1.z.object({
        account: zod_1.z.string({
            required_error: 'account is required'
        }),
        amount: zod_1.z.number({
            required_error: 'amount is required'
        })
    })
});
exports.pay = pay;
const RegisterAccount = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string({
            required_error: 'firstName is required',
        }),
        lastName: zod_1.z.string({
            required_error: 'lastName is required',
        }),
        // account: z
        //   .string({
        //     required_error: 'account is required',
        //   })
        //.length(10),
        email: zod_1.z.string({
            required_error: 'email is required',
        }),
        phoneNumber: zod_1.z.string({
            required_error: 'phoneNumber is required',
        }),
        password: zod_1.z.string({
            required_error: 'password is required',
        }),
    }),
});
exports.RegisterAccount = RegisterAccount;
const validate = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.validate = validate;
//# sourceMappingURL=types.js.map