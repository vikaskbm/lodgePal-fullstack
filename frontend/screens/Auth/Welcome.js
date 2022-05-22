import React from "react";
import { Text, View, Button, StatusBar } from "react-native";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import Btn from "../../components/Auth/Btn";
import LOGO from "./../../assets/logo.png";

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
  margin-top: 140px;
`;

const BtnContainer = styled.View`
  margin-top: 20px;
`;

export default ({ navigation }) => {
  const goToSignUp = () => navigation.navigate("SignUp");
  const goToSignIn = () => navigation.navigate("SignIn");
  return (
    <Container>
      <BlurView
        tint="light"
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
        intensity={60}
        width="100%"
      >
        <Logo source={require("../../assets/logo.png")} />
        <BtnContainer>
          <Btn onPress={goToSignUp} text={"Sign Up"} accent={true} />
          <Btn onPress={goToSignIn} text={"Sign In"} />
        </BtnContainer>
      </BlurView>
      <Image source={require("../../assets/loginBg.png")} />
    </Container>
  );
};
