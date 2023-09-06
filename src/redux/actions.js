import { ACTION_TYPE } from './type';
import { fetchTodos, addTodoApi, deleteTodoApi, updateTodoApi, updateFilterApi } from '../api';


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
    debugger;
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

export const loadTodos = () => {// lấy dữ liệu api về store
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
export const clearCompleted = () => {
    return async (dispatch, getState) => {
        const completedTodos = getState().todos.filter((todo) => todo.isCompleted);

        // Đẩy dữ liệu vào Redux store trước khi gọi API
        dispatch({
            type: ACTION_TYPE.CLEAR_COMPLETED,
            payload: completedTodos.map((todo) => todo.id), // Đẩy danh sách ID công việc đã hoàn thành lên store
        });

        try {
            // Gọi API để xóa các công việc đã hoàn thành từ cơ sở dữ liệu
            await Promise.all(
                completedTodos.map(async (todo) => {
                    await deleteTodoApi(todo.id);
                })
            );
        } catch (error) {
            console.error('Lỗi khi xóa các công việc đã hoàn thành:', error);
            // Xử lý lỗi nếu gọi API xóa thất bại
        }
    };
};
export const setFilter = (filterType) => {
    return {
        type: ACTION_TYPE.SET_FILTER,
        payload: filterType,
    };
};
// export const setFilter = (filterType) => {
//     return async (dispatch) => {
//         // Đẩy dữ liệu lọc lên Redux store
//         dispatch({
//             type: ACTION_TYPE.SET_FILTER,
//             payload: filterType,
//         });

//         // Gọi API để đẩy dữ liệu lọc lên server (nếu cần)
//         try {
//             await updateFilterApi(filterType); // Thay thế `updateFilterApi` bằng hàm gọi API cập nhật bộ lọc
//         } catch (error) {
//             console.error('Lỗi khi cập nhật bộ lọc:', error);
//             // Xử lý lỗi nếu gọi API cập nhật bộ lọc thất bại
//         }
//     };
// };