import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./card.css"

function Card({item}) {
    const navigate = useNavigate(); 
    const truncated = item.content.slice(0, 100) + "..."
    return (

        <div className="card">
        <img src={item.display_image} alt="Avatar" className="image" />
        <div className="container222">
          <h4 className="content-title">{item.title}</h4>
          <p className="text-content">{truncated}</p>
        </div>
        <hr className="line"/>
            <div className="card-button">
                <button className="button" onClick={()=> navigate('/details', { state: { item: item} })}>Read More</button>
            </div>
      </div> 
      
    )
}

export default Card
