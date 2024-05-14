import TutorialState from "../smstates/TutorialState"
import '../Starmap.css';

interface ISTutorial {
    model:TutorialState
}

export default function StarmapTutorial(props:ISTutorial) {
    return (
            <div className="tutorial-box"></div>
    )
}