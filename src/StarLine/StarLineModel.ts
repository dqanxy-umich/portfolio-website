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

    veloX1:number = 0;
    veloX2:number = 0;
    veloY1:number = 0;
    veloY2:number = 0;

    offsetX1:number = 0;
    offsetX2:number = 0;
    offsetY1:number = 0;
    offsetY2:number = 0;

    targetTimer:number = 0;
    targetTimerMax:number = 100;

    opacity:number = 1;
    opacityTimer:number = Math.random()*1000+500;
    
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

        if(this.targetTimer<=0){
            let randScale = 5

            this.targetTimer = Math.random()*500+500;
            this.targetTimerMax = this.targetTimer;
            let targetX1 = Math.random()*randScale*2-randScale;
            let targetX2 = Math.random()*randScale*2-randScale;
            let targetY1 = Math.random()*randScale*2-randScale;
            let targetY2 = Math.random()*randScale*2-randScale;
            this.veloX1 = (targetX1-this.offsetX1)/this.targetTimerMax;
            this.veloX2 = (targetX2-this.offsetX2)/this.targetTimerMax;
            this.veloY1 = (targetY1-this.offsetY1)/this.targetTimerMax;
            this.veloY2 = (targetY2-this.offsetY2)/this.targetTimerMax;
        }

        this.targetTimer--;
        this.offsetX1 += this.veloX1;
        this.offsetX2 += this.veloX2;
        this.offsetY1 += this.veloY1;
        this.offsetY2 += this.veloY2;

        this.opacity = Math.min(Math.min(this.childStar.opacity,this.parentStar.opacity)+.2,1)

        if(this.opacityTimer<=200) this.opacity *= .6;
        if(this.opacityTimer<=180) this.opacity *= 1;
        if(this.opacityTimer<=160) this.opacity *=.6
        if(this.opacityTimer<=40) this.opacity *= 1;
        if(this.opacityTimer<=20) this.opacity *= .6;
        if(this.opacityTimer<=0){
            this.opacity = 1;
            this.opacityTimer = Math.random()*1000+500;
        }
        this.opacityTimer--;


        this.displayX1 = this.lerp(x1,x2,scale) + this.offsetX1
        this.displayX2 = this.lerp(x2,x1,scale) + this.offsetX2
        this.displayY1 = this.lerp(y1,y2,scale) + this.offsetY1
        this.displayY2 = this.lerp(y2,y1,scale) + this.offsetY2
        
        return this
    }
}