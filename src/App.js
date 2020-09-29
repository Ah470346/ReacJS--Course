import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodoItem from './components/TodoItem';

function App() {
  return (
    <div className="App">
      <TodoItem title="Mua Bim Bim"/>
      <TodoItem title="Di Da Bong"/>
      <TodoItem title="Di Do Xang"/>
    </div>
  );
}

export default App;
