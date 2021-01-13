var fs=require("fs");
console.log(" 1: get a file ") ;
var file=fs.readFile("shortfile.txt",function(err,file){
	console.log("2: got the file");
});

console.log("3: App continue...");

//version ~x.y.z .. ffor not next miner version.
//version ^x.y.z ... for not next major version
