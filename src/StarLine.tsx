import React, {Component} from 'react';
import './Starmap.css';
import starimg from "./sprites/star.png";
import starbgimg from "./sprites/starbg.png";
import StarmapComponent, {StarMapState} from "./Starmap/StarmapComponent";
import StarTooltip from "./Star/StarTooltip";
import StarModel from './Star/StarModel';

export interface ISLProps {
    parentStar: StarModel;
    childStar: StarModel;
}
interface ISLState {
}

function lerp(a:number, b:number, t:number){
    return a + (b-a)*t
}

export default function StarLine(props:ISLProps) {
    let x1 = props.parentStar.displayX;
    let x2 = props.childStar.displayX;
    let y1 = props.parentStar.displayY;
    let y2 = props.childStar.displayY;
    let scale = .85;
    return (
        <React.Fragment>
            <svg width="100%" height="100%">
                <line x1={lerp(x1,x2,scale)} x2={lerp(x2,x1,scale)} y1={lerp(y1,y2,scale)} y2={lerp(y2,y1,scale)}style={{stroke: 'rgba(200,200,200,.1)', strokeWidth: 7}} />
                <line x1={lerp(x1,x2,scale)} x2={lerp(x2,x1,scale)} y1={lerp(y1,y2,scale)} y2={lerp(y2,y1,scale)}style={{stroke: 'rgba(200,200,200,.1)', strokeWidth: 4}} />
                <line x1={lerp(x1,x2,scale)} x2={lerp(x2,x1,scale)} y1={lerp(y1,y2,scale)} y2={lerp(y2,y1,scale)}style={{stroke: 'rgba(200,200,200,.1)', strokeWidth: 2}} />
            </svg>
        </React.Fragment>
    );
}
