import { ACTION_TYPE } from './type';

const todosReducer = (state = [], action) => {
    switch (action.type) {

        case ACTION_TYPE.ADD_TODO_SUCCESS:
            debugger;
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
        case ACTION_TYPE.EDIT_TODO_SUCCESS: {
            return state.map((todo) =>
                todo.id === action.payload.id ? action.payload : todo
            );
        }
        case ACTION_TYPE.CLEAR_COMPLETED:
            return state.filter((todo) => !todo.isCompleted);
        default:
            return state;
    }
};

export default todosReducer;
// import { ACTION_TYPE } from './type';

// const todosreducer = (state = [], action) => {
//     switch (action.type) {
//         case ACTION_TYPE.LOAD_TODOS:
//             return action.payload;
//         case ACTION_TYPE.ADD_TODO:
//             return [{ ...action.payload }, ...state];
//         case ACTION_TYPE.UPDATE_EXISTING_TODO:
//             return state.map((todo) =>
//                 todo.id === action.payload.id ? action.payload : todo
//             );
//         case ACTION_TYPE.DELETE_TODO:
//             return state.filter((todo) => todo.id !== action.payload);
//         case ACTION_TYPE.CLICK_ITEM: {
//             const index = state.findIndex((todo) => todo.id === action.payload);
//             if (index !== -1) {
//                 const updatedTodos = [...state];
//                 updatedTodos[index] = {
//                     ...updatedTodos[index],
//                 };
//                 return updatedTodos;
//             } else {
//                 return state;
//             }
//         }
//         case ACTION_TYPE.CLEAR_COMPLETED:
//             return state.filter((todo) => !action.payload.includes(todo.id));
//         default:
//             return state;
//     }
// };

// export default todosreducer;
