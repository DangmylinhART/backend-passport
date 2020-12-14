const mongoose = require('mongoose')

const UseSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: "Username is required",
        unique: "Username is already exist"
    },
    email: {
        type: String,
        trim: true,
        required: "Email is required",
        unique: "Email is already exist"
    },
    password: {
        type: String,
        require: "password is required"
    }
})

module.exports = mongoose.model('User', UseSchema)