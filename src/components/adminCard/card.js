import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import "./cardStyle.css"
import { RiDeleteBin5Line } from 'react-icons/ri';
import {AiOutlineEdit} from "react-icons/ai"
import Loader from "react-loader-spinner";
import axios from "axios"
import {Modal} from "../modal/modal"
import { ShowMessage, type } from "../Toastr/ShowMessage";
import CreateArticle from "../Article/createArticle"


function Card({item}) {
    const navigate = useNavigate(); 
    const [isProcessing, setIsProcessing] = useState(false)
    const [state, setState] = useState(false)
    const truncated = item.content.slice(0, 50) + "..."

    const deleteArticle = async(id) => {
      setIsProcessing(true)
      await axios.delete(`http://localhost:3002/delete/${id}`).then((res) => {
        if(res){
          setIsProcessing(false)
          ShowMessage(type.DONE, res.data.message)
        }
    }).catch((err) => {
      setIsProcessing(false)
      ShowMessage(type.ERROR, err)
    })
    }

    const showModal = () => {
      setState(true);
    };
  
  const hideModal = () => {
      setState(false);
    };

    return (

        <div className="cardContainer">
        <img src={item.display_image} alt="Avatar" className="imageContainer" />
        <div className="textContainer">
          <h4 className="content-title">{item.title}</h4>
          <p className="text-content">{truncated}</p>
        </div>
        <hr className="lineBreak"/>
            <div className="card-button-view">
            <button className="buttonContainer" onClick={() => showModal()}><AiOutlineEdit size={40}/>Edit</button>
            <Modal show={state} handleClose={hideModal}>
                <CreateArticle item={item} pageTitle="Update Article"/>
            </Modal>
                
                <button className="buttonContainer" onClick={()=> deleteArticle(item._id)}>{isProcessing ? <Loader type="Circles" color="#00BFFF" height={35} width={35} /> : (<p><RiDeleteBin5Line size={30}/>Delete</p>) }</button>
            </div>
      </div> 
      
    )
}

export default Card
