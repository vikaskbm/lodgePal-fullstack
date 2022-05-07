import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Platform } from "react-native";
import styled from "styled-components";

const isAndroid = Platform.OS === "android";

const Container = styled.View``;

export default () => (
  <Container>
    <Ionicons name={"chevron-down"} size={28} />
  </Container>
);
