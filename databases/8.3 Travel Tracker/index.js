import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';
import dotenv from "dotenv";
dotenv.config();
const db=new pg.Client({
  user:'postgres',
  host:'localhost',
  database:process.env.yourDatabase,
  password:process.env.yourPassword,
  port:process.env.yourPort
});
db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
async function checkVisisted(){
  const result=await db.query("select country_code from visited_countries");
  const countries=[];
  result.rows.forEach((country)=>{
    countries.push(country.country_code);
  })
  return countries;
}
app.get("/", async (req, res) => {
  const countries=await checkVisisted();
  res.render("index.ejs",{countries:countries,total:countries.length});
});

app.post('/add',async(req,res)=>{
  var count=(req.body.country);
  try{
    const result=await db.query("select country_code from countries where lower(country_name) like '%'|| $1 || '%'",[count]);
    console.log(result);
    const code=result.rows[0].country_code;
    // const data=code.country_code;
    // console.log(data);
    try{
      await db.query("insert into visited_countries (country_code) values ($1)",[code]);
      res.redirect("/");
    }
    catch(err){
      console.log(err);
      var countries=await checkVisisted();
      res.render("index.ejs",{countries:countries,total:countries.length,error:"Its been already visited"});
    }
  }
  catch(err){
    console.log(err);

    var countries=await checkVisisted();
    res.render("index.ejs",{countries:countries,total:countries.length,error:"There is no such Country,Enter Correct name"});
  }
  
  

  

})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
