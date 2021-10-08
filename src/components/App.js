import React, { Component } from "react";
import axios from "axios";
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
    // Set processing to true!
    await this.setState({
      processing: true,
    });

    // Traverse through each URL
    console.log(`Traverse through each URL`, this.state.data);

    const tableDataNow = this.state.data;

    await tableDataNow.forEach(async (element, index) => {
      // Set the spinner for each URL
      const updatedData = {
        url: element.data.url,
        responseCode: null,
        assetType: null,
        status: null,
      };

      await this.setState((this.state.data[index].data = updatedData));

      // Do an axios GET call
      console.log("Doing the GET REQUESTS!!!", element);

      axios
        .get(element.data.url, {
          timeout: 1000,
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
          await this.setState((this.state.data[index].data = responseData));
        })
        .catch(async (error) => {
          const responseData = {
            url: element.data.url,
            responseCode: error?.response?.status || "unknown",
            assetType: "unknown",
            status: "Offline",
          };
          await this.setState((this.state.data[index].data = responseData));
        });

      // await axios.get(element.data.url).then(async (response) => {
      //   console.log(`Response for ${element.data.url}`, response);
      //   const responseData = {
      //     url: element.data.url,
      //     responseCode: response.status,
      //     assetType: response.headers["content-type"],
      //     status:
      //       response.status === 200 ||
      //       response.status === 301 ||
      //       response.status === 307 ||
      //       response.status === 308
      //         ? "Online"
      //         : "Offline",
      //   };

      //   await this.setState((this.state.data[index].data = responseData));
      // });
      // Destroy the Spinner and return the response
    });
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
