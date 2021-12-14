import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./reset_password.css"
import axios from "axios"
import Loader from "react-loader-spinner";
import { ShowMessage, type } from "../Toastr/ShowMessage";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

function ResetPassword(props) {
    const navigate = useNavigate(); 
    const location = useLocation();
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")
    const [isProcessing, setIsProcessing] = React.useState(false)

    let {reset_token} = queryString.parse(location.search)
    console.log(reset_token, "dddd")

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handlePasswordConfirmChange = (e) => {
        setConfirmPassword(e.target.value)
    }

    const payload = {
        id: reset_token,
        password,
        password_confirmation: confirmPassword
    }

    const handleResetPassword = async () => {
        if (password === "" || confirmPassword === "") {
            ShowMessage(type.ERROR, "Please fill all required fields.")
            return;
        }
        setIsProcessing(true)
        await axios.post('/reset_password', payload).then((res) => {
            setIsProcessing(false)
            ShowMessage(type.DONE, res.data.message)
            navigate('/admin')
        }).catch((err) => {
            setIsProcessing(false)
            ShowMessage(type.ERROR, err)
        })
    }
    return (
        <div className="loginContainer">

            <div className="loginLogo">
                <img src="amfi-logo.png" alt="amfi-log0" className="amfi-login-logo" />
            </div>
            <h1 className="title">
                Reset Password
            </h1>

            <div className="form">
            <div className="inputContainer">
                <label className="label">New Password</label>
                <input className="input" placeholder="New password" type="email" value={password} onChange={(e) => handlePasswordChange(e)}/>
            </div>
            <div className="inputContainer">
                <label className="label">Confirm Password</label>
                <input className="input" placeholder="confirm password" type="password" value={confirmPassword} onChange={(e) => handlePasswordConfirmChange(e)}/>
            </div>

            <div className="loginButtonContainer">
                
                <button className="loginButton" onClick={()=> handleResetPassword()} >{isProcessing ? <Loader type="Circles" color="#00BFFF" height={35} width={35} /> : "SUBMIT"}</button>
            </div>
            
            </div>
        </div>
    )
}

export default ResetPassword