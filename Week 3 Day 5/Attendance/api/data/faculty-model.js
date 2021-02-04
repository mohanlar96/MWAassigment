var mongoose = require("mongoose");



const facultySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: String,
    keyword:String,
});

mongoose.model("Faculty", facultySchema, "faculty");