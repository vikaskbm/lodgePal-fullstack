import { createSlice } from "@reduxjs/toolkit";
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
    },
    increasePage(state, action) {
      console.log(state.explore.page);
      state.explore.page += 1;
    },
  },
});

export const { setExploreRooms, increasePage } = roomSlice.actions;

export const getRooms = (page) => async (dispatch) => {
  try {
    const {
      data: { results },
    } = await api.rooms(page);
    dispatch(
      setExploreRooms({
        rooms: results,
      })
    );
  } catch (e) {
    console.log(e);
  }
};
export default roomSlice.reducer;
