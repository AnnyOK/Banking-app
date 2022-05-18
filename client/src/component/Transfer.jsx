import React,{useState} from 'react';
import Axios from 'axios';
import Header from "./Header"
//import {useNavigate} from "react-router-dom"
import classes from './styles/transfer.module.css'

function Transfer(props) {
    const [sender,setSender]=useState('')
    const [amount,setAmount]=useState('')
    const [receiver,setReceiver]=useState('')
    const [response,setResponse]=useState({
        reference: "",
    senderAccount: "",
    amount: null,
    receiverAccount: "",
    transferDescription: "",
    createdAt: ""
}) 
console.log(typeof +amount)
const handleSenderChange=(e)=>setSender(e.target.value)
const handleAmountChange =(e)=>setAmount(e.target.value)
const handleReceiverChange=(e)=>setReceiver(e.target.value)
const handleSubmit= async (e)=> {
    e.preventDefault()
    const transferdetails={senderAccount:sender,amount:+amount,receiverAccount:receiver}
    console.log(transferdetails)
   const response = await Axios.post("http://localhost:5000/transfer",transferdetails)
//    .then((err,response) =>{
//        if(err) return "response"
//        else{
//            setResponse(response.data)
//        }
//    })
    // .then(response=>{
    //     localStorage.setItem(response.data)
    //     console.log(response.data)})
console.log(response.data)
    // localStorage.setItem(response.data)
    setResponse(response.data)
}

      return (
        <div className={classes.transferdiv}>
            <Header/>
            <hr/><br/><br/>
            <form action="">
                <label htmlFor="sender">Sender Account:</label>
                <input type="text" id="sender" name="sender" onChange={handleSenderChange}/>
                <label htmlFor="amount">Amount:</label>
                <input type="number" id="amount" name="sender" onChange={handleAmountChange}/>
                <label htmlFor="receiver">Receiver Account:</label>
                <input type="text" id="receiver" name="sender" onChange={handleReceiverChange}/>
                 
                <button type="submit" onClick={handleSubmit}>Send</button>
                 
             </form>
            <div className={classes.detail}>
                <p className={classes.p}>{response.reference}</p>
                <p className={classes.p}>{response.senderAccount}</p> 
                <p className={classes.p}> {response.amount}</p>
                <p className={classes.p}> {response.receiverAccount}</p>
                <p className={classes.p}>{response.transferDescription}</p>
                <p className={classes.p}>{response.createdAt}</p>
            </div>
            
        </div>
    );
}

export default Transfer;