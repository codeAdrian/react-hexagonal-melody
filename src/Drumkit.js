import React, { Component } from "react";
import Instrument from "./Instrument";

class Drumkit extends Component {
    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyPress);
    }

    handleKeyPress = e => {
        if(!this.props.disableInputs) {
            this.props.playAudio(`${e.keyCode}`, true);
        }
    };

    render() {
        return (
            <article>
                <ul className="drumkit">
                    {this.props.instruments.map(i => (
                        <Instrument
                            playAudio={this.props.playAudio}
                            handleKeyPress={this.props.handleKeyPress}
                            disabled={this.props.disableInputs}
                            key={i.key}
                            instrument={i}
                        />
                    ))}
                </ul>
            </article>
        );
    }
}
export default Drumkit;
