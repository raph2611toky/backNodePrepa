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
    
}, {
    timestamp: true
})

User.pre("save", async function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    const hassPass = await bcrypt.hashSync(this.password, 10);
    return (this.password = hassPass)
   
});

User.pre("updateOne", async function(next) {
    if(!this._update.password) {
        const hassPass = await bcrypt.hashSync(this._update.password, 10);
         this.password = hassPass
    }
    return next();
});

User.methods.verifyPassword = function(plaintext) {
    return bcrypt.compareSync(plaintext, this.password)  
};

// generate a new token and save user 
User.methods.generateTokenAndSaveUser = async function() {
    const authToken = jwt.sign({
        _id: this._id.toString() 
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.ONE_DAYS
    })
    this.tokens.push({ authToken })
    await this.save()
    return authToken
}



module.exports= User

