import React from "react";
import { CSVDownloader } from "react-papaparse";
import { Button, Card, Divider, Spinner } from "@blueprintjs/core";

export default function ParsedFilePing(props) {
  const { tableData, handleStartChecking, processing, complete } = props;

  console.log(tableData);
  return (
    <Card>
      <p style={{ "marginBottom": "0px"}}>
        Found <strong>{tableData.length} URL</strong>.{" "}
        {!complete && (
          <Button
            intent="warning"
            text={processing ? "Processing! PLEASE WAIT!" : "Start Processing!"}
            onClick={handleStartChecking}
            disabled={processing}
          ></Button>
        )}
        {complete && (
          <>
            Check completed!!!{" "}
            

            
            
            
            <CSVDownloader
              data={tableData.map((element, index) => {
                return {
                  url: element.url,
                  status: element.status,
                  "response code": element.responseCode,
                  "asset type": element.assetType,
                };
              })}
              type="button"
              className="bp3-button bp3-large bg3-intent-primary"
              filename={`url-status-checker-report-${Date.now()}`}
              bom={true}
              config={{
                header: true,
                skipEmptyLines: true,
              }}
            >
              Download the report now!
            </CSVDownloader>
          </>
        )}
      </p>

    </Card>
  );
}

function CustomSpinner() {
  return <Spinner size={20} />;
}
