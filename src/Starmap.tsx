import React, {Component, RefObject} from 'react';
import './Starmap.css';
import Star from './Star';
import ParticleSystem from "./ParticleSystem";

import IdleState from './smstates/IdleState'
import MovingState from "./smstates/MovingState";

interface IStarMapProps {
}
export enum StarMapState{
    Idle,
    MovingToPosition,
    InitCutscene,
    FastTravel,
}

interface IStarMapState {
    currentState: StarMapState;
}

export default class Starmap extends Component<IStarMapProps,IStarMapState> {

    static x: number //Center of the screen
    static y: number //Center of the screen
    static zoom:number
    static width: number
    static height: number
    static instance: Starmap
    particleSystem: ParticleSystem
    objects:any[]
    ref:any
    states:any
    constructor(props: any){
        super(props)
        this.ref = React.createRef()
        this.objects = []
        Starmap.x = 0;
        Starmap.y = 0;
        Starmap.zoom = 1;
        Starmap.width = window.innerWidth;
        Starmap.height = 500;
        this.update = this.update.bind(this);
        const animate = () => {
            this.update();
            requestAnimationFrame(animate);
        };
        this.particleSystem = new ParticleSystem({starmap:this})
        requestAnimationFrame(animate)
        console.log("Hello World")
        // @ts-ignore
        Starmap.instance = this

        this.state = {currentState:StarMapState.Idle};
        this.states = {
            [StarMapState.Idle]:new IdleState(),
            [StarMapState.MovingToPosition]:new MovingState(),
        };
    }

    //Update all subcomponents. Only objects that change state in their update function
    //will be re-rendered.
    update(){
        Starmap.width = window.innerWidth;
        console.log(window.innerWidth);
        this.states[this.state.currentState].update();
        this.objects.forEach((obj:any)=>{
                obj.update?.();
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
        return (
            <div className = "bg">
                <ParticleSystem starmap={this}></ParticleSystem>
                <p style = {{position:"absolute",height:0}}>{Starmap.x},{Starmap.y}</p>
                <Star starmap={this} children={[]} name={"Home"} x={0} y={0} scale={1.5}></Star>
                <Star starmap={this} children={[]} name={"Artificial Intelligence"} x={150} y={150} scale={1}></Star>
                <Star starmap={this} children={[]} name={"About Me"} x={300} y={-120} scale={1}></Star>
                <Star starmap={this} children={[]} name={"Full-Stack Development"} x={-190} y={120} scale={1}></Star>
                <Star starmap={this} children={[]} name={"Virtual Experiences"} x={-130} y={-180} scale={1}></Star>
            </div>
        );
    }
}
