import React, {Component, RefObject} from 'react';
import './Main.css';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import Star from './Star/Star';
import ParticleSystem from "./ParticleSystem";
import FadeInSection from "./FadeInSection";
import {Fade} from "@chakra-ui/react";
import EventBus from './EventBus';

interface IBodyProps {
    callback?:Function;
    model:BodyModel;
}
interface IBodyState {
    isVisible:boolean;
}

export class BodyModel{
    title:string;
    subtitle:string;
    body:string;
    constructor(){
        this.title = ""
        this.subtitle = ""
        this.body = ""
    }
}


export default class Body extends Component<IBodyProps,IBodyState> {

    constructor(props:IBodyProps){
        super(props);
    }
    render(){
        return(
            <div className="body-bg" >
                <div style={{height:20}}></div>
                <FadeInSection>
                    <h1 className={"body-title"}>{this.props.model.title}</h1>
                </FadeInSection>
                <FadeInSection>
                    <h3 className={"body-subtitle"}>{this.props.model.subtitle}</h3>
                </FadeInSection>
                <FadeInSection callback={()=>{EventBus.getInstance().call("disableNotif")}}>
                    <div className={"body-card"}>
                        <p className={"body-main"}>
                            {this.props.model.body}
                        </p>
                    </div>
                </FadeInSection>
            </div>
        )
    }
}
