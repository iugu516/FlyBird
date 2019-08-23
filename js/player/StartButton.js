import Sprite from "../base/Sprite.js";
import DataStore from "../base/DateStore.js";

class StartButton extends Sprite{
    constructor(){
        const img = Sprite.getImg('startButton');
        const canvas = DataStore.getInstance().canvas;
        const land = DataStore.getInstance().get('land');
        let x = (canvas.width-img.width)/2;
        let y = (canvas.height-land.height-img.height)/2;
        super(img,0,0,img.width,img.height,x,y,img.width,img.height);
    }
}

export default StartButton;