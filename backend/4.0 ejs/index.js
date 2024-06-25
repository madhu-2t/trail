import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const _dirname = dirname(fileURLToPath(import.meta.url));
var str1='a weekday its time to work hard!';
var str2='a weekend, its time to have fun!';

const d = new Date();
let day = d.getDay();
var ans="";
if(day===0){
    ans=str2;
}
else{
    ans=str1;
}


app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render(_dirname+'/views/index.ejs',{
    advice:ans
});
});

app.listen(port,(req,res)=>{
  console.log('server success');
});

















