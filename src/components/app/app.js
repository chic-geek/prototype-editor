import React from "react";
import { Editor } from "slate-react";
import { Value } from "slate";
import shortId from "shortid";
import initialValue from "../slate/initial-value.json";
import { MarkHotkey } from "../slate/utilities";
import { CodeMark, BoldMark, ItalicMark, UnderlineMark, StrikethroughMark } from "../slate/marks";

const plugins = [
  MarkHotkey({ type: "bold", key: "b" }),
  MarkHotkey({ type: "italic", key: "i" }),
  MarkHotkey({ type: "underline", key: "u" }),
  MarkHotkey({ type: "strikethrough", key: "s" }),
  MarkHotkey({ type: "code", key: "`" }),
];

class App extends React.Component {
  state = {
    editors: [],
  };

  handleChange = (props, id) => {
    const mappedEditors = this.state.editors.map((editor) => {
      if (editor.id === id) {
        editor = { ...editor, value: props.value };
      }
      return editor;
    });

    this.setState({
      editors: mappedEditors,
    });
  };

  handleKeyDown = (event, editor, next) => {
    if (!event.ctrlKey) return next();
    switch (event.key) {
      case "b": {
        event.preventDefault();
        editor.toggleMark("bold");
        break;
      }
      case "i": {
        event.preventDefault();
        editor.toggleMark("italic");
        break;
      }
      case "`": {
        const isCode = editor.value.blocks.some((block) => block.type === "code");
        event.preventDefault();
        editor.setBlocks(isCode ? "paragraph" : "code");
        break;
      }
      default: {
        return next();
      }
    }
  };

  handleAddingEditor = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      editors: [
        ...prevState.editors,
        {
          id: shortId.generate(),
          value: Value.fromJSON(initialValue),
        },
      ],
    }));
  };

  handleRemovingEditor = (e) => {
    e.preventDefault();
    const { editors } = this.state;
    const editorId = e.target.value;
    alert(`Are you sure you want to remove editor ${editorId}?`);
    this.setState({
      editors: editors.filter((editor) => editor.id !== editorId),
    });
  };

  render() {
    return (
      <div className="app">
        <h1>Testing: multiple editors</h1>

        <header className="header">
          <button onClick={this.handleAddingEditor} className="btn addEditorBtn">
            Add unit
          </button>
        </header>

        <div className="editorsContainer">
          {this.state.editors.map((editor, idx) => (
            <div key={editor.id} className="editorContainer">
              <Editor
                value={editor.value}
                plugins={plugins}
                placeholder={"Get writing..."}
                onChange={(change, id) => this.handleChange(change, editor.id)}
                renderMark={this.renderMark}
              />

              <div className="editorContainerMeta flex">
                <div>
                  <code>editor id: {editor.id}</code>
                </div>
                <div class="editorContainerMetaActions">
                  <button
                    className="btn addEditorBtn metaEditorBtn"
                    onClick={() => alert(`Nested editors will be wired up soon!`)}>
                    Add unit
                  </button>
                  <button
                    onClick={this.handleRemovingEditor}
                    className="btn removeEditorBtn metaEditorBtn"
                    value={editor.id}>
                    Remove unit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <details className="detailsComponent">
          <summary>
            <code>application state</code>
          </summary>
          <pre>
            <code>{JSON.stringify(this.state, null, 2)}</code>
          </pre>
        </details>
      </div>
    );
  }

  renderMark = (props, editor, next) => {
    switch (props.mark.type) {
      case "code":
        return <CodeMark {...props} />;
      case "bold":
        return <BoldMark {...props} />;
      case "italic":
        return <ItalicMark {...props} />;
      case "underline":
        return <UnderlineMark {...props} />;
      case "strikethrough":
        return <StrikethroughMark {...props} />;
      default:
        return next();
    }
  };
}

export default App;
