require("dotenv").config()
const express = require("express")
const mongoose =require("mongoose")
const cors = require("cors")
const app = express()
const path = require('path');
const upload = require("../multer")
const cloudinary = require("../cloudinary")
const fs = require("fs")
const publicPath = path.join(__dirname, '..', 'build');
const __Article = require("../model")



mongoose.connect(process.env.MongoUrl, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    console.log("Successfully connected to db")
 })


 app.use(express.static(publicPath));
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors("*"))


app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
 });

app.post("/single_upload",upload.single('file'), async(req, res) => {
    
    const file = req.file;

      cloudinary.uploads(file.path, "amfiDisplayImages")
        .then((result) => {
        res.status(200).json({
            message: "success",
            result,
        });
        }).catch((error) => {
        res.status(500).json({
            message: "failure",
            error,
        });
        });

})

app.post("/multiple_upload", upload.array("files"), async(req, res) => {
    
    console.log(req.files, "from node")

    const uploader = async(path) => await cloudinary.uploads(path, "Images");

    if(req.method === "POST"){
        const urls = []
        const files = req.files

        for(const file of files){
            const {path} = file;
            const newPath = await uploader(path)
            urls.push(newPath)
            fs.unlinkSync(path)
        }

        res.status(200).json({
            message: "Images uploaded successfully",
            data:urls
        })
    }else{
        res.status(405).json({
            error: `${req.method} method not allowed`
        })
    }
    
})

app.post("/publish", async(req, res) => {
    try{
        const data = req.body;
        await __Article.create({...data})
        return res.json({message:"Article published"})

    }catch(error){
        return res.send("Error publishing article", error)
    }
   
})

app.post("/articles", async(req, res) => {
    try{
        
        const response = await __Article.find({}).sort({createdAt:-1})
        console.log(response, "fffffff")
        return res.status(200).json({articles:response})

    }catch(error){
        return res.status(500).send("Error fetching articles", error)
    }
})

app.put("/edit/:id", async(req, res) => {
    try{
        const {id} = req.params
        const data = req.body;
        const response = await __Article.findOneAndUpdate({_id:id}, {...data})
        if(response){
            return res.json({message: "Article updated"})
        }

    }catch(error){
        return res.send("Error updating article", error)
    }
   
})

app.delete("/delete/:id", async(req, res) => {
    try{
        const {id} = req.params;
        const response = await __Article.findOneAndDelete({_id:id})
        if(response){
            return res.json({message: "Article deleted"})
        }

    }catch(error){
        return res.send("Error deleting article", error)
    }
})





const port = process.env.PORT || 3002
app.listen(port, (err) => {
    if(err){
        console.log(err)
    }else{
        console.log(`App running on port ${port}`)
    }
})