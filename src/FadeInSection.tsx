import React, {Component, RefObject} from 'react';
import './Main.css';

interface IFISProps extends React.PropsWithChildren {
}
interface IFISState {
    isVisible:boolean;
}

export default class FadeInSection extends Component<IFISProps,IFISState> {

    domRef:any;
    observer:IntersectionObserver;
    constructor(props:IFISProps){
        super(props);
        this.state = {isVisible:false};
        this.domRef = React.createRef();
        this.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {console.log("set state!");this.setState({isVisible:entry.isIntersecting})});
        });
    }
    componentDidMount() {

        console.log("Ran!");
        if (this.domRef.current != null) {
            console.log("Not null!");
            this.observer.observe(this.domRef.current);
        }
    }
    render() {

        return (
            <div className={`fade-in ${this.state.isVisible ? 'visible' : ''}`} ref={this.domRef}>
                {this.props.children}
            </div>
        );
    }


}
