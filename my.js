
class My{

     constructor(mouse){
        this.acceleration =  createVector(0,0);
        this.velocity =  createVector(0,0);
        this.location = mouse.copy();
        this.colors = ["yellow", "green", "blue"];
        this.picked = random(this.colors); // picks one of them
        this.size = random(5,40);
    }

    draw(){


        let c = color(this.picked);
       // c.setAlpha(random(50, 200));
        let d = dist(((width / 2) -50), ((height / 2)-25), this.location.x, this.location.y);

        if(d < this.size/2){
            c="red";
        }

        fill(c);
        ellipse(this.location.x, this.location.y, this.size, this.size);
    }



     run(){
        this.draw();
        this.move();
        this.bounce();
    }

    move(){

        this.velocity.add(this.acceleration);
      //  this.velocity.limit(5);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
      //  console.log(this.velocity.x + " " + this.velocity.y); 
    }

     apllyForce(force){
        this.acceleration.add(force);
    }

    bounce(){
        if(this.location.x>width-this.size/2){
            this.location.x = width - this.size/2;
            this.velocity.x *= -1;
      //      this.acceleration.x *= -1;
        } else if (this.location.x < this.size/2){
            this.location.x = this.size / 2;
            this.velocity.x *= -1;
    //        this.acceleration.x *= -1;
        }
        if (this.location.y > height-this.size/2){
            this.location.y = height - this.size/2;
            this.velocity.y *= -1;
          
      //      this.acceleration.y *= -1;
       
        } else if(this.location.y < this.size/2){
            this.location.y = this.size/2;
            this.velocity.y *= -1;
      //      this.acceleration.y *= -1;
        }
    }

}
 