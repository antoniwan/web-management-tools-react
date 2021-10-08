import React, { Component } from "react";
import WMTNavbar from "./WMTNavbar";
import GetStarted from "./GetStarted";
import UploadFile from "./UploadFile";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      file: null,
    };
  }

  handleClickGetStarted = () => {
    this.setState({
      step: 1,
    });
  };

  handleClickUploadFile = () => {};

  handleClickResetUpload = () => {};

  render() {
    return (
      <div className="App">
        <WMTNavbar />
        <main>
          <h1>URL Status Checker</h1>

          {this.state.step === 0 && (
            <GetStarted handleClick={this.handleClickGetStarted} />
          )}

          {this.state.step === 1 && (
            <UploadFile
              handleClickUpload={this.handleClickUploadFile}
              handleClickReset={this.handleClickResetUpload}
            />
          )}
        </main>
      </div>
    );
  }
}
