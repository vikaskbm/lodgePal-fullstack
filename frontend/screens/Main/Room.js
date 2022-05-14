import React, { useEffect } from "react";
import styled from "styled-components/native";
import RoomPhotos from "./../../components/RoomPhotos";

const Container = styled.View``;

const Text = styled.Text``;

export default ({ route: { params }, navigation }) => {
  useEffect(() => {
    navigation.setOptions({ title: params.name });
  }, []);
  return (
    <Container>
      <RoomPhotos photos={params.photos} factor={2} />
    </Container>
  );
};
