import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from 'dotenv';
dotenv.config();
const db=new pg.Client({
user:'postgres',
host:'localhost',
database:process.env.yourDatabase,
password:process.env.yourPassword,
port:process.env.yourPort
});
db.connect()

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email=req.body.username;
  const password=req.body.password;
  try{
    await db.query("insert into users(email,password) values($1,$2)",[email,password]);
    res.render("register.ejs",{error:" Successfully created your account,You can proceed with login"});
  }
  catch(err){
    console.log(err);
    res.render("register.ejs",{error:" User with that email already exists. try logging in"});
  }
});

app.post("/login", async (req, res) => {
  const email=req.body.username;
  const password=req.body.password;
  try{
    const result=await db.query("select* from users where email=$1 and password=$2",[email,password]);
    console.log(result);
    const em=result.rows[0].email;
    res.render("secrets.ejs");
  } 
  catch(err){
    res.render("login.ejs",{error:" Bad mail/passwprd"});
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
