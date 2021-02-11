import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Test2 = (props) => {
  return (
    <View style={styles.container}>
      <Button
        title="Ir a test"
        onPress={() =>
          props.navigation.navigate("Cursos", {
            screen: "Test",
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
export default Test2;
