export default function SubText(props){
    return(
            <p className= {`text-muted text-center ${props.className || ""}`} style={props.style}>
                {props.children}
            </p>
    )
}