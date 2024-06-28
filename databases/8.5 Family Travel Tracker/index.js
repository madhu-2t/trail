import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 3000;


const db=new pg.Client({
  user:'postgres',
  host:'localhost',
  database:process.env.yourDatabase,
  password:process.env.yourPassword,
  port:process.env.yourPort
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [
  { id: 1, name: "Angela", color: "teal" },
  { id: 2, name: "Jack", color: "powderblue" },
];

async function checkVisisted(currentUserId) {
  const result = await db.query("SELECT country_code FROM visited_countries where user_id=$1",[(currentUserId)]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  const countries = await checkVisisted(currentUserId);
  console.log(countries);
  const index=users.findIndex((stg)=> stg.id==currentUserId);
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: users[index].color,
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];
  // console.log(input);
  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );
    // console.log(result);

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      console.log(currentUserId);
      console.log(countryCode);
      await db.query(
        "INSERT INTO visited_countries (country_code,user_id) VALUES ($1,$2)",
        [countryCode,currentUserId]
      );
      res.redirect("/");
    } catch (err) {
        const countries = await checkVisisted(currentUserId);
        
        const index=users.findIndex((stg)=> stg.id==currentUserId);
        console.log(users[index].color);
        res.render("index.ejs", {
          countries: countries,
          total: countries.length,
          users: users,
          color: users[index].color,
          error:"Duplicate entry"
        });
        console.log(err);
    }
  } catch (err) {
          const countries = await checkVisisted(currentUserId);
          
          const index=users.findIndex((stg)=> stg.id==currentUserId);
          console.log(users[index].color);
          res.render("index.ejs", {
            countries: countries,
            total: countries.length,
            users: users,
            color: users[index].color,
            error:"such country doesnt exist"
          });
  }
});
app.post("/user", async (req, res) => {
  console.log("This is re.body",req.body);
  if(Object.keys(req.body)[0]==='user'){
    currentUserId=parseInt(req.body.user);
    res.redirect("/");
  }
  else {res.render("new.ejs");}
});

app.post("/new", async (req, res) => {
  console.log(req.body);
  var len=users.length;
  var curr_id=users[len-1].id;
  // console.log(curr_id)

  users.push({ id:curr_id+1 , name: req.body.name, color: req.body.color });
  console.log(users);
  res.redirect('/');
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
