import { ACTION_TYPE } from './type';

const todosReducer = (state = [], action) => {
    switch (action.type) {
        case ACTION_TYPE.ADD_TODO_SUCCESS:
            return [...state, action.payload];
        case ACTION_TYPE.LOAD_TODOS_SUCCESS:
            return action.payload;
        case ACTION_TYPE.LOAD_TODOS_FAILURE:
            return state;
        case ACTION_TYPE.DELETE_TODO_SUCCESS:
            return state.filter((todo) => todo.id !== action.payload);
        case ACTION_TYPE.DELETE_TODO_FAILURE:
            return state;
        case ACTION_TYPE.CLICK_ITEM_SUCCESS: {
            return state.map((todo) =>
                todo.id === action.payload.id ? action.payload : todo
            );
        }
        case ACTION_TYPE.CLICK_ITEM_FAILURE: {
            return state;
        }
        case ACTION_TYPE.CLEAR_COMPLETED:
            return state.filter((todo) => !todo.isCompleted);
        default:
            return state;
    }
};

export default todosReducer;
