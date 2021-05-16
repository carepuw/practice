import { createSlice, configureStore } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    user: null,
    socket: null
  },
  reducers: {
    ACTION_LOGIN: (state, { payload }) => {
      state.user = {
        id: payload.id,
        firstName: payload.firstName,
        lastName: payload.lastName,
        birthday: payload.birthday,
        age: payload.age,
      }
    },
    ACTION_LOGOUT: (state) => {
      state.user = null
    },
    SET_SOCKET: (state, { payload }) => {
      state.socket = payload;
    }
  }
})

export const { ACTION_LOGIN, ACTION_LOGOUT, SET_SOCKET } = counterSlice.actions

export const store = configureStore({
  reducer: counterSlice.reducer
});
