import React, {Component} from "react";
import particleImg from "./sprites/particle.png";
import './Starmap.css';
import Starmap from "./Starmap";

interface IPSProps{
    count:number;
}

interface IParticle{
    x: number;
    y: number;
    xSpeed: number;
    ySpeed: number;
    timer: number;
}
interface IPSState {
    particles: IParticle[];
}

export default class ParticleSystem extends Component<IPSProps,IPSState> {
    constructor(props:IPSProps){
        super(props)
        Starmap.instance.objects.push(this);
        let initialParticles:IParticle[] = []
        for(let i = 0; i<props.count; i++){
            initialParticles.push({
                x:Math.random()*Starmap.width,
                y:Math.random()*Starmap.height,
                xSpeed:.3*(Math.random()-.5),
                ySpeed:.3*(Math.random()-.5),
                timer:Math.random()*500 })
        }
        this.state = { particles: initialParticles}
    }
    static particleUpdate(particle:IParticle){
        particle.timer+=1
        if(particle.timer%500<=1){
            particle.x = Math.random()*Starmap.width
            particle.y = Math.random()*Starmap.height
            particle.xSpeed = .3*(Math.random()-.5);
            particle.ySpeed = .3*(Math.random()-.5);
        }
        particle.x += particle.xSpeed;
        particle.y += particle.ySpeed;

        if(particle.x>Starmap.width-50){
            particle.xSpeed = 0;
            particle.x = Starmap.width-50;
        }
        if(particle.y>Starmap.height-11){
            particle.ySpeed = 0;
        }
    }
    update(){
        this.state.particles.forEach((particle: any) => {
            // Update logic here, like moving the particles
            // This is a simple example that should be replaced with your actual update logic
            ParticleSystem.particleUpdate(particle);
        })
        this.setState({particles:this.state.particles})
    }

    render(){
        let renderParticles = this.state.particles.map((particle: any) => {
            // Update logic here, like moving the particles
            // This is a simple example that should be replaced with your actual update logic
            return <img src={particleImg}
                        style={{
                            position:"absolute",
                            marginLeft: particle.x, marginTop: particle.y,
                            opacity:Math.min(50,Math.abs((particle.timer+50)%500 - 50))/150}} />
        });
        return (
            <div style = {{position:"absolute",height:0}}>
                {renderParticles}
            </div>
        );
    }
}
