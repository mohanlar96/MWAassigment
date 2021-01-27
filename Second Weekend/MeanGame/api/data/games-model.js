var mongoose = require("mongoose");



var publisherSchema=mongoose.Schema({
    name:{
        type:String,
        required:false
    },
    location:{
        coordinates :[Number],
        required:false
    }
});

var gameSchema = mongoose.Schema({
    title :{
        type:String,
        required:true
    },
    year:Number,
    rate:{
        type:Number,
        min:1,
        max:5,
        default:1
    },
    price: Number,
    minPlayers: Number,
    maxPlayers: Number,
    minAge: Number,
    designer: [String],
    publisher:[publisherSchema]
});


mongoose.model("Game",gameSchema,"games");