import Pipe from "./Pipe.js";
import Sprite from "../base/Sprite.js";
import DataStore from "../base/DateStore.js";

class DownPipe extends Pipe{
    constructor(top){
        const img = Sprite.getImg('pieDown');
        super(img,top);
        this.level = DataStore.getInstance().get('level');
    }
    draw(){
        this.y = this.top+DataStore.getInstance().canvas.height/this.level;
        super.draw();
    }
}
export default DownPipe;