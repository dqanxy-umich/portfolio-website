import { Center } from "@chakra-ui/react";
import TutorialState from "../smstates/TutorialState"
import '../Starmap.css';

interface ISTutorial {
    model:TutorialState
}

export default function StarmapTutorial(props:ISTutorial) {

    let box1 = 
    <div className="fade-in-anim">
        <div className="tutorial-box">
            <p className="text-header" style={{"margin":0, "textAlign":"left", "width":"100%", "height":34}}> 
                Welcome...
            </p>
            <p className="text-standard" style={{"margin":0, "textAlign":"left", "width":"100%"}}>
                Please select a star to travel there.
                </p>
        </div>
    </div>
    let box2 = 
    <div className="fade-in-anim">
        <div className="tutorial-box">
            <p className="text-header" style={{"margin":0, "textAlign":"left", "width":"100%", "height":34}}> 
                Every star is an experience...
            </p>
            <p className="text-standard" style={{"margin":0, "textAlign":"left", "width":"100%"}}>
                Each experience has a description, which you can read down below.
                </p>
        </div>
    </div>
    let box3 = 
    <div className="fade-in-anim">
        <div className="tutorial-box">
            <p className="text-header" style={{"margin":0, "textAlign":"left", "width":"100%", "height":34}}> 
                Click other stars to explore...
            </p>
            <hr className="tutorial-line"/>
            <p className="text-standard" style={{"margin":0, "textAlign":"left", "width":"100%"}}>
                There's also some links to important stars at the bottom of the page. There's about a hundred stars in this constellation, have fun...
            </p>
        </div>
    </div>

    if(props.model.state == 0){
        return box1;
    }
    else if(props.model.state == 1){
        return box2;
    }
    else if(props.model.state == 2){
        return box3;
    }
    else{
        return <div></div>
    }
}