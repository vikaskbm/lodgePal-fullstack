import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import colors from "../../colors";

const { width } = Dimensions.get("screen");

const Button = styled.View`
  width: ${width / 2}px;
  background-color: ${(props) => (props.accent ? colors.red : "transparent")};
`;

const Text = styled.Text`
  color: ${(props) => (props.accent ? "white" : "black")};
`;

const Btn = ({ onPress, text, accent = false }) => (
  <TouchableOpacity onPress={onPress}>
    <Button accent={accent}>
      <Text accent={accent}>{text}</Text>
    </Button>
  </TouchableOpacity>
);

Btn.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  accent: PropTypes.bool,
};

export default Btn;
