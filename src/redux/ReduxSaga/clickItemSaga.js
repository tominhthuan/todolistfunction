import { put, call, takeEvery } from 'redux-saga/effects';
import {
    clickItemSuccess,
    clickItemFailure,
} from '../actions';
import { ACTION_TYPE } from '../type';
import { updateTodoApi } from '../../api';

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

export default function* watchItemClickRequest() {
    yield takeEvery(ACTION_TYPE.CLICK_ITEM_REQUEST, handleItemClickRequest);
}
