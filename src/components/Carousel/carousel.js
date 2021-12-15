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
        title:"REAL ESTATE DEVELOPMENT, REGENERATION &amp; CONSTRUCTION",
        description: "Our Construction and  Regeneration Models using 85% Local Contents to provide modern and comfortable living",
       
    },
    {
        image: slide2,
        title:"OUR AGRIBUSINESS VALUE CHAIN AND INTEGRATED FARMING MODEL",
        description: "Food Insecurity in Africa and Nigeria"
    },
    {
        image: slide3,
         title:"ECONOMIC SUMMITS, CONFERENCES, WORKSHOPS AND TRAINING STRATEGY",
        description: "“whilst Business cannot solve poverty, poverty will not be solved without Businesses”"
    },
    {
        image: slide4,
         title:"OUR RENEWABLE ENERGY STRATEGY",
        description: "Amfi Network Limited in collaboration with its Technical and Financial Partners, ROLT INTERNATIONAL initiate and create partnerships in the electricity, development, training and commodity sectors in Africa."
       
    },
    {
        image: slide5,
         title:"OIL AND GAS SECTOR",
        description: "As a company we are simple but extremely ambitious. We are ambitiously looking at joining the ranks of indigenous independent Upstream and Downstream production oil companies in Nigeria and Africa with a vision to power Africa’s emerging and growing oil and gas sector. "
       
    },
    {
        image: slide6,
        title:"OUR CORPORATE, MICRO FINANCE AND MANAGEMENT STRATEGY",
        description: "AMFI NETWORK Limited is a firm specialising in Corporate, Project and Trade financing at all levels from $500,000 to over $500million through her Technical Finance Partners. "
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
                            
                            <p className="legend">
                            <h2>{item.title}</h2>
                                {item.description}
                            </p>
                        </div>
                    ))
                }
               
            </Carousel>
        );
};

export default MyCarousel