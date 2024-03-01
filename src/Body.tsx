import React, {Component, RefObject} from 'react';
import './Main.css';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import Star from './Star';
import ParticleSystem from "./ParticleSystem";
import FadeInSection from "./FadeInSection";
import {Fade} from "@chakra-ui/react";

interface IBodyProps {
}
interface IBodyState {
    isVisible:boolean;
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
                    <h1 className={"body-title"}>Daniel Tian here.</h1>
                </FadeInSection>
                <FadeInSection>
                    <h3 className={"body-subtitle"}>You are at: Home</h3>
                </FadeInSection>
                <FadeInSection>
                    <div className={"body-card"}>
                        <p className={"body-main"}>
                            Not what you expected out of a portfolio? Well actually, I had a more standard portfolio
                            built on Wordpress, but I’ve always wanted something more ‘visual’. And since I’ve been
                            meaning to learn React and improve my front-end skills, I spent a spring break killing three
                            birds with one stone and created what you see here.
                            <br/>
                            <br/>
                            On this website, I’ve arranged my experiences into constellations. My experiences are broad,
                            but I’ve divided them into three sections: Artificial Intelligence, Full-Stack Development,
                            and Virtual Experiences. You can click the hyperlinks here to directly go to those stars, or
                            click on them on the starmap above. Stars lead to other stars, first showing broad
                            descriptions of my projects, then delving deeper into the various aspects of those projects.
                            <br/>
                            <br/>
                            I’ve listed my best projects on my resume, and here’s some quick links to their stars:
                            <br/>
                            <br/>
                            Web-first, Lua/C#-based, Accessible Game Engine Development<br/>
                            Computer Vision to Protect Construction Workers, with Walbridge<br/>
                            Spatial Reasoning in Natural Language Processing<br/>
                            Full-Stack Development and Embedded Systems, Internship with Kubica<br/>
                            A Personal Website in React, Front-End (this is what you are seeing right now!)
                            <br/>
                            <br/>
                            Want to learn more about me, or my career aspirations? Continue to the About Me section to
                            find that information.
                            <br/>
                            <br/>
                            You can find my contact information in the footer. Feel free to reach out by email if you
                            have any questions!

                        </p>
                    </div>
                </FadeInSection>
            </div>
        )
    }
}
