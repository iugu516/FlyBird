import ResourseLoader from "./js/base/ResourseLoader.js";
import DataStore from "./js/base/DateStore.js";
import Background from "./js/runtime/Background.js";
import Director from "./js/Director.js";
import Land from "./js/runtime/Land.js";
import Birds from "./js/player/Birds.js";
import Score from "./js/player/Score.js";
import StartButton from "./js/player/StartButton.js";

//控制主流程
class Main{
    constructor(){
        this.loader = new ResourseLoader();
        // this.canvas = document.getElementById('game');
        this.canvas = wx.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.loader.onloaded(map=>this.onResourseLoaded(map));
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
    }
    //资源加载成功
    onResourseLoaded(map){
        //不会销毁的数据
        this.dataStore.canvas = this.canvas;
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        this.init();
    }
    //游戏初始化
    init(){
        this.director.isGameover = false;
        //游戏中初始化的数据定期销毁，所以先保存
        this.dataStore
                .put('background',new Background())
                .put('land',new Land())
                .put('pipes',[])
                .put('birds',new Birds())
                .put('score',new Score())
                .put('level',4)
                .put('startButton',new StartButton());
        this.event();
        //调用run方法之前先调用createpipes
        this.director.createPipes();
        this.director.run();
    }
    event(){
        // this.canvas.addEventListener('touchstart',()=>{
          wx.onTouchStart(()=>{
            if(this.director.isGameover){
                this.init();
            }else{
                this.director.birdsUp();
            }
        });
    }
}
export default Main;