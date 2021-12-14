import React from 'react'
import './ForgotPassword.css'
import axios from "axios"
import Loader from "react-loader-spinner";
import { ShowMessage, type } from "../Toastr/ShowMessage";

function ForgotPassword() {
    const [email, setEmail] = React.useState("")
    const [isProcessing, setIsProcessing] = React.useState(false)

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    const payload = {
        email
    }

    const sendMessage = async() => {
        if (email === "" ) {
            ShowMessage(type.ERROR, "Please provide your email address.")
            return;
        }
        setIsProcessing(true)
        await axios.post('/forgot_password', payload).then((res) => {
            setIsProcessing(false)
            ShowMessage(type.DONE, res.data.message)
        }).catch((err) => {
            setIsProcessing(false)
            ShowMessage(type.ERROR, err)
        })
    }
    return (
        <div className='forgot-container'>
            <h2>Forgot Password</h2>
            <div className='forgot-input'>
                <label for="">Email Address</label>
                <input type="text" placeholder='Enter Your Email Address'value={email} onChange={(e) => handleChange(e)}/>
                <button onClick={() => sendMessage()}>{isProcessing ? <Loader type="Circles" color="#00BFFF" height={35} width={35} /> : "RESET"}</button>
            </div>
        </div>
    )
}

export default ForgotPassword
