import React, {Component, ReactElement, RefObject} from 'react';
import './Starmap.css';
import Star from './Star/Star';
import ParticleSystem from "./ParticleSystem";
import Config from './smstates/testconfig.json'

import IdleState from './smstates/IdleState'
import MovingState from "./smstates/MovingState";
import {create} from "node:domain";
import StarModel from "./Star/StarModel";

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
    currentState: StarMapState;
}

export default class Starmap extends Component<IStarMapProps,IStarMapState> {

    static x: number //Center of the screen
    static y: number //Center of the screen
    static zoom:number
    static width: number
    static height: number
    static instance: Starmap
    objects:any[]
    states:any
    constructor(props: any){
        //Initialize
        super(props)
        console.log("Starmap is being built")
        this.objects = []
        Starmap.x = 0;
        Starmap.y = 0;
        Starmap.zoom = 1;
        Starmap.width = window.innerWidth;
        Starmap.height = 500;

        let starList:StarModel[] = []

        Starmap.instance = this

        Config.stars.forEach((starConfig)=>{
                let starProps = {
                    //starmap:this,
                    //children:[],
                    name:starConfig.name,
                    scale:starConfig.scale,
                    x:starConfig.x,
                    y:starConfig.y,
                }


                starList.push(new StarModel(starProps));
            }
        )


        //Init state manager
        this.state = {currentState:StarMapState.Idle, starList:starList};
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
        Starmap.width = window.innerWidth;
        this.states[this.state.currentState].update();
        this.objects.forEach((obj:any)=>{
                obj.update?.();
            }
        );
        let newStarList = this.state.starList.map((obj:StarModel)=>{
            return obj.updateStar();
        })
        this.setState({starList:newStarList});
    }

    changeState(sms:StarMapState){
        let prevState = this.states[this.state.currentState];
        let newState = this.states[sms];
        prevState.cancel();
        newState.start();
        this.setState({currentState:sms});
    }

    render(){

        if(Starmap.instance !== this){
            return(<div></div>);
        }

        let stars:ReactElement[] = this.state.starList.map((smodel)=>{
            return <Star model={smodel}/>
        })

        return (
            <div className = "bg">
                <ParticleSystem count={30}></ParticleSystem>
                <p style = {{position:"absolute",height:0}}>{Starmap.x},{Starmap.y}</p>
                {stars}
            </div>
        );
    }
}
