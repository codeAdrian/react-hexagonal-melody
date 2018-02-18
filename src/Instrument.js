import React, { Component } from "react";

class Instrument extends Component {
  componentDidMount() {
    window.addEventListener("keyup", this.props.handleKeyPress.bind(this));
  }

  render() {
    let utilSpace_className = `instrument__button instrument__button--${String.fromCharCode(this.props.instrument.key)}`;
    return (
      <li className="drumkit__instrument">
        <button className={utilSpace_className} disabled={this.props.disabled} onClick={() => this.props.playAudio(this.props.instrument.key,true)}>
          <span className="instrument__buttonIcon"></span>
          <span className="instrument__buttonCode">{String.fromCharCode(this.props.instrument.key)}</span>
        </button>
        <audio
        className="instrument__audio"
          data-key={this.props.instrument.key}
          src={this.props.instrument.path}
        />
      </li>
    );
  }
}

export default Instrument;
