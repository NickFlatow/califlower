export class UI{
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Helvetica';
        this.fontColor = 'black';
    }
    draw(context){
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.fontAlign = 'left';
        // context.fillStyle = this.game.fontColor;
        context.fillStyle = this.fontColor;

        context.fillText('Score: ' + this.game.score,20,50);
    }
}