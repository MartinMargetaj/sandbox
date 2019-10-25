var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

snakeHeadX = 24;
snakeHeadY = 24;
squareSize = 20;
document.addEventListener("keydown", keyDownHandler, false);
//document.addEventListener("keyup", keyUpHandler, false);
speed = 250  
lvl = 0;
var applePositionX = 0
var applePositionY = 0
isApple = false
tail = 0;
var tailPositionX = new Array();
var tailPositionY = new Array();
canPressAgain = true;
gameOK = true;
setInterval(gametic, speed - 10*lvl );

function gametic(){ 
    if (gameOK){
        canPressAgain = true;  
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw_rectangle(snakeHeadY*squareSize,snakeHeadX*squareSize,squareSize,squareSize,"#ffffff");
        for (i = 0; i < tail; i++){
            if (i%2 == 0){
                draw_rectangle(tailPositionY[i]*squareSize,tailPositionX[i]*squareSize,squareSize,squareSize,"#aaaaaa");
            }
            else{
                draw_rectangle(tailPositionY[i]*squareSize,tailPositionX[i]*squareSize,squareSize,squareSize,"#ffffff");
            }
            
        }
        moveAll();
        if (!isApple){
            placeNewApple();
        }
        draw_rectangle(applePositionY*squareSize,squareSize*applePositionX,squareSize,squareSize,"#ff0000");
        hitApple();
        checkForTail();
    }
}
function checkForTail(){
    for (i = 0; i < tail; i++){
        if (tailPositionX[i] == snakeHeadX && tailPositionY[i] == snakeHeadY){
            gameOK = false;
            alert("GAME OVER, you ate " + tail + " apples");
        }
        
    }    
}
function moveAll(){
    for (i = tail; i > -1; i--){
        if (i == 0){
            tailPositionX[i] = snakeHeadX;
            tailPositionY[i] = snakeHeadY;
        }
        else{
            
            tailPositionX[i] = tailPositionX[i-1];
            tailPositionY[i] = tailPositionY[i-1];
        }
    }
    if (upPressed){
        snakeHeadX -= 1; 
    }
    else if(downPressed){
        snakeHeadX += 1; 
    }
    else if(leftPressed){
        snakeHeadY -= 1; 
    }
    else if(rightPressed){
        snakeHeadY += 1; 
    }
    if (snakeHeadY>47){
        snakeHeadY = 0;
    }
    else if (snakeHeadY<0){
        snakeHeadY = 47;
    } 
    else if (snakeHeadX>47){
        snakeHeadX = 0;
    } 
    else if (snakeHeadX<0){
        snakeHeadX = 47;
    }
}

function hitApple(){
    snakeHeadYTEMP = snakeHeadY;
    snakeHeadXTEMP = snakeHeadX;
   /* if (upPressed){
        snakeHeadXTEMP -= 1; 
    }
    else if(downPressed){
        snakeHeadXTEMP += 1; 
    }
    else if(leftPressed){
        snakeHeadYTEMP -= 1; 
    }
    else if(rightPressed){
        snakeHeadYTEMP += 1; 
    }*/
    if ((snakeHeadYTEMP == applePositionY) && (snakeHeadXTEMP == applePositionX)){
        isApple = false;
        if (upPressed){
            snakeHeadXTEMP += 1; 
        }
        else if(downPressed){
            snakeHeadXTEMP -= 1; 
        }
        else if(leftPressed){
            snakeHeadYTEMP += 1; 
        }
        else if(rightPressed){
            snakeHeadYTEMP -= 1; 
        }
        tailPositionX[tail] = snakeHeadXTEMP;
        tailPositionY[tail] = snakeHeadYTEMP;
        tail += 1;
    }
}

function placeNewApple(){
    isNOTOK = true;
    while (isNOTOK){
        isNOTOK = false;
        applePositionY = Math.floor(Math.random() * 47)+1;
        applePositionX = Math.floor(Math.random() * 47)+1;
        for (i = 0; i < tail; i++){
            if (tailPositionX[i]==applePositionX && tailPositionY[i]==applePositionY){
                isNOTOK = true;
            }
        }
        if ((snakeHeadX==applePositionX) && (snakeHeadY==applePositionY)){
            isNOTOK = true;
        }
    }
    isApple = true
}



function draw_rectangle(px,py,h,w,c){
    ctx.beginPath();
    ctx.rect(px, py, h, w);
    ctx.fillStyle = c;
    ctx.fill();
    ctx.closePath();
}
  
  
function draw_circle(px,py,r,c){
    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI*2, false);
    ctx.fillStyle = c;
    ctx.fill();
    ctx.closePath();
}


function keyDownHandler(e) {
    if (canPressAgain){
        if(e.key == "Up" || e.key == "ArrowUp" && downPressed == false) {
            upPressed = true;
            downPressed = false;
            leftPressed = false;
            rightPressed = false;
        }
        else if(e.key == "Down" || e.key == "ArrowDown" && upPressed == false) {
            downPressed = true;
            upPressed = false;
            leftPressed = false;
            rightPressed = false;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft" && rightPressed == false){
            leftPressed = true;
            upPressed = false;
            downPressed = false;
            rightPressed = false;
        }
        else if(e.key == "Right" || e.key == "ArrowRight" && leftPressed == false){
            rightPressed = true;
            upPressed = false;
            downPressed = false;
            leftPressed = false;
        }
        canPressAgain = false;
    }
}
/*
function keyUpHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        //upPressed = false;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        //downPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        //leftPressed = false;
    }
    else if(e.key == "Right" || e.key == "ArrowRight") {
        //rightPressed = false;
    }
}
*/
  