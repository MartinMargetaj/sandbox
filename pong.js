var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

setInterval(slowdown, 300);
setInterval(update_pos, 10);
ballX = 200;
ballY = 200;
ballXSpeed = 1;
ballYSpeed = 1;
color = "#ffffff";
points = 0;
radius = 15;
playerPositionX = 20;
playerSize = 100;
playerSpeedX = 0;
playerSpeedY = 0;
var upPressed = false;
var downPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
maxPlayerSpeed = 7;
playerPositionY = 20;
gameOver = false;

function update_pos(){   
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (gameOver){
    draw_rectangle(0,0,canvas.width,canvas.height,"#ff0000");
    return
  }
  draw_rectangle(0,canvas.height-3,canvas.width,3,"#0000ff");
  draw_rectangle(0,0,canvas.width,3,"#0000ff");
  draw_rectangle(canvas.width-3,0,3,canvas.height,"#0000ff");
  draw_rectangle(0,0,3,canvas.height,"#ff0000");
  draw_rectangle(playerPositionY,playerPositionX,10,playerSize-points,"#00ff00");
  draw_circle(ballX,ballY,radius,"#ffffff");
  ballX += ballXSpeed;
  ballY += ballYSpeed;
  checkForColision();
  if(upPressed){
    playerSpeedX -= 1;
  }
  else if (downPressed){
    playerSpeedX += 1;
  }
  if (Math.abs(playerSpeedX) > maxPlayerSpeed){
      playerSpeedX = maxPlayerSpeed*Math.sign(playerSpeedX);
  }
  playerPositionX += playerSpeedX; 
  if((playerPositionX <0 || playerPositionX+playerSize-points>canvas.height) || (playerPositionX+playerSpeedX <0 || playerPositionX+playerSpeedX+playerSize-points>canvas.height)){
    playerSpeedX *= -0.8;
  }
  else if((playerPositionY<0 || playerPositionY+10>canvas.width) || (playerPositionY+playerSpeedY<0 || playerPositionY+playerSpeedY+10>canvas.width)){
    playerSpeedX *= -0.8;
  }
  
  speed = Math.floor(points/10) + 1;
  if(speed > Math.abs(ballXSpeed)){
    ballXSpeed += 1;
    ballYSpeed += 1;
  }
}

function checkForColision(){
    if((ballY-radius < 0 || ballY+radius>canvas.height)){
        ballYSpeed *= -1;
    }
    else if(ballX - radius<0 ){
        gameOver = true;
    }
    else if (ballX + radius>canvas.width){
        ballXSpeed *= -1;
    }
    else if ((ballX - radius<playerPositionY+10) && (ballY - radius<playerPositionX+playerSize) && (ballY - radius>playerPositionX)){
        ballXSpeed *= -1;
        points += 1;
    }
}



function slowdown(){
    if(playerSpeedX>0){
        playerSpeedX -= 1;
    }
    if(playerSpeedX<0){
        playerSpeedX += 1;
    }
    if(Math.abs(playerSpeedX)<1){
        playerSpeedX = 0;
    }
    //console.log(playerSpeedX)
}


function keyDownHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
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
  