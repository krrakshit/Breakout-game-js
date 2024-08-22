const canvas = document.getElementById("breakout");
const ctx = canvas.getContext("2d");


let ballx = canvas.width/2
let bally = canvas.height/2
let ballRadius = 10;
let ballspeedX = 2
let ballspeedY = 2
let score = 0

function drawBall(){
    ctx.beginPath()
    ctx.arc(ballx,bally,ballRadius,0,Math.PI*2)
    ctx.fillStyle = "aquamarine"
    ctx.fill()
    ctx.strokeStyle = "aquamarine"
    ctx.stroke()
    ctx.closePath()
}

let paddleHeight = 20
let paddleWidth = 100
let paddlex = canvas.width/2 -paddleWidth/2
let paddley = canvas.height -paddleHeight -10
let paddlespeed = 15


function drawpaddle(){
    ctx.beginPath()
    ctx.rect(paddlex,paddley,paddleWidth,paddleHeight)
    ctx.fillStyle = "aquamarine"
    ctx.fill()
    ctx.strokeStyle = "aquamarine"
    ctx.stroke()
    ctx.closePath()
}


let brickrowcount = 6
let brickcolumncount = 10
let brickwidth = 75
let brickheight = 20
let margintop = 30
let marginfromleft = 30
let brickpadding = 10
let bricks = []
for(let c = 0;c<brickcolumncount;c++){
    bricks[c] = []
    for (let r = 0; r < brickrowcount; r++) {
        bricks[c][r] = {x :0,y :0,alive : 1};
        
    }
}
console.log(bricks)
 
function drawbricks(){
    for(let c = 0;c< brickcolumncount;c++){
        for(let r = 0;r<brickrowcount;r++){
          if(bricks[c][r].alive ===1){
            let brickx = (c*(brickwidth + brickpadding)) + marginfromleft
            let bricky = (r*(brickheight + brickpadding)) + margintop
            console.log(brickx,bricky)
            bricks[c][r].x = brickx
            bricks[c][r].y = bricky
            ctx.beginPath()
            ctx.rect(brickx,bricky,brickwidth,brickheight)
            ctx.fillStyle = "aquamarine"
            ctx.fill()
            ctx.strokeStyle = "aquamarine"
            ctx.stroke()
            ctx.closePath()
          } 
        }
    }
}

function detectcollision(){
    for(let c = 0;c< brickcolumncount;c++){
        for(let r = 0;r< brickrowcount;r++){
            let b = bricks[c][r]
            if(b.alive ===1){
if(ballx  > b.x && bally > b.y && ballx  <b.x + brickwidth && bally < b.y + brickheight){
    bricks[c][r].alive = 0
    ballspeedY = - ballspeedY
    score++
}
            }
        }
    }
}

function drawscore(){
    ctx.font = "16px Arial"
    ctx.fillStyle = "aquamarine"
    ctx.fillText("Score: "+score,800,20)
}


document.addEventListener("keydown",handlekey)
document.addEventListener("keyup",handlekey)

function handlekey(e){
    if(e.key === "ArrowLeft" && paddlex > 0){
        console.log("left")
        paddlex -= paddlespeed
    }
    else if (e.key === "ArrowRight" && paddlex + paddleWidth < canvas.width) {
        console.log("right")
        paddlex += paddlespeed
        
    }
}
function gamestart(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawBall()
    drawpaddle()
     drawbricks()
     drawscore()
     detectcollision()
     ballx += ballspeedX
     bally += ballspeedY
     if(bally-ballRadius < 0){
        ballspeedY = - ballspeedY
     }
     if(bally + ballRadius > canvas.height){
        document.location.reload()
     }
     if (ballx + ballRadius > canvas.width || ballx - ballRadius < 0){
        ballspeedX = - ballspeedX
     } 
     if(ballx + ballRadius > paddlex && bally +ballRadius > paddley && ballx + ballRadius < paddlex + paddleWidth){
        ballspeedY = - ballspeedY 
     }

     requestAnimationFrame(gamestart)
}
gamestart()