import React, { Component } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';

class App extends Component{
  constructor(){
    super();
    this.state = {
      todoItems:[
        {title: "Mua Bim Bim", isComplete: true},
        {title: "Di Da Bong", isComplete: true},
        {title: "Di Do Xang",isComplete: false}
      ]
    };
    this.onItemClick = this.onItemClick.bind(this);
  }

  onItemClick(item){
    return () => {
      const a = item.title;
      const newToDoItem = [...this.state.todoItems];
      const changeToDoItem = newToDoItem.map((item) =>{
        if(item.title === a){
          item.isComplete = !item.isComplete
          return item;
        }
        return item;
      });
      this.setState({
        todoItems: changeToDoItem
      })
    }
  }

  render(){
    return (
      <div className="App">
        {
          this.state.todoItems.length > 0 && this.state.todoItems.map((item,index) => 
            <TodoItem key={index} item={item} onClick={this.onItemClick(item)}/>
          )
        }
        {
          this.state.todoItems.length === 0 && 'Nothing Here'
        }
      </div>
    );
  }
}

export default App;
