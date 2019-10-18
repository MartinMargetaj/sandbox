
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
setInterval(update_pos, 10);
x = 20;
y = 50;
dx = 2;
dy = 2;
now = false;
color = "#ffffff";
function update_pos(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw_rectangle(x,y,30,20,color);
  x += dx;
  y += dy;
  now = false;
  if(x<0 || x+30>canvas.width){
    dx *= -1;
    now = true;
  }
  else if(y<0 || y+20>canvas.height){
    dy *= -1;
    now = true;
  }
  if(now){
    temp_num = Math.floor(Math.random() * 4);
    switch(temp_num) {
      case 1:
          if (0 == color.localeCompare("#ffffff")){
            color = "#ff0000";
          }
          else{
            color = "#ffffff";
          }
        break;
      case 2:
        if (0 == color.localeCompare("#ff0000")){
          color = "#00ff00";
        }  
        else{
          color = "#ff0000";
        }
        break;
      case 3:
        if (0 == color.localeCompare("#00ff00")){
          color = "#0000ff";
        }
        else{
          color = "#00ff00";
        }
        break;
      case 4:
          if (0 == color.localeCompare("#0000ff")){
            color = "#ffffff";
          }
          else{
            color = "#0000ff";
          }
          
        break;
      
        // code block
    } 
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




