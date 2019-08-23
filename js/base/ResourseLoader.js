import {Resourses} from "./Resourses.js";
class ResourseLoader{
    constructor(){
        this.map = new Map(Resourses);
        for(let [key,val] of this.map){
            // const img =new Image();
            const img = wx.createImage();
            img.src=val;
            this.map.set(key,img);
        }
    }
    //加载图片完成的方法
    onloaded(callback){
        let count =0;//计数
        for(let img of this.map.values()){//遍历所有的值
            img.onload=()=>{// 图片加载事件
                count++;
                if(count>=this.map.size){
                    callback(this.map);//加载完成 返回数据
                }
            }
        }
    }
}
export default ResourseLoader;