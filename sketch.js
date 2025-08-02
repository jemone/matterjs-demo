

var ball;
var myBall;
var balls;

var Engine = Matter.Engine;
    Render = Matter.Render;
    World = Matter.World;
    Bodies = Matter.Bodies;
    Body = Matter.Body;

var engine;
var box1;
var ground;
var boxes =[];
var propeller;
var angle = 0;
var angleSpeed = 0.1;


function setup(){
    
    createCanvas(900,600);
    engine = Engine.create();

   // box1 = Bodies.rectangle(200,200, 80, 80, {restitution: 0.8, friction: 0.01});
   // World.add(engine.world, [box1]);
    // polygon = Bodies.polygon(550, 0, 7, 15, {restitution: 0.8, friction: 0.01});
    // circle = Bodies.circle(500,0,10, {restitution: 0.8, friction: 0.01});


    
    ground = Bodies.rectangle(500,500,500,10, {isStatic: true, angle:Math.PI*-0.06});
    World.add(engine.world, [ground]);

    propeller = Bodies.rectangle(width/2, height/2, 300, 15, {isStatic:true, angle:angle});
    World.add(engine.world, [propeller]);
}

function draw(){
    background(0);
    Engine.update(engine);  

    fill(255);


   if (random(1) < 0.2) generateObject(width/2,0);

    for (var i =0; i<boxes.length; i++){
        drawVertices(boxes[i].vertices);

        if (isOffScreen(boxes[i])){
            World.remove(engine.world, boxes[i]);
            boxes.splice(i,1);
            i--;
        }
    }

    fill(125);
    drawVertices(ground.vertices);
    drawVertices(propeller.vertices);

    Body.setAngle(propeller,angle);
    Body.setAngularVelocity(propeller,angleSpeed);
    angle = angle + angleSpeed;


}

function generateObject(x, y){

    var b = Bodies.rectangle(x,y, random(10,30), random(10,30),{restitution: 0.8, friction: 0.5});
    boxes.push(b);
    World.add(engine.world, [b]);

}

function isOffScreen(body){
    var pos = body.position;
    return (pos.y>height || pos.x < 0 || pos.x > width);
}

function drawVertices(vertices){
    beginShape();
    for (var i =0; i<vertices.length; i++){
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape(CLOSE);
}





function intBall(){
     var mouse = createVector(mouseX, mouseY);

    if (mouseIsPressed && mouseButton === LEFT){    
        balls.push(new My(mouse));
    }

    
    fill("gray");
    rect(width / 2 -50, height / 2 -25, 100, 50);

    for(var i=0; i<balls.length; i++)
        {
        var gravity = createVector(0, 0.1);
        var b = balls[i];
        b.apllyForce(gravity);
        var friction = b.velocity.copy();
        friction.mult(-1);
        friction.normalize();
        friction.mult(0.02);
        b.apllyForce(friction);
        b.run();
    }
}

