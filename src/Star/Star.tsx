import React, {Component, useState} from 'react';
import '../Starmap.css';
import starimg from "../sprites/star.png";
import starbgimg from "../sprites/starbg.png";
import StarmapComponent, {StarMapState} from "../Starmap/StarmapComponent";
import StarTooltip from "./StarTooltip";
import StarModel from "./StarModel"
import EventBus from '../EventBus';

export interface IStarProps {
    //No cycles.
    //children: Star[];
    model:StarModel;
}

export default function Star(props:IStarProps) {
    //Notify tooltip of events

    const [model, setModel] = useState(props.model);
    const [isHovering, setIsHovering] = useState(false);


    function setHover(isHover:boolean){
        if(!model.isHovering&&isHover){
            model.hoverTimer = 0;
        }
        model.isHovering = isHover;

        setIsHovering(isHover);
    }
    
    return (
        <div style={{
            position:"absolute",
            height:0,
            marginLeft:model.displayX,
            marginTop:model.displayY}}>
            <img src={starbgimg} style={{
                position:"absolute",
                marginLeft:-25*model.scale,marginTop:-25*model.scale,
                width:50*model.scale,height:50*model.scale,
                transform: `rotate(${model.rotateSecondary}deg)`,
                opacity:model.opacity}}/>
            <img src={starimg}
                 style={{
                     position:"absolute",
                     marginLeft:-25*model.scale,marginTop:-25*model.scale,
                     width:50*model.scale,height:50*model.scale,
                     opacity:.8*model.opacity,
                     transform: `rotate(${model.rotateMain}deg)`}}
                 onMouseEnter={() => {setHover(true);}}
                 onMouseLeave={() => setHover(false)}
                 onClick={()=>{
                     let movState = StarmapComponent.instance.states[StarMapState.MovingToPosition]
                     movState.targetX = model.x;
                     movState.targetY = model.y;
                     StarmapComponent.instance.changeState(StarMapState.MovingToPosition);
                     EventBus.getInstance().call("showNotif", props.model)
                 }}
            />
            <StarTooltip isHover={isHovering} width={Math.min(500, StarmapComponent.width / 2 - (model.x - StarmapComponent.x) - 50)} starModel = {model} name={model.name}></StarTooltip>
        </div>)
}
