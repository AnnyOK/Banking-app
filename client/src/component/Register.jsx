import React,{useState} from 'react';
import classes from "./styles/Register.module.css"
import Axios from 'axios'
import Header from "./Header"

function Register(props) {
    const [type,setType]=useState('password')
    const [btntext,setBtntext]= useState('')
const[firstName,setFirstName]= useState('')
const[lastName,setLastName]= useState('')
const[email,setEmail]= useState('')
const [phone,setPhone]= useState()
const[password,setPassword]= useState('')
const[comfirmpw,setComfirmpw]= useState('')
const handleFirstNameChange=(e)=>{setFirstName(e.target.value)}
const handleLastNameChange=(e)=>{setLastName(e.target.value)}
const handleEmailChange=(e)=>{setEmail(e.target.value)}
const handlePhoneNoChange=(e)=>{setPhone(e.target.value)}
const handlePasswordChange=(e)=>{setPassword(e.target.value)}
const handleComfirmPwChange=(e)=>{setComfirmpw(e.target.value)}

const [err, setErr] = useState();

const togglePassword=()=>{
    if(type==="password"){
        setType("text")
        setBtntext("Hide password")
    }else if(type==="text"){
        setType("password")
        setBtntext("Show password")
    }
}

const validate = (e) => {
    if(password!=='' &&password !== comfirmpw){
        setErr("Password do not match")
    }else{
        setErr('')
        handleSubmit(e)
    }
}

const handleSubmit=async(e)=>{
    e.preventDefault();
    
    // const passwords=(password,comfirmpw)=>{
    //     if(password===comfirmpw) password
    // }
    const phoneNumber=phone
    const details={firstName,lastName,email,phoneNumber,password}
    console.log(details)
   const response= await Axios.post("http://localhost:5000/create-account",details)
    console.log(response.data)
}
    return (
        <div className={classes.maindiv}>
            <Header/>
            <form>
            <label htmlFor="fname">First Name:</label>
                <input type="text" id="fname" name="firstName" onChange={handleFirstNameChange}/>
                <label htmlFor="lname">Last Name:</label>
                <input type="text" id="lname" name="lastname" onChange={handleLastNameChange}/>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" onChange={handleEmailChange}/>
                <label htmlFor="phone">Phone number:</label>
                <input type="number" id="phoneno" name="phoneno" onChange={handlePhoneNoChange}/>
                <label htmlFor="password">Enter Password:</label>
                <input type={type} id="password" name="password" onChange={handlePasswordChange}/>
                <div className={classes.toggle}>
                <label htmlFor="comfirm-pw">Comfirm Password:</label>
                <p className={classes.p}>{err}</p>
                <input type={type} id="comfirm-pw" name="comfirm-pw" onChange={handleComfirmPwChange}/>
                <button onClick={togglePassword} className={classes.close}>{btntext}</button>
                </div>
                <button onClick={validate}>Submit</button>
            </form>
        </div>
    );
}

export default Register;