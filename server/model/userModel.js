import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please enter a username"],
        unique: [true, "Username already exists"]
    },

    password:{
        type: String,
        required: [true, "Please enter a password"],
        unique: false
    },

    email:{
        type: String,
        required: [true, "Please enter an email"],
        unique:true
    },

    firstName:{type: String},
    lastName:{type: String},
    
    mobile:{type: Number},
    address:{type: String},
    profile:{type: String},
});