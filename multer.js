const multer = require("multer")


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        // cb(null, './uploads/')
        
        cb(null, require('path').join(__dirname, 'uploads')); 
    },
    filename: function(req, file, cb){
        cb(null, new Date().toString() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }else{
        cb({message: "Unsupported file format"}, false)
    }
}

const upload = multer({
    storage:storage,
    limits:{fileSize: 1024 * 1024},
    fileFilter: fileFilter
})


module.exports = upload