

var ball;
var myBall;
var balls;

var Engine = Matter.Engine;
    Render = Matter.Render;
    World = Matter.World;
    Bodies = Matter.Bodies;

var engine;
var box1;
var ground1, ground2;
var boxes =[];
// var circle;
// var polygon;

function setup(){
    
    createCanvas(900,600);
    engine = Engine.create();

    box1 = Bodies.rectangle(200,200, 80, 80, {restitution: 0.8, friction: 0.01});
    polygon = Bodies.polygon(300, 0, 7, 30, {restitution: 0.8, friction: 0.01});
    circle = Bodies.circle(500,0,10, {restitution: 0.8, friction: 0.01});

    ground1 = Bodies.rectangle(100,200,500,10, {isStatic: true, angle:Math.PI*0.06});
    ground2 = Bodies.rectangle(500,500,500,10, {isStatic: true, angle:Math.PI*-0.06});
     
    World.add(engine.world, [box1, polygon, ground1, ground2]);

}

function draw(){
    background(0);
    Engine.update(engine);  

    fill("red");
    drawVertices(box1.vertices);
    drawVertices(polygon.vertices);

   fill(255);
   generateObject(width/2,0);

    for (var i =0; i<boxes.length; i++){
        drawVertices(boxes[i].vertices);

        if (isOffScreen(boxes[i])){
            World.remove(engine.world, boxes[i]);
            boxes.splice(i,1);
            i--;
        }
    }

    fill(125);
    drawVertices(ground1.vertices);
    drawVertices(ground2.vertices);


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

