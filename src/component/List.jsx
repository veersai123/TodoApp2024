// List.jsx
import React, { useState } from 'react';
import './List.css'; // Import CSS file
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function List({ todo, deleteItem, renameItem }) {
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditedText(text);
  };

  const handleSave = (id) => {
    renameItem(id, editedText);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedText('');
  };

  const handleInputChange = (event) => {
    setEditedText(event.target.value);
  };

  return (
    <div className="list-container">
      <ul>
        {todo.map((item) => (
          <li key={item.id} className="list-item">
            <span className="list-item-text">{item.text}</span>
            <span className="list-item-date">
              {new Date(item.timestamp).toLocaleString()}
            </span>
            <div className="icons-container">
              {editingId === item.id ? (
                <div>
                  <input
                    type="text"
                    value={editedText}
                    onChange={handleInputChange}
                  />
                  <button onClick={() => handleSave(item.id)}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              ) : (
                <div>
                  <DeleteIcon
                    className="delete-icon"
                    onClick={() => deleteItem(item.id)}
                  />
                  <EditIcon
                    className="edit-icon"
                    onClick={() => handleEdit(item.id, item.text)}
                  />
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
