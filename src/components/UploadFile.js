import React from "react";
import { CSVReader } from "react-papaparse";
import { Divider, Button, Card, ButtonGroup } from "@blueprintjs/core";

const buttonRef = React.createRef();

export default function UploadFile() {
  function handleOpenDialog(e) {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  }

  function handleOnFileLoad(data) {
    console.log(data);
  }

  function handleOnError(err, file, inputElement, reason) {
    console.log(err, file, inputElement, reason);
  }

  function handleOnRemoveFile(e) {
    buttonRef.current.removeFile(e);
  }

  function handleProceed(data) {
    console.log(data);
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
        . If you don't know the format, please{" "}
        <a
          href={process.env.PUBLIC_URL + "example/example-format-csv.csv"}
          target="_blank"
          download="example-format.csv"
          rel="noreferrer"
        >
          download it here
        </a>
        !{" "}
        <em>
          Important: this tool will <strong>NOT SAVE</strong> your files or the
          results.
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
                    onClick={handleProceed}
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
