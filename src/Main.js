import React, { Component } from "react";
import Messages from "./Messages";
import Drumkit from "./Drumkit";
import Settings from "./Settings";
import Score from "./Score";

class Main extends Component {
    constructor() {
        super();
        this.playAudio = this.playAudio.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.toggleGameActive = this.toggleGameActive.bind(this);
        this.generateRandomArray = this.generateRandomArray.bind(this);
        this.runGame = this.runGame.bind(this);
    }
    state = {
        generatedArray: [],
        gameActive: false,
        disableInputs: false,
        gameArrayLength: 1,
        currentScore: 0,
        message: "Watch and listen.",
        gameCurrentPosition: 0
    };

    playAudio(key, recordState = false) {
        const audio = document.querySelector(`audio[data-key="${key}"]`);
        if (audio) {
            audio.parentElement.classList.add(
                "active",
                "shake",
                "shake-constant"
            );
            if (this.state.gameActive && recordState) {
                this.checkGameState(key, this.state.gameCurrentPosition);
            }
            audio.currentTime = 0;
            audio.play();
            setTimeout(function() {
                audio.parentElement.classList.remove(
                    "active",
                    "shake",
                    "shake-constant"
                );
            }, 200);
        } else return false;
    }

    checkGameState(key, position) {
        let generatedArray = this.state.generatedArray;
        if (generatedArray[position] === key) {
            if (position === generatedArray.length - 1) {
                this.setState(
                    { gameArrayLength: this.state.gameArrayLength + 1 },
                    function() {
                        this.setState(prevState => ({
                            currentScore: prevState.currentScore + 1
                        }));
                        this.setState({
                            message: "All correct. Congratulations."
                        });
                        setTimeout(this.runGame, 2000);
                    }
                );
            }
            this.setState({
                gameCurrentPosition: this.state.gameCurrentPosition + 1
            });
        } else {
            this.setState({ message: "You made an error. Try again." });
            this.setState({ currentScore: 0 });
            this.setState({ gameArrayLength: 1 });
            this.setState({ disableInputs: true }, function() {
                setTimeout(this.runGame, 2000);
            });
        }
    }

    generateRandomArray(arrayLength) {
        let generatedArray = [];

        for (let i = 0; i < arrayLength; i++) {
            let generated = Math.floor(
                Math.random() * this.props.instruments.length
            );
            generatedArray.push(this.props.instruments[generated].key);
        }
        return generatedArray;
    }

    handleKeyPress(e) {
        this.playAudio(`${e.keyCode}`, true);
    }

    generateInstrumentKeyArray() {
        let keyArray = [];
        this.props.instruments.map(i => keyArray.push(i.key));
        return keyArray;
    }

    toggleGameActive() {
        this.setState({ gameActive: !this.state.gameActive }, function() {
            if (this.state.gameActive) {
                this.runGame();
            } else {
                this.setState({ gameArrayLength: 1 });
                this.setState({ gameCurrentPosition: 0 });
            }
        });
    }

    runGame() {
        this.setState({ message: "Watch and listen." });
        let gameArray = this.generateRandomArray(this.state.gameArrayLength);
        this.setState({ gameCurrentPosition: 0 });
        this.setState({ generatedArray: gameArray });
        this.setState({ disableInputs: true });
        let i = 0;
        let interval = setInterval(
            function() {
                if (i < gameArray.length) {
                    this.playAudio(gameArray[i]);
                    i++;
                } else {
                    this.setState({ message: "Repeat the pattern." });
                    this.setState({ disableInputs: false });
                    clearInterval(interval);
                }
            }.bind(this),
            800
        );
    }

    render() {
        let utilSpace_buttonText,
            utilSpace_stateText,
            utilSpace_score,
            utilSpace_messages;

        if (this.state.gameActive) {
            utilSpace_buttonText = "Return To Free Jam";
            utilSpace_stateText = "Game Mode";
            utilSpace_score = <Score currentScore={this.state.currentScore} />;
            utilSpace_messages = <Messages message={this.state.message} />;
        } else {
            utilSpace_buttonText = "Start New Game";
            utilSpace_stateText = "Free Jam Mode";
            utilSpace_score = null;
            utilSpace_messages = null;
        }
        return (
            <main>
                {utilSpace_messages}

                <Drumkit
                    instruments={this.props.instruments}
                    playAudio={this.playAudio}
                    handleKeyPress={this.handleKeyPress}
                    disableInputs={this.state.disableInputs}
                />

                <Settings
                    toggleGameActive={this.toggleGameActive}
                    disableInputs={this.state.disableInputs}
                    utilSpace_score={utilSpace_score}
                    utilSpace_buttonText={utilSpace_buttonText}
                    utilSpace_stateText={utilSpace_stateText}
                />

            </main>
        );
    }
}

export default Main;
