const ObjectId = require("mongodb").ObjectId;
var mongoose = require("mongoose");


const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        required: true
    }

});

const addressSchema = new mongoose.Schema({
        city:{
            type: String,
            required: true
        },
        state:{
            type: String,
            required: true
        },
        country:{
            type: String,
            required: true
        },
        zip:{
            type: Number,
            required: false,
            "default":52556
        },
        street:{
            type: String,
            required: true
        }
    });


const apartmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    bathroom: {
        type: Number,
        min: 1,
        max: 10
    },
    floors: {
        type: Number,
        min: 1,
        max: 99
    },
    yearBuild: {
        type: Number,
        min: 1890,
        max: 2021
    },
    posted: {
        type: Date,
       require:true,
    },
    acres: {
        type: Number
               
    },
    rentOrSell:{
        type: String,
        required: true,
        default:"sell"
    },
    address: {
        type:addressSchema,
        required:false        
    },
    images: {
        type: [imageSchema]
    }



});

mongoose.model("Apartment", apartmentSchema, "apartments");