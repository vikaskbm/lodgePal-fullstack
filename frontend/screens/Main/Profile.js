import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/usersSlice";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

export default () => {
  const dispatch = useDispatch();

  return (
    <Container>
      <Text>Profile</Text>
      <TouchableOpacity
        onPress={() => {
          dispatch(logOut({}));
        }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </Container>
  );
};
