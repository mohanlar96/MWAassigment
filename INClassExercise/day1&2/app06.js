var fs=require("fs");
console.log(" 1: get a file ") ;
var onFileLoad=function(err,file){
	console.log("2: got the file");
};
var onFileLoad=fs.readFile("shortfile.txt",onFileLoad);

console.log("3: App continue...");
