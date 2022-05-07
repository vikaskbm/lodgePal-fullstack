import React from "react";
import { Text, View } from "react-native";

export default () => {
  const isLoggedIn = false;
  return <>{isLoggedIn ? <Text>Welcome</Text> : <Text>Login Please</Text>}</>;
};
