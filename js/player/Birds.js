import Sprite from "../base/Sprite.js";
import DataStore from "../base/DateStore.js";

class Birds extends Sprite{
    constructor(){
        const img = Sprite.getImg('birds');
        super(img,0,0,img.width,img.height,0,0,img.width,img.height);
        //剪切小鸟的三种状态
        //小鸟的宽34 高24 上下边距10  左右边距9
        this.clippingx = [9,61,113];
        this.clippingy = [10,10,10];
        this.clippingw = [34,34,34];
        this.clippingh = [24,24,24];
        const canvas = DataStore.getInstance().canvas;
        const birdx = canvas.width/4;
        this.birdsx= [birdx,birdx,birdx];//小鸟初始X
        const birdy = canvas.height/2;
        this.birdsy =  [birdy,birdy,birdy];//小鸟初始y
        this.birdswidth = [34,34,34];
        this.birdsheight = [24,24,24];
        this.y = [birdy,birdy,birdy];
        this.index = 2;//数组下标的切换
        this.count = 0;//配合计数
        this.time = 0;//配合计时
    }
    draw(){
        const speed =0.2;
        this.count+=speed;
        if(this.count>=2){
            this.count=0;
        }
        this.index = Math.floor(this.count);
        // 自由落体
        const g = 0.098;
        const offset = 40;//向上偏移量
        let offy = g*this.time*(this.time-offset)/2;
        for(let i=0;i<=2;i++){
            this.birdsy[i]=this.y[i]+offy;
        }
        this.time++;
        super.draw(
            this.img,
            this.clippingx[this.index],
            this.clippingy[this.index],
            this.clippingw[this.index],
            this.clippingh[this.index],
            this.birdsx[this.index],
            this.birdsy[this.index],
            this.birdswidth[this.index],
            this.birdsheight[this.index]
        );
    }
}
export default Birds;