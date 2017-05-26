var moth;
var base_rad = 30;

function setup() {
    createCanvas(800, 800);
    moth = new Moth();
}

function draw() {
    background(51);        
    moth.fly();
}

function Moth() {
  this.rad = base_rad;
  this.pos = createVector(width/2, height/2)
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  

  this.update = function() {
    this.acc = createVector(chaos(), chaos()); 
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.slowdown();
    this.detectCollision();        
  }

  this.slowdown = function() {
    if(this.vel.x > 12) {
      console.log("Hit X brakes at " + this.vel.x);
      this.vel.x = this.vel.x/2;
    }
    if(this.vel.y > 12) {
      console.log("Hit Y brakes at " + this.vel.y);
      this.vel.y = this.vel.y/2;
    }

  }

  this.detectCollision = function() {

    // collision on left or right of canvas
    if(this.pos.x - this.rad <= 0 || this.pos.x + this.rad >= width)  {
      //reverse speed on x axis
      this.vel.x = this.vel.x*-1;
      this.acc.x = this.acc.x*-1;
    }

    // collision on top or botton of canvas
    if(this.pos.y - this.rad <= 0 || this.pos.y + this.rad >= height)  {
      //reverse speed on y axis
      this.vel.y = this.vel.y*-1;
      this.acc.y = this.acc.y*-1;
    }
  }

  this.fly = function() {
    this.update();
    this.renderMoth();    
  }

  this.renderMoth = function() {
    fill(color(255, 204, 0));
    this.rad = base_rad + 20*random(-1,1)
    ellipse(this.pos.x, this.pos.y, this.rad, this.rad+20);
    ellipse(this.pos.x+20, this.pos.y, this.rad, this.rad+20);
  }

  random1or0 = function() {
    return floor((random(-1,1) * 10))%2;
  }

  chaos = function() {
    return random(-3,3)*noise(random(100))*random1or0();
  }
}
