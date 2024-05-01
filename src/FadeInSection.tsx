import React, {Component, RefObject} from 'react';
import './Main.css';

interface IFISProps extends React.PropsWithChildren {
    callback?:Function;
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
            entries.forEach(entry => {
                this.setState({isVisible:entry.isIntersecting})
                if(entry.isIntersecting && this.props.callback){
                    this.props.callback();
                }
                });
        });
    }
    componentDidMount() {

        if (this.domRef.current != null) {
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
