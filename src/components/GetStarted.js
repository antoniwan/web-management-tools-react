import React from "react";
import { Button, Card, Divider } from "@blueprintjs/core";

export default function GetStarted(props) {
  const { handleClick } = props;
  return (
    <Card>
      <p>
        This tiny web app accepts a .csv with a list of URLs and iterates over
        them, returning a report of each of its status responses, giving us the
        answer to "Is the asset online or offline?"
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
