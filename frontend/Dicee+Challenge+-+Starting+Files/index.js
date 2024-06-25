var num1=Math.floor(Math.random()*6) +1;
var num2=Math.floor(Math.random()*6) +1;
var obj1=document.getElementsByClassName("img1")[0];
var obj2=document.getElementsByClassName("img2")[0];
var hObj=document.querySelector("h1");

obj1.setAttribute("src","images/dice"+6+".png");
obj2.setAttribute("src","images/dice"+6+".png");


obj1.setAttribute("src","images/dice"+num1+".png");
obj2.setAttribute("src","images/dice"+num2+".png");
if(num1>num2){
    hObj.innerHTML="🚩Player1 wins";
}
else if(num2>num1){
    hObj.innerHTML="Player2 wins🚩";
}
else{
    hObj.innerHTML="Draw";
}
