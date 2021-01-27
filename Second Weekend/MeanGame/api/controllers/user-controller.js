const mongoose=require("mongoose");
const User=mongoose.model("User");
const bcrypt=require("bcrypt-nodejs");
const jwt=require("jsonwebtoken");

module.exports.register=function(req,res){
    console.log("registering user");
    var username=req.body.username;
    var name=req.body.password || null;
    var password=bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10));
    User.create({
        username:username,
        name:name,
        password:password,
        function(err,user){
          let response={
               status:200,
               message:user
           };
           if(err){
               response.status=500,
               response.message=err
           }
           res.status(response.status).json(response.message);
        }
    });
}

module.exports.login=function(req,res){
    console.log("loggin a user");
    var username=req.body.username;
    var password=req.body.password;
    User.findOne({username:username}).exec(function(err,user){
        let response={
            status:200,
            message:user
        };
        if(err){
            response.status=400,
            response.message=err
        }
        if(!user){
            response.status=401,
            response.message="Unauthorized";
        }
        if(user){
            console.log(bcrypt.compareSync(password,user.password));
            if(bcrypt.compareSync(password,user.password)){

                const token=jwt.sign({username:user.username},"cs572",{expiresIn:3600});
                response.status=200,
                response.message={success: true, token: token}
            } 
        }
        res.status(response.status).json(response.message);
    })     
};

module.exports.authenticate=function(req,res){
    const headerExists=req.headers.authorization;
    if(headerExists){
        const token=req.headers.authorization.split(" ")[1];
        jwt.verify(token,"cs572",function(err,decoded){
            if(err){
               res.status(401).json("unauthorized");
            }
            else{
                req.user=decoded.username;
                next();
            }
        })
    }
        else{
           res.status(403).json("No token provided");
        }
};
