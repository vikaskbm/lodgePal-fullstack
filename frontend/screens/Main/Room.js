import React, { useEffect } from "react";
import styled from "styled-components/native";
import RoomPhotos from "./../../components/RoomPhotos";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

export default ({ route: { params }, navigation }) => {
  useEffect(() => {
    navigation.setOptions({ title: params.name });
  }, []);
  return (
    <Container>
      <RoomPhotos photos={params.photos} />
    </Container>
  );
};
