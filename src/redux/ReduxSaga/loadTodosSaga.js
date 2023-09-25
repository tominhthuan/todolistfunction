import { put, call, takeEvery } from 'redux-saga/effects';
import {
    loadTodosSuccess,
    loadTodosFailure,
} from '../actions';
import { ACTION_TYPE } from '../type';
import { fetchTodos } from '../../api';

function* handleLoadTodosRequest() {
    try {
        const todos = yield call(fetchTodos);
        yield put(loadTodosSuccess(todos));
    } catch (error) {
        yield put(loadTodosFailure(error));
    }
}

export default function* watchLoadTodosRequest() {
    yield takeEvery(ACTION_TYPE.LOAD_TODOS_REQUEST, handleLoadTodosRequest);
}
