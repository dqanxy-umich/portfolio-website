import React, {Component} from 'react';
import '../Starmap.css';
import starimg from "../sprites/star.png";
import starbgimg from "../sprites/starbg.png";
import Starmap, {StarMapState} from "../Starmap";
import StarTooltip from "../StarTooltip";
import StarModel from "./StarModel"

export interface IStarProps {
    //No cycles.
    //children: Star[];
    model:StarModel;
}
interface IStarState {
    model:StarModel
}

export default class Star extends Component<IStarProps,IStarState> {

    //Notify tooltip of events
    starTooltipRef:any
    isHovering:boolean
    hoverTimer:number
    constructor(props:IStarProps) {
        super(props)
        Starmap.instance.objects.push(this);
        this.isHovering = false;
        this.hoverTimer = 0;
        this.starTooltipRef = React.createRef()
        this.state = {model:this.props.model}
    }

    setHover(isHover:boolean){
        if(!this.isHovering&&isHover){
            this.state.model.hoverTimer = 0;
        }
        this.state.model.isHovering = isHover;

        this.starTooltipRef.current.setHover(isHover);
    }

    update(){
        this.starTooltipRef.current?.setState(
            {
                width: Math.min(500, Starmap.width / 2 - (this.state.model.x - Starmap.x) - 50)
            })
        this.setState({model:this.state.model.updateStar()})
    }

    render(){
        return (
            <div style={{
                position:"absolute",
                height:0,
                marginLeft:this.state.model.displayX,
                marginTop:this.state.model.displayY}}>
            <img src={starbgimg} style={{
                position:"absolute",
                marginLeft:-25*this.state.model.scale,marginTop:-25*this.state.model.scale,
                width:50*this.state.model.scale,height:50*this.state.model.scale,
                transform: `rotate(${this.state.model.rotateSecondary}deg)`,
                opacity:this.state.model.opacity}}/>
            <img src={starimg}
                 style={{
                     position:"absolute",
                     marginLeft:-25*this.state.model.scale,marginTop:-25*this.state.model.scale,
                     width:50*this.state.model.scale,height:50*this.state.model.scale,
                     opacity:.8*this.state.model.opacity,
                     transform: `rotate(${this.state.model.rotateMain}deg)`}}
                 onMouseEnter={() => this.setHover(true)}
                 onMouseLeave={() => this.setHover(false)}
                 onClick={()=>{
                     let movState = Starmap.instance.states[StarMapState.MovingToPosition]
                     movState.targetX = this.state.model.x;
                     movState.targetY = this.state.model.y;
                     Starmap.instance.changeState(StarMapState.MovingToPosition);
                 }}
            />
            <StarTooltip name={this.state.model.name} ref={this.starTooltipRef}></StarTooltip>
        </div>)
    }
}
