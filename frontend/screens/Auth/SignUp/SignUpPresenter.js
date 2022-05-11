import React from "react";
import { StatusBar, KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../../../components/Auth/DismissKeyboard";
import Btn from "./../../../components/Auth/Btn";
import Input from "./../../../components/Auth/Input";

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const InputContainer = styled.View`
  margin-bottom: 30px;
`;

export default ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  loading,
  setLoading,
  handleSubmit,
}) => {
  return (
    <DismissKeyboard>
      <Container>
        <StatusBar barStyle="dark-content" />
        <KeyboardAvoidingView behavior="height">
          <InputContainer>
            <Input
              value={firstName}
              placeholder="First Name"
              autoCapitalize="words"
              stateFn={setFirstName}
            />
            <Input
              value={lastName}
              placeholder="Last Name"
              autoCapitalize="words"
              stateFn={setLastName}
            />
            <Input
              value={email}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              stateFn={setEmail}
            />
            <Input
              value={password}
              placeholder="Password"
              autoCapitalize="none"
              isPassword={true}
              stateFn={setPassword}
            />
          </InputContainer>
          <Btn
            text={"Sign Up"}
            accent
            onPress={handleSubmit}
            loading={loading}
          />
        </KeyboardAvoidingView>
      </Container>
    </DismissKeyboard>
  );
};
