import { createSlice } from "@reduxjs/toolkit";
import { ActivityIndicator } from "react-native";
import api from "../api";

const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    explore: {
      page: 1,
      rooms: [],
    },
    favs: [],
  },
  reducers: {
    setExploreRooms(state, action) {
      const {
        explore: { rooms },
      } = state;
      const { payload } = action;

      payload.rooms.forEach((payloadRoom) => {
        const exists = rooms.find(
          (savedRoom) => savedRoom.id === payloadRoom.id
        );
        if (!exists) {
          rooms.push(payloadRoom);
        }
      });
      state.explore.page = payload.page;
    },
  },
});

const { setExploreRooms } = roomSlice.actions;

export const getRooms = () => async (dispatch) => {
  try {
    const {
      data: { results },
    } = await api.rooms();
    dispatch(
      setExploreRooms({
        rooms: results,
        page: 1,
      })
    );
  } catch (e) {
    console.log(e);
  }
};
export default roomSlice.reducer;
