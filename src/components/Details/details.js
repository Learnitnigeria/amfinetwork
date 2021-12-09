import React from 'react'
import { useLocation } from 'react-router-dom';
import Header from "../Header/header"
import Footer from "../Footer/footer"
import "./details.css"

function Details(props) {
    const {state} = useLocation();
    const { item } = state; 
    console.log(item)
    return (
        <div>
           <div className="header-section">
                <Header />
            </div>
            <div className="details-section">
                <div className="image-container">
                    <img src={item.display_image} alt="Avatar" className="img" />
                </div>
                <div className="site-description">
                    <h1 className="page-title">Amfi Network Limited</h1>
                    <p data-aos="flip-left" className="commitment">Our Commitment is to rebuild Nigeria and Sub-Sahara Africa </p>
                </div>
                <div className="title-container">
                    <h1>
                    {item.title}
                    </h1>
                </div>
                <div className="text-container">
                    <p>
                        {item.content}
                    </p>
                </div>
                <div className="detail-images">
                    {
                        item.other_images.map(img => (
                            <div className="image-cont">
                        <img src={img.url} alt="Avatar" className="imagess" />
                      
                    </div>
                        ))
                    }
                    
                
                </div>
            </div>

            <div className="footer-section">
                <Footer />
            </div>
        </div>
    )
}

export default Details
