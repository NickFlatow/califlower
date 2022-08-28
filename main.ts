import {Player} from './player.js'
import {InputHandler} from './input.js'
import {Background} from './background.js'

window.addEventListener('load',function()
{
    const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
    
    const ctx = canvas.getContext('2d');
    
    canvas.width = 500;
    canvas.height = 500;

    class Game
    {
        width:number;
        height:number;
        speed:number;
        maxSpeed:number;
        groundMargin:number;
        background:Background;
        player:Player;
        input:InputHandler;

        constructor(width:number,height:number){
            this.width = width;
            this.height = height
            this.speed = 0;
            this.maxSpeed = 4;
            this.groundMargin = 80;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler();
            
        }
        update(deltaTime:number)
        {
            this.background.update();
            this.player.update(this.input.keys,deltaTime);
        }
        draw(context:CanvasRenderingContext2D)
        {
            this.background.draw(context);
            this.player.draw(context)
        }
    }

    const game = new Game(canvas.width,canvas.height);
    console.log(game);
    let lastTime = 0;


    function animate(timeStamp)
    {
        if(!ctx){throw "Canvas Rendering Context 2D is null 😒";}
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        // console.log(deltaTime);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        //generate timeStamp
        requestAnimationFrame(animate);
    }
    animate(0);
})