import React from "react";
import { Text, View, Button, StatusBar } from "react-native";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";

const LOGO_URL =
  "http://pluspng.com/img-png/airbnb-logo-png-logo-black-transparent-airbnb-329.png";

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Image = styled.Image`
  position: absolute;
  z-index: -1;
  top: 0;
`;

const Logo = styled.Image`
  width: 100px;
  height: 100px;
`;

export default ({ navigation }) => {
  return (
    <Container>
      <BlurView tint="light" style={{ flex: 1 }} intensity={60}>
        <Logo source={{ uri: LOGO_URL }} />
      </BlurView>
      <Image source={require("../assets/loginBg.png")} />
      <StatusBar barStyle="light-content" />
    </Container>
  );
};
