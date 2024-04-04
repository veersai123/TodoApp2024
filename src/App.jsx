// App.jsx
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css'; // Import the main App CSS file
import List from './component/List';

function App() {
  const [text, setText] = useState('');
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const storedTodo = localStorage.getItem('todo');
    if (storedTodo) {
      setTodo(JSON.parse(storedTodo)); // Load todo items from local storage into state
    }
  }, []); // Run only once on component mount

  const newItem = () => {
    // Trim the text to remove leading and trailing spaces
    const trimmedText = text.trim();

    // Check if the trimmed text is empty
    if (trimmedText === '') {
      // If the text is empty, return without adding a new item
      return;
    }

    const newItem = {
      id: uuidv4(),
      text: trimmedText,
      timestamp: new Date().toISOString(), // Add timestamp field with current date and time
      done: false,
    };
    setTodo([...todo, newItem]); // Update state with new todo item
    setText('');
    updateLocalStorage([...todo, newItem]); // Update local storage with updated todo list
  };

  const deleteItem = (id) => {
    setTodo(todo.filter((item) => item.id !== id)); // Update state by removing the deleted todo item
    updateLocalStorage(todo.filter((item) => item.id !== id)); // Update local storage with updated todo list
  };

  const renameItem = (id, newText) => {
    const updatedTodo = todo.map((item) =>
      item.id === id ? { ...item, text: newText } : item
    );
    setTodo(updatedTodo); // Update state with the renamed todo item
    updateLocalStorage(updatedTodo); // Update local storage with updated todo list
  };

  const updateLocalStorage = (updatedTodo) => {
    localStorage.setItem('todo', JSON.stringify(updatedTodo)); // Update local storage with updated todo list
  };

  return (
    <div className='container gradient-custom-2 mask-custom'>
      <h1 className="title">Hello Todo</h1>
      <div className="input-container">
        <input
          type="text"
          className="input-field"
          placeholder='write your text'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />&nbsp;
        <button className="add-button" onClick={newItem}>Add Item</button>
      </div>
      <List todo={todo} deleteItem={deleteItem} renameItem={renameItem} />
    </div>
  );
}

export default App;
