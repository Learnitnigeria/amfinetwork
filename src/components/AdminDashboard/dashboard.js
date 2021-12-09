import React, {useState, useEffect} from 'react'
import {cardDetails} from "../../Database/cardDetails"
import Card from "../adminCard/card"
import {Modal} from "../modal/modal"
import CreateArticle from "../Article/createArticle"
import "./dashboard.css"
import axios from "axios"

function Dashboard() {
    const [state, setState] = useState(false)
    const [Articles, setArticles] =useState([])

  useEffect(async() => {
    await axios.post("http://localhost:3002/articles", {data:"Its a get method"}).then((res) => {
      setArticles(res.data.articles)
  }).catch((err) => {
    console.log(err)
  })
  }, [])

    const showModal = () => {
        setState(true);
      };
    
    const hideModal = () => {
        setState(false);
      };
    
    return (
        <div className="container">
            <h1>Admin dashboard</h1>
            <button className="create-button" type="button" onClick={() => showModal()}>
                Create Content
            </button>
            <Modal show={state} handleClose={hideModal}>
                <CreateArticle pageTitle="Create Article"/>
            </Modal>
           
            <div className="card-section">
        {
          Articles && Articles.map((item) => (
            <Card item = {item}/>
          ))
        }
      </div>
        </div>
    )
}

export default Dashboard
