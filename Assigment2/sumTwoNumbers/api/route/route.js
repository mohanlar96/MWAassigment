var express= require("express");
var router= express.Router();
var sumController=require("../controllers/games.controllers.js");

router.route("/sum/:num1",sumController.sum);