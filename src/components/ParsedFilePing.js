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
            Check completed, download report now!
            <CSVDownloader
              data={tableData.map((element, index) => {
                return {
                  URL: element.data.url,
                  STATUS: element.data.status,
                  "RESPONSE CODE": element.data.responseCode,
                  "ASSET TYPE": element.data.assetType,
                };
              })}
              type="button"
              filename={`url-checker`}
              bom={true}
              config={{
                header: true,
                skipEmptyLines: true,
              }}
            >
              Download
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
