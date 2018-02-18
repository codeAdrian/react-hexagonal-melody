import React, {Component} from "react";

class Messages extends Component {
    render(){
        return(
            <div>
                <p><strong>Message: </strong>{this.props.message}</p>
            </div>
        )
    }
}

export default Messages;