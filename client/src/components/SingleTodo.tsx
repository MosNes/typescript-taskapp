import React from 'react'
import { Todo } from '../model';

type Props = {
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo = ({todo, todos, setTodos}: Props) => {
  return (
    <form className='todosSingle'>
        <span className='todosSingleText'>
            {todo.todo}
        </span>
    </form>
  )
}

export default SingleTodo