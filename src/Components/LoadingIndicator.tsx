import React from "react";
import { Loader } from "semantic-ui-react";

export default function ErrorMessage() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "4em" }}
    >
      <Loader active inline="centered" size="large">
        Loading...
      </Loader>
    </div>
  );
}
