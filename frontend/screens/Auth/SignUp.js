import React, { useState } from "react";
import { StatusBar, KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../../components/Auth/DismissKeyboard";
import Btn from "./../../components/Auth/Btn";
import Input from "./../../components/Auth/Input";
import { isEmail } from "../../utils";
import api from "../../api";

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const InputContainer = styled.View`
  margin-bottom: 30px;
`;

export default ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isFormValid = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      alert("All fields are required");
      return false;
    }

    if (!isEmail(email)) {
      alert("Please add a valid email");
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (!isFormValid()) {
      return;
    }
    setLoading(true);
    try {
      const { status } = await api.createAccount({
        first_name: firstName,
        last_name: lastName,
        email,
        username: email,
        password: password,
      });
      if (status === 201) alert("Account created. Sign in please");
      navigation.navigate("SignIn", { email, password });
    } catch (e) {
      alert("The email is taken");
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

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
