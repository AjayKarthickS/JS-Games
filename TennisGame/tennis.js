var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;
var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;
var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 3;
var showWinScreen = false;

function calculateMousePos(evt){
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x:mouseX,
    y:mouseY
  };
}

function handleMouseClick(){
  if(showWinScreen){
    player1Score = 0;
    player2Score = 0;
    showWinScreen = false;
  }
}

window.onload = function(){
    console.log("Ajay");
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    var framesPerSecond = 30;
    setInterval(function() {
      moveEverything();
      drawEverything();
    },1000/framesPerSecond );
    canvas.addEventListener('mousedown',handleMouseClick);
    canvas.addEventListener('mousemove',function(evt){
        var mousePos = calculateMousePos(evt);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT/2); //subtract half the height of the paddle to get the hold of center of paddle
    });
}

function ballReset(){
  if(player1Score >= WINNING_SCORE ||
     player2Score >= WINNING_SCORE){
    showWinScreen = true;
  }
  ballSpeedX = -ballSpeedX;
  ballX = canvas.width/2;
  ballY = canvas.height/2;
}

function computerMovement(){
  var paddle2CenterY = paddle2Y + (PADDLE_HEIGHT/2);
  if(paddle2CenterY < ballY-35)
    paddle2Y += 6;
  else if(paddle2CenterY > ballY+35)
    paddle2Y -= 6;
}

function moveEverything(){
  if(showWinScreen)
    return;
  computerMovement();
  ballX = ballX + ballSpeedX;
  ballY = ballY+ ballSpeedY;
  if(ballX < 0){
    if(ballY > paddle1Y &&
      ballY < paddle1Y+PADDLE_HEIGHT){
      ballSpeedX = -ballSpeedX;
      var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
      ballSpeedY = deltaY * 0.35;
    }
    else{
      player2Score++; // Increase score and then reset the ball
      ballReset();
    }
  }
  if(ballX > canvas.width){
    if(ballY > paddle2Y &&
      ballY < paddle2Y+PADDLE_HEIGHT){
      ballSpeedX = -ballSpeedX;
      var deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);
      ballSpeedY = deltaY * 0.35;
    }
    else{
      player1Score++; // Increase score and then reset the ball
      ballReset();
    }
  }
  if(ballY > canvas.height || ballY < 0){
    ballSpeedY = -ballSpeedY;
  }
}

function drawNet(){
    for(var i = 0; i < canvas.height; i+=40){
      colorRect((canvas.width/2)-1,i,2,20,'white');
    }
}

function drawEverything(){
    //Game Area
    colorRect(0,0,canvas.width,canvas.height,'black');
    //Win Screen
    if(showWinScreen){
      canvasContext.fillStyle = 'white';
      if(player1Score >= WINNING_SCORE){
        canvasContext.fillText("Left Player Won",350,200);
      }
      else if(player2Score >= WINNING_SCORE){
        canvasContext.fillText("Right Player Won",350,200);
      }
      canvasContext.fillText("Click to continue",350,500);
      return;
    }
    //Middle net
    drawNet();
    //Left Player Panel
    colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
    //rigth computer Player Panel
    colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
    //Ball
    colorCircle(ballX,ballY,10);
    canvasContext.fillText(player1Score,100,100);
    canvasContext.fillText(player2Score,canvas.width-100,100);
}

function colorCircle(centerX, centerY, radius,drawColor){
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
  canvasContext.fill();
}

function colorRect(leftX,topY,width,height,drawColor){
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX,topY,width,height);
}
