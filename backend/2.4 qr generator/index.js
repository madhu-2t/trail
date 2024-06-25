import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';




inquirer
  .prompt([
    {name:"url",
        message:"Enter the url"
    },
  ])
  .then((answers) => {
    var myurl=answers.url;
    var qr_svg = qr.image(myurl);
    qr_svg.pipe(fs.createWriteStream('i_love_qr.png'));
    fs.writeFile('url.txt',myurl,(err)=>{
        if(err) throw err;
        console.log("file have been saved");
    })
    
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });