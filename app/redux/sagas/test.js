import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import ActionTypes from '../actions/actionTypes';

function* watchConfirmRequest(action) {
  try {
    const { param } = action;
    // FIXME 추후에 api 연동으로 변경 예정
    // const response = yield call(http.confirm, param);
    const response = {
      data: [{ id: 'id_013', name: '홍길동', title: '목록1' }, { id: 'id_013', name: '이순신', title: '목록2' }],
      msg: 'success',
    }
    yield put({
      type: ActionTypes.COMMON_CONFIRM_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    yield put({
      type: ActionTypes.COMMON_CONFIRM_FAILURE,
      payload: e.message,
    });
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.COMMON_CONFIRM_REQUEST, watchConfirmRequest),
  ])
}
