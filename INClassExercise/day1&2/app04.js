var fs=require("fs");
console.log(" 1: get a file ") ;
var file=fs.readFileSync("shortfile.txt");
console.log("2: got the file");
console.log("3: App continue...");
