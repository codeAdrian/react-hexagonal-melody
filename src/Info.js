import React, { Component } from "react";

class Info extends Component {
    render() {
        return (
            <div>
                <p>
                    <strong>Game mode: </strong>{" "}
                    <span>Watch and listen to the pattern and repeat it.</span>
                </p>
                <p>
                    <strong>Free Jam Mode: </strong>{" "}
                    <span>Play however you like.</span>
                </p>
            </div>
        );
    }
}

export default Info;