import React from 'react'
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';

type Props = {
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo = ({ todo, todos, setTodos }: Props) => {

    const handleDone = (id:number) => {
        setTodos(todos.map(
            //if todo.id matches id passed in, return todo with isDone flipped, else return todo
            todo => todo.id === id?{...todo, isDone: !todo.isDone}:todo
            ));
        };

    return (
        <form className='todosSingle'>

            {todo.isDone? (
                <span className='todosSingleText done'>
                    {todo.todo}
                </span>
            ):(
                <span className='todosSingleText'>
                    {todo.todo}
                </span>
            )}

            
            {/* div to hold icons */}
            <div>
                <span className="icon"><AiFillEdit /></span>
                <span className="icon"><AiFillDelete /></span>
                <span className="icon" onClick={() => handleDone(todo.id)}><MdDone /></span>
            </div>
        </form>
    )
}

export default SingleTodo