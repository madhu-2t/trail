var btns=document.querySelectorAll(".drum");
function playSound(btnInnerHtml){
        switch (btnInnerHtml) {
            case 'w':
                var crash=new Audio('sounds/crash.mp3');
                crash.play();
                break;
            case 'a':
                var kick=new Audio('sounds/kick-bass.mp3');
                kick.play();
                break;
            case 's':
                var snare=new Audio('sounds/snare.mp3');
                snare.play();
                break;
            case 'd':
                var tom1=new Audio('sounds/tom-1.mp3');
                tom1.play();
                break;
            case 'j':
                var tom2=new Audio('sounds/tom-2.mp3');
                tom2.play();
                break;
            case 'k':
                var tom3=new Audio('sounds/tom-3.mp3');
                tom3.play();
                break;
            case 'l':
                var tom4=new Audio('sounds/tom-4.mp3');
                tom4.play();
                break;
            
        
            default:console.log(btnInnerHtml);
                break;
        }
}
function buttonAnimation(key){
    $('.'+key).animate()
    var activeButton=document.querySelector('.'+key);
    activeButton.classList.add('pressed');
    setTimeout(function(){activeButton.classList.remove('pressed')},100);
}
//Button Pressed
$('button').on("click",function(){
    playSound(this.innerHTML);
    buttonAnimation(this.innerHTML);
});
// for(var i=0;i<btns.length;i++){
//     btns[i].addEventListener("click",function(){
//         playSound(this.innerHTML);
//         buttonAnimation(this.innerHTML);
//     });
// }

//Button clicked
$("document").on("keydown",function(event){
    playSound(event.key);
    buttonAnimation(event.key);
});
