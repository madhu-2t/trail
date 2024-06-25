import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const _dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(_dirname + '/public/index.html');
});
app.post('/login',(req,res)=>{
   console.log(req.body);
})

app.listen(port,(req,res)=>{
  console.log('server success');
});
