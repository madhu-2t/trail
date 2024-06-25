import express from "express";

import {dirname} from "path";
import { fileURLToPath } from "url";
const _dirname=dirname(fileURLToPath(import.meta.url));

import bodyParser from "body-parser";

const app=express();
const PORT=3000;

app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(_dirname+"/public/index.html");
});

app.post("/login",(req,res)=>{
    console.log(req.body);
})

app.listen(PORT,(req,res)=>{
    console.log("Server running sucessfully");
})
