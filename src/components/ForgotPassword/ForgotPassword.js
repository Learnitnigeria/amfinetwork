import React from 'react'
import './ForgotPassword.css'
function ForgotPassword() {
    return (
        <div className='forgot-container'>
            <h2>Forgot Password</h2>
            <div className='forgot-input'>
                <label for="">Email Address</label>
                <input type="text" placeholder='Enter Your Email Address'/>
                <button>RESET</button>
            </div>
        </div>
    )
}

export default ForgotPassword
