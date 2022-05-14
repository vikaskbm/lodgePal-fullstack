import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

const userSlice = createSlice({
  name: "users",
  initialState: {
    isLoggedIn: false,
    token: null,
  },
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    logOut(state, action) {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export const userLogin = (form) => async (dispatch) => {
  try {
    const {
      data: { id, token },
    } = await api.login(form);
    if (id && token) {
      dispatch(logIn({ token, id }));
    }
  } catch (e) {
    alert(e);
  }
};

export const getFavs = () => async (dispatch, getState) => {
  const {
    usersReducer: { id },
  } = getState();

  try {
    const data = await api.favs(id);
    console.log(data);
  } catch (e) {
    console.warn(e);
  }
};

export const toggleFav = (roomId) => async (dispatch, getState) => {
  const {
    usersReducer: { id, token },
  } = getState;

  try {
    const { data, status } = await api.tloggleFavs(id, roomId, token);
    console.log(data);
    console.log(status);
  } catch (e) {
    console.warn(e);
  }
  console.log(id, token);
};
export default userSlice.reducer;
