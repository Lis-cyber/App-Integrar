import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Test = (props) => {
  return (
    <View style={styles.container}>
      <Button
        title="Ir a test2"
        onPress={() =>
          props.navigation.navigate("Opciones", {
            screen: "Test2",
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Test;
