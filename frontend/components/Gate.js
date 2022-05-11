import React from "react";

import { useDispatch, useSelector } from "react-redux";
import Auth from "../navigation/Auth";

import { NavigationContainer } from "@react-navigation/native";
import Main from "../navigation/Main";
export default (props) => {
  const { isLoggedIn } = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  return (
    <NavigationContainer>
      {isLoggedIn ? <Main /> : <Auth />}
    </NavigationContainer>
  );
};
