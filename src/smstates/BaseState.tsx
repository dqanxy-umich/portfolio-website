import Starmap from "../Starmap";

//Not react components.
export default abstract class BaseState{
    animTimer:number;
    constructor(){
        this.animTimer = 0;
    }
    baseStart(){
        this.animTimer = 0;
        this.start();
    }
    abstract start():void
    baseUpdate(){
        this.update();
        this.animTimer++;
    }
    abstract update():void;
    cancel(){}

}
