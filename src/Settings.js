import React, { Component } from "react";
import GameMode from "./GameMode";
import Info from "./Info";

class Settings extends Component {
    render() {
        return (
            <article className="row">
                {this.props.utilSpace_score}

                <GameMode
                    utilSpace_stateText={this.props.utilSpace_stateText}
                    utilSpace_buttonText={this.props.utilSpace_buttonText}
                    disableInputs={this.props.disableInputs}
                    toggleGameActive={this.props.toggleGameActive}
                />

                <Info />
            </article>
        );
    }
}

export default Settings;
