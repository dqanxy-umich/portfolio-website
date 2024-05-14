interface BLProps{
    X1:number,
    X2:number,
    Y1:number,
    Y2:number
}

export default function BasicLine(props:{coords:BLProps,style:any}){
    return <line x1={props.coords.X1} x2={props.coords.X2} y1={props.coords.Y1} y2={props.coords.Y2} style={props.style}></line>
}