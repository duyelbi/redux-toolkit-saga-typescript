import { call, delay, fork, put, take } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { authActions, LoginPayload } from "./autSlice";

function* handleLogin(payload: LoginPayload) {
  try {
    yield delay(1000)

    localStorage.setItem('access_token', 'fake_login')
    yield put(authActions.loginSuccess({
      id: 1,
      name: 'Duy ND'
    }));
  } catch (error) {
    yield put(authActions.loginFailed(error.message));
  }
  // redirect to admin page
}
function* handleLogout() {
  yield delay(500);
  console.log('Handle Logout');
  localStorage.removeItem('access_token');
  // redirect to login page
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }
  
    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}