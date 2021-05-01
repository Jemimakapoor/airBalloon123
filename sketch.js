var ball1,ballPos,position,database;

function preload(){
    backGround=loadImage("backGround.png")
    balloon=loadImage("balloon.png")
}

function setup(){
    createCanvas(800,500);
    ball1 = createSprite(250,250,10,10);
    ball1.shapeColor = "red";
    ball1.addImage (balloon)

    database=firebase.database()
    ballPos=database.ref("balloon/position")
    ballPos.on("value",readPos,showError)
}



function readPos(data){
    position=data.val()
    console.log(position)
    ball1.x=position.x
    ball1.y=position.y

}

function showError(){
    console.log("there is an error")
}

function draw(){
    background(backGround);
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
        ball1.scale-=0.1
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
        ball1.scale+=0.1
    }
    drawSprites();
}

function changePosition(x,y){
   database.ref("balloon/position").set({
       x:position.x+x,
       y:position.y+y
   })
}
