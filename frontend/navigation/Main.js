import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import Explore from "../screens/Main/Explore";
import Saved from "../screens/Main/Saved";
import MapScreen from "../screens/Main/Map";
import Profile from "../screens/Main/Profile";

import colors from "../colors";
import utils from "./../utils";

const Main = createBottomTabNavigator();

export default () => {
  return (
    <Main.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.red,
        tabBarLabelStyle: {
          fontWeight: "600",
          textTransform: "uppercase",
          paddingBottom: 6,
        },
        tabBarStyle: {
          height: 60,
          bottom: 0,
          left: 0,
          right: 0,
          borderTopWidth: 0,
        },
        tabBarIconStyle: { marginTop: 4 },
      }}
    >
      {/* <Ionicons name={"chevron-down"} size={25} /> */}
      <Main.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color, size }) => {
            const iconName = `${utils.isAndroid ? "md-" : "ios-"}`;
            return (
              <Ionicons
                name={iconName + "search"}
                color={color}
                size={25}
                style={{ marginTop: 1 }}
              />
            );
          },
        }}
      />
      <Main.Screen
        name="Saved"
        component={Saved}
        options={{
          tabBarLabel: "Saved",
          tabBarIcon: ({ color, size }) => {
            const iconName = `${utils.isAndroid ? "md-" : "ios-"}`;
            return (
              <Ionicons
                name={iconName + "heart"}
                color={color}
                size={25}
                style={{ marginTop: 1 }}
              />
            );
          },
        }}
      />
      <Main.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: "Saved",
          tabBarIcon: ({ color, size }) => {
            const iconName = `${utils.isAndroid ? "md-" : "ios-"}`;
            return (
              <Ionicons
                name={iconName + "map"}
                color={color}
                size={25}
                style={{ marginTop: 1 }}
              />
            );
          },
        }}
      />
      <Main.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => {
            const iconName = `${utils.isAndroid ? "md-" : "ios-"}`;
            return (
              <Ionicons
                name={iconName + "person"}
                color={color}
                size={25}
                style={{ marginTop: 1 }}
              />
            );
          },
        }}
      />
    </Main.Navigator>
  );
};
