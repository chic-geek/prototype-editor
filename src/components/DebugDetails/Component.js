import React from "react";

const DebugDetails = ({ state }) => (
  <div className="detailsComponent">
    <h2>Application state</h2>
    <pre>
      <code>{JSON.stringify(state, null, 2)}</code>
    </pre>
  </div>
);

export default DebugDetails;
