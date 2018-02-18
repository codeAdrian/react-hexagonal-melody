import React, { Component } from "react";

class Instrument extends Component {
    render() {
      const utilSpace_className = `instrument__button instrument__button--${String.fromCharCode(
        this.props.instrument.key
    )}`
        return (
            <li className="drumkit__instrument">
                <button
                    className={utilSpace_className}
                    disabled={this.props.disabled}
                    onClick={() =>
                        this.props.playAudio(this.props.instrument.key, true)
                    }
                >
                    <span className="instrument__buttonIcon" />
                    <span className="instrument__buttonCode">
                        {String.fromCharCode(this.props.instrument.key)}
                    </span>
                </button>
                <audio
                    className="instrument__audio"
                    preload="auto"
                    data-key={this.props.instrument.key}
                    src={this.props.instrument.path}
                />
            </li>
        );
    }
}

export default Instrument;
