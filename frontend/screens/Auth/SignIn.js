import React, { useState } from "react";
import { StatusBar } from "react-native";
import styled from "styled-components/native";
import Btn from "./../../components/Auth/Btn";
import Input from "./../../components/Auth/Input";

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const TextInput = styled.TextInput``;

export default () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => alert(`${username} ${password}`);

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
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
      <Btn text={"Sign In"} accent onPress={handleSubmit} />
      <TextInput />
    </Container>
  );
};
