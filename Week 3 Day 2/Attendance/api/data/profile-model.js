var mongoose = require("mongoose");



const profileSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: String,
    campusTakenCourse: [String],
    distanceTakenCourse: [String],
    aboutYourself:String,
    profile:{
        url:String
    },
    gender:String,
    courseType:[String]
});

mongoose.model("Profile", profileSchema, "profile");