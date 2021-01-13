module.exports.sum=function(req,res){
    res.status(200).send(req.params.num1+req.query.num2);
}