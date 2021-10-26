import React, { Component } from "react";
import axios from "axios";
import WMTNavbar from "./WMTNavbar";
import GetStarted from "./GetStarted";
import UploadFile from "./UploadFile";
import ParsedFilePing from "./ParsedFilePing";
import "./App.css";

let theActualTableData = null;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      data: null,
      processing: false,
      complete: false,
    };
  }

  handleOnFileLoad = (data) => {
    theActualTableData = data;
  };

  handleOnProceedWithCSV = () => {
    this.setState({
      step: 1,
    });
  };

  handleStartChecking = async () => {
    // Set processing to true!
    await this.setState({
      processing: true,
    });

    // Traverse through each URL

    const tableDataNow = this.state.data;
    console.log(tableDataNow, theActualTableData)

    let forEachResolved = new Promise((resolve, reject) => {
      theActualTableData.forEach(async (element, index, array) => {
        // Set the spinner for each URL
        const updatedData = {
          url: element.data.url,
          responseCode: null,
          assetType: null,
          status: null,
        };


        // Do an axios GET call
        await axios
          .get(element.data.url, {
            timeout: 10000,
          })
          .then(async (response) => {
            const responseData = {
              url: element.data.url,
              responseCode: response.status,
              assetType: response.headers["content-type"],
              status:
                response.status === 200 ||
                response.status === 301 ||
                response.status === 307 ||
                response.status === 308
                  ? "Online"
                  : "Offline",
            };
            // await this.setState((this.state.data[index].data = responseData));
            theActualTableData[index] = responseData;

          })
          .catch(async (error) => {
            const errorData = {
              url: element.data.url,
              responseCode: error?.response?.status || "unknown",
              assetType: "unknown",
              status: "Offline",
            };
            // await this.setState((this.state.data[index].data = errorData));
            theActualTableData[index] = errorData;
          });

        if (index === array.length - 1) resolve();
      });
    });

    forEachResolved.then(async () => {
      await this.setState({
        processing: false,
        complete: true,
      });
    });
  };

  render() {
    return (
      <div className="App">
        <WMTNavbar />
        <main>
          <h1>URL Status Checker</h1>

          {this.state.step === 0 && (
            <UploadFile
              handleOnFileLoad={this.handleOnFileLoad}
              handleOnProceedWithCSV={this.handleOnProceedWithCSV}
            />
          )}

          {this.state.step === 1 && (
            <ParsedFilePing
              tableData={theActualTableData}
              handleStartChecking={this.handleStartChecking}
              processing={this.state.processing}
              complete={this.state.complete}
            />
          )}
        </main>
      </div>
    );
  }
}
