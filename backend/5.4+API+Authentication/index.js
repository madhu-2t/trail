import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = process.env.username;
const yourPassword = process.env.password;
const yourAPIKey = process.env.APIKey;
const yourBearerToken = process.env.BearerToken;

const tokenStr=Buffer.from(yourUsername + ':' + yourPassword).toString('base64');
console.log(tokenStr);
app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async(req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
    try {
      const response = await axios.get("https://secrets-api.appbrewery.com/random");
      const result = JSON.stringify(response.data);
      console.log(result);
      res.render("index.ejs", { content: result });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        content: "username/password incorrect",
      });
    }
});

app.get("/basicAuth", async(req, res) => {
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/all?page=2",{
      headers: {
        'Authorization': 'Basic ' + tokenStr
      }
    });
    const result = JSON.stringify(response.data);
    console.log(result);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      content: "username/password incorrect",
    });
  }
        
          
          
          
          
      }

  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
);

app.get("/apiKey", async(req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.

    try {
      const response = await axios.get(`https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`);
      const result = JSON.stringify(response.data);
      res.render("index.ejs", { content: result });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        content: error.message,
      });
    }

});

app.get("/bearerToken", async(req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
    */
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/secrets/1",{
      headers: {
        'Authorization': 'Bearer ' + yourBearerToken
      }
    });
    const result = JSON.stringify(response.data);
    console.log(result);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      content: "username/password incorrect",
    });
  }
  
    
    
    
    



});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
