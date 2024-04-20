import React, {Component, useState} from 'react';
import '../Starmap.css';
import starimg from "../sprites/star.png";
import starbgimg from "../sprites/starbg.png";
import StarmapComponent, {StarMapState} from "../Starmap/StarmapComponent";
import StarTooltip from "./StarTooltip";
import StarModel from "./StarModel"

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

        //updateS(model);
        console.log(model.isHovering)
        console.log("HOver is set")
        setIsHovering(isHover);
    }
    // function updateS(model:StarModel){
    //     // starTooltipRef.current?.setState(
    //     //     {
    //     //         width: Math.min(500, Starmap.width / 2 - (model.x - Starmap.x) - 50)
    //     //     })
    //     model.updateStar()
    //
    //     setModel({...model, updateStar:model.updateStar })
    //
    // }
    //
    // if(!model.rendered){
    //     Starmap.instance.objects.push({update:()=>updateS(model)})
    // }


    // const requestRef:any = React.useRef()
    //
    // const animate = () => {
    //     update();
    //     requestAnimationFrame(animate);
    // };
    //
    // React.useEffect(() => {
    //     requestRef.current = requestAnimationFrame(animate);
    //     return () => cancelAnimationFrame(requestRef.current);
    // }, []);
    // requestAnimationFrame(animate)
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
                 }}
            />
            <StarTooltip isHover={isHovering} width={Math.min(500, StarmapComponent.width / 2 - (model.x - StarmapComponent.x) - 50)} starModel = {model} name={model.name}></StarTooltip>
        </div>)
}
