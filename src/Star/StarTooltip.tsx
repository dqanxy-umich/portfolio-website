import React from 'react';
import '../Starmap.css';
import tooltipimg from "../sprites/tooltip.png"
import StarModel from "./StarModel"
interface ISTProps {
    name: string;
    starModel: StarModel;
    width:number;
    isHover:boolean;
}

export default function StarTooltip(props:ISTProps) {
    return (
        <div className={`tooltip ${props.isHover?'show':''}`} style={{width:props.width}}>
            <img style={{position: "absolute", marginLeft: 0}} src={tooltipimg}/>
            <p className="text-header"
               style={{position: "absolute", marginLeft: 10, marginTop: 10}}>{props.name}</p>
            <p className="text-standard"
               style={{position: "absolute", marginLeft: 15, marginTop: 40}}>{"Start here"}</p>
        </div>
    )
}
