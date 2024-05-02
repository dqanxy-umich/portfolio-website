import React, {Component} from "react";
import particleImg from "./sprites/particle.png";
import './Starmap.css';
import StarmapComponent from "./Starmap/StarmapComponent";

interface IPSProps{
    count:number;
}

interface IPSState {
    particles: Particle[];
}

interface IParticleProps{
    x: number;
    y: number;
    xSpeed: number;
    ySpeed: number;
    timer: number;
}

class Particle{
    x:number;
    y:number;
    xSpeed:number;
    ySpeed:number;
    timer:number;
    // constructor(props:IParticleProps){
    //     this.x = props.x;
    //     this.y = props.y;
    //     this.xSpeed = props.xSpeed;
    //     this.ySpeed = props.ySpeed;
    //     this.timer = props.timer;
    // }
    constructor(){
        this.x = Math.random()*StarmapComponent.width,
        this.y = Math.random()*StarmapComponent.height,
        this.xSpeed = .3*(Math.random()-.5),
        this.ySpeed = .3*(Math.random()-.5),
        this.timer = Math.random()*500 
    }

    particleUpdate(){
        this.timer+=1
        if(this.timer%500<=1){
            this.x = Math.random()*StarmapComponent.width
            this.y = Math.random()*StarmapComponent.height
            this.xSpeed = .3*(Math.random()-.5);
            this.ySpeed = .3*(Math.random()-.5);
        }
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if(this.x>StarmapComponent.width-50){
            this.xSpeed = 0;
            this.x = StarmapComponent.width-50;
        }
        if(this.y>StarmapComponent.height-11){
            this.ySpeed = 0;
        }
    }

    render(){
        return <img src={particleImg}
                        style={{
                            position:"absolute",
                            marginLeft: this.x, marginTop: this.y,
                            opacity:Math.min(50,Math.abs((this.timer+50)%500 - 50))/150}} />
    }
}

export default class ParticleSystem extends Component<IPSProps,IPSState> {
    constructor(props:IPSProps){
        super(props)
        StarmapComponent.instance.updateFunctions.push(this.update.bind(this));
        let initialParticles:Particle[] = []
        for(let i = 0; i<props.count; i++){
            initialParticles.push(new Particle())
        }
        this.state = { particles: initialParticles}
    }
    
    
    update(){
        this.state.particles.forEach((particle: any) => {
            // Update logic here, like moving the particles
            // This is a simple example that should be replaced with your actual update logic
            particle.particleUpdate();
        })
        this.setState({particles:this.state.particles})
    }

    render(){
        let renderParticles = this.state.particles.map((particle: any) => {
            return particle.render()
        });
        return (
            <div style = {{position:"absolute",height:0}}>
                {renderParticles}
            </div>
        );
    }
}
