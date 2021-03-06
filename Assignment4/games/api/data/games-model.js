var mongoose=require("mongoose");

const gameSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    price:Number,
    designers:[String],
    minPlayers:{
        type:Number,
        min:1,
        max:10
    },
    maxPlayers:{
        type:Number,
        min:1,
        max:10
    },
    rate:{
        type:Number,
        min:1,
        max:5,
        "default": 1
    },
    
    //other datatype 
    //boolean, Buffer, ObjectId , Mixed 
});

mongoose.model("Game",gameSchema,"games") // collections in MongoDB is Games