var mongoose = require("mongoose");
 
const publisherSchema = new mongoose.Schema({
name: {
 type: String,
 required: false
},
country: {
 type: String,
 required: false
},
established: {
 type: Date,
 required: false
},
location: {
 address: {
     type:String,
     required:false
 },
 coordinates: {
    type: [Number], // long(E/W), lat(N/S)
    index: "2dsphere"
 }
 
}
});
 
const gameSchema = new mongoose.Schema({
 title: {
 type: String,
 required: true
 },
 price: Number,
 designers: [String],
 minPlayers: {
 type: Number,
 min: 1,
 max: 10
 },
 maxPlayers: {
 type: Number,
 min: 1,
 max: 10
 },
 rate: {
 type: Number,
 min: 1,
 max: 5,
 "default": 1
 },
 publisher: {
     type:publisherSchema,
     required:false
 }
});
 
mongoose.model("Game", gameSchema, "games");