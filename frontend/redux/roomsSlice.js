import { createSlice } from "@reduxjs/toolkit";
import roomSlice from "./roomsSlice";
import { ActivityIndicator } from "react-native";

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
      state.explore.rooms.push(action.payload.rooms);
      state.explore.page = action.payload.page;
    },
  },
});

const { setExploreRooms } = roomSlice.actions;
export default roomSlice.reducer;
