import React, {Component} from 'react';
import '../Starmap.css';
import starimg from "./sprites/star.png";
import starbgimg from "./sprites/starbg.png";
import StarmapComponent, {StarMapState} from "../Starmap/StarmapComponent";
import StarTooltip from "../Star/StarTooltip";
import StarModel from '../Star/StarModel';


export default class StarLineModel {
    parentStar: StarModel;
    childStar: StarModel;
    displayX1: number;
    displayX2: number;
    displayY1: number;
    displayY2: number;
    
    constructor(parentStar:StarModel, childStar:StarModel){
        this.parentStar = parentStar;
        this.childStar = childStar;
        
        let x1 = parentStar.displayX;
        let x2 = childStar.displayX;
        let y1 = parentStar.displayY;
        let y2 = childStar.displayY;
        let scale = .85;
        this.displayX1 = this.lerp(x1,x2,scale)
        this.displayX2 = this.lerp(x2,x1,scale)
        this.displayY1 = this.lerp(y1,y2,scale)
        this.displayY2 = this.lerp(y2,y1,scale)

        StarmapComponent.instance.objects.push(this)

    }
    lerp(a:number, b:number, t:number){
        return a + (b-a)*t
    }

    update(){
        let x1 = this.parentStar.displayX;
        let x2 = this.childStar.displayX;
        let y1 = this.parentStar.displayY;
        let y2 = this.childStar.displayY;
        let scale = .85;
        this.displayX1 = this.lerp(x1,x2,scale)
        this.displayX2 = this.lerp(x2,x1,scale)
        this.displayY1 = this.lerp(y1,y2,scale)
        this.displayY2 = this.lerp(y2,y1,scale)
        
        return this
    }
}