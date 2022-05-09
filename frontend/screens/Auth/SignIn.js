import React, { useState } from "react";
import { StatusBar, KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../../components/Auth/DismissKeyboard";
import Btn from "./../../components/Auth/Btn";
import Input from "./../../components/Auth/Input";

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const InputContainer = styled.View`
  margin-bottom: 30px;
`;

export default () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => alert(`${username} ${password}`);

  return (
    <DismissKeyboard>
      <Container>
        <StatusBar barStyle="dark-content" />
        <KeyboardAvoidingView behavior="height">
          <InputContainer>
            <Input
              value={username}
              placeholder="Username"
              autoCapitalize="none"
              stateFn={setUsername}
            />
            <Input
              value={password}
              placeholder="Password"
              autoCapitalize="none"
              isPassword={true}
              stateFn={setPassword}
            />
          </InputContainer>
          <Btn text={"Sign In"} accent onPress={handleSubmit} />
        </KeyboardAvoidingView>
      </Container>
    </DismissKeyboard>
  );
};
