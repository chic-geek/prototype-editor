import React from "react";

class Draggable extends React.Component {
  render() {
    return this.props.children({
      ...this.state,
      onDragStart: this.onDragStart,
      onDragOver: this.onDragOver,
    });
  }

  onDragStart = (e, index) => {
    this.draggedItem = index;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  onDragOver = (index) => {
    const draggedOverItem = index;

    if (this.draggedItem === draggedOverItem) return;
    let editors = this.state.editors.filter((item) => item !== this.draggedItem);
    editors.splice(index, 0, this.draggedItem);

    this.setState({ editors });
  };
}

export default Draggable;
