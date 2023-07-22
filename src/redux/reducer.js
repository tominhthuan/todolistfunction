// reducer.js
const initialState = {
    todos: [],
    selectedTodo: null,
    filter: 'all',
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, action.payload],
            };
        // case 'UPDATE_TODO':
        //     const updatedTodos = state.todos.map((todo) =>
        //         todo.id === action.payload.id ? action.payload : todo
        //     );
        //     return {
        //         ...state,
        //         todos: updatedTodos,
        //         selectedTodo: null,
        //     };
        case 'UPDATE_TODO': {
            const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
            if (index !== -1) {
                const updatedTodos = [...state.todos];
                updatedTodos[index] = {
                    ...updatedTodos[index],
                    name: action.payload.name,
                };
                return {
                    ...state,
                    todos: updatedTodos,
                    selectedTodo: null,
                };
            } else {
                return state;
            }
        }
        case 'DELETE_TODO':
            const filteredTodos = state.todos.filter((todo) => todo.id !== action.payload);
            return {
                ...state,
                todos: filteredTodos,
            };
        // case 'CLICK_ITEM':
        //     const toggledTodos = state.todos.map((todo) =>
        //         todo.id === action.payload ? { ...todo, isCompleted: !todo.isCompleted } : todo
        //     );
        //     return {
        //         ...state,
        //         todos: toggledTodos,
        //     };
        case 'CLICK_ITEM': {
            const index = state.todos.findIndex((todo) => todo.id === action.payload);
            if (index !== -1) {
                // Tìm thấy chỉ mục của công việc cần thay đổi trạng thái
                const toggledTodos = [...state.todos];
                toggledTodos[index] = {
                    ...toggledTodos[index],
                    isCompleted: !toggledTodos[index].isCompleted,
                };
                return {
                    ...state,
                    todos: toggledTodos,
                };
            } else {
                return state;
            }
        }
        case 'SET_SELECTED_TODO':
            return {
                ...state,
                selectedTodo: action.payload,
            };
        case 'SET_FILTER':
            return {
                ...state,
                filter: action.payload,
            };
        default:
            return state;
    }
};

export default rootReducer;
