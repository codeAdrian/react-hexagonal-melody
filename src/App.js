import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import "./normalize.css";
import "./skeleton.css";
import "./shake.css";
import "./App.css";

class App extends Component {
  state = {
    instruments: [
      { path: "./audio/tom-high.mp3", key: "65" },
      { path: "./audio/cowbell.mp3", key: "87" },
      { path: "./audio/bass.mp3", key: "83" },
      { path: "./audio/hihat.mp3", key: "69" },
      { path: "./audio/snare.mp3", key: "68" },
      { path: "./audio/crash.mp3", key: "82" },
      { path: "./audio/tom-low.mp3", key: "70" }
  ]
  }
    render() {
        return (
            <div className="container mainWrapper">
                <Header />
                <Main instruments={this.state.instruments} />
                <Footer />
            </div>
        );
    }
}

export default App;
