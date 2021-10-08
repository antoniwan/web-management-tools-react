import React from "react";
import { Button, Card, Divider, Spinner } from "@blueprintjs/core";

export default function ParsedFilePing(props) {
  const { tableData, handleStartChecking, onUpdateData, processing } = props;

  const Rows = tableData.map((element) => {
    console.log(element);
    return (
      <tr key={element.data.url}>
        <td>{element.data.url}</td>
        <td>{element.data.status || null}</td>
        <td>{element.data.responseCode || null}</td>
        <td>{element.data.assetType || null}</td>
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
