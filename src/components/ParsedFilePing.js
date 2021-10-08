import React from "react";
import { CSVDownloader } from "react-papaparse";
import { Button, Card, Divider, Spinner } from "@blueprintjs/core";

export default function ParsedFilePing(props) {
  const { tableData, handleStartChecking, processing, complete } = props;

  const Rows = tableData.map((element, index) => {
    return (
      <tr key={`${element.data.url}-${index}`}>
        <td>{index + 1}</td>
        <td>
          <a href={element.data.url} target="_blank" rel="noreferrer">
            {element.data.url}
          </a>
        </td>
        <td>
          {element.data.status === null && <CustomSpinner />}
          {element.data.status && <>{element.data.status}</>}
        </td>
        <td>
          {element.data.responseCode === null && <CustomSpinner />}
          {element.data.responseCode && <>{element.data.responseCode}</>}
        </td>
      </tr>
    );
  });

  return (
    <Card>
      <p>
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
                  url: element.data.url,
                  status: element.data.status,
                  "response code": element.data.responseCode,
                  "asset type": element.data.assetType,
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
      <Divider />

      <div className="card-actions">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>URL</th>
              <th>Status</th>
              <th>Response Code</th>
            </tr>
          </thead>
          <tbody>{Rows}</tbody>
        </table>
      </div>
    </Card>
  );
}

function CustomSpinner() {
  return <Spinner size={20} />;
}
