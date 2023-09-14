import { ACTION_TYPE } from './type';
import { fetchTodos, addTodoApi, deleteTodoApi, updateTodoApi } from '../api';


let nextTodoId = 0;

export const getNextTodoId = () => {
    return nextTodoId++;
};

export const addTodoRequest = (newTodo) => ({
    type: ACTION_TYPE.ADD_TODO_REQUEST,
    payload: newTodo,
});

export const addTodoSuccess = (addedTodo) => ({
    type: ACTION_TYPE.ADD_TODO_SUCCESS,
    payload: addedTodo,
});

export const addTodoFailure = (error) => ({
    type: ACTION_TYPE.ADD_TODO_FAILURE,
    payload: error,
});

export const loadTodosRequest = () => ({
    type: ACTION_TYPE.LOAD_TODOS_REQUEST,
});

export const loadTodosSuccess = (todos) => ({
    type: ACTION_TYPE.LOAD_TODOS_SUCCESS,
    payload: todos,
});

export const loadTodosFailure = (error) => ({
    type: ACTION_TYPE.LOAD_TODOS_FAILURE,
    payload: error,
});

export const deleteTodoRequest = (id) => ({
    type: ACTION_TYPE.DELETE_TODO_REQUEST,
    payload: id,
});

export const deleteTodoSuccess = (id) => ({
    type: ACTION_TYPE.DELETE_TODO_SUCCESS,
    payload: id,
});

export const deleteTodoFailure = (error) => ({
    type: ACTION_TYPE.DELETE_TODO_FAILURE,
    payload: error,
});
export const clickItemRequest = (item) => {
    return {
        type: ACTION_TYPE.CLICK_ITEM_REQUEST,
        payload: item,
    };
};
export const clickItemSuccess = (updatedTodo) => {
    return {
        type: ACTION_TYPE.CLICK_ITEM_SUCCESS,
        payload: updatedTodo,
    };
};

export const clickItemFailure = (error) => {
    return {
        type: ACTION_TYPE.CLICK_ITEM_FAILURE,
        payload: error,
    };
};






// export const addTodo = (inputTodo) => {
//     debugger;
//     return async (dispatch) => {
//         dispatch({
//             type: ACTION_TYPE.ADD_TODO,
//             payload: inputTodo,
//         });
//         try {
//             const addedTodo = await addTodoApi(inputTodo);
//             if (addedTodo) {
//                 dispatch(updateExistingTodo(addedTodo));
//             }
//         } catch (error) {
//             console.error('Lỗi khi thêm công việc:', error);
//         }
//     };
// };

export const updateExistingTodo = (updatedTodo) => {
    debugger;
    return {
        type: ACTION_TYPE.UPDATE_EXISTING_TODO,
        payload: updatedTodo,
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

export const clearCompleted = () => {
    return async (dispatch, getState) => {
        const completedTodos = getState().todos.filter((todo) => todo.isCompleted);
        dispatch({
            type: ACTION_TYPE.CLEAR_COMPLETED,
            payload: completedTodos.map((todo) => todo.id),
        });

        try {

            await Promise.all(
                completedTodos.map(async (todo) => {
                    await deleteTodoApi(todo.id);
                })
            );
        } catch (error) {
            console.error('Lỗi khi xóa các công việc đã hoàn thành:', error);

        }
    };
};
export const setFilter = (filterType) => {
    return {
        type: ACTION_TYPE.SET_FILTER,
        payload: filterType,
    };
};
