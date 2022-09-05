import {Player} from './player.js'
import {InputHandler} from './input.js'
import {Background} from './background.js'
import {FlyingEnemy,GroundEnemy,ClimbingEnemy} from './enemy.js'
import {UI} from './UI.js'

window.addEventListener('load',function()
{
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;
    // canvas.width = 1000;
    // canvas.height = 1000;


    class Game
    {
        constructor(width,height){
            this.width = width;
            this.height = height
            this.speed = 0;
            this.maxSpeed = 4;
            this.groundMargin = 80;

            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            
            this.particles = [];
            this.maxParticles = 50;

            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;//ms

            // this.fontColor = 'black';
            
            this.debug = true;
            this.score = 0;


            this.player.currentStates = this.player.states[0];
            this.player.currentStates.enter();
    
            
        }
        update(deltaTime)
        {
            this.background.update();
            this.player.update(this.input.keys,deltaTime);
            // handle enemies
            if(this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
                if(enemy.markedForDeletion) {this.enemies.splice(this.enemies.indexOf(enemy),1)}
            })
            //refactor loop to inside particle
            this.particles.forEach((particle,index) => {
                particle.update();
                if (particle.markedForDeletion) { this.particles.splice(index,1);}
            });
            
            if (this.particles.length > this.maxParticles) {
                this.particles = this.particles.slice(0,this.maxParticles);//allow only 50 particles
            }
            // console.log(this.particles);
        }
        draw(context)
        {
            this.background.draw(context);
            this.player.draw(context);
            
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.particles.forEach(particle => {
                particle.draw(context);
            });
            this.UI.draw(context);
            
            
        }
        addEnemy(){
            //add only if we are moving
            if(this.speed > 0 && Math.random() < 0.5) {this.enemies.push(new GroundEnemy(this))}
            if(this.speed > 0) {this.enemies.push(new ClimbingEnemy(this))}  
            this.enemies.push(new FlyingEnemy(this));
            // console.log(this.enemies);
        }
    }

    const game = new Game(canvas.width,canvas.height);
    // console.log(game);
    let lastTime = 0;

    //game runs at 60fps deltaTime should be like 16.6 which is a frame every 16.6ms
    function animate(timeStamp)
    {
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