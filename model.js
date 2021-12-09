const mongoose = require("mongoose")

const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: String, 
    display_image: String,
    other_images: [],
    content: String
},
{
    timestamps:true
}
)

const model = mongoose.model("article", articleSchema)

module.exports = model