
import React, { useContext, useState } from 'react'
import { addTodoDispater, todoItemExistsError } from '../constants/TodoReducerType';
import { TodoContext } from './TodoContainer';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


function TodoAddForm() {
    const { state, dispatch } = useContext(TodoContext);

    const [todoText, setTodoText] = useState("");

    const changeHandler = (e) => {
        setTodoText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (todoText) {
            let { todoList, _ } = { ...state };
            let check = Object.values(todoList).some(item => item.todoText.toLowerCase() === todoText.toLowerCase());

            if (!check) {
                dispatch({
                    "type": addTodoDispater,
                    "todoText": todoText.trim()
                });
                let msg = todoText.trim().slice(0, 10)
                msg = todoText.trim().length > 10 ? msg + "..." : msg
                toast.dismiss();
                toast(msg + " Added !!", { duration: 1000, autoClose: 1000 });
            }
            else {
                toast.dismiss();
                toast("Already Exists", { duration: 1000, autoClose: 1000 });
            }
            setTodoText("");
        }
        else {
            setTodoText("");
            return;
        }
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className='flex flex-row flex-wrap  shadow rounded  bg-amber-200 overflow-hidden py-2 justify-center'>
                <input
                    type='text' value={todoText}
                    onChange={(e) => changeHandler(e)}
                    className='outline-none rounded  w-80 h-10 py-1 px-3' placeholder='Add a New Task' />
                <button className='outline-none bg-cyan-600  hover:bg-cyan-500 rounded break-keep text-white px-5' >
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                    <span className='px-1'>Add Task</span></button>
            </div>
        </form>
    )
}

export default TodoAddForm