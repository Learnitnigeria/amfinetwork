import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./login.css"

function Login() {
    const navigate = useNavigate(); 
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
                <label className="label">Username</label>
                <input className="input" placeholder="username" type="email"/>
            </div>
            <div className="inputContainer">
                <label className="label">Password</label>
                <input className="input" placeholder="password" type="password"/>
            </div>

            <div className="loginButtonContainer">
                <button className="loginButton" onClick={()=> navigate('/adminDashboard')} >LOGIN</button>
            </div>
            </div>
        </div>
    )
}

export default Login