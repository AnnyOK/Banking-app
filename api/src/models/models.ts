const mongoose = require('mongoose');

const transactions = new mongoose.Schema({


    reference:{
      type: String,
      required:true
    },
      senderAccount:{
        type: Number,
        required:true
      },
      amount: {
        type:Number,
        required:true
      },
      receiverAccount:{
        type: Number,
        required:true
      },
      transferDescription :{
        type: String,
        required:true
      },
      createdAt:{
        type: Date,
        default:Date.now()
      }

})
const Transaction= mongoose.model('Transaction',transactions)

export default Transaction
