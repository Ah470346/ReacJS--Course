import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodoItem from './components/TodoItem';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
      </header>
    </div>
  );
}

export default App;
