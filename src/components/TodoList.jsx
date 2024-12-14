
import React, { useContext, useEffect, useRef, useState } from 'react'
import { TodoContext } from './TodoContainer';
import TodoListItem from './TodoListItem';
import { todoCompletedStatus, todoDelete, todoEditEnable, todoTextEdit } from '../constants/TodoReducerType';
import TodoEditForm from './TodoEditForm';
import { toast } from 'react-toastify';
import TodoModel from './TodoModel';


function TodoList() {

    const { state, dispatch } = useContext(TodoContext);
    const todoList = { ...state.todoList }
    const [showModal, setShowModal] = useState({});

    const handleTodoStatus = (id) => {
        dispatch({
            type: todoCompletedStatus,
            id: id
        });
        let msg = todoList[id].todoText.slice(0, 10)
        msg = todoList[id].todoText.length > 10 ? msg + "..." : msg
        toast.dismiss();
        toast.info(msg + "  Completed !!");
    }

    const handleEditEnable = (id) => {
        dispatch({
            type: todoEditEnable,
            id: id
        })
    }

    const handleTodoTextEdit = (id, todoText) => {
        dispatch({
            type: todoTextEdit,
            id: id,
            todoText: todoText
        });

        let msg = todoText.slice(0, 10)
        msg = todoText.length > 10 ? msg + "..." : msg
        toast.dismiss();
        toast.info(msg + "  Updated !!")
    }


    const handleTodoDelete = (id) => {
        let todoList = { ...state.todoList }
        setShowModal({
            state: true,
            id: id,
            todoText: todoList[id].todoText
        });

    }

    const handleModalOpenClose = (id, flag) => {

        if (flag) {
            dispatch({
                type: todoDelete,
                id: id
            });

            let msg = todoList[id].todoText.slice(0, 10)
            msg = todoList[id].todoText.length > 10 ? msg + "..." : msg
            toast.info(msg + " deleted !!")
        }
        setShowModal(false);
    }

    const handleClickEvents = (e) => {
        if (e.keyCode === 27) {
            setShowModal(false);
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', (e) => handleClickEvents(e));
    }, [showModal.state])

    return (
        <>
            <ul className='h-screen overflow-y-auto'>
                {
                    Object.entries(todoList).reverse().map(([key, todo]) => (
                        todo.editingEnabled
                            ? <TodoEditForm key={key}
                                id={key}
                                todoText={todo.todoText}
                                handleTodoTextEdit={handleTodoTextEdit}
                                handleEditCancel={handleEditEnable} />
                            : <TodoListItem key={key}
                                id={key}
                                todo={todo}
                                handleTodoStatus={handleTodoStatus}
                                handleEnableEdit={handleEditEnable}
                                handleTodoDelete={handleTodoDelete}
                            />
                    ))
                }
            </ul>
            {
                showModal.state ? <TodoModel id={showModal.id} todoText={showModal.todoText} handleOpenClose={handleModalOpenClose} /> : ""
            }
        </>
    )
}

export default TodoList
