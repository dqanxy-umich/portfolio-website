import React, {Component} from 'react';
import './Starmap.css';
import tooltipimg from "./sprites/tooltip.png"
interface ISTProps {
    name: string;
}
interface ISTState {
    width: number;
}

export default class StarTooltip extends Component<ISTProps,ISTState> {
    ref: any;
    isToggled:boolean;
    constructor(props:ISTProps) {
        super(props)
        this.ref = React.createRef()
        this.state = {width:500};
        this.isToggled = false;
    }
    setHover(isHover:boolean){
        if(this.isToggled!=isHover){
            this.isToggled = isHover;
            this.ref.current.classList.toggle('show');
        }
    }
    render(){
        return (
            <div ref={this.ref} className="tooltip" style={{width:this.state.width}}>
                <img style={{position: "absolute", marginLeft: 0}} src={tooltipimg}/>
                <p className="text-header"
                   style={{position: "absolute", marginLeft: 10, marginTop: 10}}>{this.props.name}</p>
                <p className="text-standard"
                   style={{position: "absolute", marginLeft: 15, marginTop: 40}}>{"Start here"}</p>
            </div>
        )
    }
}
