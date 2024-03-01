import React, {Component} from 'react';
import './Starmap.css';
import starimg from "./sprites/star.png";
import starbgimg from "./sprites/starbg.png";
import Starmap, {StarMapState} from "./Starmap";
import StarTooltip from "./StarTooltip";

interface IStarProps {
    starmap: Starmap;
    //No cycles.
    children: Star[];
    name: string;
    x:number;
    y:number;
    scale:number;
}
interface IStarState {
    timer:number
    displayX:number;
    displayY:number;
    opacity:number;
}

export default class Star extends Component<IStarProps,IStarState> {
    rotateVelocity:number
    rotateMult:number
    hoverTimer:number
    isHovering:boolean
    x:number
    y:number

    rotateMain:number
    rotateSecondary:number

    starTooltip:any
    constructor(props:IStarProps) {
        super(props)

        props.starmap.objects.push(this);
        this.state = {timer:Math.random()*300, displayX:0, displayY:0, opacity:0}
        this.rotateMult = 1;
        this.rotateVelocity = .034;
        this.hoverTimer = 1000;
        this.isHovering = false;
        this.rotateMain = this.state.timer
        this.rotateSecondary = -5*this.state.timer
        this.x = props.x;
        this.y = props.y;

        this.starTooltip = React.createRef()
    }

    setHover(isHover:boolean){
        if(!this.isHovering&&isHover){
            this.hoverTimer = 0;
        }
        this.isHovering = isHover;

        this.starTooltip.current.setHover(isHover);
    }
    update(){
        this.hoverTimer++;
        this.rotateMult = Math.max(3,100-this.hoverTimer*.5);
        this.rotateMain+=this.rotateVelocity*this.rotateMult;
        this.rotateSecondary+=-5*this.rotateVelocity;
        let newDX = Starmap.width/2+(this.x-Starmap.x);
        let newDY = Starmap.height/2-(this.y-Starmap.y);
        this.starTooltip.current?.setState({width:Math.min(500, Starmap.width/2-(this.x-Starmap.x)-50)})
        this.setState({timer:this.state.timer+1,
            displayX:newDX,
            displayY:newDY,
            opacity:1-2*Math.max(Math.abs(this.x-Starmap.x)/Starmap.width,Math.abs(this.y-Starmap.y)/Starmap.height)
        })
    }

    render(){
        return (
            <div style={{ position:"absolute", height:0, marginLeft:this.state.displayX, marginTop:this.state.displayY}}>
            <img src={starbgimg} style={{
                position:"absolute",
                marginLeft:-25*this.props.scale,marginTop:-25*this.props.scale,
                width:50*this.props.scale,height:50*this.props.scale,
                transform: `rotate(${this.rotateSecondary}deg)`,
                opacity:this.state.opacity}}/>
            <img src={starimg}
                 style={{
                     position:"absolute",
                     marginLeft:-25*this.props.scale,marginTop:-25*this.props.scale,
                     width:50*this.props.scale,height:50*this.props.scale,
                     opacity:.8*this.state.opacity,
                     transform: `rotate(${this.rotateMain}deg)`}}
                 onMouseEnter={() => this.setHover(true)}
                 onMouseLeave={() => this.setHover(false)}
                 onClick={()=>{
                     let movState = Starmap.instance.states[StarMapState.MovingToPosition]
                     movState.targetX = this.x;
                     movState.targetY = this.y;
                     Starmap.instance.changeState(StarMapState.MovingToPosition);
                 }}
            />
            <StarTooltip name={this.props.name} ref={this.starTooltip}></StarTooltip>
        </div>)
    }
}
