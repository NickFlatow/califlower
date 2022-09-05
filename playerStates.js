import {Dust,Fire} from './particle.js';

const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4,
    STANDING: 5,
    DIVING: 6,
    HIT: 7
}

class State
{
    constructor(state,game){
        this.state = state;
        this.game = game;
    }
}

export class Sitting extends State
{
    constructor(game){
        super('SITTING',game);
        
    }
    enter()
    {
        //stop blinking on state change
        this.game.player.frameX = 0;
        this.game.player.frameY = 5;
        this.game.player.maxFrame = 4;
    }
    handleInput(input)
    {
        if (input.includes('ArrowUp')){
            this.game.player.setState(states.JUMPING,1);
        }
        else if (input.includes('ArrowRight')){
            this.game.player.setState(states.RUNNING,1);
        }
        else if (input.includes('ArrowLeft') ){
            this.game.player.setState(states.RUNNING,-1);
        }
        else if (input.includes('Enter')){
            this.game.player.setState(states.ROLLING,2);
        }
    }
}

export class Running extends State
{
    constructor(game){
        super('RUNNING',game);
        
    }
    enter()
    {
        //reset from to first frame of row. (don't show any blank frames because of row lenght) stop blinking on state change
        this.game.player.frameX = 0;

        this.game.player.frameY = 3;
        this.game.player.maxFrame = 8
    }
    handleInput(input)
    {
        //check arrow down and remove for arrowRight and Left check for continous movement
        // if (input.includes('ArrowDown')){
        //     this.game.player.setState(states.SITTING,0);
        // }
        this.game.particles.push(new Dust(this.game,this.game.player.x,this.game.player.y));
        if (input.includes('ArrowUp')){
            this.game.player.setState(states.JUMPING,1);
        }
        //remove for continous movement
        else if (!input.includes('ArrowRight') && !input.includes('ArrowLeft')){
            this.game.player.setState(states.STANDING,0);
        } else if (input.includes('Enter')){
            this.game.player.setState(states.ROLLING,2);
        }

    }
}

export class Jumping extends State
{
    constructor(game){
        super('JUMPING',game);
    }
    enter()
    {
        //stop blinking on state change
        this.game.player.frameX = 0;
        if (this.game.player.onGround()) {this.game.player.vy -= this.game.player.jumpHeight;}
        this.game.player.frameY = 1;
        this.game.player.maxFrame = 6
    }
    handleInput(input)
    {
        // if ((input.includes('ArrowLeft') || input.includes('ArrowRight')) && this.game.player.onGround()){
        if(this.game.player.vy > this.game.player.weight){
            this.game.player.setState(states.FALLING,1);
        } else if (input.includes('Enter')){
            this.game.player.setState(states.ROLLING,2);
        }
        // else if (input.includes('ArrowUp')){
        //     this.game.player.setState(state.JUMPING);
        // }
    }
}
export class Falling extends State
{
    constructor(game){
        super('FALLING',game);
    }
    enter()
    {
        //stop blinking on state change
        this.game.player.frameX = 0;
        this.game.player.frameY = 2;
        this.game.player.maxFrame = 6;
    }
    handleInput(input)
    {
        if (this.game.player.onGround()){
            this.game.player.setState(states.RUNNING,1);
        }
    }
}
export class Rolling extends State
{
    constructor(game){
        super('ROLLING',game);
    }
    enter(){
        //stop blinking on state change
        this.game.player.frameX = 0;
        this.game.player.frameY = 6;
        this.game.player.maxFrame = 6;
    }
    handleInput(input)
    {
        this.game.particles.push(new Fire(this.game,this.game.player.x,this.game.player.y));
        if (!input.includes('Enter') && this.game.player.onGround()){
            this.game.player.setState(states.STANDING,0);
        }else if (!input.includes('Enter') && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING,1);
        } else if (input.includes('Enter') && input.includes('ArrowUp') && this.game.player.onGround()){
            this.game.player.vy -= 27;
        }
    }
}
export class Standing extends State
{
    constructor(game){
        super('STANDING',game);
        
    }
    enter()
    {
        //stop blinking on state change
        this.game.player.frameX = 0;
        this.game.player.frameY = 0;
        this.game.player.maxFrame = 6;
    }
    handleInput(input)
    {
        if (input.includes('ArrowUp')){
            this.game.player.setState(states.JUMPING,1);
        }
        else if (input.includes('ArrowDown')){
            this.game.player.setState(states.SITTING,0);
        }
        else if (input.includes('ArrowRight')){
            this.game.player.setState(states.RUNNING,1);
        }
        else if (input.includes('ArrowLeft') ){
            this.game.player.setState(states.RUNNING,-1);
        }
        else if (input.includes('Enter')){
            this.game.player.setState(states.ROLLING,2);
        }
    }
}