import React, { useState, useEffect } from 'react'
import "./createArticle.css"
import Loader from "react-loader-spinner";
import axios from "axios"
import FormData from 'form-data';
import { ShowMessage, type } from "../Toastr/ShowMessage";

function CreateArticle({item, pageTitle}) {
    const [displayImage, setDisplayImage] = React.useState(null)
    const [files, setFiles] = React.useState([])
    const [content, setContent] = React.useState("")
    const [title, setTitle] = React.useState("")
    const [isProcessing, setIsProcessing] = useState(false)
    const [isProcessingSingle, setIsProcessingSingle] = useState(false)
    const [isProcessingMultiple, setIsProcessingMultiple] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [validMultipleUrl, setValidMultipleUrl] = useState([])
    const [validSingleUrl, setValidSingleUrl] = useState(null)
    const [token, setToken] = useState("")

    useEffect(() => {
        const tok = localStorage.getItem("token")
        setToken(tok)
        if(item === undefined || item === null){
            setContent("") 
            setTitle("")
        }else{
            setContent(item.content)
            setTitle(item.title)
            setValidMultipleUrl(item.other_images)
            setValidSingleUrl(item.display_image)
        }
        
    }, [])

    const displayImageHandler = async (e) => {

        if (e.target.files[0]) {

            const data = new FormData()
            data.append('file', e.target.files[0])

            setIsProcessingSingle(true)
            await axios.post('/single_upload', data, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then((res) => {
                setValidSingleUrl(res.data.result.url)
                setIsProcessingSingle(false)
                ShowMessage(type.DONE, res.data.message)
            }).catch((err) => {
                setIsProcessingSingle(false)
                ShowMessage(type.ERROR, err)
            })
        }

    }

    const contentHandler = (e) => {
        setContent(e.target.value)
    }

    const titleHandler = (e) => {
        setTitle(e.target.value)
    }

    const fileSelectedHandler = async (e) => {
        console.log(e.target.files, "from react")
        const files = e.target.files
        if (files) {

            const data = new FormData()

            for (let i = 0; i < files.length; i++) {
                data.append('files', files[i])
            }

            setIsProcessingMultiple(true)
            await axios.post('/multiple_upload', data, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then((res) => {
                setValidMultipleUrl(res.data.data)
                setIsProcessingMultiple(false)
                ShowMessage(type.DONE, res.data.message)
            }).catch((err) => {
                setIsProcessingMultiple(false)
                ShowMessage(type.ERROR, err)
            })
        }
    }

    const payload = {
        title,
        display_image: validSingleUrl,
        other_images: validMultipleUrl,
        content
    }

    const handleUpdate= async () => {
        const id = item ? item._id : null
        setIsUpdating(true)
        await axios.put(`/edit/${id}`, payload, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setIsUpdating(false)
            ShowMessage(type.DONE, res.data.message)
        }).catch((err) => {
            setIsUpdating(false)
            ShowMessage(type.ERROR, err)
        })
    }

    const handleSubmit = async () => {
        if (content === "" || title === "") {
            ShowMessage(type.ERROR, "Please fill all required fields.")
            return;
        }
        setIsProcessing(true)
        await axios.post('/publish', payload, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setIsProcessing(false)
            ShowMessage(type.DONE, res.data.message)
        }).catch((err) => {
            setIsProcessing(false)
            ShowMessage(type.ERROR, err)
        })
    }
    return (
        <div className="articleContainer">
            <h2>{pageTitle}</h2>
            <div className="titleContainer">
                <label className="contentLabel">Title</label>
                <input className="contentTitle" value={title} onChange={(e) => titleHandler(e)} />
            </div>
            <div className="titleContainer">
                <label className="contentLabel">Upload display image</label>
                <input type="file" id="file" name="file" style={{ display: "none" }} className="contentTitle" onChange={(e) => displayImageHandler(e)} />
                <label className="contentTitle" for="file">{isProcessingSingle ? <Loader type="Circles" color="#00BFFF" height={35} width={35} /> : "Select file"}</label>

            </div>
            <div className="image_preview">
            {
                   item ? <img src={item.display_image} className="uploaded_images" />  : validSingleUrl ? <img src={validSingleUrl} className="uploaded_images" /> : ""
                
                }
               
            </div>
            <div className="titleContainer">
                <label className="contentLabel">Upload other images (optional)</label>
                <input type="file" name="files" className="contentTitle" id="files" onChange={(e) => fileSelectedHandler(e)} style={{ display: "none" }} multiple />
                <label className="contentTitle" for="files">{isProcessingMultiple ? <Loader type="Circles" color="#00BFFF" height={35} width={35} /> : "Select file(s)"}</label>

            </div>
            <div className="image_preview">
                {
                   item ? item.other_images.map((image) => (
                    <img src={image.url} className="uploaded_images" />
                   )) :  validMultipleUrl.map((image) => (
                    <img src={image.url} className="uploaded_images" />
                ))
                }
            </div>
            <div className="titleContainer">
                <label className="contentLabel">Content</label>
                <textarea value={content} className="contentText" onChange={(e) => contentHandler(e)} />
            </div>
            
            <div className="articleButtonContainer">
                {
                    item === undefined ? (<button className="articleButton" onClick={() => handleSubmit()}>{isProcessing ? <Loader type="Circles" color="#00BFFF" height={35} width={35} /> : "Publish"}</button>) : <button className="articleButton" onClick={() => handleUpdate()}>{isUpdating ? <Loader type="Circles" color="#00BFFF" height={35} width={35} /> : "Update"}</button>
                }
            </div>
        </div>
    )
}

export default CreateArticle
