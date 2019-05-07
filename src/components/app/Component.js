import React from "react";
import AppBar from "../AppBar";
import ContentCreator from "../ContentCreator";

class App extends React.Component {
  state = {
    editorsState: [],
  };

  render() {
    return (
      <div className="app">
        <div className="container">
          <ContentCreator contentChange={(fields) => this.contentChange(fields)} />
        </div>

        <AppBar projectTitle="Testing unit creation" />
      </div>
    );
  }

  contentChange = (editorsState) => {
    this.setState({ editorsState });
  };
}

export default App;
