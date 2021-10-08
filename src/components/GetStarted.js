import React from "react";
import { Button, Card, Divider } from "@blueprintjs/core";

export default function GetStarted(props) {
  const { handleClick } = props;
  return (
    <Card>
      <p>
        This tiny web app accepts a{" "}
        <a
          href={process.env.PUBLIC_URL + "example/example-format-csv.csv"}
          target="_blank"
          download="example-format.csv"
          rel="noreferrer"
        >
          .csv
        </a>{" "}
        with a list of URLs and iterates over them, returning a report of each
        of its status responses, giving us the answer to "Is the asset online or
        offline?" If you require an example file, please{" "}
        <a
          href={process.env.PUBLIC_URL + "example/example-format-csv.csv"}
          target="_blank"
          download="example-format.csv"
          rel="noreferrer"
        >
          download it here
        </a>
        !
      </p>
      <Divider />

      <div className="card-actions">
        <Button
          rightIcon="arrow-right"
          intent="success"
          text="Get started"
          onClick={handleClick}
          large={true}
        />
      </div>
    </Card>
  );
}
