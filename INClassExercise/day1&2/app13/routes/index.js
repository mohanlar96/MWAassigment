var express=require('express');
var router=express.Router();

router.route("/json")

    .get(function(req,res){

    console.log("JSON request made");
    res.status(200).json(
        {
            "jsonDAta":true
        });
    })
    .post(function(req,res){
        console.log("JSON post request");
        res.status(200).json({
            "jsonData":false
        })

    });

    module.exports=router;
    



