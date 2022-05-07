import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../screens/Welcome";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";

import { createStackNavigator } from "@react-navigation/stack";

const Auth = createStackNavigator();

export default () => {
  return (
    <Auth.Navigator>
      <Auth.Screen name="Welcome" component={Welcome} />
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="SignUp" component={SignUp} />
    </Auth.Navigator>
  );
};
