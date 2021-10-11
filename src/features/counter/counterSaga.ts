import { call, delay, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { fetchCount } from "./counterAPI";
import { increment, incrementSaga, incrementSagaSuccess } from "./counterSlice";

// export function* log(action: PayloadAction) {
//   console.log('Log', action)
// }

function* test() {
  yield fetchCount(2);
  // and
  yield call(fetchCount, 2);
}

function* handleIncrementSaga(action: PayloadAction<number>) {
  console.log('Waiting 1s');
  // wait 1s
  yield delay(1000)

  console.log('Waiting done, dispatch action');
  // dispatch action success
  yield put(incrementSagaSuccess(action.payload))
}

export default function* counterSaga() {
  console.log('counter Saga');

  yield takeEvery(incrementSaga.toString(), handleIncrementSaga);
  // yield takeLatest(incrementSaga.toString(), handleIncrementSaga);
}