import React, { Component } from "react";

class Score extends Component {
  state = {
    highScore: this.props.currentScore
  };

  componentWillUpdate(nextProps) {
    if (nextProps.currentScore > this.state.highScore) {
      this.setState({ highScore: nextProps.currentScore });
    }
  }

  render() {
    return (
      <div>
        <hr />
        <div className="row">
          <div className="six columns">
          <strong>Current Score: </strong>{this.props.currentScore}
          </div>
          <div className="six columns"><strong>High Score: </strong>{this.state.highScore}</div>
        </div>
        <hr />
      </div>
    );
  }
}

export default Score;
