// HINTS:
// 1. Import express and axios
import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios'

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://secrets-api.appbrewery.com/random');
    const result = response.data;
    console.log(result);
    res.render('index.ejs', { secret: result.secret,user:result.username });
  } catch (error) {
    console.error('Failed to make request:', error.message);
    res.render('index.ejs', {
      error: error.message,
    });
  }
});


app.listen(port,(req,res)=>{
  console.log('server success');
});



// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
