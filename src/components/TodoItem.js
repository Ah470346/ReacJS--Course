import React, { Component } from 'react';
import classNames from 'classnames';
import './TodoItem.css';
import cancel from '../img/cancel.svg';

class TodoItem extends Component {

    render(){
        const {item, onClick, onDelete} = this.props;
        return (
            <div className={classNames('TodoItem',{
                'TodoItem-Done': item.isComplete
            })}>
                <div onClick={onClick} className={classNames('check',{
                    isCheck: item.isComplete
                })}></div>
                <p>{this.props.item.title}</p>
                <img onClick={onDelete} src={cancel} width="12" height="12"></img>
            </div>
        )
    }
}

export default TodoItem;