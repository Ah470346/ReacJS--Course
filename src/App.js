import React, { Component } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import classNames from 'classnames';
import tick2 from './img/tick2.svg';

class App extends Component{
  constructor(){
    super();
    let dataString = localStorage.getItem('todoList');
    let todoList;
    if(dataString){
			todoList = JSON.parse(dataString);
		} else {
			todoList = [];
		}
    this.state = {
      isTick: false,
      status: 'All',
      newItem: '',
      todoItems: todoList
        // {title: "Mua Bim Bim", isComplete: false},
        // {title: "Di Da Bong", isComplete: true},
        // {title: "Di Do Xang",isComplete: false}
    };
    this.onkeyUp = this.onkeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onAllCheck = this.onAllCheck.bind(this);
    this.onFilter = this.onFilter.bind(this);
  }

  onFilter(event){
    const text = event.target.text;
    const {status} = this.state;
    if(text === status){
      return;
    } else if(text === 'All'){
      this.setState({
        status: 'All'
      })
    } else if(text === 'Active'){
      this.setState({
        status: 'Active'
      })
    } else if(text === 'Completed'){
      this.setState({
        status: 'Completed'
      })
    }
  }

  onDeleteItem(item){
    return (event) => {
      const {todoItems} = this.state;
      const index = todoItems.indexOf(item);
      const newToDoItems = todoItems.filter((x,i)=> i !== index);
      this.setState({
        todoItems: newToDoItems
      })
    } 
  }
  
  onkeyUp(event){
    let text = event.target.value;
    let todoItems = JSON.parse(JSON.stringify(this.state.todoItems));
    if(event.keyCode === 13){ // enter key = 13
      let todoList = [{title: text, isComplete: false},...todoItems]
      if(!text){
        return;
      }
      text = text.trim();
      if(!text) return;
      this.setState({
        newItem: '',
        todoItems:todoList
      })
      localStorage.setItem('todoList', JSON.stringify(todoList));
    }
  }

  onChange(event){
    this.setState({
      newItem: event.target.value
    })
  }

  onAllCheck(){
    let dem = 0;
    const isTick = this.state.isTick;
    const arr = [...this.state.todoItems];
    const TrueFalse = arr.map((item) => {
      let newItem = {...item,isComplete: !item.isComplete};
      return newItem;
    });
    console.log(TrueFalse);
    let True = arr.map((item)=>{
      let newItem = {...item,isComplete: true}
      return newItem;
    });
    for(let item of arr){
      if(item.isComplete === true){
        dem++;  
      }
      console.log(dem);
    }
    
    if(dem === arr.length || dem === 0){
      this.setState({
        isTick: !isTick,
        todoItems: TrueFalse
      });
    } else {
      this.setState({
        isTick: true,
        todoItems: True
      });
    }
  }

  onItemClick(item){
    let todoItems = JSON.parse(JSON.stringify(this.state.todoItems));
    return (event) => {
      const isComplete = item.isComplete;
      const index = this.state.todoItems.indexOf(item);
      let todoList = [
        ...todoItems.slice(0,index),
        {
          ...item,
          isComplete: !isComplete
        },
        ...todoItems.slice(index + 1)
      ];
      this.setState({
        todoItems:todoList
      });
      localStorage.setItem('todoList', JSON.stringify(todoList))
    }
  }

  render(){
    const {status} = this.state;
    let render;
    const {todoItems} = this.state;
    const active = todoItems.filter((item) => item.isComplete !== true)
    const completed = todoItems.filter((item) => item.isComplete !==false)
    if(status === 'All'){
      render = todoItems;
    } else if(status === 'Active'){
      render = active;
    } else if(status === 'Completed'){
      render = completed;
    }
    return (
      <div className="App">
        <div className="header">
          <img className={classNames({
            tick: this.state.isTick
          })} 
            onClick={this.onAllCheck} 
            src={tick2} 
            width="16" 
            height="16"></img>
          <input 
            type='text' 
            placeholder="What Needs To Be Done?" 
            onKeyUp={this.onkeyUp}
            value={this.state.newItem}
            onChange={this.onChange}></input>
        </div>
        {
          render.length > 0 && render.map((item,index) => 
            <TodoItem
              key={index} 
              item={item} 
              onClick={this.onItemClick(item)}
              onDelete={this.onDeleteItem(item)}/>
          )
        }
        {
          this.state.todoItems.length === 0 && 'Nothing Here'
        }
        <div className="nav">
          <div className="wrap-nav">
            <a onClick={this.onFilter} href="#" className={classNames({
              border: this.state.status !== 'All',
              'border-active': this.state.status === 'All'
            })}>All</a>
            <a onClick={this.onFilter} href="#" className={classNames({
              border: this.state.status !== 'Active',
              'border-active': this.state.status === 'Active'
            })}>Active</a>
            <a onClick={this.onFilter} href="#" className={classNames({
              border: this.state.status !== 'Complete',
              'border-active': this.state.status === 'Completed'
            })}>Completed</a>
          </div>
          <a href="#">Clear completed</a>
        </div>
      </div>
    );
  }
}

export default App;
