import { combineReducers } from 'redux';
import todosreducer from './todosreducer';
import selectedreducer from './selectedreducer';
import filterreducer from './filterreducer';

const rootReducer = combineReducers({
    todos: todosreducer,
    selectedTodo: selectedreducer,
    filter: filterreducer,
});

export default rootReducer;