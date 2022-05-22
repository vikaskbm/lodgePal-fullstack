import React from "react";

import { useSelector } from "react-redux";
import Auth from "../navigation/Auth";

import { NavigationContainer } from "@react-navigation/native";
import Main from "../navigation/Main";
export default (props) => {
  const { isLoggedIn } = useSelector((state) => state.usersReducer);
  return (
    <NavigationContainer>
      {isLoggedIn ? <Main /> : <Auth />}
    </NavigationContainer>
  );
};
