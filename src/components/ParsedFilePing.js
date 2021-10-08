import React from "react";
import { Button, Card, Divider, Spinner } from "@blueprintjs/core";

export default function ParsedFilePing(props) {
  const { tableData, handleStartChecking, processing } = props;

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
        <td>
          {element.data.assetType === null && <CustomSpinner />}
          {element.data.assetType && <>{element.data.assetType}</>}
        </td>
      </tr>
    );
  });

  return (
    <Card>
      <p>
        Found <strong>{tableData.length} URL</strong>.{" "}
        <Button
          intent="success"
          text={processing ? "Processing! PLEASE WAIT!" : "Start Processing!"}
          onClick={handleStartChecking}
          disabled={processing}
        ></Button>
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
              <th>Asset Type</th>
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
