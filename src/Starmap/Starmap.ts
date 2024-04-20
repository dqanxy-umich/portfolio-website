import React, {Component, ReactElement, RefObject} from 'react';
import '../Starmap.css';
import Star from '../Star/Star';
import ParticleSystem from "../ParticleSystem";
import Config from '../smstates/testconfig.json'

import IdleState from '../smstates/IdleState'
import MovingState from "../smstates/MovingState";
import {create} from "node:domain";
import StarModel from "../Star/StarModel";

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
        StarmapComponent.width = window.innerWidth;
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
}
