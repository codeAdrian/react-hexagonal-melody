import React, { Component } from "react";

class Settings extends Component {
    render() {
        return (
            <article className="row">
                {this.props.utilSpace_score}
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
                <div>
                    <p>
                        <strong>Game mode: </strong>{" "}
                        <span>
                            Watch and listen to the pattern and repeat it.
                        </span>
                    </p>
                    <p>
                        <strong>Free Jam Mode: </strong>{" "}
                        <span>Play however you like.</span>
                    </p>
                </div>
            </article>
        );
    }
}

export default Settings;
