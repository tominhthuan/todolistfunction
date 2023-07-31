
import { ACTION_TYPE } from './type';

const todosreducer = (state = [], action) => {
    switch (action.type) {
        case ACTION_TYPE.ADD_TODO:
            return [...state, action.payload];
        case ACTION_TYPE.UPDATE_TODO: {
            const index = state.findIndex((todo) => todo.id === action.payload.id);
            if (index !== -1) {
                const updatedTodos = [...state];
                updatedTodos[index] = { ...updatedTodos[index], name: action.payload.name };
                return updatedTodos;
            } else {
                return state;
            }
        }
        case ACTION_TYPE.DELETE_TODO:
            return state.filter((todo) => todo.id !== action.payload);
        case ACTION_TYPE.CLICK_ITEM: {
            const index = state.findIndex((todo) => todo.id === action.payload);
            if (index !== -1) {
                const toggledTodos = [...state];
                toggledTodos[index] = {
                    ...toggledTodos[index],
                    isCompleted: !toggledTodos[index].isCompleted,
                };
                return toggledTodos;
            } else {
                return state;
            }
        }
        default:
            return state;
    }
};

export default todosreducer;
