import React, { useState } from "react";
import "./TaskItem.css";

export default function TaskItem({
  id,
  title,
  taskState,
  onTaskUpdade,
  onDeleteTask
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableTitle, setEditableTitle] = useState(title);

  const onTitleChange = ({ target }) => {
    const newTitle = target.value;
    setEditableTitle(newTitle);
    onTaskUpdade(id, newTitle, taskState);
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      if (editableTitle.length === 0) {
        onDeleteTask(id);
      }
    }
  };

  const onTaskStageChange = (event) => {
    onTaskUpdade(id, title, event.target.value);
  };

  if (isEditing) {
    return (
      <div className="task-item">
        <input
          type="text"
          value={editableTitle}
          onChange={onTitleChange}
          onKeyPress={onKeyPress}
        />
      </div>
    );
  } else {
    return (
      <div className="task-item">
        <div onClick={(e) => setIsEditing(true)}>{editableTitle}</div>
        <select onChange={onTaskStageChange} value={taskState}>
          <option value="Pendente"> Pendente</option>
          <option value="Fazendo"> Fazendo</option>
          <option value="Completa"> Completa</option>
        </select>
      </div>
    );
  }
}
