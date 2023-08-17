import React from 'react'
import './styles.css'
import { Todo } from '../model';
import SingleTodo from './SingleTodo';
// import { Droppable } from 'react-beautiful-dnd';
// This helper is needed for react-beautiful-dnd to work with React 18 Strict Mode
import { StrictModeDroppable as Droppable } from '../helpers/StrictModeDroppable';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }) => {
  return (
    <div className="container">
      <Droppable droppableId='TodosList'>
        {
          (provided, snapshot) => (
            <div className={`todos ${snapshot.isDraggingOver?'dragActive':''}`} ref={provided.innerRef} {...provided.droppableProps}>
              <span className="todosHeading">New Tasks</span>
              {/* map through each todo in the array and render a SingleTodo component for it */}
              {todos.map((todo, index) => (
                <SingleTodo index={index} todo={todo} key={todo.id} todos={todos} setTodos={setTodos} />
              ))}
              {/* creates an empty space where the draggable element was picked up */}
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>

      <Droppable droppableId='CompletedTodosList'>
        {
          (provided, snapshot) => (
            <div className={`todos remove ${snapshot.isDraggingOver?'dragComplete':''}`} ref={provided.innerRef} {...provided.droppableProps}>
              <span className="todosHeading">Completed Tasks</span>
              {completedTodos.map( (todo, index) => (
                <SingleTodo index={index} todo={todo} key={todo.id} todos={completedTodos} setTodos={setCompletedTodos} />
              ))}
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>

    </div>
  )
}

export default TodoList;