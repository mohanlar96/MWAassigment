const router=require("express").Router();
const path=require("path");

router.route("/").get(function(req,res){    
    res.status(200).sendFile(path.join(__dirname,"public","index.html"));
});
router.route("/student/qr").get(function(req,res){    
    res.status(200).sendFile(path.join(__dirname,"public","student-qr.html"));
});
router.route("/student/profile").get(function(req,res){    
    res.status(200).sendFile(path.join(__dirname,"public","student-profile.html"));
});

module.exports=router;