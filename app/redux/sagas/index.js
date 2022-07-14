import { all, fork } from 'redux-saga/effects';

import test from './test';

export default function* root() {
  yield all([
    fork(test),
  ]);
}
