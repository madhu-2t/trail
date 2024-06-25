var randNum=Math.round(Math.random()*4);
var btnColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var randomColor=btnColors[randNum];
gamePattern.push(randomColor);
var userClickedPattern=[];

// $('#'+randomColor).click(function(){
//     var userChosenColour=randomColor;
//     userClickedPattern.push(userChosenColour);
//     console.log(userClickedPattern);
// })

$('button').click(function(){
    var userChosenColour=$(this).attr('id');
    console.log(console.log(userChosenColour));
});

// $('#'+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
// console.log(randomColor);
// var audio=new Audio("sounds/"+randomColor+".mp3");
// audio.play();
// $('.'+randomColor).playsound('sounds/'+randomColor+'.mp3');