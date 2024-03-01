import BaseState from "./BaseState";
import Starmap, {StarMapState} from "../Starmap";

//Not react components.
export default class MovingState extends BaseState{

    targetX:number
    targetY:number
    constructor(){
        super();
        this.targetX = 100
        this.targetY = 100
    }
    start(){

    }
    update(){
        Starmap.x = Starmap.x + (this.targetX-Starmap.x)*.02;
        Starmap.y = Starmap.y + (this.targetY-Starmap.y)*.02;

        if(this.animTimer>150){
            Starmap.x = this.targetX;
            Starmap.y = this.targetY;
            Starmap.instance.changeState(StarMapState.Idle);
        }
    }
    cancel(){

    }
}
