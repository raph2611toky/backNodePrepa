const { date } = require("joi")
const mongoose= require("mongoose")
const validator= require("validator")

const File= mongoose.model("File",{
    userId: {
        require: true,
        type: mongoose.Schema.ObjectId},
    filePath: {
        require: true,
        type: String
    },
    size: {
        require: true,
        type: Number
    },
    uploadAt: {
        type: Date,
        default: Date.now()
    },
    fileType: {
        require: true,
        type: String
    },
    accesId: {
        require: true,
        value: [mongoose.Schema.ObjectId]
    }

})

module.exports= File
