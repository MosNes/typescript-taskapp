import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import InputField from './components/InputField';
import {Todo} from './model';

// React.FC is functional component
const  App: React.FC =  () => {

  //manages state of input field
  const [todo, setTodo] = useState<string>('');

  //manages state of todo list
  const [todos, setTodos] = useState<Todo[]>([]);

  //handles submission of new Todo
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    
    //only change state if there's a todo in the input field
    if (todo) {
      //spread operator to copy todos array and add new todo, Date.now() to create unique id
      setTodos([...todos, {id: Date.now(), todo: todo, isDone: false}]);
      //clear input field
      setTodo('');
    }
  }

  console.log(todos);
  
  return (
    <div className="App">
      <span className="heading">Task Slayer</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
    </div>
  );
}

export default App;
