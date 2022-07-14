import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import ActionTypes from '../actions/actionTypes';

function* watchConfirmRequest(action) {
  try {
    const { param } = action;
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
    console.log(e)
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.COMMON_CONFIRM_REQUEST, watchConfirmRequest),
  ])
}
