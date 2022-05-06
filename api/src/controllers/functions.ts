import { Request, Response } from "express";
import path from "path";
import fs from "fs"
import {promises as fss} from "fs"
//import { Account } from "../interface/types";
import { customAlphabet } from 'nanoid/async';
import {Account} from "../interface/types"
import { RegisterAccount,Accountschema,validate} from "../interface/types"
import bankdatabase from "../models/Account"
import Transaction from "../models/models"
import accountowners from "../models/AccountOwner"
import bcrypt from "bcrypt"


const nanoid = customAlphabet("1234567890", 10)
const reference = customAlphabet("1234567890abedefghijklmnopqrst", 30)


export async function createNewUser(req: Request, res: Response){
  const{firstName, lastName, email, password,phoneNumber}= req.body
  let newuserAccoutNo=await nanoid();
  const saltPassword =await bcrypt.genSalt(10)
const securePassword =await bcrypt.hash(password,saltPassword)

  try{
    const newAccount =new accountowners({
      firstName:firstName,
      lastName:lastName,
      email:email,
      phoneNumber:phoneNumber,
      account:newuserAccoutNo.toString(),
      password:securePassword,
      createdAt:new Date().toISOString()
    })

    await newAccount.save()
         let uniqueUser = new bankdatabase({
           account: newAccount.account,
           balance:0,
           createdAt:newAccount.createdAt
           })
           await uniqueUser.save()

res.status(200).json(newAccount)

  }catch(err){
    res.status(500).json({ msg: err})
  }
}

export async function payto(req: Request, res: Response){
  const {account,amount} = req.body

  const userAccount= await bankdatabase.find({account:account})
  if(!userAccount){
    res.status(404).json({message:"user account does not exist"})
  }
  console.log(userAccount)
  const newbalance=await bankdatabase.findOneAndUpdate({account:account},{balance: userAccount[0].balance+amount},{new:true})
  res.status(200).json(newbalance)
}

export async function transfer(req: Request,res: Response){
try {
  const {senderAccount, amount, receiverAccount} = req.body
 const isSender= await bankdatabase.find({account:senderAccount})
 const isreceiver= await bankdatabase.find({account:receiverAccount})



    if (!isSender){
      res.status(404).json({message: "Sender Account does not exist"})
      return
    }
    if (!isreceiver){
      res.status(404).json({message: "Receiver Account does not exist"})
      return
    }
    //console.log(isSender)
    if(amount > isSender[0].balance){
      res.status(404).json({message: "Insufficient funds"})
      throw new Error(`Insufficient funds`)
    }
    // console.log(isSender)
    // console.log(isreceiver)
    const newBalanceSender = Number(isSender[0].balance) - amount;
    const newBalanceReceiver = Number(isreceiver[0].balance) + amount
    //console.log(newBalanceSender, newBalanceReceiver)
    await bankdatabase.findOneAndUpdate({account:senderAccount},{ $set:{balance: newBalanceSender}}, {new: true})
    await bankdatabase.findOneAndUpdate({account:receiverAccount},{$set:{balance:newBalanceReceiver}}, {new: true})
    const transactionInfo= {
      reference: await reference(),
      senderAccount: senderAccount,
      amount: amount,
      receiverAccount: receiverAccount,
      transferDescription :`transfer of ${amount} from ${senderAccount} to ${receiverAccount} successfully completed`,
      createdAt: new Date().toISOString()
      }
const transactionReport= new Transaction(transactionInfo)
      transactionReport.save()
      res.status(200).json(transactionInfo)
} catch (error) {

}
  }
    // let sindex =balanceDatabase.indexOf(Senderexists)
    // let rindex= balanceDatabase.indexOf(receiver)
    // balanceDatabase[sindex].balance-=amount
    // balanceDatabase[rindex].balance+=amount
    // TransactionDatabase.push(transactionInfo)
    // fs.writeFile(transactionPath, JSON.stringify(TransactionDatabase, null, 2), (err) => {
    //   res.status(201).json(transactionInfo)
    // })

export async function getAccount(req: Request, res:Response) {
  const accountNo = req.params.account;
  const account = await bankdatabase.find({account: accountNo}).exec()

 // const Senderexists = balanceDatabase.find((balance: Account) => balance.account === id)
if(!account){
  res.status(404).json({message: `${account} does not exist`})
}else{
  res.status(200).json(account)
}

}
export async function getAllAcount(req: Request, res: Response){
  const data =await bankdatabase.find({}).exec()
  res.status(200).json(data)
}
export async function getTransaction(req: Request, res: Response){
  const data= await Transaction.find({}).limit(5).exec()
res.status(200).json(data)
}
