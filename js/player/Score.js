import DataStore from "../base/DateStore.js";

class Score{
    constructor(){
        this.dataStore = DataStore.getInstance();
        this.ctx = this.dataStore.ctx;
        this.scoreNumber = 0;
    }
    draw(){
        let canvas = this.dataStore.canvas;
        this.ctx.font= '30px 黑体';
        this.ctx.fillStyle = '#ccc';
        this.ctx.fillText(
            this.scoreNumber,
            canvas.width/2,
            canvas.height/16
        );
    }   
}
export default Score;