import Starmap from "../Starmap";
import React from "react";


export interface IStarProps {
    //No cycles.
    //children: Star[];
    name: string;
    x:number;
    y:number;
    scale:number;
}

export default class StarModel {
    timer:number;
    displayX:number;
    displayY:number;
    opacity:number;
    rotateVelocity:number
    rotateMult:number
    hoverTimer:number
    isHovering:boolean
    x:number
    y:number

    name:string;
    scale:number;

    rotateMain:number
    rotateSecondary:number

    constructor(props:IStarProps) {
        //Starmap.instance.starList.push(this);
        console.log(props.x)
        this.timer=Math.random()*300
        this.displayX=0
        this.displayY=0
        this.opacity=0
        this.rotateMult = 1;
        this.rotateVelocity = .034;
        this.hoverTimer = 1000;
        this.isHovering = false;
        this.rotateMain = this.timer
        this.rotateSecondary = -5*this.timer


        this.x = props.x;
        this.y = props.y;
        this.name = props.name;
        this.scale = props.scale;

        //this.starTooltipRef = React.createRef()
    }
    updateStar() {
        this.hoverTimer++;
        this.rotateMult = Math.max(3, 100 - this.hoverTimer * .5);
        this.rotateMain += this.rotateVelocity * this.rotateMult;
        this.rotateSecondary += -5 * this.rotateVelocity;
        let newDX = Starmap.width / 2 + (this.x - Starmap.x);
        let newDY = Starmap.height / 2 - (this.y - Starmap.y);

        this.timer++;
        this.displayX = newDX
        this.displayY = newDY
        this.opacity = 1 - 2 * Math.max(
            Math.abs(this.x - Starmap.x) / Starmap.width,
            Math.abs(this.y - Starmap.y) / Starmap.height)
        return this;
    }
}
