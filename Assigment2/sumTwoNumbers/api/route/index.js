var express= require("express");
var router= express.Router();
var sumController=require("../controller");

    router.route("/sum/:num1").get(sumController.sum);
        

    module.exports=router;