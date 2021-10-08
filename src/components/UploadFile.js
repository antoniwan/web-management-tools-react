import React from "react";
import { CSVReader } from "react-papaparse";
import { Divider, Button, Card, ButtonGroup } from "@blueprintjs/core";

const buttonRef = React.createRef();

export default function UploadFile(props) {
  const { handleOnFileLoad, handleOnProceedWithCSV } = props;

  function handleOpenDialog(e) {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  }

  function handleOnError(err, file, inputElement, reason) {
    console.log(err, file, inputElement, reason);
    alert(reason);
  }

  function handleOnRemoveFile(e) {
    buttonRef.current.removeFile(e);
  }

  return (
    <Card>
      <p>
        Upload your file in the appropriate{" "}
        <a
          href={process.env.PUBLIC_URL + "example/example-format-csv.csv"}
          target="_blank"
          download="example-format.csv"
          rel="noreferrer"
        >
          CSV format
        </a>
        .{" "}
        <em>
          Important: This tool will <strong>NOT STORE</strong> imported or
          analyzed files. Meaning, it won't save history!{" "}
          <u>Please download the report once it's generated (next page)!</u>
        </em>
      </p>
      <Divider />

      <div className="card-actions">
        <CSVReader
          ref={buttonRef}
          onFileLoad={handleOnFileLoad}
          onError={handleOnError}
          noDrag
          addRemoveButton
          config={{
            header: true,
            skipEmptyLines: true,
          }}
        >
          {({ file }) => (
            <ButtonGroup large={true} vertical={true}>
              {!file && (
                <>
                  <Button
                    text="Browse & select CSV file"
                    onClick={handleOpenDialog}
                    rightIcon="upload"
                  />
                </>
              )}
              {file && file.name && (
                <>
                  <Button
                    intent="success"
                    text={`Proceed with the selected file: ${
                      file && file.name
                    }`}
                    onClick={handleOnProceedWithCSV}
                    rightIcon="arrow-right"
                  />
                  <Button
                    text="Reset"
                    intent="danger"
                    onClick={handleOnRemoveFile}
                    minimal={true}
                    rightIcon="delete"
                  ></Button>
                </>
              )}
            </ButtonGroup>
          )}
        </CSVReader>
      </div>
    </Card>
  );
}
