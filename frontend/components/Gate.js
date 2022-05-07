import React from "react";
import { Text, View } from "react-native";
import { connect, useSelector } from "react-redux";

export default (props) => {
  const { isLoggedIn } = useSelector((state) => state.usersReducer);
  return <>{isLoggedIn ? <Text>Welcome</Text> : <Text>Login Please</Text>}</>;
};
