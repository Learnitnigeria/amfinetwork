import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./carousel.css"
import slide1 from "../../assets/slide2.png";
import slide2 from  "../../assets/slide3.png";
import slide3 from  "../../assets/slide6.png";
import slide4 from  "../../assets/slide1.png";
import slide5 from  "../../assets/slide5.png";
import slide6 from  "../../assets/slide4.png";


const images = [
    {
        image: slide1,
        description: "This is image one"
    },
    {
        image: slide2,
        description: "This is image two"
    },
    {
        image: slide3,
        description: "This is image three"
    },
    {
        image: slide4,
        description: "This is image four"
    },
    {
        image: slide5,
        description: "This is image five"
    },
    {
        image: slide6,
        description: "This is image six"
    },
]

function MyCarousel (){
        return (
            <Carousel
            autoPlay={true} 
            infiniteLoop={true}
            interval={3000}
            showStatus={false}
            showThumbs={false}
            stopOnHover={false}
            >
                {
                    images.map((item) => (
                        <div className="carousel-container">
                            <img src={item.image} className="image-tag"/>
                            <p className="legend">{item.description}</p>
                        </div>
                    ))
                }
               
            </Carousel>
        );
};

export default MyCarousel