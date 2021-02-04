var mongoose = require("mongoose");



const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    data: String,
    session:String,
    course:String
});

mongoose.model("Attendance", attendanceSchema, "attendace");