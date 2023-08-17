import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './model';
import {DragDropContext, DropResult} from 'react-beautiful-dnd'

// React.FC is functional component
const App: React.FC = () => {

  //manages state of input field
  const [todo, setTodo] = useState<string>('');

  //manages state of todo list
  const [todos, setTodos] = useState<Todo[]>([]);

  //manages state of completed todo list
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  //handles submission of new Todo
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    //only change state if there's a todo in the input field
    if (todo) {
      //spread operator to copy todos array and add new todo, Date.now() to create unique id
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      //clear input field
      setTodo('');
    }
  }

  const onDragEnd = (result:DropResult) => {
    const {source, destination} = result;
    //if there is no valid destination, return
    if(!destination) return;
    //if destination is same as starting position (source element and index), return
    if(source.droppableId === destination.droppableId && source.index === destination.index){
      return;
    }

    //declare placeholder variables
    let add, active = todos, complete = completedTodos;

    //if the source ID is the list of active ToDos
    if (source.droppableId === 'TodosList'){
      // set add equal to the element at source.index
      add = active[source.index];
      // remove the element at source.index from the active array
      active.splice(source.index, 1);
    // else the source ID is from the list of completed ToDos
    } else {
      // set add equal to the element at source.index
      add = complete[source.index];
      // remove the element at source.index from the complete array
      complete.splice(source.index, 1);
    }

    //if the destination ID is the list of active ToDos
    if (destination.droppableId === 'TodosList'){
      // add the element at source.index to the active array at destination.index
      active.splice(destination.index, 0, add);
    //else the destination ID is the list of completed ToDos
    } else {
      // add the element at source.index to the complete array at destination.index
      complete.splice(destination.index, 0, add);
    }

    //update state with new arrays
    setCompletedTodos(complete);
    setTodos(active);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Task Slayer</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
      </div>
    </DragDropContext>

  );
}

export default App;
