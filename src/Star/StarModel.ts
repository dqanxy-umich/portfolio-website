import StarmapComponent from "../Starmap/StarmapComponent";
import React from "react";


export interface IStarModelProps {
    //No cycles.
    //children: Star[];
    name: string;
    x:number;
    y:number;
    scale:number;
    id:number;
}

export default class StarModel {
    id:number;

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
    rendered:boolean

    name:string;
    scale:number;
    size:number

    rotateMain:number
    rotateSecondary:number

    children:StarModel[]

    constructor(props:IStarModelProps) {
        //Starmap.instance.starList.push(this);
        console.log(props.x)
        this.id = props.id;

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

        this.rendered = false;

        this.x = props.x;
        this.y = props.y;
        this.name = props.name;
        this.size = props.scale;
        this.scale = this.size * StarmapComponent.zoom * 25;

        this.children = [];
        //this.starTooltipRef = React.createRef()
    }
    updateStar() {
        this.hoverTimer++;
        this.rotateMult = Math.max(3, 100 - this.hoverTimer * .5);
        this.rotateMain += this.rotateVelocity * this.rotateMult;
        this.rotateSecondary += -5 * this.rotateVelocity;
        this.displayX = StarmapComponent.width / 2 + (this.x - StarmapComponent.x)*StarmapComponent.zoom;
        this.displayY = StarmapComponent.height / 2 - (this.y - StarmapComponent.y)*StarmapComponent.zoom;

        this.scale = this.size * StarmapComponent.zoom * 25;
        this.timer++;
        this.rendered = true;
        this.opacity = 1 - 2 * Math.max(
            Math.abs(this.x - StarmapComponent.x) / StarmapComponent.width,
            Math.abs(this.y - StarmapComponent.y) / StarmapComponent.height)
        return this;
    }
}
