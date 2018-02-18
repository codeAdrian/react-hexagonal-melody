import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import "./normalize.css";
import "./skeleton.css";
import "./shake.css";
import "./App.css";

class App extends Component {
 
  render() {

    return (
      <div className="container mainWrapper">
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
