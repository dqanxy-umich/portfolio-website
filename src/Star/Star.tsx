import React, {Component, useState} from 'react';
import '../Starmap.css';
import starimg from "../sprites/star.png";
import starbgimg from "../sprites/starbg.png";
import Starmap, {StarMapState} from "../Starmap";
import StarTooltip from "../StarTooltip";
import StarModel from "./StarModel"

export interface IStarProps {
    //No cycles.
    //children: Star[];
    model:StarModel;
}

export default function Star(props:IStarProps) {
    //Notify tooltip of events

    const [model, setModel] = useState(props.model);


    const starTooltipRef:any = React.createRef()
    function setHover(isHover:boolean){
        if(!model.isHovering&&isHover){
            model.hoverTimer = 0;
        }
        model.isHovering = isHover;

        starTooltipRef.current.setHover(isHover);
        updateS(model);
        console.log(model.isHovering)
        console.log("HOver is set")
    }
    function updateS(model:StarModel){
        // starTooltipRef.current?.setState(
        //     {
        //         width: Math.min(500, Starmap.width / 2 - (model.x - Starmap.x) - 50)
        //     })
        model.updateStar()

        setModel({...model, updateStar:model.updateStar })

    }

    if(!model.rendered){
        Starmap.instance.objects.push({update:()=>updateS(model)})
    }


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
                     let movState = Starmap.instance.states[StarMapState.MovingToPosition]
                     movState.targetX = model.x;
                     movState.targetY = model.y;
                     Starmap.instance.changeState(StarMapState.MovingToPosition);
                 }}
            />
            <StarTooltip name={model.name} ref={starTooltipRef}></StarTooltip>
        </div>)
}
