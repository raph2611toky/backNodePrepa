const mongoose = require("mongoose")


var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, './uploads');    
    }, 
    filename: function (req, file, cb) { 
       cb(null , file.originalname);   
    },
    filefilter: function fileFilter (req, file, cb) {    
        // Allowed ext
         const filetypes = /jpeg|jpg|png|gif|svg|ico|doc|docx|txt|pdf|xlsx|ppt|mp3|mp4|avi|mpeg/;
      
       // Check ext
        const extname =  filetypes.test(path.extname(file.originalname).toLowerCase());
       // Check mime
       const mimetype = filetypes.test(file.mimetype);
      
       if(mimetype && extname){
           return cb(null,true);
       } else {
           cb('Error: Images Only!');
       }
      }
 });

 const uploads = multer({
    storage: storage,
    limits : {fileSize : 10000000}
 }).single("fichier")

 module.exports = uploads