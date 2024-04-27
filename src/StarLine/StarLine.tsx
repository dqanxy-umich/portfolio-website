import React, {Component, useState} from 'react';
import '../Starmap.css';
import starimg from "./sprites/star.png";
import starbgimg from "./sprites/starbg.png";
import StarmapComponent, {StarMapState} from "../Starmap/StarmapComponent";
import StarTooltip from "../Star/StarTooltip";
import StarModel from '../Star/StarModel';
import StarLineModel from './StarLineModel';

interface ISLProps {
    model: StarLineModel;
}

export default function StarLine(props:ISLProps) {
    return (
        <React.Fragment>
            <svg style={{"position":"absolute", "left":0}}width="100%" height="100%">
                <line x1={props.model.displayX1} x2={props.model.displayX2} y1={props.model.displayY1} y2={props.model.displayY2}style={{stroke: 'rgba(200,200,200,'+.2*props.model.opacity+')', strokeWidth: 12}} />
                <line x1={props.model.displayX1} x2={props.model.displayX2} y1={props.model.displayY1} y2={props.model.displayY2}style={{stroke: 'rgba(200,200,200,'+.2*props.model.opacity+')', strokeWidth: 8}} />
                <line x1={props.model.displayX1} x2={props.model.displayX2} y1={props.model.displayY1} y2={props.model.displayY2}style={{stroke: 'rgba(200,200,200,'+.2*props.model.opacity+')', strokeWidth: 6}} />
                <line x1={props.model.displayX1} x2={props.model.displayX2} y1={props.model.displayY1} y2={props.model.displayY2}style={{stroke: 'rgba(200,200,200,'+.6*props.model.opacity+')', strokeWidth: 4}} />
            </svg>
        </React.Fragment>
    );
}
