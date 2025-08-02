

var ball;
var myBall;
var balls;

var Engine = Matter.Engine;
    Render = Matter.Render;
    World = Matter.World;
    Bodies = Matter.Bodies;
    Constraint = Matter.Constraint;
    MouseConstraint = Matter.MouseConstraint;
    Mouse = Matter.Mouse;

var engine;
var ground;
var constraint1;
var poly1A;
var poly1B;

var poly2;
var constraint2;

var poly3;
var constraint3;

var canvas;


function setup(){
    
    canvas = createCanvas(900,600);
    engine = Engine.create();

    poly1A = Bodies.polygon(700,100, 6, 20);
    poly1B = Bodies.polygon(700,250, 1, 50);

    poly2 = Bodies.polygon(200,200, 5, 40);
    poly3 = Bodies.polygon(400,100, 4, 30);

    constraint1 = Constraint.create({
        bodyA: poly1A,
        pointA: {x:0, y:+20},
        bodyB: poly1B,
        pointB: {x:0, y:-50},
        stiffness: 0.01
    });

    ground = Bodies.rectangle(width/2,height-20,800,10, {isStatic: true, angle:0});

    World.add(engine.world, [ground, poly1A, poly1B, constraint1]);

    constraint2 = Constraint.create({
        pointA: {x:150, y:50},
        bodyB: poly2,
        pointB: {x:0, y:-20},
        length:300
    });

    World.add(engine.world, [poly2,  constraint2]);

      constraint3 = Constraint.create({
        pointA: {x:400, y:120},
        bodyB: poly3,
        pointB: {x:0, y:-10},
        stiffness: 0.001,
        dumping: 0.005
    });

    World.add(engine.world, [poly3,  constraint3]);

    var mouse = Mouse.create(canvas.elt);
    var mouseParams = {
        mouse: mouse
    };
    
    var mouseConstraint = MouseConstraint.create(engine, mouseParams);
    mouseConstraint.mouse.pixelRatio = pixelDensity();
    World.add(engine.world, mouseConstraint);

}

function draw(){
    background(0);
    Engine.update(engine);  

    fill(255);
    drawVertices(poly1A.vertices);
    drawVertices(poly1B.vertices);
    drawVertices(poly2.vertices);
    drawVertices(poly3.vertices);

    stroke(128);
    strokeWeight(3);
    drawConstraint(constraint1);
    drawConstraint(constraint2);
    drawConstraint(constraint3);

    fill(125);
    drawVertices(ground.vertices);


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

function drawConstraint(constraint){
    var offsetA = constraint.pointA;
    var posA = {x:0, y:0};
    if (constraint.bodyA){
        posA = constraint.bodyA.position;
    }
    var offsetB = constraint.pointB;
    var posB = {x:0, y:0};
    if (constraint.bodyB){
        posB = constraint.bodyB.position;
    }
    line(
        posA.x + offsetA.x,
        posA.y + offsetA.y,
        posB.x + offsetB.x,
        posB.y + offsetB.y
    );
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

