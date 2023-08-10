import React from 'react'
import './styles.css'

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
}

const InputField = ({todo, setTodo}: Props) => {
  return (
    <form className="input">
        <input type="input" placeholder="Enter a Task" className='inputBox'/>
        <button className='inputSubmit' type='submit'>Add</button>
    </form>
  )
}

export default InputField