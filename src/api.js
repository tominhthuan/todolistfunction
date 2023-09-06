import axios from 'axios';

const API_URL = 'https://64d9d9a2e947d30a260a61c0.mockapi.io/api/Todos';

export const fetchTodos = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách công việc:', error);
        return [];
    }
};

export const addTodoApi = async (newTodo) => {
    try {
        const response = await axios.post(API_URL, newTodo);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi thêm công việc:', error);
        return null;
    }
};

export const updateTodoApi = async (updatedTodo) => {
    debugger;
    try {
        const response = await axios.put(`${API_URL}/${updatedTodo.id}`, updatedTodo);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật công việc:', error);
        return null;
    }
};

export const deleteTodoApi = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi xóa công việc:', error);
        return null;
    }
};

// export const updateFilterApi = async (filterType) => {
//     try {
//         const response = await axios.put(API_URL + '/filter', { filterType });
//         return response.data;
//     } catch (error) {
//         console.error('Lỗi khi cập nhật bộ lọc trên server:', error);
//         return null;
//     }
// };