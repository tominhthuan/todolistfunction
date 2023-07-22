// actions.js
let nextTodoId = 0;

export const getNextTodoId = () => {
    return nextTodoId++;
};

export const addTodo = (inputTodo) => {
    return {
        type: 'ADD_TODO',
        payload: {
            name: inputTodo,
            isCompleted: false,
            id: getNextTodoId(),
        },
    };
};

export const updateTodo = (updatedTodo) => {
    return {
        type: 'UPDATE_TODO',
        payload: updatedTodo,
    };
};

export const deleteTodo = (id) => {
    return {
        type: 'DELETE_TODO',
        payload: id,
    };
};

export const clickItem = (id) => {
    return {
        type: 'CLICK_ITEM',
        payload: id,
    };
};

export const setSelectedTodo = (todo) => {
    return {
        type: 'SET_SELECTED_TODO',
        payload: todo,
    };
};

export const setFilter = (filterType) => {
    return {
        type: 'SET_FILTER',
        payload: filterType,
    };
};
