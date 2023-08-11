const mongoose = require("mongoose")
const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")

const User= mongoose.models("User",{
    name: {
        require: true,
        type: String
    },
    email: {
        require: true,
        type: String
    },
    password:{
        require: true,
        type: String
    },
    pictures:{
        all: [mongoose.Schema.ObjectId],
        profile: mongoose.Schema.ObjectId
    },
    authTokens: 
       [{
        authToken:{
            type: String,
            require: true
        }
       }
       ] 
    
})




module.exports= User

