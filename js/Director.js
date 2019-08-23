import DataStore from "./base/DateStore.js";
import UpPipe from "./runtime/UpPipe.js";
import DownPipe from "./runtime/DownPipe.js";
import {stopmusic} from './wxAPI.js';

//控制游戏逻辑

class Director{
    constructor(){
        this.dataStore = DataStore.getInstance();
        this.scoreSwitch = true;
    }
    static getInstance(){
        if(!Director.instance){
            Director.instance = new Director();
        }
        return Director.instance;
    }
    //小鸟向上飞
    birdsUp(){
        for(let i=0;i<3;i++){
            this.dataStore.get('birds').y[i]=this.dataStore.get('birds').birdsy[i];
        }
        this.dataStore.get('birds').time=0;
    }
    //创建水管组
    createPipes(){
        const minTop = this.dataStore.canvas.height/8;
        const maxTop = this.dataStore.canvas.height/2;
        let top = Math.floor(Math.random()*(maxTop-minTop))+minTop;
        this.dataStore.get('pipes').push(new UpPipe(top));
        this.dataStore.get('pipes').push(new DownPipe(top));
    }
    //判断小鸟与水管是否碰撞
    isStrike(bird,pipe){
        let f = true;// 假设撞到了
        if(bird.bottom<pipe.top || bird.top>pipe.bottom || bird.right<pipe.left || bird.left>pipe.right){
            f=false;
        }
        return f;
    }
    check(){
        const birds = this.dataStore.get('birds');
        const land = this.dataStore.get('land');
        const pipes = this.dataStore.get('pipes');
        const score =  this.dataStore.get('score');
        if(birds.birdsy[0]<0 || birds.birdsy[0]+birds.birdsheight[0]>land.y){
            this.isGameover =true;
            return;
        }
        const birdBorder={
            top:birds.birdsy[0],
            bottom:birds.birdsy[0]+birds.birdsheight[0],
            left:birds.birdsx[0],
            right:birds.birdsx[0]+birds.birdswidth[0]
        }
        for(let i=0;i<pipes.length;i++){
            let p = pipes[i];
            const pipeBorder={
                top:p.y,
                bottom:p.y+p.height,
                left:p.x,
                right:p.x+p.width
            }
            if(this.isStrike(birdBorder,pipeBorder)){
                this.isGameover = true;
                return;
            }
            if(birdBorder.left>pipes[0].x+pipes[0].width && this.scoreSwitch){
                score.scoreNumber++;
                playthrough();
                this.scoreSwitch = false;
                let level = this.dataStore.get('level');
                if(score.scoreNumber%8==0){
                    level++;
                }
                if(level>10){
                    level=10;
                }
                this.dataStore.put('level',level);
            }
        }
    }
    run(){
        this.check();
        if(!this.isGameover){
            this.dataStore.get('background').draw();
            const pipes = this.dataStore.get('pipes');
            //删除已经出界的水管
            if(pipes[0].x+pipes[0].width<0 && pipes.length==4){
                pipes.shift();
                pipes.shift();
                this.scoreSwitch = true;
            }
            //当前一组水管移动到中间时 创建一组新的水管
            if(pipes[0].x<(this.dataStore.canvas.width-pipes[0].width)/2 && pipes.length==2){
                this.createPipes();
            }
            pipes.forEach(p=>p.draw());
            this.dataStore.get('score').draw();
            this.dataStore.get('birds').draw();
            this.dataStore.get('land').draw();
            this.id = requestAnimationFrame(()=>this.run());
        }else{
          stopmusic()
            cancelAnimationFrame(this.id);
            this.dataStore.get('startButton').draw();
            const ctx = this.dataStore.ctx;
            const canvas = this.dataStore.canvas;
            ctx.font= '40px 黑体';
            ctx.fillStyle = 'red';
            ctx.fillText(
                'GameOver!',
                canvas.width/3,
                canvas.height/6
            );
            //游戏结束后，清空游戏的数据
            this.dataStore.destroy();
        }
    }
}
export default Director;