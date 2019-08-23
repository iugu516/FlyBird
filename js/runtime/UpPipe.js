import Sprite from "../base/Sprite.js";
import Pipe from "./Pipe.js";

class UpPipe extends Pipe{
    constructor(top){
        const img =Sprite.getImg('pieUp');
        super(img,top);
    }
    //决定水管起始高度
    draw(){
        this.y=this.top-this.height;
        super.draw();
    }
}
export default UpPipe;