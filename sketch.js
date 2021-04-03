var database; 
var ball, position;

function setup(){

    //initialize database
    database = firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";


    var ballPosition = database.ref('ball/position');
    // .on = reading value from database
    ballPosition.on("value", readPosition, showError);

}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    // .ref = for referring to the child/ field
    //.set = to write data to the database
    database.ref('ball/position').set({
        'x':position.x + x,
        'y':position.y + y
    })
}


function readPosition(data){
    // all positions stored in the variable 'position'
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

function showError(){
    console.log("Error in writing the database");
}