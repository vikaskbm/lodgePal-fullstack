import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut } from "../redux/usersSlice";

export default (props) => {
  const { isLoggedIn } = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  return (
    <>
      {isLoggedIn ? (
        <TouchableOpacity onPress={() => dispatch(logOut())}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => dispatch(logIn("bs.token"))}>
          <Text>Log In</Text>
        </TouchableOpacity>
      )}
    </>
  );
};
