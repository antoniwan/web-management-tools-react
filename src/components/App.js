import React, { Component } from "react";
import WMTNavbar from "./WMTNavbar";
import GetStarted from "./GetStarted";
import UploadFile from "./UploadFile";
import ParsedFilePing from "./ParsedFilePing";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      data: null,
      processing: false,
    };
  }

  handleClickGetStarted = () => {
    this.setState({
      step: 1,
    });
  };

  handleOnFileLoad = (data) => {
    this.setState({
      data: data,
    });
  };

  handleOnProceedWithCSV = () => {
    this.setState({
      step: 2,
    });
  };

  handleStartChecking = async () => {
    this.setState({
      processing: true,
    });

    // Traverse through each URL
    console.log(`Traverse through each URL`, this.state.data);
    const tableDataNow = this.state.data;
    tableDataNow.forEach((element) => {
      console.log(element);
      // Set value to spinners!
      this.setState({});
    });
    // Set the spinner for each URL

    // Do an axios GET call
    // Destroy the Spinner and return the response
  };

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
              handleOnFileLoad={this.handleOnFileLoad}
              handleOnProceedWithCSV={this.handleOnProceedWithCSV}
            />
          )}

          {this.state.step === 2 && (
            <ParsedFilePing
              tableData={this.state.data}
              handleStartChecking={this.handleStartChecking}
              processing={this.state.processing}
            />
          )}
        </main>
      </div>
    );
  }
}
