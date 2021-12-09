import React, {useState,useEffect} from "react"
import './App.css';
import Header from "./components/Header/header"
import Carousel from "./components/Carousel/carousel"
import Card from "./components/Card/card"
import Footer from "./components/Footer/footer"
import {cardDetails} from "./Database/cardDetails"
import axios from "axios"

function App() {
const [Articles, setArticles] =useState([])

  useEffect(async() => {
    await axios.post("http://localhost:3002/articles", {data:"Its a get method"}).then((res) => {
      console.log(res, "articles")
      setArticles(res.data.articles)
  }).catch((err) => {
    console.log(err)
  })
  }, [])

  return (
    <div className="App">
      <div className="header-section">
         <Header />
      </div>

      <div className="carousel-section">
         <Carousel />
      </div>
    <div className="site-description">
      <h1 className="page-title">Amfi Network Limited</h1>
      <p data-aos="flip-left" className="commitment">Our Commitment is to rebuild Nigeria and Sub-Sahara Africa </p>
    </div>
      <div className="card-section">
        {
          Articles && Articles.map((item) => (
            <Card item = {item}/>
          ))
        }
      </div>
      
      <div className="footer-section">
        <Footer />
      </div>
    </div>
  );
}

export default App;
