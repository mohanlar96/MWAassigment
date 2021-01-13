var express= require("express");
var router= express.Router();
var sumController=require("../controller");

    router.route("/").get(sumController.sum);
        

    module.exports=router;