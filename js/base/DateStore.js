class DataStore{
    constructor(){
        this.map = new Map();
    }
    //单例模式
    static getInstance(){
        if(!DataStore.instance){
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }
    put(key,val){
        this.map.set(key,val);
        return this;
    }
    get(key){
        return this.map.get(key);
    }
    destroy(){
        for(let val of this.map.values()){
            val=null;
        }
    }
}
export default DataStore;