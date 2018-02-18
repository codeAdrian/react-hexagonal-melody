import React, { Component } from "react";

class GameMode extends Component {
    render() {
        return (
            <div className="row">
                <p className="columns six">
                    <button
                        className="button button-primary"
                        onClick={this.props.toggleGameActive}
                        disabled={this.props.disableInputs}
                    >
                        {this.props.utilSpace_buttonText}
                    </button>
                </p>
                <p className="columns six">
                    <span>
                        <strong>Current mode:</strong>
                        <br />
                        {this.props.utilSpace_stateText}
                    </span>
                </p>
            </div>
        );
    }
}

export default GameMode;
