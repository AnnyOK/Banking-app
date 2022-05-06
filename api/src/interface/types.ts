import { AnyZodObject, z } from 'zod';
import express, { Request, Response, NextFunction } from 'express';
interface Account {
  account: string;
  balance: number;
  createdAt: string;
}

const Accountschema = z.object({
  body: z.object({
    senderAccount: z
      .string({
        required_error: 'sender account is required',
      })
      .length(10),

    receiverAccount: z
      .string({
        required_error: 'sender account is required',
      })
      .length(10),
    amount: z.number({
      required_error: 'amount  is required',
    }),
  }),
});
const pay=z.object({
  body:z.object({
    account:z.string({
      required_error: 'account is required'
    }),
    amount:z.number({
      required_error: 'amount is required'
    })

  })
})
const RegisterAccount = z.object({
  body: z.object({
    firstName: z.string({
      required_error: 'firstName is required',
    }),
    lastName: z.string({
      required_error: 'lastName is required',
    }),
    // account: z
    //   .string({
    //     required_error: 'account is required',
    //   })
      //.length(10),
    email: z.string({
      required_error: 'email is required',
    }),
    phoneNumber: z.string({
      required_error: 'phoneNumber is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
});

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };
export { Account, Accountschema, RegisterAccount,pay, validate };
