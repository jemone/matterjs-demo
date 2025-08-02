class Ball{

    constructor(){
        this.acceleration =  createVector(0,0);
        this.velocity =  createVector(0,0);
        this.location = createVector(width/2, height/2); // correct
        this.size = 40;
    }

    run(){
        this.draw();
        this.move();
        this.bounce();
    }

    draw(){
        fill(255);
        ellipse(this.location.x, this.location.y, this.size, this.size);
    }

    move(){
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
        this.velocity.limit(3);
    }

    bounce(){
        if(this.location.x>width-this.size/2){
            this.location.x = width - this.size/2;
            this.velocity.x *= -1;
            this.acceleration.x *= -1;
        } else if (this.location.x < this.size/2){
            this.velocity.x *= -1;
            this.location.x = this.size/2;
            this.acceleration.x *= -1;
        }
        if (this.location.y > height-this.size/2){
            this.location.y = height - this.size/2;
            this.velocity.y *= -1;
            this.acceleration.y *= -1;
        } else if(this.location.y < this.size/2){
            this.velocity.y = this.size/2;
            this.velocity.y *= -1;
            this.acceleration.y *= -1;
        }
    }

    apllyForce(force){
        this.acceleration.add(force);
    }

}