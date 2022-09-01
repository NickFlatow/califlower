export class InputHandler
{
    constructor(game){
        this.game = game;
        this.keys = [];
        window.addEventListener('keydown',e => {
            //indexOf() === -1 not in array
            if(( e.key === 'ArrowDown' ||
                 e.key === 'ArrowUp'  ||
                 e.key === 'ArrowLeft' ||
                 e.key === 'ArrowRight' ||
                 e.key === 'Enter' ||
                 e.key === 'Space'
                ) && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);

                //debug mode
            }else if (e.key === 'd'){ this.game.debug = !this.game.debug}
    
        });
        window.addEventListener('keyup',e =>{
            if( e.key === 'ArrowDown' || 
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'Enter' ||
                e.key === 'Space' 
            ){
                this.keys.splice(this.keys.indexOf(e.key),1);
            }

        });
    }
}