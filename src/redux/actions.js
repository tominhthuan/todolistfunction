import { ACTION_TYPE } from './type';

let nextTodoId = 0;

export const getNextTodoId = () => {
    return nextTodoId++;
};


export const addTodo = (inputTodo) => {
    return {
        type: ACTION_TYPE.ADD_TODO,
        payload: {
            name: inputTodo,
            isCompleted: false,
            id: getNextTodoId(),
        },
    };
};

export const updateTodo = (updatedTodo) => {
    return {
        type: ACTION_TYPE.UPDATE_TODO,
        payload: updatedTodo,
    };
};

export const deleteTodo = (id) => {
    return {
        type: ACTION_TYPE.DELETE_TODO,
        payload: id,
    };
};

export const clickItem = (id) => {
    return {
        type: ACTION_TYPE.CLICK_ITEM,
        payload: id,
    };
};

export const setSelectedTodo = (todo) => {
    return {
        type: ACTION_TYPE.SET_SELECTED_TODO,
        payload: todo,
    };
};

export const setFilter = (filterType) => {
    return {
        type: ACTION_TYPE.SET_FILTER,
        payload: filterType,
    };
};
