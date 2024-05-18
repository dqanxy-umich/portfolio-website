import BaseState from "./BaseState";
import StarmapComponent, { StarMapState } from "../Starmap/StarmapComponent";
import EventBus from "../EventBus";
import StarModel from "../Star/StarModel";

//Not react components.
export default  class TutorialState extends BaseState{
    state:number;

    constructor(){
        super();
        this.state = -1;
        EventBus.getInstance().subscribe("starClicked", (starModel:StarModel)=>{
            if(true && this.state == 0){ //Set to only home
                this.state = 1;
                StarmapComponent.instance.changeState(StarMapState.Tutorial);
            }
        })


    }
    start(){

    }
    update(){
        
    }
}
