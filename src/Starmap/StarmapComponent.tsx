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
import EventBus from '../EventBus';

import StarmapTutorial from './StarmapTutorial';
import TutorialState from '../smstates/TutorialState';

import chevronimg from "../sprites/chevron.png";

interface IStarMapProps {
}
export enum StarMapState{
    Idle,
    MovingToPosition,
    FastTravel,
    Tutorial
}

interface IStarMapState {
    starList:StarModel[]
    starLines:StarLineModel[]
    currentState: StarMapState;
    showNotif:boolean
}

export default class StarmapComponent extends Component<IStarMapProps,IStarMapState> {

    static x: number //Center of the screen
    static y: number //Center of the screen
    static zoom:number
    static width: number
    static height: number
    static instance: StarmapComponent
    updateFunctions:any[]
    states:any
    timeoutInst?:NodeJS.Timeout;
    constructor(props: any){
        //Initialize
        super(props)
        console.log("Starmap is being built")
        this.updateFunctions = []
        StarmapComponent.x = 0;
        StarmapComponent.y = 0;
        StarmapComponent.zoom = .7;
        StarmapComponent.width = window.innerWidth;
        StarmapComponent.height = 500;

        let starList:StarModel[] = []

        StarmapComponent.instance = this

        //Initialize stars
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
        this.state = {currentState:StarMapState.Tutorial, 
            starList:starList, 
            starLines:starLines,
            showNotif:false};
        this.states = {
            [StarMapState.Idle]:new IdleState(),
            [StarMapState.MovingToPosition]:new MovingState(),
            [StarMapState.Tutorial]:new TutorialState(),
        };

        //Update function for all starlines and stars
        this.updateFunctions.push(()=>{
            let newStarList = this.state.starList.map((obj:StarModel)=>{
                return obj.updateStar();
            })
            let newStarLineList = this.state.starLines.map((obj:StarLineModel)=>{
                return obj.update();
            })
            this.setState({starList:newStarList, starLines:newStarLineList});
        })


        //Create global update function
        this.update = this.update.bind(this);
        const animate = () => {
            this.update();
            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate)

        //Subscriptions
        EventBus.getInstance().subscribe("showNotif",()=>{
            this.setState({showNotif:true})
            if(this.timeoutInst){
                clearTimeout(this.timeoutInst)
            }
            this.timeoutInst = setTimeout(()=>{this.setState({showNotif:false})},5000)
        })
        EventBus.getInstance().subscribe("disableNotif",()=>{
            this.setState({showNotif:false})
            if(this.timeoutInst){
                clearTimeout(this.timeoutInst)
            }
        })
    }

    //Update all subcomponents. Only objects that change state in their update function
    //will be re-rendered.
    update(){
        StarmapComponent.width = window.innerWidth;
        this.states[this.state.currentState].update();
        this.updateFunctions.forEach((func:any)=>{
                func?.();
            }
        );
        
    }

    changeState(sms:StarMapState){
        let prevState = this.states[this.state.currentState];
        let newState = this.states[sms];
        prevState.cancel();
        newState.start();
        this.setState({currentState:sms});
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
            <React.Fragment>
                <div className = "bg" onClick={this.states[this.state.currentState].onClick()}> 
                    <ParticleSystem count={30}></ParticleSystem>
                    <p style = {{position:"absolute",height:0}}>{StarmapComponent.x},{StarmapComponent.y}</p>
                    {starsLines}
                    {stars}
                    {this.state.showNotif && <img className='notif-down' src={chevronimg}></img>} 
                    {this.state.currentState == StarMapState.Tutorial && <StarmapTutorial model = {this.states[this.state.currentState]}/>}
                </div>
            </React.Fragment>
        );
    }
}
