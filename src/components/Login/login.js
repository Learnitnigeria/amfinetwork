import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./login.css"
import axios from "axios"
import Loader from "react-loader-spinner";
import { ShowMessage, type } from "../Toastr/ShowMessage";

function Login() {
    const navigate = useNavigate(); 
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [isProcessing, setIsProcessing] = React.useState(false)

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const payload = {
        email,
        password
    }

    const handleLogin = async () => {
        if (email === "" || password === "") {
            ShowMessage(type.ERROR, "Please fill all required fields.")
            return;
        }
        setIsProcessing(true)
        await axios.post('/login', payload).then((res) => {
            setIsProcessing(false)
            localStorage.setItem("token", res.data.data.token)
            ShowMessage(type.DONE, res.data.message)
            navigate('/adminDashboard')
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
                Admin Panel
            </h1>

            <div className="form">
            <div className="inputContainer">
                <label className="label">Email</label>
                <input className="input" placeholder="email" type="email" value={email} onChange={(e) => handleEmailChange(e)}/>
            </div>
            <div className="inputContainer">
                <label className="label">Password</label>
                <input className="input" placeholder="password" type="password" value={password} onChange={(e) => handlePasswordChange(e)}/>
            </div>

            <div className="loginButtonContainer">
                
                <button className="loginButton" onClick={()=> handleLogin()} >{isProcessing ? <Loader type="Circles" color="#00BFFF" height={35} width={35} /> : "LOGIN"}</button>
            </div>
            <div>
                <p className='forgotPassword-link' onClick={()=> navigate('/ForgotPassword')}>Reset Password</p>
            </div>
            </div>
        </div>
    )
}

export default Login