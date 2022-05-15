import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "@expo/vector-icons/Ionicons";

import Explore from "../screens/Main/Explore";
import Saved from "../screens/Main/Saved";
import MapScreen from "../screens/Main/Map";
import Profile from "../screens/Main/Profile";

import colors from "../colors";
import utils from "./../utils";
import Room from "../screens/Main/Room";
import BackBtn from "../components/Auth/BackBtn";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";

const TabsNavigator = createBottomTabNavigator();

const Tabs = () => {
  return (
    <TabsNavigator.Navigator
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
      <TabsNavigator.Screen
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
      <TabsNavigator.Screen
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
      <TabsNavigator.Screen
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
      <TabsNavigator.Screen
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
    </TabsNavigator.Navigator>
  );
};

const MainNavigator = createStackNavigator();
export default () => (
  <MainNavigator.Navigator
    screenOptions={{
      presentation: "modal",
      headerBackTitleVisible: false,
      headerBackImage: () => <BackBtn />,
    }}
  >
    <MainNavigator.Screen
      name="Tabs"
      component={Tabs}
      options={{ headerShown: false }}
    />
    <MainNavigator.Screen
      name="RoomDetail"
      component={Room}
      options={{
        headerTransparent: true,
        headerBackground: () => (
          <BlurView
            intensity={100}
            tint="light"
            style={StyleSheet.absoluteFill}
          />
        ),
      }}
    />
  </MainNavigator.Navigator>
);
