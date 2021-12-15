import React,{useState} from 'react'
import "./header.css"
import { useNavigate } from 'react-router-dom';
import { FaAlignRight } from "react-icons/fa";
import { Link} from "react-router-dom";

function Header() {
    const[toggle, setToggle] = useState(false)
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
                    <li onClick={()=> navigate('/Contact')}>CONTACT US</li>
                 
                </ul>
            </div>
            <FaAlignRight onClick={()=>setToggle(!toggle)} className="humbuger-menu"/>
            {toggle?<div class="humbuger-menu-container">
                <ul className="mobile-nav">
                    <li  onClick={()=> navigate('/')}>HOME</li>
                    <li>NEWSLETTER</li>
                    <Link  to="/Contact">CONTACT US</Link>
                </ul>
            </div>:''}
            
        </div>
    )
}

export default Header
