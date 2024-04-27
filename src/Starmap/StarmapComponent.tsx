import React, {Component, ReactElement, RefObject} from 'react';
import '../Starmap.css';
import Star from '../Star/Star';
import ParticleSystem from "../ParticleSystem";
import Config from '../smstates/testconfig.json'

import IdleState from '../smstates/IdleState'
import MovingState from "../smstates/MovingState";
import {create} from "node:domain";
import StarModel from "../Star/StarModel";
import StarLine from '../StarLine/StarLine';
import StarLineModel from '../StarLine/StarLineModel';

interface IStarMapProps {
}
export enum StarMapState{
    Idle,
    MovingToPosition,
    InitCutscene,
    FastTravel,
}

interface IStarMapState {
    starList:StarModel[]
    starLines:StarLineModel[]
    currentState: StarMapState;
}

export default class StarmapComponent extends Component<IStarMapProps,IStarMapState> {

    static x: number //Center of the screen
    static y: number //Center of the screen
    static zoom:number
    static width: number
    static height: number
    static instance: StarmapComponent
    objects:any[]
    states:any
    constructor(props: any){
        //Initialize
        super(props)
        console.log("Starmap is being built")
        this.objects = []
        StarmapComponent.x = 0;
        StarmapComponent.y = 0;
        StarmapComponent.zoom = 1;
        StarmapComponent.width = window.innerWidth;
        StarmapComponent.height = 500;

        let starList:StarModel[] = []

        StarmapComponent.instance = this

        Config.stars.forEach((starConfig)=>{
                let starProps = {
                    //starmap:this,
                    //children:[],
                    name:starConfig.name,
                    scale:starConfig.scale,
                    x:starConfig.x,
                    y:starConfig.y,
                }
                let newModel = new StarModel(starProps);
                starList.push(newModel);
            }
        )

        let starLines:StarLineModel[] = []

        //Init starlines
        Config['adjacency-matrix'].forEach((row:number[],i:number)=>{
            row.forEach((val:number,j:number)=>{
                console.log(i)
                let newLine = new StarLineModel(starList[i],starList[val])
                starList[i].children.push(starList[val])
                starLines.push(newLine)
            })
        })


        //Init state manager
        this.state = {currentState:StarMapState.Idle, starList:starList, starLines:starLines};
        this.states = {
            [StarMapState.Idle]:new IdleState(),
            [StarMapState.MovingToPosition]:new MovingState(),
        };

        //Create global update function
        this.update = this.update.bind(this);
        const animate = () => {
            this.update();
            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate)
    }

    //Update all subcomponents. Only objects that change state in their update function
    //will be re-rendered.
    update(){
        StarmapComponent.width = window.innerWidth;
        this.states[this.state.currentState].update();
        this.objects.forEach((obj:any)=>{
                obj.update?.();
            }
        );
        let newStarList = this.state.starList.map((obj:StarModel)=>{
            return obj.updateStar();
        })
        let newStarLineList = this.state.starLines.map((obj:StarLineModel)=>{
            return obj.update();
        })
        this.setState({starList:newStarList, starLines:newStarLineList});
    }

    changeState(sms:StarMapState){
        let prevState = this.states[this.state.currentState];
        let newState = this.states[sms];
        prevState.cancel();
        newState.start();
        this.setState({currentState:sms});
    }

    //Translate to display coordinates
    static translateX(x:number){
        return x - StarmapComponent.x + StarmapComponent.width/2;
    }

    render(){

        if(StarmapComponent.instance !== this){
            return(<div></div>);
        }

        let stars:ReactElement[] = this.state.starList.map((smodel)=>{
            return <Star model={smodel}/>
        })
        let starsLines:ReactElement[] = this.state.starLines.map((slmodel)=>{
            return <StarLine model={slmodel}/>
        })

        return (
            <div className = "bg">
                <ParticleSystem count={30}></ParticleSystem>
                <p style = {{position:"absolute",height:0}}>{StarmapComponent.x},{StarmapComponent.y}</p>
                {starsLines}
                {stars}
            </div>
        );
    }
}
