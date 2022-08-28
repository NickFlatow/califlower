import {Sitting, Running, Jumping, Falling} from './playerStates.js';

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
        
        this.states = [new Sitting(this),new Running(this),new Jumping(this),new Falling(this)];
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
        this.currentStates.handleInput(input);

        // horizontal movement
        this.x += this.speed;
        if (input.includes('ArrowRight')) {this.speed = this.maxSpeed;}
        else if (input.includes('ArrowLeft')) {this.speed = -this.maxSpeed;}
        else {this.speed = 0;}

        if (this.x < 0) {this.x = 0;}
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        
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
    onGround()
    {
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    setState(state,speed){
        this.currentStates = this.states[state];
        this.game.speed = speed * this.maxSpeed;
        this.currentStates.enter();
    }

}