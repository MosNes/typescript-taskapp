import React, { useState, useRef, useEffect } from 'react'
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';

type Props = {
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo = ({ todo, todos, setTodos }: Props) => {

    // manages state of edit functionality

    //tracks if edit mode is on or off
    const [edit, setEdit] = useState<boolean>(false);

    //tracks value of input field
    const [editValue, setEditValue] = useState<string>(todo.todo);

    // handles when user clicks done icon
    const handleDone = (id: number) => {
        setTodos(todos.map(
            //if todo.id matches id passed in, return todo with isDone flipped, else return todo
            todo => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        ));
    };

    // handles when user clicks delete icon
    const handleDelete = (id: number) => {
        // filters current array of todos and removes the todo with the id passed in
        setTodos(todos.filter(todo => todo.id !== id));
    };

    // handles when user clicks edit icon
    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        // map through todos array and if todo.id matches id passed in, return todo with todo property changed to editValue, else return todo
        setTodos(todos.map(todo => todo.id===id?{...todo, todo: editValue}:todo));
        // turns off edit mode
        setEdit(false);
    };

    //create reference to input field
    const inputRef = useRef<HTMLInputElement>(null);

    //whenever edit state changes to true, focus on input field
    useEffect(() => {
        if (edit) {
            inputRef.current?.focus();
        }
    }, [edit])

    return (
        //on submit of this form, call handleEdit function
        <form className='todosSingle'
            onSubmit={(e) => { handleEdit(e, todo.id) }}
        >

            {/* if edit mode is enabled, show input element */}
            {edit ? (
                <input
                    ref={inputRef}
                    className='todosSingleText'
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                />
            // else, show span element
            ) : (
                todo.isDone ? (
                    <span className='todosSingleText done'>
                        {todo.todo}
                    </span>
                ) : (
                    <span className='todosSingleText'>
                        {todo.todo}
                    </span>
                )
            )

            }


            {/* div to hold icons */}
            <div>
                <span className="icon" onClick={() => {
                    if (!edit && !todo.isDone) {
                        setEdit(!edit)
                    }
                }
                }><AiFillEdit /></span>
                <span className="icon" onClick={() => handleDelete(todo.id)}><AiFillDelete /></span>
                <span className="icon" onClick={() => handleDone(todo.id)}><MdDone /></span>
            </div>
        </form>
    )
}

export default SingleTodo