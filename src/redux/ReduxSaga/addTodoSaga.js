import { put, call, takeEvery } from 'redux-saga/effects';
import {
    addTodoSuccess,
    addTodoFailure,
} from '../actions';
import { ACTION_TYPE } from '../type';
import { addTodoApi } from '../../api';

function* handleAddTodoRequest(action) {
    try {
        const addedTodo = yield call(addTodoApi, action.payload);
        yield put(addTodoSuccess(addedTodo));
    } catch (error) {
        yield put(addTodoFailure(error));
    }
}

export default function* watchAddTodoRequest() {
    yield takeEvery(ACTION_TYPE.ADD_TODO_REQUEST, handleAddTodoRequest);
}
