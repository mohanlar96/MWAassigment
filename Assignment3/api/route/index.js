const express=require("express");
const router=express.Router();
const controller=require("../controller");


router.route("/").get(controller.displayGames);


module.exports=router;
