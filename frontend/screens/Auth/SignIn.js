import React, { useState } from "react";
import { StatusBar, KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../../components/Auth/DismissKeyboard";
import Btn from "./../../components/Auth/Btn";
import Input from "./../../components/Auth/Input";
import { isEmail } from "./../../utils";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/usersSlice";

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const InputContainer = styled.View`
  margin-bottom: 30px;
`;

export default ({ route: { params } }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(params?.email);
  const [password, setPassword] = useState(params?.password);

  const isFormValid = () => {
    if (email === "" || password === "") {
      alert("All fields are required");
      return false;
    }
    if (!isEmail(email)) {
      alert("Email is invalid");
      return false;
    }
    return true;
  };
  const handleSubmit = () => {
    console.log(1);
    console.log(email);
    console.log(password);
    if (!isFormValid()) {
      return;
    }
    dispatch(
      userLogin({
        username: email,
        password: password,
      })
    );
  };

  return (
    <DismissKeyboard>
      <Container>
        <StatusBar barStyle="dark-content" />
        <KeyboardAvoidingView behavior="height">
          <InputContainer>
            <Input
              value={email}
              placeholder="Email"
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
          <Btn text={"Sign In"} accent onPress={handleSubmit} />
        </KeyboardAvoidingView>
      </Container>
    </DismissKeyboard>
  );
};
