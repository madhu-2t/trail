import express from "express";
import morgan from"morgan";

const app=express();

app.use(morgan("combined"));


app.get('/',(req,res)=>{
    res.send("hello");
});
app.listen(3000,(req,res)=>{
    console.log("server success");
});
