var mongoose=require("mongoose");
const address = new mongoose.Schema({
    street:String,
    city:String,
    country:String,
    zip:Number    
    });
const stdSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    gpa:{
        type:Number,
        require:true
    },
    address:{
        type:[address],
        require:false
    }
    //other datatype 
    //boolean, Buffer, ObjectId , Mixed 
});

mongoose.model("Student",stdSchema,"Students") // collections in MongoDB is Students