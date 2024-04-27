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
            <svg width="100%" height="100%">
                <line x1={props.model.displayX1} x2={props.model.displayX2} y1={props.model.displayY1} y2={props.model.displayY2}style={{stroke: 'rgba(200,200,200,.1)', strokeWidth: 7}} />
                <line x1={props.model.displayX1} x2={props.model.displayX2} y1={props.model.displayY1} y2={props.model.displayY2}style={{stroke: 'rgba(200,200,200,.1)', strokeWidth: 4}} />
                <line x1={props.model.displayX1} x2={props.model.displayX2} y1={props.model.displayY1} y2={props.model.displayY2}style={{stroke: 'rgba(200,200,200,.1)', strokeWidth: 2}} />
            </svg>
        </React.Fragment>
    );
}
