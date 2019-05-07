import React from "react";
import { Editor } from "slate-react";
import { Value } from "slate";
import shortId from "shortid";
import initialValue from "../slate/initial-value.json";
import { MarkHotkey } from "../slate/utilities";
import { CodeMark, BoldMark, ItalicMark, UnderlineMark, StrikethroughMark } from "../slate/marks";
import Button from "../Button";

class ContentCreator extends React.Component {
  state = {
    editors: [
      {
        id: shortId.generate(),
        value: Value.fromJSON(initialValue),
      },
    ],
  };

  render() {
    return (
      <React.Fragment>
        <Button label="Add unit" classes="addEditorBtn mb-2" action={this.handleAddingEditor} />
        <div className="editorsContainer">
          {this.state.editors.map((editor, idx) => (
            <div
              className="editorContainer"
              key={editor.id}
              onDragOver={() => this.onDragOver(idx)}>
              <div
                className="editorDragHandle"
                draggable={true}
                onDragStart={(e) => this.onDragStart(e, idx)}
                onDragEnd={this.onDragEnd}
              />
              <div className="editorInternal">
                <Editor
                  value={editor.value}
                  plugins={[
                    MarkHotkey({ type: "bold", key: "b" }),
                    MarkHotkey({ type: "italic", key: "i" }),
                    MarkHotkey({ type: "underline", key: "u" }),
                    MarkHotkey({ type: "strikethrough", key: "s" }),
                    MarkHotkey({ type: "code", key: "`" }),
                  ]}
                  placeholder={"Type something..."}
                  onChange={(change, id) => this.handleChange(change, editor.id)}
                  renderMark={this.renderMark}
                />

                <div className="editorContainerMeta flex">
                  <div />
                  <div className="editorContainerMetaActions">
                    <Button
                      label="Add unit"
                      classes="addEditorBtn metaEditorBtn"
                      action={() => alert(`Nested editors will be wired up soon!`)}
                      disabled
                    />
                    <Button
                      label="Remove unit"
                      classes="removeEditorBtn metaEditorBtn"
                      action={this.handleRemovingEditor}
                      value={editor.id}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }

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

    this.props.contentChange(this.state.editors);
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

  onDragStart = (e, index) => {
    this.draggedItem = this.state.editors[index];
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  onDragOver = (index) => {
    const draggedOverItem = this.state.editors[index];
    if (this.draggedItem === draggedOverItem) return;
    let editors = this.state.editors.filter((item) => item !== this.draggedItem);
    editors.splice(index, 0, this.draggedItem);
    this.setState({ editors });
  };
}

export default ContentCreator;
