const fs=require("fs");
fs.writeFile('message.txt',"HI from nodejs",(err)=>{
    if(err) throw err;
    console.log("The file have been saved!");
});