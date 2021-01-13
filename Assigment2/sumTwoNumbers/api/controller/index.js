module.exports.sum=function(req,res){
    var sum=parseInt(req.params.num1)+parseInt(req.query.num2);
        console.log(sum);
        res.send("The sum result is "+sum);
}