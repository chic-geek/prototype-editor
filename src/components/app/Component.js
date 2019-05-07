import React from "react";
import AppBar from "../AppBar";
import DebugDetails from "../DebugDetails";
import ContentCreator from "../ContentCreator";

class App extends React.Component {
  state = {
    inDebug: false,
    editorsState: [],
  };

  render() {
    const { inDebug } = this.state;

    return (
      <div className="app">
        <div className="container">
          <ContentCreator
            inDebug={inDebug}
            contentChange={(fields) => this.contentChange(fields)}
          />
          {inDebug && <DebugDetails state={this.state} />}
        </div>

        <AppBar
          projectTitle="Testing unit creation"
          action={() => this.setState({ inDebug: !inDebug })}
        />
      </div>
    );
  }

  contentChange = (editorsState) => {
    this.setState({ editorsState });
  };
}

export default App;
