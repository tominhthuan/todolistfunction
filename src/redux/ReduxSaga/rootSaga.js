import { all } from 'redux-saga/effects';
import watchAddTodoRequest from './addTodoSaga';
import watchLoadTodosRequest from './loadTodosSaga';
import watchDeleteTodoRequest from './deleteTodoSaga';
import watchItemClickRequest from './clickItemSaga';
import watchEditTodoRequest from './editTodoSaga';


export default function* rootSaga() {
    yield all([
        watchAddTodoRequest(),
        watchLoadTodosRequest(),
        watchDeleteTodoRequest(),
        watchItemClickRequest(),
        watchEditTodoRequest(),
    ]);
}
