import React from "react";
import { Text, View, Button } from "react-native";

export default ({ navigation }) => {
  console.log({ navigation });
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Welcome</Text>
      <Button title={"Sign In"} onPress={() => navigation.navigate("SignIn")} />
      <Button title={"Sign Up"} onPress={() => navigation.navigate("SignUp")} />
    </View>
  );
};
