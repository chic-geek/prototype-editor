import React from "react";
import packageJson from "../../../package.json";

const AppBar = ({ projectTitle, action }) => (
  <div className="appBar">
    <code>
      <strong>Prototype: </strong>
      {projectTitle}
    </code>
    <div>
      <code>
        <strong>Version:</strong> {packageJson.version}
      </code>
      <button className="btn debugBtn" onClick={action}>
        Debug
      </button>
    </div>
  </div>
);

export default AppBar;
