const ObjectId = require("mongodb").ObjectId;
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
            type: String,
            required: false
        },
        coordinates: {
            type: [Number], // long(E/W), lat(N/S)
            index: "2dsphere"
        }
    }
});

const reviewSchema = new mongoose.Schema({
    comment: {
        type: String,
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
        type: publisherSchema
    },
    reviews: {
        type: [reviewSchema]
    }
});

mongoose.model("Game", gameSchema, "games");