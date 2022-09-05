class Particle{
    constructor(game){
        this.game = game;
        this.markedForDeletion = false;
    }
    update(){
        this.x -= this.speedX + this.game.speed;
        this.y -= this.speedY;
        this.size *= 0.95; //decrease by 5%
        if(this.size < 0.5) this.markedForDeletion = true;
    }
}
export class Dust extends Particle{
    constructor(game,x,y){
        super(game);
        this.size = Math.random() * 10 + 10;
        this.x = x +30;
        this.y = y + ((this.game.player.height/2) + 18);
        this.speedX = Math.random();
        this.speedY = Math.random();
        // this.color = 'black';
        //transparent
        this.color = 'rgba(0,0,0,0.2)'

    }
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y,this.size,0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    }
}
export class Splash extends Particle{

}
//for original tail https://youtu.be/6ppfyWdoH3c?t=1653
//update fire from trail to circle surronding player
export class Fire extends Particle{
    constructor(game,x,y){
        super(game);
        this.image = document.getElementById('fire');
        this.size = Math.random() * 10 + 1 //between 10 and 1 px
        this.x = x + (this.game.player.width/2);
        this.y = y + (this.game.player.height/2);
        this.randomX = Math.random() * this.game.player.width + 0; // 100 and 0 px (width of player sprite)
        this.randomY = Math.random() * this.game.player.height + 0; // 92 and 0 px  (height of plaer sprite)
        // this.x = x;
        // this.y = y;
        this.speedX = 1; 
        this.speedY = 1;
        this.angle = 0;
        this.va = -1 * Math.random() * 0.2 - 0.1; //velocity of angel
    }
    update(){
        // super.update();
        this.x = this.game.player.x + (this.game.player.width/2);
        this.y = this.game.player.y + (this.game.player.height/2);
        this.size *= 0.95; //decrease by 5%
        if(this.size < 0.5) this.markedForDeletion = true;
        this.angle += this.va;
        // this.x += Math.sin(this.angle * 5);

    }
    draw(context){
        context.save();//only affect one fire particle
        
        context.translate(this.x,this.y);// translate context which is set at upper left corner of screen (0,0) to this.x this.y which is (0,0) of player
        context.rotate(this.angle);
        //image, x-cord, y-cord, height, width
        //use 0,0 becaseu translate set x and y of context to player x and y (line 58)
        // context.drawImage(this.image,0,0,this.size,this.size);
        context.drawImage(this.image,0,0,this.randomY,this.randomX);
        
        context.restore();//only affect on fire particle
    }
}