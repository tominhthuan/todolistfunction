import { put, call, takeEvery, all } from 'redux-saga/effects';
import {
    addTodoSuccess, addTodoFailure,
    loadTodosSuccess, loadTodosFailure,
    deleteTodoSuccess, deleteTodoFailure,
    clickItemSuccess, clickItemFailure,
    updateExistingTodo,
} from './actions';

import { ACTION_TYPE } from './type';
import { addTodoApi, fetchTodos, deleteTodoApi, updateTodoApi } from '../api';

function* handleAddTodoRequest(action) {
    try {
        const addedTodo = yield call(addTodoApi, action.payload);
        yield put(addTodoSuccess(addedTodo));
    } catch (error) {
        yield put(addTodoFailure(error));
    }
}

function* handleLoadTodosRequest() {
    try {
        const todos = yield call(fetchTodos);
        yield put(loadTodosSuccess(todos)); // Dispatch action thành công khi tải danh sách todos
    } catch (error) {
        yield put(loadTodosFailure(error)); // Dispatch action khi có lỗi
    }
}

function* handleDeleteTodoRequest(action) {
    try {
        yield call(deleteTodoApi, action.payload);
        yield put(deleteTodoSuccess(action.payload));
    } catch (error) {
        yield put(deleteTodoFailure(error));
    }
}

function* handleItemClickRequest(action) {
    try {
        const updatedTodo = { ...action.payload, isCompleted: !action.payload.isCompleted };
        const response = yield call(updateTodoApi, updatedTodo);
        if (response) {
            yield put(clickItemSuccess(updatedTodo));
        } else {
            yield put(clickItemFailure({ message: 'Có lỗi khi cập nhật công việc' }));
        }
    } catch (error) {
        console.error('Lỗi khi xử lý sự kiện click item:', error);
        yield put(clickItemFailure(error));
    }
}



function* rootSaga() {
    yield all([
        takeEvery(ACTION_TYPE.ADD_TODO_REQUEST, handleAddTodoRequest),
        takeEvery(ACTION_TYPE.LOAD_TODOS_REQUEST, handleLoadTodosRequest),
        takeEvery(ACTION_TYPE.DELETE_TODO_REQUEST, handleDeleteTodoRequest),
        takeEvery(ACTION_TYPE.CLICK_ITEM_REQUEST, handleItemClickRequest),
    ]);
}

export default rootSaga;
