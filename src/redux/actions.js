import { ACTION_TYPE } from './type';
import { fetchTodos, addTodoApi, deleteTodoApi, updateTodoApi } from '../api';


let nextTodoId = 0;

export const getNextTodoId = () => {
    return nextTodoId++;
};


export const addTodo = (inputTodo) => {
    return async (dispatch) => {
        dispatch({
            type: ACTION_TYPE.ADD_TODO,
            payload: inputTodo,
        });
        try {
            const addedTodo = await addTodoApi(inputTodo);
            if (addedTodo) {
                dispatch(updateExistingTodo(addedTodo));
            }
        } catch (error) {
            console.error('Lỗi khi thêm công việc:', error);
        }
    };
};

export const updateExistingTodo = (updatedTodo) => {
    return {
        type: ACTION_TYPE.UPDATE_EXISTING_TODO,
        payload: updatedTodo,
    };
};

export const deleteTodo = (id) => {
    return async (dispatch) => {
        dispatch({
            type: ACTION_TYPE.DELETE_TODO,
            payload: id,
        });
        try {
            await deleteTodoApi(id);
        } catch (error) {
            console.error('Lỗi khi xóa công việc:', error);
        }
    };
};

export const clickItem = (id) => {
    return async (dispatch, getState) => {
        const selectedTodo = getState().todos.find(todo => todo.id === id);
        dispatch({
            type: ACTION_TYPE.CLICK_ITEM,
            payload: id,
        });

        try {
            const updatedTodo = { ...selectedTodo, isCompleted: !selectedTodo.isCompleted };
            await updateTodoApi(updatedTodo);

            dispatch(updateExistingTodo(updatedTodo));
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
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
export const loadTodos = () => {
    return async (dispatch) => {
        try {
            const fetchedTodos = await fetchTodos();
            dispatch({
                type: 'LOAD_TODOS',
                payload: fetchedTodos,
            });
        } catch (error) {
            console.error('Lỗi khi lấy danh sách công việc:', error);
        }
    };
};