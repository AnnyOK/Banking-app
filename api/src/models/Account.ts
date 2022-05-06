import mongoose from 'mongoose';
import { type } from 'os';




 const Account = new mongoose.Schema({
   account: {
     type:String,
     required:true
   },
  balance: {
    type:Number,
    required:true
  },
  createdAt:{
    type:String,
    required:true,
  }
})

const bankdatabase = mongoose.model('bankdatabase', Account);

export default bankdatabase;
