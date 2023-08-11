import React, { useRef } from 'react'
import './styles.css'

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {

  //create reference to the input field
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form className="input" onSubmit={
      (e) => {
        handleAdd(e);
        //after the form is submitted, blur the input field so the background color goes back to normal
        inputRef.current?.blur();
      }
    }>
      <input
        ref={inputRef}
        type="input"
        placeholder="Enter a Task"
        className='inputBox'
        value={todo}
        onChange={
          (e) => setTodo(e.target.value)
        }
      />
      <button className='inputSubmit' type='submit'>Add</button>
    </form>
  )
}

export default InputField