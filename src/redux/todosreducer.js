
import { ACTION_TYPE } from './type';

const todosreducer = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_TODOS':
            return action.payload;
        case ACTION_TYPE.ADD_TODO:
            debugger;
            // return [...state, action.payload];
            return [{ ...action.payload }, ...state];
        case ACTION_TYPE.UPDATE_EXISTING_TODO:
            return state.map((todo) =>
                todo.id === action.payload.id ? action.payload : todo
            );
        case ACTION_TYPE.DELETE_TODO:
            return state.filter((todo) => todo.id !== action.payload);
        case ACTION_TYPE.CLICK_ITEM: {
            const index = state.findIndex((todo) => todo.id === action.payload);
            if (index !== -1) {
                const updatedTodos = [...state];
                updatedTodos[index] = {
                    ...updatedTodos[index],
                };
                return updatedTodos;
            } else {
                return state;
            }
        }
        case ACTION_TYPE.CLEAR_COMPLETED:
            return state.filter((todo) => !todo.isCompleted);
        default:
            return state;
    }
};

export default todosreducer;