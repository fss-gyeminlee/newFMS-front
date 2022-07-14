import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import ActionTypes from '../actions/actionTypes';

function* watchConfirmRequest(action) {
  try {
    const { param } = action;
    // const response = yield call(http.confirm, param);
    const response = {
      data: [],
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
