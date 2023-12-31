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
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo),
        });
        if (!response.ok) {
            throw new Error('Lỗi khi thêm công việc');
        }
        const addedTodo = await response.json();
        return addedTodo;
    } catch (error) {
        throw error;
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
