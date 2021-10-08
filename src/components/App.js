import React, { Component, useState } from "react";
import WMTNavbar from "./WMTNavbar";
import { ControlGroup, FileInput, Button, Card } from "@blueprintjs/core";
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

function GetStarted(props) {
  const { handleClick } = props;
  return (
    <Card>
      <p>
        This tiny web app accepts a .csv with a list of URLs and iterates over
        them, returning a report of each of its status responses, giving us the
        answer to "Is the asset online or offline?"
      </p>
      <Button
        rightIcon="arrow-right"
        intent="success"
        text="Get started"
        onClick={handleClick}
      />
    </Card>
  );
}

function UploadFile(props) {
  const { handleClickUpload, handleClickReset } = props;
  const [fileStatus, setFileStatus] = useState({
    selected: false,
    name: "Upload a file...",
  });

  function handleFileInputChange(e) {
    console.log(e);
    setFileStatus(e.target.files[0]);
  }

  return (
    <Card>
      <p>Upload your file in the appropriate CSV format.</p>

      <ControlGroup vertical={false}>
        <FileInput
          text={fileStatus.name}
          hasSelection={fileStatus.size || false}
          disabled={fileStatus.size || false}
          buttonText="Select"
          onInputChange={handleFileInputChange}
        />
        {fileStatus.size && (
          <div>
            <Button intent="success" text="Upload"></Button>{" "}
            <Button intent="danger" text="Reset"></Button>
          </div>
        )}
      </ControlGroup>

      {false && (
        <Button
          rightIcon="arrow-right"
          intent="success"
          text="Reset"
          onClick={handleClickReset}
        />
      )}
    </Card>
  );
}
