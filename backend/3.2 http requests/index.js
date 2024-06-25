import express from "express";
const app=express();
const port=3000;


app.get('/',(req,res)=>{
    console.log(req.rawHeaders);
    res.send('<h1>hi hello</h1>')
});
app.get('/about',(req,res)=>{
    console.log(req.rawHeaders);
    res.send('<h1>hi im madhu</h1>')
});
app.get('/contact',(req,res)=>{
    console.log(req.rawHeaders);
    res.send('<h1>7386287069</h1>')
});

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});
