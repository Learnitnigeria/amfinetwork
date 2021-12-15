import React from 'react'
import "./footer.css"
import { FaFacebookSquare,FaTwitterSquare,FaYoutubeSquare } from "react-icons/fa";
function Footer() {
    return (
        <div className = "footer-container">
            <p>&copy; Copywright 2021 Amfi</p>
            <div className='social-links'>
                <FaFacebookSquare className='icon'/>
                <FaTwitterSquare className='icon'/>
                <FaYoutubeSquare className='icon'/>
            </div>
        </div>
    )
}

export default Footer
