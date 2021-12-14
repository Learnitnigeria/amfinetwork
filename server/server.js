require("dotenv").config()
const express = require("express")
const mongoose =require("mongoose")
const cors = require("cors")
const app = express()
const path = require('path');
const upload = require("../multer")
const cloudinary = require("../cloudinary")
const bcrypt = require("bcryptjs");
const fs = require("fs")
const publicPath = path.join(__dirname, '..', 'build');
const __Article = require("../model")
const Admin = require("../userModel")
const defaultAdmin = require("../createAdmin")
const jwt = require("jsonwebtoken");
const Validator = require("validatorjs");
const isAuth = require("../isAuth")
const {getTemplate} = require("../Utils/getTemplate")
const {sendMail} = require("../Utils/email.service")



mongoose.connect(process.env.MongoUrl, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    console.log("Successfully connected to db")
    defaultAdmin()
 })


app.use(express.static(publicPath));
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors("*"))


app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
 });


 app.post("/login", async(req, res) => {

        try {
            const rules = {
                email: "required|email",
                password: "required|string",
            };

            const validation = new Validator(req.body, rules);

            if (validation.fails()) {
                return res.status(400).json({
                    responseCode: "02",
                    status: "failed",
                    message: "Validation Errors",
                    data: { errors: validation.errors.all() }
                });
            }

            const { email, password } = req.body;

            // check if a user with that email exists
            const user = await Admin.findOne({ email: email });
            
            if (user === undefined) {
                return res.status(404).json({
                    responseCode: "08",
                    status: "failed",
                    message: `Incorrect admin email provided`,
                });
            }

            const validPassword = await bcrypt.compare(password, user.password);

            if (validPassword === false) {
                return res.status(400).json({
                    responseCode: "02",
                    status: 'failed',
                    message: `Password does not match`,
                    data: {
                        password: ['Passwords does not match'],
                    },
                });
            }

            user.lastLogin = new Date()
            user.save()

            const token = await jwt.sign(
                {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    location: user.location
                },
                process.env.JWT_KEY,
                {
                    expiresIn: '24hr',
                }
            );

            return res.status(201).json({
                responseCode: "00",
                status: "success",
                message: "Login Successful",
                data: {
                    email,
                    name: user.name,
                    location: user.location,
                    token
                }
            });
        } catch (error) {
            return res.status(500).json({
                responseCode: "99",
                status: "failed",
                message: "An error Occurred Please Try again",
            });
        }
 })


app.post("/reset_password", async(req, res) => {
  
        try {
    
            const rules = {
                id: "required|string",
                password: "required|confirmed|min:6"
            };
    
          
            const validation = new Validator(req.body, rules);
    
            if (validation.fails()) {
                return res.status(400).json({
                    responseCode: "02",
                    status: "failed",
                    message: "Validation Errors",
                    data: { errors: validation.errors.all() }
                });
            }
         
            const {id, password} = req.body;
    
    
          const user = await Admin.findOne({ _id: id});
                if (user === undefined) {
                    return res.status(404).json({
                        responseCode: "08",
                        status: "failed",
                        message: `Invalid parameter provided.`,
                    });
                }
    
               
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt);
      
              
                user.password = hash;
                await user.save();
      
                return res.status(201).json({
                    responseCode: "00",
                    status: "success",
                    message: "Password Successfully updated",
                });
        } catch (error) {
            return res.status(500).json({
                responseCode: "99",
                status: "failed",
                message: "An error Occurred Please Try again",
            });
        }
})
      
app.post("/forgot_password", async(req,res) => {

        try {
            const rules = {
                email: "required|email"
            };
    
            const validation = new Validator(req.body, rules);
    
            if (validation.fails()) {
                return res.status(400).json({
                    responseCode: "02",
                    status: "failed",
                    message: "Validation Errors",
                    data: { errors: validation.errors.all() }
                });
            }
          const { email } = req.body;

          console.log(email, "ffff")
    
          const user = await Admin.findOne({ email: email });
          console.log(user, "user")
                if (user === undefined) {
                   
                    return res.status(404).json({
                        responseCode: "08",
                        status: "failed",
                        message: `Wrong email ${email} provided.`,
                    });
                }
      
          const message = await getTemplate(
            "forgotpassword",
            {
              fullname: user.name,
              message: "If you requested for a password update please kindly click on the link below else ignore.",
              link: `${process.env.FRONTEND_BASE_URL}/reset_password?reset_token=${user._id}`,
              buttonTitle:"https://kfjdfkjdfmweweipqw[pas30pk5j3js7nsk1m,6,nnnsnddbsm,m"
            },
            {
              escape: (html) => {
                return String(html);
              },
            }
          );
    
          const payload = {
            receiver: user.email,
            subject: "Forgot Password",
            message,
          }
          
        sendMail(payload)
        return res.status(201).json({
            responseCode: "00",
            status: "success",
            message: "Reset password code has been sent to your email.",
        });
         
        } catch (error) {
            console.log(error, "pass")
            return res.status(500).json({
                responseCode: "99",
                status: "failed",
                message: "An error Occurred Please Try again",
            });
        }
})


app.get("/current_user", async(req,res) => {

    try {
       const user = req.user

      const response = await Admin.findOne({ email: user.email });
      console.log(user, "user")
            if (response === undefined) {
                return res.status(404).json({
                    responseCode: "08",
                    status: "failed",
                    message: `Seesion expired!`,
                });
            }
  
    
    return res.status(201).json({
        responseCode: "00",
        status: "success",
        message: "user found",
        data: response
    });
     
    } catch (error) {
        return res.status(500).json({
            responseCode: "99",
            status: "failed",
            message: "An error Occurred Please Try again",
        });
    }
})

app.post("/single_upload",isAuth, upload.single('file'), async(req, res) => {
    
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

app.post("/multiple_upload",isAuth, upload.array("files"), async(req, res) => {
    
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

app.post("/publish",isAuth, async(req, res) => {
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

app.put("/edit/:id",isAuth, async(req, res) => {
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

app.delete("/delete/:id",isAuth, async(req, res) => {
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