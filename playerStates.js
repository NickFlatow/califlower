const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4, 
    DIVING: 5,
    HIT: 6
}

class State
{
    constructor(state){
        this.state = state;
    }
}

export class Sitting extends State
{
    constructor(player){
        super('SITTING');
        this.player = player;
    }
    enter()
    {
        //stop blinking on state change
        this.player.frameX = 0;
        this.player.frameY = 5;
        this.player.maxFrame = 4;
    }
    handleInput(input)
    {
        if (input.includes('ArrowUp')){
            this.player.setState(states.JUMPING,1);
        }
        else if (input.includes('ArrowRight')){
            this.player.setState(states.RUNNING,1);
        }
        else if (input.includes('ArrowLeft') ){
            this.player.setState(states.RUNNING,-1);
        }
        else if (input.includes('Enter')){
            this.player.setState(states.ROLLING,2);
        }
    }
}
export class Running extends State
{
    constructor(player){
        super('RUNNING');
        this.player = player;
    }
    enter()
    {
        //reset from to first frame of row. (don't show any blank frames because of row lenght) stop blinking on state change
        this.player.frameX = 0;

        this.player.frameY = 3;
        this.player.maxFrame = 8
    }
    handleInput(input)
    {
        //check arrow down and remove for arrowRight and Left check for continous movement
        // if (input.includes('ArrowDown')){
        //     this.player.setState(states.SITTING,0);
        // }
        if (input.includes('ArrowUp')){
            this.player.setState(states.JUMPING,1);
        }
        //remove for continous movement
        else if (!input.includes('ArrowRight') && !input.includes('ArrowLeft')){
            this.player.setState(states.SITTING,0);
        } else if (input.includes('Enter')){
            this.player.setState(states.ROLLING,2);
        }

    }
}

export class Jumping extends State
{
    constructor(player){
        super('JUMPING');
        this.player = player;
    }
    enter()
    {
        //stop blinking on state change
        this.player.frameX = 0;
        if (this.player.onGround()) {this.player.vy -= this.player.jumpHeight;}
        this.player.frameY = 1;
        this.player.maxFrame = 6
    }
    handleInput(input)
    {
        // if ((input.includes('ArrowLeft') || input.includes('ArrowRight')) && this.player.onGround()){
        if(this.player.vy > this.player.weight){
            this.player.setState(states.FALLING,1);
        } else if (input.includes('Enter')){
            this.player.setState(states.ROLLING,2);
        }
        // else if (input.includes('ArrowUp')){
        //     this.player.setState(state.JUMPING);
        // }
    }
}
export class Falling extends State
{
    constructor(player){
        super('FALLING');
        this.player = player;
    }
    enter()
    {
        //stop blinking on state change
        this.player.frameX = 0;
        this.player.frameY = 2;
        this.player.maxFrame = 6;
    }
    handleInput(input)
    {
        if (this.player.onGround()){
            this.player.setState(states.RUNNING,1);
        }
    }
}
export class Rolling extends State
{
    constructor(player){
        super('ROLLING');
        this.player = player;
    }
    enter()
    {
        //stop blinking on state change
        this.player.frameX = 0;
        this.player.frameY = 6;
        this.player.maxFrame = 6;
    }
    handleInput(input)
    {
        if (!input.includes('Enter') && this.player.onGround()){
            this.player.setState(states.RUNNING,1);
        }else if (!input.includes('Enter') && !this.player.onGround()){
            this.player.setState(states.FALLING,1);
        } else if (input.includes('Enter') && input.includes('ArrowUp') && this.player.onGround()){
            this.player.vy -= 27;
        }
    }
}