import React, { Component } from "react";
import Instrument from "./Instrument";
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
    instruments: [
      { path: "./audio/tom-high.mp3", key: "65" },
      { path: "./audio/cowbell.mp3", key: "87" },
      { path: "./audio/bass.mp3", key: "83" },
      { path: "./audio/hihat.mp3", key: "69" },
      { path: "./audio/snare.mp3", key: "68" },
      { path: "./audio/crash.mp3", key: "82" },
      { path: "./audio/tom-low.mp3", key: "70" }
    ],
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
      audio.parentElement.classList.add("active", "shake", "shake-constant");
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
            this.setState({ message: "All correct. Congratulations." });
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
      this.setState({ disableInputs: true });
      this.setState({ gameArrayLength: 1 }, function() {
        setTimeout(this.runGame, 2000);
      });
    }
  }

  generateRandomArray(arrayLength) {
    let generatedArray = [];

    for (let i = 0; i < arrayLength; i++) {
      let generated = Math.floor(Math.random() * this.state.instruments.length);
      generatedArray.push(this.state.instruments[generated].key);
    }
    return generatedArray;
  }

  handleKeyPress(e) {
    this.playAudio(`${e.keyCode}`, true);
  }

  generateInstrumentKeyArray() {
    let keyArray = [];
    this.state.instruments.map(i => keyArray.push(i.key));
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
    let utilSpace_buttonText, utilSpace_stateText, utilSpace_score;
    this.state.gameActive
      ? (utilSpace_buttonText = "Return To Free Jam")
      : (utilSpace_buttonText = "Start New Game");
    this.state.gameActive
      ? (utilSpace_stateText = "Game Mode")
      : (utilSpace_stateText = "Free Jam Mode");
    this.state.gameActive
      ? (utilSpace_score = (
          <Score
            message={this.state.message}
            currentScore={this.state.currentScore}
          />
        ))
      : (utilSpace_score = null);

    return (
      <main>
        <article>
        {utilSpace_score}
          <ul className="drumkit">
            {this.state.instruments.map(i => (
              <Instrument
                playAudio={this.playAudio}
                handleKeyPress={this.handleKeyPress}
                disabled={this.state.disableInputs}
                key={i.key}
                instrument={i}
              />
            ))}
          </ul>
        </article>
        <article className="row">
          <div className="row">
            <p className="columns six">
              <button
                className="button-primary"
                onClick={this.toggleGameActive}
                disabled={this.state.disableInputs}
              >
                {utilSpace_buttonText}
              </button>
            </p>
            <p className="columns six">
              <span>
                <strong>Current mode:</strong>
                <br />
                {utilSpace_stateText}
              </span>
            </p>
          </div>
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
        </article>
      </main>
    );
  }
}

export default Main;
