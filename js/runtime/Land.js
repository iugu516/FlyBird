import Sprite from "../base/Sprite.js";
import DataStore from "../base/DateStore.js";

class Land extends Sprite{
    constructor(){
        const img = Sprite.getImg('land');
        const y = DataStore.getInstance().canvas.height-img.height;
        super(img,0,0,img.width,img.height,0,y,img.width,img.height);
        //地板的起点坐标
        this.landx=0;
    }
    //实现移动效果
    draw(){
        this.landx+=1;
        if(-this.img.width+DataStore.getInstance().canvas.width+this.landx>=0){
            this.landx=0;
        }
        super.draw(this.img,this.srcX,this.srcY,this.srcW,this.srcH,-this.landx,this.y,this.width,this.height);
    }
}
export default Land;