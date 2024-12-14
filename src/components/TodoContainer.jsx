

import React, { createContext, useCallback, useEffect, useReducer } from 'react'
import TodoAddForm from './TodoAddForm'
import todoReducer from '../Reducers/TodoReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoList from './TodoList';

export const TodoContext = createContext()

function TodoContainer() {

    const initState = {
        todoList: {

        },
    }

    const [state, dispatch] = useReducer(todoReducer, initState);

    return (
        <div className='justify-center'>
            <TodoContext.Provider value={{ state, dispatch }}>
                <TodoAddForm />
                <TodoList />
            </TodoContext.Provider>
            <ToastContainer />
        </div>
    )
}

export default TodoContainer