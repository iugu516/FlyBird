import Sprite from "../base/Sprite.js";
import DataStore from "../base/DateStore.js";

class Pipe extends Sprite{
    constructor(img,top){
        const x = DataStore.getInstance().canvas.width;
        super(img,0,0,img.width,img.height,x,0,img.width,img.height);
        this.top=top;
    }
    draw(){
        this.x-=1;
        super.draw();
    }
}
export default Pipe;