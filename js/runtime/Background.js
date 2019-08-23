import Sprite from "../base/Sprite.js";
import DataStore from "../base/DateStore.js";

class Background extends Sprite {
    constructor(){
        const img = Sprite.getImg('background');
        //获取画布的宽高
        const canvas = DataStore.getInstance().canvas;
        const width = canvas.width;
        const height = canvas.height;
        super(img,0,0,img.width,img.height,0,0,width,height);
    }
}
export default Background;