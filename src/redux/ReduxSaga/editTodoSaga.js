import { takeLatest, put, call } from 'redux-saga/effects';
import { ACTION_TYPE } from '../type';
import { updateTodoApi } from '../../api';
import { editTodoSuccess, editTodoFailure } from '../actions';

function* editTodo(action) {
  try {
    const updatedTodo = yield call(updateTodoApi, action.payload);
    yield put(editTodoSuccess(updatedTodo));
  } catch (error) {
    yield put(editTodoFailure(error));
  }
}

export default function* watchEditTodoRequest() {
  yield takeLatest(ACTION_TYPE.EDIT_TODO_REQUEST, editTodo);
}
