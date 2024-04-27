import BaseState from "./BaseState";
import StarmapComponent, {StarMapState} from "../Starmap/StarmapComponent";

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
        StarmapComponent.x = StarmapComponent.x + (this.targetX-StarmapComponent.x)*.02;
        StarmapComponent.y = StarmapComponent.y + (this.targetY-StarmapComponent.y)*.02;

        if(this.animTimer>250){
            StarmapComponent.x = this.targetX;
            StarmapComponent.y = this.targetY;
            StarmapComponent.instance.changeState(StarMapState.Idle);
        }
    }
    cancel(){

    }
}
