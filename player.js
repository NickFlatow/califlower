import {Sitting, Running, Jumping, Falling,Rolling} from './playerStates.js';

export class Player
{
    constructor(game)
    {
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        //vertical velocity
        this.vy = 0; //height off the ground
        this.weight = 1;
        this.jumpHeight = 20;

        //horizontal velocity
        this.speed = 0;
        this.maxSpeed = 10;
        
        this.image = document.getElementById('player');
        
        this.states = [new Sitting(this),new Running(this),new Jumping(this),new Falling(this), new Rolling(this)];
        this.currentStates = this.states[0];
        this.currentStates.enter();

        //sprite sheet frame animation
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
    }
    
    update(input,deltaTime)
    {
        this.checkCollision();
        let test = document.getElementById("player_coords");
        test.innerHTML = "X: "+this.x + " Y: " + this.y;
        this.currentStates.handleInput(input);

        // horizontal movement
        this.x += this.speed;
        if (input.includes('ArrowRight')) {
            this.speed = this.maxSpeed;
        }
        else if (input.includes('ArrowLeft')) {
            this.speed = -this.maxSpeed;
        }
        //stop screen when not moving
        else {this.speed = 0;}

        //game boundries
        if (this.x < -200) {
            this.x = -200;
            if (this.currentStates != this.states[4]) {this.game.speed = 0;}
        }
        if (this.x > this.game.width/2 - this.width) {this.x = this.game.width/2 - this.width;}
        
        // vertical movement
        this.y += this.vy;
        if (!this.onGround()) {this.vy += this.weight;}
        else this.vy = 0;

        //sprite animation
        if (this.frameTimer > this.frameInterval)
        {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) {this.frameX++}
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }

    }
    draw(context)
    {
        //if we are in debug mode add the hit test rectangle around the playe 
        if (this.game.debug) { context.strokeRect(this.x, this.y, this.width, this.height);}
        //full explination of drawing the sprite to the screen https://youtu.be/c-1dBd1_G8A?t=880

        //draw rectangle
        // context.fillRect(this.x,this.y,this.width,this.height);

        /*draw sprite from sprite sheet*/
        //this.player reference sprite sheet saved to assets defined in index.html
        //this.frameX,this.frameY crops the uppper left hand side of the sprite sheet
        //uses the width and height for the crop defined in this class
        //this.x and this.y places the sprite on the page at the bottom of our canvas
        //this.height and this.width defines how much to scale the image
        context.drawImage(this.image,this.frameX * this.width,this.frameY * this.height,this.width,this.height,this.x,this.y,this.height,this.width);
    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    setState(state,speed){
        this.currentStates = this.states[state];
        this.game.speed = speed * this.maxSpeed;
        this.currentStates.enter();
    }
    checkCollision(){
        // https://youtu.be/6ppfyWdoH3c?t=281
        //sprite cell (this.x,this.y) (0,0) starts in the upper left hand corner
        //this.x + this.width is the upper right hand corner
        this.game.enemies.forEach(enemy => {
            if(
                enemy.x < this.x + this.width && //enemies left side overlaps player's right side
                enemy.x + enemy.width > this.x && 
                enemy.y < this.y + this.height && //enemy and player hit - not above or below
                enemy.y + enemy.height > this.y
              ){
                enemy.markedForDeletion = true;
                this.game.score++;
            }else{

            }
            
        })
    }

}