import mongoose from 'mongoose';
import { type } from 'os';




 const AccountOwner = new mongoose.Schema({
   firstName:{
     type: String,
     required: true
   },
   lastName:{
     type: String,
     required: true
    },
  account: {
    type:String,
    required:true
  },
  email:{
    type: String,
    required: true
  },
  phoneNumber:{
    type:String,
    required:true},
  password:{
    type: String,
    required: true
  }
  ,
  createdAt:{
    type:String,
    required:true,
  }
})

const accountowners = mongoose.model('accountowners', AccountOwner);

export default accountowners;
