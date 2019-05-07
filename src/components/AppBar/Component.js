import React from "react";
import packageJson from "../../../package.json";

const AppBar = ({ projectTitle, action }) => (
  <div className="appBar">
    <ul className="flex m-0">
      <li className="appBar-details">
        <strong>Prototype name: </strong>
        <span className="appBar-detail">{packageJson.name}</span>
      </li>
      <li className="ml-1 appBar-details">
        <strong>Homepage: </strong>
        <a className="appBar-detail" href={packageJson.homepage}>
          {packageJson.homepage}
        </a>
      </li>
    </ul>

    <div className="appBar-details">
      <strong>Version: </strong>
      <span className="appBar-detail">{packageJson.version}</span>
    </div>
  </div>
);

export default AppBar;
