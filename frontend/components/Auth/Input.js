import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import colors from "../../colors";

const { width } = Dimensions.get("screen");

const Container = styled.TextInput`
  width: ${width / 1.5}px;
  padding: 12.5px 20px;
  border-radius: 30px;
  margin-bottom: 10px;
  border: 1px solid grey;
  background-color: white;
`;

const Input = ({
  autoCapitalize,
  value,
  placeholder,
  isPassword = false,
  stateFn,
}) => {
  return (
    <Container
      value={value}
      placeholder={placeholder}
      secureTextEntry={isPassword ? true : false}
      autoCapitalize={autoCapitalize}
      onChange={(text) => stateFn(text)}
    />
  );
};

Input.propTypes = {
  autoCapitalize: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  isPassword: PropTypes.bool,
  stateFn: PropTypes.func.isRequired,
};
export default Input;
