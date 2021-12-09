import React from 'react'
import "./header.css"
import { useNavigate } from 'react-router-dom';


function Header() {
    const navigate = useNavigate(); 
    return (
        <div className="header-container">
            <div className="logo">
                <img src="amfi-logo.png" alt="amfi-log0" className="amfi-logo" />
            </div>
            <div className="menu">
                <ul>
                    <li  onClick={()=> navigate('/')}>HOME</li>
                    <li>NEWSLETTER</li>
                    <li>CONTACT US</li>
                </ul>
            </div>
        </div>
    )
}

export default Header
