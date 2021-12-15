import React from 'react'
import Header from '../Header/header'
import Footer from '../Footer/footer'
import './Contact.css'
import { FaEnvelope,FaPhoneAlt,FaMapMarkerAlt } from "react-icons/fa";
function Contact() {
    return (
        <>
        <div className='header-section'>
        <Header/>
        </div>
        <div class="contact-container">
            <h2>Contact Us </h2>
        </div>

  <div class="container">
    <div class="content">
      <div class="left-side">
        <div class="address details">
          <FaMapMarkerAlt />
          <div class="topic">Address</div>
          <div class="text-one">Block E, Flat 1, Sky Memorial Complex,
            Herbert Macauley Way, Wuse Zone 5, FCT- Abuja, Nigeria.</div>
        
        </div>
        <div class="phone details">
          <FaPhoneAlt/>
          <div class="topic">Phone</div>
          <div class="text-one">+234 80 6576 6583</div>
          <div class="text-two">+234 81 8614 2941</div>
        </div>
        <div class="email details">
          <FaEnvelope/>
          <div class="topic">Email</div>
          <div class="text-one">info@amfinetwork.com</div>
        </div>
      </div>
      <div class="right-side">
        <div class="topic-text">Send us a message</div>
        <p>If you have any question or inquiry you can send us a message from here</p>
      <form action="#">
        <div class="input-box">
          <input type="text" placeholder="Enter your name"/>
        </div>
        <div class="input-box">
          <input type="text" placeholder="Enter your email"/>
        </div>
        <div class="input-box message-box">
            <textarea placeholder='Enter Your Message here' name="" id="" cols="30" rows="10"></textarea>
        </div>
        <div class="button-contact">
          <input type="button" value="Send Now" />
        </div>
      </form>
    </div>
    </div>
  </div>
  <div className="footer-section">
        <Footer />
</div>
        </>
    )
}

export default Contact
