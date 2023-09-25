import { put, call, takeEvery } from 'redux-saga/effects';
import {
    deleteTodoSuccess,
    deleteTodoFailure,
} from '../actions';
import { ACTION_TYPE } from '../type';
import { deleteTodoApi } from '../../api';

function* handleDeleteTodoRequest(action) {
    try {
        yield call(deleteTodoApi, action.payload);
        yield put(deleteTodoSuccess(action.payload));
    } catch (error) {
        yield put(deleteTodoFailure(error));
    }
}

export default function* watchDeleteTodoRequest() {
    yield takeEvery(ACTION_TYPE.DELETE_TODO_REQUEST, handleDeleteTodoRequest);
}
