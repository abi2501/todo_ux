import { addTodoDispater, todoCompletedStatus, todoDelete, todoEditEnable, todoItemExistsError, todoTextEdit } from "../constants/TodoReducerType";
import { toast } from 'react-toastify';

import { v4 as uuid } from 'uuid'


const todoReducer = (state, action) => {

    switch (action.type) {

        case addTodoDispater:
            let id = uuid();
            var todoList = {
                ...state.todoList,
                [id]: {
                    "todoText": action.todoText,
                    "editingEnabled": false,
                    "isCompleted": false
                }
            }
            return { ...state, todoList: todoList };

        case todoCompletedStatus:
            var todoList = { ...state.todoList }
            todoList[action.id].isCompleted = !todoList[action.id].isCompleted
            return {
                ...state, todoList: todoList
            }

        case todoEditEnable:
            var todoList = { ...state.todoList }
            todoList[action.id].editingEnabled = !todoList[action.id].editingEnabled
            return {
                ...state, todoList: todoList
            }

        case todoTextEdit:
            var todoList = { ...state.todoList }
            todoList[action.id].todoText = action.todoText;
            todoList[action.id].editingEnabled = !todoList[action.id].editingEnabled;

            return {
                ...state, todoList: todoList
            }
        case todoDelete:
            var todoList = { ...state.todoList }

            delete todoList[action.id]

            return {
                ...state, todoList: todoList
            }
    }
}

export default todoReducer