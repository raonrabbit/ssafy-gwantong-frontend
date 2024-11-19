import { configureStore } from "@reduxjs/toolkit";
import authReducer, { restoreSession } from "./slices/authSlice";
import searchReducer from "./slices/searchSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 세션 복구 로직
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

if (token && user) {
  store.dispatch(
    restoreSession({
      token,
      user: JSON.parse(user), // 저장된 문자열을 객체로 변환
    })
  );
}
export default store;
