import { fork, take } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { authActions, LoginPayload } from "./autSlice";

function* handleLogin(payload: LoginPayload) {
  console.log('Handle login', payload);
}
function* handleLogout() {
  console.log('Handle Logout');
}

function* watchLoginFlow() {
  while (true) {
    const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
    yield fork(handleLogin, action.payload);
  
    yield take(authActions.logout.type);
    yield fork(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}